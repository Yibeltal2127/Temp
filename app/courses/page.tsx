'use client';

import { useState, useEffect, useMemo } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Clock,
  Users,
  Star,
  BookOpen,
  Shield,
  User,
  Play,
  TrendingUp,
  Award,
  ChevronDown,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { useDebounce } from '@/lib/supabase/hooks';
import CourseCard from '@/components/course-card';

// Mock course data - In production, this would come from Supabase
const mockCourses = [
  {
    id: '1',
    title: 'Digital Marketing Mastery for African Entrepreneurs',
    description: 'Learn to build and scale your digital presence across Africa. Master social media marketing, SEO, content creation, and paid advertising strategies that work in emerging markets.',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 49,
    level: 'Beginner',
    category: 'Digital Marketing',
    content_type: 'tabor_original' as const,
    instructor: {
      full_name: 'Sarah Mwangi',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    _stats: {
      totalLessons: 24,
      estimatedDuration: 480,
      enrollmentCount: 1250,
      rating: 4.8
    },
    tags: ['Social Media', 'SEO', 'Content Marketing', 'Paid Ads'],
    difficulty: 'beginner',
    language: 'English',
    hasSubtitles: true,
    isFeatured: true,
    isNew: false,
    completionRate: 89
  },
  {
    id: '2',
    title: 'No-Code App Development: Build Without Coding',
    description: 'Create powerful mobile and web applications using no-code platforms. Perfect for entrepreneurs who want to build tech solutions without learning programming.',
    thumbnail_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 79,
    level: 'Intermediate',
    category: 'No-Code Development',
    content_type: 'tabor_original' as const,
    instructor: {
      full_name: 'John Okafor',
      avatar_url: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    _stats: {
      totalLessons: 32,
      estimatedDuration: 640,
      enrollmentCount: 890,
      rating: 4.9
    },
    tags: ['Bubble', 'Webflow', 'Zapier', 'Mobile Apps'],
    difficulty: 'intermediate',
    language: 'English',
    hasSubtitles: true,
    isFeatured: true,
    isNew: true,
    completionRate: 92
  },
  {
    id: '3',
    title: 'E-commerce Success: From Setup to Scale',
    description: 'Build a profitable online store from scratch. Learn product sourcing, store setup, payment integration, and marketing strategies for African markets.',
    thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 59,
    level: 'Beginner',
    category: 'E-commerce',
    content_type: 'community' as const,
    instructor: {
      full_name: 'Grace Mensah',
      avatar_url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    _stats: {
      totalLessons: 28,
      estimatedDuration: 560,
      enrollmentCount: 1100,
      rating: 4.7
    },
    tags: ['Shopify', 'WooCommerce', 'Payment Gateways', 'Logistics'],
    difficulty: 'beginner',
    language: 'English',
    hasSubtitles: true,
    isFeatured: false,
    isNew: false,
    completionRate: 85
  },
  {
    id: '4',
    title: 'AI Tools for Business Automation',
    description: 'Harness the power of AI to automate your business processes. Learn to use ChatGPT, automation tools, and AI-powered solutions for efficiency.',
    thumbnail_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 89,
    level: 'Advanced',
    category: 'AI Tools',
    content_type: 'tabor_original' as const,
    instructor: {
      full_name: 'David Mukasa',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    _stats: {
      totalLessons: 20,
      estimatedDuration: 400,
      enrollmentCount: 650,
      rating: 4.9
    },
    tags: ['ChatGPT', 'Automation', 'Zapier', 'AI Writing'],
    difficulty: 'advanced',
    language: 'English',
    hasSubtitles: true,
    isFeatured: true,
    isNew: true,
    completionRate: 94
  },
  {
    id: '5',
    title: 'Financial Literacy for Entrepreneurs',
    description: 'Master personal and business finance fundamentals. Learn budgeting, investment basics, business accounting, and financial planning for African contexts.',
    thumbnail_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 39,
    level: 'Beginner',
    category: 'Financial Literacy',
    content_type: 'tabor_original' as const,
    instructor: {
      full_name: 'Amina Hassan',
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    _stats: {
      totalLessons: 18,
      estimatedDuration: 360,
      enrollmentCount: 1500,
      rating: 4.6
    },
    tags: ['Budgeting', 'Investment', 'Business Finance', 'Banking'],
    difficulty: 'beginner',
    language: 'English',
    hasSubtitles: true,
    isFeatured: false,
    isNew: false,
    completionRate: 88
  },
  {
    id: '6',
    title: 'Freelancing Success: Build Your Service Business',
    description: 'Start and scale a successful freelancing business. Learn client acquisition, pricing strategies, project management, and building long-term relationships.',
    thumbnail_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 45,
    level: 'Intermediate',
    category: 'Freelancing',
    content_type: 'community' as const,
    instructor: {
      full_name: 'Michael Adebayo',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    _stats: {
      totalLessons: 22,
      estimatedDuration: 440,
      enrollmentCount: 980,
      rating: 4.8
    },
    tags: ['Client Acquisition', 'Pricing', 'Project Management', 'Upwork'],
    difficulty: 'intermediate',
    language: 'English',
    hasSubtitles: true,
    isFeatured: false,
    isNew: false,
    completionRate: 91
  },
  {
    id: '7',
    title: 'Civil Engineering Solutions for Africa',
    description: 'Apply engineering principles to solve African infrastructure challenges. Learn sustainable construction, project management, and innovative solutions.',
    thumbnail_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 99,
    level: 'Advanced',
    category: 'Civil Engineering',
    content_type: 'tabor_original' as const,
    instructor: {
      full_name: 'Dr. Kwame Asante',
      avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    _stats: {
      totalLessons: 35,
      estimatedDuration: 700,
      enrollmentCount: 420,
      rating: 4.9
    },
    tags: ['Construction', 'Project Management', 'Sustainability', 'Infrastructure'],
    difficulty: 'advanced',
    language: 'English',
    hasSubtitles: true,
    isFeatured: false,
    isNew: true,
    completionRate: 87
  },
  {
    id: '8',
    title: 'Entrepreneurship Fundamentals',
    description: 'Learn the basics of starting and running a successful business. From idea validation to business planning and execution strategies.',
    thumbnail_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    price: 0,
    level: 'Beginner',
    category: 'Entrepreneurship',
    content_type: 'tabor_original' as const,
    instructor: {
      full_name: 'Prof. Fatima Kone',
      avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    _stats: {
      totalLessons: 16,
      estimatedDuration: 320,
      enrollmentCount: 2100,
      rating: 4.7
    },
    tags: ['Business Planning', 'Idea Validation', 'Market Research', 'Funding'],
    difficulty: 'beginner',
    language: 'English',
    hasSubtitles: true,
    isFeatured: true,
    isNew: false,
    completionRate: 93
  }
];

const categories = [
  'All Categories',
  'Digital Marketing',
  'No-Code Development',
  'E-commerce',
  'AI Tools',
  'Financial Literacy',
  'Freelancing',
  'Civil Engineering',
  'Entrepreneurship'
];

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const contentTypes = ['All Types', 'Tabor Verified', 'Community'];
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'duration', label: 'Shortest Duration' }
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedContentType, setSelectedContentType] = useState('All Types');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Get all unique tags from courses
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockCourses.forEach(course => {
      course.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = mockCourses.filter(course => {
      // Search query filter
      if (debouncedSearchQuery) {
        const query = debouncedSearchQuery.toLowerCase();
        const matchesSearch = 
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query) ||
          course.instructor.full_name.toLowerCase().includes(query) ||
          course.tags.some(tag => tag.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== 'All Categories' && course.category !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'All Levels' && course.level !== selectedLevel) {
        return false;
      }

      // Content type filter
      if (selectedContentType !== 'All Types') {
        if (selectedContentType === 'Tabor Verified' && course.content_type !== 'tabor_original') {
          return false;
        }
        if (selectedContentType === 'Community' && course.content_type !== 'community') {
          return false;
        }
      }

      // Price range filter
      if (course.price < priceRange[0] || course.price > priceRange[1]) {
        return false;
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const hasSelectedTag = selectedTags.some(tag => course.tags.includes(tag));
        if (!hasSelectedTag) return false;
      }

      // Free only filter
      if (showFreeOnly && course.price > 0) {
        return false;
      }

      // Featured only filter
      if (showFeaturedOnly && !course.isFeatured) {
        return false;
      }

      // New only filter
      if (showNewOnly && !course.isNew) {
        return false;
      }

      return true;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'rating':
          return (b._stats?.rating || 0) - (a._stats?.rating || 0);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'duration':
          return (a._stats?.estimatedDuration || 0) - (b._stats?.estimatedDuration || 0);
        case 'popular':
        default:
          return (b._stats?.enrollmentCount || 0) - (a._stats?.enrollmentCount || 0);
      }
    });

    return filtered;
  }, [
    debouncedSearchQuery,
    selectedCategory,
    selectedLevel,
    selectedContentType,
    priceRange,
    sortBy,
    selectedTags,
    showFreeOnly,
    showFeaturedOnly,
    showNewOnly
  ]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLevel('All Levels');
    setSelectedContentType('All Types');
    setPriceRange([0, 100]);
    setSelectedTags([]);
    setShowFreeOnly(false);
    setShowFeaturedOnly(false);
    setShowNewOnly(false);
  };

  const activeFiltersCount = [
    selectedCategory !== 'All Categories',
    selectedLevel !== 'All Levels',
    selectedContentType !== 'All Types',
    priceRange[0] > 0 || priceRange[1] < 100,
    selectedTags.length > 0,
    showFreeOnly,
    showFeaturedOnly,
    showNewOnly
  ].filter(Boolean).length;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#FF6B35]/5 via-[#4ECDC4]/5 to-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-[#2C3E50] mb-6">
              Discover Your Next
              <span className="block bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent">
                Learning Adventure
              </span>
            </h1>
            <p className="text-xl text-[#2C3E50]/80 leading-relaxed mb-8">
              Explore our comprehensive catalog of courses designed specifically for African entrepreneurs. 
              From digital marketing to AI tools, find the skills that will transform your business.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4ECDC4]">{mockCourses.length}+</div>
                <div className="text-sm text-[#2C3E50]/70">Courses Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FF6B35]">{categories.length - 1}</div>
                <div className="text-sm text-[#2C3E50]/70">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1B4D3E]">10K+</div>
                <div className="text-sm text-[#2C3E50]/70">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2C3E50]">4.8</div>
                <div className="text-sm text-[#2C3E50]/70">Avg. Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="py-8 bg-white border-b border-[#E5E8E8]">
        <div className="container px-4 md:px-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2C3E50]/40 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-[#E5E8E8] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-[#4ECDC4]/30 text-[#4ECDC4] hover:bg-[#4ECDC4] hover:text-white"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                More Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-[#FF6B35] text-white">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#2C3E50]/70">
                  {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                </span>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex border border-[#E5E8E8] rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-[#F7F9F9] rounded-lg border border-[#E5E8E8]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Content Type */}
                <div>
                  <label className="text-sm font-medium text-[#2C3E50] mb-2 block">
                    Content Type
                  </label>
                  <Select value={selectedContentType} onValueChange={setSelectedContentType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-[#2C3E50] mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>

                {/* Quick Toggles */}
                <div>
                  <label className="text-sm font-medium text-[#2C3E50] mb-2 block">
                    Quick Filters
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="free-only"
                        checked={showFreeOnly}
                        onCheckedChange={setShowFreeOnly}
                      />
                      <label htmlFor="free-only" className="text-sm text-[#2C3E50]">
                        Free courses only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured-only"
                        checked={showFeaturedOnly}
                        onCheckedChange={setShowFeaturedOnly}
                      />
                      <label htmlFor="featured-only" className="text-sm text-[#2C3E50]">
                        Featured courses
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="new-only"
                        checked={showNewOnly}
                        onCheckedChange={setShowNewOnly}
                      />
                      <label htmlFor="new-only" className="text-sm text-[#2C3E50]">
                        New courses
                      </label>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm font-medium text-[#2C3E50] mb-2 block">
                    Topics ({selectedTags.length} selected)
                  </label>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {allTags.map(tag => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagToggle(tag)}
                        />
                        <label htmlFor={`tag-${tag}`} className="text-sm text-[#2C3E50]">
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#E5E8E8]">
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="text-[#2C3E50]/70 hover:text-[#2C3E50]"
                >
                  Clear All Filters
                </Button>
                <Button
                  onClick={() => setShowFilters(false)}
                  className="bg-[#4ECDC4] hover:bg-[#4ECDC4]/90 text-white"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCategory !== 'All Categories' && (
                <Badge variant="outline" className="border-[#4ECDC4]/30 text-[#4ECDC4]">
                  {selectedCategory}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => setSelectedCategory('All Categories')}
                  />
                </Badge>
              )}
              {selectedLevel !== 'All Levels' && (
                <Badge variant="outline" className="border-[#4ECDC4]/30 text-[#4ECDC4]">
                  {selectedLevel}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => setSelectedLevel('All Levels')}
                  />
                </Badge>
              )}
              {selectedTags.map(tag => (
                <Badge key={tag} variant="outline" className="border-[#FF6B35]/30 text-[#FF6B35]">
                  {tag}
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => handleTagToggle(tag)}
                  />
                </Badge>
              ))}
              {showFreeOnly && (
                <Badge variant="outline" className="border-[#1B4D3E]/30 text-[#1B4D3E]">
                  Free Only
                  <X 
                    className="w-3 h-3 ml-1 cursor-pointer" 
                    onClick={() => setShowFreeOnly(false)}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Courses Grid/List */}
      <section className="py-12 bg-[#F7F9F9]">
        <div className="container px-4 md:px-6">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#E5E8E8] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-[#2C3E50]/40" />
              </div>
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">
                No courses found
              </h3>
              <p className="text-[#2C3E50]/70 mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or filters to find the courses you're looking for.
              </p>
              <Button
                onClick={clearAllFilters}
                className="bg-[#4ECDC4] hover:bg-[#4ECDC4]/90 text-white"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }>
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  variant={viewMode === 'list' ? 'compact' : 'default'}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Shield,
  User,
  Play,
  CheckCircle,
  Award,
  Globe,
  Download,
  Share2,
  Heart,
  MessageCircle,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock course data - In production, this would come from Supabase
const mockCourseDetails = {
  id: '1',
  title: 'Digital Marketing Mastery for African Entrepreneurs',
  description: 'Learn to build and scale your digital presence across Africa. Master social media marketing, SEO, content creation, and paid advertising strategies that work in emerging markets.',
  longDescription: `This comprehensive course is designed specifically for African entrepreneurs who want to harness the power of digital marketing to grow their businesses. You'll learn proven strategies that work in emerging markets, understand the unique challenges and opportunities in African digital landscapes, and master the tools and techniques used by successful entrepreneurs across the continent.

Whether you're starting a new business or looking to scale an existing one, this course will give you the practical skills and knowledge you need to succeed in the digital age. From social media marketing to search engine optimization, from content creation to paid advertising, you'll learn everything you need to build a strong digital presence and drive real business results.`,
  thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  price: 49,
  originalPrice: 79,
  level: 'Beginner',
  category: 'Digital Marketing',
  content_type: 'tabor_original' as const,
  instructor: {
    full_name: 'Sarah Mwangi',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    bio: 'Digital marketing expert with 8+ years of experience helping African businesses grow online. Founded Digital Reach Africa, a leading marketing agency serving clients across East Africa.',
    credentials: ['Google Ads Certified', 'Facebook Blueprint Certified', 'HubSpot Certified'],
    studentsCount: 5200,
    coursesCount: 3,
    rating: 4.9
  },
  _stats: {
    totalLessons: 24,
    estimatedDuration: 480,
    enrollmentCount: 1250,
    rating: 4.8,
    reviewsCount: 342,
    completionRate: 89
  },
  tags: ['Social Media', 'SEO', 'Content Marketing', 'Paid Ads'],
  difficulty: 'beginner',
  language: 'English',
  hasSubtitles: true,
  isFeatured: true,
  isNew: false,
  lastUpdated: '2024-01-15',
  certificate: true,
  downloadable: true,
  mobileAccess: true,
  lifetimeAccess: true,
  whatYouWillLearn: [
    'Build a comprehensive digital marketing strategy for African markets',
    'Master social media marketing across Facebook, Instagram, Twitter, and LinkedIn',
    'Optimize your website for search engines with proven SEO techniques',
    'Create compelling content that engages your target audience',
    'Run profitable paid advertising campaigns on Google and Facebook',
    'Use analytics tools to measure and improve your marketing performance',
    'Understand the unique challenges and opportunities in African digital markets',
    'Build an email marketing system that converts prospects into customers'
  ],
  courseContent: [
    {
      title: 'Getting Started with Digital Marketing',
      lessons: 4,
      duration: 60,
      lessons_detail: [
        { title: 'Introduction to Digital Marketing in Africa', duration: 15, isPreview: true },
        { title: 'Understanding Your Target Audience', duration: 18, isPreview: false },
        { title: 'Setting Up Your Digital Marketing Foundation', duration: 12, isPreview: false },
        { title: 'Creating Your Marketing Strategy', duration: 15, isPreview: false }
      ]
    },
    {
      title: 'Social Media Marketing Mastery',
      lessons: 6,
      duration: 120,
      lessons_detail: [
        { title: 'Facebook Marketing for Business', duration: 22, isPreview: true },
        { title: 'Instagram Growth Strategies', duration: 18, isPreview: false },
        { title: 'Twitter for Business Engagement', duration: 15, isPreview: false },
        { title: 'LinkedIn for B2B Marketing', duration: 20, isPreview: false },
        { title: 'Content Creation and Scheduling', duration: 25, isPreview: false },
        { title: 'Social Media Analytics and Optimization', duration: 20, isPreview: false }
      ]
    },
    {
      title: 'Search Engine Optimization (SEO)',
      lessons: 5,
      duration: 100,
      lessons_detail: [
        { title: 'SEO Fundamentals and Keyword Research', duration: 25, isPreview: false },
        { title: 'On-Page SEO Optimization', duration: 20, isPreview: false },
        { title: 'Technical SEO for Beginners', duration: 18, isPreview: false },
        { title: 'Local SEO for African Businesses', duration: 22, isPreview: false },
        { title: 'Link Building Strategies', duration: 15, isPreview: false }
      ]
    },
    {
      title: 'Content Marketing Excellence',
      lessons: 4,
      duration: 80,
      lessons_detail: [
        { title: 'Content Strategy Development', duration: 20, isPreview: false },
        { title: 'Creating Engaging Blog Content', duration: 18, isPreview: false },
        { title: 'Video Marketing for Social Media', duration: 22, isPreview: false },
        { title: 'Content Distribution and Promotion', duration: 20, isPreview: false }
      ]
    },
    {
      title: 'Paid Advertising Campaigns',
      lessons: 5,
      duration: 120,
      lessons_detail: [
        { title: 'Google Ads Setup and Strategy', duration: 25, isPreview: false },
        { title: 'Facebook and Instagram Ads', duration: 28, isPreview: false },
        { title: 'Campaign Optimization and A/B Testing', duration: 22, isPreview: false },
        { title: 'Budget Management and ROI Tracking', duration: 25, isPreview: false },
        { title: 'Advanced Targeting Techniques', duration: 20, isPreview: false }
      ]
    }
  ],
  requirements: [
    'Basic computer and internet skills',
    'A business idea or existing business to apply the concepts',
    'Willingness to learn and implement new strategies',
    'Access to social media platforms (Facebook, Instagram, etc.)'
  ],
  targetAudience: [
    'Entrepreneurs looking to grow their business online',
    'Small business owners wanting to increase their digital presence',
    'Marketing professionals seeking to specialize in African markets',
    'Anyone interested in starting a digital marketing career'
  ],
  reviews: [
    {
      id: '1',
      user: {
        name: 'Michael Adebayo',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        location: 'Lagos, Nigeria'
      },
      rating: 5,
      comment: 'This course completely transformed how I approach digital marketing for my business. The strategies are practical and specifically tailored for African markets. Highly recommended!',
      date: '2024-01-10',
      helpful: 23
    },
    {
      id: '2',
      user: {
        name: 'Grace Wanjiku',
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        location: 'Nairobi, Kenya'
      },
      rating: 5,
      comment: 'Sarah is an excellent instructor. The course content is well-structured and easy to follow. I was able to implement the strategies immediately and saw results within weeks.',
      date: '2024-01-08',
      helpful: 18
    },
    {
      id: '3',
      user: {
        name: 'Kwame Asante',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        location: 'Accra, Ghana'
      },
      rating: 4,
      comment: 'Great course with practical examples. The section on social media marketing was particularly valuable. Would love to see more advanced topics in a follow-up course.',
      date: '2024-01-05',
      helpful: 15
    }
  ]
};

export default function CourseDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  const totalLessons = mockCourseDetails.courseContent.reduce((total, section) => total + section.lessons, 0);
  const totalDuration = mockCourseDetails.courseContent.reduce((total, section) => total + section.duration, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      
      {/* Course Hero Section */}
      <section className="py-12 bg-gradient-to-br from-[#2C3E50] to-[#1B4D3E] text-white">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
                <Link href="/courses" className="hover:text-white">Courses</Link>
                <span>/</span>
                <span>{mockCourseDetails.category}</span>
                <span>/</span>
                <span className="text-white">{mockCourseDetails.title}</span>
              </div>

              {/* Course Title and Badges */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-[#FF6B35] text-white">
                    <Shield className="w-3 h-3 mr-1" />
                    Tabor Verified
                  </Badge>
                  {mockCourseDetails.isNew && (
                    <Badge className="bg-[#4ECDC4] text-white">New</Badge>
                  )}
                  {mockCourseDetails.isFeatured && (
                    <Badge className="bg-[#1B4D3E] text-white">Featured</Badge>
                  )}
                  <Badge variant="outline" className="border-white/30 text-white">
                    {mockCourseDetails.level}
                  </Badge>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {mockCourseDetails.title}
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed mb-6">
                  {mockCourseDetails.description}
                </p>
              </div>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#FF6B35]" />
                  <span className="font-medium">{mockCourseDetails._stats.rating}</span>
                  <span className="text-white/70">({mockCourseDetails._stats.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#4ECDC4]" />
                  <span>{mockCourseDetails._stats.enrollmentCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white/70" />
                  <span>{formatDuration(totalDuration)} total</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-white/70" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-white/70" />
                  <span>{mockCourseDetails.language}</span>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="flex items-center gap-4">
                  <Image
                    src={mockCourseDetails.instructor.avatar_url}
                    alt={mockCourseDetails.instructor.full_name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{mockCourseDetails.instructor.full_name}</h3>
                    <p className="text-white/80 text-sm mb-2">{mockCourseDetails.instructor.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <span>{mockCourseDetails.instructor.studentsCount.toLocaleString()} students</span>
                      <span>{mockCourseDetails.instructor.coursesCount} courses</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#FF6B35]" />
                        <span>{mockCourseDetails.instructor.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-[#E5E8E8] shadow-xl">
                <CardContent className="p-0">
                  {/* Course Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[#4ECDC4]/20 to-[#FF6B35]/20">
                    <Image
                      src={mockCourseDetails.thumbnail_url}
                      alt={mockCourseDetails.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button
                        size="icon"
                        className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-[#2C3E50]"
                      >
                        <Play className="w-6 h-6 ml-1" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-bold text-[#2C3E50]">
                          ${mockCourseDetails.price}
                        </span>
                        {mockCourseDetails.originalPrice && (
                          <span className="text-lg text-[#2C3E50]/50 line-through">
                            ${mockCourseDetails.originalPrice}
                          </span>
                        )}
                        {mockCourseDetails.originalPrice && (
                          <Badge className="bg-[#FF6B35] text-white">
                            {Math.round((1 - mockCourseDetails.price / mockCourseDetails.originalPrice) * 100)}% OFF
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-[#2C3E50]/70">
                        30-day money-back guarantee
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mb-6">
                      <Button
                        className="w-full bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] hover:from-[#FF6B35]/90 hover:to-[#4ECDC4]/90 text-white text-lg py-3"
                        onClick={() => setIsEnrolled(true)}
                      >
                        {isEnrolled ? 'Go to Course' : 'Enroll Now'}
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 border-[#4ECDC4]/30 text-[#4ECDC4] hover:bg-[#4ECDC4] hover:text-white"
                          onClick={() => setIsFavorited(!isFavorited)}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                          {isFavorited ? 'Saved' : 'Save'}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-[#2C3E50]/30 text-[#2C3E50] hover:bg-[#2C3E50] hover:text-white"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>

                    {/* Course Features */}
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#1B4D3E]" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#1B4D3E]" />
                        <span>Mobile and desktop access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#1B4D3E]" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#1B4D3E]" />
                        <span>Downloadable resources</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#1B4D3E]" />
                        <span>Community access</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Tabs */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-8">
                <div className="space-y-8">
                  {/* What You'll Learn */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">What you'll learn</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {mockCourseDetails.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#1B4D3E] mt-0.5 flex-shrink-0" />
                          <span className="text-[#2C3E50]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Course description</h3>
                    <div className="prose prose-lg max-w-none text-[#2C3E50]/80">
                      {mockCourseDetails.longDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {mockCourseDetails.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-[#4ECDC4] rounded-full mt-2 flex-shrink-0" />
                          <span className="text-[#2C3E50]">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Target Audience */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">Who this course is for</h3>
                    <ul className="space-y-2">
                      {mockCourseDetails.targetAudience.map((audience, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Target className="w-5 h-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                          <span className="text-[#2C3E50]">{audience}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[#2C3E50]">Course curriculum</h3>
                    <div className="text-sm text-[#2C3E50]/70">
                      {mockCourseDetails.courseContent.length} sections • {totalLessons} lessons • {formatDuration(totalDuration)} total length
                    </div>
                  </div>

                  <div className="space-y-4">
                    {mockCourseDetails.courseContent.map((section, sectionIndex) => (
                      <Card key={sectionIndex} className="border-[#E5E8E8]">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg text-[#2C3E50]">
                              {section.title}
                            </CardTitle>
                            <div className="text-sm text-[#2C3E50]/70">
                              {section.lessons} lessons • {formatDuration(section.duration)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            {section.lessons_detail.map((lesson, lessonIndex) => (
                              <div key={lessonIndex} className="flex items-center justify-between py-2 border-b border-[#E5E8E8] last:border-b-0">
                                <div className="flex items-center gap-3">
                                  <Play className="w-4 h-4 text-[#4ECDC4]" />
                                  <span className="text-[#2C3E50]">{lesson.title}</span>
                                  {lesson.isPreview && (
                                    <Badge variant="outline" className="border-[#4ECDC4]/30 text-[#4ECDC4] text-xs">
                                      Preview
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[#2C3E50]/70">
                                  <Clock className="w-3 h-3" />
                                  <span>{lesson.duration}m</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="mt-8">
                <Card className="border-[#E5E8E8]">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <Image
                        src={mockCourseDetails.instructor.avatar_url}
                        alt={mockCourseDetails.instructor.full_name}
                        width={120}
                        height={120}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">
                          {mockCourseDetails.instructor.full_name}
                        </h3>
                        <p className="text-[#2C3E50]/80 mb-4 leading-relaxed">
                          {mockCourseDetails.instructor.bio}
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#4ECDC4]">
                              {mockCourseDetails.instructor.studentsCount.toLocaleString()}
                            </div>
                            <div className="text-sm text-[#2C3E50]/70">Students</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#FF6B35]">
                              {mockCourseDetails.instructor.coursesCount}
                            </div>
                            <div className="text-sm text-[#2C3E50]/70">Courses</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#1B4D3E]">
                              {mockCourseDetails.instructor.rating}
                            </div>
                            <div className="text-sm text-[#2C3E50]/70">Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#2C3E50]">
                              8+
                            </div>
                            <div className="text-sm text-[#2C3E50]/70">Years Exp.</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[#2C3E50] mb-2">Credentials</h4>
                          <div className="flex flex-wrap gap-2">
                            {mockCourseDetails.instructor.credentials.map((credential, index) => (
                              <Badge key={index} variant="outline" className="border-[#4ECDC4]/30 text-[#4ECDC4]">
                                <Award className="w-3 h-3 mr-1" />
                                {credential}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <div className="space-y-8">
                  {/* Reviews Summary */}
                  <Card className="border-[#E5E8E8]">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-[#2C3E50] mb-2">
                            {mockCourseDetails._stats.rating}
                          </div>
                          <div className="flex justify-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-6 h-6 ${
                                  star <= Math.floor(mockCourseDetails._stats.rating) 
                                    ? 'fill-[#FF6B35] text-[#FF6B35]' 
                                    : 'text-[#E5E8E8]'
                                }`} 
                              />
                            ))}
                          </div>
                          <div className="text-[#2C3E50]/70">
                            {mockCourseDetails._stats.reviewsCount} reviews
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-3">
                              <span className="text-sm text-[#2C3E50] w-8">{rating} ★</span>
                              <Progress 
                                value={rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 3 : rating === 2 ? 1 : 1} 
                                className="flex-1 h-2"
                              />
                              <span className="text-sm text-[#2C3E50]/70 w-8">
                                {rating === 5 ? '75%' : rating === 4 ? '20%' : rating === 3 ? '3%' : rating === 2 ? '1%' : '1%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {mockCourseDetails.reviews.map((review) => (
                      <Card key={review.id} className="border-[#E5E8E8]">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Image
                              src={review.user.avatar}
                              alt={review.user.name}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-[#2C3E50]">{review.user.name}</h4>
                                  <p className="text-sm text-[#2C3E50]/70">{review.user.location}</p>
                                </div>
                                <div className="text-sm text-[#2C3E50]/70">{review.date}</div>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`w-4 h-4 ${
                                      star <= review.rating 
                                        ? 'fill-[#FF6B35] text-[#FF6B35]' 
                                        : 'text-[#E5E8E8]'
                                    }`} 
                                  />
                                ))}
                              </div>
                              
                              <p className="text-[#2C3E50] leading-relaxed mb-3">
                                {review.comment}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm text-[#2C3E50]/70">
                                <button className="flex items-center gap-1 hover:text-[#4ECDC4]">
                                  <TrendingUp className="w-4 h-4" />
                                  Helpful ({review.helpful})
                                </button>
                                <button className="flex items-center gap-1 hover:text-[#4ECDC4]">
                                  <MessageCircle className="w-4 h-4" />
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
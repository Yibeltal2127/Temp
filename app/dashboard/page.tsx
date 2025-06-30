'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Clock, 
  Star,
  Play,
  CheckCircle,
  ArrowRight,
  Target,
  Zap
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login?redirect=/dashboard');
        return;
      }
      
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#4ECDC4]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      
      <main className="flex-1 bg-[#F7F9F9]">
        {/* Welcome Section */}
        <section className="py-12 bg-gradient-to-br from-[#4ECDC4]/5 to-[#FF6B35]/5">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">
                  Welcome back, {user.user_metadata?.full_name || user.email}! 👋
                </h1>
                <p className="text-xl text-[#2C3E50]/80">
                  Ready to continue your entrepreneurial journey?
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="border-[#E5E8E8] bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#4ECDC4]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <BookOpen className="w-6 h-6 text-[#4ECDC4]" />
                    </div>
                    <div className="text-2xl font-bold text-[#2C3E50]">0</div>
                    <div className="text-sm text-[#2C3E50]/70">Courses Started</div>
                  </CardContent>
                </Card>

                <Card className="border-[#E5E8E8] bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-[#FF6B35]" />
                    </div>
                    <div className="text-2xl font-bold text-[#2C3E50]">0</div>
                    <div className="text-sm text-[#2C3E50]/70">Certificates</div>
                  </CardContent>
                </Card>

                <Card className="border-[#E5E8E8] bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#1B4D3E]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-6 h-6 text-[#1B4D3E]" />
                    </div>
                    <div className="text-2xl font-bold text-[#2C3E50]">0h</div>
                    <div className="text-sm text-[#2C3E50]/70">Learning Time</div>
                  </CardContent>
                </Card>

                <Card className="border-[#E5E8E8] bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-[#2C3E50]">0%</div>
                    <div className="text-sm text-[#2C3E50]/70">Progress</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dashboard Content */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Getting Started */}
                  <Card className="border-[#E5E8E8]">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#2C3E50]">
                        <Target className="w-5 h-5 text-[#4ECDC4]" />
                        Get Started
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-[#4ECDC4]/5 to-[#FF6B35]/5 rounded-lg border border-[#E5E8E8]">
                          <h3 className="font-semibold text-[#2C3E50] mb-2">Choose Your First Course</h3>
                          <p className="text-[#2C3E50]/70 text-sm mb-4">
                            Start your entrepreneurial journey with one of our beginner-friendly courses.
                          </p>
                          <Button 
                            className="bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] hover:from-[#FF6B35]/90 hover:to-[#4ECDC4]/90 text-white"
                            asChild
                          >
                            <Link href="/courses">
                              Browse Courses
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 border border-[#E5E8E8] rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-[#1B4D3E]" />
                              <span className="text-sm font-medium text-[#2C3E50]">Complete Profile</span>
                            </div>
                            <p className="text-xs text-[#2C3E50]/70">Add your details to personalize your experience</p>
                          </div>

                          <div className="p-4 border border-[#E5E8E8] rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="w-4 h-4 text-[#4ECDC4]" />
                              <span className="text-sm font-medium text-[#2C3E50]">Join Community</span>
                            </div>
                            <p className="text-xs text-[#2C3E50]/70">Connect with fellow entrepreneurs</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommended Courses */}
                  <Card className="border-[#E5E8E8]">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#2C3E50]">
                        <Zap className="w-5 h-5 text-[#FF6B35]" />
                        Recommended for You
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Course 1 */}
                        <div className="border border-[#E5E8E8] rounded-lg p-4 hover:border-[#4ECDC4]/40 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <Badge className="bg-[#FF6B35] text-white">Beginner</Badge>
                            <Badge variant="outline" className="border-[#4ECDC4]/30 text-[#4ECDC4]">Free</Badge>
                          </div>
                          <h3 className="font-semibold text-[#2C3E50] mb-2">Entrepreneurship Fundamentals</h3>
                          <p className="text-sm text-[#2C3E50]/70 mb-4">
                            Learn the basics of starting and running a successful business.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-[#2C3E50]/60 mb-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              5h 20m
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              2,100 students
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              4.7
                            </span>
                          </div>
                          <Button 
                            size="sm" 
                            className="w-full bg-[#4ECDC4] hover:bg-[#4ECDC4]/90 text-white"
                            asChild
                          >
                            <Link href="/courses/entrepreneurship">
                              <Play className="w-3 h-3 mr-2" />
                              Start Learning
                            </Link>
                          </Button>
                        </div>

                        {/* Course 2 */}
                        <div className="border border-[#E5E8E8] rounded-lg p-4 hover:border-[#4ECDC4]/40 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <Badge className="bg-[#4ECDC4] text-white">Beginner</Badge>
                            <Badge variant="outline" className="border-[#FF6B35]/30 text-[#FF6B35]">$49</Badge>
                          </div>
                          <h3 className="font-semibold text-[#2C3E50] mb-2">Digital Marketing Mastery</h3>
                          <p className="text-sm text-[#2C3E50]/70 mb-4">
                            Build and scale your digital presence across Africa.
                          </p>
                          <div className="flex items-center gap-4 text-xs text-[#2C3E50]/60 mb-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              8h 0m
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              1,250 students
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              4.8
                            </span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4] hover:text-white"
                            asChild
                          >
                            <Link href="/courses/1">
                              View Course
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Learning Streak */}
                  <Card className="border-[#E5E8E8]">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#2C3E50]">Learning Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#FF6B35] mb-2">0</div>
                        <div className="text-sm text-[#2C3E50]/70 mb-4">Days in a row</div>
                        <div className="text-xs text-[#2C3E50]/60">
                          Start learning today to begin your streak!
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="border-[#E5E8E8]">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#2C3E50]">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5"
                        asChild
                      >
                        <Link href="/courses">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Browse All Courses
                        </Link>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5"
                        asChild
                      >
                        <Link href="/dashboard/profile">
                          <Users className="w-4 h-4 mr-2" />
                          Complete Profile
                        </Link>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5"
                        asChild
                      >
                        <Link href="/community">
                          <Users className="w-4 h-4 mr-2" />
                          Join Community
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Achievements */}
                  <Card className="border-[#E5E8E8]">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#2C3E50]">Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center text-[#2C3E50]/60 text-sm">
                        Complete your first lesson to unlock achievements!
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Laptop, Brain, Users, BarChart3, Code, Coins, GraduationCap, Play, Quote, ArrowRight, CheckCircle, Star, TrendingUp, Target, Zap, Shield, Heart, AlertCircle, Clock, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AIDemoCard } from "@/components/ai-demo-card"
import { HowItWorksSection } from "@/components/how-it-works-section"

export default function Home() {
  console.time("HomePageRender");
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#FF6B35]/5 via-[#4ECDC4]/5 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-[#FF6B35]/10 to-[#4ECDC4]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-[#4ECDC4]/10 to-[#FF6B35]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6 animate-fade-up">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-[#E5E8E8] w-fit">
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 bg-[#4ECDC4] rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-[#FF6B35] rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-[#1B4D3E] rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm font-medium text-[#2C3E50]">Join 10,000+ African entrepreneurs</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="block text-[#2C3E50]">Your</span>
                  <span className="block bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent">
                    Launchpad:
                  </span>
                  <span className="block text-[#2C3E50]">From Idea to Income</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-[#2C3E50]/80 leading-relaxed max-w-2xl">
                  Tabor Academy provides <span className="font-semibold text-[#4ECDC4]">mobile-first, project-based education</span> tailored for Africa, connecting you with mentors and a community to launch a real business.
                </p>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#1B4D3E]" />
                  <span className="text-sm font-medium text-[#2C3E50]">Mobile-First Learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#1B4D3E]" />
                  <span className="text-sm font-medium text-[#2C3E50]">Real Mentorship</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#1B4D3E]" />
                  <span className="text-sm font-medium text-[#2C3E50]">Project-Based</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] hover:from-[#FF6B35]/90 hover:to-[#4ECDC4]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  asChild
                >
                  <Link href="/signup" className="flex items-center gap-2">
                    Start Your Journey Today
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4] hover:text-white group transition-all duration-300"
                  asChild
                >
                  <Link href="#demo" className="flex items-center gap-2">
                    <Play className="w-4 h-4 transition-transform group-hover:scale-110" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4 border-t border-[#E5E8E8]/50">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-[#FF6B35] text-[#FF6B35]" />
                    ))}
                  </div>
                  <span className="text-sm text-[#2C3E50]/70">4.9/5 from 2,000+ reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#1B4D3E]" />
                  <span className="text-sm text-[#2C3E50]/70">85% success rate</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative animate-fade-in">
              {/* Main Image Container */}
              <div className="relative">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4ECDC4]/20 to-[#FF6B35]/20 rounded-2xl blur-2xl scale-105" />
                
                {/* Main Image */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="African entrepreneurs learning and collaborating"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  
                  {/* Floating Stats Cards */}
                  <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-[#E5E8E8]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#4ECDC4]" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[#2C3E50]">10K+</div>
                        <div className="text-xs text-[#2C3E50]/60">Active Learners</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-[#E5E8E8]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#FF6B35]/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-[#FF6B35]" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[#2C3E50]">15+</div>
                        <div className="text-xs text-[#2C3E50]/60">Countries</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Social Proof Section (Momentum Bar) */}
      <section className="py-12 bg-white border-b border-[#E5E8E8]/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent">
                10,000+
              </div>
              <div className="text-sm text-[#2C3E50]/70">Active Learners</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent">
                15+
              </div>
              <div className="text-sm text-[#2C3E50]/70">Countries Served</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent">
                85%
              </div>
              <div className="text-sm text-[#2C3E50]/70">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent">
                2,500+
              </div>
              <div className="text-sm text-[#2C3E50]/70">Businesses Launched</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section with AI Micro-Demo */}
      <section id="demo" className="py-20 bg-gradient-to-br from-[#F7F9F9] to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#4ECDC4]/5 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#FF6B35]/5 rounded-full blur-2xl" />
        
        <div className="container px-4 md:px-6 relative">
          {/* Problem Statement */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 rounded-full px-4 py-2 mb-6">
              <AlertCircle className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-sm font-medium text-[#FF6B35]">The Challenge</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-[#2C3E50] mb-6">
              Traditional Education Isn't Built for 
              <span className="block bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent">
                African Entrepreneurs
              </span>
            </h2>
            
            <p className="text-xl text-[#2C3E50]/80 leading-relaxed mb-8">
              You have brilliant business ideas, but existing education platforms are expensive, 
              require constant internet, and teach generic skills that don't address Africa's unique opportunities and challenges.
            </p>

            {/* Problem Points */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-start gap-3 text-left">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <DollarSign className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Too Expensive</h4>
                  <p className="text-sm text-[#2C3E50]/70">Most platforms cost $100+ per month - out of reach for emerging entrepreneurs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Internet Dependent</h4>
                  <p className="text-sm text-[#2C3E50]/70">Require constant high-speed internet that's unreliable or expensive in many areas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#2C3E50] mb-1">Generic Content</h4>
                  <p className="text-sm text-[#2C3E50]/70">One-size-fits-all courses that ignore local markets, regulations, and opportunities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Statement */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-[#1B4D3E]/10 rounded-full px-4 py-2 mb-6">
              <CheckCircle className="w-4 h-4 text-[#1B4D3E]" />
              <span className="text-sm font-medium text-[#1B4D3E]">The Solution</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-[#2C3E50] mb-6">
              Africa-First Education That 
              <span className="block bg-gradient-to-r from-[#4ECDC4] to-[#1B4D3E] bg-clip-text text-transparent">
                Actually Works
              </span>
            </h2>
            
            <p className="text-xl text-[#2C3E50]/80 leading-relaxed">
              Tabor Academy combines cutting-edge technology with deep understanding of African markets 
              to deliver practical, affordable, and accessible entrepreneurial education.
            </p>
          </div>

          {/* Solution Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1: Mobile-First Learning */}
            <Card className="p-6 border-[#E5E8E8] hover:border-[#4ECDC4]/40 transition-all duration-300 hover:shadow-lg group">
              <div className="w-12 h-12 bg-[#4ECDC4]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Laptop className="w-6 h-6 text-[#4ECDC4]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">Mobile-First Learning</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">
                Optimized for smartphones with offline capabilities. Learn anywhere, anytime, even with limited internet.
              </p>
            </Card>

            {/* Feature 2: AI-Powered Mentorship */}
            <Card className="p-6 border-[#E5E8E8] hover:border-[#4ECDC4]/40 transition-all duration-300 hover:shadow-lg group">
              <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">AI-Powered Mentorship</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">
                Get personalized guidance 24/7 from our AI mentor, trained on successful African business cases.
              </p>
            </Card>

            {/* Feature 3: Real-World Projects */}
            <Card className="p-6 border-[#E5E8E8] hover:border-[#4ECDC4]/40 transition-all duration-300 hover:shadow-lg group">
              <div className="w-12 h-12 bg-[#1B4D3E]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-[#1B4D3E]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">Real-World Projects</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">
                Build actual businesses while learning. Graduate with a portfolio and revenue, not just certificates.
              </p>
            </Card>

            {/* Feature 4: AI Demo Card */}
            <AIDemoCard />
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] hover:from-[#FF6B35]/90 hover:to-[#4ECDC4]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              asChild
            >
              <Link href="/signup" className="flex items-center gap-2">
                Experience the Full Platform
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="text-sm text-[#2C3E50]/60 mt-3">
              Start with our free tier - no credit card required
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Features Overview Section - Added id="courses" */}
      <section id="courses" className="py-20 bg-gray-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            Learn Skills That Matter
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Digital Marketing",
                description: "Master social media, SEO, and online advertising to grow businesses.",
                link: "/courses/digital-marketing"
              },
              {
                icon: Code,
                title: "No-Code Development",
                description: "Build websites and apps without coding using modern tools.",
                link: "/courses/no-code"
              },
              {
                icon: Coins,
                title: "Financial Literacy",
                description: "Understand business finance, budgeting, and investment basics.",
                link: "/courses/financial-literacy"
              },
              {
                icon: GraduationCap,
                title: "Entrepreneurship",
                description: "Learn to start and scale successful businesses in Africa.",
                link: "/courses/entrepreneurship"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 card-hover gradient-border group">
                <feature.icon className="h-12 w-12 text-orange-500 mb-4 transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Link href={feature.link} className="text-teal-600 hover:text-teal-700 font-medium group-hover:underline">
                  Learn More →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Added id="success-stories" */}
      <section id="success-stories" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            Success Stories from Africa
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Thanks to Tabor Digital Academy, I launched my digital marketing agency and now serve clients across East Africa.",
                name: "Sarah Mwangi",
                location: "Kenya",
                image: "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b"
              },
              {
                quote: "The no-code development course helped me build my first app. Now I'm teaching others in my community.",
                name: "John Okafor",
                location: "Nigeria",
                image: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57"
              },
              {
                quote: "The mentorship program gave me the confidence to start my e-commerce business. My sales grow every month.",
                name: "Grace Mensah",
                location: "Ghana",
                image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 card-hover gradient-border">
                <Quote className="h-8 w-8 text-teal-600 mb-4" />
                <p className="text-muted-foreground mb-4">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full hover-scale"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="hover-scale" asChild>
              <Link href="/success-stories">View All Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section - Added id="partners" */}
      <section id="partners" className="py-20 bg-gray-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            Trusted Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4].map((partner) => (
              <Image
                key={partner}
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
                alt={`Partner ${partner}`}
                width={160}
                height={60}
                className="opacity-70 hover:opacity-100 transition-opacity hover-scale"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Added new section with id="pricing" */}
      <section id="pricing" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            Choose Your Learning Path
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="p-6 card-hover gradient-border">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Free Access</h3>
                <div className="text-3xl font-bold text-[#4ECDC4] mb-4">$0</div>
                <p className="text-muted-foreground mb-6">Perfect for getting started</p>
                <ul className="space-y-2 text-sm text-left mb-6">
                  <li>• Access to 3 introductory courses</li>
                  <li>• Basic community access</li>
                  <li>• Mobile learning app</li>
                  <li>• Progress tracking</li>
                </ul>
                <Button className="w-full bg-[#4ECDC4] hover:bg-[#4ECDC4]/90 text-white" asChild>
                  <Link href="/signup">Get Started Free</Link>
                </Button>
              </div>
            </Card>

            {/* Premium Plan */}
            <Card className="p-6 card-hover gradient-border relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <div className="text-3xl font-bold text-[#FF6B35] mb-4">$29<span className="text-lg">/month</span></div>
                <p className="text-muted-foreground mb-6">For serious learners</p>
                <ul className="space-y-2 text-sm text-left mb-6">
                  <li>• Access to all courses</li>
                  <li>• 1-on-1 mentorship sessions</li>
                  <li>• Project-based learning</li>
                  <li>• Certificate of completion</li>
                  <li>• Priority community support</li>
                  <li>• Offline content access</li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] hover:from-[#FF6B35]/90 hover:to-[#4ECDC4]/90 text-white" asChild>
                  <Link href="/signup?plan=premium">Start Premium</Link>
                </Button>
              </div>
            </Card>

            {/* Enterprise Plan */}
            <Card className="p-6 card-hover gradient-border">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold text-[#2C3E50] mb-4">Custom</div>
                <p className="text-muted-foreground mb-6">For organizations</p>
                <ul className="space-y-2 text-sm text-left mb-6">
                  <li>• Custom learning paths</li>
                  <li>• Team management tools</li>
                  <li>• Advanced analytics</li>
                  <li>• Dedicated support</li>
                  <li>• White-label options</li>
                  <li>• API access</li>
                </ul>
                <Button variant="outline" className="w-full border-[#2C3E50] text-[#2C3E50] hover:bg-[#2C3E50] hover:text-white" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-orange-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text animate-fade-up">
              Start Your Journey Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-up">
              Join thousands of successful African entrepreneurs who have transformed their lives through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400"
                asChild
              >
                <Link href="/signup">Start Learning Free</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="hover-scale"
                asChild
              >
                <Link href="/contact">Speak with an Advisor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Star, TrendingUp, Shield, Users, Award, Clock, Globe, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AIDemoCard } from "@/components/ai-demo-card"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { SuccessStoriesSection } from "@/components/success-stories-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      
      {/* 1. Hero Section */}
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
                        <TrendingUp className="w-4 h-4 text-[#4ECDC4]" />
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

      {/* 2. Animated Social Proof Section (Momentum Bar) */}
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

      {/* 3. Problem & Solution Section with AI Micro-Demo */}
      <section className="py-20 bg-gradient-to-br from-[#F7F9F9] to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
        
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#4ECDC4]/5 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#FF6B35]/5 rounded-full blur-2xl" />
        
        <div className="container px-4 md:px-6 relative">
          {/* Problem Statement */}
          <div className="text-center max-w-4xl mx-auto mb-16">
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
          </div>

          {/* Solution Statement */}
          <div className="text-center max-w-4xl mx-auto mb-16">
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

          {/* Solution Features Grid with AI Demo */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1: Mobile-First Learning */}
            <div className="p-6 border border-[#E5E8E8] rounded-lg hover:border-[#4ECDC4]/40 transition-all duration-300 hover:shadow-lg group bg-white">
              <div className="w-12 h-12 bg-[#4ECDC4]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6 text-[#4ECDC4]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">Mobile-First Learning</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">
                Optimized for smartphones with offline capabilities. Learn anywhere, anytime, even with limited internet.
              </p>
            </div>

            {/* Feature 2: AI-Powered Mentorship */}
            <div className="p-6 border border-[#E5E8E8] rounded-lg hover:border-[#4ECDC4]/40 transition-all duration-300 hover:shadow-lg group bg-white">
              <div className="w-12 h-12 bg-[#FF6B35]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">AI-Powered Mentorship</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">
                Get personalized guidance 24/7 from our AI mentor, trained on successful African business cases.
              </p>
            </div>

            {/* Feature 3: Real-World Projects */}
            <div className="p-6 border border-[#E5E8E8] rounded-lg hover:border-[#4ECDC4]/40 transition-all duration-300 hover:shadow-lg group bg-white">
              <div className="w-12 h-12 bg-[#1B4D3E]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-[#1B4D3E]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">Real-World Projects</h3>
              <p className="text-[#2C3E50]/70 text-sm leading-relaxed">
                Build actual businesses while learning. Graduate with a portfolio and revenue, not just certificates.
              </p>
            </div>

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

      {/* 4. How It Works Section */}
      <HowItWorksSection />

      {/* 5. Success Stories Section */}
      <SuccessStoriesSection />

      {/* 6. Enhanced Final Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-br from-[#2C3E50] via-[#1B4D3E] to-[#2C3E50] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#4ECDC4]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FF6B35]/5 to-[#4ECDC4]/5 rounded-full blur-3xl" />
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
              <Zap className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-sm font-medium text-white">Ready to Transform Your Future?</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Start Building Your Future,
              <span className="block bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] bg-clip-text text-transparent">
                for Free
              </span>
            </h2>
            
            {/* Sub-headline */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join thousands of successful African entrepreneurs who have transformed their lives through our platform. 
              Your journey from idea to income starts with a single click.
            </p>

            {/* Value Propositions */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center mb-4 border border-[#4ECDC4]/30">
                  <Shield className="w-8 h-8 text-[#4ECDC4]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">100% Free to Start</h3>
                <p className="text-white/70 text-sm">No credit card required. Access premium content immediately.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#FF6B35]/20 rounded-full flex items-center justify-center mb-4 border border-[#FF6B35]/30">
                  <Users className="w-8 h-8 text-[#FF6B35]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Expert Community</h3>
                <p className="text-white/70 text-sm">Connect with mentors and fellow entrepreneurs across Africa.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#1B4D3E]/40 rounded-full flex items-center justify-center mb-4 border border-[#1B4D3E]/50">
                  <Award className="w-8 h-8 text-[#4ECDC4]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Real Results</h3>
                <p className="text-white/70 text-sm">85% of our students launch profitable businesses within 6 months.</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] hover:from-[#FF6B35]/90 hover:to-[#4ECDC4]/90 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 text-lg px-8 py-4 group"
                asChild
              >
                <Link href="/signup" className="flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white hover:text-[#2C3E50] backdrop-blur-sm bg-white/10 text-lg px-8 py-4 group transition-all duration-300"
                asChild
              >
                <Link href="/courses" className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Explore Courses
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Setup in under 2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">Join 10,000+ entrepreneurs</span>
              </div>
            </div>

            {/* Urgency Element */}
            <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-3 h-3 bg-[#FF6B35] rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Limited Time: Free Premium Access</span>
              </div>
              <p className="text-white/70 text-sm">
                Get 3 months of premium features free when you sign up this week. 
                No commitment, cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Enhanced Site Footer */}
      <SiteFooter />
    </div>
  )
}
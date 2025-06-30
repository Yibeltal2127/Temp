'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Google, Facebook, LinkedIn } from '@/components/ui/social-icons';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const plan = searchParams.get('plan') || 'free';

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            plan: plan,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setSuccess('Account created successfully! Please check your email to verify your account.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'facebook' | 'linkedin_oidc') => {
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
          queryParams: {
            plan: plan,
          },
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9F9] via-white to-[#4ECDC4]/5 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-[#4ECDC4]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#FF6B35]/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="w-full max-w-md relative">
        {/* Back to Home */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#2C3E50]/70 hover:text-[#4ECDC4] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>

        <Card className="border-[#E5E8E8] shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/logo.jpg"
                alt="Tabor Digital Academy"
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold text-[#2C3E50]">
                Start Your Journey
              </CardTitle>
              <CardDescription className="text-[#2C3E50]/70">
                Join thousands of African entrepreneurs transforming their lives
              </CardDescription>
            </div>

            {/* Plan Badge */}
            {plan === 'premium' && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] text-white rounded-full px-4 py-2 text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Premium Plan Selected
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Alerts */}
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {/* Social Signup */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5"
                onClick={() => handleSocialSignup('google')}
                disabled={loading}
              >
                <Google className="w-5 h-5 mr-3" />
                Continue with Google
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5"
                  onClick={() => handleSocialSignup('facebook')}
                  disabled={loading}
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  className="border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5"
                  onClick={() => handleSocialSignup('linkedin_oidc')}
                  disabled={loading}
                >
                  <LinkedIn className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <Separator className="bg-[#E5E8E8]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-3 text-sm text-[#2C3E50]/60">
                  or create account with email
                </span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[#2C3E50]">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2C3E50]/40 w-4 h-4" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10 border-[#E5E8E8] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#2C3E50]">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2C3E50]/40 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-[#E5E8E8] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#2C3E50]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2C3E50]/40 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-[#E5E8E8] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2C3E50]/40 hover:text-[#2C3E50]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#2C3E50]">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2C3E50]/40 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 border-[#E5E8E8] focus:border-[#4ECDC4] focus:ring-[#4ECDC4]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2C3E50]/40 hover:text-[#2C3E50]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={setAgreeToTerms}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-[#2C3E50]/70 leading-relaxed">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#4ECDC4] hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[#4ECDC4] hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] hover:from-[#FF6B35]/90 hover:to-[#4ECDC4]/90 text-white"
                disabled={loading || !agreeToTerms}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="text-center">
              <span className="text-[#2C3E50]/70">Already have an account? </span>
              <Link
                href={`/login${redirectTo !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
                className="text-[#4ECDC4] hover:text-[#4ECDC4]/80 font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[#2C3E50]/60">
          <p>
            Join 10,000+ entrepreneurs already learning with Tabor Academy
          </p>
        </div>
      </div>
    </div>
  );
}
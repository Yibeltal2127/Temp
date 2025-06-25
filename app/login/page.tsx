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
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Google, Facebook, LinkedIn } from '@/components/ui/social-icons';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const message = searchParams.get('message');

  useEffect(() => {
    if (message) {
      if (message.includes('success')) {
        setSuccess(message);
      } else {
        setError(message);
      }
    }
  }, [message]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          router.push(redirectTo);
        }, 1000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'linkedin_oidc') => {
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
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

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }

    setIsResettingPassword(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Password reset email sent! Check your inbox.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsResettingPassword(false);
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
                Welcome Back
              </CardTitle>
              <CardDescription className="text-[#2C3E50]/70">
                Sign in to continue your learning journey
              </CardDescription>
            </div>
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

            {/* Social Login */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5"
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
              >
                <Google className="w-5 h-5 mr-3" />
                Continue with Google
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={loading}
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  className="border-[#E5E8E8] hover:border-[#4ECDC4] hover:bg-[#4ECDC4]/5"
                  onClick={() => handleSocialLogin('linkedin_oidc')}
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
                  or continue with email
                </span>
              </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
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
                    placeholder="Enter your password"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <Label htmlFor="remember" className="text-sm text-[#2C3E50]/70">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={isResettingPassword}
                  className="text-sm text-[#4ECDC4] hover:text-[#4ECDC4]/80 transition-colors"
                >
                  {isResettingPassword ? 'Sending...' : 'Forgot password?'}
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FF6B35] to-[#4ECDC4] hover:from-[#FF6B35]/90 hover:to-[#4ECDC4]/90 text-white"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-[#2C3E50]/70">Don't have an account? </span>
              <Link
                href={`/signup${redirectTo !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
                className="text-[#4ECDC4] hover:text-[#4ECDC4]/80 font-medium transition-colors"
              >
                Sign up for free
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-[#2C3E50]/60">
          <p>
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-[#4ECDC4] hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#4ECDC4] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
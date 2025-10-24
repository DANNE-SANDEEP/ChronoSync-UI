import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Clock, GraduationCap } from 'lucide-react';
import { NavigationContext } from '../App';

interface LoginPageProps {
  navigation: NavigationContext;
}

export function LoginPage({ navigation }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);

  const handleLogin = (role: 'student' | 'faculty' | 'admin') => {
    navigation.navigateTo(role, role);
  };

  const handleResetPassword = () => {
    // Simulate password reset
    setResetSubmitted(true);
    setTimeout(() => {
      setShowForgotPassword(false);
      setResetSubmitted(false);
      setResetEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F1E8] px-4">
      {/* Logo and Title */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
            <Clock className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl mb-2 text-gray-800">ChronoSync</h1>
        <p className="text-gray-500">Smart Classroom & Timetable Scheduler</p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md shadow-xl border-0 bg-white">
        <CardContent className="pt-8 pb-6 px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl mb-2 text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Enter your credentials to access your dashboard</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 bg-gray-50 border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => handleLogin('student')}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Login as Student
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 border-2 border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all"
              onClick={() => handleLogin('faculty')}
            >
              Login as Faculty
            </Button>

            <div className="text-center pt-1">
              <button
                className="text-gray-600 hover:text-gray-800 text-sm transition-all cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100/50"
                onClick={() => handleLogin('admin')}
              >
                Admin Access
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forgot Password Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Forgot password?{' '}
          <button
            onClick={() => setShowForgotPassword(true)}
            className="text-orange-500 hover:text-orange-600 hover:underline transition-colors"
          >
            Reset here
          </button>
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-gray-500 text-sm">
        © 2025 Lovely Professional University | Smart Classroom Scheduler
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          
          {!resetSubmitted ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmail('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  onClick={handleResetPassword}
                  disabled={!resetEmail}
                >
                  Send Reset Link
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-gray-700 mb-2">Reset link sent!</p>
              <p className="text-sm text-gray-500">
                Check your email for instructions to reset your password.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { User, Bell, Lock, Globe, Palette } from 'lucide-react';
import { useTheme } from '../App';

interface SettingsPanelProps {
  role: 'student' | 'faculty' | 'admin';
  userName: string;
}

export function SettingsPanel({ role, userName }: SettingsPanelProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  defaultValue={userName}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={`${userName.toLowerCase().replace(' ', '.')}@lpu.in`}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={role.charAt(0).toUpperCase() + role.slice(1)}
                  disabled
                  className="dark:bg-gray-700 dark:border-gray-600 capitalize"
                />
              </div>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Save Profile Changes
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-500" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize how ChronoSync looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle between light and dark theme
                </p>
              </div>
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
            </div>
            <Separator className="dark:bg-gray-700" />
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language" className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="pa">Punjabi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="ist">
                <SelectTrigger id="timezone" className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ist">IST (India Standard Time)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email notifications for important updates
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="dark:bg-gray-700" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Schedule Reminders</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get reminded about upcoming classes and meetings
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="dark:bg-gray-700" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Booking Confirmations</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Notifications for slot bookings and approvals
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-500" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Manage your security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                className="dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

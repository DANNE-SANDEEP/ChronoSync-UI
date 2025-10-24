import { Bell, Search, Moon, Sun, Menu, User, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import { useTheme } from '../App';
import { useState } from 'react';

interface TopBarProps {
  greeting: string;
  userName: string;
  showSearch?: boolean;
  userInfo?: string;
  onMenuClick?: () => void;
  role?: string;
}

export function TopBar({ greeting, userName, showSearch, userInfo, onMenuClick, role }: TopBarProps) {
  const { isDark, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Button>
        )}

        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{greeting}</p>
          <h1 className="text-xl text-gray-900 dark:text-white">{userName}</h1>
          {userInfo && <p className="text-xs text-gray-400 dark:text-gray-500">{userInfo}</p>}
        </div>

        <div className="flex items-center gap-4">
          {showSearch && (
            <div className="relative w-80 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10"
              />
            </div>
          )}

          {/* Dark Mode Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-orange-500 hover:bg-orange-500 text-xs">
              3
            </Badge>
          </Button>

          {/* Profile Popover */}
          <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <PopoverTrigger asChild>
              <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all">
                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-purple-600 text-white">
                  {userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 dark:bg-gray-800 dark:border-gray-700" align="end">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-purple-600 text-white">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{userName}</p>
                    {role && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role}</p>
                    )}
                  </div>
                </div>
                <Separator className="dark:bg-gray-700" />
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                </div>
                <Separator className="dark:bg-gray-700" />
                <div className="pt-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}

import { Home, Calendar, Clock, Users, Settings, LogOut, LayoutDashboard, FileText, Building, Zap, CheckSquare, UserCog, MessageCircle } from 'lucide-react';
import { cn } from './ui/utils';
import { Sheet, SheetContent } from './ui/sheet';

interface MenuItem {
  label: string;
  id: string;
  icon?: string;
  active?: boolean;
}

interface DashboardSidebarProps {
  menuItems: MenuItem[];
  onLogout: () => void;
  role: 'student' | 'faculty' | 'admin';
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function DashboardSidebar({ 
  menuItems, 
  onLogout, 
  role, 
  activeSection, 
  onSectionChange,
  isMobileOpen = false,
  onMobileClose
}: DashboardSidebarProps) {
  const roleColors = {
    student: 'from-orange-500 to-purple-600',
    faculty: 'from-purple-600 to-orange-500',
    admin: 'from-gray-700 to-gray-800',
  };

  // Icon mapping
  const getIcon = (label: string, isActive: boolean) => {
    const iconClass = isActive ? 'w-5 h-5' : 'w-5 h-5';
    
    // Student/Faculty icons
    if (label === 'Home') return <Home className={iconClass} />;
    if (label === 'View Timetable' || label === 'My Schedule') return <Calendar className={iconClass} />;
    if (label === 'Book Slot' || label === 'Set Availability') return <Clock className={iconClass} />;
    if (label === 'Faculty Availability' || label === 'Requests') return <Users className={iconClass} />;
    if (label === 'Apply Leave') return <FileText className={iconClass} />;
    if (label === 'Analytics') return <LayoutDashboard className={iconClass} />;
    if (label === 'Chat') return <MessageCircle className={iconClass} />;
    
    // Admin icons
    if (label === 'Dashboard Overview') return <LayoutDashboard className={iconClass} />;
    if (label === 'Manage Timetables') return <Calendar className={iconClass} />;
    if (label === 'Departments') return <Building className={iconClass} />;
    if (label === 'Resource Optimization') return <Zap className={iconClass} />;
    if (label === 'Sustainability') return <Zap className={iconClass} />;
    if (label === 'Approvals') return <CheckSquare className={iconClass} />;
    if (label === 'Users') return <UserCog className={iconClass} />;
    
    return <Home className={iconClass} />;
  };

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => handleSectionChange('home')}
          className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${roleColors[role]} flex items-center justify-center shadow-md`}>
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-lg text-gray-900 dark:text-white">ChronoSync</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role} Portal</p>
          </div>
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={index}
              onClick={() => handleSectionChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm',
                isActive
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
            >
              {getIcon(item.label, isActive)}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
        <button
          onClick={() => handleSectionChange('settings')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="w-64 p-0 bg-white dark:bg-gray-800">
          <div className="flex flex-col h-full">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
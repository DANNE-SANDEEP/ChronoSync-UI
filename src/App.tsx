import { useState, useEffect, createContext, useContext } from 'react';
import { LoginPage } from './components/LoginPage';
import { StudentDashboard } from './components/StudentDashboard';
import { FacultyDashboard } from './components/FacultyDashboard';
import { AdminPanel } from './components/AdminPanel';
import { ConfirmationPage } from './components/ConfirmationPage';
import { TimetableGenerator } from './components/TimetableGenerator';
import { Toaster } from './components/ui/sonner';

export type UserRole = 'student' | 'faculty' | 'admin' | null;
export type PageType = 'login' | 'student' | 'faculty' | 'admin' | 'confirmation' | 'timetable-generator';

export interface NavigationContext {
  currentPage: PageType;
  userRole: UserRole;
  confirmationMessage?: string;
  navigateTo: (page: PageType, role?: UserRole, message?: string) => void;
  logout: () => void;
}

// Theme context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');
  const [isDark, setIsDark] = useState(false);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const navigateTo = (page: PageType, role?: UserRole, message?: string) => {
    setCurrentPage(page);
    if (role) setUserRole(role);
    if (message) setConfirmationMessage(message);
  };

  const logout = () => {
    setCurrentPage('login');
    setUserRole(null);
  };

  const navigationContext: NavigationContext = {
    currentPage,
    userRole,
    confirmationMessage,
    navigateTo,
    logout,
  };

  const themeContext: ThemeContextType = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {currentPage === 'login' && <LoginPage navigation={navigationContext} />}
        {currentPage === 'student' && <StudentDashboard navigation={navigationContext} />}
        {currentPage === 'faculty' && <FacultyDashboard navigation={navigationContext} />}
        {currentPage === 'admin' && <AdminPanel navigation={navigationContext} />}
        {currentPage === 'confirmation' && <ConfirmationPage navigation={navigationContext} />}
        {currentPage === 'timetable-generator' && <TimetableGenerator navigation={navigationContext} />}
        <Toaster />
      </div>
    </ThemeContext.Provider>
  );
}
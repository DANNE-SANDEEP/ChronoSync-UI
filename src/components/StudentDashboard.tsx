import { useState } from 'react';
import { NavigationContext } from '../App';
import { DashboardSidebar } from './DashboardSidebar';
import { TopBar } from './TopBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BookingPopup } from './BookingPopup';
import { TimetableTable } from './TimetableTable';
import { TodayScheduleList } from './TodayScheduleList';
import { ChatSection } from './ChatSection';
import { SettingsPanel } from './SettingsPanel';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Calendar, Clock, BookOpen, TrendingUp, Users, CheckCircle } from 'lucide-react';

interface StudentDashboardProps {
  navigation: NavigationContext;
}

const timetableData = [
  { day: 'Monday', time: '9:00 - 10:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'Room 301' },
  { day: 'Monday', time: '10:00 - 11:00', subject: 'DBMS', faculty: 'Dr. Singh', room: 'Room 205' },
  { day: 'Monday', time: '11:00 - 12:00', subject: 'Web Development', faculty: 'Prof. Verma', room: 'Lab 2' },
  { day: 'Monday', time: '12:00 - 1:00', subject: 'Break', faculty: '', room: '' },
  { day: 'Monday', time: '2:00 - 3:00', subject: 'Software Engineering', faculty: 'Dr. Reddy', room: 'Room 402' },
  
  { day: 'Tuesday', time: '9:00 - 10:00', subject: 'Algorithms', faculty: 'Prof. Kumar', room: 'Room 301' },
  { day: 'Tuesday', time: '10:00 - 11:00', subject: 'Operating Systems', faculty: 'Dr. Sharma', room: 'Room 205' },
  { day: 'Tuesday', time: '12:00 - 1:00', subject: 'Break', faculty: '', room: '' },
  { day: 'Tuesday', time: '1:00 - 2:00', subject: 'Computer Networks', faculty: 'Prof. Verma', room: 'Room 301' },
  
  { day: 'Wednesday', time: '9:00 - 10:00', subject: 'Data Structures', faculty: 'Dr. Sharma', room: 'Room 301' },
  { day: 'Wednesday', time: '10:00 - 11:00', subject: 'DBMS', faculty: 'Dr. Singh', room: 'Room 205' },
  { day: 'Wednesday', time: '11:00 - 12:00', subject: 'Web Development', faculty: 'Prof. Verma', room: 'Lab 2' },
  { day: 'Wednesday', time: '12:00 - 1:00', subject: 'Break', faculty: '', room: '' },
  { day: 'Wednesday', time: '2:00 - 3:00', subject: 'Software Engineering', faculty: 'Dr. Reddy', room: 'Room 402' },
  
  { day: 'Thursday', time: '9:00 - 10:00', subject: 'Algorithms', faculty: 'Prof. Kumar', room: 'Room 301' },
  { day: 'Thursday', time: '10:00 - 11:00', subject: 'Operating Systems', faculty: 'Dr. Sharma', room: 'Room 205' },
  { day: 'Thursday', time: '12:00 - 1:00', subject: 'Break', faculty: '', room: '' },
  { day: 'Thursday', time: '1:00 - 2:00', subject: 'Computer Networks', faculty: 'Prof. Verma', room: 'Room 301' },
  
  { day: 'Friday', time: '9:00 - 10:00', subject: 'Lab - DS', faculty: 'Dr. Sharma', room: 'Lab 1' },
  { day: 'Friday', time: '10:00 - 11:00', subject: 'Lab - DBMS', faculty: 'Dr. Singh', room: 'Lab 3' },
  { day: 'Friday', time: '11:00 - 12:00', subject: 'Project Work', faculty: 'Prof. Kumar', room: 'Room 301' },
  { day: 'Friday', time: '12:00 - 1:00', subject: 'Break', faculty: '', room: '' },
];

// Today's schedule data (for Monday)
const todayScheduleData = [
  { subject: 'Data Structures', time: '9:00 - 10:00', room: 'Room 301' },
  { subject: 'DBMS', time: '10:00 - 11:00', room: 'Room 205' },
  { subject: 'Web Development', time: '11:00 - 12:00', room: 'Lab 2' },
  { subject: 'Software Engineering', time: '2:00 - 3:00', room: 'Room 402' },
];

const attendanceData = [
  { name: 'Present', value: 85, color: '#F68B1E' },
  { name: 'Absent', value: 15, color: '#E5E7EB' },
];

const weeklyClassesData = [
  { day: 'Mon', classes: 4 },
  { day: 'Tue', classes: 5 },
  { day: 'Wed', classes: 3 },
  { day: 'Thu', classes: 4 },
  { day: 'Fri', classes: 3 },
];

// Function to get color based on intensity
const getIntensityColor = (intensity: number) => {
  if (intensity <= 40) return '#22C55E'; // Green for light
  if (intensity <= 70) return '#EAB308'; // Yellow for moderate
  return '#EF4444'; // Red for hectic
};

const busyHoursData = [
  { time: '9-10', intensity: 80 },
  { time: '10-11', intensity: 90 },
  { time: '11-12', intensity: 70 },
  { time: '12-1', intensity: 30 },
  { time: '1-2', intensity: 60 },
  { time: '2-3', intensity: 85 },
  { time: '3-4', intensity: 75 },
  { time: '4-5', intensity: 40 },
].map(item => ({
  ...item,
  color: getIntensityColor(item.intensity)
}));

const facultyAvailability = [
  { name: 'Dr. Sharma', department: 'Computer Science', available: 'Mon, Wed 2-4 PM', status: 'Available' },
  { name: 'Prof. Kumar', department: 'Computer Science', available: 'Tue, Thu 3-5 PM', status: 'Busy' },
  { name: 'Dr. Singh', department: 'Information Technology', available: 'Mon-Fri 11 AM-12 PM', status: 'Available' },
  { name: 'Prof. Verma', department: 'Computer Science', available: 'Wed, Fri 1-3 PM', status: 'Available' },
  { name: 'Dr. Patel', department: 'Data Science', available: 'Tue, Thu 10 AM-12 PM', status: 'On Leave' },
];

export function StudentDashboard({ navigation }: StudentDashboardProps) {
  const [showBooking, setShowBooking] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'View Timetable', id: 'timetable' },
    { label: 'Book Slot', id: 'book-slot' },
    { label: 'Faculty Availability', id: 'faculty-availability' },
    { label: 'Analytics', id: 'analytics' },
    { label: 'Chat', id: 'chat' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl mb-2 dark:text-white">Dashboard Home</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your overview</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-white/90">
                    <Calendar className="w-4 h-4" />
                    <CardDescription className="text-white/90">Classes Today</CardDescription>
                  </div>
                  <CardTitle className="text-4xl text-white">4</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/90">Next: DBMS at 10:00 AM</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-white/90">
                    <Clock className="w-4 h-4" />
                    <CardDescription className="text-white/90">Upcoming Meetings</CardDescription>
                  </div>
                  <CardTitle className="text-4xl text-white">2</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/90">Dr. Sharma - Today 2 PM</p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <CardDescription>Attendance</CardDescription>
                  </div>
                  <CardTitle className="text-4xl text-gray-800 dark:text-white">92%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Good standing</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <TodayScheduleList 
              scheduleItems={todayScheduleData}
              title="Today's Schedule"
              date="Monday, October 23, 2025"
            />
          </>
        );

      case 'timetable':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl mb-2 dark:text-white">My Weekly Timetable</h1>
                <p className="text-gray-600 dark:text-gray-400">Your complete schedule for this week</p>
              </div>
            </div>

            <TimetableTable scheduleData={timetableData} />
          </>
        );

      case 'book-slot':
        return (
          <>
            <div>
              <h1 className="text-3xl mb-2 dark:text-white">Book a Slot</h1>
              <p className="text-gray-600 dark:text-gray-400">Schedule meetings with faculty members</p>
            </div>

            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Schedule Faculty Meeting</CardTitle>
                <CardDescription>
                  Choose from available faculty and request a meeting time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => setShowBooking(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Open Booking Form
                </Button>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl mb-4 dark:text-white">Your Upcoming Meetings</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle>Dr. Sharma</CardTitle>
                  <CardDescription>Data Structures Doubt Session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    March 18, 2025
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    2:00 PM - 3:00 PM
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Confirmed
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle>Prof. Verma</CardTitle>
                  <CardDescription>Web Development Project Discussion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    March 20, 2025
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    10:00 AM - 11:00 AM
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                    Pending Approval
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </>
        );

      case 'faculty-availability':
        return (
          <>
            <div>
              <h1 className="text-3xl mb-2">Faculty Availability</h1>
              <p className="text-gray-600">Check when faculty members are available for meetings</p>
            </div>

            <div className="grid gap-4">
              {facultyAvailability.map((faculty, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{faculty.name}</CardTitle>
                        <CardDescription>{faculty.department}</CardDescription>
                      </div>
                      <Badge
                        className={
                          faculty.status === 'Available'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : faculty.status === 'Busy'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                            : 'bg-red-100 text-red-700 hover:bg-red-100'
                        }
                      >
                        {faculty.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Available: {faculty.available}
                    </div>
                    {faculty.status === 'Available' && (
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => setShowBooking(true)}
                      >
                        Book Appointment
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        );

      case 'analytics':
        return (
          <>
            <div>
              <h1 className="text-3xl mb-2 dark:text-white">Academic Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400">Track your academic performance and engagement</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Attendance Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                  <CardDescription>Your overall attendance percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={attendanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-2">
                    <p className="text-3xl text-orange-500">85%</p>
                    <p className="text-gray-600 text-sm">Total Attendance</p>
                  </div>
                </CardContent>
              </Card>

              {/* Classes Per Week Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Class Distribution</CardTitle>
                  <CardDescription>Classes attended per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyClassesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="classes" fill="#F68B1E" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Busy Hours Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Schedule Intensity</CardTitle>
                  <CardDescription>Busy vs free hours heatmap</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={busyHoursData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="intensity" radius={[8, 8, 0, 0]}>
                        {busyHoursData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-gray-600">🟢 Light (0-40)</span>
                    <span className="text-gray-600">🟡 Moderate (41-70)</span>
                    <span className="text-gray-600">🔴 Hectic (71-100)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        );

      case 'chat':
        return (
          <>
            <div>
              <h1 className="text-3xl mb-2 dark:text-white">Chat with Faculty</h1>
              <p className="text-gray-600 dark:text-gray-400">Engage in real-time conversations with your faculty members</p>
            </div>

            <ChatSection userRole="student" />
          </>
        );

      case 'settings':
        return <SettingsPanel role="student" userName="Rahul Verma" />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar
        menuItems={menuItems}
        onLogout={navigation.logout}
        role="student"
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          greeting="Welcome, Rahul Verma" 
          userName="Rahul Verma" 
          userInfo="Student ID: 2021CSE045"
          role="student"
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">{renderContent()}</div>
        </main>
      </div>

      {showBooking && (
        <BookingPopup onClose={() => setShowBooking(false)} navigation={navigation} />
      )}
    </div>
  );
}
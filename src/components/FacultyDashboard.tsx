import { useState } from 'react';
import { NavigationContext } from '../App';
import { DashboardSidebar } from './DashboardSidebar';
import { TopBar } from './TopBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TimetableTable } from './TimetableTable';
import { TodayScheduleList } from './TodayScheduleList';
import { ChatSection } from './ChatSection';
import { SettingsPanel } from './SettingsPanel';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { Calendar, Clock, Users, FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface FacultyDashboardProps {
  navigation: NavigationContext;
}

const scheduleData = [
  { day: 'Monday', time: '9:00 - 10:00', subject: 'Data Structures - CSE-3A', batch: 'CSE-3A', room: 'Room A-301' },
  { day: 'Monday', time: '11:00 - 12:00', subject: 'Algorithms - CSE-3B', batch: 'CSE-3B', room: 'Room A-305' },
  { day: 'Monday', time: '12:00 - 1:00', subject: 'Break', batch: '', room: '' },
  { day: 'Monday', time: '2:00 - 3:00', subject: 'Data Structures - CSE-3C', batch: 'CSE-3C', room: 'Room B-201' },
  
  { day: 'Tuesday', time: '10:00 - 11:00', subject: 'Data Structures - CSE-3A', batch: 'CSE-3A', room: 'Room A-301' },
  { day: 'Tuesday', time: '12:00 - 1:00', subject: 'Break', batch: '', room: '' },
  { day: 'Tuesday', time: '2:00 - 3:00', subject: 'Algorithms - CSE-3B', batch: 'CSE-3B', room: 'Room A-305' },
  
  { day: 'Wednesday', time: '9:00 - 10:00', subject: 'Data Structures Lab - CSE-3A', batch: 'CSE-3A', room: 'Lab-2' },
  { day: 'Wednesday', time: '11:00 - 12:00', subject: 'Office Hours', batch: '', room: 'Room F-101' },
  { day: 'Wednesday', time: '12:00 - 1:00', subject: 'Break', batch: '', room: '' },
  { day: 'Wednesday', time: '3:00 - 4:00', subject: 'Algorithms - CSE-3B', batch: 'CSE-3B', room: 'Room A-305' },
  
  { day: 'Thursday', time: '9:00 - 10:00', subject: 'Data Structures - CSE-3C', batch: 'CSE-3C', room: 'Room B-201' },
  { day: 'Thursday', time: '10:00 - 11:00', subject: 'Data Structures - CSE-3A', batch: 'CSE-3A', room: 'Room A-301' },
  { day: 'Thursday', time: '12:00 - 1:00', subject: 'Break', batch: '', room: '' },
  
  { day: 'Friday', time: '11:00 - 12:00', subject: 'Algorithms Lab - CSE-3B', batch: 'CSE-3B', room: 'Lab-3' },
  { day: 'Friday', time: '12:00 - 1:00', subject: 'Break', batch: '', room: '' },
  { day: 'Friday', time: '2:00 - 3:00', subject: 'Faculty Meeting', batch: '', room: 'Conference Room' },
];

// Today's classes data (for Monday)
const todayClassesData = [
  { subject: 'Data Structures - CSE-3A', time: '9:00 - 10:00', room: 'Room A-301' },
  { subject: 'Algorithms - CSE-3B', time: '11:00 - 12:00', room: 'Room A-305' },
  { subject: 'Data Structures - CSE-3C', time: '2:00 - 3:00', room: 'Room B-201' },
];

const classesPerDayData = [
  { day: 'Mon', classes: 2 },
  { day: 'Tue', classes: 1 },
  { day: 'Wed', classes: 2 },
  { day: 'Thu', classes: 1 },
  { day: 'Fri', classes: 1 },
];

const leavesData = [
  { name: 'Leaves Taken', value: 8, color: '#F68B1E' },
  { name: 'Remaining', value: 22, color: '#E5E7EB' },
];

const workloadData = [
  { name: 'Workload', value: 68, fill: '#6B21A8' },
];

const meetingRequests = [
  { student: 'John Doe', subject: 'Doubt Clarification - Linked Lists', date: 'March 18', time: '2:00 PM', status: 'pending' },
  { student: 'Jane Smith', subject: 'Project Guidance', date: 'March 19', time: '3:00 PM', status: 'pending' },
  { student: 'Mike Johnson', subject: 'Assignment Discussion', date: 'March 20', time: '10:00 AM', status: 'pending' },
];

const availabilitySlots = [
  { day: 'Monday', time: '2:00 PM - 4:00 PM', status: 'Available' },
  { day: 'Tuesday', time: '11:00 AM - 1:00 PM', status: 'Available' },
  { day: 'Wednesday', time: '4:00 PM - 5:00 PM', status: 'Booked' },
  { day: 'Thursday', time: '3:00 PM - 5:00 PM', status: 'Available' },
  { day: 'Friday', time: '1:00 PM - 3:00 PM', status: 'Available' },
];

export function FacultyDashboard({ navigation }: FacultyDashboardProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveData, setLeaveData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    replacement: '',
  });

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'My Schedule', id: 'schedule' },
    { label: 'Set Availability', id: 'availability' },
    { label: 'Requests', id: 'requests' },
    { label: 'Apply Leave', id: 'leave' },
    { label: 'Analytics', id: 'analytics' },
    { label: 'Chat', id: 'chat' },
  ];

  const handleLeaveSubmit = () => {
    toast.success('Leave request submitted successfully!');
    setShowLeaveForm(false);
    setLeaveData({ startDate: '', endDate: '', reason: '', replacement: '' });
  };

  const handleRequestAction = (action: 'approve' | 'reject', index: number) => {
    if (action === 'approve') {
      toast.success('Meeting request approved!');
    } else {
      toast.error('Meeting request rejected');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <div>
              <h1 className="text-3xl mb-2">Faculty Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your overview</p>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Classes This Week</CardDescription>
                  <CardTitle className="text-3xl text-purple-600">7</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Scheduled</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Pending Requests</CardDescription>
                  <CardTitle className="text-3xl text-orange-500">3</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Meeting requests</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Leave Balance</CardDescription>
                  <CardTitle className="text-3xl text-green-600">22</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Days remaining</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Workload</CardDescription>
                  <CardTitle className="text-3xl text-gray-700">68%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Balanced</p>
                </CardContent>
              </Card>
            </div>

            {/* Leave Request Status */}
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      Recent Leave Request
                    </CardTitle>
                    <CardDescription>Status of your latest request</CardDescription>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                    Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-600">Dates:</span> March 15-17, 2025
                  </p>
                  <p>
                    <span className="text-gray-600">Reason:</span> Medical appointment
                  </p>
                  <p>
                    <span className="text-gray-600">Replacement:</span> Prof. Kumar
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Today's Classes */}
            <TodayScheduleList 
              scheduleItems={todayClassesData}
              title="Today's Classes"
              date="Monday, October 23, 2025"
            />
          </>
        );

      case 'schedule':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl mb-2">My Schedule</h1>
                <p className="text-gray-600">Your weekly teaching schedule</p>
              </div>
            </div>

            <TimetableTable scheduleData={scheduleData} />
          </>
        );

      case 'availability':
        return (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl mb-2">Set Availability</h1>
                <p className="text-gray-600">Manage your available time slots for student meetings</p>
              </div>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => toast.success('Availability settings updated')}
              >
                Save Changes
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {availabilitySlots.map((slot, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{slot.day}</CardTitle>
                        <CardDescription>{slot.time}</CardDescription>
                      </div>
                      <Badge
                        className={
                          slot.status === 'Available'
                            ? 'bg-green-100 text-green-700 hover:bg-green-100'
                            : 'bg-red-100 text-red-700 hover:bg-red-100'
                        }
                      >
                        {slot.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => toast.info('Slot availability toggled')}
                    >
                      {slot.status === 'Available' ? 'Mark as Unavailable' : 'Mark as Available'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Add New Availability Slot</CardTitle>
                <CardDescription>Define new time slots when you're available for meetings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Day</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Range</Label>
                    <Input placeholder="e.g., 2:00 PM - 4:00 PM" />
                  </div>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Add Slot
                </Button>
              </CardContent>
            </Card>
          </>
        );

      case 'requests':
        return (
          <>
            <div>
              <h1 className="text-3xl mb-2">Meeting Requests</h1>
              <p className="text-gray-600">Review and manage student meeting requests</p>
            </div>

            <div className="grid gap-4">
              {meetingRequests.map((request, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{request.student}</CardTitle>
                        <CardDescription>{request.subject}</CardDescription>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {request.date}, 2025
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {request.time}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleRequestAction('approve', index)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleRequestAction('reject', index)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        );

      case 'leave':
        return (
          <>
            <div>
              <h1 className="text-3xl mb-2">Apply for Leave</h1>
              <p className="text-gray-600">Submit leave requests for approval</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Leave Application Form</CardTitle>
                <CardDescription>Fill in the details for your leave request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={leaveData.startDate}
                      onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={leaveData.endDate}
                      onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Enter reason for leave"
                    value={leaveData.reason}
                    onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="replacement">Replacement Faculty (Optional)</Label>
                  <Select
                    value={leaveData.replacement}
                    onValueChange={(value) => setLeaveData({ ...leaveData, replacement: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select replacement faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prof-kumar">Prof. Kumar</SelectItem>
                      <SelectItem value="dr-singh">Dr. Singh</SelectItem>
                      <SelectItem value="prof-verma">Prof. Verma</SelectItem>
                      <SelectItem value="dr-patel">Dr. Patel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleLeaveSubmit}
                >
                  Submit Request
                </Button>
              </CardContent>
            </Card>

            {/* Leave History */}
            <div>
              <h2 className="text-2xl mb-4">Leave History</h2>
            </div>

            <div className="grid gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>February 10-12, 2025</CardTitle>
                      <CardDescription>Conference attendance</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Approved
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>March 15-17, 2025</CardTitle>
                      <CardDescription>Medical appointment</CardDescription>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                      Pending
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </>
        );

      case 'analytics':
        return (
          <>
            <div>
              <h1 className="text-3xl mb-2">Faculty Analytics</h1>
              <p className="text-gray-600">Track your teaching performance and workload</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Classes Per Day */}
              <Card>
                <CardHeader>
                  <CardTitle>Classes Per Day</CardTitle>
                  <CardDescription>Your teaching load distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={classesPerDayData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="classes"
                        stroke="#F68B1E"
                        strokeWidth={3}
                        dot={{ fill: '#F68B1E', r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Leaves Taken */}
              <Card>
                <CardHeader>
                  <CardTitle>Leave Balance</CardTitle>
                  <CardDescription>Leaves taken vs remaining</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={leavesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {leavesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-2">
                    <p className="text-3xl text-orange-500">8/30</p>
                    <p className="text-gray-600 text-sm">Days Used</p>
                  </div>
                </CardContent>
              </Card>

              {/* Workload Intensity */}
              <Card>
                <CardHeader>
                  <CardTitle>Workload Intensity</CardTitle>
                  <CardDescription>Current teaching load status</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="100%"
                      barSize={20}
                      data={workloadData}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <RadialBar background dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-2">
                    <p className="text-3xl text-purple-600">68%</p>
                    <p className="text-gray-600 text-sm">Balanced Load</p>
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
              <h1 className="text-3xl mb-2 dark:text-white">Chat with Students</h1>
              <p className="text-gray-600 dark:text-gray-400">Communicate with your students directly</p>
            </div>

            <ChatSection userRole="faculty" />
          </>
        );

      case 'settings':
        return <SettingsPanel role="faculty" userName="Dr. Sharma" />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar
        menuItems={menuItems}
        onLogout={navigation.logout}
        role="faculty"
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          greeting="Good Morning, Professor" 
          userName="Dr. Sharma"
          role="faculty"
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
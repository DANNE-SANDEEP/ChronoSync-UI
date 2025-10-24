import { useState } from 'react';
import { NavigationContext } from '../App';
import { DashboardSidebar } from './DashboardSidebar';
import { TopBar } from './TopBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Building,
  Calendar,
  Users,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { SettingsPanel } from './SettingsPanel';

interface AdminPanelProps {
  navigation: NavigationContext;
}

const electricityData = [
  { month: 'Jan', consumption: 4200, usage: 85 },
  { month: 'Feb', consumption: 3800, usage: 78 },
  { month: 'Mar', consumption: 4100, usage: 82 },
  { month: 'Apr', consumption: 3500, usage: 70 },
  { month: 'May', consumption: 3900, usage: 80 },
  { month: 'Jun', consumption: 3600, usage: 75 },
];

const classroomUtilization = [
  { name: 'Utilized', value: 78, color: '#F68B1E' },
  { name: 'Idle', value: 22, color: '#E5E7EB' },
];

const facultyAllocation = [
  { department: 'Computer Science', faculty: 45, classrooms: 12 },
  { department: 'Mechanical', faculty: 38, classrooms: 10 },
  { department: 'Civil', faculty: 32, classrooms: 8 },
  { department: 'Electrical', faculty: 40, classrooms: 11 },
  { department: 'Electronics', faculty: 35, classrooms: 9 },
];

const departmentUtilization = [
  { department: 'Computer Science', utilization: 85, students: 450, avgHours: 6.2 },
  { department: 'Mechanical', utilization: 78, students: 380, avgHours: 5.8 },
  { department: 'Civil', utilization: 72, students: 320, avgHours: 5.5 },
  { department: 'Electrical', utilization: 80, students: 400, avgHours: 6.0 },
  { department: 'Electronics', utilization: 75, students: 350, avgHours: 5.7 },
];

const pendingApprovals = [
  { type: 'Leave Request', name: 'Dr. Sharma', details: 'March 15-17, 2025', priority: 'High' },
  { type: 'Timetable Change', name: 'CSE Department', details: 'Lab slot modification', priority: 'Medium' },
  { type: 'Resource Request', name: 'Prof. Kumar', details: 'Additional projector for Lab-3', priority: 'Low' },
];

const usersList = [
  { name: 'Dr. Sharma', role: 'Faculty', department: 'Computer Science', status: 'Active' },
  { name: 'John Doe', role: 'Student', department: 'Computer Science', status: 'Active' },
  { name: 'Prof. Kumar', role: 'Faculty', department: 'Computer Science', status: 'Active' },
  { name: 'Jane Smith', role: 'Student', department: 'Information Technology', status: 'Active' },
  { name: 'Dr. Singh', role: 'Faculty', department: 'Information Technology', status: 'On Leave' },
];

export function AdminPanel({ navigation }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard Overview', id: 'dashboard' },
    { label: 'Manage Timetables', id: 'timetables' },
    { label: 'Departments', id: 'departments' },
    { label: 'Resource Optimization', id: 'resources' },
    { label: 'Sustainability', id: 'sustainability' },
    { label: 'Approvals', id: 'approvals' },
    { label: 'Users', id: 'users' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl mb-2">Dashboard Overview</h1>
                <p className="text-gray-600">Comprehensive institution management overview</p>
              </div>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => toast.success('Report generated successfully')}
              >
                Generate Report
              </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Classroom Utilization</CardDescription>
                  <CardTitle className="text-3xl text-orange-500">78%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +5% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Idle Hours Saved</CardDescription>
                  <CardTitle className="text-3xl text-purple-600">342</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% efficiency gain
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Power Saved (kWh)</CardDescription>
                  <CardTitle className="text-3xl text-green-600">1,240</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    -8% energy consumption
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active Departments</CardDescription>
                  <CardTitle className="text-3xl text-gray-700">12</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-1" />
                    All operational
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Charts */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Classroom Utilization</CardTitle>
                  <CardDescription>Space optimization overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={classroomUtilization}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {classroomUtilization.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Faculty Allocation</CardTitle>
                  <CardDescription>Department-wise distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={facultyAllocation.slice(0, 3)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="faculty" fill="#F68B1E" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </>
        );

      case 'timetables':
        return (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl mb-2">Manage Timetables</h1>
                <p className="text-gray-600">Create and manage academic schedules</p>
              </div>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigation.navigateTo('timetable-generator')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Generate New Timetable
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {departmentUtilization.map((dept, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{dept.department}</CardTitle>
                        <CardDescription>{dept.students} Students</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Utilization</span>
                        <span className="text-orange-500">{dept.utilization}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500"
                          style={{ width: `${dept.utilization}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Avg. Hours/Day</span>
                      <span>{dept.avgHours}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Timetable
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        );

      case 'departments':
        return (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl mb-2">Departments</h1>
                <p className="text-gray-600">Manage department information and resources</p>
              </div>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => toast.success('Department added successfully')}
              >
                Add Department
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Department-wise Statistics</CardTitle>
                <CardDescription>Overview of all academic departments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Utilization %</TableHead>
                      <TableHead>Total Students</TableHead>
                      <TableHead>Avg. Hours/Day</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentUtilization.map((dept) => (
                      <TableRow key={dept.department}>
                        <TableCell>{dept.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-orange-500"
                                style={{ width: `${dept.utilization}%` }}
                              ></div>
                            </div>
                            <span>{dept.utilization}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{dept.students}</TableCell>
                        <TableCell>{dept.avgHours}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        );

      case 'resources':
        return (
          <>
            <div>
              <h1 className="text-3xl mb-2">Resource Optimization</h1>
              <p className="text-gray-600">Optimize classroom and faculty allocation</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Faculty vs Classroom Allocation</CardTitle>
                <CardDescription>Department-wise resource distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={facultyAllocation}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="faculty" fill="#F68B1E" radius={[8, 8, 0, 0]} name="Faculty Count" />
                    <Bar dataKey="classrooms" fill="#6B21A8" radius={[8, 8, 0, 0]} name="Classrooms" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Total Classrooms</CardTitle>
                  <CardDescription>Available spaces</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl text-orange-500">50</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Faculty</CardTitle>
                  <CardDescription>Teaching staff</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl text-purple-600">190</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimization Score</CardTitle>
                  <CardDescription>Resource efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl text-green-600">92%</p>
                </CardContent>
              </Card>
            </div>
          </>
        );

      case 'sustainability':
        return (
          <>
            <div>
              <h1 className="text-3xl mb-2 flex items-center">
                <Zap className="w-8 h-8 mr-3 text-green-600" />
                Sustainability Metrics
              </h1>
              <p className="text-gray-600">Track environmental impact and resource conservation</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Electricity Consumption */}
              <Card>
                <CardHeader>
                  <CardTitle>Electricity Consumption vs Usage</CardTitle>
                  <CardDescription>Monthly trends in energy usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={electricityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="consumption"
                        stroke="#F68B1E"
                        strokeWidth={3}
                        name="Consumption (kWh)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="usage"
                        stroke="#6B21A8"
                        strokeWidth={3}
                        name="Usage Hours (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Classroom Utilization Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Classroom Utilization Efficiency</CardTitle>
                  <CardDescription>Overall space optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={classroomUtilization}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {classroomUtilization.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </>
        );

      case 'approvals':
        return (
          <>
            <div>
              <h1 className="text-3xl mb-2">Pending Approvals</h1>
              <p className="text-gray-600">Review and approve requests from faculty and departments</p>
            </div>

            <div className="grid gap-4">
              {pendingApprovals.map((approval, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{approval.type}</CardTitle>
                        <CardDescription>
                          {approval.name} - {approval.details}
                        </CardDescription>
                      </div>
                      <Badge
                        className={
                          approval.priority === 'High'
                            ? 'bg-red-100 text-red-700 hover:bg-red-100'
                            : approval.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                        }
                      >
                        {approval.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => toast.success(`${approval.type} approved`)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => toast.error(`${approval.type} rejected`)}
                      >
                        Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        );

      case 'users':
        return (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl mb-2">User Management</h1>
                <p className="text-gray-600">Manage faculty and student accounts</p>
              </div>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => toast.success('User added successfully')}
              >
                <Users className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Complete list of faculty and students</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersList.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.status === 'Active'
                                ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toast.info(`Viewing ${user.name}'s profile`)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        );

      case 'settings':
        return <SettingsPanel role="admin" userName="Administrator" />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar
        menuItems={menuItems}
        onLogout={navigation.logout}
        role="admin"
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          greeting="Admin Dashboard" 
          userName="Administrator" 
          role="admin" 
          showSearch 
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

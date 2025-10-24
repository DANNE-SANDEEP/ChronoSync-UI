import { useState } from 'react';
import { NavigationContext } from '../App';
import { DashboardSidebar } from './DashboardSidebar';
import { TopBar } from './TopBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ArrowLeft, Sparkles, CheckCircle, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TimetableGeneratorProps {
  navigation: NavigationContext;
}

const generatedOptions = [
  {
    id: 1,
    name: 'Balanced Distribution',
    efficiency: 92,
    idleTime: 8,
    conflicts: 0,
    highlights: ['Even workload', 'Minimal gaps', 'Optimal room usage'],
  },
  {
    id: 2,
    name: 'Morning-Heavy Schedule',
    efficiency: 88,
    idleTime: 12,
    conflicts: 1,
    highlights: ['Morning focus', 'Afternoon free', 'Student preference'],
  },
  {
    id: 3,
    name: 'Lab-Optimized',
    efficiency: 90,
    idleTime: 10,
    conflicts: 0,
    highlights: ['Lab clustering', 'Theory-practice balance', 'Equipment efficiency'],
  },
];

const suggestions = [
  {
    title: 'Classroom A-301 Underutilized',
    description: 'Room available 18 hours/week. Consider scheduling additional sessions.',
    impact: 'High',
  },
  {
    title: 'Faculty Workload Imbalance',
    description: 'Dr. Sharma has 25% more classes than average. Redistribute 2-3 sessions.',
    impact: 'Medium',
  },
  {
    title: 'Tuesday Afternoon Gap',
    description: 'Multiple batches have 2-hour idle time. Schedule tutorial sessions.',
    impact: 'Low',
  },
];

export function TimetableGenerator({ navigation }: TimetableGeneratorProps) {
  const [step, setStep] = useState<'input' | 'output'>('input');
  const [formData, setFormData] = useState({
    classrooms: '25',
    batches: '12',
    subjects: '15',
    faculty: '45',
    classesPerDay: '6',
    avgLeaves: '2',
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const menuItems = [
    { label: 'Dashboard Overview' },
    { label: 'Manage Timetables', active: true },
    { label: 'Departments' },
    { label: 'Resource Optimization' },
    { label: 'Sustainability' },
    { label: 'Approvals' },
    { label: 'Users' },
  ];

  const handleGenerate = () => {
    toast.success('Generating optimized timetables...');
    setTimeout(() => {
      setStep('output');
    }, 1500);
  };

  const handleSelectOption = (id: number) => {
    setSelectedOption(id);
    toast.success('Timetable option selected successfully!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar
        menuItems={menuItems}
        onLogout={navigation.logout}
        role="admin"
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          greeting="Admin Dashboard"
          userName="Administrator"
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (step === 'output') {
                    setStep('input');
                    setSelectedOption(null);
                  } else {
                    navigation.navigateTo('admin');
                  }
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl mb-2">Optimized Timetable Generator</h1>
                <p className="text-gray-600">
                  {step === 'input' 
                    ? 'Enter parameters to generate intelligent schedules'
                    : 'Review and select the best timetable option'
                  }
                </p>
              </div>
            </div>

            {step === 'input' ? (
              <>
                {/* Input Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-orange-500" />
                      Key Parameters
                    </CardTitle>
                    <CardDescription>
                      Configure scheduling constraints and requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="classrooms">Number of Classrooms</Label>
                        <Input
                          id="classrooms"
                          type="number"
                          value={formData.classrooms}
                          onChange={(e) => setFormData({ ...formData, classrooms: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="batches">Number of Batches</Label>
                        <Input
                          id="batches"
                          type="number"
                          value={formData.batches}
                          onChange={(e) => setFormData({ ...formData, batches: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subjects">Total Subjects</Label>
                        <Input
                          id="subjects"
                          type="number"
                          value={formData.subjects}
                          onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="faculty">Total Faculty Members</Label>
                        <Input
                          id="faculty"
                          type="number"
                          value={formData.faculty}
                          onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="classesPerDay">Classes Per Day</Label>
                        <Input
                          id="classesPerDay"
                          type="number"
                          value={formData.classesPerDay}
                          onChange={(e) => setFormData({ ...formData, classesPerDay: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="avgLeaves">Avg. Faculty Leaves/Month</Label>
                        <Input
                          id="avgLeaves"
                          type="number"
                          value={formData.avgLeaves}
                          onChange={(e) => setFormData({ ...formData, avgLeaves: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <Label className="text-purple-700">Special Fixed Slots (Optional)</Label>
                      <p className="text-sm text-gray-600 mt-1 mb-3">
                        Add any time slots that must remain fixed (e.g., morning assemblies, lunch breaks)
                      </p>
                      <Input placeholder="e.g., Monday 9:00-9:30 AM - Assembly" />
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                        onClick={handleGenerate}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Timetable
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Generated Options */}
                <div>
                  <h2 className="text-2xl mb-4">Optimized Timetable Options</h2>
                  <p className="text-gray-600 mb-6">
                    AI-generated schedules based on your parameters. Select the best option for your institution.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {generatedOptions.map((option) => (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-all ${
                        selectedOption === option.id
                          ? 'border-2 border-orange-500 shadow-lg'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => handleSelectOption(option.id)}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{option.name}</CardTitle>
                          {selectedOption === option.id && (
                            <CheckCircle className="w-6 h-6 text-orange-500" />
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Efficiency</span>
                            <span className="text-green-600">{option.efficiency}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${option.efficiency}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600">Idle Time</p>
                            <p className="text-lg">{option.idleTime}h</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Conflicts</p>
                            <p className="text-lg">{option.conflicts}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Highlights:</p>
                          <div className="flex flex-wrap gap-2">
                            {option.highlights.map((highlight, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 space-y-2">
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info('Preview functionality coming soon');
                            }}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          {selectedOption === option.id && (
                            <Button
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigation.navigateTo('confirmation', navigation.userRole, 'Timetable generated and saved successfully!');
                              }}
                            >
                              Confirm & Apply
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* AI Suggestions */}
                <div className="mt-8">
                  <h2 className="text-2xl mb-4">Suggested Rearrangements</h2>
                  <p className="text-gray-600 mb-6">
                    AI-based recommendations to further optimize your schedule
                  </p>
                </div>

                <div className="grid gap-4">
                  {suggestions.map((suggestion, idx) => (
                    <Card key={idx} className="border-l-4 border-l-purple-500">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                          <Badge
                            className={
                              suggestion.impact === 'High'
                                ? 'bg-red-100 text-red-700 hover:bg-red-100'
                                : suggestion.impact === 'Medium'
                                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            }
                          >
                            {suggestion.impact} Impact
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{suggestion.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

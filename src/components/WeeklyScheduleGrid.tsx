import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, MapPin, Users } from 'lucide-react';

interface ScheduleItem {
  day: string;
  time: string;
  subject: string;
  faculty?: string;
  batch?: string;
  room: string;
}

interface WeeklyScheduleGridProps {
  scheduleData: ScheduleItem[];
  showFaculty?: boolean;
  showBatch?: boolean;
}

const DAYS_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function WeeklyScheduleGrid({ scheduleData, showFaculty = true, showBatch = false }: WeeklyScheduleGridProps) {
  // Group schedule data by day
  const scheduleByDay = scheduleData.reduce((acc, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  // Sort items within each day by time
  Object.keys(scheduleByDay).forEach(day => {
    scheduleByDay[day].sort((a, b) => {
      const timeA = convertTo24Hour(a.time);
      const timeB = convertTo24Hour(b.time);
      return timeA.localeCompare(timeB);
    });
  });

  // Get only the days that have classes
  const daysWithClasses = DAYS_ORDER.filter(day => scheduleByDay[day]);

  if (daysWithClasses.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">No classes scheduled for this week.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {daysWithClasses.map((day) => (
        <Card key={day} className="border-t-4 border-t-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-orange-50">
            <CardTitle className="text-center">{day}</CardTitle>
            <div className="text-center text-sm text-gray-500 mt-1">
              {scheduleByDay[day].length} {scheduleByDay[day].length === 1 ? 'class' : 'classes'}
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {scheduleByDay[day].map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-white border border-gray-200 hover:shadow-md hover:border-orange-300 transition-all"
              >
                <div className="space-y-2">
                  {/* Time Badge */}
                  <div className="flex items-center justify-between">
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.time}
                    </Badge>
                  </div>

                  {/* Subject */}
                  <div className="text-gray-800 line-clamp-2">{item.subject}</div>

                  {/* Faculty */}
                  {showFaculty && item.faculty && (
                    <div className="text-sm text-gray-600 flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {item.faculty}
                    </div>
                  )}

                  {/* Batch */}
                  {showBatch && item.batch && (
                    <div className="text-sm text-gray-600 flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {item.batch}
                    </div>
                  )}

                  {/* Room */}
                  <div className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    Room {item.room}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Helper function to convert 12-hour time to 24-hour format for sorting
function convertTo24Hour(time: string): string {
  const [timePart, period] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

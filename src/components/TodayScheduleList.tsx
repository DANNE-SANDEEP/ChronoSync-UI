import { Card } from './ui/card';

interface ScheduleItem {
  subject: string;
  time: string;
  room: string;
}

interface TodayScheduleListProps {
  scheduleItems: ScheduleItem[];
  title?: string;
  date?: string;
}

export function TodayScheduleList({ scheduleItems, title = "Today's Schedule", date }: TodayScheduleListProps) {
  return (
    <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="mb-4">
        <h2 className="text-xl mb-1 dark:text-white">{title}</h2>
        {date && <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>}
      </div>
      
      <div className="space-y-3">
        {scheduleItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-orange-500 hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <h3 className="text-gray-800 dark:text-gray-200">{item.subject}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.time}</p>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 ml-4">
              {item.room}
            </div>
          </div>
        ))}
        
        {scheduleItems.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No classes scheduled for today
          </div>
        )}
      </div>
    </Card>
  );
}
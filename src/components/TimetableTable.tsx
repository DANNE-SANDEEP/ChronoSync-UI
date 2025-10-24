import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
  room?: string;
  faculty?: string;
  batch?: string;
}

interface TimetableTableProps {
  scheduleData: TimetableEntry[];
}

const TIME_SLOTS = [
  '9:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 1:00',
  '1:00 - 2:00',
  '2:00 - 3:00',
  '3:00 - 4:00',
  '4:00 - 5:00',
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function TimetableTable({ scheduleData }: TimetableTableProps) {
  // Create a map for quick lookup
  const scheduleMap = new Map<string, TimetableEntry>();
  
  scheduleData.forEach(entry => {
    const key = `${entry.day}-${entry.time}`;
    scheduleMap.set(key, entry);
  });

  // Helper to get color for subject (alternating colors)
  const getSubjectColor = (index: number) => {
    const colors = ['border-orange-500', 'border-purple-500'];
    return colors[index % colors.length];
  };

  // Helper to get background color for subject
  const getSubjectBg = (index: number) => {
    const colors = ['bg-orange-50', 'bg-purple-50'];
    return colors[index % colors.length];
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-700">
            <TableHead className="w-32 border-r dark:border-gray-700 dark:text-gray-300">Time</TableHead>
            {DAYS.map(day => (
              <TableHead key={day} className="text-center border-r last:border-r-0 dark:border-gray-700 dark:text-gray-300">
                {day}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {TIME_SLOTS.map((timeSlot, slotIndex) => (
            <TableRow key={timeSlot} className="h-20 dark:border-gray-700">
              <TableCell className="border-r bg-gray-50 dark:bg-gray-700 dark:border-gray-700 align-top pt-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">{timeSlot}</div>
              </TableCell>
              {DAYS.map((day, dayIndex) => {
                const entry = scheduleMap.get(`${day}-${timeSlot}`);
                
                return (
                  <TableCell key={`${day}-${timeSlot}`} className="border-r last:border-r-0 dark:border-gray-700 p-2">
                    {entry ? (
                      <div
                        className={`h-full rounded px-3 py-2 border-l-4 ${getSubjectColor(
                          dayIndex + slotIndex
                        )} ${getSubjectBg(dayIndex + slotIndex)}`}
                      >
                        <div className="text-sm text-gray-800 dark:text-gray-900">{entry.subject}</div>
                      </div>
                    ) : null}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
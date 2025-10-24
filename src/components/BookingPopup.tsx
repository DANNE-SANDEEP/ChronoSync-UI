import { useState } from 'react';
import { NavigationContext } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X } from 'lucide-react';

interface BookingPopupProps {
  onClose: () => void;
  navigation: NavigationContext;
}

export function BookingPopup({ onClose, navigation }: BookingPopupProps) {
  const [bookingData, setBookingData] = useState({
    faculty: '',
    date: '',
    time: '',
    purpose: '',
  });

  const handleBooking = () => {
    navigation.navigateTo('confirmation', navigation.userRole, 'Meeting booked successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          className="absolute top-4 right-4 h-8 w-8 p-0"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader>
          <CardTitle>Book a Slot</CardTitle>
          <CardDescription>
            Schedule a meeting with faculty. Requests are confirmed via faculty approval.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="faculty">Faculty Name</Label>
            <Select
              value={bookingData.faculty}
              onValueChange={(value) => setBookingData({ ...bookingData, faculty: value })}
            >
              <SelectTrigger id="faculty">
                <SelectValue placeholder="Select faculty member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr-sharma">Dr. Sharma</SelectItem>
                <SelectItem value="prof-kumar">Prof. Kumar</SelectItem>
                <SelectItem value="dr-singh">Dr. Singh</SelectItem>
                <SelectItem value="prof-verma">Prof. Verma</SelectItem>
                <SelectItem value="dr-patel">Dr. Patel</SelectItem>
                <SelectItem value="dr-reddy">Dr. Reddy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select
              value={bookingData.time}
              onValueChange={(value) => setBookingData({ ...bookingData, time: value })}
            >
              <SelectTrigger id="time">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">09:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="12:00">12:00 PM</SelectItem>
                <SelectItem value="14:00">02:00 PM</SelectItem>
                <SelectItem value="15:00">03:00 PM</SelectItem>
                <SelectItem value="16:00">04:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea
              id="purpose"
              placeholder="Briefly describe the purpose of this meeting"
              value={bookingData.purpose}
              onChange={(e) => setBookingData({ ...bookingData, purpose: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleBooking}
            >
              Book Slot
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

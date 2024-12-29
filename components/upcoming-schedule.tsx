import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock } from 'lucide-react'

const schedule = [
  { id: 1, event: 'Team Meeting', time: '09:00 AM - 10:00 AM' },
  { id: 2, event: 'Lunch Break', time: '12:00 PM - 01:00 PM' },
  { id: 3, event: 'Patient Consultation', time: '02:00 PM - 03:00 PM' },
]

export function UpcomingSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {schedule.map((item) => (
            <div key={item.id} className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{item.event}</p>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


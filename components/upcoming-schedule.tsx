import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const schedule = [
  { id: 1, event: 'Team Meeting', time: '09:00 AM - 10:00 AM' },
  { id: 2, event: 'Lunch Break', time: '12:00 PM - 01:00 PM' },
  { id: 3, event: 'Patient Consultation', time: '02:00 PM - 03:00 PM' },
]

export function UpcomingSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {schedule.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <p className="font-medium text-foreground">{item.event}</p>
              <p className="text-sm text-muted-foreground">{item.time}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

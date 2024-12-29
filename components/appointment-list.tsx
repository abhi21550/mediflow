import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const appointments = [
  { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'Check-up' },
  { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Follow-up' },
  { id: 3, patient: 'Bob Johnson', time: '02:00 PM', type: 'Consultation' },
]

export function AppointmentList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Today's Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <p className="font-medium text-foreground">{appointment.patient}</p>
                <p className="text-sm text-muted-foreground">{appointment.type}</p>
              </div>
              <p className="text-sm text-muted-foreground mt-1 sm:mt-0">{appointment.time}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


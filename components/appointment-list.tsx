import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const appointments = [
  { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'Check-up', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Follow-up', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 3, patient: 'Bob Johnson', time: '02:00 PM', type: 'Consultation', avatar: '/placeholder.svg?height=32&width=32' },
]

export function AppointmentList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                <AvatarFallback>{appointment.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{appointment.patient}</p>
                <p className="text-sm text-muted-foreground">{appointment.type}</p>
              </div>
              <div className="ml-auto font-medium">{appointment.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


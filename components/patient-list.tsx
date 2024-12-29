import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const patients = [
  { id: 1, name: 'Alice Williams', lastVisit: '2023-06-15', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 2, name: 'Charlie Brown', lastVisit: '2023-06-10', avatar: '/placeholder.svg?height=32&width=32' },
  { id: 3, name: 'David Miller', lastVisit: '2023-06-05', avatar: '/placeholder.svg?height=32&width=32' },
]

export function PatientList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={patient.avatar} alt={patient.name} />
                <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{patient.name}</p>
                <p className="text-sm text-muted-foreground">Last visit: {patient.lastVisit}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


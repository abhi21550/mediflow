import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const patients = [
  { id: 1, name: 'Alice Williams', lastVisit: '2023-06-15' },
  { id: 2, name: 'Charlie Brown', lastVisit: '2023-06-10' },
  { id: 3, name: 'David Miller', lastVisit: '2023-06-05' },
]

export function PatientList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {patients.map((patient) => (
            <li key={patient.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="font-medium text-foreground">{patient.name}</p>
              <p className="text-sm text-muted-foreground mt-1 sm:mt-0">Last visit: {patient.lastVisit}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


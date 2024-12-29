'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

// Mock data for appointments
const appointments = [
  { id: 1, patientId: 'P001', name: 'John Doe', condition: 'Flu', severity: 'Low', status: 'Scheduled' },
  { id: 2, patientId: 'P002', name: 'Jane Smith', condition: 'Fracture', severity: 'Medium', status: 'In Progress' },
  { id: 3, patientId: 'P003', name: 'Bob Johnson', condition: 'Checkup', severity: 'Low', status: 'Completed' },
  { id: 4, patientId: 'P004', name: 'Alice Brown', condition: 'Allergy', severity: 'Medium', status: 'Scheduled' },
  { id: 5, patientId: 'P005', name: 'Charlie Davis', condition: 'Surgery', severity: 'High', status: 'Scheduled' },
]

export function AppointmentTable() {
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>([])
  const [filter, setFilter] = useState('')

  const filteredAppointments = appointments.filter(appointment =>
    appointment.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleSelectAll = () => {
    if (selectedAppointments.length === filteredAppointments.length) {
      setSelectedAppointments([])
    } else {
      setSelectedAppointments(filteredAppointments.map(a => a.id))
    }
  }

  const handleSelectAppointment = (id: number) => {
    setSelectedAppointments(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const handleConfirmSelected = () => {
    console.log('Confirming appointments:', selectedAppointments)
    // Implement confirmation logic here
  }

  const handleRescheduleSelected = () => {
    console.log('Rescheduling appointments:', selectedAppointments)
    // Implement rescheduling logic here
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter patients by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedAppointments.length === filteredAppointments.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Report</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedAppointments.includes(appointment.id)}
                    onCheckedChange={() => handleSelectAppointment(appointment.id)}
                  />
                </TableCell>
                <TableCell>{appointment.patientId}</TableCell>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment.condition}</TableCell>
                <TableCell>{appointment.severity}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>
                  <Button asChild variant="ghost">
                    <Link href={`/patients/${appointment.patientId}`}>View Report</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end space-x-2">
        <Button onClick={handleConfirmSelected} disabled={selectedAppointments.length === 0}>
          Confirm Selected
        </Button>
        <Button onClick={handleRescheduleSelected} disabled={selectedAppointments.length === 0}>
          Reschedule Selected
        </Button>
      </div>
    </div>
  )
}
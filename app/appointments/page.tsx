'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

// Mock data for appointments
const appointments = [
  { id: 1, patientId: 'P001', name: 'John Doe', date: '2023-06-15', time: '09:00 AM', condition: 'Checkup', status: 'Scheduled' },
  { id: 2, patientId: 'P002', name: 'Jane Smith', date: '2023-06-15', time: '10:30 AM', condition: 'Follow-up', status: 'Confirmed' },
  { id: 3, patientId: 'P003', name: 'Bob Johnson', date: '2023-06-16', time: '02:00 PM', condition: 'Consultation', status: 'Completed' },
  { id: 4, patientId: 'P004', name: 'Alice Brown', date: '2023-06-16', time: '03:30 PM', condition: 'Checkup', status: 'Scheduled' },
  { id: 5, patientId: 'P005', name: 'Charlie Davis', date: '2023-06-17', time: '11:00 AM', condition: 'Follow-up', status: 'Confirmed' },
]

export default function AppointmentsPage() {
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>([])
  const [filterName, setFilterName] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.name.toLowerCase().includes(filterName.toLowerCase()) &&
    (!selectedDate || appointment.date === format(selectedDate, 'yyyy-MM-dd'))
  )

  const handleSelectAppointment = (appointmentId: number) => {
    setSelectedAppointments((prev) =>
      prev.includes(appointmentId)
        ? prev.filter((id) => id !== appointmentId)
        : [...prev, appointmentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedAppointments.length === filteredAppointments.length) {
      setSelectedAppointments([])
    } else {
      setSelectedAppointments(filteredAppointments.map((a) => a.id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      <div className="flex justify-between items-center space-x-4">
        <Input
          placeholder="Filter by patient name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="max-w-sm"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
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
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
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
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.condition}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => console.log('View details', appointment.id)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Edit appointment', appointment.id)}>
                        Edit Appointment
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Cancel appointment', appointment.id)}>
                        Cancel Appointment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          onClick={() => console.log('Confirm selected:', selectedAppointments)}
          disabled={selectedAppointments.length === 0}
        >
          Confirm Selected
        </Button>
        <Button
          variant="outline"
          onClick={() => console.log('Reschedule selected:', selectedAppointments)}
          disabled={selectedAppointments.length === 0}
        >
          Reschedule Selected
        </Button>
      </div>
    </div>
  )
}


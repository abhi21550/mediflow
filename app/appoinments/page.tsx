'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
//import { Input } from '@/components/ui/input';
import Input from '@/components/ui/input'; // Corrected import statement
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define TypeScript interface for appointment data
interface Appointment {
  id: number;
  patientId: string;
  name: string;
  condition: string;
  severity: string;
  status: string;
}

// Mock data for appointments
const appointments: Appointment[] = [
  { id: 1, patientId: 'P001', name: 'John Doe', condition: 'Flu', severity: 'Mild', status: 'Scheduled' },
  { id: 2, patientId: 'P002', name: 'Jane Smith', condition: 'Fracture', severity: 'Moderate', status: 'Confirmed' },
  { id: 3, patientId: 'P003', name: 'Bob Johnson', condition: 'Checkup', severity: 'Low', status: 'Completed' },
  { id: 4, patientId: 'P004', name: 'Alice Brown', condition: 'Allergy', severity: 'Mild', status: 'Scheduled' },
  { id: 5, patientId: 'P005', name: 'Charlie Davis', condition: 'Surgery', severity: 'Severe', status: 'Confirmed' },
];

export default function AppointmentsPage() {
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>([]);
  const [filterName, setFilterName] = useState<string>('');

  // Memoize filtered appointments for performance optimization
  const filteredAppointments = useMemo(
    () =>
      appointments.filter(appointment =>
        appointment.name.toLowerCase().includes(filterName.toLowerCase())
      ),
    [filterName]
  );

  const handleSelectAppointment = (appointmentId: number) => {
    setSelectedAppointments(prev =>
      prev.includes(appointmentId)
        ? prev.filter(id => id !== appointmentId)
        : [...prev, appointmentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAppointments.length === filteredAppointments.length) {
      setSelectedAppointments([]);
    } else {
      setSelectedAppointments(filteredAppointments.map(a => a.id));
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Appointments</h1>
      <div className="mb-4">
        <Input
          placeholder="Filter by patient name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="max-w-sm"
        />
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
              <TableHead>Condition</TableHead>
              <TableHead>Severity</TableHead>
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
                <TableCell>{appointment.condition}</TableCell>
                <TableCell>{appointment.severity}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href={`/dashboard/patients/${appointment.patientId}`}>
                          View Report
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                      <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 space-x-2">
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
  );
}

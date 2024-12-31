'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Badge } from '@/components/ui/badge'

// Mock data for patients
const patients = [
  { id: 'P001', name: 'John Doe', status: 'Active', lastAppointment: '2023-06-15', nextAppointment: '2023-07-15' },
  { id: 'P002', name: 'Jane Smith', status: 'Active', lastAppointment: '2023-06-10', nextAppointment: '2023-06-24' },
  { id: 'P003', name: 'Bob Johnson', status: 'Inactive', lastAppointment: '2023-05-20', nextAppointment: null },
  { id: 'P004', name: 'Alice Brown', status: 'Active', lastAppointment: '2023-06-05', nextAppointment: '2023-06-19' },
  { id: 'P005', name: 'Charlie Davis', status: 'Active', lastAppointment: '2023-06-18', nextAppointment: '2023-07-02' },
]

export default function PatientsPage() {
  const [filterName, setFilterName] = useState('')

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(filterName.toLowerCase())
  )

  const handleOpenReport = (patientId: string) => {
    console.log(`Opening report for patient ${patientId}`)
    // In a real application, this would open the patient's report
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      <Input
        placeholder="Filter by patient name"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Appointment</TableHead>
              <TableHead>Next Appointment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>
                  <Badge variant={patient.status === 'Active' ? 'default' : 'secondary'}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell>{patient.lastAppointment}</TableCell>
                <TableCell>{patient.nextAppointment || 'Not Scheduled'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">Actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleOpenReport(patient.id)}>
                        Open Report
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Edit patient', patient.id)}>
                        Edit Patient
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => console.log('Schedule appointment', patient.id)}>
                        Schedule Appointment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


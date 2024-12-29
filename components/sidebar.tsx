import Link from 'next/link'
import { Home, Calendar, Users, FileText, Settings } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Appointments', href: '/dashboard/appointments', icon: Calendar },
  { name: 'Patients', href: '/dashboard/patients', icon: Users },
  { name: 'Medical Records', href: '/dashboard/records', icon: FileText },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-card text-card-foreground shadow-md">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary">Dr. Dashboard</h2>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}


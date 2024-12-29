import { Sidebar } from '@/components/sidebar'
import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}


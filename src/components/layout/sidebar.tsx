import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Users, 
  Clock, 
  FileText, 
  BarChart3, 
  Settings,
  Home
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Cliënten', href: '/clients', icon: Users },
  { name: 'Tijd Registratie', href: '/time-entries', icon: Clock },
  { name: 'Facturen', href: '/invoices', icon: FileText },
  { name: 'Rapporten', href: '/reports', icon: BarChart3 },
  { name: 'Instellingen', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-50 border-r min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
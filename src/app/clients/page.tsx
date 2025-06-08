import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

// Mock data - will be replaced with Airtable data
const clients = [
  {
    id: "1",
    name: "Piet van der Berg",
    email: "piet.vandenberg@hotmail.com",
    address: "Zorgstraat 789\n9012 EF Rotterdam",
    pgbRate: 38.75,
    status: "active",
    totalHours: 45.5,
    lastActivity: "2 dagen geleden"
  },
  {
    id: "2", 
    name: "Maria Jansen",
    email: "maria.jansen@gmail.com",
    address: "Begeleiderslaan 456\n5678 CD Utrecht",
    pgbRate: 42.00,
    status: "active",
    totalHours: 62.0,
    lastActivity: "1 dag geleden"
  },
  {
    id: "3",
    name: "Henk Bakker", 
    email: "henk.bakker@live.nl",
    address: "Ondersteuningsplein 654\n7890 IJ Eindhoven",
    pgbRate: 36.00,
    status: "active",
    totalHours: 28.5,
    lastActivity: "3 uur geleden"
  }
]

export default function ClientsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cliënten
          </h1>
          <p className="text-gray-600">
            Beheer uw PGB begeleiding cliënten
          </p>
        </div>
        <Link href="/clients/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Cliënt
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <CardDescription>
                    €{client.pgbRate.toFixed(2)}/uur
                  </CardDescription>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  client.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {client.status === 'active' ? 'Actief' : 'Inactief'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  {client.email}
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="mr-2 h-4 w-4 mt-0.5" />
                  <span className="whitespace-pre-line">{client.address}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Totaal uren:</span>
                    <span className="font-medium">{client.totalHours} uur</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Laatste activiteit:</span>
                    <span className="font-medium">{client.lastActivity}</span>
                  </div>
                </div>
                <div className="flex space-x-2 pt-3">
                  <Link href={`/clients/${client.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Bekijken
                    </Button>
                  </Link>
                  <Link href={`/time-entries/new?client=${client.id}`}>
                    <Button size="sm">
                      Tijd Registreren
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {clients.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Geen cliënten gevonden
            </h3>
            <p className="text-gray-600 mb-4">
              Voeg uw eerste PGB begeleiding cliënt toe om te beginnen.
            </p>
            <Link href="/clients/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nieuwe Cliënt Toevoegen
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
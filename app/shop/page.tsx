import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { INSTRUMENTS } from "@/lib/constants"
import { Music } from "lucide-react"

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground text-balance">Select Your Instrument</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Choose an instrument to browse available sheet music
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INSTRUMENTS.map((instrument) => (
            <Link key={instrument.value} href={`/shop/${instrument.value}`}>
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{instrument.label}</CardTitle>
                  <CardDescription>Browse {instrument.label.toLowerCase()} sheet music</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Solo, duet, and ensemble pieces available</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Music2, Users, BookOpen, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/50 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
              Professional Sheet Music for Every Musician
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Discover high-quality arrangements, etudes, and original compositions for all instruments and skill
              levels. From solo pieces to ensemble works, find the perfect music for your next performance.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="text-base">
                <Link href="/shop">
                  <Music2 className="mr-2 h-5 w-5" />
                  Browse Sheet Music
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                <Link href="/about">
                  <Users className="mr-2 h-5 w-5" />
                  About Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Why Choose Maestro Music?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Quality sheet music crafted by experienced musicians and educators
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Music2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Wide Selection</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sheet music for 10+ instruments including percussion, strings, piano, and vocals
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">All Ensemble Types</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Solo, duet, and ensemble pieces for every performance setting
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Multiple Genres</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Arrangements, etudes, choir music, and marching percussion
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Professional Quality</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Expertly crafted scores with clear notation and performance notes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Instruments Showcase */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Shop by Instrument
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">Find sheet music tailored to your instrument</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "Marimba", href: "/shop/marimba" },
              { name: "Vibraphone", href: "/shop/vibraphone" },
              { name: "Piano", href: "/shop/piano" },
              { name: "Classical Guitar", href: "/shop/classical-guitar" },
              { name: "Vocal", href: "/shop/vocal" },
              { name: "Snare", href: "/shop/snare" },
              { name: "Timpani", href: "/shop/timpani" },
              { name: "Drumset", href: "/shop/drumset" },
              { name: "Xylophone", href: "/shop/xylophone" },
              { name: "Multi-Percussion", href: "/shop/multi-percussion" },
            ].map((instrument) => (
              <Button key={instrument.name} variant="outline" asChild className="h-auto py-4 bg-transparent">
                <Link href={instrument.href}>
                  <span className="text-base">{instrument.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Ready to Find Your Next Piece?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Browse our complete catalog of professional sheet music
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="text-base">
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

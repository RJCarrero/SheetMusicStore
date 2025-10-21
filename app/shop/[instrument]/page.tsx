import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { INSTRUMENTS, PIECE_TYPES, isCategoryInstrument } from "@/lib/constants"
import { getProductsByInstrument } from "@/lib/products"
import { Music2, Users, UsersRound, ChevronLeft } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"

interface InstrumentPageProps {
  params: {
    instrument: string
  }
}

export default function InstrumentPage({ params }: InstrumentPageProps) {
  const instrument = INSTRUMENTS.find((i) => i.value === params.instrument)

  if (!instrument) {
    notFound()
  }

  if (isCategoryInstrument(instrument.value)) {
    const products = getProductsByInstrument(params.instrument)

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/shop">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Link>
          </Button>

          <div className="mb-12">
            <h1 className="font-serif text-4xl font-bold text-foreground text-balance">{instrument.label}</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {products.length} {products.length === 1 ? "piece" : "pieces"} available
            </p>
          </div>

          {products.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No sheet music available yet. Check back soon!</p>
                <Button asChild className="mt-6">
                  <Link href="/shop">Browse All Music</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer overflow-hidden">
                    <div className="relative aspect-[4/3] bg-muted">
                      <Image
                        src={
                          product.images?.[0] ||
                          `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(product.name) || "/placeholder.svg"}`
                        }
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <CardHeader>
                      <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">{formatPrice(product.priceInCents)}</span>
                      <Button size="sm">View Details</Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const pieceTypeIcons = {
    solo: Music2,
    duet: Users,
    ensemble: UsersRound,
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/shop">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Instruments
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground text-balance">{instrument.label}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Select the type of piece you're looking for
          </p>
        </div>

        {/* Piece Type Selection */}
        <div className="grid gap-6 sm:grid-cols-3">
          {PIECE_TYPES.map((pieceType) => {
            const Icon = pieceTypeIcons[pieceType.value]
            return (
              <Link key={pieceType.value} href={`/shop/${params.instrument}/${pieceType.value}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                  <CardHeader>
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{pieceType.label}</CardTitle>
                    <CardDescription>
                      {pieceType.value === "solo" && "Individual performance pieces"}
                      {pieceType.value === "duet" && "Two-player compositions"}
                      {pieceType.value === "ensemble" && "Group performance works"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Browse {pieceType.label.toLowerCase()} pieces for {instrument.label.toLowerCase()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

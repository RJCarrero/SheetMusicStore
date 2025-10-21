import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { INSTRUMENTS, PIECE_TYPES, getAvailableMusicTypes, isCategoryInstrument } from "@/lib/constants"
import { getProductsByInstrumentAndPieceType } from "@/lib/products"
import { Music, BookOpen, Users2, ChevronLeft } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"

interface PieceTypePageProps {
  params: {
    instrument: string
    pieceType: string
  }
}

export default function PieceTypePage({ params }: PieceTypePageProps) {
  const instrument = INSTRUMENTS.find((i) => i.value === params.instrument)
  const pieceType = PIECE_TYPES.find((p) => p.value === params.pieceType)

  if (!instrument || !pieceType) {
    notFound()
  }

  if (isCategoryInstrument(instrument.value)) {
    notFound()
  }

  const availableMusicTypes = getAvailableMusicTypes(instrument.value)

  if (availableMusicTypes.length === 0) {
    const products = getProductsByInstrumentAndPieceType(params.instrument, params.pieceType)

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link href={`/shop/${params.instrument}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to {instrument.label}
            </Link>
          </Button>

          <div className="mb-12">
            <h1 className="font-serif text-4xl font-bold text-foreground text-balance">
              {instrument.label} - {pieceType.label}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {products.length} {products.length === 1 ? "piece" : "pieces"} available
            </p>
          </div>

          {products.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No sheet music available yet. Check back soon!</p>
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

  const musicTypeIcons = {
    general: Music,
    choir: Users2,
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href={`/shop/${params.instrument}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to {instrument.label}
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground text-balance">
            {instrument.label} - {pieceType.label}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Choose the type of sheet music you need</p>
        </div>

        {/* Music Type Selection */}
        <div className="grid gap-6 sm:grid-cols-2">
          {availableMusicTypes.map((musicType) => {
            const Icon = musicTypeIcons[musicType.value] || BookOpen
            return (
              <Link key={musicType.value} href={`/shop/${params.instrument}/${params.pieceType}/${musicType.value}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                  <CardHeader>
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{musicType.label}</CardTitle>
                    <CardDescription>
                      {musicType.value === "general" && "All sheet music for this instrument"}
                      {musicType.value === "choir" && "Choral compositions and arrangements"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      View {musicType.label.toLowerCase()} for {instrument.label.toLowerCase()}{" "}
                      {pieceType.label.toLowerCase()}
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

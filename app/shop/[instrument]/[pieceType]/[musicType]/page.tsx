import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft } from "lucide-react"
import { INSTRUMENTS, PIECE_TYPES, MUSIC_TYPES } from "@/lib/constants"
import { getProductsByFilters } from "@/lib/products"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"

interface MusicTypePageProps {
  params: {
    instrument: string
    pieceType: string
    musicType: string
  }
}

export default function MusicTypePage({ params }: MusicTypePageProps) {
  const instrument = INSTRUMENTS.find((i) => i.value === params.instrument)
  const pieceType = PIECE_TYPES.find((p) => p.value === params.pieceType)
  const musicType = MUSIC_TYPES.find((m) => m.value === params.musicType)

  if (!instrument || !pieceType || !musicType) {
    notFound()
  }

  const products = getProductsByFilters(params.instrument, params.pieceType, params.musicType)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href={`/shop/${params.instrument}/${params.pieceType}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to {pieceType.label} Selection
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary">{instrument.label}</Badge>
            <Badge variant="secondary">{pieceType.label}</Badge>
            <Badge variant="secondary">{musicType.label}</Badge>
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground text-balance">
            {instrument.label} {pieceType.label} - {musicType.label}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {products.length} {products.length === 1 ? "piece" : "pieces"} available
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No sheet music available for this combination yet. Check back soon!
              </p>
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
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] bg-muted">
                    <Image
                      src={
                        product.images?.[0] ||
                        `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(product.name)}`
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

                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">{formatPrice(product.priceInCents)}</span>
                    <Button size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

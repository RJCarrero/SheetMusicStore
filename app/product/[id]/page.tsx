import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Music, Users, BookOpen } from "lucide-react"
import { getProductById } from "@/lib/products"
import { formatPrice } from "@/lib/utils"
import { formatInstrumentName, formatPieceType, formatMusicType } from "@/lib/constants"
import { AudioPlayer } from "@/components/audio-player"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { FavoriteButton } from "@/components/favorite-button"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href={`/shop/${product.instrument}/${product.pieceType}/${product.musicType}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Browse
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
              <Image
                src={
                  product.images?.[0] ||
                  `/placeholder.svg?height=600&width=800&query=${encodeURIComponent(product.name) || "/placeholder.svg"}`
                }
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Audio Preview */}
            {product.audioPreviewUrl && (
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Audio Preview</h3>
                <AudioPlayer src={product.audioPreviewUrl} title={product.name} />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{formatInstrumentName(product.instrument)}</Badge>
              <Badge variant="secondary">{formatPieceType(product.pieceType)}</Badge>
              <Badge variant="secondary">{formatMusicType(product.musicType)}</Badge>
            </div>

            {/* Title and Price */}
            <div>
              <h1 className="font-serif text-4xl font-bold text-foreground text-balance">{product.name}</h1>
              <p className="mt-4 text-3xl font-bold text-foreground">{formatPrice(product.priceInCents)}</p>
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-2 font-semibold text-foreground">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Product Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Music className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Instrument:</span>
                <span className="font-medium text-foreground">{formatInstrumentName(product.instrument)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Piece Type:</span>
                <span className="font-medium text-foreground">{formatPieceType(product.pieceType)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Music Type:</span>
                <span className="font-medium text-foreground">{formatMusicType(product.musicType)}</span>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-3">
              <AddToCartButton productId={product.id} />
              <FavoriteButton productId={product.id} />
            </div>

            {/* Additional Info */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold text-foreground">What You'll Receive</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• High-quality PDF sheet music</li>
                  <li>• Instant digital download after purchase</li>
                  <li>• Print as many copies as you need</li>
                  <li>• Professional notation and formatting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

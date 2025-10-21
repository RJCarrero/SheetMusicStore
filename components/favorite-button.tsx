"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { addToFavorites, removeFromFavorites, isFavorite } from "@/lib/cart"

interface FavoriteButtonProps {
  productId: string
}

export function FavoriteButton({ productId }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    setFavorite(isFavorite(productId))

    const handleFavoritesUpdate = () => {
      setFavorite(isFavorite(productId))
    }

    window.addEventListener("favorites-updated", handleFavoritesUpdate)
    return () => window.removeEventListener("favorites-updated", handleFavoritesUpdate)
  }, [productId])

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(productId)
    } else {
      addToFavorites(productId)
    }
  }

  return (
    <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={handleToggleFavorite}>
      <Heart className={`mr-2 h-5 w-5 ${favorite ? "fill-current text-red-500" : ""}`} />
      {favorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  )
}

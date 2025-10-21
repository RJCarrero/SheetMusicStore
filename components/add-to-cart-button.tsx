"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { addToCart } from "@/lib/cart"

interface AddToCartButtonProps {
  productId: string
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(productId)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={isAdded}>
      {isAdded ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  )
}

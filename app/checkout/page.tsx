"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { getCart } from "@/lib/cart"
import { CheckoutForm } from "@/components/checkout-form"
import type { CartItem } from "@/lib/types"

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const items = getCart()
    setCartItems(items)

    // Redirect to cart if empty
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [router])

  if (!mounted) {
    return null
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add items to your cart before checking out</p>
              <Button asChild>
                <Link href="/shop">Browse Sheet Music</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/cart">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground">Checkout</h1>
          <p className="mt-2 text-muted-foreground">Complete your purchase securely with Stripe</p>
        </div>

        {/* Stripe Checkout */}
        <CheckoutForm cartItems={cartItems} />
      </div>
    </div>
  )
}

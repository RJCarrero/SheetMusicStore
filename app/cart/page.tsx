"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Trash2, ShoppingBag } from "lucide-react"
import { getCart, removeFromCart, updateCartQuantity } from "@/lib/cart"
import { getProductById } from "@/lib/products"
import { formatPrice } from "@/lib/utils"
import type { CartItem } from "@/lib/types"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCartItems(getCart())

    const handleCartUpdate = () => {
      setCartItems(getCart())
    }

    window.addEventListener("cart-updated", handleCartUpdate)
    return () => window.removeEventListener("cart-updated", handleCartUpdate)
  }, [])

  if (!mounted) {
    return null
  }

  const cartWithProducts = cartItems
    .map((item) => ({
      ...item,
      product: getProductById(item.productId),
    }))
    .filter((item) => item.product !== undefined)

  const subtotal = cartWithProducts.reduce((total, item) => {
    return total + (item.product?.priceInCents || 0) * item.quantity
  }, 0)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateCartQuantity(productId, newQuantity)
  }

  const handleRemove = (productId: string) => {
    removeFromCart(productId)
  }

  if (cartWithProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
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
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartWithProducts.map((item) => {
              const product = item.product!
              return (
                <Card key={item.productId}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                        <Image
                          src={
                            product.images?.[0] ||
                            `/placeholder.svg?height=96&width=96&query=${encodeURIComponent(product.name) || "/placeholder.svg"}`
                          }
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-2">
                        <Link href={`/product/${product.id}`} className="hover:underline">
                          <h3 className="font-semibold text-foreground">{product.name}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                        <p className="font-semibold text-foreground">{formatPrice(product.priceInCents)}</p>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <Button variant="ghost" size="icon" onClick={() => handleRemove(item.productId)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.productId, Number.parseInt(e.target.value) || 1)}
                            className="h-8 w-16 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-medium text-foreground">
                    {cartWithProducts.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">{formatPrice(subtotal)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/checkout">Continue to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

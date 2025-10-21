"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { clearCart } from "@/lib/cart"

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Clear the cart after successful purchase
    clearCart()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="font-serif text-3xl">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">Thank you for your purchase!</p>
            <p className="text-muted-foreground leading-relaxed">
              Your sheet music has been purchased successfully. You should receive a confirmation email shortly with
              download links for your digital sheet music.
            </p>
            <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-2">What's Next?</p>
              <ul className="space-y-1 text-left">
                <li>• Check your email for download links</li>
                <li>• Download your PDF sheet music files</li>
                <li>• Print as many copies as you need</li>
                <li>• Start practicing!</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button size="lg" className="w-full" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

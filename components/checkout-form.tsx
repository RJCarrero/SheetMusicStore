"use client"

import { useCallback } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startCheckoutSession } from "@/app/actions/stripe"
import type { CartItem } from "@/lib/types"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
  cartItems: CartItem[]
}

export function CheckoutForm({ cartItems }: CheckoutFormProps) {
  const fetchClientSecret = useCallback(async () => {
    const clientSecret = await startCheckoutSession(cartItems)
    return clientSecret
  }, [cartItems])

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

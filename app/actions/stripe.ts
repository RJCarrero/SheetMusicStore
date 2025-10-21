"use server"

import { stripe } from "@/lib/stripe"
import { getProductById } from "@/lib/products"
import type { CartItem } from "@/lib/types"

export async function startCheckoutSession(cartItems: CartItem[]) {
  // Validate and build line items
  const lineItems = cartItems.map((item) => {
    const product = getProductById(item.productId)
    if (!product) {
      throw new Error(`Product with id "${item.productId}" not found`)
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.priceInCents,
      },
      quantity: item.quantity,
    }
  })

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: lineItems,
    mode: "payment",
  })

  return session.client_secret!
}

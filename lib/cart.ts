"use client"

import type { CartItem } from "./types"

const CART_STORAGE_KEY = "sheet-music-cart"
const FAVORITES_STORAGE_KEY = "sheet-music-favorites"

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem(CART_STORAGE_KEY)
  return cart ? JSON.parse(cart) : []
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

export function addToCart(productId: string): void {
  const cart = getCart()
  const existingItem = cart.find((item) => item.productId === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ productId, quantity: 1 })
  }

  saveCart(cart)
  window.dispatchEvent(new Event("cart-updated"))
}

export function removeFromCart(productId: string): void {
  const cart = getCart()
  const updatedCart = cart.filter((item) => item.productId !== productId)
  saveCart(updatedCart)
  window.dispatchEvent(new Event("cart-updated"))
}

export function updateCartQuantity(productId: string, quantity: number): void {
  const cart = getCart()
  const item = cart.find((item) => item.productId === productId)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = quantity
      saveCart(cart)
      window.dispatchEvent(new Event("cart-updated"))
    }
  }
}

export function clearCart(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CART_STORAGE_KEY)
  window.dispatchEvent(new Event("cart-updated"))
}

export function getCartItemCount(): number {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.quantity, 0)
}

export function getFavorites(): string[] {
  if (typeof window === "undefined") return []
  const favorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
  return favorites ? JSON.parse(favorites) : []
}

export function saveFavorites(favorites: string[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
}

export function addToFavorites(productId: string): void {
  const favorites = getFavorites()
  if (!favorites.includes(productId)) {
    favorites.push(productId)
    saveFavorites(favorites)
    window.dispatchEvent(new Event("favorites-updated"))
  }
}

export function removeFromFavorites(productId: string): void {
  const favorites = getFavorites()
  const updatedFavorites = favorites.filter((id) => id !== productId)
  saveFavorites(updatedFavorites)
  window.dispatchEvent(new Event("favorites-updated"))
}

export function isFavorite(productId: string): boolean {
  const favorites = getFavorites()
  return favorites.includes(productId)
}

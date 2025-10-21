"use client"

import Link from "next/link"
import { Music, ShoppingCart, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import { INSTRUMENTS } from "@/lib/constants"
import { useEffect, useState } from "react"
import { getCartItemCount } from "@/lib/cart"

export function Header() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Initial cart count
    setCartCount(getCartItemCount())

    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartCount(getCartItemCount())
    }

    window.addEventListener("cart-updated", handleCartUpdate)
    return () => window.removeEventListener("cart-updated", handleCartUpdate)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-foreground">
          <Music className="h-6 w-6" />
          <span>Maestro Music</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base">Sheet Music</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {INSTRUMENTS.map((instrument) => (
                      <li key={instrument.value}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/shop/${instrument.value}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{instrument.label}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Browse {instrument.label.toLowerCase()} sheet music
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About Me
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/contact">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Contact</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

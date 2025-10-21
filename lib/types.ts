export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  instrument: Instrument
  pieceType: PieceType
  musicType: MusicType
  audioPreviewUrl?: string
  images?: string[]
}

export type Instrument =
  | "marimba"
  | "vibraphone"
  | "xylophone"
  | "multi-percussion"
  | "snare"
  | "timpani"
  | "drumset"
  | "classical-guitar"
  | "piano"
  | "vocal"
  | "arrangements"
  | "percussion-etudes"
  | "marching-percussion"

export type PieceType = "solo" | "duet" | "ensemble"

export type MusicType = "choir" | "general"

export interface CartItem {
  productId: string
  quantity: number
}

export interface FavoriteItem {
  productId: string
  addedAt: number
}

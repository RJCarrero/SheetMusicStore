import type { Product } from "./types"
import { isCategoryInstrument } from "./constants"

// This is the source of truth for all products
// All UI to display products should pull from this array
// IDs passed to the checkout session should be the same as IDs from this array
export const PRODUCTS: Product[] = [
  // Marimba - Solo - Arrangements
  {
    id: "marimba-solo-arrangement-1",
    name: "Autumn Reflections",
    description:
      "A beautiful solo marimba arrangement featuring rich harmonies and expressive melodies. Perfect for intermediate to advanced players.",
    priceInCents: 1299,
    instrument: "marimba",
    pieceType: "solo",
    musicType: "arrangements",
    audioPreviewUrl: "/audio/preview-1.mp3",
    images: ["/marimba-sheet-music.jpg"],
  },
  {
    id: "marimba-solo-arrangement-2",
    name: "Dance of the Wooden Keys",
    description: "An energetic solo piece showcasing technical prowess and rhythmic complexity.",
    priceInCents: 1499,
    instrument: "marimba",
    pieceType: "solo",
    musicType: "arrangements",
    audioPreviewUrl: "/audio/preview-2.mp3",
    images: ["/marimba-performance.jpg"],
  },

  // Vibraphone - Solo - Arrangements
  {
    id: "vibraphone-solo-arrangement-1",
    name: "Midnight Vibes",
    description: "A jazz-influenced vibraphone solo with smooth chord progressions and improvisational sections.",
    priceInCents: 1399,
    instrument: "vibraphone",
    pieceType: "solo",
    musicType: "arrangements",
    audioPreviewUrl: "/audio/preview-3.mp3",
    images: ["/vibraphone-jazz.jpg"],
  },

  // Snare - Solo - Percussion Etudes
  {
    id: "snare-solo-etude-1",
    name: "Rudiment Mastery Etude No. 1",
    description: "A comprehensive etude focusing on essential snare drum rudiments and technique development.",
    priceInCents: 899,
    instrument: "snare",
    pieceType: "solo",
    musicType: "percussion-etudes",
    audioPreviewUrl: "/audio/preview-4.mp3",
    images: ["/snare-drum-rudiments.jpg"],
  },
  {
    id: "snare-solo-etude-2",
    name: "Advanced Roll Studies",
    description: "Challenging etude designed to perfect roll technique and dynamic control.",
    priceInCents: 999,
    instrument: "snare",
    pieceType: "solo",
    musicType: "percussion-etudes",
    audioPreviewUrl: "/audio/preview-5.mp3",
    images: ["/snare-drum-technique.jpg"],
  },

  // Piano - Duet - Arrangements
  {
    id: "piano-duet-arrangement-1",
    name: "Four Hands, One Heart",
    description: "A romantic piano duet arrangement perfect for recitals and performances.",
    priceInCents: 1599,
    instrument: "piano",
    pieceType: "duet",
    musicType: "arrangements",
    audioPreviewUrl: "/audio/preview-6.mp3",
    images: ["/piano-duet-performance.jpg"],
  },

  // Vocal - Ensemble - Choir
  {
    id: "vocal-ensemble-choir-1",
    name: "Celestial Voices",
    description: "A four-part choral arrangement (SATB) with soaring melodies and rich harmonies.",
    priceInCents: 1799,
    instrument: "vocal",
    pieceType: "ensemble",
    musicType: "choir",
    audioPreviewUrl: "/audio/preview-7.mp3",
    images: ["/choir-singing.jpg"],
  },
  {
    id: "vocal-ensemble-choir-2",
    name: "Morning Hymn",
    description: "A peaceful choral piece perfect for worship services or concert performances.",
    priceInCents: 1299,
    instrument: "vocal",
    pieceType: "ensemble",
    musicType: "choir",
    audioPreviewUrl: "/audio/preview-8.mp3",
    images: ["/church-choir.png"],
  },

  // Multi-Percussion - Ensemble - Marching Percussion
  {
    id: "multi-percussion-ensemble-marching-1",
    name: "Drumline Cadence Collection",
    description: "A set of five high-energy cadences for marching percussion ensemble.",
    priceInCents: 2499,
    instrument: "multi-percussion",
    pieceType: "ensemble",
    musicType: "marching-percussion",
    audioPreviewUrl: "/audio/preview-9.mp3",
    images: ["/marching-band-drumline.jpg"],
  },

  // Classical Guitar - Solo - Arrangements
  {
    id: "classical-guitar-solo-arrangement-1",
    name: "Spanish Serenade",
    description: "A classical guitar arrangement inspired by traditional Spanish music.",
    priceInCents: 1199,
    instrument: "classical-guitar",
    pieceType: "solo",
    musicType: "arrangements",
    audioPreviewUrl: "/audio/preview-10.mp3",
    images: ["/classical-guitar-performance.jpg"],
  },

  // Timpani - Solo - Percussion Etudes
  {
    id: "timpani-solo-etude-1",
    name: "Tuning and Technique Studies",
    description: "Essential etudes for developing timpani tuning accuracy and mallet technique.",
    priceInCents: 1099,
    instrument: "timpani",
    pieceType: "solo",
    musicType: "percussion-etudes",
    audioPreviewUrl: "/audio/preview-11.mp3",
    images: ["/timpani-drums.jpg"],
  },

  // Drumset - Solo - Arrangements
  {
    id: "drumset-solo-arrangement-1",
    name: "Groove Foundations",
    description: "A collection of contemporary drumset grooves and fills for modern music.",
    priceInCents: 1399,
    instrument: "drumset",
    pieceType: "solo",
    musicType: "arrangements",
    audioPreviewUrl: "/audio/preview-12.mp3",
    images: ["/drum-set-performance.jpg"],
  },

  // Xylophone - Duet - Arrangements
  {
    id: "xylophone-duet-arrangement-1",
    name: "Playful Melodies",
    description: "A cheerful xylophone duet perfect for young performers and educational settings.",
    priceInCents: 999,
    instrument: "xylophone",
    pieceType: "duet",
    musicType: "arrangements",
    audioPreviewUrl: "/audio/preview-13.mp3",
    images: ["/xylophone-duet.jpg"],
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getProductsByInstrument(instrument: string): Product[] {
  if (isCategoryInstrument(instrument as any)) {
    return PRODUCTS.filter((p) => p.musicType === instrument)
  }
  return PRODUCTS.filter((p) => p.instrument === instrument)
}

export function getProductsByInstrumentAndPieceType(instrument: string, pieceType: string): Product[] {
  if (isCategoryInstrument(instrument as any)) {
    return PRODUCTS.filter((p) => p.musicType === instrument && p.pieceType === pieceType)
  }
  return PRODUCTS.filter((p) => p.instrument === instrument && p.pieceType === pieceType)
}

export function getProductsByFilters(instrument: string, pieceType: string, musicType: string): Product[] {
  return PRODUCTS.filter((p) => p.instrument === instrument && p.pieceType === pieceType && p.musicType === musicType)
}

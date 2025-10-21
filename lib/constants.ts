import type { Instrument, PieceType, MusicType } from "./types"

export const INSTRUMENTS: { value: Instrument; label: string }[] = [
  { value: "marimba", label: "Marimba" },
  { value: "vibraphone", label: "Vibraphone" },
  { value: "xylophone", label: "Xylophone" },
  { value: "multi-percussion", label: "Multi-Percussion" },
  { value: "snare", label: "Snare" },
  { value: "timpani", label: "Timpani" },
  { value: "drumset", label: "Drumset" },
  { value: "classical-guitar", label: "Classical Guitar" },
  { value: "piano", label: "Piano" },
  { value: "vocal", label: "Vocal" },
  { value: "arrangements", label: "Arrangements" },
  { value: "percussion-etudes", label: "Percussion Etudes" },
  { value: "marching-percussion", label: "Marching Percussion" },
]

export const PIECE_TYPES: { value: PieceType; label: string }[] = [
  { value: "solo", label: "Solo" },
  { value: "duet", label: "Duet" },
  { value: "ensemble", label: "Ensemble" },
]

export const MUSIC_TYPES: { value: MusicType; label: string }[] = [
  { value: "general", label: "General" },
  { value: "choir", label: "Choir" },
]

export function isCategoryInstrument(instrument: Instrument): boolean {
  return instrument === "arrangements" || instrument === "percussion-etudes" || instrument === "marching-percussion"
}

export function getActualInstruments(): { value: Instrument; label: string }[] {
  return INSTRUMENTS.filter((i) => !isCategoryInstrument(i.value))
}

export function getCategoryInstruments(): { value: Instrument; label: string }[] {
  return INSTRUMENTS.filter((i) => isCategoryInstrument(i.value))
}

export function formatInstrumentName(instrument: string): string {
  const found = INSTRUMENTS.find((i) => i.value === instrument)
  return found ? found.label : instrument
}

export function formatPieceType(pieceType: string): string {
  const found = PIECE_TYPES.find((p) => p.value === pieceType)
  return found ? found.label : pieceType
}

export function formatMusicType(musicType: string): string {
  const found = MUSIC_TYPES.find((m) => m.value === musicType)
  return found ? found.label : musicType
}

export function getAvailableMusicTypes(instrument: Instrument): { value: MusicType; label: string }[] {
  if (isCategoryInstrument(instrument)) {
    return []
  }

  // Choir is only available for vocal
  if (instrument === "vocal") {
    return MUSIC_TYPES
  }

  // For all other instruments, only show general
  return MUSIC_TYPES.filter((mt) => mt.value !== "choir")
}

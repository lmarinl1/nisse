/** Centralized taxonomy for Derivaciones del tiempo (Spanish product labels). */

export const DERIVATION_TYPES = [
  'artistic_inspiration',
  'art_movement',
  'technology',
  'concept',
  'theory',
  'cultural_phenomenon',
  'event',
  'signal',
  'object',
  'practice',
  'institution',
  'scenario',
  'speculation',
  'other',
] as const

export type DerivationType = (typeof DERIVATION_TYPES)[number]

export const DERIVATION_TYPE_LABELS: Record<DerivationType, string> = {
  artistic_inspiration: 'Inspiración artística',
  art_movement: 'Corriente de arte',
  technology: 'Tecnología',
  concept: 'Concepto',
  theory: 'Teoría',
  cultural_phenomenon: 'Fenómeno cultural',
  event: 'Acontecimiento',
  signal: 'Señal',
  object: 'Objeto',
  practice: 'Práctica',
  institution: 'Institución',
  scenario: 'Escenario',
  speculation: 'Especulación',
  other: 'Otro',
}

export const IMPACT_VALUES = [
  'low',
  'medium',
  'high',
  'transformative',
] as const

export type ImpactValue = (typeof IMPACT_VALUES)[number]

export const IMPACT_LABELS: Record<ImpactValue, string> = {
  low: 'Bajo',
  medium: 'Medio',
  high: 'Alto',
  transformative: 'Transformador',
}

export const DERIVATION_TYPE_OPTIONS = DERIVATION_TYPES.map((value) => ({
  value,
  label: DERIVATION_TYPE_LABELS[value],
}))

export const IMPACT_OPTIONS = IMPACT_VALUES.map((value) => ({
  value,
  label: IMPACT_LABELS[value],
}))

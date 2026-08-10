export type TimelineClassification = 'real' | 'fictional'
export type TimelineStatus = 'active' | 'archived'
export type RecallClassification =
  | 'verified'
  | 'approximate'
  | 'hypothetical'
  | 'fiction'

export const TIMELINE_CLASSIFICATION_LABELS: Record<
  TimelineClassification,
  string
> = {
  real: 'Real',
  fictional: 'Ficticia',
}

export const TIMELINE_STATUS_LABELS: Record<TimelineStatus, string> = {
  active: 'Activa',
  archived: 'Archivada',
}

export const RECALL_CLASSIFICATION_LABELS: Record<
  RecallClassification,
  string
> = {
  verified: 'Comprobado',
  approximate: 'Aproximado',
  hypothetical: 'Hipotético',
  fiction: 'Ficción',
}

export const GUIDING_QUESTIONS = [
  {
    id: 'context',
    title: 'Contexto',
    question: '¿Qué condiciones hicieron posible que este problema apareciera?',
  },
  {
    id: 'emergence',
    title: 'Emergencia',
    question: '¿Cuándo comenzó a hacerse visible?',
  },
  {
    id: 'transformation',
    title: 'Transformación',
    question: '¿Qué acontecimientos modificaron la forma de entenderlo?',
  },
  {
    id: 'institutions',
    title: 'Instituciones',
    question: '¿Qué instituciones, actores o estructuras intervinieron?',
  },
  {
    id: 'epistemology',
    title: 'Epistemología',
    question:
      '¿Qué conocimientos o marcos hicieron posible nombrar el problema?',
  },
  {
    id: 'present',
    title: 'Presente',
    question: '¿Por qué este problema aparece aquí y ahora?',
  },
] as const

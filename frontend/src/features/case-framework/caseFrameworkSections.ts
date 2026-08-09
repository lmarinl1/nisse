import type { ComponentType } from 'react'
import {
  ChatIcon,
  EyeIcon,
  GraphIcon,
  QuestionIcon,
  WarningIcon,
  type IconSize,
} from '../../shared/icons'

export type CaseFrameworkSectionId =
  | 'conceptual-evolution'
  | 'theoretical-framework'
  | 'fundamental-concepts'
  | 'tensions'
  | 'consolidated-object'

export type CaseFrameworkProgressStatus =
  | 'not_started'
  | 'in_progress'
  | 'with_content'
  | 'reviewed'

type SectionIcon = ComponentType<{ size?: IconSize; title?: string }>

export type CaseFrameworkFieldConfig = {
  key: string
  title: string
  description: string
  guidingQuestion: string
}

export type CaseFrameworkSectionConfig = {
  id: CaseFrameworkSectionId
  number: string
  label: string
  purpose: string
  Icon: SectionIcon
  fields: readonly CaseFrameworkFieldConfig[]
}

export const CASE_FRAMEWORK_SECTIONS: readonly CaseFrameworkSectionConfig[] = [
  {
    id: 'conceptual-evolution',
    number: '01',
    label: 'Tema de partida y evolución conceptual',
    purpose:
      'Mostrar el origen vivo del estudio y su transformación progresiva.',
    Icon: QuestionIcon,
    fields: [
      {
        key: 'initial_intuition',
        title: 'Intuición o pregunta inicial',
        description: 'El germen que dio origen a la investigación.',
        guidingQuestion:
          '¿Qué intuición, inquietud, problema o pregunta dio origen al estudio?',
      },
      {
        key: 'conceptual_shifts',
        title: 'Desplazamientos conceptuales',
        description:
          'Cambios, descubrimientos, contradicciones y nuevas formas de nombrar el problema.',
        guidingQuestion:
          '¿Cómo ha cambiado la forma de entender el problema durante la investigación?',
      },
      {
        key: 'theoretical_methodological_decisions',
        title: 'Decisiones teóricas y metodológicas',
        description: 'Giros que reorientaron el tema y sus motivos.',
        guidingQuestion:
          '¿Qué decisiones teóricas o metodológicas reorientaron el tema y por qué?',
      },
      {
        key: 'thought_evolution',
        title: 'Evolución del pensamiento',
        description: 'Lo inicial, lo comprendido ahora y lo que permanece abierto.',
        guidingQuestion:
          '¿Qué pensabas inicialmente, qué comprendes ahora y qué permanece abierto?',
      },
    ],
  },
  {
    id: 'theoretical-framework',
    number: '02',
    label: 'Marco teórico-conceptual',
    purpose:
      'Construir el andamiaje teórico como diálogo y no como respaldo de autoridad.',
    Icon: ChatIcon,
    fields: [
      {
        key: 'theoretical_conversations',
        title: 'Conversaciones teóricas',
        description:
          'Autores, corrientes, teorías o perspectivas con las que dialoga el estudio.',
        guidingQuestion:
          '¿Con qué autores, corrientes o perspectivas dialoga la investigación y desde dónde?',
      },
      {
        key: 'interlocutor_contributions',
        title: 'Aportes de los interlocutores',
        description: 'Qué se toma, por qué y cómo se utiliza.',
        guidingQuestion:
          '¿Qué toma la investigación, por qué lo toma y cómo lo utiliza?',
      },
      {
        key: 'tensions_disagreements',
        title: 'Tensiones y desacuerdos',
        description: 'Acuerdos, distancias, insuficiencias y lo que necesita discusión.',
        guidingQuestion:
          '¿Dónde hay acuerdo, distancia o insuficiencia que deba discutirse?',
      },
      {
        key: 'reinterpretations_shifts',
        title: 'Reinterpretaciones y desplazamientos',
        description:
          'Conceptos tomados de una fuente y resignificados dentro del estudio.',
        guidingQuestion:
          '¿Qué conceptos están siendo resignificados dentro del estudio?',
      },
      {
        key: 'approach_crossings',
        title: 'Cruces entre enfoques',
        description: 'Relaciones, cruces y fricciones entre perspectivas.',
        guidingQuestion:
          '¿Cómo se cruzan o friccionan las perspectivas en juego?',
      },
    ],
  },
  {
    id: 'fundamental-concepts',
    number: '03',
    label: 'Conceptos fundamentales para el abordaje',
    purpose:
      'Crear la caja de herramientas conceptuales que realmente opera en el análisis.',
    Icon: GraphIcon,
    fields: [
      {
        key: 'fundamental_concepts',
        title: 'Conceptos fundamentales',
        description:
          'Preferentemente 3–5 conceptos con definición, relevancia, operación y herencia/resignificación.',
        guidingQuestion:
          '¿Cuáles son los conceptos que realmente operan en el análisis?',
      },
      {
        key: 'concept_relations',
        title: 'Relaciones entre conceptos',
        description: 'Cómo se articulan entre sí las herramientas conceptuales.',
        guidingQuestion: '¿Cómo se relacionan los conceptos entre sí?',
      },
      {
        key: 'inherited_resignified_concepts',
        title: 'Conceptos heredados y resignificados',
        description:
          'Qué conserva significado original y qué se está resignificando.',
        guidingQuestion:
          '¿Qué conceptos conservan su significado original y cuáles están siendo resignificados?',
      },
    ],
  },
  {
    id: 'tensions',
    number: '04',
    label: 'Problemáticas o tensiones establecidas',
    purpose:
      'Hacer visible el conflicto estructural que justifica el estudio.',
    Icon: WarningIcon,
    fields: [
      {
        key: 'main_tensions',
        title: 'Tensiones principales',
        description: 'Tensiones conceptuales, prácticas o institucionales.',
        guidingQuestion:
          '¿Cuáles son las principales tensiones que sostienen el estudio?',
      },
      {
        key: 'tension_origins',
        title: 'Origen de las tensiones',
        description: 'Vínculo con contexto, marco teórico y observaciones.',
        guidingQuestion: '¿De dónde emergen estas tensiones?',
      },
      {
        key: 'tension_productivity',
        title: 'Productividad de las tensiones',
        description: 'Qué permiten descubrir, cuestionar o explorar.',
        guidingQuestion:
          '¿Qué permiten descubrir, cuestionar o explorar estas tensiones?',
      },
      {
        key: 'unresolved_tensions',
        title: 'Tensiones irresueltas',
        description: 'Conflictos abiertos y las preguntas que generan.',
        guidingQuestion:
          '¿Qué conflictos permanecen abiertos y qué preguntas generan?',
      },
    ],
  },
  {
    id: 'consolidated-object',
    number: '05',
    label: 'Objeto de estudio consolidado',
    purpose: 'Mostrar el objeto como resultado del recorrido previo.',
    Icon: EyeIcon,
    fields: [
      {
        key: 'object_definition',
        title: 'Definición del objeto',
        description: 'Definición precisa, clara y situada.',
        guidingQuestion: '¿Cómo se define el objeto de estudio en este momento?',
      },
      {
        key: 'field_delimitation',
        title: 'Delimitación del campo',
        description:
          'Qué incluye y excluye; límites temporales, espaciales, conceptuales e institucionales.',
        guidingQuestion: '¿Qué incluye, qué excluye y cuáles son sus límites?',
      },
      {
        key: 'differentiation',
        title: 'Diferenciación',
        description: 'En qué se diferencia de objetos similares.',
        guidingQuestion: '¿En qué se diferencia de objetos similares?',
      },
      {
        key: 'relation_to_prior',
        title: 'Relación con conceptos, teorías y tensiones',
        description: 'Vínculo explícito con el recorrido previo del Marco.',
        guidingQuestion:
          '¿Cómo se relaciona el objeto consolidado con el recorrido previo?',
      },
      {
        key: 'object_current_state',
        title: 'Estado actual del objeto',
        description: 'Qué está consolidado, qué permanece abierto, qué podría cambiar.',
        guidingQuestion:
          '¿Qué está consolidado, qué permanece abierto y qué podría cambiar?',
      },
    ],
  },
] as const

const SECTION_IDS = new Set<string>(
  CASE_FRAMEWORK_SECTIONS.map((section) => section.id),
)

export function isCaseFrameworkSectionId(
  value: string | undefined,
): value is CaseFrameworkSectionId {
  return value !== undefined && SECTION_IDS.has(value)
}

export function getCaseFrameworkSection(
  id: CaseFrameworkSectionId,
): CaseFrameworkSectionConfig | undefined {
  return CASE_FRAMEWORK_SECTIONS.find((section) => section.id === id)
}

export const PROGRESS_STATUS_LABELS: Record<
  CaseFrameworkProgressStatus,
  string
> = {
  not_started: 'Sin comenzar',
  in_progress: 'En construcción',
  with_content: 'Terminado',
  reviewed: 'Terminado',
}

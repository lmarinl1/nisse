import {
  RECALL_CLASSIFICATION_LABELS,
  TIMELINE_CLASSIFICATION_LABELS,
  TIMELINE_STATUS_LABELS,
  type RecallClassification,
  type TimelineClassification,
  type TimelineStatus,
} from './classifications'
import {
  CheckIcon,
  DecisionIcon,
  QuestionIcon,
  WarningIcon,
} from '../../shared/icons'

export function TimelineStatusBadge({ status }: { status: TimelineStatus }) {
  return (
    <span className="timelines__badge" data-status={status}>
      {TIMELINE_STATUS_LABELS[status]}
    </span>
  )
}

export function TimelineClassificationBadge({
  classification,
}: {
  classification: TimelineClassification
}) {
  return (
    <span className="timelines__badge">
      {TIMELINE_CLASSIFICATION_LABELS[classification]}
    </span>
  )
}

const RECALL_ICONS = {
  verified: CheckIcon,
  approximate: DecisionIcon,
  hypothetical: QuestionIcon,
  fiction: WarningIcon,
} as const

export function RecallClassificationBadge({
  classification,
}: {
  classification: RecallClassification
}) {
  const Icon = RECALL_ICONS[classification]
  return (
    <span className="timelines__badge" data-classification={classification}>
      <Icon size="sm" title={RECALL_CLASSIFICATION_LABELS[classification]} />
      {RECALL_CLASSIFICATION_LABELS[classification]}
    </span>
  )
}

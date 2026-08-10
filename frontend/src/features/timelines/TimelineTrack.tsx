import type { Recall } from '../../shared/api/client'
import { RecallClassificationBadge } from './badges'
import { formatTemporalDate, formatYear } from './temporalFormat'

export type TrackItem =
  | { kind: 'marker'; id: string; label: string; variant: 'start' | 'present' | 'horizon' }
  | { kind: 'recall'; recall: Recall }

type Props = {
  items: TrackItem[]
  onSelectRecall: (recall: Recall) => void
  timelineNamesById?: Record<string, string>
}

export function TimelineTrack({
  items,
  onSelectRecall,
  timelineNamesById = {},
}: Props) {
  return (
    <div className="timeline-track" aria-label="Trayectoria temporal">
      <div className="timeline-track__spine" aria-hidden />
      {items.map((item) => {
        if (item.kind === 'marker') {
          return (
            <div
              key={item.id}
              className={[
                'timeline-track__marker',
                item.variant === 'present'
                  ? 'timeline-track__marker--present'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {item.label}
            </div>
          )
        }
        const recall = item.recall
        const connected = recall.timeline_ids
          .map((id) => timelineNamesById[id] ?? id)
          .filter(Boolean)
        return (
          <button
            key={recall.id}
            type="button"
            className={[
              'timeline-recall-node',
              recall.is_collapse ? 'timeline-recall-node--collapse' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onSelectRecall(recall)}
          >
            <div className="timeline-recall-node__meta">
              <time>
                {formatTemporalDate(
                  recall.temporal_year,
                  recall.temporal_month,
                  recall.temporal_day,
                )}
              </time>
              <RecallClassificationBadge
                classification={recall.classification}
              />
              {recall.is_collapse ? (
                <span className="timeline-recall-node__collapse-hint">
                  Colapso · {connected.length} líneas
                </span>
              ) : null}
            </div>
            <h3>{recall.title}</h3>
            <p>{recall.description_markdown}</p>
            <div className="timeline-recall-node__meta">
              <span>
                Creado {new Date(recall.created_at).toLocaleDateString('es')}
              </span>
              <span>
                Actualizado{' '}
                {new Date(recall.updated_at).toLocaleDateString('es')}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export function buildTrackItems(
  retrospectiveYear: number,
  recalls: Recall[],
  todayYear = new Date().getFullYear(),
): TrackItem[] {
  const items: TrackItem[] = [
    {
      kind: 'marker',
      id: 'start',
      label: `Retrospectiva · ${formatYear(retrospectiveYear)}`,
      variant: 'start',
    },
  ]

  const farthest = recalls.reduce(
    (max, r) => Math.max(max, r.temporal_year),
    todayYear,
  )
  const horizon = Math.max(todayYear, farthest)

  const beforePresent = recalls.filter((r) => r.temporal_year <= todayYear)
  const afterPresent = recalls.filter((r) => r.temporal_year > todayYear)

  for (const recall of beforePresent) {
    items.push({ kind: 'recall', recall })
  }

  items.push({
    kind: 'marker',
    id: 'present',
    label: `Hoy / Presente · ${formatYear(todayYear)}`,
    variant: 'present',
  })

  for (const recall of afterPresent) {
    items.push({ kind: 'recall', recall })
  }

  if (horizon > todayYear) {
    items.push({
      kind: 'marker',
      id: 'horizon',
      label: `Horizonte · ${formatYear(horizon)}`,
      variant: 'horizon',
    })
  }

  return items
}

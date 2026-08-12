import type { ReactNode } from 'react'
import './recall-relation-cards.css'

export type RecallRelationCardModel = {
  id: string
  title: string
  timelineName: string
  temporalLabel?: string
  /** When set, shows remove control */
  onRemove?: () => void
  onOpen?: () => void
  /** Subtle badge e.g. «Hogar» */
  badge?: string
}

type Props = {
  label: string
  cards: RecallRelationCardModel[]
  emptyHint: string
  actions?: ReactNode
}

export function RecallRelationCarousel({
  label,
  cards,
  emptyHint,
  actions,
}: Props) {
  return (
    <div className="research-drawer__section">
      <div className="recall-relation__head">
        <p className="research-drawer__section-title">{label}</p>
        {actions}
      </div>
      {cards.length === 0 ? (
        <p className="recall-relation__empty">{emptyHint}</p>
      ) : (
        <div className="recall-relation__carousel" role="list">
          {cards.map((card) => (
            <article
              key={card.id}
              className="recall-relation__card"
              role="listitem"
            >
              <button
                type="button"
                className="recall-relation__card-main"
                onClick={card.onOpen}
                disabled={!card.onOpen}
              >
                {card.badge ? (
                  <p className="recall-relation__eyebrow">{card.badge}</p>
                ) : null}
                <p className="recall-relation__title">{card.title}</p>
                <p className="recall-relation__meta">{card.timelineName}</p>
                {card.temporalLabel ? (
                  <p className="recall-relation__meta">{card.temporalLabel}</p>
                ) : null}
              </button>
              {card.onRemove ? (
                <button
                  type="button"
                  className="ghost recall-relation__remove"
                  onClick={card.onRemove}
                  aria-label={`Quitar relación con ${card.title}`}
                >
                  Quitar
                </button>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

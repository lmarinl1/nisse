import type { MethodologicalDerivationType } from './taxonomy'
import './derivation-type-detail.css'

type Props = {
  type: MethodologicalDerivationType
  /** `full` = name, reference, inspiration, pista; `pista` = pista only */
  mode?: 'full' | 'pista'
}

export function DerivationTypeDetailCard({ type, mode = 'full' }: Props) {
  if (mode === 'pista') {
    return (
      <div className="td-type-detail">
        <p className="td-type-detail__eyebrow">Pista</p>
        <p className="td-type-detail__name">{type.name}</p>
        <p className="td-type-detail__body">{type.prompt}</p>
      </div>
    )
  }

  return (
    <div className="td-type-detail">
      <p className="td-type-detail__reference">{type.reference}</p>
      <p className="td-type-detail__name">{type.name}</p>
      <p className="td-type-detail__label">Inspiración</p>
      <p className="td-type-detail__body">{type.inspiration}</p>
      <p className="td-type-detail__label">Pista</p>
      <p className="td-type-detail__body">{type.prompt}</p>
    </div>
  )
}

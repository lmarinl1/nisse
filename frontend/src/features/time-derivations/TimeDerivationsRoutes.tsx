import { useParams } from 'react-router-dom'
import { DerivationsCanvas } from './DerivationsCanvas'

export function TimeDerivationsRoute() {
  const { studyId } = useParams()
  if (!studyId) {
    return null
  }
  return <DerivationsCanvas studyId={studyId} />
}

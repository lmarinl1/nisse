import { ResearchDrawer } from '../../shared/ui'

type Props = {
  open: boolean
  studyName: string
  studyDescription: string
  derivationCount: number
  edgeCount: number
  onClose: () => void
}

export function StudyRootDrawer({
  open,
  studyName,
  studyDescription,
  derivationCount,
  edgeCount,
  onClose,
}: Props) {
  if (!open) {
    return null
  }

  return (
    <ResearchDrawer
      open={open}
      title="Objeto de estudio"
      onClose={onClose}
      hint="Este es el punto de partida del grafo. La identidad del Objeto de Estudio se edita en otras superficies del Workspace."
    >
      <dl className="td-root-meta">
        <div>
          <dt>Nombre</dt>
          <dd>{studyName}</dd>
        </div>
        {studyDescription ? (
          <div>
            <dt>Descripción</dt>
            <dd>{studyDescription}</dd>
          </div>
        ) : null}
        <div>
          <dt>Derivaciones</dt>
          <dd>{derivationCount}</dd>
        </div>
        <div>
          <dt>Conexiones</dt>
          <dd>{edgeCount}</dd>
        </div>
      </dl>
    </ResearchDrawer>
  )
}

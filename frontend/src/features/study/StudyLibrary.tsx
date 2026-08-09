import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Study } from '../../shared/api/client'
import { ArrowRightIcon, MoreIcon, PlusIcon } from '../../shared/icons'

type Props = {
  studies: Study[]
  onCreate: () => void
  onRefine: (study: Study) => void
  onArchive: (study: Study) => void
}

export function StudyLibrary({
  studies,
  onCreate,
  onRefine,
  onArchive,
}: Props) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  return (
    <section className="study-library" aria-labelledby="library-title">
      <header className="study-library__header">
        <div>
          <p className="eyebrow">Campo de investigación</p>
          <h1 id="library-title">¿Qué estás explorando?</h1>
          <p className="lede">
            Cada Objeto de Estudio es un Workspace. Abre uno para continuar el
            pensamiento donde lo dejaste.
          </p>
        </div>
        <button type="button" className="btn-discovery btn-with-icon" onClick={onCreate}>
          <PlusIcon size="sm" />
          Nueva pregunta
        </button>
      </header>

      <ul className="study-gallery">
        {studies.map((study) => {
          const menuOpen = openMenuId === study.id
          return (
            <li key={study.id} className="research-panel">
              <Link to={`/studies/${study.id}`} className="research-panel__main">
                <p className="research-panel__label">Objeto de Estudio</p>
                <h2>{study.name}</h2>
                {study.description ? (
                  <p className="research-panel__desc">{study.description}</p>
                ) : (
                  <p className="research-panel__desc muted">
                    Aún sin contexto escrito — la exploración puede empezar igual.
                  </p>
                )}
                <span className="research-panel__cta">
                  Explorar Workspace
                  <ArrowRightIcon size="sm" />
                </span>
              </Link>

              <div className="research-panel__tools">
                <button
                  type="button"
                  className="ghost icon-action"
                  aria-expanded={menuOpen}
                  aria-label="Más acciones"
                  onClick={() =>
                    setOpenMenuId(menuOpen ? null : study.id)
                  }
                >
                  <MoreIcon size="nav" />
                </button>
                {menuOpen && (
                  <div className="research-panel__menu" role="menu">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setOpenMenuId(null)
                        onRefine(study)
                      }}
                    >
                      Refinar pregunta
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setOpenMenuId(null)
                        onArchive(study)
                      }}
                    >
                      Archivar investigación
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

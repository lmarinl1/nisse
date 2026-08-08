type Props = {
  onCreate: () => void
}

export function StudyEmptyState({ onCreate }: Props) {
  return (
    <section className="study-empty" aria-labelledby="empty-title">
      <p className="eyebrow">Laboratorio</p>
      <h1 id="empty-title">
        Todo gran escenario comienza con una buena pregunta
      </h1>
      <p className="study-empty__body">
        Un Objeto de Estudio es el Workspace donde vivirán hipótesis, señales y
        futuros posibles. No administres proyectos: formula lo que quieres
        comprender.
      </p>
      <button type="button" className="btn-discovery" onClick={onCreate}>
        Formular la primera pregunta
      </button>
    </section>
  )
}

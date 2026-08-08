export function WorkspaceCanvas() {
  return (
    <div className="workspace-canvas" role="region" aria-label="Canvas">
      <div className="workspace-canvas__field" aria-hidden="true" />
      <div className="workspace-canvas__plane">
        <p className="eyebrow">Canvas</p>
        <p className="workspace-canvas__invite">
          Este espacio espera tu primera pregunta materializada
        </p>
        <p className="workspace-canvas__hint">
          Aquí emergerán objetos cognitivos, relaciones e incertidumbre. Por
          ahora, contempla el vacío como inicio de la investigación.
        </p>
      </div>
    </div>
  )
}

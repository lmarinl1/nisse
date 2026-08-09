import { useRef, useState, type TextareaHTMLAttributes } from 'react'
import { renderMarkdownToHtml } from './markdown'

type MarkdownResearchEditorProps = {
  id: string
  value: string
  onChange: (value: string) => void
  title: string
  subtitle: string
  guidingQuestion: string
  'aria-label'?: string
} & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'id' | 'aria-label'
>

type WrapKind =
  | 'h2'
  | 'h3'
  | 'bold'
  | 'italic'
  | 'ul'
  | 'ol'
  | 'quote'
  | 'link'

type EditorTab = 'write' | 'preview'

export function MarkdownResearchEditor({
  id,
  value,
  onChange,
  title,
  subtitle,
  guidingQuestion,
  'aria-label': ariaLabel,
  ...rest
}: MarkdownResearchEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [tab, setTab] = useState<EditorTab>('write')

  const apply = (kind: WrapKind) => {
    const el = ref.current
    if (!el) {
      return
    }
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end) || 'texto'
    let next = value
    let cursor = end

    const replace = (before: string, after: string, body = selected) => {
      next = value.slice(0, start) + before + body + after + value.slice(end)
      cursor = start + before.length + body.length + after.length
    }

    switch (kind) {
      case 'h2':
        replace('\n## ', '\n')
        break
      case 'h3':
        replace('\n### ', '\n')
        break
      case 'bold':
        replace('**', '**')
        break
      case 'italic':
        replace('*', '*')
        break
      case 'ul':
        replace('\n- ', '\n')
        break
      case 'ol':
        replace('\n1. ', '\n')
        break
      case 'quote':
        replace('\n> ', '\n')
        break
      case 'link':
        replace('[', '](https://)')
        break
    }

    onChange(next)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(cursor, cursor)
    })
  }

  return (
    <div className="md-research-editor">
      <div className="md-research-editor__heading">
        <h3 className="md-research-editor__title">{title}</h3>
        <p className="md-research-editor__subtitle">{subtitle}</p>
      </div>

      <div className="md-research-editor__tabs" role="tablist" aria-label={title}>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'write'}
          className={
            tab === 'write'
              ? 'md-research-editor__tab md-research-editor__tab--active'
              : 'md-research-editor__tab'
          }
          onClick={() => setTab('write')}
        >
          Escribir
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'preview'}
          className={
            tab === 'preview'
              ? 'md-research-editor__tab md-research-editor__tab--active'
              : 'md-research-editor__tab'
          }
          onClick={() => setTab('preview')}
        >
          Previsualizar
        </button>
      </div>

      {tab === 'write' ? (
        <>
          <div
            className="md-research-editor__toolbar"
            role="toolbar"
            aria-label="Formato Markdown"
          >
            <button type="button" onClick={() => apply('h2')} title="Título">
              H2
            </button>
            <button type="button" onClick={() => apply('h3')} title="Subtítulo">
              H3
            </button>
            <button type="button" onClick={() => apply('bold')} title="Negrita">
              N
            </button>
            <button type="button" onClick={() => apply('italic')} title="Cursiva">
              C
            </button>
            <button type="button" onClick={() => apply('ul')} title="Lista">
              •
            </button>
            <button type="button" onClick={() => apply('ol')} title="Lista numerada">
              1.
            </button>
            <button type="button" onClick={() => apply('quote')} title="Cita">
              ”
            </button>
            <button type="button" onClick={() => apply('link')} title="Enlace">
              Link
            </button>
          </div>
          <textarea
            {...rest}
            ref={ref}
            id={id}
            className="md-research-editor__input"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-label={ariaLabel ?? title}
            rows={8}
            spellCheck
          />
        </>
      ) : (
        <div
          className="md-research-editor__preview case-framework__md"
          role="tabpanel"
        >
          {value.trim() ? (
            <div
              dangerouslySetInnerHTML={{
                __html: renderMarkdownToHtml(value),
              }}
            />
          ) : (
            <p className="case-framework__empty">Sin contenido para previsualizar.</p>
          )}
        </div>
      )}

      <p className="md-research-editor__hint" title={guidingQuestion}>
        <span className="md-research-editor__hint-label">Pista</span>
        {guidingQuestion}
      </p>
    </div>
  )
}

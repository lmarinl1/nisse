import * as Popover from '@radix-ui/react-popover'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { ReactNode } from 'react'
import type { DerivationRecallRef } from '../../shared/api/client'
import { Icon } from '../../shared/icons'
import { renderMarkdownToHtml } from '../case-framework/markdown'
import { formatTemporalDate } from '../timelines/temporalFormat'
import { DerivationTypeDetailCard } from './DerivationTypeDetailCard'
import {
  iconForDerivationType,
  resolveTypes,
} from './taxonomy'

export type StudyRootNodeData = {
  name: string
  label: string
}

export function StudyRootNode({ data }: NodeProps) {
  const d = data as StudyRootNodeData
  return (
    <div className="td-node td-node--root" title={d.name}>
      <Handle type="target" position={Position.Top} className="td-handle" />
      <p className="td-node__eyebrow">Objeto de estudio</p>
      <p className="td-node__name">{d.name}</p>
      <Handle type="source" position={Position.Bottom} className="td-handle" />
    </div>
  )
}

export type DerivationFlowNodeData = {
  name: string
  typeIds?: string[]
  descriptionMarkdown?: string
  tags?: string[]
  recall?: DerivationRecallRef | null
}

function ContextIconButton({
  label,
  icon,
  children,
}: {
  label: string
  icon: 'document' | 'timeline-clock' | 'tag'
  children: ReactNode
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="td-node__context-icon nodrag nopan"
          aria-label={label}
        >
          <Icon name={icon} size="sm" title="" aria-hidden />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="td-popover"
          sideOffset={8}
          collisionPadding={12}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export function DerivationFlowNode({ data }: NodeProps) {
  const d = data as DerivationFlowNodeData
  const types = resolveTypes(d.typeIds ?? [])
  const description = (d.descriptionMarkdown ?? '').trim()
  const tags = (d.tags ?? []).filter((t) => t.trim().length > 0)
  const recall = d.recall ?? null
  const hasDescription = description.length > 0
  const hasTemporal = Boolean(recall?.id && recall.title)
  const hasTags = tags.length > 0
  const hasContext = hasDescription || hasTemporal || hasTags
  const hasRail = hasContext || types.length > 0

  return (
    <div className="td-node-wrap" title={d.name}>
      <div className="td-node td-node--derivation">
        <Handle type="target" position={Position.Top} className="td-handle" />
        <p className="td-node__name">{d.name}</p>
        <Handle type="source" position={Position.Bottom} className="td-handle" />
      </div>
      {hasRail ? (
        <div
          className="td-node-wrap__rail nodrag nopan"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {hasContext ? (
            <div
              className="td-node-wrap__context"
              role="toolbar"
              aria-label="Contexto de la deriva"
            >
              {hasDescription ? (
                <ContextIconButton label="Ver descripción" icon="document">
                  <div className="td-context-popover">
                    <p className="td-context-popover__eyebrow">Descripción</p>
                    <div
                      className="td-context-popover__markdown"
                      dangerouslySetInnerHTML={{
                        __html: renderMarkdownToHtml(description),
                      }}
                    />
                  </div>
                </ContextIconButton>
              ) : null}
              {hasTemporal && recall ? (
                <ContextIconButton
                  label="Ver vínculo temporal"
                  icon="timeline-clock"
                >
                  <div className="td-context-popover">
                    <p className="td-context-popover__eyebrow">
                      Vínculo temporal
                    </p>
                    <p className="td-context-popover__meta">
                      {recall.timeline_name}
                    </p>
                    <p className="td-context-popover__title">{recall.title}</p>
                    <p className="td-context-popover__meta">
                      {formatTemporalDate(
                        recall.temporal_year,
                        recall.temporal_month,
                        recall.temporal_day,
                      )}
                    </p>
                  </div>
                </ContextIconButton>
              ) : null}
              {hasTags ? (
                <ContextIconButton label="Ver etiquetas" icon="tag">
                  <div className="td-context-popover">
                    <p className="td-context-popover__eyebrow">Etiquetas</p>
                    <div className="td-context-popover__tags">
                      {tags.map((tag) => (
                        <span key={tag} className="td-context-popover__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </ContextIconButton>
              ) : null}
            </div>
          ) : null}
          {types.length > 0 ? (
            <div
              className="td-node-wrap__types"
              role="toolbar"
              aria-label="Tipos de deriva"
            >
              {types.map((t) => (
                <Popover.Root key={t.id}>
                  <Popover.Trigger asChild>
                    <button
                      type="button"
                      className="td-node__type-chip nodrag nopan"
                      aria-label={`Ver lente ${t.name}`}
                    >
                      <Icon
                        name={iconForDerivationType(t.id)}
                        size="sm"
                        className="td-node__type-chip-icon"
                        title=""
                        aria-hidden
                      />
                      <span className="td-node__type-chip-label">{t.name}</span>
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className="td-popover"
                      sideOffset={8}
                      collisionPadding={12}
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <DerivationTypeDetailCard type={t} mode="full" />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

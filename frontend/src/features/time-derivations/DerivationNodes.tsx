import { Handle, Position, type NodeProps } from '@xyflow/react'

export type StudyRootNodeData = {
  name: string
  label: string
}

export function StudyRootNode({ data }: NodeProps) {
  const d = data as StudyRootNodeData
  return (
    <div className="td-node td-node--root">
      <Handle type="target" position={Position.Top} className="td-handle" />
      <p className="td-node__eyebrow">Objeto de estudio</p>
      <p className="td-node__name">{d.name}</p>
      <Handle type="source" position={Position.Bottom} className="td-handle" />
    </div>
  )
}

export type DerivationFlowNodeData = {
  name: string
  derivationType?: string
  isSpeculative?: boolean
}

export function DerivationFlowNode({ data }: NodeProps) {
  const d = data as DerivationFlowNodeData
  return (
    <div
      className={[
        'td-node',
        'td-node--derivation',
        d.isSpeculative ? 'td-node--speculative' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Handle type="target" position={Position.Top} className="td-handle" />
      <p className="td-node__name">{d.name}</p>
      <Handle type="source" position={Position.Bottom} className="td-handle" />
    </div>
  )
}

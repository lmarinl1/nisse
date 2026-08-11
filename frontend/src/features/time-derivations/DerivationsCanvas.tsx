import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  type OnNodeDrag,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createDerivationEdge,
  createDerivationNode,
  deleteDerivationEdge,
  deleteDerivationNode,
  getDerivationGraph,
  listStudyRecalls,
  updateDerivationNode,
  type DerivationEdge,
  type DerivationGraph,
  type DerivationNode,
  type DerivationNodePatch,
  type DerivationRecallRef,
} from '../../shared/api/client'
import { PlusIcon } from '../../shared/icons'
import { SessionCanvasHeader } from '../../shared/ui'
import { DerivationDrawer } from './DerivationDrawer'
import {
  DerivationFlowNode,
  StudyRootNode,
} from './DerivationNodes'
import { StudyRootDrawer } from './StudyRootDrawer'
import './time-derivations.css'

type Props = {
  studyId: string
}

const nodeTypes: NodeTypes = {
  studyRoot: StudyRootNode,
  derivation: DerivationFlowNode,
}

function toFlowNodes(nodes: DerivationNode[]): Node[] {
  return nodes.map((n) => ({
    id: n.id,
    type: n.kind === 'root' ? 'studyRoot' : 'derivation',
    position: { x: n.position_x, y: n.position_y },
    data:
      n.kind === 'root'
        ? { name: n.name, label: 'OBJETO DE ESTUDIO' }
        : {
            name: n.name,
            derivationType: n.derivation_type,
            isSpeculative: n.is_speculative,
          },
  }))
}

function toFlowEdges(edges: DerivationEdge[]): Edge[] {
  return edges.map((e) => ({
    id: e.id,
    source: e.source_node_id,
    target: e.target_node_id,
    markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
    className: 'td-edge',
  }))
}

function DerivationsCanvasInner({ studyId }: Props) {
  const [graph, setGraph] = useState<DerivationGraph | null>(null)
  const [nodesById, setNodesById] = useState<Record<string, DerivationNode>>(
    {},
  )
  const [recalls, setRecalls] = useState<DerivationRecallRef[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const applyGraph = useCallback((data: DerivationGraph) => {
    setGraph(data)
    const map: Record<string, DerivationNode> = {}
    for (const n of data.nodes) {
      map[n.id] = n
    }
    setNodesById(map)
    setNodes(toFlowNodes(data.nodes))
    setEdges(toFlowEdges(data.edges))
  }, [setEdges, setNodes])

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [data, recallList] = await Promise.all([
        getDerivationGraph(studyId),
        listStudyRecalls(studyId).catch(() => [] as DerivationRecallRef[]),
      ])
      applyGraph(data)
      setRecalls(recallList)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No pudimos cargar las derivaciones.',
      )
    } finally {
      setLoading(false)
    }
  }, [applyGraph, studyId])

  useEffect(() => {
    void reload()
  }, [reload])

  const selectedNode = selectedId ? nodesById[selectedId] ?? null : null
  const selectedIsRoot = selectedNode?.kind === 'root'

  const onConnect = useCallback(
    async (connection: Connection) => {
      if (!connection.source || !connection.target) {
        return
      }
      const tempId = `temp-${connection.source}-${connection.target}`
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            id: tempId,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 16,
              height: 16,
            },
            className: 'td-edge',
          },
          eds,
        ),
      )
      try {
        const edge = await createDerivationEdge(
          studyId,
          connection.source,
          connection.target,
        )
        setEdges((eds) =>
          eds.map((e) =>
            e.id === tempId
              ? {
                  ...e,
                  id: edge.id,
                }
              : e,
          ),
        )
        setGraph((g) =>
          g
            ? {
                ...g,
                edges: [...g.edges.filter((x) => x.id !== edge.id), edge],
                edge_count: g.edge_count + 1,
              }
            : g,
        )
        setActionError(null)
      } catch (err) {
        setEdges((eds) => eds.filter((e) => e.id !== tempId))
        setActionError(
          err instanceof Error
            ? err.message
            : 'No pudimos crear la conexión.',
        )
      }
    },
    [setEdges, studyId],
  )

  const onEdgesDelete = useCallback(
    async (deleted: Edge[]) => {
      const snapshot = edges
      for (const edge of deleted) {
        if (edge.id.startsWith('temp-')) {
          continue
        }
        try {
          await deleteDerivationEdge(studyId, edge.id)
          setGraph((g) =>
            g
              ? {
                  ...g,
                  edges: g.edges.filter((e) => e.id !== edge.id),
                  edge_count: Math.max(0, g.edge_count - 1),
                }
              : g,
          )
        } catch (err) {
          setEdges(snapshot)
          setActionError(
            err instanceof Error
              ? err.message
              : 'No pudimos eliminar la conexión.',
          )
          return
        }
      }
    },
    [edges, setEdges, studyId],
  )

  const onNodeDragStop: OnNodeDrag = useCallback(
    async (_event, node) => {
      const prev = nodesById[node.id]
      if (!prev) {
        return
      }
      try {
        const updated = await updateDerivationNode(studyId, node.id, {
          position_x: node.position.x,
          position_y: node.position.y,
        })
        setNodesById((m) => ({ ...m, [node.id]: { ...prev, ...updated } }))
        setActionError(null)
      } catch (err) {
        setNodes((nds) =>
          nds.map((n) =>
            n.id === node.id
              ? {
                  ...n,
                  position: { x: prev.position_x, y: prev.position_y },
                }
              : n,
          ),
        )
        setActionError(
          err instanceof Error
            ? err.message
            : 'No pudimos guardar la posición.',
        )
      }
    },
    [nodesById, setNodes, studyId],
  )

  async function addDerivation(fromSelected: boolean) {
    const source =
      fromSelected && selectedId && !selectedIsRoot
        ? selectedId
        : fromSelected && selectedId
          ? selectedId
          : undefined
    const sourceNode = source ? nodesById[source] : null
    const baseX = sourceNode ? sourceNode.position_x + 40 : 160
    const baseY = sourceNode ? sourceNode.position_y + 140 : 180
    try {
      const created = await createDerivationNode(studyId, {
        name: 'Nueva derivación',
        source_node_id: source,
        position_x: baseX,
        position_y: baseY,
      })
      const { created_edge: newEdge, ...node } = created
      setNodesById((m) => ({ ...m, [node.id]: node }))
      setNodes((nds) => [...nds, ...toFlowNodes([node])])
      if (newEdge) {
        setEdges((eds) => [...eds, ...toFlowEdges([newEdge])])
      }
      setGraph((g) =>
        g
          ? {
              ...g,
              nodes: [...g.nodes, node],
              edges: newEdge ? [...g.edges, newEdge] : g.edges,
              derivation_count: g.derivation_count + 1,
              edge_count: newEdge ? g.edge_count + 1 : g.edge_count,
            }
          : g,
      )
      setSelectedId(node.id)
      setActionError(null)
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : 'No pudimos crear la derivación.',
      )
    }
  }

  async function handleSave(patch: DerivationNodePatch) {
    if (!selectedNode || selectedNode.kind !== 'derivation') {
      return
    }
    const updated = await updateDerivationNode(studyId, selectedNode.id, patch)
    setNodesById((m) => ({ ...m, [updated.id]: { ...selectedNode, ...updated } }))
    setNodes((nds) =>
      nds.map((n) =>
        n.id === updated.id
          ? {
              ...n,
              data: {
                name: updated.name,
                derivationType: updated.derivation_type,
                isSpeculative: updated.is_speculative,
              },
            }
          : n,
      ),
    )
    setActionError(null)
  }

  async function handleDelete() {
    if (!selectedNode || selectedNode.kind !== 'derivation') {
      return
    }
    const id = selectedNode.id
    await deleteDerivationNode(studyId, id)
    setSelectedId(null)
    setNodes((nds) => nds.filter((n) => n.id !== id))
    setEdges((eds) =>
      eds.filter((e) => e.source !== id && e.target !== id),
    )
    setNodesById((m) => {
      const next = { ...m }
      delete next[id]
      return next
    })
    setGraph((g) =>
      g
        ? {
            ...g,
            nodes: g.nodes.filter((n) => n.id !== id),
            edges: g.edges.filter(
              (e) => e.source_node_id !== id && e.target_node_id !== id,
            ),
            derivation_count: Math.max(0, g.derivation_count - 1),
          }
        : g,
    )
  }

  const emptyDerivations = (graph?.derivation_count ?? 0) === 0

  const defaultEdgeOptions = useMemo(
    () => ({
      markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
      className: 'td-edge',
    }),
    [],
  )

  if (loading) {
    return (
      <div className="time-derivations time-derivations--message">
        Cargando derivaciones…
      </div>
    )
  }

  if (error || !graph) {
    return (
      <div className="time-derivations time-derivations--message" role="alert">
        <p>{error ?? 'No pudimos cargar las derivaciones.'}</p>
        <button type="button" className="btn-discovery" onClick={() => void reload()}>
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div
      className={[
        'time-derivations',
        selectedId ? 'time-derivations--drawer-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Derivaciones del tiempo"
    >
      <SessionCanvasHeader
        eyebrow="Sesión de investigación"
        title="Derivaciones del tiempo"
        purpose="¿Hacia dónde puede derivar este objeto si sigo esta pista?"
      />

      {actionError ? (
        <p className="time-derivations__banner" role="status">
          {actionError}
        </p>
      ) : null}

      {emptyDerivations ? (
        <p className="time-derivations__empty-hint">
          Este es el punto de partida de tu exploración. Agrega una
          derivación para comenzar a explorar nuevas trayectorias.
        </p>
      ) : null}

      <div className="time-derivations__stage">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgesDelete={onEdgesDelete}
          onNodeDragStop={onNodeDragStop}
          onNodeClick={(_e, node) => setSelectedId(node.id)}
          onPaneClick={() => setSelectedId(null)}
          fitView
          deleteKeyCode={['Backspace', 'Delete']}
          defaultEdgeOptions={defaultEdgeOptions}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={24} size={1} color="var(--color-border-subtle)" />
          <Controls className="td-controls" showInteractive={false} />
          <MiniMap
            className="td-minimap"
            position="top-right"
            pannable
            zoomable
            maskColor="rgba(0,0,0,0.55)"
          />
        </ReactFlow>
        <button
          type="button"
          className="time-derivations__fab btn-discovery"
          onClick={() => void addDerivation(Boolean(selectedId))}
          aria-label={
            emptyDerivations
              ? 'Agregar primera derivación'
              : 'Agregar derivación'
          }
          title="Agregar derivación"
        >
          <PlusIcon size="nav" />
          <span className="time-derivations__fab-label">
            {emptyDerivations ? 'Primera derivación' : 'Agregar'}
          </span>
        </button>
      </div>

      <DerivationDrawer
        open={Boolean(selectedNode && !selectedIsRoot)}
        node={selectedIsRoot ? null : selectedNode}
        recalls={recalls}
        onClose={() => setSelectedId(null)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <StudyRootDrawer
        open={Boolean(selectedIsRoot)}
        studyName={graph.study.name}
        studyDescription={graph.study.description}
        derivationCount={graph.derivation_count}
        edgeCount={graph.edge_count}
        onClose={() => setSelectedId(null)}
      />
    </div>
  )
}

export function DerivationsCanvas(props: Props) {
  return (
    <ReactFlowProvider>
      <DerivationsCanvasInner {...props} />
    </ReactFlowProvider>
  )
}

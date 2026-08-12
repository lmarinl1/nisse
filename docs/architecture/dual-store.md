# Dual store: MongoDB + Neo4j

NISSE usa **dos** almacenes locales en desarrollo. No son intercambiables.

## Responsabilidades

| Almacén | Rol | Ejemplos |
|---------|-----|----------|
| **MongoDB** | Documentos / ORM Django (`django-mongodb-backend`) | Study, identidad de usuario, Case Framework, Timelines, Recalls |
| **Neo4j** | Grafo de **Derivaciones del tiempo** | Nodos StudyRoot / Derivation, aristas `DERIVES_TO`, posiciones de canvas, tags / type_ids del grafo |

Los cuerpos de recuerdos (Recall) viven en Mongo. El grafo puede guardar un `recall_id` como referencia cruzada; **no** se mueve el documento Recall a Neo4j.

## Flujo de datos

```text
React (SPA)  →  Django REST (/api/)  →  MongoDB
                                 └→  Neo4j (driver Python)
```

- El navegador **nunca** se conecta a Neo4j (ni Bolt ni Browser) para datos de producto.
- Credenciales Neo4j solo en el backend (`.env` / `NEO4J_*`).
- Si Neo4j está caído, las sesiones de grafo fallan o degradan; el resto del Study en Mongo puede seguir operativo según el endpoint.

## Dónde mirar en el código

| Capa | Ubicación |
|------|-----------|
| Driver Neo4j | `backend/core/neo4j_client.py` |
| Operaciones de grafo | `backend/core/derivations.py` |
| Modelos documento | `backend/core/models.py` |
| UI del grafo | `frontend/src/features/time-derivations/` |

## Comportamiento normativo

La topología y los requisitos de API/UI se definen en OpenSpec (`openspec/specs/` y changes activos). Este documento solo orienta onboarding; no redefine contratos.

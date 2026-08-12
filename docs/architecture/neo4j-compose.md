# Neo4j y Docker Compose

Neo4j corre como servicio en el `docker-compose.yml` de la raíz, junto a MongoDB. Todo el flujo de comandos es **WSL2** (`Ubuntu-24.04`).

## Arranque

Desde la raíz del repo en WSL:

```bash
cd "/mnt/c/Users/lmari/OneDrive/Escritorio/Maestría/Codigo/nisse"
docker-compose up -d
```

Eso levanta **mongo** y **neo4j**. No uses `docker compose` en la documentación del proyecto (convención: `docker-compose`).

## Puertos

| Servicio | Puerto | Uso |
|----------|--------|-----|
| MongoDB | `27017` | URI Django (`MONGODB_URI`) |
| Neo4j Browser / HTTP | `7474` | UI de Neo4j en el host (inspección manual) |
| Neo4j Bolt | `7687` | Driver Python (`NEO4J_URI=bolt://localhost:7687`) |

Browser local (solo desarrollo / depuración): http://localhost:7474/  
La SPA de NISSE **no** usa el Browser; el grafo de producto pasa por Django.

## Variables de entorno

Documentadas en `backend/.env.example` (copiar a `backend/.env`):

| Variable | Ejemplo local | Notas |
|----------|---------------|--------|
| `NEO4J_URI` | `bolt://localhost:7687` | Bolt hacia el contenedor publicado |
| `NEO4J_USER` | `neo4j` | Usuario por defecto de la imagen |
| `NEO4J_PASSWORD` | `nisse-dev-neo4j` | Solo desarrollo; Compose usa el mismo valor vía `NEO4J_AUTH` |

Compose lee `NEO4J_USER` / `NEO4J_PASSWORD` del entorno del host si están definidos; si no, aplica esos defaults de desarrollo. **No** commits secrets reales.

## Volumen

Datos Neo4j persisten en el volumen nombrado `neo4j_data`. Borrar el volumen resetea el grafo local.

## Relación con el producto

Ver [dual-store.md](./dual-store.md). Sesión de UI: **Derivaciones del tiempo** (`frontend/src/features/time-derivations/`).

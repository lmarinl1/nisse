# Project Development Guidelines

These instructions apply to the whole Nisse monorepo. Prefer OpenSpec for any non-trivial change.

## Shell: WSL2 only

All commands, scripts, and terminal instructions MUST run in **WSL2** (`Ubuntu-24.04`), never native PowerShell/CMD.

```bash
wsl -d Ubuntu-24.04 -- bash -lc 'cd "/mnt/c/Users/lmari/OneDrive/Escritorio/Maestría/Codigo/nisse" && <cmd>'
```

Repo path in WSL: `/mnt/c/Users/lmari/OneDrive/Escritorio/Maestría/Codigo/nisse`  
Venv: `source .venv/bin/activate` (Linux venv, not Windows `Scripts\`).

## Workflow (OpenSpec)

1. Explore if needed: `/opsx-explore`
2. Propose: `/opsx-propose "feature description"`
3. Implement: `/opsx-apply`
4. Archive when done: `/opsx-archive`

Artifacts live under `openspec/changes/<name>/` (proposal, design, tasks, delta specs). Source of truth for current behavior: `openspec/specs/`.

## Stack

| Area | Choice |
|------|--------|
| Shell | WSL2 Ubuntu-24.04 |
| Backend | Django 5.2 + DRF + django-mongodb-backend |
| Frontend | React 19 + TypeScript + Vite |
| DB | MongoDB (`docker-compose up -d` or Atlas URI) |
| Specs | OpenSpec |

## Good practices (always)

- Spec before code for features/behavior changes
- No secrets in git; use `.env` / `.env.example`
- Keep API contracts explicit; update frontend client when endpoints change
- Prefer typed TypeScript and thin Django views/serializers
- Don't add dependencies without need
- Match existing style; no drive-by refactors
- Tests for non-trivial logic; keep them focused
- UX: follow `.cursor/rules/nisse-*.mdc`; full Design Language in `docs/ux-framework/`

## Commands (WSL)

```bash
cd "/mnt/c/Users/lmari/OneDrive/Escritorio/Maestría/Codigo/nisse"
. "$HOME/.nvm/nvm.sh"

# MongoDB
docker-compose up -d

# Backend
source .venv/bin/activate
cd backend
cp -n .env.example .env
python manage.py migrate
python manage.py runserver

# Frontend (otra terminal WSL)
cd frontend
cp -n .env.example .env
npm install
npm run dev
```

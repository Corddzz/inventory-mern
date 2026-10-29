# inventory-mern

Two packages orchestrated by root `compose.yml`:

- `backend/` — Express (ESM), entry `server.js`, MySQL via `mysql2`
- `frontend/` — Vite + React 19 + Tailwind v4, entry `index.html`

## Running

**All services (recommended):**
```
docker compose up
```
Ports: frontend `5173`, backend `9000` (container `8000`), MySQL `3309` (container `3306`). Backend env comes from root `.env` (DB/JWT/CORS). Frontend gets `VITE_API_URL=http://localhost:9000`.

**Backend alone:**
```
cd backend && npm start        # nodemon server.js (port 8000)
```
No test or lint script exists for the backend. `src/config/connect.js` creates the MySQL pool; routes mount at `/` in `server.js`; protected routes use `src/middlewares/authMiddleware.js` + `verifyToken`. `src/config/jwt.js` is an empty stub.

`server.js` loads `.env` from the repo root (relative to `server.js`), so `npm start` works from `backend/` without a local `.env`. In Compose, env is passed explicitly via the `environment:` block; `dotenv.config()` is a no-op when no `.env` exists in the container and never overrides already-set vars.

**Frontend alone:**
```
cd frontend && npm run dev     # vite --host (5173)
npm run build                  # vite build
npm run lint                   # eslint (flat config, eslint.config.js)
npm run preview
```

## Conventions

- Backend: ESM (`"type": "module"`), `.js` extension required on imports.
- Routes live in `backend/src/routes/*`, controllers in `controllers/*`, models in `models/*`, DB pool in `src/config/connect.js`.
- Frontend env vars must be prefixed `VITE_`.
- `node_modules` is gitignored in both packages; install via Compose or `npm install` in each package.
- No CI workflows, no pre-commit, no test suites, no backend lint/typecheck. Don't run commands that don't exist.

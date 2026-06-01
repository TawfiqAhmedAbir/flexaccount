# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

FlexAccount is a **UI-only mock iPhone banking PWA** (React + Vite + TypeScript). There is **no backend**, database, or Docker stack. All demo data lives in `src/data.ts`.

### Services

| Service | Command | URL |
|---------|---------|-----|
| Vite dev (primary) | `npm run dev` | http://localhost:5173 |
| Vite dev (LAN / iPhone) | `npm run dev -- --host` | Network URL from Vite output |
| Production preview | `npm run build` then `npm run preview` | http://localhost:4173 (default) |

Start long-running dev servers in **tmux** (e.g. session `vite-dev-server`) so they survive backgrounding.

### Standard commands

See `README.md` and `package.json` scripts:

- **Install deps:** `npm install`
- **Dev server:** `npm run dev`
- **Typecheck + production build:** `npm run build` (runs `tsc && vite build`)
- **Data consistency check:** `node scripts/verify.mjs` (offline; not a daemon)
- **Lint:** No ESLint script in this repo; use `npm run build` for TypeScript checking.

### Demo / E2E flow

1. Open http://localhost:5173 — Splash auto-advances to Passnumber after ~2.6s.
2. On Passnumber, enter keypad digits **2, 5, 8** (2nd / 5th / 6th positions); app navigates to Home after ~280ms.
3. Tap the **FlexAccount** card → Account detail (transactions).
4. Tap a transaction row → Transaction detail.

Routing uses **HashRouter** (`#/home`, `#/account`, etc.).

### Optional tooling

- **PWA icons:** `node scripts/make-icons.mjs` (requires `sharp` devDependency).
- **Google Fonts** load from CDN in `index.html`; offline dev may fall back to system fonts.

### Gotchas

- README mentions “auto-advance” for the first two screens; only **Splash** is fully automatic. **Passnumber** requires the digit sequence above (or navigate directly to `#/home` for quick checks).
- No automated browser/E2E test suite in-repo; manual or `computerUse` testing against the Vite dev server is the norm.

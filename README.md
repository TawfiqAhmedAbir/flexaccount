# FlexAccount

A UI-only mock iPhone banking app built as a React PWA for a pitch demo. No backend, no real auth - all data is hardcoded in src/data.ts.

## Stack

- React + Vite + TypeScript
- Tailwind CSS (design tokens in tailwind.config.js)
- Framer Motion (screen transitions)
- React Router (one route per screen)
- PWA: public/manifest.json + public/sw.js (installable / standalone)

## Screen flow

Splash -> Passnumber entry -> Home dashboard -> Account detail

The first two screens auto-advance for a hands-off launch sequence. On Home, tapping the FlexAccount card opens the transactions screen.

## Run it

    npm install
    npm run dev        # http://localhost:5173

Build for production:

    npm run build
    npm run preview

## Install to iPhone home screen

1. Run `npm run dev -- --host` and open the Network URL in Safari on the iPhone (same Wi-Fi).
2. Share -> Add to Home Screen.
3. Launch from the icon - it runs full-screen (standalone) with the dark navy theme.

## Tweaking the data

All balances, transactions, merchants and running balances live in src/data.ts. Edit that one file to change the demo numbers.

## Icons

App icons (public/icons/icon-192.png, icon-512.png) are generated from icon-src.png via `node scripts/make-icons.mjs` (requires the dev dependency sharp).

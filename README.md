# Appunti SO2 (VitePress)

Questa repository contiene gli appunti del corso di Sistemi Operativi 2, organizzati come sito statico con VitePress.

## Requisiti
- Node.js 20+
- npm

## Installazione

```bash
npm install
```

## Avvio in locale (dev)

```bash
npm run dev
```

Il sito sara' disponibile su http://localhost:5173/.

## Build

```bash
npm run build
```

## Preview della build

```bash
npm run preview
```

## Struttura
- `docs/` contiene le pagine VitePress
- `docs/.vitepress/config.js` contiene la configurazione
- `.github/workflows/deploy.yml` gestisce il deploy su GitHub Pages

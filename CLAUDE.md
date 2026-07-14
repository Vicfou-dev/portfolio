# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server on http://localhost:5174
npm run build     # production build → dist/
npm run preview   # preview the built dist/
```

No linter or test runner is configured. The project is served via MAMP at `/Applications/MAMP/htdocs/vipify/portfolio`.

## Architecture

Single-page React 18 portfolio, built with Vite + Tailwind CSS + Framer Motion. No router — page state is managed by a `page` state in `App.jsx` (`'home'` | `'case-study-yomimanga'`). Navigation between pages calls `setPage()` directly.

**Planned migration:** react-router v8 + SSR on Cloudflare Workers with per-route server-side meta tags for SEO.

### Key files

| File | Role |
|---|---|
| `src/App.jsx` | Root: wraps everything in `<LangProvider>`, owns `page` state, renders Loader → Home or CaseStudy |
| `src/i18n/LangContext.jsx` | `LangProvider` + `useLang()` hook — exposes `{ lang, toggle, t }` |
| `src/i18n/translations.js` | All UI strings in `en` and `fr`. Arrays (e.g. `timelineItems`, `pillars`) live here too |
| `src/data/projects.js` | Project data array — each entry has a `fr: {}` override object for French strings |
| `src/components/Navbar.jsx` | Fixed header with scroll progress bar, language toggle, PWA-only QR button |
| `src/components/Projects.jsx` | Filterable project grid with `BrowserMock` (iframe or static preview image) and expandable detail panel |

### i18n pattern

Every component calls `const { t, lang } = useLang()`. The `t('key')` function looks up `translations[lang][key]` with English fallback.

For project cards, per-language overrides live directly on each project object as `project.fr`. Components merge them: `const p = (lang === 'fr' && project.fr) ? { ...project, ...project.fr } : project`.

### Design system

All design tokens are in `tailwind.config.js`. Key semantic colors:

- `bg` = `#080808` — page background
- `surface` = `#111111` — cards/panels
- `accent` = `#6EE7F7` — cyan, used for highlights, CTAs, the scroll progress bar
- `primary` / `secondary` / `muted` — text hierarchy
- `border` / `border-light` — dividers

Custom utilities in `src/index.css`: `.section-padding`, `.text-gradient`, `.noise-overlay`, `.card-glass`.

### PWA

Configured via `vite-plugin-pwa` in `vite.config.js`. The `QRLinks` component and its trigger button in `Navbar` are only shown when `display-mode: standalone` is detected. The workbox config caches JS/CSS/HTML/SVG/webp assets and Google Fonts.

### 3D Scene

`src/components/Scene.jsx` (lazy-loaded) runs Three.js via `@react-three/fiber`. It is skipped on `prefers-reduced-motion` and runs in reduced-motion mode on mobile. Three.js and Framer Motion are split into separate chunks (`three`, `framer`) in the Vite rollup config to avoid a single huge bundle.

### Project previews

Each project in `src/data/projects.js` can have a `preview` field pointing to a static image in `/public/img/`. If absent, a live iframe is used instead (scaled 60% via CSS transform). Static previews are preferred for slow/iframe-blocking sites.

### SEO / OG

All meta tags, OG tags, Twitter Card, and JSON-LD are in `index.html` (static). The OG image is `/public/og-image.jpg` (1200×630). With the planned SSR migration, these will be injected server-side per route.

### External embed

`uaelead.com` chat widget is loaded via a `<script>` tag in `index.html`. Locale sync happens in `UAELeadLocaleSync` (inside `App.jsx`) which calls `window.UAELead?.setLocale(lang)` on lang change.

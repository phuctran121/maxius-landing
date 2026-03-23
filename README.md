# Moosk Das

A [Next.js](https://nextjs.org/) application (App Router) with internationalized routes, metal price data, and a component-driven UI. Built with React 19, TypeScript, Tailwind CSS v4, and [next-intl](https://next-intl-docs.vercel.app/).

---

## Prerequisites

- **Node.js** — use an LTS version compatible with Next.js 16 (see [Next.js system requirements](https://nextjs.org/docs/app/getting-started/installation)).
- **npm** — comes with Node; this project uses npm for scripts and lockfile (`package-lock.json`).

---

## Installation

From the project root:

```bash
npm install
```

`postinstall` runs **Husky**, which wires Git hooks (see [Git hooks & formatting](#git-hooks--formatting)).

---

## npm scripts

| Script        | Command                    | Description |
|---------------|----------------------------|-------------|
| **dev**       | `npm run dev`              | Starts the development server with [Turbopack](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack). |
| **build**     | `npm run build`            | Production build (outputs to `.next`). |
| **start**     | `npm run start`            | Serves the production build (run `build` first). |
| **lint**      | `npm run lint`             | Runs ESLint across the project. |
| **lint:fix**  | `npm run lint:fix`         | Runs ESLint with `--fix` to auto-fix issues where possible. |

There is no dedicated `format` script in `package.json`. For one-off formatting with Prettier:

```bash
npx prettier --write .
```

To format specific files:

```bash
npx prettier --write "src/**/*.{ts,tsx,js,jsx}"
```

---

## Git hooks & formatting

- **Husky** is enabled via `postinstall`.
- **lint-staged** (configured in `package.json`) runs on staged files before commit:
  - **Prettier** — `--write`
  - **ESLint** — `--fix`

The pre-commit hook runs `npx lint-staged` (see `.husky/pre-commit`).

---

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public site URL for metadata (e.g. Open Graph). Defaults to `https://mooskdas.vercel.app` in code if unset. |

Set these in `.env.local` for local development and in your hosting provider’s dashboard for production.

---

## Project structure

High-level layout of the `src` tree:

```text
src/
├── app/
│   ├── [locale]/           # Locale-prefixed App Router segment (i18n)
│   │   ├── layout.tsx      # Root layout: fonts, Header/Footer, next-intl, React Query
│   │   ├── page.tsx        # Localized home
│   │   ├── intro-brand/    # Brand intro route
│   │   ├── intro-gold/     # Gold intro route
│   │   └── intro-greeting/ # Greeting / vision route
│   ├── api/
│   │   └── metal-prices/
│   │       └── route.ts    # GET handler: proxies/caches Korea gold market API
│   ├── globals.css
│   └── page.tsx            # Root entry: redirects to active locale
├── components/             # UI by feature (home, intro-*, layout, common)
├── hooks/                  # e.g. use-language, useMetalPrices
├── i18n/                   # next-intl routing & navigation helpers
├── locales/                # Translation JSON (en, kr)
├── lib/                    # Shared utilities (e.g. cn / class helpers)
├── models/                 # Shared enums/types
├── providers/              # Client providers (e.g. TanStack Query)
├── proxy.ts                # next-intl middleware configuration (matcher, routing)
└── utils/                  # Formatting and shared helpers
```

**Middleware file name:** Next.js only picks up middleware from `middleware.ts` at the repo root or `src/middleware.ts`. This project keeps the same logic in `src/proxy.ts`; if locale-based routing or redirects are not applied in dev/production, add `src/middleware.ts` that re-exports the default export from `./proxy` (or rename/move the file accordingly).

### Architecture notes

- **Internationalization** — Locales are defined in `src/i18n/routing.ts` (`en`, `kr`; default `kr`). Copy lives in `src/locales/*.json`. The App Router uses the dynamic segment **`[locale]`** so URLs look like `/kr/...` and `/en/...`.
- **`next.config.ts`** — Wraps the config with `createNextIntlPlugin()` from `next-intl/plugin` so message loading and routing integrate with Next.js.
- **Data fetching** — Client hooks such as `useMetalPrices` can call **`/api/metal-prices`**, which fetches from an external Korean market API and applies Next.js caching (`revalidate`).
- **UI** — Feature folders under `components/` map to marketing/intro pages; layout pieces live in `components/layout/`.

---

## API routes

| Route | Method | Role |
|-------|--------|------|
| `/api/metal-prices` | `GET` | Returns normalized metal market data; backed by `https://koreagoldx.co.kr/api/main` with short-lived caching. |

---

## Vercel configuration

`vercel.json` registers a **cron** that hits `/api/metal-prices` every hour at minute 5 (`5 * * * *`), keeping data warm or refreshed on a schedule in production.

---

## Deployment

### Region requirement: **icn1 (Seoul)**

**You must deploy this application to the Seoul region (`icn1`).** Configure your hosting so the **server / deployment region** is **Seoul (icn1)**.

This is **required** for the integrated APIs (including the metal prices pipeline that talks to Korean market endpoints) to behave reliably. Running in distant regions can cause latency, timeouts, geo-related blocking, or inconsistent responses from upstream services.

Before going live:

1. Set the deployment region to **Seoul (`icn1`)** in your platform (e.g. Vercel: Project → Settings → Functions / region, or equivalent).
2. Set `NEXT_PUBLIC_SITE_URL` to your production URL.
3. Run `npm run build` locally or in CI to confirm a clean build.
4. After deploy, verify `/api/metal-prices` and locale routes (`/kr`, `/en`) in the production environment.

---

## Tech stack (summary)

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **i18n:** next-intl
- **Data:** TanStack React Query
- **Quality:** ESLint (eslint-config-next), Prettier, Husky, lint-staged

---

## License

Private project (`"private": true` in `package.json`). Adjust this section if you publish or open-source the repository.

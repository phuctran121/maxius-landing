# Moosk Das

A [Next.js](https://nextjs.org/) application (App Router) with internationalized routes, metal price data, and a component-driven UI. Built with React 19, TypeScript, Tailwind CSS v4, and [next-intl](https://next-intl-docs.vercel.app/).

## Prerequisites

- **Node.js** — use an LTS version compatible with Next.js 16 (see [Next.js system requirements](https://nextjs.org/docs/app/getting-started/installation)).
- **npm** — comes with Node; this project uses npm for scripts and lockfile (`package-lock.json`).

## Installation

From the project root:

```bash
npm install
```

## npm scripts

| Script       | Command            | Description                                                                                                                |
| ------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **dev**      | `npm run dev`      | Starts the development server with [Turbopack](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack). |
| **build**    | `npm run build`    | Production build (outputs to `.next`).                                                                                     |
| **start**    | `npm run start`    | Serves the production build (run `build` first).                                                                           |
| **lint**     | `npm run lint`     | Runs ESLint across the project.                                                                                            |
| **lint:fix** | `npm run lint:fix` | Runs ESLint with `--fix` to auto-fix issues where possible.                                                                |

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

## API routes

| Route               | Method | Role                                                                                                          |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| `/api/metal-prices` | `GET`  | Returns normalized metal market data; backed by `https://koreagoldx.co.kr/api/main` with short-lived caching. |

## Deployment

### Region requirement: **icn1 (Seoul)**

**You must deploy this application to the Seoul region (`icn1`).** Configure your hosting so the **server / deployment region** is **Seoul (icn1)**.

This is **required** for the integrated APIs (including the metal prices pipeline that talks to Korean market endpoints) to behave reliably. Running in distant regions can cause latency, timeouts, geo-related blocking, or inconsistent responses from upstream services.

### Deployment Note

**Server Region:** Must be set to **Seoul (`icn1`)**.
_(Note: This is strictly required for the `/api/metal-prices` API to function properly)._

## Tech stack (summary)

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **i18n:** next-intl
- **Data:** TanStack React Query
- **Quality:** ESLint (eslint-config-next), Prettier, Husky, lint-staged

# Frontend Template

Production-ready Next.js frontend template: TypeScript, Tailwind CSS v4,
shadcn/ui, i18next, React Hook Form + Zod, Vitest, Playwright, Biome, CI.

## Quick start

```bash
pnpm install
cp .env.example .env.local   # configure your API URL
pnpm dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm lint` | Biome check (lint + format) |
| `pnpm lint:fix` | Auto-fix lint/format issues |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Unit + component tests (Vitest) |
| `pnpm test:e2e` | Playwright E2E tests |
| `pnpm verify` | Lint + typecheck + test + build |

## Project structure

```text
app/                  # App Router (route groups: (marketing), (app))
components/
  ui/                 # shadcn/ui primitives
  layout/             # AppShell, Header, PageContainer
  navigation/         # LanguageSwitcher, ...
  theme/              # ThemeProvider, ThemeToggle
  feedback/           # Loading / Empty / Error / NotFound / Unauthorized states
features/             # Feature modules (config.ts holds feature flags)
lib/
  api/                # Typed API client + normalized ApiError model
  auth/               # Session + permission abstractions (UX only)
  config/             # env validation (zod), project white-label config
  i18n/               # i18next setup (server + client)
public/locales/       # Translation files (en, zh) by namespace
schemas/              # Shared zod schemas
tests/
  unit/               # Vitest unit tests
  integration/        # React Testing Library component tests
  e2e/                # Playwright journeys
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for boundaries and conventions.

## Starting a new project from this template

1. Clone and rename the project (update `name` in `package.json`).
2. Customize `lib/config/project.ts` (name, locales, navigation, flags).
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL`.
4. Adjust branding/tokens in `app/globals.css` (semantic CSS variables).
5. Connect your external backend via `lib/api/client.ts` (auth token hook:
   `setTokenProvider`).
6. Build features inside `features/`.

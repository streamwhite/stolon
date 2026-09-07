# Architecture

## Core boundary

```text
Frontend (Next.js)  →  Typed API Client (lib/api)  →  External Backend
```

The frontend never contains business logic, databases, or backend services.
There is no `app/api/` — all data comes from an external API.

## Layers

| Layer | Location | Rules |
| --- | --- | --- |
| Routing / pages | `app/` | Route groups `(marketing)` and `(app)`; Server Components by default |
| UI primitives | `components/ui/` | shadcn/ui as generated; no extra abstraction layer |
| Shared UI | `components/{layout,navigation,theme,feedback}/` | Cross-feature reusable components |
| Features | `features/<name>/` | Feature-specific components, hooks, api, schemas |
| API access | `lib/api/` | The **only** place `fetch` is used; errors normalized to `ApiError` |
| Auth | `lib/auth/` | UX-only abstraction; backend enforces security |
| Config | `lib/config/` | Zod-validated env, white-label `project.ts` |
| i18n | `lib/i18n/`, `public/locales/` | Namespaced translations, no hard-coded strings |

## Key decisions

- **API client**: thin fetch wrapper with timeouts, retries on 502/503/504,
  token hook (`setTokenProvider`), and `ApiError` categories
  (`validation`, `unauthenticated`, `forbidden`, `not_found`, `conflict`,
  `rate_limited`, `server`, `network`). UI branches on `category`, never raw payloads.
- **State**: React state by default; Context for theme/i18n/session.
  Add Zustand/TanStack Query only when a project genuinely needs it.
- **i18n**: locale stored in a cookie (`NEXT_LOCALE`), resolved on the server,
  passed into a client `I18nProvider`. Translations are bundled (imported JSON),
  validated by `tests/unit/i18n.test.ts` (key parity across locales).
- **States**: every data screen handles Loading / Empty / Error / Unauthorized /
  Not Found using `components/feedback/*`.
- **Theme**: `next-themes` (light/dark/system), semantic tokens in `globals.css`.
- **Testing**: Vitest + RTL for units/components, Playwright (Chromium, Firefox,
  WebKit) for critical journeys. CI runs lint → typecheck → test → build → E2E.
- **Security**: baseline headers in `next.config.ts`, env separation
  (`NEXT_PUBLIC_*` only for client-safe values), backend stays authoritative.

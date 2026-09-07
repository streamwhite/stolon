# Changelog

All notable changes to this template are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and the project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-09-07

### Added

- Next.js (App Router) + TypeScript + Tailwind CSS v4 foundation
- shadcn/ui component baseline (18 primitives)
- Theme system: light / dark / system (`ThemeProvider`, `ThemeToggle`)
- Typed API client with timeouts, retries, token hook, and normalized
  `ApiError` categories
- Auth + permission abstractions (`can()`, `hasRole()`)
- i18n: i18next with en/zh namespaces, cookie-based locale,
  `LanguageSwitcher`, translation-completeness tests
- Reusable states: Loading / Empty / Error / NotFound / Unauthorized
- Layout primitives: `AppShell`, `Header`, `PageContainer`, `PageHeader`
- Zod env validation (`lib/config/env.ts`) and white-label project config
- Vitest + React Testing Library setup with unit/integration suites
- Playwright E2E smoke journeys (Chromium, Firefox, WebKit)
- GitHub Actions CI pipeline, Biome lint/format, security headers,
  `.env.example`, ARCHITECTURE.md

# Frontend Project Template

## 1. Goal

Build a reusable, production-ready frontend template to significantly reduce the setup time of future projects.

The template provides:

- Production-ready project structure
- Type-safe development
- Consistent UI/UX
- Internationalization
- Form and validation infrastructure
- External Backend API integration
- Authentication-ready architecture
- Error/loading/empty states
- Unit/component/E2E testing
- Linting and formatting
- CI
- Accessibility baseline
- Security baseline
- Common reusable components
- Easy project customization

### Core principle

> The template provides frontend infrastructure, not business logic or backend infrastructure.

The template should **not** contain:

- Business-specific domain models
- Business API endpoints
- Database access
- Backend services
- Next.js API Routes
- Next.js Route Handlers
- Backend authentication implementation
- Business workflows

---

# 2. Recommended Stack

## Core

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Biome

## Testing

- Vitest
- React Testing Library
- Playwright

## Internationalization

- React Intl formatjs

## Forms / Validation

- React Hook Form
- Zod

## Server State

- TanStack Query

Use only when the application has substantial client-side server-state requirements.

## Client State

- React state by default
- Zustand when genuinely necessary

Do not use Redux by default.

## Content

- react-markdown
- rehype-sanitize

## Icons

- Lucide React

## Dates

- date-fns

---

# 3. Framework Strategy

## Next.js only

Next.js is the only application framework.

Use the Next.js App Router.

Recommended:

- App Router
- Server Components where beneficial
- Client Components only where interaction requires them
- layouts
- route groups
- loading states
- error boundaries
- not-found handling
- metadata

### Important architectural boundary

Next.js is the **frontend application**.

The actual backend is an external service:

```text
                    Frontend
                       │
                    Next.js
                       │
          ┌────────────┴────────────┐
          │                         │
   Server Components          Client Components
          │                         │
          └────────────┬────────────┘
                       │
                    API Client
                       │
                       ▼
                 External Backend
                       │
                       ▼
                    Database
```

The frontend template must not become a backend framework.

---

# 4. No Next.js API

Do NOT use:

```text
app/api/
```

Do NOT use:

```text
Route Handlers
```

Do NOT use Next.js API routes as a proxy/backend layer unless a specific project explicitly requires one.

Instead:

```text
Next.js
   │
   ▼
External API
```

Examples:

```text
https://api.example.com
```

or:

```text
https://backend.example.com
```

The backend can be implemented independently using:

- Node.js
- Go
- Rust
- Python
- Java
- .NET
- etc.

This keeps the frontend and backend independently deployable.

---

# 5. Repository Structure

Recommended structure:

```text
.
├── app/
│   ├── (marketing)/
│   ├── (app)/
│   │   ├── dashboard/
│   │   └── settings/
│   ├── error.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── forms/
│   └── feedback/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   └── settings/
│
├── hooks/
│
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── errors.ts
│   │   └── types.ts
│   ├── auth/
│   ├── i18n/
│   ├── validation/
│   ├── config/
│   └── utils/
│
├── schemas/
│
├── types/
│
├── public/
│   └── locales/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .github/
│   └── workflows/
│
├── components.json
├── next.config.ts
├── tsconfig.json
├── biome.json
├── playwright.config.ts
├── vitest.config.ts
├── package.json
└── README.md
```

Notice:

```text
app/api/
```

is intentionally absent.

---

# 6. Feature-Oriented Architecture

Prefer:

```text
features/
  users/
    components/
    hooks/
    api/
    schemas/
    types/
```

over:

```text
components/
hooks/
api/
types/
```

containing hundreds of unrelated files.

Global directories should contain genuinely reusable infrastructure.

Feature-specific code stays inside the feature.

---

# 7. UI Foundation

Use shadcn/ui as the base component system.

Initial components:

### Layout

- Card
- Separator
- Sheet
- Sidebar
- Resizable panels

### Navigation

- Navigation Menu
- Breadcrumb
- Tabs
- Pagination
- Dropdown Menu

### Forms

- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Switch
- Slider
- Date Picker

### Feedback

- Alert
- Dialog
- Alert Dialog
- Sonner
- Tooltip
- Popover

### Data

- Table
- Badge
- Avatar
- Progress

### Loading

- Skeleton

Do not build another abstraction layer over every shadcn component.

Use shadcn primitives directly unless the application has a real reusable abstraction.

---

# 8. Design System

use shadcn defaults. but make sure it is convinent to customize if needed.
The following should be easy to change:

---

# 9. Theme

Support:

- Light
- Dark
- System

Provide:

```text
ThemeProvider
ThemeToggle
```

Use semantic design tokens rather than hard-coded theme-specific colors.

---

# 10. Internationalization

i18n is included from the beginning.

Structure:

```text
public/
  locales/
    en/
      common.json
      navigation.json
      validation.json
      errors.json
    zh/
      common.json
      navigation.json
      validation.json
      errors.json
```

Use namespaces.

Rules:

- No hard-coded user-facing strings
- Semantic translation keys
- Interpolation
- Pluralization
- Fallback language
- Missing-key detection
- Translation validation

---

# 11. Routing

Use Next.js App Router.

Use:

```text
route groups
layouts
loading.tsx
error.tsx
not-found.tsx
```

Example:

```text
app/
  (marketing)/
    page.tsx

  (app)/
    dashboard/
      page.tsx

    settings/
      page.tsx
```

Route groups should organize the application without unnecessarily affecting URLs.

---

# 12. Backend Integration

The frontend communicates with an external backend.

Create:

```text
lib/api/
  client.ts
  errors.ts
  types.ts
```

Responsibilities:

- API base URL
- authentication
- request headers
- request timeout
- JSON serialization
- error normalization
- request IDs
- retry policy where appropriate

Example:

```text
React / Next.js
       │
       ▼
API Client
       │
       ▼
External Backend
```

Do not scatter raw:

```text
fetch(...)
```

throughout UI components.

---

# 13. API Client

Provide a small typed API client.

Example conceptual interface:

```text
api.get()
api.post()
api.put()
api.patch()
api.delete()
```

Centralize:

```text
authentication
headers
serialization
error handling
timeouts
```

The API client should remain thin.

Do not turn it into a second application framework.

---

# 14. API Error Model

Normalize backend errors:

```text
ApiError
  status
  code
  message
  details
```

Frontend should distinguish:

```text
400 → validation
401 → unauthenticated
403 → forbidden
404 → not found
409 → conflict
422 → validation/domain error
429 → rate limited
5xx → server error
network → connectivity
```

This allows consistent UI behavior regardless of the backend implementation.

---

# 15. Authentication

Do not hard-code an authentication provider.

Define an abstraction:

```text
lib/auth/
  types.ts
  session.ts
  permissions.ts
```

Concepts:

```text
User
Session
Role
Permission
```

Example:

```text
isAuthenticated()
hasRole()
hasPermission()
```

The backend remains the authoritative source for authentication and authorization.

The frontend may:

- display authenticated state
- protect UI routes
- redirect unauthenticated users
- hide unavailable actions

But:

> Frontend authorization is UX, not a security boundary.

The backend must enforce permissions.

---

# 16. Authorization

Separate:

```text
Authentication
```

from:

```text
Authorization
```

Define permissions explicitly:

```text
users.read
users.create
users.update
users.delete
```

Avoid scattering arbitrary permission logic throughout components.

Prefer:

```text
can("users.delete")
```

or an equivalent centralized abstraction.

---

# 17. Data Fetching

Use a simple decision tree.

### Server-rendered data

If data can naturally be obtained during server rendering:

```text
Server Component
       ↓
External API
```

This can reduce unnecessary client-side JavaScript.

### Interactive server state

Use TanStack Query when the UI needs:

- pagination
- polling
- infinite queries
- optimistic updates
- cache invalidation
- client-side mutations
- frequent refetching

Do not put server data into Zustand.

---

# 18. Client State

Default:

```text
React state
```

Use Context for genuinely global concerns:

```text
theme
i18n
session
```

Use Zustand when there is meaningful cross-component client state.

Examples:

```text
complex editor
multi-step workflow
global UI state
client-side preferences
```

Avoid creating a global store simply because the project might need one later.

---

# 19. Forms

Standardize on:

```text
React Hook Form
+
Zod
+
shadcn/ui
```

Architecture:

```text
Zod schema
      ↓
React Hook Form
      ↓
UI validation
      ↓
API mutation
      ↓
success/error state
```

Prefer schema-based validation over duplicated validation rules.

---

# 20. Loading / Error / Empty States

Every data-driven screen should explicitly handle:

```text
Loading
Success
Empty
Error
Unauthorized
Not Found
```

Create reusable:

```text
LoadingState
EmptyState
ErrorState
UnauthorizedState
NotFoundState
```

This is one of the highest-value parts of the template.

---

# 21. Markdown

Use:

```text
react-markdown
rehype-sanitize
```

Support:

- headings
- lists
- links
- tables
- code blocks
- blockquotes
- GitHub-flavored Markdown

Never treat external Markdown as trusted HTML.

---

# 22. Accessibility

Accessibility is part of the component baseline.

Require:

- semantic HTML
- keyboard navigation
- visible focus
- accessible labels
- accessible dialogs
- accessible forms
- sufficient contrast
- screen-reader-friendly feedback
- no keyboard traps

Prefer accessible primitives rather than implementing complex interaction behavior from scratch.

---

# 23. Responsive Design

Mobile-first.

At minimum test:

```text
mobile
tablet
desktop
wide desktop
```

Prefer CSS/Tailwind responsive behavior.

Avoid JavaScript viewport detection unless genuinely required.

---

# 24. Testing Strategy

Use three layers.

## Unit

Vitest.

Test:

- utilities
- validation
- transformations
- pure business rules

## Component / Integration

React Testing Library.

Test:

- user interaction
- forms
- states
- error handling
- accessibility behavior

Avoid testing implementation details.

## E2E

Playwright.

Test critical user journeys:

```text
authentication
main workflow
CRUD
important forms
critical navigation
logout
```

Do not E2E-test every component.

---

# 25. Playwright

Use Playwright for browser-level testing.

Baseline browsers:

```text
Chromium
Firefox
WebKit
```

Local development can primarily use Chromium.

Prefer:

```text
getByRole()
getByLabel()
getByText()
getByTestId()
```

Avoid fragile selectors based on:

```text
CSS classes
DOM structure
XPath
implementation details
```

---

# 26. Test Data

E2E tests must not depend on mutable production data.

Use:

```text
fixtures
seed data
API mocking where appropriate
dedicated test environment
```

Tests should be:

- isolated
- repeatable
- deterministic

---

# 27. TypeScript

Use strict TypeScript:

```text
strict: true
```

Avoid:

```text
any
```

Prefer:

```text
unknown
```

and narrow types.

API responses should have explicit types.

Where practical, derive frontend types from a backend contract rather than manually duplicating them.

---

# 28. API Contract

This is particularly important because the backend is external.

Preferred options:

### Option A — OpenAPI

Backend publishes:

```text
openapi.json
```

The frontend should not become the source of truth for backend behavior.

---

# 29. Environment Variables

Centralize environment configuration:

```text
lib/config/env.ts
```

Separate:

```text
server-only
client-safe
```

variables.

Example:

```text
NEXT_PUBLIC_API_URL
```

may be public.

Secrets must never use:

```text
NEXT_PUBLIC_*
```

Never put backend secrets into the frontend bundle.

---

# 30. Security Baseline

Include:

- XSS-safe rendering
- sanitized Markdown
- dependency auditing
- no secrets in Git
- environment separation
- secure authentication handling
- secure cookies where applicable
- CSP/security headers where appropriate
- backend authorization
- safe external API handling

Important:

```text
Frontend security
      ≠
Backend security
```

The backend remains responsible for enforcing security-sensitive operations.

---

# 31. Error Handling

Provide:

```text
error.tsx
global error handling
API error normalization
user-friendly error messages
developer logging
```

Never expose:

```text
stack traces
database errors
internal service information
```

to users.

---

# 32. Observability

Keep integration points for:

- OpenTelemetry
- analytics
- structured logging

Do not force a vendor into the base template.

A future project should be able to add:

```text
observability provider
```

without restructuring the application.

---

# 33. SEO

ignore this part for now.
For public-facing pages:

- metadata
- title
- description
- Open Graph
- canonical URL
- sitemap
- robots.txt
- favicon
- manifest where appropriate

For authenticated applications/dashboards:

```text
SEO
```

should not become a major concern.

---

# 34. Performance

Default principles:

- Server Components where useful
- minimize Client Components
- minimize JavaScript shipped to browser
- lazy-load expensive features
- optimize images
- avoid unnecessary dependencies
- avoid unnecessary global state
- virtualize very large lists
- cache appropriately

Do not introduce complex performance infrastructure before measuring a real problem.

---

# 35. Common Reusable Components

Build these once:

```text
AppShell
Header
Sidebar
MobileNavigation
Breadcrumbs

PageHeader
PageContainer

LoadingState
EmptyState
ErrorState
NotFoundState
UnauthorizedState

ConfirmDialog
DeleteDialog

SearchInput
DataTable
Pagination
FilterBar

FormField
FormError
SubmitButton

CommandMenu
ThemeToggle
LanguageSwitcher

Toast
Tooltip
CopyButton

Avatar
UserMenu
```

Prioritize high-frequency components over decorative components.

---

# 36. Common Application Patterns

## List

```text
Search
Filter
Sort
Pagination
Loading
Empty
Error
```

## Detail

```text
Header
Metadata
Actions
Tabs
Related data
```

## Create/Edit

```text
Form
Validation
Loading
Success
Error
Unsaved changes
```

## Delete

```text
Confirmation
Loading
Success
Error
```

## Dashboard

```text
Stats
Charts
Tables
Filters
Date range
Loading
Empty
Error
```

These examples should demonstrate the preferred architecture without containing real business logic.

---

# 37. URL State

For searchable/filterable pages, use URL state where appropriate:

```text
?page=2
&search=foo
&status=active
&sort=createdAt
```

Benefits:

- shareable URLs
- browser history
- refresh persistence
- navigation consistency

Do not store everything in React state.

---

# 38. Dependency Policy

The template should remain intentionally small.

Every dependency should answer:

> Does this solve a recurring problem across most of our projects?

### Core

```text
next
react
typescript
tailwindcss
shadcn/ui
biome
```

### Common

```text
i18next
react-i18next
react-hook-form
zod
vitest
@testing-library/react
playwright
react-markdown
date-fns
```

### Conditional

```text
@tanstack/react-query
zustand
remark-gfm
rehype-sanitize
```

Do not install conditional dependencies automatically unless the template's projects consistently need them.

---

# 39. Versioning

Treat the template as an internal product.

Use:

```text
Git
semantic versioning
CHANGELOG.md
release tags
```

Example:

```text
v1.0.0
v1.1.0
v1.2.0
v2.0.0
```

Maintain migration instructions for breaking changes.

---

# 40. Project Initialization

Ideal workflow:

```text
clone template
      ↓
rename project
      ↓
configure project.ts
      ↓
configure environment
      ↓
configure branding
      ↓
configure i18n
      ↓
configure API URL
      ↓
connect external backend
      ↓
start implementing features
```

Target:

> A new project should be ready for meaningful feature development within 30–60 minutes.

---

# 41. Central Project Configuration

Provide:

```text
src/config/project.ts
```

Example:

```text
name
description
logo
defaultLocale
supportedLocales
navigation
featureFlags
```

The purpose is to make white-label customization easy.

---

# 42. Feature Flags

Provide a lightweight local abstraction:

```text
features/
  config.ts
```

Support:

```text
feature enabled
feature disabled
```

Do not add a remote feature-flag service by default.

---

# 43. CI

Recommended GitHub Actions pipeline:

```text
install
   ↓
format check
   ↓
lint
   ↓
typecheck
   ↓
unit/component tests
   ↓
build
   ↓
E2E
```

Fast checks should run on every PR.

Cross-browser E2E can be configured according to project requirements.

---

# 44. Git Hooks

Optional:

```text
pre-commit
pre-push
```

Use hooks for fast checks.

Do not run the entire E2E suite on every commit.

CI remains the authoritative quality gate.

---

# 45. Documentation

Include:

```text
ARCHITECTURE.md
CHANGELOG.md
.env.example
```

---

# 47. Things NOT Included

Do not include by default:

- Vite
- Next.js API Routes
- Next.js Route Handlers
- Database
- ORM
- GraphQL
- Redux
- WebSockets
- Web Workers
- IndexedDB
- PWA
- Stripe
- CMS
- Analytics vendor
- Sentry vendor
- Specific auth provider
- Specific backend framework
- Complex RBAC implementation
- Micro-frontends

The frontend template should remain a **frontend template**.

---

---

# 49. Implementation Phases

## Phase 1 — Foundation

Build:

```text
Next.js
TypeScript
Tailwind
shadcn/ui
Biome
```

Deliver:

```text
project structure
theme
design tokens
basic layout
routing
```

---

## Phase 2 — Common UI

Build:

```text
navigation
forms
dialogs
tables
pagination
loading
empty
error
toast
command menu
```

---

## Phase 3 — Backend Integration

Build:

```text
API client
API error model
environment validation
API types
authentication abstraction
authorization abstraction
```

Important:

```text
No app/api/
No Route Handlers
No database
```

---

## Phase 4 — i18n

Build:

```text
language detection
language switcher
translation structure
fallback
namespaces
translation validation
```

---

## Phase 5 — Testing

Build:

```text
Vitest
React Testing Library
Playwright
fixtures
test utilities
CI
```

---

## Phase 6 — Production Hardening

Add:

```text
security headers
error handling
observability integration
SEO defaults
performance baseline
accessibility checks
dependency auditing
```

---

# 50. Definition of Done

The template is ready when a new project immediately provides:

## UI

- responsive layout
- dark mode
- accessible components
- forms
- dialogs
- tables
- navigation
- notifications

## Application

- routing
- external API client
- authentication integration point
- authorization integration point
- error handling
- loading states
- empty states
- not-found handling

## Developer Experience

- TypeScript
- Biome
- type checking
- fast local development
- clear project structure

## Testing

- unit tests
- component tests
- E2E tests
- CI

## Production

- environment validation
- security baseline
- SEO baseline
- performance baseline
- observability integration point

---

# 51. Final Architecture

```text
                         Frontend Template
                                │
                           Next.js
                                │
                 ┌──────────────┴──────────────┐
                 │                             │
          Server Components             Client Components
                 │                             │
                 └──────────────┬──────────────┘
                                │
                         Feature Modules
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
       UI                     API                    State
        │                       │                       │
   shadcn/ui              API Client              React State
   Tailwind                     │                 Zustand*
                              │
                              ▼
                       External Backend
                              │
                              ▼
                           Database


* only when necessary


                    Cross-cutting Infrastructure
                              │
       ┌──────────────┬───────┼────────┬──────────────┐
       │              │       │        │              │
      i18n          Forms   Testing  Errors       Config
       │              │       │        │              │
   i18next          RHF    Vitest   API Error      env
                  + Zod    RTL       Model        project
                           Playwright
```

---

# 53. Core Engineering Philosophy

The template should be:

```text
Opinionated
     +
Simple
     +
Replaceable
     +
Production-tested
```

Be opinionated about:

```text
project structure
TypeScript
formatting
testing
UI primitives
API access
error handling
i18n
accessibility
```

Be replaceable about:

```text
authentication provider
backend
database
analytics
observability
state management
deployment platform
```

The most important architectural boundary is:

```text
              FRONTEND
                 │
              Next.js
                 │
          Typed API Client
                 │
════════════════════════════════
              BACKEND
                 │
              Services
                 │
              Database
```

**Do not let the reusable frontend template gradually turn into a monolith.**

The goal is that when starting a new project, you mostly replace the **feature layer**, while the engineering foundation remains stable.

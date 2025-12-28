# Codename Delorean

A full-stack TypeScript monorepo for building modern web applications
with React 19, tRPC, and Cloudflare Workers.

## Technology Stack

**Core Runtime & Platform**

- [Bun](https://bun.sh/) — JavaScript runtime and package manager
- [Cloudflare Workers](https://workers.cloudflare.com/) — Edge computing

**Frontend & UI**

- [React 19](https://react.dev/) — UI framework
- [TanStack Router](https://tanstack.com/router) — Type-safe routing
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) — Component library
- [Jotai](https://jotai.org/) — Atomic state management
- [Astro](https://astro.build/) — Static site generator

**Backend & API**

- [Hono](https://hono.dev/) — Web framework for the edge
- [tRPC](https://trpc.io/) — End-to-end type-safe APIs
- [Better Auth](https://www.better-auth.com/) — Authentication

**Database & ORM**

- [Drizzle ORM](https://orm.drizzle.team/) — TypeScript ORM
- [Neon PostgreSQL](https://neon.tech/) — Serverless PostgreSQL

**Development Tools**

- [Vite](https://vitejs.dev/) — Frontend tooling
- [Vitest](https://vitest.dev/) — Unit testing
- [TypeScript](https://www.typescriptlang.org/) — Type checking
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## Monorepo Structure

- [`apps/app/`](./apps/app) — React 19 application
- [`apps/web/`](./apps/web) — Astro marketing website
- [`apps/api/`](./apps/api) — tRPC API server (Hono + Workers)
- [`apps/email/`](./apps/email) — React Email templates
- [`packages/core/`](./packages/core) — Shared types and utilities
- [`packages/ui/`](./packages/ui) — Shared UI components
- [`packages/ws-protocol/`](./packages/ws-protocol) — WebSocket protocol
- [`db/`](./db) — Database schemas and migrations
- [`docs/`](./docs) — VitePress documentation
- [`infra/`](./infra) — Terraform configurations

## Prerequisites

- [Bun](https://bun.sh/) v1.3+
- [VS Code](https://code.visualstudio.com/) (recommended)
- [Cloudflare account](https://dash.cloudflare.com/sign-up)

## Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment

Update environment variables in `.env` and `.env.local` files,
and Wrangler config in `apps/api/wrangler.jsonc`.

### 3. Start Development

```bash
# Launch all apps
bun dev

# Or start specific apps
bun --filter @repo/web dev  # Marketing site
bun --filter @repo/app dev  # Main application
bun --filter @repo/api dev  # API server
```

### 4. Initialize Database

```bash
# Apply migrations
bun --filter @repo/db migrate

# Quick dev setup (pushes schema directly)
bun --filter @repo/db push

# Seed with sample data (optional)
bun --filter @repo/db seed

# Open database GUI
bun --filter @repo/db studio
```

**Note:** Ensure `DATABASE_URL` is configured in `.env.local` first.

**Ports:**

- React app: <http://localhost:5173>
- Marketing site: <http://localhost:4321>
- API: <http://localhost:8787>

## Production Deployment

### 1. Configure Secrets

```bash
# Required
bun wrangler secret put BETTER_AUTH_SECRET

# OAuth providers (as needed)
bun wrangler secret put GOOGLE_CLIENT_ID
bun wrangler secret put GOOGLE_CLIENT_SECRET

# Email service
bun wrangler secret put RESEND_API_KEY

# AI features (optional)
bun wrangler secret put OPENAI_API_KEY
```

### 2. Build and Deploy

```bash
# Build packages (order matters!)
bun email:build
bun web:build
bun app:build

# Deploy
bun web:deploy
bun api:deploy
bun app:deploy
```

## License

MIT License. See [LICENSE](./LICENSE) for details.

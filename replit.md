# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the Aluta Technology Ventures company website.

## Artifacts

- **aluta-website** — Company website for Aluta Technology Ventures Limited (react-vite, preview path: `/`)

## Products Showcased

- TokShopLive (tokshoplive.com) — Live commerce platform
- PointifyPOS (pointifypos.com) — Point-of-sale system
- BankyKit (bankykit.com) — Fintech toolkit
- Pro-Suite (pro-suite.co) — Business productivity suite

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

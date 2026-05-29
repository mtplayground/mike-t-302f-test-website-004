# mike-t-302f-test-website-004

## Current State

mike-t-302f-test-website-004 is a Next.js App Router landing page for an
autonomous software delivery offer to founders. It has a complete marketing
page, PostgreSQL persistence via Prisma, and a server action for validated lead
submissions.

## What It Does

- Serves a responsive landing page at `/`.
- Presents a hero with the headline "Agent Team for Founders", supporting
  product sections, and a closing CTA.
- Explains the autonomous SDLC: plan, build, deploy, and operate.
- Explains GitHub-native code ownership and reviewable delivery.
- Defines a `Lead` data model with `name`, `email`, optional `message`, and
  `createdAt`.
- Provides a typed lead submission server action that validates form input and
  persists valid leads to PostgreSQL.
- Builds as a self-hosted Next.js standalone file tree.

## Architecture

- Next.js App Router files live under `app/`.
- Shared layout primitives live under `components/layout/`.
- Marketing sections live under `components/marketing/`.
- UI primitives live under `components/ui/`.
- Shared utilities and server-side helpers live under `lib/`.
- Prisma schema and migrations live under `prisma/`.
- Static assets live under `public/`, including the generated hero image.
- The app uses Tailwind CSS, ESLint, Prettier, TypeScript, Prisma, and
  PostgreSQL.

## Key Decisions

- PostgreSQL is the only persistent datastore.
- Prisma uses the native Prisma 6 client runtime with `DATABASE_URL` from the
  environment.
- Local environment files are ignored; `.env.example` documents required
  variables.
- Self-hosted builds use Next standalone output plus
  `scripts/prepare-standalone.mjs` to copy public/static assets and remove
  local env files from the deployable tree.
- Runtime server binds to `0.0.0.0:8080`.

## Conventions

- Use TypeScript for application code.
- Keep reusable UI out of route files.
- Use server-side validation before writing persistent data.
- Run `npm run lint`, `npm run format:check`, `npm run typecheck`, and
  `npm run build` before merging code changes.
- Use `npm run build:self-hosted` to verify standalone deployment output.

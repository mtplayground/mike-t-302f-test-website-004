# mike-t-302f-test-website-004

## Current State

mike-t-302f-test-website-004 is a self-hosted Next.js App Router landing page
for an autonomous software delivery offer to founders. It includes a polished
marketing page, lead capture, PostgreSQL persistence, spam safeguards, Resend
email notification, SEO metadata, sitemap/robots output, and automated tests.

## What It Does

- Serves a responsive landing page at `/`.
- Presents the offer with the hero headline "Agent Team for Founders" and the
  tagline "You just talk, we handle the rest".
- Explains founder-focused value, GitHub-native reviewability, and the
  autonomous SDLC: plan, build, deploy, and operate.
- Provides an accessible client-side lead capture form with validation,
  pending, success, field-error, and form-error states.
- Validates submissions again on the server before writing to PostgreSQL.
- Reduces spam with a honeypot field and simple rate limiting.
- Persists leads with Prisma using a `Lead` model containing `name`, `email`,
  optional `message`, and `createdAt`.
- Sends a Resend notification email to the configured recipient after a lead is
  saved.
- Publishes page metadata, Open Graph/Twitter tags, `/sitemap.xml`, and
  `/robots.txt`.
- Builds as a self-hosted Next.js standalone file tree.

## Architecture

- Next.js App Router files live under `app/`.
- Shared layout primitives live under `components/layout/`.
- Marketing sections live under `components/marketing/`.
- The lead form lives under `components/lead/`.
- UI primitives live under `components/ui/`.
- Shared utilities, validation, environment access, email delivery, spam
  checks, and database helpers live under `lib/`.
- Prisma schema and migrations live under `prisma/`.
- Static assets live under `public/`, including the generated hero/social image.
- Unit tests use Vitest; E2E coverage uses Playwright with a gated full lead
  submission path.

## Key Decisions

- PostgreSQL is the only persistent datastore.
- Prisma uses the native Prisma 6 client runtime with `DATABASE_URL` from the
  environment.
- Resend is the email provider; runtime configuration uses `EMAIL_API_KEY`,
  `NOTIFICATION_RECIPIENT`, and `NOTIFICATION_SENDER`.
- Site URL configuration uses `NEXT_PUBLIC_SITE_URL` for metadata, sitemap, and
  robots output.
- Server actions handle lead submission so validation, persistence, spam
  checks, and notification dispatch stay server-side.
- Notification failures are logged but do not turn an already-saved lead into a
  failed user submission.
- Local environment files are ignored; `.env.example` documents required
  variables.
- Self-hosted builds use Next standalone output plus
  `scripts/prepare-standalone.mjs` to copy public/static assets and remove
  local env files from the deployable tree.
- Runtime server binds to `0.0.0.0:8080`.

## Conventions

- Use TypeScript for application code.
- Keep reusable UI out of route files.
- Keep server-only behavior in server actions or `lib/` server helpers.
- Use shared validation types for the lead form and server action.
- Preserve accessible form labels, error associations, focus behavior, and live
  success/error messages.
- Run `npm run format:check`, `npm run lint`, `npm test`,
  `npm run typecheck`, and `npm run build` before merging code changes.
- Use `npm run build:self-hosted` to verify standalone deployment output.

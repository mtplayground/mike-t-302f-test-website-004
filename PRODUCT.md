# mike-t-302f-test-website-004

## Current State

mike-t-302f-test-website-004 is a minimal Next.js application initialized with the App Router and TypeScript. It currently provides a baseline homepage and root layout for future website work.

## What It Does

- Serves a single App Router page at `/`.
- Defines a root HTML layout with project metadata.
- Applies global CSS for the initial page shell and responsive typography.
- Includes a tracked `public/` directory for future static assets.

## Architecture

- Next.js App Router files live under `app/`.
- TypeScript is enabled with strict compiler settings.
- Root configuration lives in `package.json`, `next.config.ts`, `tsconfig.json`, and `next-env.d.ts`.
- Static assets belong in `public/`.

## Conventions

- Use TypeScript for application code.
- Keep route UI in `app/` unless shared modules are introduced by future work.
- Run the app with `npm run dev`; the dev server binds to `0.0.0.0:8080`.
- Validate changes with `npm run build` and `npm run typecheck`.

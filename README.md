# mike-t-302f-test-website-004

test-website-004

## Environment

Required server environment variables are documented in `.env.example`:

- `DATABASE_URL`: PostgreSQL connection string used by Prisma.
- `EMAIL_API_KEY`: Resend API key used by lead notifications.
- `NOTIFICATION_RECIPIENT`: email address that receives lead notifications.
- `NOTIFICATION_SENDER`: verified sender address configured in Resend.
- `NEXT_PUBLIC_SITE_URL`: public canonical URL used by metadata, Open Graph,
  Twitter cards, sitemap, and robots output.

Real environment files are ignored by git.

## Accessibility and lead form checklist

The app shell includes keyboard focus styles and a skip link to the main
content. Before shipping lead form changes, verify:

- Every input has a visible label connected with `htmlFor`/`id`.
- Field errors are connected with `aria-describedby` and invalid fields set
  `aria-invalid`.
- Form-level errors and success messages use an appropriate live region.
- The submit button exposes pending/disabled state without relying on color
  alone.
- Keyboard focus remains predictable after success, validation failure, and
  persistence failure.

## Self-hosted build

Deployment checklist:

- Set `DATABASE_URL` to the PostgreSQL connection string in the runtime
  environment.
- Set `EMAIL_API_KEY`, `NOTIFICATION_RECIPIENT`, and
  `NOTIFICATION_SENDER` before enabling lead notification delivery. The sender
  must be verified in Resend.
- Set `NEXT_PUBLIC_SITE_URL` to the public origin, for example
  `https://example.com`, so metadata, sitemap, and robots URLs are absolute.
- Run database migrations before starting a new deployment:

```bash
npm run db:migrate
```

Build the standalone file tree:

```bash
npm run build:self-hosted
```

Run the generated server on `0.0.0.0:8080`:

```bash
npm run start:self-hosted
```

The self-hosted runtime entrypoint is `.next/standalone/server.js`.
Runtime secrets should be provided by the host environment; local env files are
removed from the prepared standalone directory.

Recommended pre-deploy verification:

```bash
npm run format:check
npm run lint
npm test
npm run typecheck
npm run build:self-hosted
```

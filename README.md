# mike-t-302f-test-website-004

test-website-004

## Environment

Required server environment variables are documented in `.env.example`:

- `DATABASE_URL`: PostgreSQL connection string used by Prisma.
- `EMAIL_API_KEY`: API key for the email provider used by lead notifications.
- `NOTIFICATION_RECIPIENT`: email address that receives lead notifications.

Real environment files are ignored by git.

## Self-hosted build

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

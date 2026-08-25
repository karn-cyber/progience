# Progience P0 Website

Production-oriented implementation of the Progience Technology Capability Partner website.

## Included

- Next.js 16 App Router public site with the complete P0 information architecture
- Payload 3 editorial admin and REST API using the isolated `cms` PostgreSQL schema
- Drizzle-managed `app` schema for enquiries, consent, retries, candidates and subscriptions
- Evidence-gated content model with claim ownership, E0 to E4 levels, approvals and expiry
- Accessible desktop mega navigation and equivalent mobile accordion navigation
- Server-validated, rate-limited, idempotent contact form with Turnstile and Resend retry handling
- Self-hosted brand fonts, responsive visual system, structured data, sitemap, robots and security headers

## Local development

1. Copy `.env.example` to `.env.local` and add development credentials.
2. Install dependencies with `npm install`.
3. Start the site with `npm run dev`.
4. Open `http://localhost:3000`; Payload administration is at `/admin`.

The public site can run without a database for design/content preview. Form submission and Payload require PostgreSQL.

## Verification

- `npm run lint`
- `npm test`
- `npm run build`
- `npm run db:generate`
- `npm run db:migrate` with `DATABASE_URL_UNPOOLED` set for the target environment

Production publication remains gated on approved evidence, privacy/legal wording, routing owners, retention values and external service credentials.

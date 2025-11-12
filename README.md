This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

DJDJDJDJDJDJDJDJDJDJDJDJDJJDJDJDJDJDJDJDJDJDJDJDJDJDJDJDJDJDJDJDJ

## Local environment files

This project relies on a few local files that are not checked into source control. Follow these steps to create them.

### 1) Create a `.env.local`

Create a file called `.env.local` in the project root (next to `package.json`). It should contain any environment variables the app expects. Example values (replace with your real values):

```
# Sanity (public)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity (server/API tokens)
SANITY_API_READ_TOKEN=your-sanity-read-token

# NextAuth
NEXTAUTH_SECRET=some-long-random-string
NEXTAUTH_URL=http://localhost:3000

# Admin credentials used by local simple auth (do NOT commit these)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_PLAINTEXT=changeme

# Optional / third-party keys (example)
# RESEND_API_KEY=your-resend-key
```

Notes:
- Never commit `.env.local` to git. It contains secrets.
- Replace placeholder values with the production values or tokens you create in Sanity and other services.

### 2) Add `next-env.d.ts` (TypeScript projects)

If you don't already have a `next-env.d.ts` file at the repo root, create one with the following content:

```ts
// This file should not be edited manually — it ensures Next.js types are available.
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: the global `next` types are automatically included by Next.js
```

This file is usually generated automatically by Next when you first run the TypeScript build/dev server, but creating it manually is fine. Do not delete it.

## Sanity Studio — create and connect

This project uses Sanity for content. The repo contains a `sanity` folder (Studio schema and CLI config). To create a Sanity project and connect it to this app:

1. Create a Sanity account: https://www.sanity.io/
2. Install or use the Sanity CLI locally (optional):

```bash
# using npx (no global install required)
npx @sanity/cli login
npx @sanity/cli init
```

3. When initializing or from the Sanity management UI, create a project and dataset (commonly `production`). Note your Project ID and Dataset name.

4. In Sanity's management console, create an API token for the dataset (or for the project) with the appropriate permissions (Reader/Editor) and copy it.

5. Add the relevant values to your local `.env.local` (see above) — at minimum:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-sanity-read-token
```

6. From the `sanity/` folder you can run the Studio locally (if your repo's Studio is configured):

```bash
cd sanity
npx sanity start
```

7. When deploying to Vercel (or any host), make sure to set the same environment variables in the project settings so the deployed app can read Sanity data.

## Vercel — create account & connect repository

Vercel is the recommended host for Next.js apps. To connect and deploy this project:

1. Create a Vercel account at https://vercel.com/ and connect your GitHub account (or import from GitLab/Bitbucket).
2. Import this repository into Vercel (use `main` as the production branch unless you prefer otherwise).
3. In the Vercel Project Settings > Environment Variables, add the same variables you have in `.env.local` (use Production values or create separate staging/prod values):

```
NEXT_PUBLIC_SANITY_PROJECT_ID   (value)
NEXT_PUBLIC_SANITY_DATASET      (value)
SANITY_API_READ_TOKEN           (value)  # secret
NEXTAUTH_SECRET                 (value)  # secret
NEXTAUTH_URL                    https://your-deployed-domain.vercel.app
```

4. Vercel will build and deploy your app automatically on push. If your Sanity Studio is served separately, deploy that Studio to a chosen host or use Sanity's hosted Studio option.

## Quick verification

- Start the Next dev server:

```bash
npm run dev
# or pnpm dev
```

- Visit: http://localhost:3000 and confirm the site loads and can fetch content from Sanity.
- Run the Sanity Studio locally (if you wish to edit content):

```bash
cd sanity
npx sanity start
```

If you see errors related to missing environment variables, re-check the names you used in `.env.local` and the Vercel dashboard.

---

If you'd like, I can also add a small `.env.example` file (without secrets) to the repo to help other contributors. Would you like me to add that now?

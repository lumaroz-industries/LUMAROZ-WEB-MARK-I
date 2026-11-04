## Demo preview

**Live preview:** `https://YOUR-PROJECT.pages.dev`

> Replace `YOUR-PROJECT` with the actual Cloudflare Pages project subdomain after the first successful deployment. This is a placeholder, not a live demo URL yet.

# LUMAROZ INDUSTRIES — Official Website

Multi-page corporate website for Lumaroz Industries Pvt. Ltd.

## Pages
- / — Home
- /intelligence — Lumaroz Intelligence
- /software — Software
- /hardware — Hardware
- /store — Product directions (concepts, not live inventory)
- /research — Research & development
- /about — Company
- /contact — Contact form
- Newsletter signup in the shared footer

REN / JARVIS remain personal projects and are intentionally not presented as public Lumaroz products or divisions.

## Stack
React, Vite, React Router, Three.js, Cloudflare Pages Functions and Supabase Postgres.
Vercel-compatible API handlers are also retained under `api/`.

## Local frontend
```bash
npm install
npm run dev
```
Vite runs at http://localhost:4173. Cloudflare Pages Functions can be tested locally with Wrangler after installing the Wrangler CLI.

## Cloudflare Pages deployment
1. Push/merge this branch to the GitHub default branch.
2. In Cloudflare Dashboard, open Workers & Pages → Create → Pages → Connect to Git.
3. Select `lumaroz-industries/LUMAROZ-WEB-MARK-I` and the production branch.
4. Framework preset: Vite. Build command: `npm run build`. Build output directory: `dist`.
5. Add the following as encrypted production environment variables in Pages project settings:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Deploy. Cloudflare will build the Vite site and deploy the `functions/api/` handlers.
7. Test all routes, contact submissions and newsletter subscriptions.

The site will first be available at a Cloudflare-provided `*.pages.dev` address. A custom domain can be connected later; domain registration itself generally costs money.

## Supabase backend
1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL Editor.
3. Copy the project URL and service-role key into Cloudflare Pages environment variables.
4. Never expose the service-role key in browser code, prefix it with `VITE_`, or commit a real secret.

The database tables have RLS enabled and no public policies. Writes are performed by serverless functions.

## Free-plan notes
Cloudflare Pages provides a free tier for static site hosting. Pages Functions use the Workers Free allowance (currently 100,000 requests/day and 10 ms CPU per invocation). Check current limits before launch. Supabase Free has quotas and can pause inactive projects.

## Launch checklist
- Connect the production domain if one is purchased.
- Set up a verified company email and delivery workflow.
- Add verified registered-office address, CIN/GST information and privacy policy.
- Add production-grade rate limiting / spam protection.
- Confirm products, stock, pricing, shipping, returns and payments before enabling checkout. The current Store page deliberately labels entries as concepts.
- Run production build, mobile, accessibility and form-submission checks after deployment.

## Positioning
Lumaroz Industries first. Public divisions: Intelligence, Software, Hardware and Store. Research and product directions are clearly distinguished from released products.

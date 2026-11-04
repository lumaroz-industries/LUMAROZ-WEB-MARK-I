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
React, Vite, React Router, Three.js, Vercel serverless functions and Supabase Postgres.

## Local frontend
```bash
npm install
npm run dev
```
Vite runs at http://localhost:4173. For local API testing, link the project to Vercel and run `vercel dev`.

## Supabase backend
1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL Editor.
3. Add these environment variables in Vercel:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
4. Redeploy. Never expose the service-role key in frontend code or commit it.

The database tables have RLS enabled and no public policies. Writes are made only by the serverless endpoints.

## Vercel deployment
Import this repository, select Vite, use `npm run build` and output directory `dist`. Add the Supabase environment variables and deploy.

## Launch checklist
- Connect and verify the production domain.
- Set up a verified company email and delivery workflow.
- Add verified registered-office address, CIN/GST information and privacy policy.
- Add production-grade rate limiting / spam protection.
- Confirm products, stock, pricing, shipping, returns and payments before enabling checkout. The current Store page deliberately labels entries as concepts.
- Run a production build, mobile, accessibility and form-submission checks after deployment.

## Positioning
Lumaroz Industries first. Public divisions: Intelligence, Software, Hardware and Store. Research and product directions are clearly distinguished from released products.

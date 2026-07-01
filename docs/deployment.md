# Papai Since 1933 AI OS — Vercel Deployment Guide

This guide explains how to deploy the Papai AI OS dashboard to Vercel with optional Supabase persistence.

## Quick Start: Deploy to Vercel

### Option 1: Via Vercel CLI (Recommended for first-time setup)

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. From the project root, run:

```bash
vercel
```

3. Follow the prompts:
   - Link to an existing Vercel project or create a new one
   - Select the project directory
   - Accept default build settings (Next.js will be auto-detected)

4. After deployment, Vercel will show your live URL.

### Option 2: Via GitHub (Recommended for continuous deployment)

1. Push this repo to GitHub (if not already there):

```bash
git remote add origin https://github.com/YOUR-ORG/papai-since1933-ai-os.git
git push -u origin main
```

2. Visit [vercel.com](https://vercel.com) and sign in or create an account.

3. Click **"New Project"** and import your GitHub repository.

4. Vercel will auto-detect Next.js. Click **Deploy**.

5. After the initial deploy, every push to `main` will trigger a new deployment automatically.

## Environment Variables

Vercel does **not** require any environment variables to deploy. The app works perfectly without Supabase credentials.

To enable optional Supabase persistence on production:

1. Go to your Vercel project settings.
2. Navigate to **Settings > Environment Variables**.
3. Add the following (only if you have a Supabase project):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-optional
```

4. Click **Save** and redeploy.

### LocalStorage Fallback

When Supabase env vars are missing, the app automatically uses **localStorage** for all data:
- Reservations
- Customer reviews
- Content planner drafts
- Team intake records

Data persists in the browser's local storage and survives page refreshes.

**Note:** localStorage data is per-browser and not shared across devices or browsers. For a multi-user production setup, connect Supabase.

## Optional: Enable Supabase Persistence

### Prerequisites

- A [Supabase](https://supabase.com) account
- A new or existing Supabase project

### Setup Steps

1. **Create a Supabase project** at [supabase.com/dashboard](https://supabase.com/dashboard)

2. **Copy the SQL schema** to your Supabase database:
   - Go to your Supabase project > **SQL Editor**
   - Click **"New query"**
   - Copy the entire contents of `supabase/schema.sql` from this repo
   - Paste into the SQL editor and run
   - The schema will create tables for:
     - `restaurants` (metadata)
     - `reservations` (booking records)
     - `applicants` (team intake candidates)
     - `content_posts` (Instagram drafts and schedules)
     - `review_requests` and `customer_feedback` (reviews and feedback)

3. **Find your credentials** in Supabase:
   - Go to **Project Settings > API**
   - Copy `Project URL` (this is `NEXT_PUBLIC_SUPABASE_URL`)
   - Copy `anon public` key (this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

4. **Add environment variables to Vercel** (see **Environment Variables** section above).

5. **Redeploy** by triggering a new build in Vercel:
   - Go to **Vercel > Deployments**
   - Click **"Redeploy"** on the latest build, or
   - Push a new commit to `main` to trigger auto-deploy

6. **Test on production:**
   - Visit your deployed app
   - Create a reservation or review
   - Data should now persist in Supabase

## Build and Deployment Info

### Build Command

```bash
npm run build
```

This runs Next.js Turbopack compiler and outputs to `.next/` directory.

### Start Command

```bash
npm start
```

Vercel uses this command to start the production server.

### Supported Node Versions

- **Recommended:** Node 18.x or 20.x
- Vercel auto-selects based on `.nvmrc` or defaults to recent LTS
- To specify, create `.nvmrc` with `18` or `20`

### Build Timeout

- Default: 45 seconds for Free plan, 3600 seconds for Pro
- Build typically completes in 30-60 seconds
- If build times out, check for large dependencies or circular imports (usually not an issue with this repo)

## Post-Deploy Checklist

- [ ] Visit your Vercel URL and confirm the app loads
- [ ] Navigate through all pages: Dashboard, Reservations, Reviews, Content Planner, Team Intake, Settings
- [ ] Try creating a reservation or review entry to confirm localStorage is working
- [ ] If Supabase is configured, check that data persists after a page refresh
- [ ] Test on mobile to confirm responsive layout
- [ ] Share the Vercel URL with Papai team for feedback
- [ ] Add custom domain (optional):
  - Go to **Vercel > Project Settings > Domains**
  - Add your custom domain (e.g., `papai-os.example.com`)
  - Follow DNS configuration steps

## Troubleshooting

### Build Fails

**Error:** `TypeScript type checking failed`

**Solution:**
- Check `npm run build` locally first
- Ensure all imports are correct
- Run `npm install` to update dependencies

**Error:** `Module not found`

**Solution:**
- Verify all data files exist in `data/` directory
- Check relative import paths in components
- Redeploy after fixing

### Data Not Persisting

**Issue:** Entries disappear after page refresh

**If Supabase is not configured:**
- Confirm localStorage is enabled in browser settings
- Check browser console for errors (F12 > Console tab)
- Try a different browser

**If Supabase is configured:**
- Verify env vars in Vercel project settings
- Confirm Supabase schema was created (check `supabase > SQL Editor > Query history`)
- Check Supabase database in `Table Editor` to see if data is being written
- Redeploy after adding env vars

### Custom Domain Not Working

**Solution:**
- Allow 24-48 hours for DNS propagation
- Verify DNS settings point to Vercel nameservers
- Contact Vercel support if issues persist after 48 hours

## Continuous Deployment

Once deployed via GitHub:

1. **Auto-deploy on push:**
   - Any push to `main` triggers a new build
   - Vercel shows build progress in the dashboard
   - Deployment is live once build succeeds

2. **Preview deployments:**
   - Every pull request gets a preview URL
   - Share preview URLs with team for testing before merge

3. **Rollback:**
   - Go to **Vercel > Deployments**
   - Find a previous successful build
   - Click **"Promote to Production"**

## Monitoring and Logs

- **View build logs:** Vercel dashboard > Deployments > Click build > Logs
- **View production logs:** Vercel dashboard > Functions (for serverless logs)
- **Monitor uptime:** Vercel dashboard > Analytics (on Pro plan)

## Next Steps

1. **Set up WhatsApp Business API:** Configure in `lib/whatsapp.ts` for reservation intake
2. **Connect Instagram API:** Add Instagram growth automation (see `lib/instagram.ts`)
3. **Add AI agents:** Wire Claude agents for content generation and customer insights
4. **Enable notifications:** Send Papai staff alerts on new reservations/reviews
5. **Custom branding:** Update colors, logo, and contact info in `data/restaurant-profile.json`

## Support

- **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation:** [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase Documentation:** [supabase.com/docs](https://supabase.com/docs)
- **GitHub Issues:** [github.com/sahidattaf/papai-since1933-ai-os/issues](https://github.com/sahidattaf/papai-since1933-ai-os/issues)

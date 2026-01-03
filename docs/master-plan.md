## 3-MIN PREP

**Open these tabs NOW:**
1. GitHub (logged in)
2. Vercel (logged in)
3. Supabase (logged in)
4. OpenRouter → copy API key to clipboard
5. Perplexity (for emergency searches)
6. dub.co (reference - the app you're cloning style)

**Prep:**
- New folder ready on desktop
- Terminal open
- Cursor open

---

## BUILD SPEC (paste into markdown file)

```markdown
# LinkTrack - URL Attribution Analytics

## What it does
Create shortened links with source tracking. See which traffic sources (Twitter, YouTube, Email, etc.) drive the most clicks.

## Tech Stack
- Next.js 14 (App Router, TypeScript, Tailwind)
- Supabase (Auth + Postgres)
- Vercel (Deployment)
- OpenRouter (optional AI features)

## Core Features
1. User auth (email/password via Supabase)
2. Create short links with custom slugs
3. Add source tags (utm-style) per link
4. Track clicks with timestamp + country/referrer
5. Dashboard showing click analytics per source
6. Public redirect route that logs + redirects

## Database Tables
- users (handled by Supabase auth)
- links (id, user_id, original_url, slug, created_at)
- clicks (id, link_id, source_tag, timestamp, country, referrer)

## Routes
- / → Landing
- /login, /signup → Auth
- /dashboard → User's links + analytics
- /[slug] → Public redirect (logs click, redirects)
```

---

## VIDEO CHECKLIST (70 min)

| Phase | Time | Actions |
|-------|------|---------|
| **Setup** | 8 min | Create Next.js app → init git → push to GitHub → import to Vercel |
| **Supabase** | 8 min | Create project → copy keys to .env.local → create tables (links, clicks) → enable RLS |
| **Auth** | 12 min | Login/signup pages → connect Supabase auth → test flow |
| **Dashboard** | 12 min | Layout + sidebar → fetch user's links → "Create Link" form → insert to DB |
| **Analytics** | 10 min | Click tracking table → display click counts per source → simple chart |
| **Redirect** | 8 min | /[slug] route → log click → redirect to original URL |
| **Deploy** | 7 min | Push → Vercel auto-deploys → add env vars → update Supabase redirect URLs |
| **Demo** | 5 min | Full flow test live: signup → create link → click it → see analytics |

---

**What makes it impressive:**
- Real working SaaS in 70 min
- Auth, DB, analytics, deployment - full stack
- Educational: git, env vars, RLS, dynamic routes
- Practical use case everyone understands

**Skip:** Stripe, drag-drop, fancy UI polish, AI features

Go record. You've got this.
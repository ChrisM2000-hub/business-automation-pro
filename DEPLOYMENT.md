# Deployment & Backend Setup Guide

## Overview
This guide walks you through deploying your site to **Vercel** (free) with email and lead collection capabilities.

## Architecture
```
┌─────────────────────────────────────┐
│  Your Website (React + TanStack)    │
│         Vercel Hosting              │
└──────────────┬──────────────────────┘
               │
     ┌─────────┴─────────┐
     ▼                   ▼
┌──────────────┐  ┌─────────────────┐
│   Resend     │  │   MongoDB Atlas │
│  (Emails)    │  │   (Lead Storage)│
└──────────────┘  └─────────────────┘
     ▼                   ▼
   Inbox            Database
```

---

## Step 1: Free Services Signup

### A. Resend (Email Sending)
1. Go to https://resend.com
2. Sign up with your email
3. Verify email
4. Go to API Keys → Copy your key
5. Add to `.env.local`: `RESEND_API_KEY=re_xxxxx`

**Free tier:** 100 emails/day

### B. MongoDB Atlas (Lead Storage - Optional but recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create a cluster (free tier)
4. Create database user (username/password)
5. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/`
6. Add to `.env.local`: `MONGODB_URI=mongodb+srv://...`

**Free tier:** 512MB storage, shared cluster

### C. OpenAI (AI Chat)
1. Go to https://platform.openai.com
2. Sign up or log in
3. Go to API Keys → Create new
4. Add to `.env.local`: `OPENAI_API_KEY=sk_xxxxx`

**Pricing:** Pay-as-you-go (~$0.01-0.05 per chat, set spending limit)

---

## Step 2: Local Development

### Install dependencies
```bash
bun install resend
bun install mongodb  # Optional, for database
```

### Create `.env.local`
Copy from `.env.example`:
```bash
cp .env.example .env.local
```

Then fill in your API keys:
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
OPENAI_API_KEY=sk_xxxxxxxxxxxxx
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
CONTACT_EMAIL=your-real-email@gmail.com
SITE_URL=http://localhost:5173
```

### Run locally
```bash
bun run dev
```

Test at: http://localhost:5173

---

## Step 3: Deploy to Vercel (Free)

### A. Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your repos

### B. Import Your Project
1. Click "Add New..." → "Project"
2. Select `ChrisM2000-hub/business-automation-pro`
3. Vercel auto-detects TanStack Start ✓
4. Click "Deploy"

**First deploy takes ~2-3 minutes**

### C. Add Environment Variables to Vercel
1. After deploy, go to Settings → Environment Variables
2. Add each from `.env.local`:
   - `RESEND_API_KEY`
   - `OPENAI_API_KEY`
   - `MONGODB_URI`
   - `CONTACT_EMAIL`
   - `SITE_URL=https://your-vercel-domain.vercel.app`

3. Redeploy (Settings → Deployments → Redeploy)

**Your site is now live at:** `https://your-project-name.vercel.app`

---

## Step 4: Connect Custom Domain

### A. Buy a Domain
- Recommended: Namecheap, GoDaddy, Google Domains
- Cost: ~$10/year
- Example: `christopher-automation.com`

### B. Connect to Vercel
1. In Vercel project → Settings → Domains
2. Add domain: `christopher-automation.com`
3. Vercel shows DNS instructions
4. Go to domain registrar → DNS settings
5. Add Vercel's DNS records (usually CNAME or A records)
6. Wait for propagation (5 min - 48 hours)

**Your site is now:** `https://christopher-automation.com`

---

## Step 5: Test Your Backend

### Test Contact Form
```bash
curl -X POST http://localhost:5173/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "This is a test"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

Check your email inbox — you should receive the contact form!

### Test Newsletter Subscribe
```bash
curl -X POST http://localhost:5173/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

---

## Step 6: Connect Forms in Your UI

Update `src/routes/contact.tsx` to call your API:

```tsx
const handleSubmit = async (formData) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  
  if (response.ok) {
    // Show success message
  }
}
```

---

## Free Tier Limits & Costs

| Service | Limit | Cost |
|---------|-------|------|
| **Vercel** | Unlimited requests, 100GB bandwidth/month | Free |
| **Resend** | 100 emails/day | Free (or $20/mo for more) |
| **MongoDB** | 512MB storage, shared | Free |
| **OpenAI** | Pay-as-you-go | ~$0.01-0.05 per chat |
| **Domain** | N/A | ~$10/year |
| **Total** | Everything | **~$10/year** |

---

## Monitoring & Debugging

### View Vercel Logs
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# View logs
vercel logs
```

### Check Email Status
Resend dashboard shows all sent emails, bounces, and failures.

### MongoDB Data Viewer
MongoDB Atlas dashboard shows all stored contacts and leads.

---

## Next Steps

1. ✅ Update `.env.example` with all keys
2. ✅ Implement MongoDB schema for contacts/subscribers
3. ✅ Add form validation to frontend
4. ✅ Set up email templates (branding, etc.)
5. ✅ Create Calendly webhook integration (optional)
6. ✅ Add Slack notifications when new leads come in (optional)

---

## Questions?

- **Vercel issues:** https://vercel.com/docs
- **Resend docs:** https://resend.com/docs
- **MongoDB docs:** https://docs.mongodb.com/atlas/
- **TanStack Start:** https://tanstack.com/start

# Deployment Guide: Staging vs Production

Two-stage workflow: **Staging** (test) → **Production** (live).

---

## Branch Strategy

| Branch | Stage | Use for |
|--------|-------|---------|
| `develop` | Staging | Testing changes, preview before release |
| `main` | Production | Live site, stable code |

---

## Workflow

### 1. Develop & Test (Staging)

```bash
# Create/switch to develop branch
git checkout -b develop
# or: git checkout develop

# Make changes, then run locally
npm run dev:client
npm run dev:server

# Build for staging
npm run build:staging
# Preview: npm run preview --prefix client
```

### 2. Deploy to Staging

- **Vercel**: Connect `develop` branch → auto-deploys to preview URL
- **Render/Railway**: Create a "Staging" service pointing to `develop`

### 3. Promote to Production

```bash
# When staging looks good, merge to main
git checkout main
git merge develop
git push origin main
```

- **Vercel**: `main` branch → production URL
- **Render/Railway**: Production service → `main` branch

---

## Environment Variables

### Client (Frontend)

| Var | Staging | Production |
|-----|---------|------------|
| `VITE_API_URL` | `/api` (or staging API URL) | `https://your-api.onrender.com` |

- **Local dev**: Uses `.env.development` (API proxy to localhost:5000)
- **Staging deploy**: Set `VITE_API_URL` in Vercel Preview env
- **Production deploy**: Set `VITE_API_URL` in Vercel Production env

### Server (Backend)

| Var | Staging | Production |
|-----|---------|------------|
| `MONGODB_URI` | Same or separate DB | Production DB |
| `PORT` | Auto by platform | Auto by platform |

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev:client` | Local frontend (staging mode) |
| `npm run build:staging` | Build client only (for staging) |
| `npm run build:prod` | Build client + server (full prod) |
| `npm run build` | Same as build:prod |

---

## Staging Banner

In development, an orange "Development / Staging" banner appears at the bottom. It is hidden in production builds.

# Portfolio - Full Stack Project

React + Node.js/Express full-stack portfolio with code consistency tools.

## Tech Stack

- **Frontend:** React (Vite) + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Database:** TBD (Firebase Firestore or MongoDB)
- **Tools:** ESLint, Prettier, Husky, lint-staged

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Development

Run client and server in separate terminals:

```bash
# Terminal 1 - Frontend
npm run dev:client

# Terminal 2 - Backend
npm run dev:server
```

- Client: http://localhost:5173
- API: http://localhost:5001

### Build

```bash
npm run build        # Full build (client + server)
npm run build:staging  # Client only (for staging deploy)
npm run build:prod    # Full build (for production)
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for staging vs production workflow.

### Code Quality

- **Lint:** `npm run lint`
- **Format:** `npm run format`

Pre-commit hooks run Prettier on staged files. Run `npm run lint` before pushing to catch lint errors.

## MongoDB Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Copy `server/.env.example` to `server/.env`
3. Add your connection string to `MONGODB_URI`
4. Initialize portfolio CMS starter records with `npm run seed:cms --prefix server` (or use **Import starter content** from the admin overview). This only fills empty collections.

## Admin Dashboard (Phase 1)

The public portfolio remains at `/`. The admin sign-in page is at `/admin/login` and the protected dashboard shell is at `/admin`.

1. Copy `server/.env.example` to `server/.env` and set `ADMIN_EMAIL` and `ADMIN_PASSWORD` for local development. Use a strong password and keep `.env` private.
2. Set distinct random values for `JWT_SECRET` and `COOKIE_SECRET` (for example, generate each with `openssl rand -base64 48`).
3. For deployment, set `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` instead of `ADMIN_PASSWORD`; generate the hash with `node -e "require('bcryptjs').hash('choose-a-long-password', 12).then(console.log)"`.
4. Set `CLIENT_URL` to the exact deployed client origin in production. The API only accepts that origin for credentialed requests; localhost is allowed during development.

The session uses a signed, HTTP-only cookie that expires after eight hours. Login attempts are limited to five failures per 15 minutes. Never commit the populated `.env` file.

To initialize the CMS from the current portfolio defaults, sign in and choose **Import starter content** on the dashboard. It fills only empty collections. You can also run `npm run seed:cms --prefix server`; this migration is idempotent and preserves existing records. Image and PDF uploads need a `CLOUDINARY_URL`; without it, paste an existing media URL into the editor.

## Project Structure

```
portfolio/
├── client/          # React frontend
│   ├── src/api/     # API calls
│   ├── src/components/
│   └── src/types/
├── server/          # Express backend
│   ├── src/config/  # DB connection
│   ├── src/models/  # Mongoose schemas
│   ├── src/routes/  # API routes
│   └── src/scripts/ # Seed data
├── .editorconfig    # Shared editor rules
├── .gitignore
└── package.json     # Root scripts + Husky
```

### API Endpoints

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | `/api/health`   | Health check        |
| GET    | `/api/projects` | List all projects   |
| POST   | `/api/contact`  | Submit contact form |

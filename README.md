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
- API: http://localhost:5000

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
4. Seed sample projects: `npm run seed --prefix server`

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

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | List all projects |
| POST | `/api/contact` | Submit contact form |

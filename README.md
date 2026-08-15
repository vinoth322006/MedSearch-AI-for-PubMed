# MediSearch

## How to run MediSearch

### Prerequisites

* Node.js 20+ (you have v24 ✓)
* Docker Desktop running (for Postgres + Redis)

## One-time setup

### 1. Start the databases

From the project root:

```bash
docker compose up -d
```

### 2. Backend setup (first run only)

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate deploy    # create tables
npx tsx prisma/seed.ts        # create admin user
```

### 3. Frontend setup (first run only)

```bash
cd frontend
cp .env.example .env
npm install
```

## Daily run

Open two terminals:

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

→ runs on **http://localhost:4000**

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

→ runs on **http://localhost:5173**

Open **http://localhost:5173** in your browser.

Search works immediately (no login needed).

## Login

Login is required to save bookmarks/history.

* **Email:** `admin@medisearch.local`
* **Password:** `admin12345`
* Go to **http://localhost:5173/login**

## Stop everything

Stop Postgres + Redis while keeping the data:

```bash
docker compose down
```

Stop Postgres + Redis and also delete the data volumes:

```bash
docker compose down -v
```

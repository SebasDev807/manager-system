# 🖥️ Agency Manager — Backend

REST API built with **Node.js**, **TypeScript**, and **Express** to manage clients, projects, tasks, and payments for a small agency. Designed with **Hexagonal Architecture (Ports & Adapters)** to keep the business logic decoupled from frameworks and external tools.

---

## 🏗️ Architecture

This project follows **Hexagonal Architecture**, organized by business contexts:

```
src/
├── contexts/                  # Business contexts
│   ├── auth/
│   │   ├── domain/            # Entities & repository ports (pure core)
│   │   ├── application/       # Use cases & DTOs
│   │   └── infrastructure/    # Controllers, routes, adapters, schemas
│   ├── users/
│   ├── projects/
│   ├── tasks/
│   └── payments/
├── shared/                    # Cross-cutting concerns
│   ├── middlewares/
│   ├── exceptions/
│   ├── lib/                   # Prisma client instance
│   └── utils/
├── config/                    # Environment & Swagger config
├── server.ts
└── index.ts
```

Each context is divided into three layers:

| Layer | Responsibility |
|---|---|
| `domain/` | Entities, repository interfaces (ports) — no external dependencies |
| `application/` | Use cases — one file per operation |
| `infrastructure/` | Prisma adapters, Express controllers, Zod schemas, routes |

---

## ⚙️ Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Validation:** Zod
- **Auth:** JWT + bcryptjs
- **Docs:** Scalar (`/api-docs`)
- **Containerization:** Docker + Docker Compose

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) & Docker Compose

---

### 1. Clone the repository

```bash
git clone https://github.com/SebasDev807/manager-system.git
cd backend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Change a `.env.example` to `.env` file in the `backend/` root based on the example below:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://manager_user:manager_password@localhost:5432/manager_system
JWT_SECRET=your-super-secret-jwt-key-here-that-is-at-least-32-characters-long-for-security
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info

```

### 4. Start the database with Docker Compose

```bash
docker compose up -d
```

This spins up a PostgreSQL instance on port `5432`.

### 5. Run Prisma migrations

```bash
pnpm prisma migrate dev
```

### 6. Generate Prisma client

```bash
pnpm prisma generate
```

### 7. Start the development server

```bash
pnpm dev
```

The server will be running at `http://localhost:3000`.

---

## 📖 API Documentation

Interactive API documentation is available via **Scalar** once the server is running:

```
http://localhost:3000/api-docs
```

---

## 🐳 Docker Compose reference

```bash
# Start the database in background
docker compose up -d

# Stop the database
docker compose down

# Stop and remove volumes (resets the database)
docker compose down -v
```

---

## 🗄️ Prisma reference

```bash
# Run pending migrations
pnpm prisma migrate dev

# Reset the database (drops all data)
pnpm prisma migrate reset

# Open Prisma Studio (visual DB explorer)
pnpm prisma studio

# Regenerate the Prisma client after schema changes
pnpm prisma generate
```

---

## 📁 Project Scripts

```bash
pnpm dev        # Start development server with hot reload
pnpm build      # Compile TypeScript to dist/
pnpm start      # Run compiled output
pnpm lint       # Run ESLint
```

---

## 🔐 Authentication

The API uses **JWT Bearer token** authentication.

1. Register a user via `POST /api/auth/register`
2. Login via `POST /api/auth/login` to receive a token
3. Include the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_token>
```

---

## 📦 Main Modules

| Module | Description |
|---|---|
| `auth` | User registration and login |
| `users` | User management |
| `projects` | Project tracking per client |
| `tasks` | Task management within projects |
| `payments` | Payment registration and tracking |

---

## 🤝 Contributing

1. Create a branch: `git checkout -b feat/your-feature`
2. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/): `feat: add payment module`
3. Push and open a Pull Request
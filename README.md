# Muhammad Salman Abid - Backend Portofolio

This is the backend API for Muhammad Salman Abid's personal portofolio website.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Cloning the Repository](#cloning-the-repository)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Seeding](#database-seeding)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [API Documentation](#api-documentation)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (Package Manager)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

## Getting Started

Follow these steps to get the backend up and running on your local machine.

### Cloning the Repository

```bash
git clone <repository_url>
cd <repository_directory>/web_api
```

Replace `<repository_url>` with the actual URL of your Git repository and `<repository_directory>` with the name of the cloned directory.

### Installation

Navigate to the `web_api` directory and install the dependencies using pnpm:

```bash
pnpm install
```

This will install all the necessary packages, including Express, Mongoose, Redis client, etc.

### Environment Variables

Create a `.env` file in the `web_api` directory based on the `.env.example` (you might need to create `.env.example` or just add the variables directly).

At minimum, you will need to configure the following variables:

```dotenv
PORT=3000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key
REDIS_URL=redis://localhost:6379

# Optional: SMTP Configuration for Email (if re-added later)
# SMTP_HOST=
# SMTP_PORT=
# SMTP_SECURE=
# SMTP_USER=
# SMTP_PASS=
# SMTP_FROM=
```

Make sure to replace `your_jwt_secret_key` with a strong, unique secret for JWT authentication.

### Database Seeding

To populate your MongoDB database with initial data, run the seed script:

```bash
pnpm run seed
```

This command is configured in `package.json` and will execute the seeding logic located in `src/migrations/seed.ts`.

## Running the Application

We use a `Makefile` to simplify running common tasks.

### Development Mode

To start the backend server in development mode (usually with hot-reloading), use the `dev` target:

```bash
make dev
```

This command typically runs `pnpm run dev` as defined in the `Makefile` and `package.json`.

### Production Mode

To build and start the application for production:

```bash
make start
```

This command will first build the project (`make build`) and then start the compiled JavaScript code (`pnpm start`). The `build` target runs `pnpm run build`, so ensure your `package.json` includes build and start scripts.

## API Documentation

API endpoints are documented in the `postman_collection.json` file located in the root of the `web_api` directory.

Alternatively, you can access the `/health` endpoint to check if the server is running:

```
GET http://localhost:3000/health
```

(Assuming you are running on the default port 3000) 
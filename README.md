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

## Deployment on a VPS

This section provides a guide for deploying the backend application on a Virtual Private Server (VPS), typically running a Linux distribution like Ubuntu or Debian.

### Prerequisites (on VPS)

Ensure your VPS has:

- Basic server setup (SSH access, user with sudo privileges).
- Firewall configured (e.g., UFW), allowing SSH access and potentially HTTP/HTTPS if you plan to serve directly or use a reverse proxy.
- Git installed (`sudo apt update && sudo apt install git -y`).

### 1. Install Node.js and pnpm

Follow the official Node.js installation guide for your Linux distribution. A common way is using NodeSource repositories:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Then install pnpm globally:

```bash
sudo npm install -g pnpm
```

### 2. Install MongoDB

Follow the official MongoDB installation guide for your distribution. For Ubuntu, it generally involves:

Import the MongoDB public GPG Key:

```bash
curl -fsSL https://www.mongodb.org/static/pg/Release.gpg | sudo apt-key add -
```

Create a list file for MongoDB depending on your Ubuntu version (replace `$(lsb_release -cs)` with `focal`, `bionic`, etc. if needed):

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

Reload the local package database:

```bash
sudo apt update
```

Install the MongoDB packages:

```bash
sudo apt-get install -y mongodb-org
```

Start MongoDB:

```bash
sudo systemctl start mongod
```

Verify MongoDB is running:

```bash
sudo systemctl status mongod
```

Enable MongoDB to start on boot:

```bash
sudo systemctl enable mongod
```

**Firewall:** Ensure port 27017 is blocked from public access unless absolutely necessary and secured. It's best to only allow connections from the localhost (where your Node.js app runs).

### 3. Install Redis

Redis is usually available in the default package repositories:

```bash
sudo apt update
sudo apt install redis-server -y
```

Verify Redis is running:

```bash
sudo systemctl status redis-server
```

Enable Redis to start on boot:

```bash
sudo systemctl enable redis-server
```

**Firewall:** Ensure port 6379 is blocked from public access. Only allow connections from localhost.

### 4. Install PM2

PM2 is a process manager that helps keep your Node.js application running constantly and provides useful monitoring features. Install it globally using pnpm:

```bash
sudo pnpm install -g pm2
```

### 5. Deploy and Run the Application

Clone your repository onto the VPS. Navigate into the `web_api` directory. Create your `.env` file with the correct `MONGO_URI` and `REDIS_URL` (likely using `mongodb://localhost:27017/your_db_name` and `redis://localhost:6379`).

Install dependencies and build the application using the Makefile:

```bash
make install
make build
```

Run the application using PM2:

```bash
pm2 start dist/app.js --name "portfolio-backend"
```

This assumes your build output goes to `dist/app.js` and your `start` script in `package.json` points to this file. If your `start` script is different (e.g., uses `ts-node` or another entry point), adjust the PM2 command accordingly, or use the Makefile target:

```bash
pm2 start Makefile --interpreter make --name "portfolio-backend" -- start
```

Save the PM2 process list so it restarts on server reboot:

```bash
pm2 startup
# Follow the instructions provided by the command output to run the suggested command
```

Check the status of your PM2 process:

```bash
pm2 status
```

View logs:

```bash
pm2 logs portfolio-backend
```

### Next Steps (Optional but Recommended)

- **Reverse Proxy:** Use Nginx or Apache to proxy requests to your Node.js application (running on, say, port 3000). This allows you to run on standard HTTP/S ports (80/443), handle SSL termination, serve static files efficiently, and improve security.
- **Domain Name:** Point a domain name to your VPS IP address.
- **SSL Certificate:** Secure your connection with an SSL certificate (e.g., using Certbot with Nginx/Apache). 
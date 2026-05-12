# 🛒 E-Commerce REST API

A production-ready RESTful API for an e-commerce platform built with **Node.js**, **Express**, and **MongoDB**. Features input validation, rate limiting, security headers, and a templating layer via EJS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB (via Mongoose) |
| Templating | EJS |
| Validation | Joi |
| Security | Helmet, CORS, express-rate-limit |
| Environment | dotenv |
| Dev Server | Nodemon |

---

## Project Structure

```
api-ecommerce/
├── config/          # Database connection & app configuration
├── controllers/     # Route handler logic
├── middlewares/     # Custom middleware (auth, error handling, etc.)
├── models/          # Mongoose data models
├── routes/          # Express route definitions
├── views/           # EJS templates
├── server.js        # App entry point
└── package.json
```

---

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (local) **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) cloud connection string

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ziadTarek30/api-ecommerce.git
cd api-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then open `.env` and fill in your values (see [Environment Variables](#environment-variables) below).

### 4. Start the server

**Development mode** (auto-restarts on file changes):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The API will be available at `http://localhost:<PORT>` (default: `http://localhost:3000`).

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/ecommerce` |
| `NODE_ENV` | App environment | `development` or `production` |

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## API Endpoints

### Orders
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/orders` | Get all orders *(auth required)* |
| GET | `/api/orders/:id` | Get a single order *(auth required)* |
| POST | `/api/orders` | Place a new order *(auth required)* |
| PUT | `/api/orders/:id` | Update order status *(auth required)* |

---

## Security Features

- **Helmet** — Sets secure HTTP headers
- **CORS** — Configurable cross-origin resource sharing
- **Rate Limiting** — Prevents abuse by limiting repeated requests
- **Joi Validation** — Validates all incoming request bodies
- **dotenv** — Keeps secrets out of source code

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start the server (production) |
| `npm run dev` | Start with nodemon (development) |


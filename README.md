# K-pop Events Finder API

REST API built with JavaScript, Express, JWT authentication, MongoDB, and Swagger documentation.

## Requirements

- Node.js 20+
- MongoDB running locally or a MongoDB Atlas connection string

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI and JWT secret.

## Scripts

- `npm start`: starts the API with Node.js.
- `npm run dev`: starts the API with Nodemon and restarts when files change.

## Environment Variables

| Variable | Description | Default example |
| --- | --- | --- |
| `NODE_ENV` | Runtime environment | `development` |
| `PORT` | API port | `3000` |
| `BASE_URL` | Public base URL for the API | `http://localhost:3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/kpop-events-finder` |
| `JWT_SECRET` | Secret used to sign JWTs | `replace-with-a-secure-secret` |
| `JWT_EXPIRES_IN` | JWT expiration time | `1d` |

## API Documentation

After starting the server, open:

```text
http://localhost:3000/api-docs
```

The OpenAPI specification is stored at `src/docs/swagger.json`.

## Initial Endpoints

- `GET /health`: API health check.
- `POST /api/v1/auth/register`: creates a user and returns a JWT.
- `POST /api/v1/auth/login`: authenticates a user and returns a JWT.
- `GET /api/v1/auth/me`: returns the authenticated user profile.

## Project Structure

```text
src/
  app.js
  server.js
  config/
  controllers/
  docs/
  middleware/
  models/
  routes/
  services/
```

## Vercel

The `api/index.js` entrypoint exports the Express app for a future Vercel deployment.

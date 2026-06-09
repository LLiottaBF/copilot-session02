# Backend – JWT Auth API

FastAPI application that demonstrates JSON Web Token (JWT) authentication.

## Features

- **POST /token** – Authenticate with username and password; receive a JWT valid for **300 seconds**.
- **POST /token/refresh** – Exchange a valid token for a fresh one with a new 300-second window.
- **GET /me** – Return the authenticated user's information (protected route).

## Credentials

| Field    | Value      |
|----------|------------|
| username | `admin`    |
| password | `admin123` |

## Environment variables

| Variable                     | Default                       | Description                          |
|------------------------------|-------------------------------|--------------------------------------|
| `SECRET_KEY`                 | *(built-in dev key)*          | HMAC-SHA256 signing key – **change in production** |
| `ACCESS_TOKEN_EXPIRE_SECONDS`| `300`                         | Token lifetime in seconds            |


- [Docker](https://docs.docker.com/get-docker/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/) ≥ 2 (included with Docker Desktop)

Or, for local development:

- Python ≥ 3.11
- [Poetry](https://python-poetry.org/docs/#installation) ≥ 1.8

## Running with Docker

```bash
# Build and start the container
docker compose up --build

# The API is now available at http://localhost:8000
```

## Running locally (without Docker)

```bash
cd backend

# Install dependencies
poetry install

# Start the development server
poetry run uvicorn app.main:app --reload
```

## Usage examples

### 1. Obtain a token

```bash
curl -X POST http://localhost:8000/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&******"
```

Example response:

```json
{
  "access_token": "<JWT>",
  "token_type": "bearer",
  "expires_in": 300
}
```

### 2. Access a protected endpoint

```bash
curl http://localhost:8000/me \
  -H "Authorization: ******"
```

### 3. Refresh the token

```bash
curl -X POST http://localhost:8000/token/refresh \
  -H "Authorization: ******"
```

## Interactive docs

FastAPI provides auto-generated documentation at:

- **Swagger UI** – <http://localhost:8000/docs>
- **ReDoc** – <http://localhost:8000/redoc>

## Project structure

```
backend/
├── app/
│   ├── __init__.py
│   └── main.py          # FastAPI application
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml       # Poetry dependency manifest
└── README.md
```

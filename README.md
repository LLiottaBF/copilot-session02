# copilot-class-2

## Correr el backend

### Opción 1: local (Poetry)

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
```

Backend disponible en: <http://localhost:8000>

### Opción 2: Docker

```bash
cd backend
docker compose up --build
```

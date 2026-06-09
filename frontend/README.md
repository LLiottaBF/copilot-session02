# Frontend

Aplicación React (Vite) con autenticación contra el backend FastAPI.

## Vistas

- `/login`: formulario de inicio de sesión.
- `/welcome`: vista protegida (requiere token en `sessionStorage`).

## Configuración

Variable opcional:

- `VITE_API_URL` (default: `http://localhost:8000`)

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
```

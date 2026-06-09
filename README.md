# copilot-class-2

Aplicación compuesta por:

- **Backend** FastAPI con autenticación JWT (`/backend`)
- **Frontend** React + Vite (`/frontend`)

## Flujo implementado

El frontend implementa:

- Pantalla de **login** (`/login`) que consume `POST /token` del backend.
- Al iniciar sesión correctamente, guarda `access_token` en `sessionStorage`.
- Pantalla de **bienvenida** (`/welcome`) protegida con ruta privada.
- Si no hay sesión válida, redirige automáticamente a `/login`.
- Botón de cierre de sesión que limpia el token de sesión.

El diseño usa los lineamientos base de `DESIGN.md` (paleta, tipografía Inter, espaciado y tarjetas estilo glass).

## Requisitos

- Node.js 20+
- Python 3.11+
- (Opcional) Poetry para ejecutar backend según su `README`

## Ejecutar backend

Desde la raíz del proyecto:

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
```

Backend disponible en `http://localhost:8000`.

Credenciales de prueba:

- usuario: `admin`
- contraseña: `admin123`

## Ejecutar frontend

En otra terminal, desde la raíz del proyecto:

```bash
cd frontend
npm install
npm run dev
```

Frontend disponible en `http://localhost:5173`.

### Variable opcional

Puedes configurar la URL del backend con:

- `VITE_API_URL` (por defecto: `http://localhost:8000`)

Ejemplo:

```bash
VITE_API_URL=http://localhost:8000 npm run dev
```

## Build del frontend

```bash
cd frontend
npm run build
```

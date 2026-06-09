import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'
const TOKEN_KEY = 'access_token'

function isAuthenticated() {
  return Boolean(sessionStorage.getItem(TOKEN_KEY))
}

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/welcome', { replace: true })
    }
  }, [navigate])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Usuario o contraseña inválidos')
      }

      const data = await response.json()
      sessionStorage.setItem(TOKEN_KEY, data.access_token)
      navigate('/welcome', { replace: true })
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Compliance Platform</h1>
        <p className="subtitle">Inicia sesión para continuar</p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </section>
    </main>
  )
}

function WelcomePage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  useEffect(() => {
    async function loadUser() {
      const token = sessionStorage.getItem(TOKEN_KEY)

      try {
        const authHeaders = new Headers()
        authHeaders.set('Authorization', 'Bearer ' + token)

        const response = await fetch(`${API_URL}/me`, {
          headers: authHeaders,
        })

        if (!response.ok) {
          throw new Error('Sesión inválida')
        }

        const user = await response.json()
        setUsername(user.username)
      } catch (loadError) {
        console.error(loadError)
        sessionStorage.removeItem(TOKEN_KEY)
        navigate('/login', { replace: true })
      }
    }

    loadUser()
  }, [navigate])

  function handleLogout() {
    sessionStorage.removeItem(TOKEN_KEY)
    navigate('/login', { replace: true })
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Bienvenido</h1>
        <p className="subtitle">Hola {username || 'usuario'} 👋</p>
        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </section>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/welcome"
        element={
          <ProtectedRoute>
            <WelcomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App

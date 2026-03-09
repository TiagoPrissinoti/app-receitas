import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { api } from '../api/api'

interface User {
  id: string
  name: string
  role: 'USER' | 'ADMIN'
}

interface AuthContextData {
  user: User | null
  token: string | null
  login(email: string, password: string): Promise<void>
  logout(): void
  loading: boolean
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 Restaurar sessão ao iniciar app
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser)

        setToken(storedToken)
        setUser(parsedUser)

        // 👉 aplica token no axios
        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${storedToken}`
      } catch {
        localStorage.clear()
      }
    }

    setLoading(false)
  }, [])

  async function login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password })

    const { token, user } = response.data

    // 🔥 salvar localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    // 🔥 aplicar axios
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setToken(token)
    setUser(user)
  }

  function logout() {
    localStorage.clear()

    delete api.defaults.headers.common['Authorization']

    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import '../styles/auth.css'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('Submit disparado')

    try {
      console.log('Enviando login:', email)

      await login(email, password)

      console.log('Login OK')
      navigate('/home')
    } catch (error) {
      console.error('Erro no login:', error)
      alert('Login inválido')
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>

        <p>
          Não tem conta?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: '#6c5ce7', cursor: 'pointer' }}
          >
            Cadastre-se
          </span>
        </p>
      </form>
    </div>
  )
}

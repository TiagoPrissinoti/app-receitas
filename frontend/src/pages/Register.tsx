import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import '../styles/register.css'

export function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await api.post('/auth/register', {
      name,
      email,
      password,
    })

    alert('Usuário criado com sucesso!')
    navigate('/')
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>📝 Criar Conta</h1>

        <label>
          Nome
          <input
            placeholder="Seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <div className="register-buttons">
          <button type="submit" className="primary">
            Cadastrar
          </button>

          <button
            type="button"
            className="secondary"
            onClick={() => navigate('/')}
          >
            Já tenho conta
          </button>
        </div>
      </form>
    </div>
  )
}

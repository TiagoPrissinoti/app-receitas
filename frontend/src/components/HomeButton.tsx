import { useNavigate } from 'react-router-dom'

export function HomeButton() {
  const navigate = useNavigate()

  return (
    <button
      className="btn-home"
      onClick={() => navigate('/home')}
    >
      🏠 Voltar para Home
    </button>
  )
}

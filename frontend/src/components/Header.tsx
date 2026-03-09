import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import '../styles/layout.css'

export default function Header() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
       <Link to="/home" className="logo">
        <span className="logo-icon">🍲</span>
        <span className="logo-text">Receitas.</span>
        </Link>

        <nav className="nav">
          <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/recipes" className={({ isActive }) => isActive ? 'active' : ''}>Receitas</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>Favoritos</NavLink>
          <NavLink to="/recipes/my" className={({ isActive }) => isActive ? 'active' : ''}>Minhas</NavLink>
          
          <div className="nav-divider"></div>
          
          <button className="btn-logout" onClick={handleLogout}>
            Sair
          </button>
        </nav>
      </div>
    </header>
  )
}
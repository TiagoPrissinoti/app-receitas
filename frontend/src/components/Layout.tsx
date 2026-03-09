import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import '../styles/layout.css'

export default function Layout() {
  const location = useLocation()

  // rotas onde o header NÃO deve aparecer
  const hideHeaderRoutes = ['/']
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname)

  return (
    <div className="app-layout">
      {!shouldHideHeader && <Header />}

      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}
import '../styles/layout.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} App de Receitas</p>
    </footer>
  )
}

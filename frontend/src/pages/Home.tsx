import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import '../styles/home.css'

interface Recipe {
  id: string
  title: string
  image?: string
  prepTime: number
  servings: number
}

export function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const navigate = useNavigate()
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadTrending()
  }, [])

  async function loadTrending() {
    try {
      const response = await api.get('/recipes')
      const shuffled = response.data.sort(() => 0.5 - Math.random())
      setRecipes(shuffled.slice(0, 8))
    } catch (error) {
      console.error("Erro ao carregar receitas", error)
    }
  }

  const scroll = (offset: number) => {
    carouselRef.current?.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h2 className="section-title">Receitas em destaque</h2>
        <p className="section-subtitle">As escolhas favoritas da nossa comunidade para hoje</p>
      </header>

      <div className="carousel-wrapper">
        <button className="carousel-arrow left" onClick={() => scroll(-320)} aria-label="Anterior">
          ‹
        </button>

        <div className="trending-carousel" ref={carouselRef}>
          {recipes.map(recipe => (
            <article
              key={recipe.id}
              className="trending-card"
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              <div className="image-wrapper">
                <img
                  src={`http://localhost:3333/uploads/${recipe.image}`}
                  alt={recipe.title}
                  loading="lazy"
                />
                <div className="time-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  {recipe.prepTime} min
                </div>
              </div>

              <div className="info">
                <h3>{recipe.title}</h3>
                <div className="info-footer">
                  <span className="servings">{recipe.servings} porções</span>
                  <span className="view-recipe">Ver mais</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button className="carousel-arrow right" onClick={() => scroll(320)} aria-label="Próximo">
          ›
        </button>
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api/api'
import '../styles/recipe-details.css'

interface Recipe {
  title: string
  description: string
  ingredients: string
  image?: string
  prepTime: number
  servings: number
  user?: {
    name: string
  }
}

export function RecipeDetails() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    loadRecipe()
    window.scrollTo(0, 0)
  }, [id])

  async function loadRecipe() {
    try {
      const response = await api.get(`/recipes/${id}`)
      setRecipe(response.data)
    } catch (error) {
      console.error("Erro ao carregar receita")
    }
  }

  if (!recipe) return <div className="loading">Carregando...</div>

  const ingredientsArray = recipe.ingredients.split('\n').filter(i => i.trim() !== '')
  const stepsArray = recipe.description.split('\n').filter(s => s.trim() !== '')

  const imageUrl = `http://api-receitas-wtb0.onrender.com/uploads/${recipe.image}`;

  return (
    <div className="recipe-details-wrapper fade-in">
      <div className="details-header">
        {/* Adicionado style inline para o efeito de fundo (Blur) */}
        <div 
          className="details-image" 
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <img
            src={imageUrl}
            alt={recipe.title}
          />
          <div className="image-overlay"></div>
        </div>
        
        {/* Este card agora tem z-index: 10 no CSS */}
        <div className="details-title-card">
          <h1>{recipe.title}</h1>
          <div className="details-meta">
            <div className="meta-badge">⏱ {recipe.prepTime} min</div>
            <div className="meta-badge">🍽 {recipe.servings} pessoas</div>
            <div className="meta-badge author">👨‍🍳 {recipe.user?.name}</div>
          </div>
        </div>
      </div>

      <div className="details-content">
        <section className="ingredients-section slide-up">
          <h3>🧂 Ingredientes</h3>
          <ul className="ingredients-list">
            {ingredientsArray.map((item, index) => (
              <li key={index}>
                <span className="dot"></span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="description-section slide-up">
          <h3>👩‍🍳 Modo de preparo</h3>
          <div className="steps-list">
            {stepsArray.map((step, index) => (
              <div key={index} className="step-item">
                <span className="step-number">{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
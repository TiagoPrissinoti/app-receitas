import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import { useAuth } from '../auth/AuthContext'
import '../styles/recipes.css'

interface Recipe {
  id: string
  title: string
  image?: string
  userId: string
  isFavorite: boolean
  user?: {
    name: string
    prepTime: string
  servings: number
  }
}

export function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [search, setSearch] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  async function loadRecipes(query?: string) {
    const response = await api.get('/recipes', {
      params: query ? { search: query } : {},
    })
    setRecipes(response.data)
  }

  useEffect(() => {
    loadRecipes()
  }, [])

  useEffect(() => {
    const delay = setTimeout(() => {
      loadRecipes(search)
    }, 400)

    return () => clearTimeout(delay)
  }, [search])

  async function toggleFavorite(id: string) {
    try {
      await api.post(`/recipes/${id}/favorite`)
      loadRecipes(search)
    } catch (error) {
      console.error('Erro ao favoritar:', error)
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Deseja realmente deletar esta receita?')) return
    await api.delete(`/recipes/${id}`)
    setRecipes(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div className="page-container">
      {/* 🔍 Busca */}
      <div className="search-container">
        <input
          placeholder="🔍 Buscar por título ou ingrediente..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* 📦 Catálogo */}
      <div className="recipes-grid">
        {recipes.length === 0 && (
          <p className="empty">Nenhuma receita encontrada 😢</p>
        )}

        {recipes.map(recipe => {
          const canEdit = recipe.userId === user?.id
          const canDelete = user?.role === 'ADMIN'

          return (
            <div key={recipe.id} className="recipe-card">
              {recipe.image && (
                <img
                  src={`http://api-receitas-wtb0.onrender.com/uploads/${recipe.image}`}
                  alt={recipe.title}
                  className="recipe-image"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                />
              )}

              <h3 onClick={() => navigate(`/recipes/${recipe.id}`)}>
                {recipe.title}
              </h3>

              <p className="author">
                Criado por: {recipe.user?.name ?? 'Usuário'}
              </p>

              <div className="recipe-actions">
                <button
                  className="btn-view"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                >
                  Ver receita
                </button>

                {canEdit && (
                  <button
                    className="btn-edit"
                    onClick={() =>
                      navigate(`/recipes/edit/${recipe.id}`)
                    }
                  >
                    ✏️
                  </button>
                )}

                {canDelete && (
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(recipe.id)}
                  >
                    🗑️
                  </button>
                )}

                <button
                  onClick={() => toggleFavorite(recipe.id)}
                  className="btn-fav"
                  title="Favoritar"
                >
                  {recipe.isFavorite ? '💔' : '💖'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

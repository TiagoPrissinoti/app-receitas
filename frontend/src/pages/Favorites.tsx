import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import '../styles/recipes.css'

interface Recipe {
  id: string
  title: string
  image?: string // Adicionado para exibir a foto
  user?: {
    name: string
  }
}

export function Favorites() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const navigate = useNavigate()

  async function loadFavorites() {
    try {
      const response = await api.get('/favorites')
      setRecipes(response.data)
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error)
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  // ✅ REMOVE DOS FAVORITOS
  async function removeFavorite(id: string) {
    try {
      await api.post(`/recipes/${id}/favorite`)
      setRecipes(prev => prev.filter(recipe => recipe.id !== id))
    } catch (error) {
      console.error('Erro ao remover favorito:', error)
    }
  }

  return (
    <div className="page-container">
      <header className="header-pages" style={{ marginBottom: '30px' }}>
        <h1>💖 Receitas Favoritas</h1>
      </header>

      {recipes.length === 0 ? (
        <p className="empty" style={{ textAlign: 'center', marginTop: '50px' }}>
          Nenhuma receita favoritada ainda. 😢
        </p>
      ) : (
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              {/* Imagem da Receita */}
              {recipe.image && (
                <img
                  src={`http://api-receitas-wtb0.onrender.com/uploads/${recipe.image}`}
                  alt={recipe.title}
                  className="recipe-image"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                  style={{ cursor: 'pointer' }}
                />
              )}

              <div className="recipe-card-content" style={{ padding: '15px' }}>
                <h3 
                  onClick={() => navigate(`/recipes/${recipe.id}`)} 
                  style={{ cursor: 'pointer' }}
                >
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

                  {/* Botão de Coração para desfavoritar */}
                  <button
                    className="btn-fav"
                    onClick={() => removeFavorite(recipe.id)}
                    title="Remover dos favoritos"
                    style={{ background: '#fff0f0', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    💔
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
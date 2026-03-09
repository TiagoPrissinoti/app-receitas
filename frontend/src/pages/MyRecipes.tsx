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
  user?: {
    name: string
  }
}

export function MyRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const navigate = useNavigate()
  // Chamamos o user aqui
  const { user } = useAuth() 

  useEffect(() => {
    api.get('/recipes/me').then(res => setRecipes(res.data))
  }, [])

  async function handleDelete(id: string) {
    if (!window.confirm('Deseja realmente deletar esta receita?')) return
    try {
      await api.delete(`/recipes/${id}`)
      setRecipes(prev => prev.filter(recipe => recipe.id !== id))
    } catch (error) {
      console.error("Erro ao deletar", error)
    }
  }

  return (
    <div className="page-container">
      <header className="header-pages" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>📌 Minhas Receitas</h1>
        <div className="header-actions" style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={() => navigate('/recipes')}>
            Todas as Receitas
          </button>
          <button className="btn-primary" onClick={() => navigate('/recipes/create')} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            + Nova Receita
          </button>
        </div>
      </header>

      {recipes.length === 0 && (
        <p className="empty" style={{ textAlign: 'center', marginTop: '50px' }}>
          Você ainda não criou nenhuma receita. 😢
        </p>
      )}

      <div className="recipes-grid">
        {recipes.map(recipe => {
          // AQUI usamos o 'user' para validar a exclusão (resolve o erro do TS)
          // Dono da receita OU Admin podem deletar
          const canDelete = recipe.userId === user?.id || user?.role === 'ADMIN'

          return (
            <div key={recipe.id} className="recipe-card">
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
                <h3 onClick={() => navigate(`/recipes/${recipe.id}`)} style={{ cursor: 'pointer' }}>
                  {recipe.title}
                </h3>

                <p className="author">
                  Criado por: {recipe.user?.name ?? 'Você'}
                </p>

                <div className="recipe-actions">
                  <button
                    className="btn-view"
                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                  >
                    Ver receita
                  </button>

                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/recipes/edit/${recipe.id}`)}
                  >
                    ✏️
                  </button>

                  {/* Agora o canDelete usa a variável 'user' */}
                  {canDelete && (
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
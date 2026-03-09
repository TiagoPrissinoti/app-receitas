import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/api'
import '../styles/edit-recipe.css'
import { HomeButton } from '../components/HomeButton'

export function EditRecipe() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')

  useEffect(() => {
    api.get(`/recipes/${id}`).then(res => {
      setTitle(res.data.title)
      setDescription(res.data.description)
      setIngredients(res.data.ingredients)
    })
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    await api.put(`/recipes/${id}`, {
      title,
      description,
      ingredients,
    })

    alert('Receita atualizada com sucesso!')
    navigate('/recipes')
  }

  return (
    <div className="edit-recipe-container">
      <HomeButton />
      <form className="edit-recipe-form" onSubmit={handleSubmit}>
        <h1>✏️ Editar Receita</h1>

        <label>
          Título
          <input
            placeholder="Título da receita"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>

        <label>
          Modo de preparo
          <textarea
            placeholder="Descrição da receita"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>

        <label>
          Ingredientes
          <textarea
            placeholder="Ex: 2 ovos, 1 xícara de farinha..."
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
          />
        </label>

        <div className="buttons">
          <button type="submit" className="save">
            💾 Salvar
          </button>

          <button
            type="button"
            className="cancel"
            onClick={() => navigate('/recipes')}
          >
            ↩ Voltar
          </button>
        </div>
      </form>
    </div>
  )
}
import { useState } from 'react'
import { api } from '../api/api'
import '../styles/form.css'
import { HomeButton } from '../components/HomeButton'


export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [prepTime, setPrepTime] = useState('')
const [servings, setServings] = useState('')


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('ingredients', ingredients)
  formData.append('prepTime', prepTime)
  formData.append('servings', servings)

    if (image) {
      formData.append('image', image)
    }

    try {
      // ❌ NÃO definir Content-Type manualmente
      await api.post('/recipes', formData)

      alert('Receita criada com sucesso!')

      setTitle('')
      setDescription('')
      setIngredients('')
      setImage(null)
      setPrepTime('')
      setServings('')

    } catch (error) {
      console.error(error)
      alert('Erro ao criar receita')
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <HomeButton />
      <h1>Criar Receita</h1>

      <input
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Modo de preparo"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <textarea
        placeholder="Ingredientes"
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
        required
      />

<input
  type="number"
  placeholder="Tempo de preparo (min)"
  value={prepTime}
  onChange={e => setPrepTime(e.target.value)}
  min={1}
  required
/>

<input
  type="number"
  placeholder="Serve quantas pessoas?"
  value={servings}
  onChange={e => setServings(e.target.value)}
  min={1}
  required
/>

      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files?.[0] ?? null)}
      />

      <button type="submit">Salvar</button>
    </form>
  )
}

import './recipe-card.css'

interface Props {
  title: string
  image: string
  author: string
}

export function RecipeCard({ title, image, author }: Props) {
  return (
    <div className="recipe-card">
      <div className="recipe-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="recipe-card-content">
        <h3>{title}</h3>
        <p><span>Por</span> {author}</p>
      </div>
    </div>
  )
}
import express from 'express'
import cors from 'cors'
import favoriteRoutes from './routes/favorite.routes'
import authRoutes from './routes/auth.routes'
import recipeRoutes from './routes/recipe.routes'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/recipes', recipeRoutes)


app.use(favoriteRoutes)

app.use(
  '/uploads',
  express.static(path.resolve(__dirname, '..', 'uploads'))
)   
export { app }

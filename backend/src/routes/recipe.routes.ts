import { Router } from 'express'
import {
  createRecipe,
  listRecipes,
  myRecipes,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
} from '../controllers/recipe.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { upload } from '../config/upload'

const recipeRoutes = Router()

recipeRoutes.get('/', listRecipes)
recipeRoutes.get('/me', authMiddleware, myRecipes)
recipeRoutes.get('/:id', getRecipeById)

// ✅ APENAS UMA ROTA POST, COM MULTER
recipeRoutes.post(
  '/',
  authMiddleware,
  upload.single('image'),
  createRecipe
)

recipeRoutes.put('/:id', authMiddleware, updateRecipe)
recipeRoutes.delete('/:id', authMiddleware, deleteRecipe)

export default recipeRoutes

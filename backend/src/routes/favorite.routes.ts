import { Router } from 'express'
import { toggleFavorite, listFavorites } from '../controllers/favorite.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const favoriteRoutes = Router()

favoriteRoutes.get('/favorites', authMiddleware, listFavorites)

favoriteRoutes.post(
  '/recipes/:id/favorite',
  authMiddleware,
  toggleFavorite
)

export default favoriteRoutes


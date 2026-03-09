import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

/* =======================
   TOGGLE FAVORITE
======================= */
export async function toggleFavorite(
  req: Request,
  res: Response
) {
  const recipeId = String(req.params.id)
  const userId = req.user!.sub

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
  })

  if (!recipe) {
    return res
      .status(404)
      .json({ message: 'Receita não encontrada' })
  }

  const favoriteExists = await prisma.favorite.findUnique({
    where: {
      userId_recipeId: {
        userId,
        recipeId,
      },
    },
  })

  if (favoriteExists) {
    await prisma.favorite.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    })

    return res.json({ isFavorite: false })
  }

  await prisma.favorite.create({
    data: {
      userId,
      recipeId,
    },
  })

  return res.json({ isFavorite: true })
}

/* =======================
   LIST FAVORITES
======================= */
export async function listFavorites(
  req: Request,
  res: Response
) {
  const userId = req.user!.sub

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      recipe: {
        include: {
          user: {
            select: { name: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return res.json(
    favorites.map(fav => ({
      ...fav.recipe,
      isFavorite: true,
    }))
  )
}

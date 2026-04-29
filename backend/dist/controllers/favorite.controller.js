"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleFavorite = toggleFavorite;
exports.listFavorites = listFavorites;
const prisma_1 = require("../lib/prisma");
/* =======================
   TOGGLE FAVORITE
======================= */
async function toggleFavorite(req, res) {
    const recipeId = String(req.params.id);
    const userId = req.user.sub;
    const recipe = await prisma_1.prisma.recipe.findUnique({
        where: { id: recipeId },
    });
    if (!recipe) {
        return res
            .status(404)
            .json({ message: 'Receita não encontrada' });
    }
    const favoriteExists = await prisma_1.prisma.favorite.findUnique({
        where: {
            userId_recipeId: {
                userId,
                recipeId,
            },
        },
    });
    if (favoriteExists) {
        await prisma_1.prisma.favorite.delete({
            where: {
                userId_recipeId: {
                    userId,
                    recipeId,
                },
            },
        });
        return res.json({ isFavorite: false });
    }
    await prisma_1.prisma.favorite.create({
        data: {
            userId,
            recipeId,
        },
    });
    return res.json({ isFavorite: true });
}
/* =======================
   LIST FAVORITES
======================= */
async function listFavorites(req, res) {
    const userId = req.user.sub;
    const favorites = await prisma_1.prisma.favorite.findMany({
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
    });
    return res.json(favorites.map(fav => ({
        ...fav.recipe,
        isFavorite: true,
    })));
}
//# sourceMappingURL=favorite.controller.js.map
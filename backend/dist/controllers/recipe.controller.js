"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipe = createRecipe;
exports.listRecipes = listRecipes;
exports.myRecipes = myRecipes;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
exports.getRecipeById = getRecipeById;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
/* =======================
   SCHEMAS (SEM IMAGE)
======================= */
const createRecipeSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().min(10),
    ingredients: zod_1.z.string().min(5),
    prepTime: zod_1.z.coerce.number().min(1),
    servings: zod_1.z.coerce.number().min(1),
});
const updateRecipeSchema = createRecipeSchema.partial();
/* =======================
   CREATE (COM IMAGEM)
======================= */
async function createRecipe(req, res) {
    try {
        const data = createRecipeSchema.parse(req.body);
        const image = req.file ? req.file.filename : null;
        const recipe = await prisma_1.prisma.recipe.create({
            data: {
                ...data,
                image,
                userId: req.user.sub,
            },
        });
        return res.status(201).json(recipe);
    }
    catch (error) {
        return res.status(400).json({ message: 'Dados inválidos', error });
    }
}
/* =======================
   LIST ALL (COM FAVORITO + IMAGE)
======================= */
async function listRecipes(req, res) {
    const userId = req.user?.sub;
    const search = req.query.search?.toString();
    const recipes = await prisma_1.prisma.recipe.findMany({
        where: search
            ? {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        ingredients: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                ],
            }
            : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: { name: true },
            },
            favorites: userId
                ? {
                    where: { userId },
                }
                : false,
        },
    });
    const formatted = recipes.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        prepTime: recipe.prepTime, // ✅
        servings: recipe.servings, // ✅
        image: recipe.image,
        userId: recipe.userId,
        user: recipe.user,
        isFavorite: recipe.favorites?.length > 0,
    }));
    return res.json(formatted);
}
/* =======================
   LIST MY RECIPES
======================= */
async function myRecipes(req, res) {
    const recipes = await prisma_1.prisma.recipe.findMany({
        where: {
            userId: req.user.sub,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return res.json(recipes);
}
/* =======================
   UPDATE (COM IMAGEM)
======================= */
async function updateRecipe(req, res) {
    try {
        const id = String(req.params.id);
        const data = updateRecipeSchema.parse(req.body);
        const recipe = await prisma_1.prisma.recipe.findUnique({
            where: { id },
        });
        if (!recipe) {
            return res.status(404).json({ message: 'Receita não encontrada' });
        }
        if (recipe.userId !== req.user.sub && req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Sem permissão' });
        }
        const image = req.file ? req.file.filename : undefined;
        const updated = await prisma_1.prisma.recipe.update({
            where: { id },
            data: {
                ...data,
                ...(image && { image }),
            },
        });
        return res.json(updated);
    }
    catch (error) {
        return res.status(400).json({ message: 'Dados inválidos', error });
    }
}
/* =======================
   DELETE
======================= */
async function deleteRecipe(req, res) {
    const id = String(req.params.id);
    const recipe = await prisma_1.prisma.recipe.findUnique({
        where: { id },
    });
    if (!recipe) {
        return res.status(404).json({ message: 'Receita não encontrada' });
    }
    if (recipe.userId !== req.user.sub && req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Sem permissão' });
    }
    await prisma_1.prisma.recipe.delete({
        where: { id },
    });
    return res.status(204).send();
}
/* =======================
   GET BY ID (COM IMAGE + FAVORITO)
======================= */
async function getRecipeById(req, res) {
    const id = String(req.params.id);
    const userId = req.user?.sub;
    const recipe = await prisma_1.prisma.recipe.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
            favorites: userId
                ? {
                    where: { userId },
                }
                : false,
        },
    });
    if (!recipe) {
        return res.status(404).json({ message: 'Receita não encontrada' });
    }
    return res.json({
        ...recipe,
        isFavorite: recipe.favorites?.length > 0,
        favorites: undefined,
    });
}
//# sourceMappingURL=recipe.controller.js.map
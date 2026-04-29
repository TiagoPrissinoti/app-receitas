"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_controller_1 = require("../controllers/recipe.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const upload_1 = require("../config/upload");
const recipeRoutes = (0, express_1.Router)();
recipeRoutes.get('/', recipe_controller_1.listRecipes);
recipeRoutes.get('/me', auth_middleware_1.authMiddleware, recipe_controller_1.myRecipes);
recipeRoutes.get('/:id', recipe_controller_1.getRecipeById);
// ✅ APENAS UMA ROTA POST, COM MULTER
recipeRoutes.post('/', auth_middleware_1.authMiddleware, upload_1.upload.single('image'), recipe_controller_1.createRecipe);
recipeRoutes.put('/:id', auth_middleware_1.authMiddleware, recipe_controller_1.updateRecipe);
recipeRoutes.delete('/:id', auth_middleware_1.authMiddleware, recipe_controller_1.deleteRecipe);
exports.default = recipeRoutes;
//# sourceMappingURL=recipe.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorite_controller_1 = require("../controllers/favorite.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const favoriteRoutes = (0, express_1.Router)();
favoriteRoutes.get('/favorites', auth_middleware_1.authMiddleware, favorite_controller_1.listFavorites);
favoriteRoutes.post('/recipes/:id/favorite', auth_middleware_1.authMiddleware, favorite_controller_1.toggleFavorite);
exports.default = favoriteRoutes;
//# sourceMappingURL=favorite.routes.js.map
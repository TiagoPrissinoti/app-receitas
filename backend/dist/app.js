"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const favorite_routes_1 = __importDefault(require("./routes/favorite.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const recipe_routes_1 = __importDefault(require("./routes/recipe.routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
app.use('/recipes', recipe_routes_1.default);
app.use(favorite_routes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '..', 'uploads')));
//# sourceMappingURL=app.js.map
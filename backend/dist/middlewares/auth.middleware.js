"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.authMiddlewareOptional = authMiddlewareOptional;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/* =======================
   AUTH OBRIGATÓRIO
======================= */
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ message: 'Token inválido' });
    }
}
/* =======================
   AUTH OPCIONAL
======================= */
function authMiddlewareOptional(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next();
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    }
    catch {
        // token inválido → ignora
    }
    next();
}
//# sourceMappingURL=auth.middleware.js.map
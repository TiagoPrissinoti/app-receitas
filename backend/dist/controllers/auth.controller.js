"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_schema_1 = require("../schemas/auth.schema");
class AuthController {
    static async register(req, res) {
        const data = auth_schema_1.registerSchema.parse(req.body);
        const user = await auth_service_1.AuthService.register(data);
        return res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    }
    static async login(req, res) {
        const data = auth_schema_1.loginSchema.parse(req.body);
        const { token, user } = await auth_service_1.AuthService.login(data);
        return res.json({
            token,
            user
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
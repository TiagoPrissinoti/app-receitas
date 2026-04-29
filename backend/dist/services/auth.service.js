"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static async register(data) {
        const userExists = await prisma_1.prisma.user.findUnique({
            where: { email: data.email }
        });
        if (userExists) {
            throw new Error('Email já cadastrado');
        }
        const passwordHash = await bcrypt_1.default.hash(data.password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: passwordHash,
                role: 'USER' // ✅ padrão
            }
        });
        return user;
    }
    static async login(data) {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email: data.email }
        });
        if (!user) {
            throw new Error('Credenciais inválidas');
        }
        const passwordMatch = await bcrypt_1.default.compare(data.password, user.password);
        if (!passwordMatch) {
            throw new Error('Credenciais inválidas');
        }
        const token = jsonwebtoken_1.default.sign({
            role: user.role,
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '1d',
        });
        // ✅ AGORA RETORNA TUDO QUE O FRONT PRECISA
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
            },
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
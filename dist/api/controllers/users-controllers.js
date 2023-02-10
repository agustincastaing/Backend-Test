"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const authorization_middleware_1 = __importDefault(require("./../middlewares/authorization-middleware"));
const Roles_1 = __importDefault(require("./../core/common/Roles"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let UserController = class UserController extends inversify_express_utils_1.BaseHttpController {
    constructor() {
        super();
    }
    clients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.json({ data: 1 });
            }
            catch (err) {
                return err;
            }
        });
    }
    getDeactivatedUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deactivatedUsers = yield prisma.user.findMany({ where: { active: false } });
                return res.status(200).json({ deactivated_users: deactivatedUsers });
            }
            catch (err) {
                return res.status(400).json({ error: err });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            if (userId) {
                try {
                    const user = yield prisma.user.findMany({ where: { id: userId } });
                    user.length === 0 ? res.status(200).json({ error: `No user with ID "${userId}"` }) : res.status(200).json({ userID: user });
                    return;
                }
                catch (err) {
                    return res.status(400).json({ error: err });
                }
            }
            else {
                try {
                    const users = yield prisma.user.findMany({ where: { active: true } });
                    return res.status(200).json({ allUsers: users });
                }
                catch (error) {
                    return res.status(400).json({ error: error });
                }
            }
        });
    }
    postUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            try {
                const insert = yield prisma.user.create({ data: newUser });
                return res.status(200).json({ Hecho: insert });
            }
            catch (error) {
                return res.status(400).json({ error: error });
            }
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)("/clients/:id?", (0, authorization_middleware_1.default)([Roles_1.default.SUPERADMIN, Roles_1.default.ADMIN, Roles_1.default.PRODUCTOR])),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "clients", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/deactivated"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDeactivatedUsers", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id?"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "postUser", null);
UserController = __decorate([
    (0, inversify_express_utils_1.controller)("/users"),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;

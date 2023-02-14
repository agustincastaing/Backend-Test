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
exports.getUserId = exports.signUp = exports.UserController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const authorization_middleware_1 = __importDefault(require("./../middlewares/authorization-middleware"));
const Roles_1 = __importDefault(require("./../core/common/Roles"));
const user_repository_prisma_1 = require("@api/repository/user.repository.prisma");
Object.defineProperty(exports, "getUserId", { enumerable: true, get: function () { return user_repository_prisma_1.getUserId; } });
Object.defineProperty(exports, "signUp", { enumerable: true, get: function () { return user_repository_prisma_1.signUp; } });
const environment_1 = require("@api/config/environment");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUserRegister = yield (0, user_repository_prisma_1.signUp)(req.body);
                const jwtoken = {
                    role: newUserRegister.role,
                    id: newUserRegister.id,
                };
                const token = jsonwebtoken_1.default.sign(jwtoken, environment_1.JWT_SECRET, {
                    expiresIn: "12h",
                });
                return res
                    .status(201)
                    .header("authorization", token)
                    .json({ status: 201, response: newUserRegister });
            }
            catch (err) {
                return res.status(500).json({ status: 500, response: err.message });
            }
        });
    }
    getUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const findUser = yield (0, user_repository_prisma_1.getUserId)(id);
                if (!findUser)
                    return res
                        .status(404)
                        .json({ status: 404, response: "Not found" });
                return res
                    .status(200)
                    .json({ status: 200, response: findUser });
            }
            catch (err) {
                return res.status(500).json({ status: 500, response: err.message });
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
    (0, inversify_express_utils_1.httpPost)("/signup"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserId", null);
UserController = __decorate([
    (0, inversify_express_utils_1.controller)("/users"),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;

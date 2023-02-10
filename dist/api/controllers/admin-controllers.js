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
exports.adminController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const authorization_middleware_1 = __importDefault(require("../middlewares/authorization-middleware"));
const Roles_1 = __importDefault(require("../core/common/Roles"));
const admin_repository_prisma_1 = require("../respositoty/admin.repository.prisma");
let adminController = class adminController extends inversify_express_utils_1.BaseHttpController {
    constructor() {
        super();
    }
    clientsAllActivate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientsActivate = yield (0, admin_repository_prisma_1.allClientsActivate)();
                return res.status(200).json({ status: 200, response: clientsActivate });
            }
            catch (err) {
                return res.status(500).json({ status: 500, response: err.message });
            }
        });
    }
    clientsAllDeactivated(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientsDeactivated = yield (0, admin_repository_prisma_1.allClientsDeactivated)();
                return res
                    .status(200)
                    .json({ status: 200, response: clientsDeactivated });
            }
            catch (err) {
                return res.status(500).json({ status: 500, response: err.message });
            }
        });
    }
    clients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield (0, admin_repository_prisma_1.allClients)();
                return res.status(200).json({ status: 200, response: clients });
            }
            catch (err) {
                return res.status(500).json({ status: 500, response: err.message });
            }
        });
    }
    client(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const findUser = yield (0, admin_repository_prisma_1.searchByUserId)(id);
                if (!findUser)
                    return res.status(404).json({ status: 404, response: "user no found" });
                return res.status(200).json({ status: 200, response: findUser });
            }
            catch (err) {
                return res.status(500).json({ status: 500, response: err.message });
            }
        });
    }
    activateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const changeStatusClient = yield (0, admin_repository_prisma_1.setActiveClient)(id);
                if (!changeStatusClient)
                    return res.status(404).json({ status: 404, response: "user no found" });
                return res.status(201).json({
                    status: 201,
                    response: `the user with the id ${id} has been activated`,
                });
            }
            catch (err) {
                return res.status(500).json({ status: 500, response: err.message });
            }
        });
    }
    disableClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const changeStatusClient = yield (0, admin_repository_prisma_1.setDisableClient)(id);
                if (!changeStatusClient)
                    return res.status(404).json({ status: 404, response: "user no found" });
                return res.status(201).json({
                    status: 201,
                    response: `the user with the id ${id} has been deactivated`,
                });
            }
            catch (err) {
                return res.status(500).json({ status: 500, response: err.message });
            }
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)("/find/clients/activate", (0, authorization_middleware_1.default)([Roles_1.default.SUPERADMIN, Roles_1.default.ADMIN])),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], adminController.prototype, "clientsAllActivate", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/find/clients/deactivated", (0, authorization_middleware_1.default)([Roles_1.default.SUPERADMIN, Roles_1.default.ADMIN])),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], adminController.prototype, "clientsAllDeactivated", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/find/clients", (0, authorization_middleware_1.default)([Roles_1.default.SUPERADMIN, Roles_1.default.ADMIN])),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], adminController.prototype, "clients", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/find/clients/:id", (0, authorization_middleware_1.default)([Roles_1.default.SUPERADMIN, Roles_1.default.ADMIN])),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], adminController.prototype, "client", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/activate_client/:id", (0, authorization_middleware_1.default)([Roles_1.default.SUPERADMIN, Roles_1.default.ADMIN])),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], adminController.prototype, "activateClient", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/disable_client/:id", (0, authorization_middleware_1.default)([Roles_1.default.SUPERADMIN, Roles_1.default.ADMIN])),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], adminController.prototype, "disableClient", null);
adminController = __decorate([
    (0, inversify_express_utils_1.controller)("/admin"),
    __metadata("design:paramtypes", [])
], adminController);
exports.adminController = adminController;

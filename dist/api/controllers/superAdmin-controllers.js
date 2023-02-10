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
exports.SuperAdminController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const authorization_middleware_1 = __importDefault(require("../middlewares/authorization-middleware"));
const Roles_1 = __importDefault(require("../core/common/Roles"));
const superAdmin_repository_prisma_1 = require("../respositoty/superAdmin.repository.prisma");
const validation_middleware_superAdmin_1 = require("../middlewares/validation-middleware-superAdmin");
let SuperAdminController = class SuperAdminController extends inversify_express_utils_1.BaseHttpController {
    constructor() {
        super();
    }
    setRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                yield (0, superAdmin_repository_prisma_1.setRoles)(body.id, body.role);
                return res.status(201).json({
                    status: 201,
                    response: `The user with the id ${body.id} was changed the role to ${body.role}`,
                });
            }
            catch (err) {
                return res.status(500).json({ status: 500, response: err.message });
            }
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpPut)("/set_role", (0, authorization_middleware_1.default)([Roles_1.default.CLIENT]), validation_middleware_superAdmin_1.validationSetRoleMide //OJO LO PUSE POR TESTING, VA ASI -->> [Roles.SUPERADMIN]
    ),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperAdminController.prototype, "setRoles", null);
SuperAdminController = __decorate([
    (0, inversify_express_utils_1.controller)("/superadmin"),
    __metadata("design:paramtypes", [])
], SuperAdminController);
exports.SuperAdminController = SuperAdminController;

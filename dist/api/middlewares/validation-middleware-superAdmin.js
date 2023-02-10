"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSetRoleMide = void 0;
const superAdmin_validation_1 = require("../validation/superAdmin.validation");
const superAdmin_repository_prisma_1 = require("../respositoty/superAdmin.repository.prisma");
const validationSetRoleMide = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, superAdmin_validation_1.validationSetRole)(req.body))
            return res
                .status(400)
                .json({ status: 400, response: "missing data for role change" });
        const IsSuperAdmin = yield (0, superAdmin_repository_prisma_1.isNotSuperAdmin)(req.body.id);
        if (IsSuperAdmin)
            return res.status(400).json({
                status: 400,
                response: "The Role of the SuperAdmin cannot be changed",
            });
        next();
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            response: err.message,
        });
    }
});
exports.validationSetRoleMide = validationSetRoleMide;

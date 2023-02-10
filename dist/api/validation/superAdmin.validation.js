"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSetRole = void 0;
const Roles_1 = __importDefault(require("../core/common/Roles"));
const validationSetRole = (body) => {
    if (!body.id || !body.role)
        return true;
    const { id, role } = body;
    if (typeof id !== "string")
        return true;
    if (typeof role !== "string")
        return true;
    const keysRoles = Object.keys(Roles_1.default);
    const findRole = keysRoles.find((rol) => rol === role);
    if (!findRole)
        return true;
    return false;
};
exports.validationSetRole = validationSetRole;

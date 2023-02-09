"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const environment_1 = require("../config/environment");
const verifyAuthToken = (token) => {
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    return jwt.verify(token, environment_1.JWT_SECRET);
};
exports.verifyAuthToken = verifyAuthToken;
const Authorize = (roles) => {
    return (req, res, next) => {
        if (!req.headers.authorization)
            return res.status(403).json({ status: 403, message: 'Unauthorized' });
        let token = req.headers.authorization;
        let user;
        try {
            user = (0, exports.verifyAuthToken)(token);
        }
        catch (err) {
            return res.status(403).json({ status: 403, message: 'Unauthorized' });
        }
        if (!user)
            return res.status(403).json({ status: 403, message: 'Unauthorized' });
        if (roles && roles.length && !roles.includes(user.role)) {
            return res.status(403).json({ status: 403, message: 'Unauthorized' });
        }
        req.user = user;
        next();
    };
};
exports.default = Authorize;

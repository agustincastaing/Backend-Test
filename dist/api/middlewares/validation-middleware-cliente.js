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
exports.validationSignIn = exports.validationSignUp = void 0;
const user_repository_prisma_1 = require("../respositoty/user.repository.prisma");
const user_validation_1 = __importStar(require("../validation/user.validation"));
const validationSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isARepeatCustomer = yield (0, user_repository_prisma_1.repeatCustomerByEmail)(req.body["email"]);
        if (isARepeatCustomer)
            return res
                .status(400)
                .json({ status: 400, response: "the client is already registered" });
        if ((0, user_validation_1.default)(req.body)) {
            return res.status(400).json({
                status: 400,
                response: "the data of the new client is incorrect",
            });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            status: 500,
            response: err.message,
        });
    }
});
exports.validationSignUp = validationSignUp;
const validationSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if ((0, user_validation_1.isNotEmail)(email))
        return res
            .status(400)
            .json({ status: 400, response: "wrong email or password" });
    if ((0, user_validation_1.isNotPassword)(password))
        return res
            .status(400)
            .json({ status: 400, response: "wrong email or password" });
    next();
});
exports.validationSignIn = validationSignIn;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileClient = exports.signIn = exports.repeatCustomerByEmail = exports.signUp = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs")); /*  es una libreria que  encripta la contraseña, lo use al momento de
en la funcion singUp y singIn
*/
const signUp = (newClient) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const encryptedPassword = yield bcryptjs_1.default.hash(newClient.password, 10);
        const newClientandPassword = Object.assign(Object.assign({}, newClient), { password: encryptedPassword });
        const prismaUser = yield database_1.default.user.create({
            data: newClientandPassword,
        });
        const outPassword = {
            firstName: prismaUser.firstName,
            email: prismaUser.email,
            id: prismaUser.id,
            role: prismaUser.role,
        };
        return outPassword;
    }
    catch (error) {
        throw new Error("error when requesting sign up");
    }
});
exports.signUp = signUp;
const repeatCustomerByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientRepeat = yield database_1.default.user.findUnique({
            where: { email },
        });
        return Boolean(clientRepeat);
    }
    catch (error) {
        throw new Error("customer search email failed");
    }
});
exports.repeatCustomerByEmail = repeatCustomerByEmail;
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield database_1.default.user.findUnique({
            where: { email },
            select: {
                email: true,
                id: true,
                firstName: true,
                password: true,
                role: true,
            },
        });
        if (!client)
            return false;
        const { password: passwordComparate } = client;
        const validationPassword = yield bcryptjs_1.default.compare(password, passwordComparate);
        if (!validationPassword)
            return false;
        const userSingIn = {
            id: client.id,
            email: client.email,
            firstName: client.firstName,
            role: client.role,
        };
        return userSingIn;
    }
    catch (error) {
        throw new Error("error when requesting data to Sign In");
    }
});
exports.signIn = signIn;
const profileClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileClientPrisma = yield database_1.default.user.findUnique({
            where: { id },
            select: {
                firstName: true,
                birth_date: true,
                email: true,
            },
        });
        if (!profileClientPrisma)
            return false;
        return profileClientPrisma;
    }
    catch (error) {
        throw new Error("errot search Profile");
    }
});
exports.profileClient = profileClient;

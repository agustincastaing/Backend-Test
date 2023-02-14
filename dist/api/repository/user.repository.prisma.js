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
exports.signUp = void 0;
const database_1 = __importDefault(require("../config/database"));
const bcrypt_ts_1 = require("bcrypt-ts");
const joi_1 = __importDefault(require("@hapi/joi"));
const validateinput = joi_1.default.object({
    email: joi_1.default.string().min(6).max(255).required().email(),
    password: joi_1.default.string().min(6).max(1024).required(),
});
const signUp = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = validateinput.validate(userData);
        if (error) {
            throw new Error(error.details[0].message);
        }
        //hasheamos password
        let salt = (0, bcrypt_ts_1.genSaltSync)(10);
        let passwordHash = (0, bcrypt_ts_1.hashSync)(userData.password, salt);
        const newUser = yield database_1.default.user.create({
            data: {
                firstName: userData.firstName,
                email: userData.email,
                password: passwordHash,
                birth_date: userData.birth_date,
            },
        });
        return newUser;
    }
    catch (error) {
        throw new Error(error.details[0].message);
    }
});
exports.signUp = signUp;

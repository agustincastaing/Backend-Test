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
exports.searchByUserId = exports.allClientsActivate = exports.allClientsDeactivated = exports.allClients = exports.setDisableClient = exports.setActiveClient = void 0;
const database_1 = __importDefault(require("../config/database"));
const setActiveClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.user.update({
            where: {
                id,
            },
            data: {
                active: true,
            },
        });
        database_1.default.$disconnect();
        return true;
    }
    catch (error) {
        throw new Error("server error");
    }
});
exports.setActiveClient = setActiveClient;
const setDisableClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.user.update({
            where: {
                id,
            },
            data: {
                active: false,
            },
        });
        database_1.default.$disconnect();
        return true;
    }
    catch (error) {
        throw new Error("server error");
    }
});
exports.setDisableClient = setDisableClient;
const allClients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allClientFind = yield database_1.default.user.findMany();
        database_1.default.$disconnect();
        return allClientFind;
    }
    catch (error) {
        throw new Error("server error");
    }
});
exports.allClients = allClients;
const allClientsDeactivated = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allClientFindDeactivated = yield database_1.default.user.findMany({
            where: {
                active: false,
            },
            orderBy: {
                firstName: "asc",
            },
        });
        database_1.default.$disconnect();
        return allClientFindDeactivated;
    }
    catch (error) {
        throw new Error("server error");
    }
});
exports.allClientsDeactivated = allClientsDeactivated;
const allClientsActivate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allClientFindActivate = yield database_1.default.user.findMany({
            where: {
                active: true,
            },
            orderBy: {
                firstName: "asc",
            },
        });
        database_1.default.$disconnect();
        return allClientFindActivate;
    }
    catch (error) {
        throw new Error("server error");
    }
});
exports.allClientsActivate = allClientsActivate;
const searchByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield database_1.default.user.findUnique({
            where: { id },
        });
        database_1.default.$disconnect();
        return client;
    }
    catch (error) {
        throw new Error("server error");
    }
});
exports.searchByUserId = searchByUserId;

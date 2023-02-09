"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const options = {
    swaggerDefinition: {
        info: {
            title: 'Activar REST API 2',
            version: '2.0.0',
            description: 'Documentacion de la API'
        }
    },
    apis: [path_1.default.join(__dirname, '../api/controllers/*.{ts,js}')]
};
exports.specs = (0, swagger_jsdoc_1.default)(options);

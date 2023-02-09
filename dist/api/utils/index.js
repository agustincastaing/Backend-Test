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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.errorHandler = void 0;
const exceptions_1 = require("../../exceptions");
const logger_1 = __importDefault(require("../config/logger"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const environment_1 = require("../config/environment");
const AWS = __importStar(require("aws-sdk"));
const sentry_1 = require("../config/sentry");
const s3 = new AWS.S3({
    accessKeyId: environment_1.AWS_ACCESS_KEY_ID,
    secretAccessKey: environment_1.AWS_SECRET_ACCESS_KEY
});
const errorHandler = (err, res) => {
    // exception controlada
    if (err instanceof exceptions_1.HttpException) {
        (0, sentry_1.Capture400)(err.message);
        return res
            .status(err.status)
            .json({ status: err.status, error: err.message });
    }
    logger_1.default.error(err);
    // exception interna
    if (err instanceof Error) {
        (0, sentry_1.Capture500)(err.message);
        return res
            .status(500)
            .json({ status: 500, error: "Ocurrio un error desconocido" });
    }
    // exception desconocida
    return res.status(400).send({
        errors: [{ message: "Something went wrong" }]
    });
};
exports.errorHandler = errorHandler;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, "../../../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const uploadFile = (0, multer_1.default)({
    storage
});
exports.uploadFile = uploadFile;
const serialize = (obj) => {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};

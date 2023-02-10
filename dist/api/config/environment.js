"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAL_KEY = exports.BUCKET_XML_ENDORSMENT = exports.BUCKET_XML_EMISION = exports.BUCKET_PHOTOS_QUOTES = exports.RECAPTCHA_KEY = exports.BUCKET_COD_PROD = exports.BUCKET_PROPOSALS = exports.BUCKET_REBILLINGS = exports.BUCKET_POLICIES = exports.BUCKET_PHOTOS = exports.ACTIVAR_COMPANY_CODE = exports.URL_EMITION_REQUEST = exports.URL_EMITION = exports.INIT_JOBS = exports.SHOW_API_DOCS = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_ACCESS_KEY_ID = exports.JWT_SECRET = exports.MAIL_DEFAULT_SENDER_EMAIL = exports.MAIL_DEFAULT_SENDER_NAME = exports.SMTP_PASSWORD = exports.SMTP_USER = exports.SMTP_SECURE = exports.SMTP_PORT = exports.SMTP_HOST = exports.PORT = exports.NODE_ENV = void 0;
exports.NODE_ENV = process.env["NODE_ENV"] || "";
exports.PORT = process.env["PORT"] || "";
exports.SMTP_HOST = process.env["SMTP_HOST"] || "";
exports.SMTP_PORT = process.env["SMTP_PORT"]
    ? parseInt(process.env["SMTP_PORT"])
    : 587;
exports.SMTP_SECURE = ((_a = process.env["SMTP_SECURE"]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "true";
exports.SMTP_USER = process.env["SMTP_USER"] || "";
exports.SMTP_PASSWORD = process.env["SMTP_PASSWORD"] || "";
exports.MAIL_DEFAULT_SENDER_NAME = process.env["MAIL_DEFAULT_SENDER_NAME"] || "";
exports.MAIL_DEFAULT_SENDER_EMAIL = process.env["MAIL_DEFAULT_SENDER_EMAIL"] || "";
exports.JWT_SECRET = process.env["JWT_SECRET"] || "";
exports.AWS_ACCESS_KEY_ID = process.env["AWS_ACCESS_KEY_ID"] || "";
exports.AWS_SECRET_ACCESS_KEY = process.env["AWS_SECRET_ACCESS_KEY"] || "";
exports.SHOW_API_DOCS = process.env["SHOW_API_DOCS"]
    ? process.env["SHOW_API_DOCS"]
    : false;
exports.INIT_JOBS = process.env["INIT_JOBS"]
    ? process.env["INIT_JOBS"]
    : false;
exports.URL_EMITION = process.env["URL_EMITION"] || "";
exports.URL_EMITION_REQUEST = process.env["URL_EMITION_REQUEST"] || "";
exports.ACTIVAR_COMPANY_CODE = process.env["ACTIVAR_COMPANY_CODE"] || "";
exports.BUCKET_PHOTOS = process.env["BUCKET_PHOTOS"] || "";
exports.BUCKET_POLICIES = process.env["BUCKET_POLICIES"] || "";
exports.BUCKET_REBILLINGS = process.env["BUCKET_REBILLINGS"] || "";
exports.BUCKET_PROPOSALS = process.env["BUCKET_PROPOSALS"] || "";
exports.BUCKET_COD_PROD = process.env["BUCKET_COD_PROD"] || "";
exports.RECAPTCHA_KEY = process.env["RECAPTCHA_KEY"] || "";
exports.BUCKET_PHOTOS_QUOTES = process.env["BUCKET_PHOTOS_QUOTES"] || "";
exports.BUCKET_XML_EMISION = process.env["BUCKET_XML_EMISION"] || "";
exports.BUCKET_XML_ENDORSMENT = process.env["BUCKET_XML_ENDORSMENT"] || "";
exports.CAL_KEY = process.env["CAL_KEY"] || "";

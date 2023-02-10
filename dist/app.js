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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const inversify_express_utils_1 = require("inversify-express-utils");
const cors_1 = __importDefault(require("cors"));
const inversify_config_1 = __importDefault(require("./api/config/inversify.config"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("./api/controllers");
const docs_1 = require("./api/config/docs");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const environment_1 = require("./api/config/environment");
const compression_1 = __importDefault(require("compression"));
const utils_1 = require("./api/utils");
const exceptions_1 = require("./exceptions");
const sentry_1 = require("./api/config/sentry");
const path = __importStar(require("path"));
const users_controllers_1 = require("./api/controllers/users-controllers");
const dev_envs = ['development', 'test'];
const userController = new users_controllers_1.UserController();
let server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default);
server.setConfig(app => {
    if (dev_envs.indexOf(environment_1.NODE_ENV) === -1)
        (0, sentry_1.InitSentry)(app);
    app.use((0, compression_1.default)());
    app.use((0, cors_1.default)({ origin: '*', optionsSuccessStatus: 200 }));
    app.options('*', (req, res, next) => { next(); }, (0, cors_1.default)());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.set('view engine', 'ejs');
    app.use(express_1.default.static(path.join(__dirname + '../views')));
    app.use(function (err, req, res, next) {
        return (0, utils_1.errorHandler)(err, res);
    });
});
let app = server.build();
exports.app = app;
if (environment_1.SHOW_API_DOCS)
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.specs));
app.get("/", (req, res) => res.json({ status: 'Activar REST API runing ok' }));
app.use('*', (req, res) => (0, utils_1.errorHandler)(new exceptions_1.HttpException(404, 'Resource not found'), res));

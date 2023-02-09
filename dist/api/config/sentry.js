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
exports.SendEvent = exports.Capture500 = exports.Capture400 = exports.InitSentry = void 0;
const Sentry = __importStar(require("@sentry/node"));
//ver lo de severity
const Tracing = __importStar(require("@sentry/tracing"));
const environment_1 = require("./environment");
const InitSentry = (app) => {
    Sentry.init({
        dsn: "https://659bbb76e9aa4e2b90f735b13fbb858f@o468530.ingest.sentry.io/5496482",
        environment: environment_1.NODE_ENV,
        integrations: [
            // enable HTTP calls tracing
            new Sentry.Integrations.Http({ tracing: true }),
            // enable Express.js middleware tracing
            new Tracing.Integrations.Express({ app }),
        ],
        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
    });
    app.use(Sentry.Handlers.errorHandler());
    app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler());
};
exports.InitSentry = InitSentry;
const Capture400 = (message) => {
    Sentry.captureMessage(message);
};
exports.Capture400 = Capture400;
const Capture500 = (message) => {
    Sentry.captureMessage(message);
};
exports.Capture500 = Capture500;
const SendEvent = (message) => {
    Sentry.captureEvent({ message });
};
exports.SendEvent = SendEvent;

import {Application} from "express";
import * as Sentry from "@sentry/node";
import{SeverityLevel} from "@sentry/node";
//ver lo de severity
import * as Tracing from "@sentry/tracing";
import {NODE_ENV} from "./environment";

export const InitSentry = (app: Application) => {
  Sentry.init({
    dsn: "https://659bbb76e9aa4e2b90f735b13fbb858f@o468530.ingest.sentry.io/5496482",
    environment: NODE_ENV,
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
}

export const Capture400 = (message: string) => {
  Sentry.captureMessage(message);
}

export const Capture500 = (message: string) => {
  Sentry.captureMessage(message);
}

export const SendEvent = (message: string) => {
  Sentry.captureEvent({ message })
}

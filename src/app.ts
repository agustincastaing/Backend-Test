import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { InversifyExpressServer } from "inversify-express-utils";
import cors from 'cors';
import container from "./api/config/inversify.config";
import swaggerUi from "swagger-ui-express";
import "./api/controllers";
import { specs } from "./api/config/docs";
import cookieParser from 'cookie-parser';
import {NODE_ENV, SHOW_API_DOCS} from "./api/config/environment";
import compression from 'compression';
import {errorHandler} from "./api/utils";
import {HttpException} from "./exceptions";
import {InitSentry} from "./api/config/sentry";
import * as path from 'path'

import { UserController } from './api/controllers/users-controllers';

const dev_envs = ['development','test'];

const userController = new UserController();


let server = new InversifyExpressServer(container);
server.setConfig(app => {
	if(dev_envs.indexOf(NODE_ENV) === -1) InitSentry(app)
	app.use(compression())
	app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
	app.options('*', (req, res, next) => { next(); }, cors());
	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	);
	app.use(cookieParser())
	app.use(express.json());

	app.set('view engine', 'ejs')
	app.use(express.static(path.join(__dirname + '../views')));
	
	app.use (function (err: any, req: any, res: any, next: any){
		return errorHandler(err, res);
	});
});

let app = server.build();

if(SHOW_API_DOCS) app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req: Request, res: Response) => res.json({ status: 'Activar REST API runing ok' }))
app.use('*', (req: Request, res: Response) => errorHandler(new HttpException(404, 'Resource not found'), res))


export { app };

import "reflect-metadata";
import "module-alias/register";
import * as dotenv from "dotenv";
dotenv.config();
import logger from "./api/config/logger";
//import { createConnection } from "typeorm";
import { app } from "./app";
import { initJobs } from "./jobs";
import {PORT} from "./api/config/environment";
import {INIT_JOBS} from "./api/config/environment";

const start = async () => {
	try {
		//Database.setConnection(await createConnection());
		logger.info("Backend connected to database...");
		if(INIT_JOBS){
			logger.info('CRON jobs are running...')
			initJobs()
		}
	} catch (err) {
		logger.error(err);
	}
	app.listen(3001, () => logger.info(`Server running on port 3001...`));
};

start();

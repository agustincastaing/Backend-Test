import { Response } from "express";
import { HttpException } from "../../exceptions";
import logger from "../config/logger";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from "../config/environment";
import * as AWS from "aws-sdk";
import { Capture400, Capture500 } from "../config/sentry";

const s3 = new AWS.S3({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const errorHandler = (err: Error, res: Response) => {
	// exception controlada
	if (err instanceof HttpException) {
		Capture400(err.message);
		return res
			.status(err.status)
			.json({ status: err.status, error: err.message });
	}
	logger.error(err);
	// exception interna
	if (err instanceof Error) {
		Capture500(err.message);
		return res
			.status(500)
			.json({ status: 500, error: "Ocurrio un error desconocido" });
	}
	// exception desconocida
	return res.status(400).send({
		errors: [{ message: "Something went wrong" }]
	});
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../../../uploads"));
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	}
});

const uploadFile = multer({
	storage
});

const serialize = (obj: any) => {
	let str = [];
	for (let p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	return str.join("&");
};

/* const uploadToS3 = (bucket: string, path: string, mime?: string) =>  multer({
	storage: multerS3({
		s3: s3,
		bucket,
		metadata: function(req, file: any, cb: any) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function(req: any, file, cb: any) {
			let fileName = file.originalname
			if(req.body.contentType){
				fileName += '.' + req.body.contentType.split('/')[1]
			}
			if(mime){
				fileName += '.' + mime.split('/')[1]
			}
			path = path.endsWith('/') ? path : path + '/'
			cb(null, path + Date.now() + "-" + fileName);
		}
	})
}); */


export { errorHandler, uploadFile, /* uploadToS3 */ };

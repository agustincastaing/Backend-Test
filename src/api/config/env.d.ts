declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			MONGO_URI: string;
			PORT: string;
			SMTP_HOST: string;
			//SMTP_PORT: number;
			//SMTP_SECURE: boolean;
			SMTP_USER: string;
			SMTP_PASSWORD: string;
			MAIL_DEFAULT_SENDER_EMAIL: string, 
			MAIL_DEFAULT_SENDER_NAME: string,
			JWT_SECRET: string,
			AWS_ACCESS_KEY_ID: string,
			AWS_SECRET_ACCESS_KEY: string,
			SHOW_API_DOCS: string,
			INIT_JOBS: string,
			URL_EMITION: string,
			URL_EMITION_REQUEST: string,
			ACTIVAR_COMPANY_CODE: string,
			BUCKET_PHOTOS: string,
			BUCKET_POLICIES: string,
			BUCKET_REBILLINGS: string,
			BUCKET_PROPOSALS: string,
			BUCKET_COD_PROD: string,
			RECAPTCHA_KEY: string,
			BUCKET_PHOTOS_QUOTES: string,
			BUCKET_XML_EMISION: string,
			BUCKET_XML_ENDORSMENT: string,
			CAL_KEY: string,
		}
	}
}
export { }

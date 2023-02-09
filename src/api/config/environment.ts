
export const NODE_ENV: string = process.env["NODE_ENV"];
export const PORT: string = process.env["PORT"];
export const SMTP_HOST: string = process.env["SMTP_HOST"];
export const SMTP_PORT: number = process.env["SMTP_PORT"] ? parseInt(process.env["SMTP_PORT"]) : 587;
export const SMTP_SECURE: boolean = process.env["SMTP_SECURE"]?.toLowerCase() === 'true';
export const SMTP_USER: string = process.env["SMTP_USER"];
export const SMTP_PASSWORD: string = process.env["SMTP_PASSWORD"];
export const MAIL_DEFAULT_SENDER_NAME: string = process.env["MAIL_DEFAULT_SENDER_NAME"];
export const MAIL_DEFAULT_SENDER_EMAIL: string = process.env["MAIL_DEFAULT_SENDER_EMAIL"];
export const JWT_SECRET: string = process.env["JWT_SECRET"];
export const AWS_ACCESS_KEY_ID: string = process.env["AWS_ACCESS_KEY_ID"];
export const AWS_SECRET_ACCESS_KEY: string = process.env["AWS_SECRET_ACCESS_KEY"];
export const SHOW_API_DOCS: string | boolean = process.env["SHOW_API_DOCS"] ? process.env["SHOW_API_DOCS"] : false;
export const INIT_JOBS: string | boolean = process.env["INIT_JOBS"] ? process.env["INIT_JOBS"] : false;
export const URL_EMITION: string = process.env["URL_EMITION"];
export const URL_EMITION_REQUEST: string = process.env["URL_EMITION_REQUEST"];
export const ACTIVAR_COMPANY_CODE: string = process.env["ACTIVAR_COMPANY_CODE"];
export const BUCKET_PHOTOS: string = process.env["BUCKET_PHOTOS"];
export const BUCKET_POLICIES: string = process.env["BUCKET_POLICIES"];
export const BUCKET_REBILLINGS: string = process.env["BUCKET_REBILLINGS"];
export const BUCKET_PROPOSALS: string = process.env["BUCKET_PROPOSALS"];
export const BUCKET_COD_PROD: string = process.env["BUCKET_COD_PROD"];
export const RECAPTCHA_KEY: string = process.env["RECAPTCHA_KEY"];
export const BUCKET_PHOTOS_QUOTES: string = process.env["BUCKET_PHOTOS_QUOTES"];
export const BUCKET_XML_EMISION: string = process.env["BUCKET_XML_EMISION"];
export const BUCKET_XML_ENDORSMENT: string = process.env["BUCKET_XML_ENDORSMENT"];
export const CAL_KEY: string = process.env["CAL_KEY"];


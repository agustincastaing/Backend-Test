import {
	response,
	request,
	BaseHttpController,
	controller,
	httpPost,
	httpPut,
	httpGet,
	requestParam
} from "inversify-express-utils";
import { Response, Request } from "express";
import { errorHandler } from "../../api/utils";
import { HttpException } from "@exceptions";
import Authorize from "./../middlewares/authorization-middleware";
import Roles from "./../core/common/Roles";
import { PrismaClient } from "@prisma/client";
import { User } from "@api/models/User";

const prisma = new PrismaClient()
@controller("/users")

export class UserController extends BaseHttpController {
	constructor(

	) {
		super()
	}

	@httpGet("/clients/:id?", Authorize([Roles.SUPERADMIN, Roles.ADMIN, Roles.PRODUCTOR]))
	public async clients(@request() req: Request, @response() res: Response) {
		try {

			return this.json({ data: 1 });
		} catch (err) {
			return err;
		}
	}


	@httpGet("/deactivated")
	public async getDeactivatedUsers(@request() req: Request, @response() res: Response) {
		try {
			const deactivatedUsers = await prisma.user.findMany({ where: { active: false } })
			return res.status(200).json({ deactivated_users: deactivatedUsers });
		} catch (err) {
			return res.status(400).json({ error: err })
		}
	}


	@httpGet("/:id?")
	public async getUser(@request() req: Request, @response() res: Response) {

		const userId: string = req.params.id;

		if (userId) {

			try {
				const user = await prisma.user.findMany({ where: { id: userId } })
				user.length === 0 ? res.status(200).json({ error: `No user with ID "${userId}"` }) : res.status(200).json({ userID: user })
				return
			} catch (err) {
				return res.status(400).json({ error: err })
			}

		} else {

			try {
				const users = await prisma.user.findMany({ where: { active: true } })
				return res.status(200).json({ allUsers: users })
			} catch (error) {
				return res.status(400).json({ error: error })
			}

		}

	}

	@httpPost("/")
	public async postUser(req: Request, res: Response) {

		const newUser = req.body

		try {
			const insert = await prisma.user.create({ data: newUser })
			return res.status(200).json({ Hecho: insert })
		} catch (error) {
			return res.status(400).json({ error: error })
		}
	}
}
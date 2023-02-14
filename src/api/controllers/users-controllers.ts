import {
	response,
	request,
	BaseHttpController,
	controller,
	httpPost,
	httpGet,
	requestParam
} from "inversify-express-utils";
import{ Response, Request } from "express";
import { errorHandler } from "../../api/utils";
import { HttpException } from "@exceptions";
import Authorize from "./../middlewares/authorization-middleware";
import Roles from "./../core/common/Roles";
import { getUserId, signUp, inactiveUser } from "@api/repository/user.repository.prisma";
import { JWT_SECRET } from "@api/config/environment";
import jwt from "jsonwebtoken";

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
	
	@httpGet("/inactive")
	public async inactiveUsers(@request() req: Request, @response() res: Response) {
		try {
			const inactives = inactiveUser
			return res.status(200).json({inactives });
		} catch (err) {
			return res.status(400).json({ error: err })
		}
	}


	@httpPost("/signup")
	public async signUp(@request() req: Request, @response() res: Response){  
	try {
		const newUserRegister = await signUp(req.body);
		const jwtoken = {
			role: newUserRegister.role,
			id: newUserRegister.id,
		  };
		  const token = jwt.sign(jwtoken, JWT_SECRET, {
			expiresIn: "12h",
		  });
		return res
		.status(201)
		.header("authorization", token)
        .json({ status: 201, response: newUserRegister });	
	} catch (err: any) {
		return res.status(500).json({ status: 500, response: err.message });
  }
	}


@httpGet("/:id")
public async getUserId( @request() req: Request, @response() res: Response ) {
    try {
      const { id } = req.params;

      const findUser = await getUserId(id);

      if (!findUser)
        return res
          .status(404)
          .json({ status: 404, response: "Not found" });

      return res
        .status(200)
        .json({ status: 200, response: findUser });
	} catch (err: any){
		return res.status(500).json({ status: 500, response: err.message });
	}
}
}
export { signUp, getUserId };

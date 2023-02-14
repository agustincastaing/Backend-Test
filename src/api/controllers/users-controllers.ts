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
import{ Response, Request } from "express";
import { errorHandler } from "../../api/utils";
import { HttpException } from "@exceptions";
import Authorize from "./../middlewares/authorization-middleware";
import Roles from "./../core/common/Roles";
import { signUp } from "@api/repository/user.repository.prisma";

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
	

	@httpPost("/signup")
	public async signUp(@request() req: Request, @response() res: Response): Promise<Response<any, Record<string, any>>>{
	try {
		const newUserRegister = await signUp(req.body);
		console.log(req.body);
		return res
		
        .status(201)
        .json({ status: 201, response: newUserRegister });	
	} catch (err: any) {
		return res.status(500).json({ status: 500, response: err.message });
  }
	}
}

export { signUp };

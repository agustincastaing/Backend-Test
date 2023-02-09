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

}
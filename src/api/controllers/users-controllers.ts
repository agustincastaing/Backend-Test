import {
  response,
  request,
  BaseHttpController,
  controller,
  httpPost,
  httpPut,
  httpGet,
  requestParam,
} from "inversify-express-utils";
import { Response, Request } from "express";
import { errorHandler } from "../../api/utils";
import { HttpException } from "@exceptions";
import Authorize from "./../middlewares/authorization-middleware";
import { JWT_SECRET } from "../config/environment";
import jwt from "jsonwebtoken";
import { isNotEmail, isNotPassword } from "../validation/user.validation";
import Roles from "./../core/common/Roles";
import EntityCLient, {
  EntityClientRegister,
  EntityClientToken,
} from "../core/models/entity.user";
import {
  signIn,
  signUp,
  profileClient,
} from "../respositoty/user.repository.prisma";
import {
  validationSignIn,
  validationSignUp,
} from "../middlewares/validation-middleware-cliente";

interface interfaceRequesLogin extends Request {
  body: {
    email: EntityCLient["email"];
    password: EntityCLient["password"];
  };
}
interface interfaceRequestRegister extends Request {
  body: EntityClientRegister;
}
interface interfaceRequestUser extends Request {
  user: EntityClientToken;
}
@controller("/users")
export class UserController extends BaseHttpController {
  constructor() {
    super();
  }

  @httpPost("/signup", validationSignUp)
  public async signUpRClient(
    @request() req: interfaceRequestRegister,
    @response() res: Response
  ) {
    try {
      const { body } = req;
      const registeredCustomer = await signUp(body);
      const addJwt = {
        role: registeredCustomer.role,
        id: registeredCustomer.id,
      };
      const token = jwt.sign(addJwt, JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      return res
        .status(201)
        .header("authorization", token)
        .json({ status: 201, response: registeredCustomer });
    } catch (error: any) {
      return res.status(500).json({ status: 500, response: error.message });
    }
  }
  @httpPost("/signin", validationSignIn)
  public async singIn(
    @request() req: interfaceRequesLogin,
    @response() res: Response
  ) {
    try {
      const { email, password } = req.body;
      const findUser = await signIn(email, password);
      if (findUser === false)
        return res
          .status(404)
          .json({ status: 404, response: "user not found" });

      const addJwt = {
        role: findUser.role,
        id: findUser.id,
      };

      const token = jwt.sign(addJwt, JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      return res
        .status(200)
        .header("authorization", token)
        .json({ status: 200, response: findUser });
    } catch (error: any) {
      return res.status(500).json({ status: 500, response: error.message });
    }
  }

  @httpGet("/profile", Authorize([Roles.ADMIN, Roles.CLIENT, Roles.SUPERADMIN]))
  public async profile(
    @request() req: interfaceRequestUser,
    @response() res: Response
  ) {
    try {
      const { id } = req.user;

      const profileUser = await profileClient(id);

      if (!profileUser)
        return res
          .status(404)
          .json({ status: 404, response: "user not found" });

      return res
        .status(200)

        .json({ status: 200, response: profileUser });
    } catch (error: any) {
      return res.status(500).json({ status: 500, response: error.message });
    }
  }
}

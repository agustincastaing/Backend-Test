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
import { errorHandler } from "../utils";
import { HttpException } from "@exceptions";
import Authorize from "../middlewares/authorization-middleware";
import Roles from "../core/common/Roles";
import EntityClient from "../core/models/entity.user";
import {
  setRoles,
  isNotSuperAdmin,
} from "../respositoty/superAdmin.repository.prisma";
import { validationSetRole } from "../validation/superAdmin.validation";
import { validationSetRoleMide } from "../middlewares/validation-middleware-superAdmin";

interface ResponseAddBodyIdAddRole extends Response {
  body: {
    role: Roles;
    id: EntityClient["id"];
  };
}

@controller("/superadmin")
export class SuperAdminController extends BaseHttpController {
  constructor() {
    super();
  }

  @httpPut(
    "/set_role",
    Authorize([Roles.CLIENT]),
    validationSetRoleMide //OJO LO PUSE POR TESTING, VA ASI -->> [Roles.SUPERADMIN]
  )
  public async setRoles(
    @request() req: ResponseAddBodyIdAddRole,
    @response() res: Response
  ) {
    try {
      const { body } = req;

      await setRoles(body.id, body.role);

      return res.status(201).json({
        status: 201,
        response: `The user with the id ${body.id} was changed the role to ${body.role}`,
      });
    } catch (err: any) {
      return res.status(500).json({ status: 500, response: err.message });
    }
  }
}

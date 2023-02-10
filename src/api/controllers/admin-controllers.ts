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
import { HttpException } from "../../exceptions/index";
import Authorize from "../middlewares/authorization-middleware";
import Roles from "../core/common/Roles";
import EntityClient from "../core/models/entity.user";
import {
  setActiveClient,
  setDisableClient,
  allClients,
  searchByUserId,
  allClientsDeactivated,
  allClientsActivate,
} from "../respositoty/admin.repository.prisma";

interface ResponseAddParamId extends Response {
  params: {
    id: EntityClient["id"];
  };
}

@controller("/admin")
export class adminController extends BaseHttpController {
  constructor() {
    super();
  }

  @httpGet("/find/clients/activate", Authorize([Roles.SUPERADMIN, Roles.ADMIN]))
  public async clientsAllActivate(
    @request() req: Request,
    @response() res: Response
  ) {
    try {
      const clientsActivate = await allClientsActivate();

      return res.status(200).json({ status: 200, response: clientsActivate });
    } catch (err: any) {
      return res.status(500).json({ status: 500, response: err.message });
    }
  }

  @httpGet(
    "/find/clients/deactivated",
    Authorize([Roles.SUPERADMIN, Roles.ADMIN])
  )
  public async clientsAllDeactivated(
    @request() req: Request,
    @response() res: Response
  ) {
    try {
      const clientsDeactivated = await allClientsDeactivated();

      return res
        .status(200)
        .json({ status: 200, response: clientsDeactivated });
    } catch (err: any) {
      return res.status(500).json({ status: 500, response: err.message });
    }
  }

  @httpGet("/find/clients", Authorize([Roles.SUPERADMIN, Roles.ADMIN]))
  public async clients(@request() req: Request, @response() res: Response) {
    try {
      const clients = await allClients();

      return res.status(200).json({ status: 200, response: clients });
    } catch (err: any) {
      return res.status(500).json({ status: 500, response: err.message });
    }
  }

  @httpGet("/find/clients/:id", Authorize([Roles.SUPERADMIN, Roles.ADMIN]))
  public async client(
    @request() req: ResponseAddParamId,
    @response() res: Response
  ) {
    try {
      const { id } = req.params;
      const findUser = await searchByUserId(id);

      if (!findUser)
        return res.status(404).json({ status: 404, response: "user no found" });

      return res.status(200).json({ status: 200, response: findUser });
    } catch (err: any) {
      return res.status(500).json({ status: 500, response: err.message });
    }
  }

  @httpPut("/activate_client/:id", Authorize([Roles.SUPERADMIN, Roles.ADMIN]))
  public async activateClient(
    @request() req: ResponseAddParamId,
    @response() res: Response
  ) {
    try {
      const { id } = req.params;
      const changeStatusClient = await setActiveClient(id);

      if (!changeStatusClient)
        return res.status(404).json({ status: 404, response: "user no found" });

      return res.status(201).json({
        status: 201,
        response: `the user with the id ${id} has been activated`,
      });
    } catch (err: any) {
      return res.status(500).json({ status: 500, response: err.message });
    }
  }

  @httpPut("/disable_client/:id", Authorize([Roles.SUPERADMIN, Roles.ADMIN]))
  public async disableClient(
    @request() req: ResponseAddParamId,
    @response() res: Response
  ) {
    try {
      const { id } = req.params;
      const changeStatusClient = await setDisableClient(id);

      if (!changeStatusClient)
        return res.status(404).json({ status: 404, response: "user no found" });

      return res.status(201).json({
        status: 201,
        response: `the user with the id ${id} has been deactivated`,
      });
    } catch (err: any) {
      return res.status(500).json({ status: 500, response: err.message });
    }
  }
}

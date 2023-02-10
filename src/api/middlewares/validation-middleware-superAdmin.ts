import { NextFunction, Request, Response } from "express";
import { validationSetRole } from "../validation/superAdmin.validation";
import { isNotSuperAdmin } from "../respositoty/superAdmin.repository.prisma";


type middlewareParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const validationSetRoleMide: middlewareParams = async (
  req,
  res,
  next
) => {
  try {
    if (validationSetRole(req.body))
      return res
        .status(400)
        .json({ status: 400, response: "missing data for role change" });

    const IsSuperAdmin = await isNotSuperAdmin(req.body.id);
    if (IsSuperAdmin)
      return res.status(400).json({
        status: 400,
        response: "The Role of the SuperAdmin cannot be changed",
      });

    next();
  } catch (err: any) {
    return res.status(500).json({
      status: 500,
      response: err.message,
    });
  }
};

import { Request, Response, NextFunction } from "express";
import Roles from "../core/common/Roles";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/environment";
import { EntityClientToken } from "@api/core/models/entity.user";

interface interfaceRequestUser extends Request {
  user: EntityClientToken;
}

export const verifyAuthToken = (header: string) => {
  const token =
    (/^Bearer /gi.test(header) && header.replaceAll("Bearer ", "")) || false;

  if (token === false) return false;

  return jwt.verify(token, JWT_SECRET);
};

const Authorize = (roles: Roles[]) => {
  return (req: interfaceRequestUser, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization)
        return res.status(403).json({ status: 403, response: "Unauthorized1" });

      let header: string = req.headers.authorization;

      let user: EntityClientToken | false = verifyAuthToken(
        header
      ) as EntityClientToken;

      if (!user)
        return res.status(403).json({ status: 403, response: "Unauthorized2" });

      if (!roles.includes(user.role) && !Array.isArray(roles))
        return res.status(403).json({ status: 403, response: "Unauthorized3" });

      req.user = user;

      next();
    } catch (err) {
      return res.status(403).json({ status: 403, response: "Unauthorized4" });
    }
  };
};

export default Authorize;

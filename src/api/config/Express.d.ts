import { EntityClientToken } from "@api/core/models/entity.user";

declare global {
  namespace Express {
    export interface Request {
      user: EntityClientToken;
    }
  }
}

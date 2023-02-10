import { NextFunction, Request, Response } from "express";
import { repeatCustomerByEmail } from "../respositoty/user.repository.prisma";
import IsNotClient, {
  isNotEmail,
  isNotPassword,
} from "../validation/user.validation";

type middlewareParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const validationSignUp: middlewareParams = async (req, res, next) => {
  try {
    const isARepeatCustomer = await repeatCustomerByEmail(req.body["email"]);

    if (isARepeatCustomer)
      return res
        .status(400)
        .json({ status: 400, response: "the client is already registered" });

    if (IsNotClient(req.body)) {
      return res.status(400).json({
        status: 400,
        response: "the data of the new client is incorrect",
      });
    }

    next();
  } catch (err: any) {
    return res.status(500).json({
      status: 500,
      response: err.message,
    });
  }
};

export const validationSignIn: middlewareParams = async (req, res, next) => {
  const { email, password } = req.body;

  if (isNotEmail(email))
    return res
      .status(400)
      .json({ status: 400, response: "wrong email or password" });
  if (isNotPassword(password))
    return res
      .status(400)
      .json({ status: 400, response: "wrong email or password" });

  next();
};

import prisma from "../config/database";
import EntityClient, {
  ClientRegister,
  ClientSignUp,
} from "../core/common/models/Users";
import { genSaltSync, hashSync } from "bcrypt-ts";
import Joi from "@hapi/joi";

type SignUpFunction = (newClient: ClientRegister) => Promise<ClientSignUp>;
type functionIdUser = ( id: EntityClient["id"]) => Promise<ClientSignUp | null>;

const validateinput = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

export const signUp: SignUpFunction = async (userData) => {
  try {
    const { error } = validateinput.validate(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    //hasheamos password
    let salt = genSaltSync(10);
    let passwordHash = hashSync(userData.password, salt);

    const newUser: EntityClient = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        email: userData.email,
        password: passwordHash,
        birth_date: userData.birth_date,
      },
    });
    return newUser
  } catch (err: any) {
    throw new Error(err.details[0].message);
  }
};

export const getUserId:functionIdUser = async (id) => {
    try {
      
      const getUser = await prisma.user.findUnique({where: {id}})
      return getUser

    } catch (err: any) {
      throw new Error(err.details[0].message);
    }
  };

  export const inactiveUser = async () => {
    try {
      
      const getInactiveUsers = await prisma.user.findMany({where: {"active": false}})
      return getInactiveUsers

    } catch (err: any) {
      throw new Error(err.details[0].message);
    }
  };

  
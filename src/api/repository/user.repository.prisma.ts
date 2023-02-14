import prisma from "../config/database";
import EntityClient, {
  ClientRegister,
  ClientSignUp,
} from "../core/common/models/Users";
import { genSaltSync, hashSync } from "bcrypt-ts";
import Joi from "@hapi/joi";

type SignUpFunction = (newClient: ClientRegister) => Promise<ClientSignUp>;


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
  } catch (error: any) {
    throw new Error(error.details[0].message);
  }
};

import prisma from "../config/database";
import EntityClient, {
  EntityClientRegister,
  EntityClientSignUp,
  EntityClientSignIn,
  EntitySignInLessPassword,
  EntityClientProfile,
} from "../core/models/entity.user";

import bcryptjs from "bcryptjs"; /*  es una libreria que  encripta la contraseña, lo use al momento de
en la funcion singUp y singIn 
*/

type funtionParamSignUp = (
  newClient: EntityClientRegister
) => Promise<EntityClientSignUp>;

export const signUp: funtionParamSignUp = async (newClient) => {
  try {
    const encryptedPassword = await bcryptjs.hash(newClient.password, 10);

    const newClientandPassword = { ...newClient, password: encryptedPassword };

    const prismaUser: EntityClient = await prisma.user.create({
      data: newClientandPassword,
    });

    const outPassword: EntityClientSignUp = {
      firstName: prismaUser.firstName,
      email: prismaUser.email,
      id: prismaUser.id,
      role: prismaUser.role,
    };
    return outPassword;
  } catch (error: any) {
    throw new Error("error when requesting sign up");
  }
};

type functionParamsCustomerByEmail = (
  email: EntityClient["email"]
) => Promise<boolean>;

export const repeatCustomerByEmail: functionParamsCustomerByEmail = async (
  email
) => {
  try {
    const clientRepeat = await prisma.user.findUnique({
      where: { email },
    });
    return Boolean(clientRepeat);
  } catch (error) {
    throw new Error("customer search email failed");
  }
};

type funtionParamsSignIn = (
  email: EntityClient["email"],
  password: EntityClient["password"]
) => Promise<false | EntitySignInLessPassword>;

export const signIn: funtionParamsSignIn = async (email, password) => {
  try {
    const client: EntityClientSignIn | null = await prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        id: true,
        firstName: true,
        password: true,
        role: true,
      },
    });

    if (!client) return false;

    const { password: passwordComparate } = client;
    const validationPassword = await bcryptjs.compare(
      password,
      passwordComparate
    );
    if (!validationPassword) return false;

    const userSingIn: EntitySignInLessPassword = {
      id: client.id,
      email: client.email,
      firstName: client.firstName,
      role: client.role,
    };

    return userSingIn;
  } catch (error) {
    throw new Error("error when requesting data to Sign In");
  }
};

type funtionParamSProfileCliente = (
  id: EntityClient["id"]
) => Promise<false | EntityClientProfile>;

export const profileClient: funtionParamSProfileCliente = async (id) => {
  try {
    const profileClientPrisma: EntityClientProfile | null =
      await prisma.user.findUnique({
        where: { id },
        select: {
          firstName: true,
          birth_date: true,
          email: true,
        },
      });

    if (!profileClientPrisma) return false;

    return profileClientPrisma;
  } catch (error) {
    throw new Error("errot search Profile");
  }
};

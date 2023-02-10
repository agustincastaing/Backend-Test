import Role from "../common/Roles";

export default interface EntityClient {
  id: string;
  email: string;
  firstName: string;
  birth_date: Date;
  role: Role;
  active: boolean;
  password: string;
}

export interface EntityClientRegister
  extends Omit<EntityClient, "id" | "role" | "active"> {}

export interface EntityClientSignUp
  extends Pick<EntityClient, "email" | "firstName" | "id" | "role"> {}

export interface EntityClientSignIn
  extends Omit<EntityClient, "active" | "birth_date"> {}

export interface EntitySignInLessPassword
  extends Omit<EntityClientSignIn, "password"> {}

export interface EntityClientProfile
  extends Omit<EntityClient, "password" | "role" | "active" | "id"> {}

export interface EntityClientToken extends Pick<EntityClient, "id" | "role"> {}

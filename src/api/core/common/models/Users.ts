import { Role } from "@prisma/client";

export default interface EntityClient {
  id: string;
  email: string;
  firstName: string;
  birth_date: Date;
  role: Role;
  active: boolean;
  password: string;
}

export interface ClientSignUp  extends Pick<EntityClient, "email" | "firstName" | "id" | "birth_date" | "password"> {}
export interface ClientRegister extends Omit<EntityClient, "id" | "role" | "active"> {}


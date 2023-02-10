import prisma from "../config/database";
import EntityClient from "../core/models/entity.user";

export const setActiveClient = async (id: EntityClient["id"]) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
    });
    prisma.$disconnect();
    return true;
  } catch (error: any) {
    throw new Error("server error");
  }
};

export const setDisableClient = async (id: EntityClient["id"]) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
    prisma.$disconnect();
    return true;
  } catch (error: any) {
    throw new Error("server error");
  }
};

export const allClients = async () => {
  try {
    const allClientFind: EntityClient[] = await prisma.user.findMany();
    prisma.$disconnect();
    return allClientFind;
  } catch (error) {
    throw new Error("server error");
  }
};

export const allClientsDeactivated = async () => {
  try {
    const allClientFindDeactivated: EntityClient[] = await prisma.user.findMany(
      {
        where: {
          active: false,
        },
        orderBy: {
          firstName: "asc",
        },
      }
    );
    prisma.$disconnect();
    return allClientFindDeactivated;
  } catch (error) {
    throw new Error("server error");
  }
};

export const allClientsActivate = async () => {
  try {
    const allClientFindActivate: EntityClient[] = await prisma.user.findMany({
      where: {
        active: true,
      },
      orderBy: {
        firstName: "asc",
      },
    });
    prisma.$disconnect();
    return allClientFindActivate;
  } catch (error) {
    throw new Error("server error");
  }
};

export const searchByUserId = async (id: EntityClient["id"]) => {
  try {
    const client: EntityClient | null = await prisma.user.findUnique({
      where: { id },
    });
    prisma.$disconnect();
    return client;
  } catch (error) {
    throw new Error("server error");
  }
};

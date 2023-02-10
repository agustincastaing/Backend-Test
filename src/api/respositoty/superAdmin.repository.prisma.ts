import prisma from "../config/database";
import EntityClient from "../core/models/entity.user";
import Role from "../core/common/Roles";

export const setRoles = async (id: EntityClient["id"], rol: Role) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: rol,
      },
    });
    prisma.$disconnect();
  } catch (error: any) {
    throw new Error("server error");
  }
};

export const isNotSuperAdmin = async (id: EntityClient["id"]) => {
  try {
    const findUser: EntityClient | null = await prisma.user.findUnique({
      where: { id },
    });
    if (findUser?.role === "SUPERADMIN") return true;
    prisma.$disconnect();
  } catch (error) {
    throw new Error("server error");
  }
};

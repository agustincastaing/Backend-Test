import Role from "../core/common/Roles";

export const validationSetRole = (body: any) => {
  if (!body.id || !body.role) return true;
  const { id, role } = body;
  if (typeof id !== "string") return true;
  if (typeof role !== "string") return true;
  const keysRoles = Object.keys(Role);
  const findRole = keysRoles.find((rol) => rol === role);
  if (!findRole) return true;
  return false;
};

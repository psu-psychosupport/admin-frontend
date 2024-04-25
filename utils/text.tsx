import { UserPermissions } from "../types/users";

export const getUserPermissionList = (permissions: UserPermissions) => {
  const d = Object.values(permissions);
  console.log(d);
};

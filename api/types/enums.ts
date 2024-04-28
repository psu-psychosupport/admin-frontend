export enum UserPermissions {
  ADMINISTRATOR = 1 << 0,
}

export const userHasPermission = (
  userPermissions: number,
  permission: UserPermissions,
): permission is number => (userPermissions & permission) === permission;

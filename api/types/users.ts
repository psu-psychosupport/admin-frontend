export enum UserPermissions {
  ADMINISTRATOR = 1 << 0,
}

export interface User {
  id: number;
  name: string;
  email: string;
  permissions: number;
  is_verified: boolean;
}

export enum Role {
  Admin = "ADMIN",
  Owner = "OWNER",
  Employee = "EMPLOYEE",
}

export interface NewUser {
  name: string;
  phone: string;
  role: Role;
  enterpriseId: string;
}

export interface UserInfo extends NewUser {
  id: string;
}

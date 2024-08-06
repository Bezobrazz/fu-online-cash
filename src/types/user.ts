export enum Role {
  Admin = "ADMIN",
  Owner = "OWNER",
  Employee = "EMPLOYEE",
}

export interface UserInfo {
  id: string;
  name: string;
  phone: string;
  role: Role;
  enterpriseId: string;
}

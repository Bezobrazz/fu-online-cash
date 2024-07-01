enum Role {
  User = "User",
  Amdin = "Admin",
}

export interface UserInfo {
  id: string;
  name: string;
  phone: number;
  role: Role;
}

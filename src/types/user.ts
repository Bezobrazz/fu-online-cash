enum Role {
  User = "User",
  Amdin = "Admin",
}

export interface User {
  id: string;
  name: string;
  phone: number;
  role: Role;
}

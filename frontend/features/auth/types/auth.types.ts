export type Role = "SUPER_ADMIN" | "ADMIN" | "DEVELOPER" | "CLIENT";

export interface User {
  ID: number;
  AgencyID?: number;
  FullName: string;
  Email: string;
  Role: Role;
  Phone: string;
  ProfileImage: string;
  Biography: string;
  IsActive: boolean;
  LastLogin?: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  message?: string;
}

export interface RefreshResponse {
  accessToken: string;
}

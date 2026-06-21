export type PlatformRole = "SUPER_ADMIN" | "ADMIN" | "DEVELOPER" | "CLIENT" | "USER";

export interface User {
  ID: number;
  FullName: string;
  Email: string;
  Phone: string;
  Role: PlatformRole;
  IsActive: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateUserPayload {
  full_name: string;
  email: string;
  phone?: string;
  password: string;
  role?: PlatformRole;
}

export interface UpdateUserPayload {
  full_name?: string;
  email?: string;
  phone?: string;
  role?: PlatformRole;
  isActive?: boolean;
  password?: string;
}

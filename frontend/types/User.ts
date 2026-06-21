export type PlatformRole = "SUPER_ADMIN" | "ADMIN" | "DEVELOPER" | "CLIENT" | "USER";

export interface User {
  ID: number;
  FullName: string;
  Email: string;
  Role: PlatformRole;
  IsActive: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

// Payload untuk create user
export interface CreateUserPayload {
  full_name: string;
  email: string;
  password: string;
  role?: PlatformRole;
}

// Payload untuk update user
export interface UpdateUserPayload {
  full_name?: string;
  email?: string;
  role?: PlatformRole;
  isActive?: boolean;
  password?: string;
}

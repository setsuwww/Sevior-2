import { PlatformRole } from "./User";

export interface RefreshResponse {
  accessToken: string;
}

export interface AuthUser {
  ID: number;
  AgencyID?: number;
  FullName: string;
  Email: string;
  Role: PlatformRole;
  Phone: string;
  ProfileImage?: string | null;
  Biography?: string | null;
  IsActive: boolean;
  LastLogin?: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export interface RefreshResponse {
  accessToken: string;
}


export type OrganizationRole = "OWNER" | "ADMIN" | "PROJECT_MANAGER" | "MEMBER" | "VIEWER";

export interface OrganizationMember {
  ID: string;
  UserID: number;
  OrganizationID: string;
  Role: OrganizationRole;
  CreatedAt: string;
}

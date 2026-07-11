import { PlatformRole } from "@/types/User";

export const ROLE_COLORS: Record<PlatformRole, string> = {
  SUPER_ADMIN: "bg-purple-50 text-purple-700 border border-purple-300/60",
  ADMIN: "bg-rose-50 text-rose-700 border border-rose-300/60",
  DEVELOPER: "bg-sky-50 text-sky-700 border border-sky-300/60",
  CLIENT: "bg-green-50 text-green-700 border border-green-300/60",
  USER: "bg-slate-50 text-slate-700 border border-slate-300/60",
};

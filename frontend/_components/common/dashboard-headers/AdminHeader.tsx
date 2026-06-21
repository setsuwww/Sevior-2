"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, User2 } from "lucide-react";

import { useAuthStore } from "@/_stores/auth";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "@/_components/ui/menubar";
import { Badge } from "@/_components/ui/badge";
import { PLATFORM_ROLE_COLORS } from "@/_constants/user";

export default function AdminHeader() {
  const router = useRouter();
  const { user, resetAuth } = useAuthStore();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    useAuthStore.getState().restoreAuth();
    setLoadingUser(false);
  }, []);

  if (loadingUser) return null;

  const handleLogout = () => {
    resetAuth();
    router.push("/login");
  };

  return (
    <header className="bg-white px-7 py-4 flex justify-between items-center border-b border-gray-300">
      <h1 className="text-xl font-semibold">Welcome, <span className="text-teal-700">{user?.FullName}</span></h1>

      <Menubar className="border-none bg-transparent shadow-none p-0">
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-teal-500 text-white">
              <User size={18} />
            </div>
          </MenubarTrigger>

          <MenubarContent align="end" className="w-64">

            <div className="px-3 py-2 flex flex-col text-sm">
              <span className="font-semibold">{user?.FullName}</span>
              <span className="text-gray-500 text-xs mb-1">{user?.Email}</span>
              {user?.Role && (
                <Badge className={`rounded-sm ${PLATFORM_ROLE_COLORS[user.Role]}`}>
                  {user.Role.replaceAll("_", " ")}
                </Badge>
              )}
            </div>

            <MenubarSeparator />

            <MenubarItem onClick={() => router.push("/profiles")} className="flex items-center gap-2 cursor-pointer">
              <User2 size={16} />
              Profile
            </MenubarItem>

            <MenubarItem onClick={() => router.push("/settings")} className="flex items-center gap-2 cursor-pointer">
              <Settings size={16} />
              Settings
            </MenubarItem>

            <MenubarSeparator />

            <MenubarItem onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 cursor-pointer focus:bg-red-100 focus:text-red-500"
            >
              <LogOut size={16} className="hover:text-red-500" />
              Logout
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </header>
  );
}

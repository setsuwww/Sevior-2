"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  FilePenLine,
  Info,
  FolderClosed,
  Settings,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    icon: Users,
    submenus: [
      { name: "All Users", href: "/dashboard/admin/users" },
      { name: "Super Admins", href: "/dashboard/admin/users/super-admins" },
      { name: "Admins", href: "/dashboard/admin/users/admins" },
      { name: "Developers", href: "/dashboard/admin/users/developers" },
      { name: "Clients", href: "/dashboard/admin/users/clients" },
    ],
  },
  {
    name: "Projects",
    href: "dashboard/admin/projects",
    icon: FolderClosed,
  },
  {
    name: "Tasks",
    href: "dashboard/admin/tasks",
    icon: FilePenLine,
  },
  {
    name: "Leads",
    href: "dashboard/admin/leads",
    icon: PhoneCall,
  },
  {
    name: "Reports",
    href: "dashboard/admin/reports",
    icon: Info,
  },
  {
    name: "Settings",
    href: "dashboard/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">

      <div className="h-[68.5px] flex items-center px-6 border-b border-gray-300">
        <h1 className="text-xl font-bold text-gray-600">
          <span className="text-teal-600">DIS</span>-Web.
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menus.map((menu) => {
          const Icon = menu.icon;
          
          if (menu.submenus) {
            const isAnyActive = menu.submenus.some((sub) => pathname === sub.href);
            return (
              <div key={menu.name} className="space-y-1">
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${isAnyActive ? "text-teal-800" : "text-gray-600"}`}>
                  <Icon size={18} className={isAnyActive ? "text-teal-600" : "text-gray-400"} />
                  {menu.name}
                </div>
                <div className="pl-9 space-y-1">
                  {menu.submenus.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          isSubActive
                            ? "bg-teal-50 text-teal-800 font-medium"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          const isActive = pathname === menu.href;
          return (
            <Link
              key={menu.name}
              href={menu.href as string}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-teal-50 text-teal-800"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              <Icon
                size={18}
                className={isActive ? "text-teal-600" : "text-gray-400"}
              />
              {menu.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 text-xs text-gray-400">
        © 2026 Delivery Inteligence SaaS
      </div>
    </aside>
  );
}

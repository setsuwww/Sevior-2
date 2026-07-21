import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sevior | SaaS Platform",
  description: "Delivery Inteligence Software-as-a-Service",
};

import { TooltipProvider } from "@/_components/ui/tooltip";
import { AuthProvider } from "@/features/auth/providers/AuthProvider";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

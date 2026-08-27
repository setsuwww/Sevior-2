import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sevior | SaaS Platform",
  description: "Delivery Inteligence Software-as-a-Service",
};

import { TooltipProvider } from "@/_components/ui/tooltip";
import { AuthProvider } from "@/providers/AuthProvider";
import { Geist } from "next/font/google";
import { cn } from "@/_lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

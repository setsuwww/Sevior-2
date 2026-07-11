import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sevior | SaaS Platform",
  description: "Delivery Inteligence Software-as-a-Service",
};

import { TooltipProvider } from "@/_components/ui/tooltip";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

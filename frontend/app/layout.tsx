import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MTPM-Web",
  description: "Delivery Inteligence Software-as-a-Service",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

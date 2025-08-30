import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Box",
  description: "Yours. Not Roku’s.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-dvh w-dvw bg-transparent">
      <body className="h-dvh w-dvw overflow-hidden bg-transparent antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hidup Bersamamu",
  description: "Platform undangan digital freemium.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

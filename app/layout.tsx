import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mike-t-302f-test-website-004",
  description: "Baseline Next.js App Router application."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

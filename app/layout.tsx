import type { Metadata } from "next";
import { MarketingLayout } from "@/components/layout";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MarketingLayout>{children}</MarketingLayout>
      </body>
    </html>
  );
}

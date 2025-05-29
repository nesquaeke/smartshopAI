import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { AppProvider } from "@/contexts/AppContext";

export const metadata: Metadata = {
  title: "SmartShop AI - Akıllı Fiyat Karşılaştırma",
  description: "En iyi fiyatları bulun, para tasarrufu yapın!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <AppProvider>
          <Header />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}

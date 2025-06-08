import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/lib/theme-context";
import { ThemedLayout } from "@/components/layout/themed-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DTZ Factuur Beheer",
  description: "Direct TopZorg PGB begeleiding factuur management systeem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ThemedLayout>
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </ThemedLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

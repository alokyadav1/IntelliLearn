import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "AI Agents Mastery | Learning Portal",
  description: "Comprehensive guide to building autonomous AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} antialiased selection:bg-indigo-100 selection:text-indigo-900 flex min-h-screen bg-slate-50`}>
        <Sidebar />
        <main className="flex-1 relative overflow-y-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}

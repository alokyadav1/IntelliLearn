import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { PLATFORM_NAME } from "@/config/platform.config";
import { auth } from "@/auth";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: `${PLATFORM_NAME} | Engineering Courses`,
  description: "Master modern engineering — AI Agents, DevOps, Cloud, and more.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} antialiased selection:bg-indigo-100 selection:text-indigo-900 min-h-screen bg-slate-50 flex flex-col`}>
        <Header session={session} />
        <main className="flex-1 relative w-full">
          {children}
        </main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

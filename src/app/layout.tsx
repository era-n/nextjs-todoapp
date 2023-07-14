import Header from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-full flex-col items-center">
          <Header />
          <article className="flex h-full w-full flex-col items-center justify-center bg-opacity-50 bg-[url('../../public/CurveLine.svg')] bg-left-top bg-no-repeat px-4 sm:p-0">
            {children}
          </article>
        </main>
        <div id="portal"></div>
      </body>
    </html>
  );
}

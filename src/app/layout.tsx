import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foco & Agenda",
  description: "Seu assistente de produtividade e organização.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.className} bg-neutral-950 text-white min-h-screen flex items-center justify-center`}
      >
        <AuthProvider>
          <div className=" my-8 w-[1200px] h-[890px] rounded-[34px] border border-white bg-[#252525]/[0.06] p-8 flex flex-col">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

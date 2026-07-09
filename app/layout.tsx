import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atletismo-uem.vercel.app"),
  title: {
    default: "Atletismo UEM",
    template: "%s | Atletismo UEM",
  },
  description:
    "Projeto de extensão universitária em Atletismo da Universidade Estadual de Maringá (UEM).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-uem-black">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-uem-red-deep focus:px-4 focus:py-2 focus:text-uem-white"
        >
          Pular para o conteúdo principal
        </a>
        <Header />
        <main id="conteudo-principal" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

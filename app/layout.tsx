import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { Cabecalho } from "@/components/cabecalho";
import { Rodape } from "@/components/rodape";
import { BotaoWhatsapp } from "@/components/botao-whatsapp";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const corpo = Inter({
  variable: "--font-corpo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://semear-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Semear Agronegócios · insumos e consultoria técnica no Nordeste",
    template: "%s | Semear Agronegócios",
  },
  description:
    "Nove unidades próprias atendendo os nove estados do Nordeste. Sementes, fertilizantes, defensivos e consultoria técnica com presença na sua propriedade.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Semear Agronegócios",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${corpo.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-osso font-sans text-[17px] text-mata antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-dourado focus:px-4 focus:py-2 focus:text-mata"
        >
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Rodape />
        <BotaoWhatsapp />
      </body>
    </html>
  );
}

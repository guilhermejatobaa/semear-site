import type { Metadata } from "next";
import { Roboto_Condensed, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const condensed = Roboto_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["700"],
});

const corpo = Inter({
  variable: "--font-corpo",
  subsets: ["latin"],
});

const SITE_URL = "https://semear-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Semear Agronegócios — insumos e consultoria técnica no Nordeste",
    template: "%s | Semear Agronegócios",
  },
  description:
    "Nove unidades em seis estados do Nordeste. Sementes, fertilizantes, defensivos e consultoria técnica com presença na sua propriedade.",
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
    <html lang="pt-BR" className={`${condensed.variable} ${corpo.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans text-[17px] text-massape bg-osso antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-ferrugem focus:text-osso focus:px-4 focus:py-2"
        >
          Pular para o conteúdo
        </a>
        <header className="border-b border-massape/10 bg-osso">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight">
              SEMEAR
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/unidades" className="hover:text-ferrugem">
                Unidades
              </Link>
              <Link
                href="/consultoria"
                className="bg-ferrugem px-4 py-2 text-osso font-semibold hover:bg-ferrugem/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ferrugem"
              >
                Falar com um consultor
              </Link>
            </div>
          </nav>
        </header>
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <footer className="bg-massape text-osso">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
            <p className="font-display text-xl font-bold">SEMEAR AGRONEGÓCIOS</p>
            <p className="mt-2 text-osso/70">
              Fundada em 2007 em Maceió/AL. Nove unidades em seis estados do Nordeste.
            </p>
            <p className="mt-4">
              <a
                href="https://wa.me/558233281831"
                className="underline decoration-cana underline-offset-4 hover:text-cana"
              >
                WhatsApp comercial: (82) 3328-1831
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

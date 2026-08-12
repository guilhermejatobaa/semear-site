import type { Metadata } from "next";
import { Roboto_Condensed, Inter } from "next/font/google";
import Image from "next/image";
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
      <body className="min-h-full flex flex-col font-sans text-[17px] text-mata bg-osso antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-dourado focus:text-mata focus:px-4 focus:py-2"
        >
          Pular para o conteúdo
        </a>
        <header className="sticky top-0 z-40 bg-osso/95 backdrop-blur shadow-sm">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:py-4">
            <Link href="/" className="shrink-0">
              <Image
                src="/logo/semear-color.svg"
                alt="Semear Agronegócios"
                width={228}
                height={63}
                priority
                className="h-7 w-auto sm:h-10"
              />
            </Link>
            <div className="flex items-center gap-3 text-sm sm:gap-6">
              <Link
                href="/unidades"
                className="whitespace-nowrap hover:underline decoration-dourado decoration-2 underline-offset-4"
              >
                Unidades
              </Link>
              <Link
                href="/consultoria"
                className="whitespace-nowrap rounded-md bg-dourado px-3 py-2 text-sm font-semibold text-mata shadow-sm hover:bg-dourado/90 hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mata sm:px-4 sm:text-base"
              >
                <span className="sm:hidden">Consultor</span>
                <span className="hidden sm:inline">Falar com um consultor</span>
              </Link>
            </div>
          </nav>
        </header>
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <footer className="bg-mata text-osso">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
            <Image
              src="/logo/semear-branco.svg"
              alt="Semear Agronegócios"
              width={228}
              height={63}
              className="h-10 w-auto"
            />
            <p className="mt-4 text-osso/70">
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

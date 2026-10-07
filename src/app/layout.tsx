import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { games } from "@/lib/pogo";

const exploreGames = ["brisket", "wordwhomp_h5", "meho_h5", "wheel_h5", "firstclass_h5"]
  .map((c) => games[c])
  .filter(Boolean)
  .map((g) => ({ code: g.code, name: g.name, slug: g.slug, tile: g.img.gameTile }));

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});
const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Canonicals y OG apuntan al dominio de producción del cliente
  metadataBase: new URL("https://www.pogo.com"),
  openGraph: { siteName: "Pogo", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  title: {
    default: "Pogo",
    template: "%s",
  },
  description: "Play free online games at Pogo.",
  icons: { icon: "https://www.pogo.com/favicon.ico" },
  // Sitio de staging/réplica: nunca indexable
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export const viewport: Viewport = {
  themeColor: "#2757a5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoCondensed.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header exploreGames={exploreGames} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "B2B Vertriebspartner | Elektroroller Futura 15 & 25 km/h",
  description: "Werden Sie Vertriebspartner für 15 km/h & 25 km/h Elektroroller. Exklusive Händlerkonditionen für Sanitätshäuser. Jetzt Preisliste anfordern!",
  keywords: ["Elektroroller", "B2B", "Sanitätshaus", "Händler", "15 km/h", "25 km/h", "Vertriebspartner"],
  openGraph: {
    title: "B2B Vertriebspartner | Elektroroller Futura",
    description: "Steigern Sie Ihren Umsatz mit 15 km/h & 25 km/h Elektrorollern. Exklusive Händlerkonditionen für Sanitätshäuser.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

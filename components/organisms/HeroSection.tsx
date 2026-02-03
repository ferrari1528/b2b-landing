"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Check, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById("registration-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-white pt-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Centered Layout: Headline -> Image -> Text */}
          <div className="space-y-8 lg:space-y-12">

            {/* Top: Badge & Headline */}
            <div className="text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/20 border border-brand-orange">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                </span>
                <span className="text-sm font-semibold text-brand-orange">
                  Exklusive B2B-Partnerschaft
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto">
                <span className="text-brand-orange">
                  Werden Sie Partner von Futura:
                </span>{" "}
                <span className="text-gray-800">
                  Steigern Sie den Umsatz Ihres Sanitätshauses mit moderner E-Mobilität.
                </span>
              </h1>

              {/* Value Cards - Professional B2B Design */}
              <div className="mt-8 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Card 1: Customer Value */}
                  <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Attraktiver Einstiegspreis</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Ab <span className="font-bold text-brand-orange">1.599 € UVP</span> für Ihre Kunden. Führerscheinfreie 25 km/h Mobilität, die sich fast von selbst verkauft.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Partner Value */}
                  <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Hohe Partnermargen</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Profitables Selbstzahler-Geschäft ohne Krankenkassen-Bürokratie. Maximieren Sie Ihren Deckungsbeitrag pro Quadratmeter.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Proof - Integrated Below Cards */}
                <div className="mt-6 text-center">
                  <p className="text-sm italic text-gray-600 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Bereits über <strong className="text-gray-900">50 Partner-Sanitätshäuser</strong> in Deutschland vertrauen auf Futura</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Middle: Large Product Image */}
            <div className="relative w-full">
              <div className="relative w-full aspect-[16/10] lg:aspect-[16/9]">
                <Image
                  src="/images/product-hero-new.jpg"
                  alt="Elektroroller Futura Showroom - Seniorenmobile und Kabinenroller"
                  fill
                  className="object-contain rounded-xl shadow-2xl"
                  priority
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Bottom: Subheadline, Checklist & CTA */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              {/* Subheadline */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Erweitern Sie das Sortiment von E-Roller, Kabinenroller, Seniorenmobile, E-Lastenräder und Deutschlands günstigsten E-Autos (9.999 € UVP). Sichern Sie sich attraktive Margen und vollen Marketing-Support.
              </p>

              {/* Checklist */}
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center justify-center gap-3">
                  <Check className="h-6 w-6 text-brand-orange shrink-0" />
                  <span className="text-gray-800 font-semibold">Hohe Margen & Marketing-Support</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Check className="h-6 w-6 text-brand-orange shrink-0" />
                  <span className="text-gray-800 font-semibold">Exklusive Gebietsrechte in Ihrer Region</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Check className="h-6 w-6 text-brand-orange shrink-0" />
                  <span className="text-gray-800 font-semibold">Schnelle Lieferzeiten ab Lager Deutschland</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={scrollToForm}
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 py-6 rounded-lg shadow-lg shadow-brand-orange/20"
                >
                  Jetzt Händler-Preisliste anfordern
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  asChild
                  variant="outline"
                  className="border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white text-lg px-8 py-6 rounded-lg"
                >
                  <Link href="https://calendly.com/elektroroller-futura/" target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-5 w-5" />
                    Beratungsgespräch buchen
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <p className="text-sm text-gray-500">
                ✓ Kostenlose Preisliste • ✓ Keine Verpflichtungen • ✓ DSGVO-konform
              </p>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
          <ArrowDown className="h-6 w-6 text-brand-orange" />
        </div>
      </div>
    </section>
  );
}

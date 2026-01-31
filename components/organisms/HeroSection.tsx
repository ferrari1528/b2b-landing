"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById("registration-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-black/95 to-brand-gray-800" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            <span className="text-sm font-medium text-brand-orange">
              Exklusive B2B-Partnerschaft
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Steigern Sie Ihren Umsatz mit{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent">
              15 km/h & 25 km/h
            </span>{" "}
            Elektrorollern
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Die Alternative zum 6 km/h Krankenkassen-Standard –{" "}
            <span className="text-white font-semibold">
              Exklusive Händlerkonditionen
            </span>{" "}
            für Sanitätshäuser
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-4">
            <div className="flex items-center gap-2 text-gray-300">
              <svg
                className="w-5 h-5 text-brand-orange"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Hohe Margen</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg
                className="w-5 h-5 text-brand-orange"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Gebietsschutz</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <svg
                className="w-5 h-5 text-brand-orange"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Marketing-Support</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              onClick={scrollToForm}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 py-6 rounded-lg shadow-lg shadow-brand-orange/20"
            >
              Jetzt Händler-Preisliste anfordern
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Trust indicators */}
          <p className="text-sm text-gray-400 pt-4">
            ✓ Kostenlose Preisliste • ✓ Keine Verpflichtungen • ✓ DSGVO-konform
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-brand-orange" />
        </div>
      </div>
    </section>
  );
}

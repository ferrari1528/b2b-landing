"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Battery, Clock } from "lucide-react";

const products = [
  {
    name: "15 km/h Elektroroller",
    badge: "Bestseller",
    badgeVariant: "default" as const,
    description: "Führerscheinfrei ab 15 Jahren, StVZO-zugelassen",
    features: [
      { icon: Zap, text: "Bis zu 15 km/h Höchstgeschwindigkeit" },
      { icon: Battery, text: "50-70 km Reichweite" },
      { icon: Shield, text: "Keine Helmpflicht" },
      { icon: Clock, text: "Sofort lieferbar" },
    ],
    specs: [
      "Führerscheinfrei ab 15 Jahren",
      "StVZO-zugelassen",
      "Versicherungskennzeichen",
      "Verschiedene Modelle verfügbar",
    ],
  },
  {
    name: "25 km/h Elektroroller",
    badge: "Premium",
    badgeVariant: "secondary" as const,
    description: "Kabinenroller mit Wetterschutz",
    features: [
      { icon: Zap, text: "Bis zu 25 km/h Höchstgeschwindigkeit" },
      { icon: Battery, text: "80-100 km Reichweite" },
      { icon: Shield, text: "Wetterschutz-Kabine" },
      { icon: Clock, text: "Individuell konfigurierbar" },
    ],
    specs: [
      "Führerscheinfrei für Geburtsdatum vor 30.04.1965",
      "Mofa-Prüfbescheinigung sonst erforderlich",
      "Vollverkleidung möglich",
      "Premium-Ausstattung verfügbar",
    ],
  },
];

export function SolutionSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById("registration-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Die Lösung:{" "}
              <span className="text-brand-orange">
                15 km/h & 25 km/h Elektroroller
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bieten Sie Ihren Kunden moderne Elektromobilität – Mit attraktiven
              Händlermargen
            </p>
          </div>

          {/* Product Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-brand-orange transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-brand-black mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                  <Badge variant={product.badgeVariant} className="shrink-0">
                    {product.badge}
                  </Badge>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className="p-2 bg-brand-orange/10 rounded-lg">
                        <feature.icon className="h-5 w-5 text-brand-orange" />
                      </div>
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Specs */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h4 className="font-semibold text-brand-black mb-3">
                    Spezifikationen:
                  </h4>
                  <ul className="space-y-2">
                    {product.specs.map((spec, specIndex) => (
                      <li key={specIndex} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-brand-orange mt-0.5 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  onClick={scrollToForm}
                  variant="outline"
                  className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                >
                  Details & Preise anfordern
                </Button>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-brand-black text-white rounded-2xl p-10">
            <h3 className="text-2xl font-bold mb-3">
              Erweitern Sie Ihr Sortiment noch heute
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Fordern Sie jetzt die vollständige Händler-Preisliste mit allen
              Modellen, Konditionen und Margen an.
            </p>
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
            >
              Jetzt Preisliste anfordern
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

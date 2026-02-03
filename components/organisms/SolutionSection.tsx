"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Battery, Clock, CloudRain, Thermometer, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "15 km/h Modelle",
    badge: "Einstieg",
    badgeVariant: "default" as const,
    description: "Führerscheinfrei ab 15 Jahren",
    imageUrl: "/images/15kmh-modelle.jpg",
    features: [
      { icon: Zap, text: "Bis zu 15 km/h" },
      { icon: Battery, text: "50-70 km Reichweite" },
      { icon: Shield, text: "Keine Helmpflicht" },
      { icon: Clock, text: "Sofort lieferbar" },
    ],
    specs: [
      "Führerscheinfrei ab 15 Jahren",
      "StVZO-zugelassen",
      "Versicherungskennzeichen",
      "Ideal für den Einstieg",
    ],
  },
  {
    name: "25 km/h Seniorenmobile",
    badge: "Beliebt",
    badgeVariant: "secondary" as const,
    description: "Komplett führerscheinfrei für Ältere",
    imageUrl: "/images/25kmh-seniorenmobile.jpg",
    features: [
      { icon: Zap, text: "Bis zu 25 km/h" },
      { icon: Battery, text: "80-100 km Reichweite" },
      { icon: Shield, text: "Mofa-Klassifizierung" },
      { icon: Clock, text: "Große Auswahl" },
    ],
    specs: [
      "Führerscheinfrei für alle vor dem 01.04.1965 Geborenen",
      "Mofa-Prüfbescheinigung für Jüngere",
      "Höhere Geschwindigkeit für mehr Mobilität",
      "Premium-Ausstattung verfügbar",
    ],
  },
  {
    name: "Kabinenroller",
    badge: "Premium",
    badgeVariant: "destructive" as const,
    description: "Die ideale Alternative für alle, die sich das Autofahren nicht mehr zutrauen",
    imageUrl: "/images/kabinenroller.jpg",
    features: [
      { icon: Zap, text: "25 oder 45 km/h" },
      { icon: CloudRain, text: "Vollständiger Wetterschutz" },
      { icon: Thermometer, text: "Heizung & Klimaanlage" },
      { icon: Battery, text: "100+ km Reichweite" },
    ],
    specs: [
      "Dreirädrige 25 km/h Modelle führerscheinfrei für alle vor dem 01.04.1965 Geborenen",
      "45 km/h Modelle mit PKW-Führerschein",
      "Geschlossene Kabine mit Türen und Wetterschutz",
      "Perfekt für sichere, komfortable Mobilität",
    ],
  },
];

export function SolutionSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById("registration-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Die Lösung:{" "}
              <span className="text-brand-orange">
                Drei Produktgruppen für jeden Bedarf
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Erschließen Sie den Selbstzahler-Markt mit unseren 15, 25 und 45 km/h Modellen
            </p>
          </div>

          {/* Product Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-xl border-2 border-gray-100 hover:border-brand-orange transition-all"
              >
                {/* Product Image */}
                <div className="relative h-64 w-full bg-white">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={product.badgeVariant} className="shadow-lg">
                      {product.badge}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-brand-black mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className="p-2 bg-brand-orange/10 rounded-lg">
                          <feature.icon className="h-4 w-4 text-brand-orange" />
                        </div>
                        <span className="text-sm text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <h4 className="font-semibold text-brand-black mb-3 text-sm">
                      Spezifikationen:
                    </h4>
                    <ul className="space-y-2">
                      {product.specs.map((spec, specIndex) => (
                        <li key={specIndex} className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-brand-orange mt-0.5 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-xs text-gray-600">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={scrollToForm}
                    variant="outline"
                    className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white text-sm"
                  >
                    Details & Preise anfordern
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-brand-black text-white rounded-2xl p-10">
            <h3 className="text-2xl font-bold mb-3">
              Erweitern Sie Ihr Sortiment noch heute
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Fordern Sie jetzt die vollständige Händler-Preisliste an oder buchen Sie direkt ein persönliches Beratungsgespräch mit unserem Händler-Experten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white"
              >
                Jetzt Preisliste anfordern
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="border-2 border-brand-orange text-brand-orange bg-transparent hover:bg-brand-orange hover:text-white"
              >
                <Link href="https://calendly.com/elektroroller-futura/" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Beratungsgespräch buchen
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

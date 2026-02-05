import {
  Euro,
  MapPin,
  TrendingUp,
  Package,
  Truck,
  Wrench,
} from "lucide-react";

const benefits = [
  {
    icon: Euro,
    title: "Bis zu 4x höhere Margen",
    description:
      "25-40% Händlermarge statt 5-10% bei Kassenmodellen. Zusätzliche Umsätze durch Service, Ersatzteile und Zubehör ohne Krankenkassen-Abrechnung.",
  },
  {
    icon: MapPin,
    title: "Exklusive Gebietsrechte",
    description:
      "Sichern Sie sich den alleinigen Vertrieb in Ihrer Region. Kein Wettbewerb durch andere Sanitätshäuser in Ihrem Gebiet.",
  },
  {
    icon: TrendingUp,
    title: "Massive Social Media Reichweite",
    description:
      "68.000+ Follower, täglich neue Videos, Top-Videos mit 1+ Mio. Klicks. Profitieren Sie von unserer Marketing-Power und bekommen Sie automatisch neue Kunden – ohne eigenes Werbebudget!",
  },
  {
    icon: Package,
    title: "500m² Ersatzteillager",
    description:
      "Alle Ersatzteile lagernd in unserem Zentrallager in Halsenbach. 500m² Ersatzteillager garantiert schnelle Verfügbarkeit für Wartung und Reparaturen.",
  },
  {
    icon: Truck,
    title: "Schnelle Lieferung & Lagerware",
    description:
      "Lagerware ab Zentrallager Deutschland. Lieferung innerhalb von 5-7 Werktagen direkt zu Ihnen oder Ihrem Kunden.",
  },
  {
    icon: Wrench,
    title: "Professioneller Service-Support",
    description:
      "Technischer Support per Telefon/E-Mail. Ersatzteile schnell verfügbar. Kulante Garantieabwicklung direkt über uns.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Ihre Vorteile als{" "}
              <span className="text-brand-orange">Vertriebspartner</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Werden Sie Teil eines erfolgreichen Netzwerks und profitieren Sie von
              erstklassigen Konditionen
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-orange/10 rounded-lg shrink-0">
                    <benefit.icon className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-orange mb-2">bis 40%</div>
              <div className="text-gray-600">Händlermarge</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-orange mb-2">68.000+</div>
              <div className="text-gray-600">Social Media Follower</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-orange mb-2">1 Mio.+</div>
              <div className="text-gray-600">Video-Klicks (Top-Videos)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-orange mb-2">täglich</div>
              <div className="text-gray-600">Neue Marketing-Videos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

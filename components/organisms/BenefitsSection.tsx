import {
  Euro,
  MapPin,
  Megaphone,
  GraduationCap,
  Truck,
  Wrench,
} from "lucide-react";

const benefits = [
  {
    icon: Euro,
    title: "Hohe Händlermargen",
    description:
      "Attraktive Einkaufspreise mit bis zu 40% Marge. Zusätzliche Umsätze durch Service, Ersatzteile und Zubehör.",
  },
  {
    icon: MapPin,
    title: "Exklusive Gebietsrechte",
    description:
      "Sichern Sie sich den alleinigen Vertrieb in Ihrer Region. Kein Wettbewerb durch andere Händler in Ihrem Gebiet.",
  },
  {
    icon: Megaphone,
    title: "Marketing-Support",
    description:
      "Professionelle Verkaufsunterlagen, Flyer, Banner und Online-Marketing-Material kostenlos für Sie.",
  },
  {
    icon: GraduationCap,
    title: "Schulungen & Demos",
    description:
      "Kostenlose Produktschulungen für Ihr Team (Online & vor Ort). Demo-Fahrzeuge zum Testen verfügbar.",
  },
  {
    icon: Truck,
    title: "Schnelle Lieferzeiten",
    description:
      "Lagerware ab Zentrallager Deutschland. Lieferung innerhalb von 3-5 Werktagen direkt zu Ihnen.",
  },
  {
    icon: Wrench,
    title: "After-Sales Service",
    description:
      "Technischer Support per Telefon/E-Mail. Ersatzteile schnell verfügbar. Garantieabwicklung unkompliziert.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-black to-brand-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ihre Vorteile als{" "}
              <span className="text-brand-orange">Vertriebspartner</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Werden Sie Teil eines erfolgreichen Netzwerks und profitieren Sie von
              erstklassigen Konditionen
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-orange/10 rounded-lg shrink-0">
                    <benefit.icon className="h-6 w-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-300 leading-relaxed">
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
              <div className="text-4xl font-bold text-brand-orange mb-2">40%</div>
              <div className="text-gray-300">Händlermarge</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-orange mb-2">200+</div>
              <div className="text-gray-300">Zufriedene Partner</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-orange mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-orange mb-2">48h</div>
              <div className="text-gray-300">Lieferzeit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

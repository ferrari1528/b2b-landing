import { Wrench, GraduationCap, Target } from "lucide-react";

const serviceCards = [
  {
    icon: Wrench,
    title: "Technischer Support & Ersatzteile",
    description:
      "Support durch unser Technik-Team. Ersatzteilversand aus deutschem Lager. Wir lassen Sie bei Reparaturen nicht allein.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: GraduationCap,
    title: "Schulung & Einweisung",
    description:
      "Kostenlose Technik-Schulungen für Ihr Werkstatt-Personal und Verkaufsleitfäden für Ihr Team.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Target,
    title: "Gratis Neukunden",
    description:
      "Wir leiten Online-Anfragen aus Ihrer Region über unsere Händlersuche direkt an Ihr Ladengeschäft weiter.",
    color: "from-orange-500 to-orange-600",
  },
];

export function ServiceSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-5 md:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 leading-tight px-4">
              Ihr Rundum-Sorglos-Paket:{" "}
              <span className="text-brand-orange">
                So unterstützen wir Ihr Sanitätshaus
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Wir sind mehr als nur ein Lieferant – wir sind Ihr Partner für
              langfristigen Erfolg
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {serviceCards.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-brand-orange/30"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} shadow-lg`}>
                    <service.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800 leading-tight">
                  {service.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA Box */}
          <div className="mt-12 md:mt-16 bg-gradient-to-br from-brand-orange/10 to-orange-100/50 rounded-2xl p-6 md:p-8 border-2 border-brand-orange/20 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">
              Überzeugt von unserem Service-Paket?
            </h3>
            <p className="text-base md:text-lg text-gray-700 mb-6">
              Fordern Sie jetzt unverbindlich unsere Händler-Unterlagen an und
              starten Sie mit uns durch!
            </p>
            <a
              href="#registration-form"
              className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all transform hover:scale-105 shadow-lg min-h-[48px] touch-manipulation"
            >
              Jetzt Händler-Paket anfordern
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { AlertCircle, TrendingDown, MapPin } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Unzufriedene Kunden",
    description:
      "6 km/h Elektromobile sind zu langsam für den Alltag. Kunden wünschen sich mehr Geschwindigkeit und Reichweite für eine echte Mobilitätslösung.",
  },
  {
    icon: TrendingDown,
    title: "Verlorene Verkäufe",
    description:
      "Kunden kaufen schnellere Alternativen bei der Konkurrenz oder online, weil Ihr Sortiment nur langsame Krankenkassen-Modelle umfasst.",
  },
  {
    icon: MapPin,
    title: "Eingeschränkte Reichweite",
    description:
      "Kurze Akku-Laufzeiten und niedrige Geschwindigkeit schränken die Mobilität Ihrer Kunden ein und führen zu Unzufriedenheit.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Das Problem:{" "}
              <span className="text-brand-red">6 km/h sind zu langsam</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ihre Kunden wollen mehr als Krankenkassen-Modelle – Sie verlieren Umsatz
              an die Konkurrenz
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-brand-red"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-brand-red/10 rounded-full">
                    <problem.icon className="h-10 w-10 text-brand-red" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-4 text-center">
                  {problem.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call-out box */}
          <div className="mt-12 bg-white border-l-4 border-brand-orange p-6 rounded-lg shadow-md">
            <p className="text-lg text-gray-700">
              <span className="font-bold text-brand-orange">Fakt:</span> Über 60%
              der Kunden suchen nach Elektromobilen mit{" "}
              <span className="font-semibold">höherer Geschwindigkeit</span> als
              Standard-Krankenkassenmodelle. Nutzen Sie dieses ungenutzte Potenzial!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

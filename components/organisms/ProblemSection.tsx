import { AlertCircle, TrendingDown, ShoppingCart } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Unzufriedene Kunden",
    description:
      "6 km/h ist für aktive Senioren zu langsam. Sie fühlen sich ausgebremst und wünschen sich die Freiheit, eigenständig Besorgungen zu erledigen und am Leben teilzunehmen.",
  },
  {
    icon: TrendingDown,
    title: "Umsatzverlust an Online-Handel",
    description:
      "Der wachsende Selbstzahler-Markt (15-45 km/h) geht komplett am Sanitätshaus vorbei. Ihre Kunden bestellen online – und Sie verlieren lukrative Margen.",
  },
  {
    icon: ShoppingCart,
    title: "Abhängigkeit von Krankenkassen",
    description:
      "Krankenkassen-Modelle bringen niedrige Margen und viel Verwaltungsaufwand. Der Selbstzahler-Markt bietet deutlich höhere Gewinnspannen bei weniger Bürokratie.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Die{" "}
              <span className="text-brand-red">6 km/h Falle</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Während Sie auf Krankenkassen-Modelle setzen, verlieren Sie täglich Umsatz
              an den Online-Handel und die Konkurrenz
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
              <span className="font-bold text-brand-orange">Marktchance:</span> Der Selbstzahler-Markt für schnellere Elektromobile (15-45 km/h) wächst jährlich um über{" "}
              <span className="font-semibold">30%</span>. Sanitätshäuser, die diesen Trend verpassen, verlieren täglich lukrative Verkäufe an Amazon, eBay und spezialisierte Online-Shops.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

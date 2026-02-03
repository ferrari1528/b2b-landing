import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "Höchstgeschwindigkeit",
    kassenmodell: "6 km/h",
    futuraModell: "15 / 25 / 45 km/h",
    advantage: true,
  },
  {
    feature: "Wetterschutz",
    kassenmodell: "Nein (offen)",
    futuraModell: "Optional Kabine mit Heizung",
    advantage: true,
  },
  {
    feature: "Reichweite",
    kassenmodell: "15-25 km",
    futuraModell: "50-100+ km",
    advantage: true,
  },
  {
    feature: "Händler-Marge",
    kassenmodell: "5-10%",
    futuraModell: "25-40%",
    advantage: true,
  },
  {
    feature: "Verwaltungsaufwand",
    kassenmodell: "Hoch (Krankenkassen-Abrechnungen)",
    futuraModell: "Minimal (Direktverkauf)",
    advantage: true,
  },
  {
    feature: "Zielgruppe",
    kassenmodell: "Nur Rezept-Kunden",
    futuraModell: "Alle Selbstzahler",
    advantage: true,
  },
];

export function ComparisonTable() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
              Vergleich:{" "}
              <span className="text-brand-orange">
                Kassenmodell vs. Premium-Modelle
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sehen Sie selbst, warum immer mehr Sanitätshäuser auf schnellere
              Elektromobile setzen
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gray-800 text-white p-6">
              <div className="font-semibold text-lg"></div>
              <div className="text-center">
                <div className="font-bold text-xl mb-1">6 km/h</div>
                <div className="text-sm text-gray-300">Kassenmodell</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl mb-1 text-brand-orange">
                  Futura Premium
                </div>
                <div className="text-sm text-gray-300">15-45 km/h Modelle</div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-200">
              {comparisonData.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 p-6 hover:bg-gray-50 transition-colors"
                >
                  {/* Feature */}
                  <div className="font-semibold text-brand-black flex items-center">
                    {row.feature}
                  </div>

                  {/* Kassenmodell */}
                  <div className="text-center text-gray-600 flex items-center justify-center">
                    <span className="text-sm">{row.kassenmodell}</span>
                  </div>

                  {/* Futura Modell */}
                  <div className="text-center flex items-center justify-center gap-2">
                    <Check className="h-5 w-5 text-green-600 shrink-0" />
                    <span className="text-sm font-semibold text-brand-orange">
                      {row.futuraModell}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer */}
            <div className="bg-gradient-to-r from-brand-orange to-brand-red p-8 text-center">
              <p className="text-xl font-bold mb-2 text-gray-900 drop-shadow-lg">
                💰 Bis zu 4x höhere Margen mit Futura Premium-Modellen
              </p>
              <p className="text-sm text-gray-800 opacity-95 drop-shadow">
                Maximieren Sie Ihren Gewinn bei minimalem Verwaltungsaufwand
              </p>
            </div>
          </div>

          {/* Price Highlight - Optimized Professional Layout */}
          <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Side: Main Content */}
              <div className="flex-1 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="shrink-0 w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Unschlagbares Preis-Leistungs-Verhältnis
                  </h3>
                </div>

                <div className="space-y-3 pl-[52px]">
                  <p className="text-gray-700">
                    Endkunden-Preis ab nur <span className="font-bold text-brand-orange text-xl">1.599 € UVP</span>
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Führerscheinfreie 25 km/h E-Mobile mit attraktiven Händlermargen.
                    Perfekt für das Selbstzahler-Geschäft – ohne Krankenkassen-Bürokratie!
                  </p>
                </div>
              </div>

              {/* Right Side: Margin Highlight */}
              <div className="bg-gradient-to-br from-brand-orange/5 to-brand-red/5 border-t md:border-t-0 md:border-l border-gray-200 p-8 flex flex-col justify-center items-center min-w-[260px]">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Ihre Händlermarge</p>
                <p className="text-6xl font-bold text-brand-orange mb-3 leading-none">25-40%</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-white/60 px-3 py-1.5 rounded-full">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Über Branchendurchschnitt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white border-l-4 border-green-500 p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-brand-black mb-2 flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Vorteile für Ihr Sanitätshaus
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Höhere Gewinnspannen ohne Krankenkassen-Verhandlungen</li>
                <li>• Schnellerer Verkaufsprozess (kein Rezept nötig)</li>
                <li>• Zufriedenere Kunden durch bessere Mobilität</li>
              </ul>
            </div>

            <div className="bg-white border-l-4 border-brand-orange p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-brand-black mb-2 flex items-center gap-2">
                <Check className="h-5 w-5 text-brand-orange" />
                Vorteile für Ihre Kunden
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Mehr Unabhängigkeit durch höhere Geschwindigkeit</li>
                <li>• Wetterschutz-Optionen für ganzjährige Nutzung</li>
                <li>• Größere Reichweite für Ausflüge und Besorgungen</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Play, Users, TrendingUp, Video, MessageCircle } from "lucide-react";

const socialMediaStats = [
  {
    platform: "YouTube",
    icon: "🎥",
    followers: "23.000+",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-500/10",
  },
  {
    platform: "Facebook",
    icon: "📘",
    followers: "20.000+",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    platform: "TikTok",
    icon: "🎵",
    followers: "15.000+",
    color: "from-pink-500 to-purple-600",
    bgColor: "bg-pink-500/10",
  },
  {
    platform: "Instagram",
    icon: "📸",
    followers: "10.000+",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-500/10",
  },
];

export function SocialMediaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-black via-gray-900 to-brand-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange px-4 py-2 rounded-full mb-6 border border-brand-orange/30">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">Marketing Power</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Profitieren Sie von unserer{" "}
              <span className="text-brand-orange">Social Media Reichweite</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Wir investieren täglich in Content-Marketing – Sie profitieren automatisch
              von unserer Werbung und bekommen neue Kunden, ohne eigenen Aufwand!
            </p>
          </div>

          {/* Key Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-brand-orange/50 transition-all">
              <div className="bg-brand-orange/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Video className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-3xl font-bold text-center mb-3 text-brand-orange">
                Täglich
              </h3>
              <p className="text-gray-300 text-center text-lg">
                Neue Videos & Content auf allen Plattformen
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-brand-orange/50 transition-all">
              <div className="bg-brand-orange/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Play className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-3xl font-bold text-center mb-3 text-brand-orange">
                1 Mio.+
              </h3>
              <p className="text-gray-300 text-center text-lg">
                Klicks auf unsere erfolgreichsten Videos
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-brand-orange/50 transition-all">
              <div className="bg-brand-orange/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="h-8 w-8 text-brand-orange" />
              </div>
              <h3 className="text-3xl font-bold text-center mb-3 text-brand-orange">
                68.000+
              </h3>
              <p className="text-gray-300 text-center text-lg">
                Gesamtreichweite über alle Kanäle
              </p>
            </div>
          </div>

          {/* Social Media Stats Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-white">
              Unsere Community auf Social Media
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {socialMediaStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-brand-orange/50 transition-all group"
                >
                  <div className={`text-5xl mb-4 text-center transform group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-orange mb-2">
                      {stat.followers}
                    </div>
                    <div className="text-gray-300 font-semibold">
                      {stat.platform}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits for Partners */}
          <div className="bg-gradient-to-r from-brand-orange/20 to-orange-600/20 rounded-2xl p-8 md:p-12 border border-brand-orange/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Was bedeutet das für Sie als Partner?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 shrink-0">
                      <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white mb-1">
                        Automatische Kundenakquise
                      </p>
                      <p className="text-gray-300">
                        Unsere Videos erreichen täglich tausende potenzielle Kunden –
                        viele davon in Ihrer Region!
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 shrink-0">
                      <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white mb-1">
                        Kostenlose Markenwerbung
                      </p>
                      <p className="text-gray-300">
                        Wir investieren täglich in Content & Ads – Sie profitieren davon,
                        ohne eigenes Marketing-Budget!
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 shrink-0">
                      <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white mb-1">
                        Vertrauen & Bekanntheit
                      </p>
                      <p className="text-gray-300">
                        Kunden kennen unsere Marke bereits – das erleichtert Ihren Verkauf
                        und erhöht die Conversion-Rate!
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 shrink-0">
                      <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white mb-1">
                        Content für Ihr Sanitätshaus
                      </p>
                      <p className="text-gray-300">
                        Nutzen Sie unsere Videos, Bilder und Posts kostenlos für
                        Ihre eigenen Social-Media-Kanäle!
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-brand-orange mx-auto mb-6" />
                  <h4 className="text-2xl font-bold mb-4">
                    Kunden fragen aktiv nach uns!
                  </h4>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    "Haben Sie Elektroroller Futura im Sortiment?" –
                    Diese Frage hören unsere Partner regelmäßig.
                    Die Marke ist bekannt und begehrt!
                  </p>
                  <div className="bg-brand-orange/20 border border-brand-orange/50 rounded-lg p-4">
                    <p className="text-white font-semibold italic">
                      "Seit wir Elektroroller Futura führen, kommen Kunden
                      gezielt zu uns – das Marketing läuft quasi von alleine!"
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      – Sanitätshaus Müller, Köln
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-300 text-lg mb-6">
              Werden Sie Teil unserer erfolgreichen Marketing-Strategie
            </p>
            <a
              href="#registration-form"
              className="inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Jetzt Partner werden
              <TrendingUp className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Header } from "@/components/organisms/Header";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProblemSection } from "@/components/organisms/ProblemSection";
import { SolutionSection } from "@/components/organisms/SolutionSection";
import { ComparisonTable } from "@/components/organisms/ComparisonTable";
import { BenefitsSection } from "@/components/organisms/BenefitsSection";
import { RegistrationForm } from "@/components/organisms/RegistrationForm";
import { ChatWidget } from "@/components/organisms/ChatWidget";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ComparisonTable />
        <BenefitsSection />
        <RegistrationForm />

        {/* Footer */}
        <footer className="bg-brand-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Company */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-brand-orange">
                  Elektroroller Futura
                </h3>
                <p className="text-gray-400">
                  Ihr Partner für moderne Elektromobilität. Exklusive B2B-Konditionen
                  für Sanitätshäuser.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold mb-4">Rechtliches</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/impressum"
                      className="text-gray-400 hover:text-brand-orange transition"
                    >
                      Impressum
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/datenschutz"
                      className="text-gray-400 hover:text-brand-orange transition"
                    >
                      Datenschutz
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-bold mb-4">Kontakt</h3>
                <div className="space-y-2 text-gray-400">
                  <p className="font-semibold text-white">Elektroroller Futura –</p>
                  <p className="text-sm">eine Marke der Dr. Ferrari GmbH</p>
                  <p className="text-sm">Industriestraße 1<br />56283 Halsenbach, Deutschland</p>
                  <p className="text-sm">📞 Telefon: +49 6747 950060</p>
                  <p className="text-sm">📧 E-Mail: haendler@e-scooter-futura.de</p>
                  <p className="text-sm">📱 WhatsApp: +49 1796636918</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>
                © {new Date().getFullYear()} Dr. Ferrari GmbH. Alle Rechte
                vorbehalten.
              </p>
            </div>
          </div>
        </div>
        </footer>
      </main>

      {/* Chat Widget */}
      <ChatWidget />
    </>
  );
}

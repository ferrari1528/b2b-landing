import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Elektroroller Futura B2B",
  description: "Datenschutzerklärung der Elektroroller Futura GmbH",
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-brand-orange hover:text-brand-red mb-8"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-4xl font-bold text-brand-black mb-8">
          Datenschutzerklärung
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">
              1. Verantwortlicher
            </h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="font-medium">
              Elektroroller Futura GmbH<br />
              Musterstraße 123<br />
              12345 Musterstadt<br />
              Deutschland<br />
              <br />
              E-Mail: datenschutz@ihre-domain.de<br />
              Telefon: +49 (0)123 456789
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">
              2. Erhebung und Speicherung personenbezogener Daten
            </h2>
            <p>
              Wenn Sie über unser Kontaktformular Ihre Händler-Preisliste anfordern,
              erheben wir folgende personenbezogene Daten:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name</li>
              <li>Firmenname</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer</li>
              <li>Name des Sanitätshauses</li>
              <li>Stadt</li>
              <li>Zeitstempel der Anfrage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">
              3. Zweck der Datenverarbeitung
            </h2>
            <p>Ihre Daten werden ausschließlich zu folgenden Zwecken verarbeitet:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Zusendung der angeforderten Händler-Preisliste per E-Mail</li>
              <li>
                Kontaktaufnahme für ein Beratungsgespräch zur B2B-Partnerschaft
              </li>
              <li>Follow-up E-Mails und WhatsApp-Nachrichten (mit Ihrer Zustimmung)</li>
              <li>Statistische Auswertung (anonymisiert)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">
              4. Rechtsgrundlage
            </h2>
            <p>
              Die Verarbeitung Ihrer Daten erfolgt auf Grundlage Ihrer Einwilligung
              (Art. 6 Abs. 1 lit. a DSGVO) sowie zur Anbahnung eines Vertrages (Art.
              6 Abs. 1 lit. b DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">
              5. Weitergabe von Daten
            </h2>
            <p>
              Ihre personenbezogenen Daten werden nicht an Dritte weitergegeben, außer:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Google Sheets:</strong> Zur Speicherung Ihrer Anfrage (Google
                Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland)
              </li>
              <li>
                <strong>Resend:</strong> Zum Versand der E-Mails (Resend Inc., USA)
              </li>
              <li>
                <strong>Twilio:</strong> Zum Versand von WhatsApp-Nachrichten (Twilio
                Inc., USA)
              </li>
            </ul>
            <p>
              Mit allen Dienstleistern bestehen Auftragsverarbeitungsverträge gemäß
              Art. 28 DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">
              6. Speicherdauer
            </h2>
            <p>
              Ihre personenbezogenen Daten werden gespeichert für{" "}
              <strong>90 Tage</strong> ab Anfrage. Danach werden die Daten automatisch
              gelöscht, sofern keine rechtlichen Aufbewahrungsfristen bestehen oder Sie
              nicht Kunde geworden sind.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">
              7. Ihre Rechte
            </h2>
            <p>Sie haben folgende Rechte:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Auskunft:</strong> Sie können Auskunft über Ihre gespeicherten
                Daten verlangen (Art. 15 DSGVO)
              </li>
              <li>
                <strong>Berichtigung:</strong> Sie können die Berichtigung unrichtiger
                Daten verlangen (Art. 16 DSGVO)
              </li>
              <li>
                <strong>Löschung:</strong> Sie können die Löschung Ihrer Daten
                verlangen (Art. 17 DSGVO)
              </li>
              <li>
                <strong>Widerspruch:</strong> Sie können der Verarbeitung widersprechen
                (Art. 21 DSGVO)
              </li>
              <li>
                <strong>Datenübertragbarkeit:</strong> Sie können Ihre Daten in einem
                strukturierten Format erhalten (Art. 20 DSGVO)
              </li>
              <li>
                <strong>Beschwerde:</strong> Sie können sich bei der zuständigen
                Aufsichtsbehörde beschweren
              </li>
            </ul>
            <p className="mt-4">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a
                href="mailto:datenschutz@ihre-domain.de"
                className="text-brand-orange hover:underline"
              >
                datenschutz@ihre-domain.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">
              8. Cookies und Tracking
            </h2>
            <p>
              Diese Website verwendet keine Tracking-Cookies. Es werden lediglich
              technisch notwendige Session-Cookies verwendet, um die Funktionalität der
              Website zu gewährleisten.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">
              9. SSL-Verschlüsselung
            </h2>
            <p>
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
              vertraulicher Inhalte eine SSL-Verschlüsselung. Erkennbar an dem
              Schloss-Symbol in der Browserzeile und dem "https://" in der URL.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-black mt-8 mb-4">
              10. Änderungen dieser Datenschutzerklärung
            </h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
              stets den aktuellen rechtlichen Anforderungen entspricht.
            </p>
            <p className="font-medium">
              Stand: {new Date().toLocaleDateString("de-DE")}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

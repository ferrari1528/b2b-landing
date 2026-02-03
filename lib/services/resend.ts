import nodemailer from "nodemailer";
import { Lead } from "@/types";
import { withRetry } from "@/lib/utils/retry";
import * as fs from "fs";
import * as path from "path";

const FROM_EMAIL = process.env.GMAIL_FROM_EMAIL || "haendler@e-scooter-futura.de";

// Lazy initialization of Gmail SMTP client
let transporter: nodemailer.Transporter | null = null;

function getGmailClient(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_FROM_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return transporter;
}

/**
 * Send pricelist email to new lead
 */
export async function sendPricelistEmail(lead: Lead): Promise<void> {
  const pdfPath = path.join(process.cwd(), "public", "pricelist", "haendler-preisliste.pdf");

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; }
    .container { max-width: 650px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
    .header { background-color: #F77F00; color: #FFFFFF; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 26px; font-weight: bold; }
    .content { background-color: #FFFFFF; padding: 40px 35px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .content h2 { color: #F77F00; margin-top: 0; font-size: 22px; }
    .content p { margin-bottom: 16px; }
    .highlight-box {
      background-color: #FFF4E6;
      border-left: 4px solid #F77F00;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .cta-button {
      display: inline-block;
      background-color: #F77F00;
      color: #FFFFFF !important;
      padding: 14px 35px;
      text-decoration: none;
      border-radius: 6px;
      margin: 25px 0;
      font-weight: bold;
      font-size: 16px;
      box-shadow: 0 3px 8px rgba(247,127,0,0.3);
    }
    .cta-button:hover { background-color: #E63946; }
    .footer { background-color: #0A0A0A; color: #FAFAFA; padding: 30px; text-align: center; font-size: 13px; border-radius: 8px; margin-top: 20px; }
    .footer a { color: #F77F00; text-decoration: none; }
    ul { padding-left: 25px; margin: 20px 0; }
    li { margin-bottom: 12px; line-height: 1.6; }
    strong { color: #0A0A0A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚡ Elektroroller Futura</h1>
      <p style="margin: 10px 0 0 0; font-size: 16px;">Ihre Partnerschaft für moderne E-Mobilität</p>
    </div>

    <div class="content">
      <h2>Hallo ${lead.name},</h2>

      <p>vielen Dank für Ihr Interesse an einer Partnerschaft mit Elektroroller Futura!</p>

      <p>Wir wissen, dass der Markt für klassische Krankenfahrstühle (6 km/h) oft mit hohem Beratungsaufwand und komplizierten Kassenabrechnungen verbunden ist. Mit unseren Modellen bieten wir Ihrem Sanitätshaus eine attraktive Alternative für das Selbstzahler-Geschäft: <strong>moderne E-Mobilität mit bis zu 25 km/h</strong>, die Lifestyle und Freiheit statt "Reha-Optik" vermittelt.</p>

      <div class="highlight-box">
        <p style="margin: 0;"><strong>📎 Im Anhang finden Sie:</strong></p>
        <ul style="margin: 10px 0 0 0;">
          <li><strong>Ihre exklusive Händler-Preisliste</strong></li>
          <li>Technische Datenblätter für 15 km/h & 25 km/h Elektroroller</li>
          <li>Informationen zu Kabinenrollern – wetterunabhängige Mobilität</li>
          <li>Attraktive Händlermargen ohne Krankenkassen-Bürokratie</li>
        </ul>
      </div>

      <p><strong>Ihre Vorteile als spezialisierter Fachhandelspartner:</strong></p>
      <ul>
        <li><strong>Starke Margen:</strong> Profitieren Sie von attraktiven Konditionen für Selbstzahler-Produkte.</li>
        <li><strong>Kein Abrechnungsstress:</strong> Direkter Verkauf ohne langwierige Kassen-Genehmigungen.</li>
        <li><strong>Exklusivität:</strong> Wir schützen Ihr Verkaufsgebiet in <strong>${lead.stadt}</strong>, um fairen Wettbewerb zu garantieren.</li>
        <li><strong>Full-Service-Support:</strong> Marketingmaterialien (Flyer, Banner) und technischer Support für Ihre Werkstatt sind inklusive.</li>
        <li><strong>Kurze Lieferzeiten:</strong> Unsere Roller sind ab Lager verfügbar, damit Sie direkt verkaufsfähig sind.</li>
      </ul>

      <p>Haben Sie Fragen zur Integration der Roller in Ihr Sortiment oder möchten Sie ein Test-Modell für Ihren Showroom anfordern?</p>

      <center>
        <a href="https://calendly.com/elektroroller-futura/" class="cta-button">🗓️ Jetzt Beratungstermin vereinbaren</a>
      </center>

      <p style="text-align: center; margin-top: 20px;">Oder rufen Sie mich bei Fragen direkt persönlich an:<br>
      <strong style="font-size: 18px; color: #F77F00;">+49 6747 950060</strong></p>

      <p style="margin-top: 30px;">Wir freuen uns darauf, gemeinsam mit Ihnen die Mobilität Ihrer Kunden auf das nächste Level zu heben!</p>

      <p style="margin-top: 30px; line-height: 1.8;">
        <strong>Beste Grüße</strong><br><br>
        <strong>Patrick Ueberberg</strong><br>
        <span style="color: #666;">Ihr Händlerfachberater</span><br><br>
        <strong style="color: #F77F00;">Elektroroller Futura</strong>
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0 0 10px 0; font-size: 15px; font-weight: bold;">Elektroroller Futura – eine Marke der Dr. Ferrari GmbH</p>
      <p style="margin: 8px 0; font-size: 13px;">Industriestraße 1 | 56283 Halsenbach, Deutschland</p>
      <p style="margin: 15px 0; font-size: 13px; line-height: 1.8;">
        📞 Telefon: +49 6747 950060<br>
        📧 E-Mail: <a href="mailto:haendler@e-scooter-futura.de" style="color: #F77F00;">haendler@e-scooter-futura.de</a><br>
        📱 WhatsApp: +49 1796636918
      </p>
      <p style="margin-top: 20px; font-size: 11px;">
        <a href="https://elektroroller-futura.de/info/datenschutzerklaerung" style="color: #F77F00;">Datenschutz</a> |
        <a href="http://localhost:3002/impressum" style="color: #F77F00;">Impressum</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const client = getGmailClient();

  await withRetry(
    async () => {
      // Check if PDF exists, if not, skip attachment
      let attachments = undefined;
      if (fs.existsSync(pdfPath)) {
        attachments = [
          {
            filename: "Haendler-Preisliste-Elektroroller-Futura.pdf",
            path: pdfPath,
          },
        ];
      }

      await client.sendMail({
        from: FROM_EMAIL,
        to: lead.email,
        subject: "Unterlagen: Ihre Partnerschaft mit Futura & neue Umsatzchancen für Ihr Sanitätshaus",
        html,
        attachments,
      });
    },
    {
      maxAttempts: 3,
      onRetry: (attempt, error) => {
        console.log(`Retry ${attempt} for sendPricelistEmail:`, error.message);
      },
    }
  );
}

/**
 * Send Day 2 follow-up email
 */
export async function sendDay2FollowupEmail(
  lead: Lead,
  personalizedMessage: string
): Promise<void> {
  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0A0A0A; color: #FAFAFA; padding: 20px; text-align: center; }
    .content { background-color: #FFFFFF; padding: 30px; }
    .content h2 { color: #F77F00; }
    .cta-button {
      display: inline-block;
      background-color: #F77F00;
      color: #FFFFFF;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
      font-weight: bold;
    }
    .footer { background-color: #F5F5F5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛴 Elektroroller Futura</h1>
    </div>

    <div class="content">
      <h2>Hallo ${lead.name},</h2>

      ${personalizedMessage.split("\n").map((line) => `<p>${line}</p>`).join("")}

      <a href="https://calendly.com/ihr-kalender" class="cta-button">Beratungsgespräch vereinbaren</a>

      <p>
        Mit freundlichen Grüßen<br>
        <strong>Ihr Team von Elektroroller Futura</strong>
      </p>
    </div>

    <div class="footer">
      <p>Elektroroller Futura GmbH | Tel: +49 (0)123 456789 | ${FROM_EMAIL}</p>
    </div>
  </div>
</body>
</html>
  `;

  const client = getGmailClient();

  await withRetry(async () => {
    await client.sendMail({
      from: FROM_EMAIL,
      to: lead.email,
      subject: "Haben Sie noch Fragen zur Händler-Partnerschaft? 🤔",
      html,
    });
  });
}

/**
 * Send Day 4 reminder email
 */
export async function sendDay4ReminderEmail(lead: Lead): Promise<void> {
  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #E63946; color: #FAFAFA; padding: 20px; text-align: center; }
    .content { background-color: #FFFFFF; padding: 30px; }
    .content h2 { color: #E63946; }
    .cta-button {
      display: inline-block;
      background-color: #E63946;
      color: #FFFFFF;
      padding: 15px 40px;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
      font-weight: bold;
      font-size: 16px;
    }
    .highlight-box {
      background-color: #FFF4E6;
      border-left: 4px solid #F77F00;
      padding: 15px;
      margin: 20px 0;
    }
    .footer { background-color: #F5F5F5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⏰ Letzte Chance: Exklusive Gebietsrechte für ${lead.stadt}</h1>
    </div>

    <div class="content">
      <h2>Hallo ${lead.name},</h2>

      <p>vor einigen Tagen haben Sie unsere Händler-Preisliste angefordert. Wir möchten sicherstellen, dass Sie keine Gelegenheit verpassen!</p>

      <div class="highlight-box">
        <strong>⚠️ Wichtig:</strong> Die exklusiven Gebietsrechte für ${lead.stadt} sind aktuell noch verfügbar.
        Sichern Sie sich jetzt Ihren Wettbewerbsvorteil, bevor ein anderes Sanitätshaus in Ihrer Region zuschlägt!
      </div>

      <p><strong>Das wartet auf Sie:</strong></p>
      <ul>
        <li>Exklusiver Vertrieb in ${lead.stadt}</li>
        <li>Sofort startbereit mit Demo-Fahrzeugen</li>
        <li>Kostenlose Verkaufsschulung (Online & vor Ort)</li>
        <li>Monatlich wiederkehrende Umsätze durch Service & Ersatzteile</li>
      </ul>

      <p><strong>Vereinbaren Sie jetzt ein 15-minütiges Beratungsgespräch</strong> – unverbindlich und kostenlos:</p>

      <a href="https://calendly.com/ihr-kalender" class="cta-button">📞 Jetzt Termin buchen</a>

      <p>Falls Sie kein Interesse mehr haben, können Sie diese E-Mail einfach ignorieren. Wir kontaktieren Sie dann nicht weiter.</p>

      <p>
        Mit freundlichen Grüßen<br>
        <strong>Ihr Team von Elektroroller Futura</strong><br>
        Tel: +49 (0)123 456789
      </p>
    </div>

    <div class="footer">
      <p>Elektroroller Futura GmbH | ${FROM_EMAIL}</p>
      <p><a href="https://ihre-domain.de/datenschutz" style="color: #666;">Abmelden</a></p>
    </div>
  </div>
</body>
</html>
  `;

  const client = getGmailClient();

  await withRetry(async () => {
    await client.sendMail({
      from: FROM_EMAIL,
      to: lead.email,
      subject: `⏰ ${lead.name}, sichern Sie sich exklusive Gebietsrechte für ${lead.stadt}`,
      html,
    });
  });
}

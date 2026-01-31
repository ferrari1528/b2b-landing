import { Resend } from "resend";
import { Lead } from "@/types";
import { withRetry } from "@/lib/utils/retry";
import * as fs from "fs";
import * as path from "path";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "kontakt@ihre-domain.de";

// Lazy initialization of Resend client
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY || "dummy-key-for-build");
  }
  return resend;
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
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0A0A0A; color: #FAFAFA; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background-color: #FFFFFF; padding: 30px; }
    .content h2 { color: #F77F00; margin-top: 0; }
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
    ul { padding-left: 20px; }
    li { margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛴 Elektroroller Futura</h1>
      <p>Ihre Händler-Preisliste</p>
    </div>

    <div class="content">
      <h2>Hallo ${lead.name},</h2>

      <p>vielen Dank für Ihr Interesse an einer Partnerschaft mit Elektroroller Futura!</p>

      <p>Im Anhang finden Sie unsere <strong>exklusive Händler-Preisliste</strong> mit allen Konditionen für:</p>

      <ul>
        <li>15 km/h Elektroroller (führerscheinfrei ab 15 Jahren)</li>
        <li>25 km/h Elektroroller & Kabinenroller</li>
        <li>Ersatzteile und Zubehör</li>
        <li>Ihre Händlermargen</li>
      </ul>

      <p><strong>Ihre Vorteile als Vertriebspartner:</strong></p>
      <ul>
        <li>Exklusive Gebietsrechte für ${lead.stadt}</li>
        <li>Attraktive Händlermargen</li>
        <li>Kostenlose Schulungen & Demos</li>
        <li>Marketing-Support (Flyer, Banner, Online-Material)</li>
        <li>Schnelle Lieferzeiten ab Lager</li>
        <li>Persönlicher Ansprechpartner</li>
      </ul>

      <p>Haben Sie Fragen zu den Konditionen oder möchten Sie ein unverbindliches Beratungsgespräch vereinbaren?</p>

      <a href="https://calendly.com/ihr-kalender" class="cta-button">Jetzt Beratungstermin buchen</a>

      <p>Oder rufen Sie uns direkt an: <strong>+49 (0)123 456789</strong></p>

      <p>Wir freuen uns auf die Zusammenarbeit!</p>

      <p>
        Mit freundlichen Grüßen<br>
        <strong>Ihr Team von Elektroroller Futura</strong>
      </p>
    </div>

    <div class="footer">
      <p>Elektroroller Futura GmbH<br>
      Musterstraße 123, 12345 Musterstadt<br>
      Tel: +49 (0)123 456789 | E-Mail: ${FROM_EMAIL}</p>

      <p style="margin-top: 20px;">
        <a href="https://ihre-domain.de/datenschutz" style="color: #666; text-decoration: none;">Datenschutz</a> |
        <a href="https://ihre-domain.de/impressum" style="color: #666; text-decoration: none;">Impressum</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const client = getResendClient();

  await withRetry(
    async () => {
      // Check if PDF exists, if not, skip attachment
      let attachments = undefined;
      if (fs.existsSync(pdfPath)) {
        const pdfBuffer = fs.readFileSync(pdfPath);
        attachments = [
          {
            filename: "Haendler-Preisliste-Elektroroller-Futura.pdf",
            content: pdfBuffer,
          },
        ];
      }

      await client.emails.send({
        from: FROM_EMAIL,
        to: lead.email,
        subject: "Ihre Händler-Preisliste für Elektroroller Futura 🛴",
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

  const client = getResendClient();

  await withRetry(async () => {
    await client.emails.send({
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

  const client = getResendClient();

  await withRetry(async () => {
    await client.emails.send({
      from: FROM_EMAIL,
      to: lead.email,
      subject: `⏰ ${lead.name}, sichern Sie sich exklusive Gebietsrechte für ${lead.stadt}`,
      html,
    });
  });
}

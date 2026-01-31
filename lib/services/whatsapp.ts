import { formatPhoneToE164 } from "@/lib/utils/formatters";
import { withRetry } from "@/lib/utils/retry";

const TWOCHAT_API_KEY = process.env.TWOCHAT_API_KEY;
const TWOCHAT_CHANNEL_ID = process.env.TWOCHAT_CHANNEL_ID;

/**
 * Send WhatsApp message via 2chat
 */
export async function sendWhatsAppMessage(
  to: string,
  message: string
): Promise<void> {
  if (!TWOCHAT_API_KEY || !TWOCHAT_CHANNEL_ID) {
    console.warn("2chat credentials not configured, skipping WhatsApp message");
    return;
  }

  const toNumber = formatPhoneToE164(to);
  // 2chat expects phone number without "whatsapp:" prefix
  const cleanNumber = toNumber.replace("whatsapp:", "");

  const twoChatUrl = "https://api.2chat.io/open/send/message";

  await withRetry(
    async () => {
      const response = await fetch(twoChatUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-API-Key": TWOCHAT_API_KEY,
        },
        body: JSON.stringify({
          phone_number: cleanNumber,
          text: message,
          channel_id: TWOCHAT_CHANNEL_ID,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`2chat API error: ${error}`);
      }

      const data = await response.json();
      console.log("WhatsApp message sent via 2chat:", data);
    },
    {
      maxAttempts: 3,
      onRetry: (attempt, error) => {
        console.log(`Retry ${attempt} for sendWhatsAppMessage:`, error.message);
      },
    }
  );
}

/**
 * Send Day 2 follow-up via WhatsApp
 */
export async function sendDay2WhatsAppFollowup(
  to: string,
  leadName: string,
  stadt: string
): Promise<void> {
  const message = `Hallo ${leadName}! 👋

Haben Sie unsere Händler-Preisliste für Elektroroller erhalten?

Falls Sie Fragen haben oder mehr über die exklusiven Gebietsrechte für ${stadt} erfahren möchten, antworten Sie einfach auf diese Nachricht.

Oder buchen Sie direkt ein Beratungsgespräch: https://calendly.com/ihr-kalender

Viele Grüße
Ihr Team von Elektroroller Futura 🛴`;

  await sendWhatsAppMessage(to, message);
}

/**
 * Send Day 4 reminder via WhatsApp
 */
export async function sendDay4WhatsAppReminder(
  to: string,
  leadName: string,
  stadt: string
): Promise<void> {
  const message = `⏰ ${leadName}, die exklusiven Gebietsrechte für ${stadt} sind noch verfügbar!

Sichern Sie sich jetzt Ihren Wettbewerbsvorteil:
📞 Beratungsgespräch buchen: https://calendly.com/ihr-kalender

Bei Interesse einfach antworten! 🚀

Elektroroller Futura`;

  await sendWhatsAppMessage(to, message);
}

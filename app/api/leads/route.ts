import { NextRequest, NextResponse } from "next/server";
import { leadRegistrationSchema } from "@/lib/validations/schemas";
import { googleSheetsService } from "@/lib/services/googleSheets";
import { sendPricelistEmail } from "@/lib/services/resend";
import { formatPhoneToE164 } from "@/lib/utils/formatters";
import { nanoid } from "nanoid";
import { Lead } from "@/types";

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // 5 requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();

    // Honeypot check - if filled, it's a bot
    if (body.honeypot && body.honeypot.length > 0) {
      console.warn("Honeypot triggered, possible spam:", ip);
      return NextResponse.json(
        {
          success: false,
          error: "Ungültige Anfrage",
        },
        { status: 400 }
      );
    }

    // Validate with Zod
    const validationResult = leadRegistrationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validierungsfehler",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Format phone number to E.164
    const formattedPhone = formatPhoneToE164(data.telefon);

    // Generate unique lead ID
    const leadId = nanoid(12);

    // Create lead object
    const lead: Lead = {
      timestamp: new Date().toISOString(),
      leadId,
      name: data.name,
      firma: data.firma,
      email: data.email,
      telefon: formattedPhone,
      sanitaetshaus: data.sanitaetshaus,
      stadt: data.stadt,
      status: "Neu",
      dsgvoConsent: data.dsgvoConsent,
    };

    // Save to Google Sheets
    await googleSheetsService.appendLead(lead);

    // Send pricelist email
    await sendPricelistEmail(lead);

    // Update status to "Preisliste versendet"
    await googleSheetsService.updateLeadStatus(
      leadId,
      "Preisliste versendet",
      "preislisteAm"
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          leadId,
          message:
            "Vielen Dank! Ihre Händler-Preisliste wurde an Ihre E-Mail-Adresse gesendet.",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/leads:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { googleSheetsService } from "@/lib/services/googleSheets";
import { generateDay2FollowupMessage } from "@/lib/services/deepseek";
import { sendDay2FollowupEmail } from "@/lib/services/resend";
import { sendDay2WhatsAppFollowup } from "@/lib/services/whatsapp";

const CRON_SECRET = process.env.CRON_SECRET || "change-me";

/**
 * GET /api/cron/day2-followup
 * Triggered by Vercel Cron daily at 10:00
 *
 * Sends follow-up messages to leads 2 days after registration
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");

    if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("[Day 2 Follow-up] Starting cron job...");

    // Get leads that need Day 2 follow-up
    // Status: "Preisliste versendet", registered 2+ days ago
    const leads = await googleSheetsService.getLeadsForFollowup(
      "Preisliste versendet",
      2
    );

    console.log(`[Day 2 Follow-up] Found ${leads.length} leads to follow up`);

    const results = {
      total: leads.length,
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const lead of leads) {
      try {
        console.log(`[Day 2 Follow-up] Processing lead ${lead.leadId} (${lead.email})`);

        // Generate personalized message using DeepSeek
        const personalizedMessage = await generateDay2FollowupMessage(
          lead.name,
          lead.firma,
          lead.stadt
        );

        // Send email
        await sendDay2FollowupEmail(lead, personalizedMessage);

        // Send WhatsApp (optional, won't fail if not configured)
        try {
          await sendDay2WhatsAppFollowup(lead.telefon, lead.name, lead.stadt);
        } catch (whatsappError) {
          console.warn(
            `[Day 2 Follow-up] WhatsApp failed for ${lead.leadId}:`,
            whatsappError
          );
          // Don't fail the entire process if WhatsApp fails
        }

        // Update lead status
        await googleSheetsService.updateLeadStatus(
          lead.leadId,
          "Tag 2 Follow-up",
          "followupTag2Am"
        );

        results.success++;
        console.log(`[Day 2 Follow-up] Successfully processed ${lead.leadId}`);
      } catch (error) {
        results.failed++;
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        results.errors.push(`Lead ${lead.leadId}: ${errorMessage}`);
        console.error(`[Day 2 Follow-up] Failed for ${lead.leadId}:`, error);
      }
    }

    console.log("[Day 2 Follow-up] Cron job completed:", results);

    return NextResponse.json(
      {
        success: true,
        message: "Day 2 follow-up cron job completed",
        data: results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Day 2 Follow-up] Cron job error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Cron job failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

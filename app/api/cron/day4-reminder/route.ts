import { NextRequest, NextResponse } from "next/server";
import { googleSheetsService } from "@/lib/services/googleSheets";
import { sendDay4ReminderEmail } from "@/lib/services/resend";
import { sendDay4WhatsAppReminder } from "@/lib/services/whatsapp";

const CRON_SECRET = process.env.CRON_SECRET || "change-me";

/**
 * GET /api/cron/day4-reminder
 * Triggered by Vercel Cron daily at 10:00
 *
 * Sends final reminder to leads 4 days after registration
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

    console.log("[Day 4 Reminder] Starting cron job...");

    // Get leads that need Day 4 reminder
    // Status: "Tag 2 Follow-up", registered 4+ days ago
    const leads = await googleSheetsService.getLeadsForFollowup("Tag 2 Follow-up", 4);

    console.log(`[Day 4 Reminder] Found ${leads.length} leads to remind`);

    const results = {
      total: leads.length,
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const lead of leads) {
      try {
        console.log(`[Day 4 Reminder] Processing lead ${lead.leadId} (${lead.email})`);

        // Send final reminder email
        await sendDay4ReminderEmail(lead);

        // Send WhatsApp reminder (optional)
        try {
          await sendDay4WhatsAppReminder(lead.telefon, lead.name, lead.stadt);
        } catch (whatsappError) {
          console.warn(
            `[Day 4 Reminder] WhatsApp failed for ${lead.leadId}:`,
            whatsappError
          );
          // Don't fail the entire process if WhatsApp fails
        }

        // Update lead status to final state
        await googleSheetsService.updateLeadStatus(
          lead.leadId,
          "Tag 4 Reminder",
          "reminderTag4Am"
        );

        results.success++;
        console.log(`[Day 4 Reminder] Successfully processed ${lead.leadId}`);
      } catch (error) {
        results.failed++;
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        results.errors.push(`Lead ${lead.leadId}: ${errorMessage}`);
        console.error(`[Day 4 Reminder] Failed for ${lead.leadId}:`, error);
      }
    }

    console.log("[Day 4 Reminder] Cron job completed:", results);

    return NextResponse.json(
      {
        success: true,
        message: "Day 4 reminder cron job completed",
        data: results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Day 4 Reminder] Cron job error:", error);

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

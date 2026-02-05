import { google, sheets_v4 } from "googleapis";
import { Lead, ChatMessage, ChatbotConfig, LeadStatus } from "@/types";
import { withRetry } from "@/lib/utils/retry";

// Singleton Google Sheets Client
class GoogleSheetsService {
  private sheets: sheets_v4.Sheets | null = null;
  private spreadsheetId: string;

  constructor() {
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || "";
  }

  private async getClient(): Promise<sheets_v4.Sheets> {
    if (this.sheets) {
      return this.sheets;
    }

    try {
      // Try to use GOOGLE_SERVICE_ACCOUNT_JSON first (preferred)
      if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
        const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
        const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        this.sheets = google.sheets({ version: "v4", auth });
        return this.sheets;
      }

      // Fallback to individual environment variables
      let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY || "";
      privateKey = privateKey.replace(/\\n/g, "\n");

      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SHEETS_CREDENTIALS_EMAIL,
          private_key: privateKey,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      this.sheets = google.sheets({ version: "v4", auth });
      return this.sheets;
    } catch (error) {
      console.error("Failed to initialize Google Sheets client:", error);
      throw new Error("Google Sheets initialization failed");
    }
  }

  /**
   * Append new lead to B2B_Leads sheet
   */
  async appendLead(lead: Omit<Lead, "timestamp">): Promise<void> {
    const sheets = await this.getClient();

    const values = [
      [
        new Date().toISOString(), // timestamp
        lead.leadId,
        lead.name,
        lead.firma,
        lead.email,
        lead.telefon,
        lead.sanitaetshaus,
        lead.stadt,
        lead.status || "Neu",
        lead.preislisteAm || "",
        lead.followupTag2Am || "",
        lead.reminderTag4Am || "",
        lead.dsgvoConsent.toString(),
      ],
    ];

    await withRetry(
      async () => {
        await sheets.spreadsheets.values.append({
          spreadsheetId: this.spreadsheetId,
          range: "B2B_Leads!A:M",
          valueInputOption: "USER_ENTERED",
          requestBody: { values },
        });
      },
      {
        maxAttempts: 3,
        onRetry: (attempt, error) => {
          console.log(`Retry ${attempt} for appendLead:`, error.message);
        },
      }
    );
  }

  /**
   * Get leads for follow-up (by status and time filter)
   */
  async getLeadsForFollowup(
    status: LeadStatus,
    daysAgo: number
  ): Promise<Lead[]> {
    const sheets = await this.getClient();

    const response = await withRetry(async () => {
      return await sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "B2B_Leads!A2:M",
      });
    });

    const rows = response.data.values || [];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);

    const leads: Lead[] = rows
      .map((row) => ({
        timestamp: row[0],
        leadId: row[1],
        name: row[2],
        firma: row[3],
        email: row[4],
        telefon: row[5],
        sanitaetshaus: row[6],
        stadt: row[7],
        status: row[8] as LeadStatus,
        preislisteAm: row[9] || undefined,
        followupTag2Am: row[10] || undefined,
        reminderTag4Am: row[11] || undefined,
        dsgvoConsent: row[12] === "true" || row[12] === "TRUE",
      }))
      .filter((lead) => {
        if (lead.status !== status) return false;

        const leadDate = new Date(lead.timestamp);
        const diffTime = Date.now() - leadDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return diffDays >= daysAgo;
      });

    return leads;
  }

  /**
   * Update lead status
   */
  async updateLeadStatus(
    leadId: string,
    newStatus: LeadStatus,
    timestampField?: "preislisteAm" | "followupTag2Am" | "reminderTag4Am"
  ): Promise<void> {
    const sheets = await this.getClient();

    // First, find the row
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "B2B_Leads!A2:M",
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[1] === leadId);

    if (rowIndex === -1) {
      throw new Error(`Lead ${leadId} not found`);
    }

    const actualRowNumber = rowIndex + 2; // +2 because of header and 0-index

    // Update status (column I)
    await sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `B2B_Leads!I${actualRowNumber}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[newStatus]],
      },
    });

    // Update timestamp if specified
    if (timestampField) {
      const columnMap = {
        preislisteAm: "J",
        followupTag2Am: "K",
        reminderTag4Am: "L",
      };
      const column = columnMap[timestampField];

      await sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `B2B_Leads!${column}${actualRowNumber}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[new Date().toISOString()]],
        },
      });
    }
  }

  /**
   * Append chat message to Chatbot_Conversations sheet
   */
  async appendChatMessage(message: Omit<ChatMessage, "timestamp">): Promise<void> {
    const sheets = await this.getClient();

    const values = [
      [
        new Date().toISOString(),
        message.conversationId,
        message.leadId || "",
        message.role,
        message.message,
        message.email || "",
        message.whatsappFollowup?.toString() || "false",
      ],
    ];

    await withRetry(async () => {
      await sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: "Chatbot_Conversations!A:G",
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });
    });
  }

  /**
   * Get conversation history
   */
  async getConversationHistory(conversationId: string): Promise<ChatMessage[]> {
    const sheets = await this.getClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "Chatbot_Conversations!A2:G",
    });

    const rows = response.data.values || [];

    return rows
      .filter((row) => row[1] === conversationId)
      .map((row) => ({
        timestamp: row[0],
        conversationId: row[1],
        leadId: row[2] || undefined,
        role: row[3] as "user" | "assistant",
        message: row[4],
        email: row[5] || undefined,
        whatsappFollowup: row[6] === "true",
      }));
  }

  /**
   * Get chatbot system prompt from System_Config sheet
   */
  async getChatbotSystemPrompt(): Promise<string> {
    const sheets = await this.getClient();

    const response = await withRetry(async () => {
      return await sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "System_Config!A2:B",
      });
    });

    const rows = response.data.values || [];
    const configRow = rows.find((row) => row[0] === "chatbot_system_prompt");

    if (!configRow || !configRow[1]) {
      // Return default prompt if not found
      return `Du bist ein KI-Assistent für Elektroroller Futura.
Zielgruppe: Inhaber von Sanitätshäusern.
Produkte: 15 km/h und 25 km/h Elektroroller als Alternative zu 6 km/h Krankenkassen-Modellen.
Beantworte Fragen zu Preisen, Lieferkonditionen, Händler-Margen professionell und hilfsbereit.`;
    }

    return configRow[1];
  }

  /**
   * Update chatbot system prompt
   */
  async updateChatbotSystemPrompt(newPrompt: string): Promise<void> {
    const sheets = await this.getClient();

    // Check if config exists
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: "System_Config!A2:C",
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === "chatbot_system_prompt");

    if (rowIndex === -1) {
      // Create new config entry
      await sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: "System_Config!A:C",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [["chatbot_system_prompt", newPrompt, new Date().toISOString()]],
        },
      });
    } else {
      // Update existing config
      const actualRowNumber = rowIndex + 2;
      await sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `System_Config!B${actualRowNumber}:C${actualRowNumber}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[newPrompt, new Date().toISOString()]],
        },
      });
    }
  }
}

// Export singleton instance
export const googleSheetsService = new GoogleSheetsService();

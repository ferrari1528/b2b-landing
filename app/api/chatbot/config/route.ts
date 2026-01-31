import { NextRequest, NextResponse } from "next/server";
import { googleSheetsService } from "@/lib/services/googleSheets";
import { invalidateSystemPromptCache } from "@/lib/services/deepseek";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "change-me";

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) return false;

  // Support Basic Auth or Bearer Token
  if (authHeader.startsWith("Basic ")) {
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [, password] = credentials.split(":");
    return password === ADMIN_PASSWORD;
  }

  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return token === ADMIN_PASSWORD;
  }

  return false;
}

/**
 * GET /api/chatbot/config
 * Returns current system prompt
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!checkAuth(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' } }
      );
    }

    const systemPrompt = await googleSheetsService.getChatbotSystemPrompt();

    return NextResponse.json(
      {
        success: true,
        data: {
          systemPrompt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/chatbot/config:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Fehler beim Laden der Konfiguration",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/chatbot/config
 * Updates system prompt
 */
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!checkAuth(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Admin Area"' } }
      );
    }

    const body = await request.json();

    if (!body.systemPrompt || typeof body.systemPrompt !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Ungültiger System Prompt",
        },
        { status: 400 }
      );
    }

    if (body.systemPrompt.length < 10 || body.systemPrompt.length > 4000) {
      return NextResponse.json(
        {
          success: false,
          error: "System Prompt muss zwischen 10 und 4000 Zeichen lang sein",
        },
        { status: 400 }
      );
    }

    // Update in Google Sheets
    await googleSheetsService.updateChatbotSystemPrompt(body.systemPrompt);

    // Invalidate cache
    invalidateSystemPromptCache();

    return NextResponse.json(
      {
        success: true,
        message: "System Prompt erfolgreich aktualisiert",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/chatbot/config:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Fehler beim Speichern der Konfiguration",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { chatMessageSchema } from "@/lib/validations/schemas";
import { googleSheetsService } from "@/lib/services/googleSheets";
import { generateChatResponse } from "@/lib/services/deepseek";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    const validationResult = chatMessageSchema.safeParse(body);

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

    // Generate or use existing conversation ID
    const conversationId = data.conversationId || nanoid(16);

    // Get conversation history
    let conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = [];

    if (data.conversationId) {
      const messages = await googleSheetsService.getConversationHistory(
        data.conversationId
      );
      conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.message,
      }));
    }

    // Generate AI response
    const aiReply = await generateChatResponse(data.message, conversationHistory);

    // Save user message to Google Sheets
    await googleSheetsService.appendChatMessage({
      conversationId,
      role: "user",
      message: data.message,
      email: data.email,
      leadId: data.leadId,
    });

    // Save AI response to Google Sheets
    await googleSheetsService.appendChatMessage({
      conversationId,
      role: "assistant",
      message: aiReply,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          reply: aiReply,
          conversationId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/chatbot:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Fehler bei der AI-Antwort. Bitte versuchen Sie es erneut.",
      },
      { status: 500 }
    );
  }
}

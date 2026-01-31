import OpenAI from "openai";
import { googleSheetsService } from "./googleSheets";
import { withRetry } from "@/lib/utils/retry";

const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

// Lazy initialization of DeepSeek client
let deepseek: OpenAI | null = null;

function getDeepSeekClient(): OpenAI {
  if (!deepseek) {
    deepseek = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY || "dummy-key-for-build",
      baseURL: "https://api.deepseek.com",
    });
  }
  return deepseek;
}

// Cache system prompt (1 hour)
let cachedSystemPrompt: string | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Get system prompt from cache or Google Sheets
 */
async function getSystemPrompt(): Promise<string> {
  const now = Date.now();

  if (cachedSystemPrompt && now - cacheTimestamp < CACHE_DURATION) {
    return cachedSystemPrompt;
  }

  cachedSystemPrompt = await googleSheetsService.getChatbotSystemPrompt();
  cacheTimestamp = now;

  return cachedSystemPrompt;
}

/**
 * Invalidate system prompt cache
 */
export function invalidateSystemPromptCache(): void {
  cachedSystemPrompt = null;
  cacheTimestamp = 0;
}

/**
 * Generate chat response using DeepSeek
 */
export async function generateChatResponse(
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<string> {
  const systemPrompt = await getSystemPrompt();

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: systemPrompt,
    },
    ...conversationHistory.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
    {
      role: "user",
      content: userMessage,
    },
  ];

  const client = getDeepSeekClient();

  const response = await withRetry(
    async () => {
      return await client.chat.completions.create({
        model: MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      });
    },
    {
      maxAttempts: 3,
      onRetry: (attempt, error) => {
        console.log(`Retry ${attempt} for DeepSeek API:`, error.message);
      },
    }
  );

  const reply = response.choices[0]?.message?.content || "Entschuldigung, ich konnte keine Antwort generieren.";

  return reply;
}

/**
 * Generate personalized follow-up message for Day 2
 */
export async function generateDay2FollowupMessage(
  leadName: string,
  firma: string,
  stadt: string
): Promise<string> {
  const prompt = `Erstelle eine freundliche, professionelle Follow-up E-Mail-Nachricht (nur der Haupttext, keine Betreffzeile) für einen B2B-Lead:

Name: ${leadName}
Firma: ${firma}
Stadt: ${stadt}

Die Person hat vor 2 Tagen unsere Händler-Preisliste für Elektroroller (15 km/h & 25 km/h) angefordert.

Anforderungen:
- Persönlich und nicht generisch
- Frage, ob sie die Preisliste erhalten haben und Fragen haben
- Betone exklusive Gebietsrechte für ${stadt}
- Erwähne konkrete nächste Schritte (Beratungsgespräch)
- Maximal 4 Absätze
- Professionell aber nicht zu steif
- Keine Betreffzeile, nur der Nachrichtentext`;

  const client = getDeepSeekClient();

  const response = await withRetry(async () => {
    return await client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "Du bist ein B2B-Marketing-Experte für Elektromobilität. Erstelle personalisierte Follow-up E-Mails.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });
  });

  return response.choices[0]?.message?.content || "Haben Sie unsere Preisliste erhalten? Bei Fragen stehen wir Ihnen gerne zur Verfügung!";
}

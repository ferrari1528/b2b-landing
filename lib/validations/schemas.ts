import { z } from "zod";

// Lead Registration Schema
export const leadRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name muss mindestens 2 Zeichen lang sein")
    .max(100, "Name ist zu lang"),
  firma: z
    .string()
    .min(2, "Firmenname muss mindestens 2 Zeichen lang sein")
    .max(200, "Firmenname ist zu lang"),
  email: z
    .string()
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein")
    .toLowerCase(),
  telefon: z
    .string()
    .min(8, "Telefonnummer ist zu kurz")
    .max(20, "Telefonnummer ist zu lang")
    .regex(
      /^[\d\s\+\-\(\)]+$/,
      "Telefonnummer enthält ungültige Zeichen"
    ),
  sanitaetshaus: z
    .string()
    .min(2, "Sanitätshaus-Name muss mindestens 2 Zeichen lang sein")
    .max(200, "Sanitätshaus-Name ist zu lang"),
  stadt: z
    .string()
    .min(2, "Stadt muss mindestens 2 Zeichen lang sein")
    .max(100, "Stadt ist zu lang"),
  dsgvoConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Sie müssen der Datenschutzerklärung zustimmen",
    }),
  honeypot: z.string().max(0).optional(), // Must be empty (anti-spam)
});

export type LeadRegistrationInput = z.infer<typeof leadRegistrationSchema>;

// Chat Message Schema
export const chatMessageSchema = z.object({
  conversationId: z.string().optional(),
  message: z
    .string()
    .min(1, "Nachricht darf nicht leer sein")
    .max(2000, "Nachricht ist zu lang"),
  email: z.string().email().optional(),
  leadId: z.string().optional(),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;

// Chatbot Config Schema
export const chatbotConfigSchema = z.object({
  systemPrompt: z
    .string()
    .min(10, "System Prompt muss mindestens 10 Zeichen lang sein")
    .max(4000, "System Prompt ist zu lang"),
  password: z.string().min(1, "Passwort ist erforderlich"),
});

export type ChatbotConfigInput = z.infer<typeof chatbotConfigSchema>;

// Email Schema
export const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
  attachments: z
    .array(
      z.object({
        filename: z.string(),
        path: z.string(),
      })
    )
    .optional(),
});

// WhatsApp Schema
export const whatsappMessageSchema = z.object({
  to: z.string().regex(/^\+\d{10,15}$/),
  message: z.string().min(1).max(1600),
});

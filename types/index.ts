// Lead Types
export interface Lead {
  timestamp: string;
  leadId: string;
  name: string;
  firma: string;
  email: string;
  telefon: string;
  sanitaetshaus: string;
  stadt: string;
  status: LeadStatus;
  preislisteAm?: string;
  followupTag2Am?: string;
  reminderTag4Am?: string;
  dsgvoConsent: boolean;
}

export type LeadStatus =
  | "Neu"
  | "Preisliste versendet"
  | "Tag 2 Follow-up"
  | "Tag 4 Reminder";

// Chatbot Types
export interface ChatMessage {
  timestamp: string;
  conversationId: string;
  leadId?: string;
  role: "user" | "assistant";
  message: string;
  email?: string;
  whatsappFollowup?: boolean;
}

export interface ChatbotConfig {
  configKey: string;
  configValue: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LeadRegistrationResponse {
  leadId: string;
  message: string;
}

export interface ChatbotResponse {
  reply: string;
  conversationId: string;
}

// Form Types
export interface LeadFormData {
  name: string;
  firma: string;
  email: string;
  telefon: string;
  sanitaetshaus: string;
  stadt: string;
  dsgvoConsent: boolean;
  honeypot?: string; // Anti-spam field
}

export interface ChatRequest {
  conversationId?: string;
  message: string;
  email?: string;
  leadId?: string;
}

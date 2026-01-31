/**
 * Format phone number to E.164 format (+49...)
 */
export function formatPhoneToE164(phone: string): string {
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, "");

  // If starts with 0, replace with +49
  if (cleaned.startsWith("0")) {
    cleaned = "+49" + cleaned.substring(1);
  }

  // If starts with 49, add +
  if (cleaned.startsWith("49")) {
    cleaned = "+" + cleaned;
  }

  // If doesn't start with +, assume German number
  if (!cleaned.startsWith("+")) {
    cleaned = "+49" + cleaned;
  }

  return cleaned;
}

/**
 * Format phone number for display (German format)
 */
export function formatPhoneForDisplay(phone: string): string {
  const cleaned = phone.replace(/[^\d]/g, "");

  if (cleaned.length >= 10) {
    // Format: +49 (0)1234 567890
    return `+49 (0)${cleaned.substring(2, 6)} ${cleaned.substring(6)}`;
  }

  return phone;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format date to German locale
 */
export function formatDateGerman(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/**
 * Sanitize string for safe output
 */
export function sanitizeString(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

/**
 * Generate unique ID using timestamp and random string
 */
export function generateId(prefix: string = ""): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

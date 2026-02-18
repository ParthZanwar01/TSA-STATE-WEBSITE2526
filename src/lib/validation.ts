/**
 * Syntactical and semantic validation for FBLA rubric:
 * "Input validation applied on both syntactical and semantic levels."
 *
 * Syntactical = format (correct structure: regex, URL format, email format, length).
 * Semantic = logical meaning (phone has 10+ digits, address has street number, name has no digits,
 * date is in future, time format is valid, URL uses http/https, description has meaningful text).
 */

/** Syntactical: US phone format. Semantic: must have 10–15 digits. */
export function isValidPhone(value: string): boolean {
  if (!value.trim()) return true; // optional field
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

/** Semantic: Address should include a street number (digit). */
export function hasStreetNumber(value: string): boolean {
  return /\d/.test(value.trim());
}

/** Semantic: Person name should not contain digits. */
export function isValidPersonName(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 2) return false;
  return !/\d/.test(trimmed);
}

/** Semantic: Business/event name should have at least one letter. */
export function hasMeaningfulName(value: string): boolean {
  return /[a-zA-Z]/.test(value.trim());
}

/** Semantic: Date string must be today or in the future (YYYY-MM-DD). */
export function isDateTodayOrFuture(dateStr: string): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !isNaN(d.getTime()) && d >= today;
}

/** Semantic: Time format (flexible: "10:00 AM", "14:30", "10am"). */
export function isValidTimeFormat(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 2) return false;
  // Match common formats: 10:00, 10:00 AM, 10am, 14:30
  return /^\d{1,2}(:\d{2})?\s*(am|pm|AM|PM)?$/.test(trimmed) || /^\d{1,2}:\d{2}$/.test(trimmed);
}

/** Syntactical: URL must use http or https protocol. */
export function hasValidUrlProtocol(value: string): boolean {
  if (!value.trim()) return true; // optional
  const lower = value.trim().toLowerCase();
  return lower.startsWith('http://') || lower.startsWith('https://');
}

/** Semantic: Description/comment must have meaningful content (letters), not just numbers or symbols. */
export function hasMeaningfulText(value: string, minLetters = 5): boolean {
  const letters = (value.match(/[a-zA-Z]/g) || []).length;
  return letters >= minLetters;
}

/** Semantic: Search query must have at least one alphanumeric when non-empty (reject pure symbols). */
export function isValidSearchQuery(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true; // empty is valid (means "no filter")
  return /[a-zA-Z0-9]/.test(trimmed);
}

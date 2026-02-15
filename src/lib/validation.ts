/**
 * Syntactical and semantic validation helpers for FBLA rubric:
 * "Input validation: Validates both format and meaning. Prevents crashes and provides helpful error messages."
 */

/** Syntactical: US phone must have at least 10 digits. */
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

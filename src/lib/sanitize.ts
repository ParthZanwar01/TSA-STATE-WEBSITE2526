/**
 * Input sanitization for data storage with security (FBLA rubric).
 * Trims and limits strings before storing in localStorage.
 */

const MAX_TEXT_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;

/** Sanitize text: trim, limit length, strip control chars. */
export function sanitizeText(text: string, maxLen = MAX_TEXT_LENGTH): string {
  return String(text ?? '')
    // eslint-disable-next-line no-control-regex -- intentionally stripping control chars for security
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLen);
}

/** Sanitize name/author: trim, limit length. */
export function sanitizeName(name: string): string {
  return sanitizeText(name, MAX_NAME_LENGTH);
}

/** Sanitize email: trim, limit length. */
export function sanitizeEmail(email: string): string {
  return String(email ?? '').trim().slice(0, MAX_EMAIL_LENGTH);
}

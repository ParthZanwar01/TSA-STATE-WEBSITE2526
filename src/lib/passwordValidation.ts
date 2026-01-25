/**
 * Password validation: systematic (structural) and semantic (meaningful) checks.
 * Provides strength scoring and user-facing feedback.
 */

export type PasswordRule = {
  id: string;
  label: string;
  met: boolean;
  systematic: boolean; // structural vs semantic
};

const MIN_LENGTH = 8;
const COMMON_PASSWORDS = new Set([
  'password', 'password1', 'password123', '12345678', '123456789', 'qwerty', 'qwerty123',
  'abc123', 'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'login',
  'passw0rd', 'password!', 'iloveyou', 'trustno1', 'sunshine', 'princess', 'admin123',
  'pass', 'pass123', 'Password1', 'Password123', 'Welcome1', 'Admin123',
]);

const SEQUENCES = [
  '1234567890', '0987654321', 'qwertyuiop', 'poiuytrewq', 'asdfghjkl', 'lkjhgfdsa',
  'zxcvbnm', 'mnbvcxz', 'abcdefghijklmnopqrstuvwxyz', 'qazwsx', 'qweasd', '1qaz2wsx',
];

function hasSequence(password: string): boolean {
  const lower = password.toLowerCase();
  return SEQUENCES.some((seq) => lower.includes(seq) || lower.includes([...seq].reverse().join('')));
}

function isRepetitive(password: string): boolean {
  if (password.length < 4) return false;
  const chunk = password.slice(0, Math.min(3, Math.floor(password.length / 2)));
  const repeated = chunk.repeat(Math.ceil(password.length / chunk.length));
  return repeated.startsWith(password) && password.length >= chunk.length * 2;
}

export function validatePassword(password: string): { rules: PasswordRule[]; strength: number; isStrong: boolean } {
  const p = password;
  const rules: PasswordRule[] = [
    { id: 'length', label: `At least ${MIN_LENGTH} characters`, met: p.length >= MIN_LENGTH, systematic: true },
    { id: 'lower', label: 'One lowercase letter', met: /[a-z]/.test(p), systematic: true },
    { id: 'upper', label: 'One uppercase letter', met: /[A-Z]/.test(p), systematic: true },
    { id: 'number', label: 'One number', met: /\d/.test(p), systematic: true },
    { id: 'special', label: 'One special character (!@#$%^&* etc.)', met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p), systematic: true },
    { id: 'common', label: 'Not a common password', met: !COMMON_PASSWORDS.has(p.toLowerCase()), systematic: false },
    { id: 'sequence', label: 'No obvious sequences (123, abc, qwerty)', met: !hasSequence(p), systematic: false },
    { id: 'repetitive', label: 'Not repetitive (aaa, 111)', met: !isRepetitive(p), systematic: false },
  ];

  const systematicMet = rules.filter((r) => r.systematic && r.met).length;
  const systematicTotal = rules.filter((r) => r.systematic).length;
  const semanticMet = rules.filter((r) => !r.systematic && r.met).length;
  const semanticTotal = rules.filter((r) => !r.systematic).length;

  // Strength 0-4: weak, fair, good, strong
  let strength = 0;
  if (systematicMet === systematicTotal) strength = 2;
  if (strength === 2 && semanticMet >= 1) strength = 3;
  if (strength === 3 && semanticMet === semanticTotal && p.length >= 10) strength = 4;

  const isStrong = strength >= 3 && systematicMet === systematicTotal;

  return { rules, strength, isStrong };
}

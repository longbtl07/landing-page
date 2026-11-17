/**
 * Normalizes Vietnamese string to ASCII by removing accents and combining characters.
 * E.g.: "Nghiên cứu khoa học" -> "nghien cuu khoa hoc"
 */
export function normalizeVietnamese(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
}

/**
 * Safely calculates remaining days between today and a target ISO date string (YYYY-MM-DD).
 */
export function calculateDaysRemaining(deadlineStr: string): number {
  try {
    const [year, month, day] = deadlineStr.split('-').map(Number);
    const deadline = new Date(year, month - 1, day, 23, 59, 59);
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  } catch {
    return 1;
  }
}

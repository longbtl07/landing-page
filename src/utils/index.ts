import type { EventItem } from '@/types';

/**
 * Normalizes Vietnamese string to ASCII by removing accents and combining characters.
 * E.g.: "Nghiên cứu khoa học" -> "nghien cuu khoa hoc"
 */
export function normalizeVietnamese(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
}

/** Cuts text to `max` chars, adding "…" only when it was actually cut. */
export function shorten(str: string, max = 40): string {
  return str.length > max ? `${str.slice(0, max).trimEnd()}…` : str;
}

/** Today's date in the viewer's timezone as YYYY-MM-DD (for <input type="date" min>). */
export function todayISO(): string {
  return new Date().toLocaleDateString('sv-SE');
}

type DeadlineSource = Pick<EventItem, 'deadline' | 'deadlineFormatted'>;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Deadline as a Date in Vietnam time (UTC+7). The hour comes from deadlineFormatted,
 * e.g. "19/11/2026 (22:00)"; it defaults to 23:59.
 */
export function getDeadlineDate(event: DeadlineSource): Date {
  const time = event.deadlineFormatted.match(/\((\d{1,2}):(\d{2})\)/);
  const hh = (time?.[1] ?? '23').padStart(2, '0');
  const mm = time?.[2] ?? '59';
  return new Date(`${event.deadline}T${hh}:${mm}:00+07:00`);
}

export type DeadlineTone = 'closed' | 'critical' | 'soon' | 'normal';

export interface DeadlineInfo {
  isExpired: boolean;
  isUrgent: boolean;
  tone: DeadlineTone;
  /** Short countdown, e.g. "Còn 5 giờ", "Còn 2 ngày", "Đã đóng đơn" */
  countdown: string;
  /** Deadline date + time, e.g. "T6 20/11 · 23:59" */
  dateLabel: string;
}

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

/** Computes countdown from the real current time, so the feed never shows stale numbers. */
export function getDeadlineInfo(event: DeadlineSource, now: number): DeadlineInfo {
  const deadline = getDeadlineDate(event);
  const msLeft = deadline.getTime() - now;
  const [y, m, d] = event.deadline.split('-');
  const weekday = WEEKDAYS[new Date(`${y}-${m}-${d}T12:00:00+07:00`).getUTCDay()];
  const time = event.deadlineFormatted.match(/\((\d{1,2}:\d{2})\)/)?.[1] ?? '23:59';
  const dateLabel = `${weekday} ${d}/${m} · ${time}`;

  if (msLeft <= 0) {
    return { isExpired: true, isUrgent: false, tone: 'closed', countdown: 'Đã đóng đơn', dateLabel };
  }
  if (msLeft < DAY_MS) {
    const hours = Math.max(1, Math.ceil(msLeft / (60 * 60 * 1000)));
    return { isExpired: false, isUrgent: true, tone: 'critical', countdown: `Còn ${hours} giờ`, dateLabel };
  }
  // Round down: "Còn 1 ngày" for 26h left, never overstating the time a student has
  const days = Math.floor(msLeft / DAY_MS);
  const isUrgent = msLeft < 3 * DAY_MS;
  return {
    isExpired: false,
    isUrgent,
    tone: isUrgent ? 'soon' : 'normal',
    countdown: `Còn ${days} ngày`,
    dateLabel,
  };
}

/** Escapes TEXT values per RFC 5545 §3.3.11. */
function icsText(str: string): string {
  return str.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\r?\n/g, '\\n');
}

function icsUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Builds an .ics calendar: one 30-minute event ending at each deadline.
 * Events whose reminder is on get a VALARM 24h before, so the phone calendar does the reminding.
 */
export function buildIcs(events: EventItem[], reminders: Record<string, boolean>, now = new Date()): string {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ULIS Events Radar//VN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
  for (const e of events) {
    const end = getDeadlineDate(e);
    const start = new Date(end.getTime() - 30 * 60 * 1000);
    lines.push(
      'BEGIN:VEVENT',
      `UID:${e.id}@ulis-radar`,
      `DTSTAMP:${icsUtc(now)}`,
      `DTSTART:${icsUtc(start)}`,
      `DTEND:${icsUtc(end)}`,
      `SUMMARY:${icsText(`[Hạn chót] ${e.title}`)}`,
      `DESCRIPTION:${icsText(`${e.shortDesc}\nĐơn vị: ${e.organizer}${e.registrationUrl ? `\nĐăng ký: ${e.registrationUrl}` : ''}`)}`,
      `LOCATION:${icsText(e.location)}`,
    );
    if (reminders[e.id] ?? true) {
      lines.push('BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${icsText(`Còn 24h: ${e.title}`)}`, 'TRIGGER:-P1D', 'END:VALARM');
    }
    lines.push('END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return `${lines.join('\r\n')}\r\n`;
}

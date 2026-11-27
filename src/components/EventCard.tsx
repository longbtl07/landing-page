'use client';

import React from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Award,
  Bookmark,
  BookmarkCheck,
  ArrowUpRight,
  Star,
  Users,
} from 'lucide-react';
import { EventItem } from '@/types';
import { getDeadlineInfo, DeadlineTone } from '@/utils';

const TONE_STYLES: Record<DeadlineTone, string> = {
  critical: 'bg-rose-50 text-rose-700 border-rose-200',
  soon: 'bg-amber-50 text-amber-800 border-amber-200',
  normal: 'bg-slate-50 text-slate-700 border-slate-200',
  closed: 'bg-slate-100 text-slate-500 border-slate-200',
};

interface DeadlineBadgeProps {
  event: EventItem;
  /** Client clock; null during prerender, when only the date is shown */
  now: number | null;
  className?: string;
}

/** Deadline date + live countdown, colored by urgency (red < 24h, amber < 72h). */
export const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({
  event,
  now,
  className = '',
}) => {
  const info = getDeadlineInfo(event, now ?? 0);
  const tone: DeadlineTone = now === null ? 'normal' : info.tone;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${TONE_STYLES[tone]} ${className}`}
    >
      <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>Hạn {info.dateLabel}</span>
      {now !== null && <span className="font-bold">· {info.countdown}</span>}
    </span>
  );
};

interface EventCardProps {
  event: EventItem;
  now: number | null;
  isSaved: boolean;
  onToggleSave: (event: EventItem) => void;
  onSelectEvent: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  now,
  isSaved,
  onToggleSave,
  onSelectEvent,
}) => {
  const [, monthPart = '12', dayPart = '01'] = event.deadline.split('-');

  return (
    <article className="group relative min-w-0 flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-[#003B73]/50 shadow-xs hover:shadow-xl hover:shadow-blue-950/10 transition-all duration-300 overflow-hidden">
      {/* Competition Ticket Stub Header (Midnight Navy + Date Stamp) */}
      <div className="flex items-stretch bg-gradient-to-r from-[#001833] via-[#002855] to-[#003B73] text-white">
        {/* Left Date Ticket Stamp */}
        <div className="flex flex-col items-center justify-center px-3.5 py-2.5 bg-amber-400 text-[#001833] shrink-0 min-w-[60px]">
          <span className="text-[10px] font-extrabold uppercase tracking-wider leading-none">
            TH{monthPart}
          </span>
          <span className="text-xl font-black leading-tight">{dayPart}</span>
        </div>

        {/* Right Header Meta */}
        <div className="flex-1 min-w-0 px-3.5 py-2.5 flex flex-col justify-center">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 truncate">
              {event.categoryLabel}
            </span>
            {event.reviewCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 shrink-0">
                <Star className="w-3 h-3 fill-amber-300 text-amber-300" aria-hidden="true" />
                {event.rating}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-blue-100 min-w-0">
            <Users className="w-3 h-3 text-cyan-300 shrink-0" aria-hidden="true" />
            <span className="font-semibold truncate" title={event.organizer}>
              {event.organizer}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Live Deadline Countdown Badge */}
        <div className="mb-3">
          <DeadlineBadge event={event} now={now} />
        </div>

        {/* Title */}
        <h3 className="mb-2">
          <button
            type="button"
            onClick={() => onSelectEvent(event)}
            className="text-left text-base sm:text-lg font-extrabold text-[#002244] group-hover:text-[#0B4F9F] line-clamp-3 leading-snug cursor-pointer transition-colors focus:outline-none focus-visible:underline"
          >
            {event.title}
          </button>
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3.5">
          {event.shortDesc}
        </p>

        {/* Metadata Details */}
        <div className="space-y-1.5 text-xs text-slate-600 mb-3.5">
          <div className="flex items-start gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#1E88E5] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{event.eventDate}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <span className="line-clamp-2" title={event.location}>
              {event.location}
            </span>
          </div>
        </div>

        {/* Benefit Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
          {event.benefitBadges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
            >
              <Award className="w-3 h-3 text-emerald-600" aria-hidden="true" />
              {badge}
            </span>
          ))}
          {event.isFreshmanFriendly && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              K60 Thân thiện
            </span>
          )}
        </div>

        {/* Perforated Ticket Divider */}
        <div className="relative pt-3.5 border-t border-dashed border-slate-200 flex gap-2">
          <span
            aria-hidden="true"
            className="absolute -left-6 -top-2 w-4 h-4 rounded-full bg-slate-50 border border-slate-200"
          />
          <span
            aria-hidden="true"
            className="absolute -right-6 -top-2 w-4 h-4 rounded-full bg-slate-50 border border-slate-200"
          />

          <button
            onClick={() => onSelectEvent(event)}
            aria-label={`Xem chi tiết ${event.title}`}
            className="flex-1 min-h-[42px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#002244] hover:bg-[#0B4F9F] shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Xem chi tiết</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-300" aria-hidden="true" />
          </button>

          <button
            onClick={() => onToggleSave(event)}
            aria-pressed={isSaved}
            aria-label={isSaved ? `Bỏ lưu ${event.title}` : `Lưu ${event.title} vào lịch`}
            title={isSaved ? 'Bỏ lưu' : 'Lưu vào lịch'}
            className={`min-h-[42px] flex items-center justify-center gap-1.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              isSaved
                ? 'bg-amber-400 text-[#001833] border border-amber-400 hover:bg-amber-300'
                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-[#003B73]'
            }`}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-[#001833]" aria-hidden="true" />
            ) : (
              <Bookmark className="w-4 h-4 text-slate-500" aria-hidden="true" />
            )}
            <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

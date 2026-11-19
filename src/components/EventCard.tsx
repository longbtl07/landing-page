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
  Users
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
export const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({ event, now, className = '' }) => {
  const info = getDeadlineInfo(event, now ?? 0);
  const tone: DeadlineTone = now === null ? 'normal' : info.tone;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${TONE_STYLES[tone]} ${className}`}>
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
  return (
    <article className="group relative min-w-0 flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 overflow-hidden">

      {/* Thin brand stripe keeps each event's color without a tall banner */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${event.bannerGradient}`} aria-hidden="true" />

      <div className="flex flex-col flex-1 p-4 sm:p-5">

        {/* Deadline first: the one thing students scan for */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <DeadlineBadge event={event} now={now} />
          <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
            {event.categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2">
          <button
            type="button"
            onClick={() => onSelectEvent(event)}
            className="text-left text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#003B73] line-clamp-3 leading-snug cursor-pointer transition-colors focus:outline-none focus-visible:underline"
          >
            {event.title}
          </button>
        </h3>

        {/* Organizer + rating */}
        <div className="flex items-center gap-2 mb-3 text-xs min-w-0">
          <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" aria-hidden="true" />
          <span className="font-semibold text-[#003B73] truncate min-w-0" title={event.organizer}>
            {event.organizer}
          </span>
          {event.reviewCount > 0 && (
            <span className="ml-auto inline-flex items-center gap-1 font-bold text-amber-700 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              {event.rating}
              <span className="text-[11px] text-slate-500 font-normal">({event.reviewCount})</span>
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
          {event.shortDesc}
        </p>

        {/* Metadata Details */}
        <div className="space-y-1.5 text-xs text-slate-600 mb-3">
          <div className="flex items-start gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{event.eventDate}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
            <span className="line-clamp-2" title={event.location}>{event.location}</span>
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

        {/* Card Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => onSelectEvent(event)}
            aria-label={`Xem chi tiết ${event.title}`}
            className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-sm font-semibold text-white bg-[#003B73] hover:bg-[#0B4F9F] shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Xem chi tiết</span>
            <ArrowUpRight className="w-4 h-4 text-blue-200" aria-hidden="true" />
          </button>

          <button
            onClick={() => onToggleSave(event)}
            aria-pressed={isSaved}
            aria-label={isSaved ? `Bỏ lưu ${event.title}` : `Lưu ${event.title} vào lịch`}
            title={isSaved ? 'Bỏ lưu' : 'Lưu vào lịch'}
            className={`min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              isSaved
                ? 'bg-blue-50 text-[#003B73] border border-blue-200 hover:bg-blue-100'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-[#1E88E5] fill-[#1E88E5]" aria-hidden="true" />
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

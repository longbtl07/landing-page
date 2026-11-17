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

interface EventCardProps {
  event: EventItem;
  isSaved: boolean;
  onToggleSave: (event: EventItem) => void;
  onSelectEvent: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isSaved,
  onToggleSave,
  onSelectEvent,
}) => {
  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 overflow-hidden">
      
      {/* Card Header / Banner */}
      <div className={`relative h-44 w-full bg-gradient-to-br ${event.bannerGradient} p-5 flex flex-col justify-between text-white overflow-hidden`}>
        
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" aria-hidden="true"></div>

        {/* Top Badges Row */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          
          {/* Category Tag */}
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide uppercase bg-black/35 backdrop-blur-md border border-white/20 text-white shadow-xs">
            {event.categoryLabel}
          </span>

          {/* Deadline Countdown Badge */}
          {event.isUrgent ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/95 text-white border border-rose-300 shadow-sm animate-urgent-pulse">
              <Clock className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              <span>Còn {event.daysRemaining} ngày đóng đơn</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/25 text-white">
              <Clock className="w-3.5 h-3.5 text-blue-100" aria-hidden="true" />
              <span>Hạn: {event.deadlineFormatted.split(' ')[0]}</span>
            </div>
          )}
        </div>

        {/* Banner Topic / Tag */}
        <div className="relative z-10">
          <span className="text-[11px] font-bold tracking-wider text-blue-200 uppercase mb-1 block">
            {event.bannerTag}
          </span>
          <h4 className="text-sm font-semibold text-white/90 line-clamp-1">
            {event.bannerTheme}
          </h4>
        </div>

      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Organizer info */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#003B73] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            <Users className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
            <span className="truncate max-w-[220px]">{event.organizer}</span>
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs font-bold text-amber-600 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span>{event.rating}</span>
            <span className="text-[11px] text-slate-500 font-normal">({event.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelectEvent(event)}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#003B73] line-clamp-2 leading-snug cursor-pointer transition-colors mb-2.5"
          title={event.title}
        >
          {event.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {event.shortDesc}
        </p>

        {/* Metadata Details */}
        <div className="space-y-2 text-xs text-slate-600 mb-4 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <span className="truncate"><strong className="font-semibold text-slate-700">Thời gian:</strong> {event.eventDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            <span className="truncate"><strong className="font-semibold text-slate-700">Địa điểm:</strong> {event.location}</span>
          </div>
        </div>

        {/* Benefit Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {event.benefitBadges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
            >
              <Award className="w-3 h-3 text-emerald-600" aria-hidden="true" />
              {badge}
            </span>
          ))}
          {event.isFreshmanFriendly && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
              K58 Thân thiện
            </span>
          )}
        </div>

        {/* Card Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
          
          {/* Toggle Save / Reminder Button */}
          <button
            onClick={() => onToggleSave(event)}
            aria-label={isSaved ? `Bỏ lưu ${event.title}` : `Lưu lịch ${event.title}`}
            className={`min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isSaved
                ? 'bg-blue-50 text-[#003B73] border border-blue-200 hover:bg-blue-100'
                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-[#1E88E5] fill-[#1E88E5]" aria-hidden="true" />
                <span>Đã lưu lịch ✓</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-slate-500" aria-hidden="true" />
                <span>Lưu lịch / Nhắc hẹn</span>
              </>
            )}
          </button>

          {/* View Details Button */}
          <button
            onClick={() => onSelectEvent(event)}
            aria-label={`Xem chi tiết ${event.title}`}
            className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#003B73] hover:bg-[#0B4F9F] shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Xem chi tiết</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-200" aria-hidden="true" />
          </button>

        </div>

      </div>

    </div>
  );
};

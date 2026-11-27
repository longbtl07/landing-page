'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Star, 
  CheckCircle2, 
  MessageSquare,
  ShieldCheck,
  Info
} from 'lucide-react';
import { EventItem } from '@/types';
import { getDeadlineInfo } from '@/utils';
import { useModal } from '@/utils/useModal';

const TABS = [
  { id: 'details', label: 'Thông tin chi tiết & Quyền lợi' },
  { id: 'timeline', label: 'Lộ trình & Mốc thời gian' },
  { id: 'reviews', label: 'Review từ mùa trước' },
] as const;

interface EventDetailModalProps {
  event: EventItem | null;
  now: number | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (event: EventItem) => void;
  onShare: (event: EventItem) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  now,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onShare,
}) => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('details');
  const panelRef = useModal<HTMLDivElement>(isOpen, onClose);

  if (!isOpen || !event) return null;

  const deadline = getDeadlineInfo(event, now ?? 0);
  const isClosed = now !== null && deadline.isExpired;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
    >
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div ref={panelRef} className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Banner Header */}
        <div className={`relative p-6 sm:p-8 bg-gradient-to-br ${event.bannerGradient} text-white shrink-0 overflow-hidden`}>
          {event.imageUrl && (
            <>
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover object-center opacity-35"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#00142B]/95 via-[#001833]/75 to-[#002244]/70"
              />
            </>
          )}

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" aria-hidden="true"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ chi tiết sự kiện"
            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition-colors z-20 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Tags row */}
          <div className="relative z-10 flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide uppercase bg-black/40 backdrop-blur-md border border-white/20 text-white">
              {event.categoryLabel}
            </span>

            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white border ${
                now !== null && deadline.isUrgent ? 'bg-rose-500 border-rose-300' : 'bg-white/20 backdrop-blur-md border-white/20'
              }`}
            >
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                Hạn {deadline.dateLabel}
                {now !== null && ` · ${deadline.countdown}`}
              </span>
            </span>

            <span className="text-xs text-blue-200 font-medium">
              {event.organizer}
            </span>
          </div>

          {/* Title */}
          <h2 id="modal-event-title" className="relative z-10 text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug mb-3">
            {event.title}
          </h2>

          {/* Rating Summary */}
          {event.reviewCount > 0 && (
            <div className="relative z-10 flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 bg-black/30 px-2.5 py-1 rounded-lg border border-white/10 text-amber-300 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span>{event.rating} / 5.0</span>
              </div>
              <span className="text-blue-100 text-xs">
                Dựa trên {event.reviewCount} đánh giá từ sinh viên các mùa trước
              </span>
            </div>
          )}

        </div>

        {/* Modal Navigation Tabs */}
        <div role="tablist" aria-label="Thông tin sự kiện" className="flex border-b border-slate-200 bg-slate-50/80 px-6 shrink-0 gap-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`event-tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="event-tabpanel"
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[44px] flex items-center gap-1.5 py-3 px-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#003B73] text-[#003B73]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.id === 'reviews' && <MessageSquare className="w-4 h-4 text-blue-600" aria-hidden="true" />}
              <span>{tab.id === 'reviews' ? `${tab.label} (${event.reviews.length})` : tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div
          id="event-tabpanel"
          role="tabpanel"
          aria-labelledby={`event-tab-${activeTab}`}
          className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700"
        >
          
          {/* TAB 1: DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              
              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Thời gian diễn ra:</span>
                    <span className="text-slate-600">{event.eventDate}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Địa điểm:</span>
                    <span className="text-slate-600">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Đối tượng áp dụng:</span>
                    <span className="text-slate-600">{event.targetAudience}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Hạn đóng đơn:</span>
                    <span className="text-rose-600 font-bold">
                      {event.deadlineFormatted}
                      {now !== null && ` · ${deadline.countdown}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  Mô tả hoạt động
                </h4>
                <div className="text-sm leading-relaxed text-slate-600 whitespace-pre-line bg-white p-4 rounded-xl border border-slate-100">
                  {event.fullDesc}
                </div>
              </div>

              {/* Detailed Benefits */}
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                  Quyền lợi chi tiết dành cho sinh viên ULIS
                </h4>
                <div className="space-y-2.5">
                  {event.detailedBenefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-emerald-950 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#003B73]" aria-hidden="true" />
                  <span>
                    Kênh hỗ trợ BTC:{' '}
                    {event.contactEmail ? (
                      <a href={`mailto:${event.contactEmail}`} className="font-bold text-blue-700 underline break-all">
                        {event.contactEmail}
                      </a>
                    ) : (
                      'chưa cập nhật'
                    )}
                  </span>
                </div>
                {event.contactFanpage && <div className="text-slate-500">
                  Fanpage:{' '}
                  <a
                    href={`https://${event.contactFanpage.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline break-all"
                  >
                    {event.contactFanpage}
                  </a>
                </div>}
              </div>

            </div>
          )}

          {/* TAB 2: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900 mb-2">
                Các mốc lộ trình tham gia
              </h4>
              <div className="relative pl-6 border-l-2 border-blue-200 space-y-6 my-4">
                {event.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Step marker */}
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#003B73] border-4 border-white shadow-xs"></div>
                    <div className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-0.5">
                      {step.time}
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      {step.stage}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {step.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REVIEWS FROM PAST SEASONS */}
          {activeTab === 'reviews' && event.reviews.length === 0 && (
            <p className="text-sm text-slate-500">Chưa có review nào từ mùa trước cho hoạt động này.</p>
          )}

          {activeTab === 'reviews' && event.reviews.length > 0 && (
            <div className="space-y-5">
              
              {/* Rating Overview */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-amber-900">{event.rating}</div>
                  <div className="flex items-center justify-center gap-0.5 text-amber-500 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <div className="text-[11px] text-amber-800 font-medium">{event.reviewCount} lượt đánh giá</div>
                </div>
                <div className="border-l border-amber-200 pl-4 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block font-semibold mb-1">Đánh giá thực tế từ sinh viên ULIS:</strong>
                  Các nhận xét dưới đây được thu thập từ sinh viên các khóa K55, K56, K57 đã trực tiếp tham gia ở mùa trước nhằm giúp bạn có góc nhìn chân thực nhất trước khi nộp đơn.
                </div>
              </div>

              {/* Student Review Cards */}
              <div className="space-y-4">
                {event.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#003B73] text-white flex items-center justify-center font-bold text-xs">
                          {rev.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{rev.author}</div>
                          <div className="text-xs text-slate-500 font-medium">
                            {rev.faculty} • <span className="text-blue-700 font-semibold">{rev.batch}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                          <span className="text-xs font-bold text-slate-800">{rev.rating}.0</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{rev.season}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-100">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            
            {/* Toggle Save */}
            <button
              onClick={() => onToggleSave(event)}
              aria-label={isSaved ? 'Bỏ lưu sự kiện này' : 'Lưu sự kiện vào lịch cá nhân'}
              className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isSaved
                  ? 'bg-blue-100 text-[#003B73] border border-blue-300'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-[#1E88E5] fill-[#1E88E5]" aria-hidden="true" />
                  <span>Đã lưu lịch</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-slate-500" aria-hidden="true" />
                  <span>Lưu lịch cá nhân</span>
                </>
              )}
            </button>

            {/* Share */}
            <button
              onClick={() => onShare(event)}
              aria-label="Sao chép liên kết sự kiện"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Sao chép liên kết sự kiện"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Primary Registration CTA */}
          {isClosed || !event.registrationUrl ? (
            <span className="min-h-[44px] flex items-center px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-500 bg-slate-100 border border-slate-200">
              {isClosed ? 'Đã hết hạn đăng ký' : 'BTC chưa cung cấp link đăng ký'}
            </span>
          ) : (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Đăng ký ngay tại form chính thức của Ban tổ chức"
              className="min-h-[44px] flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#003B73] via-[#0B4F9F] to-[#1E88E5] hover:opacity-95 shadow-md shadow-blue-900/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Đăng ký ngay (Form BTC)</span>
              <ExternalLink className="w-4 h-4 text-blue-200" aria-hidden="true" />
            </a>
          )}

        </div>

      </div>

    </div>
  );
};

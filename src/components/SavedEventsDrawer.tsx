'use client';

import React, { useEffect } from 'react';
import { 
  X, 
  Bookmark, 
  Bell, 
  BellRing, 
  Trash2, 
  ArrowUpRight, 
  Download, 
  Clock, 
  Compass,
  CheckCircle2
} from 'lucide-react';
import { EventItem } from '@/types';

interface SavedEventsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedEvents: EventItem[];
  savedSettings: Record<string, boolean>; // eventId -> reminder24h
  onToggleReminder: (eventId: string) => void;
  onRemoveSaved: (eventId: string) => void;
  onSelectEvent: (event: EventItem) => void;
  onExportCalendar: () => void;
}

export const SavedEventsDrawer: React.FC<SavedEventsDrawerProps> = ({
  isOpen,
  onClose,
  savedEvents,
  savedSettings,
  onToggleReminder,
  onRemoveSaved,
  onSelectEvent,
  onExportCalendar,
}) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-saved-title"
    >
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-r from-[#003B73] to-[#0B4F9F] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs">
              <Bookmark className="w-5 h-5 text-blue-200 fill-blue-200" aria-hidden="true" />
            </div>
            <div>
              <h3 id="drawer-saved-title" className="font-bold text-base sm:text-lg">
                Lịch đã lưu & Nhắc Deadline
              </h3>
              <p className="text-xs text-blue-100">
                {savedEvents.length > 0 
                  ? `Đang theo dõi ${savedEvents.length} hoạt động quan trọng` 
                  : 'Chưa có sự kiện nào được lưu'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng ngăn kéo"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Zero-friction Info Banner */}
        <div className="px-5 py-3 bg-blue-50/80 border-b border-blue-100 flex items-start gap-2.5 text-xs text-blue-900 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-semibold block">Trải nghiệm không cần tài khoản:</span>
            <span>Dữ liệu lịch được lưu tự động trên trình duyệt của bạn. Bấm &ldquo;Xuất lịch cá nhân&rdquo; để đồng bộ vào Google/Apple Calendar.</span>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {savedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-200">
                <Bookmark className="w-8 h-8 text-[#003B73]" aria-hidden="true" />
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-1">
                Lịch theo dõi của bạn đang trống
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mb-6 leading-relaxed">
                Hãy bấm nút &quot;Lưu lịch / Nhắc deadline&quot; trên bất kỳ thẻ sự kiện nào trên Radar để không bao giờ bỏ lỡ thời hạn đóng đơn!
              </p>
              <button
                onClick={onClose}
                className="min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#003B73] hover:bg-[#0B4F9F] shadow-xs cursor-pointer"
              >
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>Khám phá sự kiện ngay</span>
              </button>
            </div>
          ) : (
            savedEvents.map((evt) => {
              const reminderActive = savedSettings[evt.id] ?? true;
              return (
                <div
                  key={evt.id}
                  className="bg-slate-50/90 rounded-2xl border border-slate-200 p-4 hover:border-blue-300 transition-all shadow-xs"
                >
                  {/* Top info */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#003B73] bg-blue-100/70 px-2 py-0.5 rounded">
                      {evt.organizer}
                    </span>
                    {evt.isUrgent ? (
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        Còn {evt.daysRemaining} ngày
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium">
                        Hạn: {evt.deadlineFormatted.split(' ')[0]}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 
                    onClick={() => {
                      onClose();
                      onSelectEvent(evt);
                    }}
                    className="text-sm font-bold text-slate-900 hover:text-[#003B73] cursor-pointer line-clamp-2 leading-snug mb-2.5"
                  >
                    {evt.title}
                  </h4>

                  {/* Reminder 24h Toggle Switch */}
                  <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-white border border-slate-200/80 mb-3 text-xs">
                    <div className="flex items-center gap-2">
                      {reminderActive ? (
                        <BellRing className="w-4 h-4 text-blue-600 animate-bounce" aria-hidden="true" />
                      ) : (
                        <Bell className="w-4 h-4 text-slate-400" aria-hidden="true" />
                      )}
                      <span className="font-semibold text-slate-700">
                        Nhắc nhở trước 24h:
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleReminder(evt.id)}
                      role="switch"
                      aria-checked={reminderActive}
                      aria-label={`Bật tắt nhắc nhở 24h cho ${evt.title}`}
                      className={`min-h-[28px] relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        reminderActive ? 'bg-[#003B73]' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          reminderActive ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectEvent(evt);
                      }}
                      className="min-h-[36px] text-blue-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Xem chi tiết</span>
                      <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    </button>

                    <button
                      onClick={() => onRemoveSaved(evt.id)}
                      aria-label={`Xóa ${evt.title} khỏi lịch đã lưu`}
                      className="min-h-[36px] text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Bỏ lưu</span>
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer Actions */}
        {savedEvents.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2 shrink-0">
            <button
              onClick={onExportCalendar}
              aria-label="Xuất tệp lịch .ics"
              className="min-h-[44px] w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-[#003B73] bg-blue-100/70 hover:bg-blue-100 border border-blue-200 transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Xuất lịch cá nhân (.ics) cho Google/Apple Calendar</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

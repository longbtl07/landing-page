'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSearch } from '@/components/HeroSearch';
import { FilterBar } from '@/components/FilterBar';
import { EventCard } from '@/components/EventCard';
import { EventDetailModal } from '@/components/EventDetailModal';
import { TeammateSection } from '@/components/TeammateSection';
import { PostTeammateModal } from '@/components/PostTeammateModal';
import { SavedEventsDrawer } from '@/components/SavedEventsDrawer';
import { SubmitEventModal } from '@/components/SubmitEventModal';
import { ToastContainer } from '@/components/Toast';
import { Footer } from '@/components/Footer';

import { INITIAL_EVENTS, INITIAL_TEAMMATES } from '@/data/mockData';
import { EventItem, EventBenefit, TeammatePost, ToastMessage } from '@/types';
import { normalizeVietnamese } from '@/utils';
import { Radio, SearchX, BookmarkCheck } from 'lucide-react';

export default function Home() {
  // Main Data States
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [teammates, setTeammates] = useState<TeammatePost[]>(INITIAL_TEAMMATES);
  
  // Saved Events State (IDs + reminders)
  const [savedEventIds, setSavedEventIds] = useState<string[]>(['ulis-debate-2026', 'ulis-ielts-cv-workshop']);
  const [savedSettings, setSavedSettings] = useState<Record<string, boolean>>({
    'ulis-debate-2026': true,
    'ulis-ielts-cv-workshop': true,
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on client mount (Zero friction guest persistence)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedIds = localStorage.getItem('ulis_radar_saved_event_ids');
        const storedSettings = localStorage.getItem('ulis_radar_saved_settings');
        if (storedIds) {
          setSavedEventIds(JSON.parse(storedIds));
        }
        if (storedSettings) {
          setSavedSettings(JSON.parse(storedSettings));
        }
      } catch {
        // Ignore JSON parse or storage access errors in private browsing
      } finally {
        setIsHydrated(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Sync to localStorage whenever saved events or settings change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('ulis_radar_saved_event_ids', JSON.stringify(savedEventIds));
      localStorage.setItem('ulis_radar_saved_settings', JSON.stringify(savedSettings));
    } catch {
      // Ignore quota exceeded or storage disabled
    }
  }, [savedEventIds, savedSettings, isHydrated]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState('all');
  const [category, setCategory] = useState('all');
  const [benefit, setBenefit] = useState('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'latest' | 'popular'>('deadline');

  // Modals & Drawer States
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isPostTeammateModalOpen, setIsPostTeammateModalOpen] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Toggle Save Event
  const handleToggleSave = (event: EventItem) => {
    const isCurrentlySaved = savedEventIds.includes(event.id);
    if (isCurrentlySaved) {
      setSavedEventIds((prev) => prev.filter((id) => id !== event.id));
      addToast('info', 'Đã bỏ lưu sự kiện', `Đã xóa "${event.title.substring(0, 35)}..." khỏi Lịch cá nhân.`);
    } else {
      setSavedEventIds((prev) => [...prev, event.id]);
      setSavedSettings((prev) => ({ ...prev, [event.id]: true }));
      addToast('success', 'Đã lưu vào Lịch cá nhân ✓', `Đã bật nhắc nhở trước hạn chót 24h cho "${event.title.substring(0, 35)}...".`);
    }
  };

  // Toggle 24h Reminder Switch in Drawer
  const handleToggleReminder = (eventId: string) => {
    const current = savedSettings[eventId] ?? true;
    const nextState = !current;
    setSavedSettings((prev) => ({ ...prev, [eventId]: nextState }));
    addToast(
      nextState ? 'success' : 'info',
      nextState ? 'Đã bật nhắc nhở 24h' : 'Đã tắt nhắc nhở',
      nextState ? 'Hệ thống sẽ gửi thông báo trước hạn đóng đơn 1 ngày.' : 'Đã tắt thông báo tự động cho sự kiện này.'
    );
  };

  // Remove from saved list in Drawer
  const handleRemoveSaved = (eventId: string) => {
    setSavedEventIds((prev) => prev.filter((id) => id !== eventId));
    addToast('info', 'Đã bỏ theo dõi', 'Sự kiện đã được xóa khỏi Lịch đã lưu.');
  };

  // Share Event Link
  const handleShareEvent = (event: EventItem) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/#event-${event.id}`;
      navigator.clipboard.writeText(url)
        .then(() => {
          addToast('success', 'Đã sao chép liên kết!', `Đường dẫn chia sẻ của sự kiện đã được lưu vào bộ nhớ tạm.`);
        })
        .catch(() => {
          addToast('info', 'Đường dẫn sự kiện', url);
        });
    }
  };

  // Copy helper for Teammate contact info
  const handleCopyText = (text: string, label: string) => {
    addToast('success', `Đã sao chép ${label}`, `Đã lưu "${text}" vào bộ nhớ tạm.`);
  };

  // Add new event from BTC Submit Modal
  const handleAddCustomEvent = (newEvent: EventItem) => {
    setEvents((prev) => [newEvent, ...prev]);
    addToast('success', 'Đăng tải sự kiện thành công! 🎉', `Hoạt động "${newEvent.title.substring(0, 35)}..." đã xuất hiện trên Radar.`);
  };

  // Add new teammate post
  const handleAddTeammatePost = (newPost: TeammatePost) => {
    setTeammates((prev) => [newPost, ...prev]);
    addToast('success', 'Đăng tin tìm đồng đội thành công! 🤝', 'Tin của bạn đã hiển thị trên Sàn ghép đội dự thi.');
  };

  // Export iCalendar (.ics) file
  const handleExportCalendar = () => {
    const savedList = events.filter((e) => savedEventIds.includes(e.id));
    if (savedList.length === 0) return;

    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ULIS Events Radar//VN\nCALSCALE:GREGORIAN\n";
    
    savedList.forEach((e) => {
      const cleanDate = e.deadline.replace(/-/g, '');
      icsContent += "BEGIN:VEVENT\n";
      icsContent += `SUMMARY:[Hạn chót ULIS] ${e.title.replace(/,/g, '\\,')}\n`;
      icsContent += `DESCRIPTION:${e.shortDesc.replace(/\n/g, ' ')} - Đơn vị: ${e.organizer}\n`;
      icsContent += `LOCATION:${e.location}\n`;
      icsContent += `DTSTART;VALUE=DATE:${cleanDate}\n`;
      icsContent += `DTEND;VALUE=DATE:${cleanDate}\n`;
      icsContent += `STATUS:CONFIRMED\n`;
      icsContent += "END:VEVENT\n";
    });

    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ULIS_Lich_Su_Kien_Radar.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    addToast('success', 'Đã tải xuống lịch cá nhân (.ics)', 'Bạn có thể mở tệp này để nhập trực tiếp vào Google Calendar hoặc Apple Calendar.');
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setQuickFilter('all');
    setCategory('all');
    setBenefit('all');
    setSortBy('deadline');
    addToast('info', 'Đã đặt lại bộ lọc', 'Hiển thị lại toàn bộ sự kiện khả dụng.');
  };

  const hasActiveFilters = searchQuery !== '' || quickFilter !== 'all' || category !== 'all' || benefit !== 'all';

  // Filtered & Sorted Events
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // 1. Vietnamese Diacritics-Insensitive Search
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeVietnamese(searchQuery);
      result = result.filter((item) => {
        const normalizedTitle = normalizeVietnamese(item.title);
        const normalizedOrganizer = normalizeVietnamese(item.organizer);
        const normalizedCategory = normalizeVietnamese(item.categoryLabel);
        const normalizedDesc = normalizeVietnamese(item.shortDesc);
        const normalizedTags = item.tags.map((t) => normalizeVietnamese(t)).join(' ');

        return (
          normalizedTitle.includes(normalizedQuery) ||
          normalizedOrganizer.includes(normalizedQuery) ||
          normalizedCategory.includes(normalizedQuery) ||
          normalizedDesc.includes(normalizedQuery) ||
          normalizedTags.includes(normalizedQuery)
        );
      });
    }

    // 2. Quick Filter Chips
    if (quickFilter === 'freshman') {
      result = result.filter((item) => item.isFreshmanFriendly);
    } else if (quickFilter === 'points') {
      result = result.filter((item) => item.trainingPoints && item.trainingPoints > 0);
    } else if (quickFilter === 'cert') {
      result = result.filter((item) => item.hasCertificate);
    } else if (quickFilter === 'culture') {
      result = result.filter((item) => item.category === 'culture');
    } else if (quickFilter === 'prize') {
      result = result.filter((item) => item.hasPrize);
    }

    // 3. Category Filter
    if (category !== 'all') {
      result = result.filter((item) => item.category === category);
    }

    // 4. Benefit Filter
    if (benefit !== 'all') {
      result = result.filter((item) => item.benefits.includes(benefit as EventBenefit));
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (sortBy === 'deadline') {
        return a.daysRemaining - b.daysRemaining;
      }
      if (sortBy === 'popular') {
        return b.viewsCount - a.viewsCount;
      }
      if (sortBy === 'latest') {
        const timeA = new Date(a.createdAt).getTime() || 0;
        const timeB = new Date(b.createdAt).getTime() || 0;
        return timeB - timeA;
      }
      return 0;
    });

    return result;
  }, [events, searchQuery, quickFilter, category, benefit, sortBy]);

  // Saved Event Objects
  const savedEventsList = useMemo(() => {
    return events.filter((e) => savedEventIds.includes(e.id));
  }, [events, savedEventIds]);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Sticky Top Navbar */}
      <Navbar
        savedCount={savedEventIds.length}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
      />

      <main className="flex-1">
        
        {/* Hero Section & Central Search */}
        <HeroSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          quickFilter={quickFilter}
          onQuickFilterChange={setQuickFilter}
        />

        {/* Main Event Radar Feed Section */}
        <section id="radar-feed" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          
          {/* Feed Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-100 text-[#003B73]">
                <Radio className="w-5 h-5 text-blue-700 animate-pulse" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-[#003B73] tracking-tight">
                  Bảng tin Radar Sự kiện & Cuộc thi
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Cập nhật liên tục từ Đoàn - Hội, các Khoa chuyên ngữ và hơn 30 CLB trực thuộc ULIS
                </p>
              </div>
            </div>

            {/* Quick Saved Link Badge */}
            {savedEventIds.length > 0 && (
              <button
                onClick={() => setIsSavedDrawerOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-[#003B73] border border-blue-200 hover:bg-blue-100 transition-colors self-start sm:self-auto"
              >
                <BookmarkCheck className="w-4 h-4 text-[#1E88E5]" aria-hidden="true" />
                <span>Bạn đang lưu {savedEventIds.length} sự kiện</span>
              </button>
            )}
          </div>

          {/* Multi-dimensional Filter Bar */}
          <FilterBar
            category={category}
            onCategoryChange={setCategory}
            benefit={benefit}
            onBenefitChange={setBenefit}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            totalFiltered={filteredEvents.length}
            totalEvents={events.length}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Event Cards Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isSaved={savedEventIds.includes(event.id)}
                  onToggleSave={handleToggleSave}
                  onSelectEvent={setSelectedEvent}
                />
              ))}
            </div>
          ) : (
            /* Empty Search/Filter State */
            <div className="py-16 px-4 text-center bg-white rounded-3xl border border-slate-200 shadow-xs max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <SearchX className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                Không tìm thấy hoạt động nào phù hợp
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Thử thay đổi từ khóa tìm kiếm hoặc bấm đặt lại các bộ lọc Loại hình và Quyền lợi để xem tất cả sự kiện đang mở.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#003B73] hover:bg-[#0B4F9F] shadow-xs cursor-pointer"
              >
                Đặt lại toàn bộ bộ lọc
              </button>
            </div>
          )}

        </section>

        {/* Teammate Finder Section ("Ghép đội dự thi") */}
        <TeammateSection
          teammates={teammates}
          onOpenPostModal={() => setIsPostTeammateModalOpen(true)}
          onCopyText={handleCopyText}
        />

      </main>

      {/* Academic Footer */}
      <Footer onOpenSubmitModal={() => setIsSubmitModalOpen(true)} />

      {/* MODALS & DRAWERS */}

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        isSaved={selectedEvent ? savedEventIds.includes(selectedEvent.id) : false}
        onToggleSave={handleToggleSave}
        onShare={handleShareEvent}
      />

      {/* Saved Events Drawer */}
      <SavedEventsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedEvents={savedEventsList}
        savedSettings={savedSettings}
        onToggleReminder={handleToggleReminder}
        onRemoveSaved={handleRemoveSaved}
        onSelectEvent={setSelectedEvent}
        onExportCalendar={handleExportCalendar}
      />

      {/* Submit Event Modal (BTC / CLB) */}
      <SubmitEventModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitEvent={handleAddCustomEvent}
      />

      {/* Post Teammate Modal */}
      <PostTeammateModal
        isOpen={isPostTeammateModalOpen}
        onClose={() => setIsPostTeammateModalOpen(false)}
        onAddPost={handleAddTeammatePost}
        availableEvents={events}
      />

      {/* Interactive Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

    </div>
  );
}

'use client';

import React from 'react';
import {
  Search,
  X,
  Sparkles,
  GraduationCap,
  Award,
  FileCheck2,
  Globe2,
  Trophy,
  AlertCircle,
  TrendingUp,
  Compass,
  ArrowDown,
  Radio,
} from 'lucide-react';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  quickFilter: string;
  onQuickFilterChange: (filter: string) => void;
  resultCount: number;
}

const scrollToFeed = () =>
  document.getElementById('radar-feed')?.scrollIntoView({ behavior: 'smooth' });

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
  quickFilter,
  onQuickFilterChange,
  resultCount,
}) => {
  const isFiltering = searchQuery.trim() !== '' || quickFilter !== 'all';

  const quickFilters = [
    { id: 'all', label: 'Tất cả cơ hội', icon: Compass },
    { id: 'freshman', label: 'Dành cho SV năm nhất (K60)', icon: GraduationCap },
    { id: 'points', label: 'Tích lũy Điểm rèn luyện', icon: Award },
    { id: 'cert', label: 'Săn Certificate làm CV', icon: FileCheck2 },
    { id: 'culture', label: 'Giao lưu Văn hóa & Ngôn ngữ', icon: Globe2 },
    { id: 'prize', label: 'Giải thưởng lớn & Học bổng', icon: Trophy },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-br from-[#00142B] via-[#002855] to-[#003B73] text-white border-b border-cyan-400/20">
      {/* Subtle Blueprint Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Glowing Ambient Spotlights */}
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[340px] rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 right-1/4 w-[420px] h-[260px] rounded-full bg-amber-400/10 blur-3xl pointer-events-none"
      />

      {/* Decorative Animated Radar Scanner Rings */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] pointer-events-none opacity-35"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full border border-cyan-300/25" />
        <div className="absolute inset-20 rounded-full border border-cyan-300/20" />
        <div className="absolute inset-40 rounded-full border border-dashed border-amber-300/25" />
        <div className="absolute inset-60 rounded-full border border-cyan-200/20" />
        <div
          className="absolute inset-0 rounded-full animate-radar-sweep"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(34,211,238,0.14) 0deg, transparent 55deg, transparent 360deg)',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Academic Project Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-cyan-300/30 text-cyan-100 text-[11px] sm:text-xs font-semibold mb-5 backdrop-blur-md shadow-xs">
          <Radio className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" aria-hidden="true" />
          <span>Dự án Sáng kiến CNTT&TT Nhóm 73 — ULIS, ĐHQGHN</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.18] mb-3 sm:mb-4">
          Trạm Radar bắt trọn mọi cơ hội cuộc thi, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">
            hội thảo & hoạt động ngoại khóa
          </span>{' '}
          tại ULIS
        </h1>

        {/* Official Slogan (Tiêu chí 2) */}
        <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-300/30 text-xs sm:text-sm font-bold italic text-amber-200 tracking-wide mb-5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
          <span>&ldquo;Bắt trọn cơ hội — Nâng tầm tri thức — Kiến tạo tương lai sinh viên Ngoại ngữ&rdquo;</span>
        </p>

        {/* Survey insight description */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base text-blue-100/90 leading-relaxed mb-7">
          Giải quyết tình trạng bài đăng phân tán trên hàng chục Fanpage CLB và Đoàn - Hội. Theo khảo sát{' '}
          <strong className="text-white font-bold">108 sinh viên ULIS</strong>, tới{' '}
          <strong className="text-amber-300 font-bold bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-300/30">
            84,3% từng bỏ lỡ cơ hội
          </strong>{' '}
          vì cập nhật muộn hoặc trôi mất hạn nộp đơn.
        </p>

        {/* Central Real-time Search Box */}
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            scrollToFeed();
          }}
          className="max-w-3xl mx-auto mb-5"
        >
          <div className="relative flex items-center p-1.5 rounded-2xl bg-white/10 border border-cyan-300/30 backdrop-blur-md shadow-2xl shadow-cyan-950/50">
            <div className="relative flex-1 flex items-center">
              <div className="absolute left-4 pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-[#003B73]" aria-hidden="true" />
              </div>
              <input
                type="search"
                enterKeyHint="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Tìm kiếm cuộc thi, sự kiện, workshop tại ULIS"
                placeholder="Tìm cuộc thi, workshop, CLB (gõ không dấu vẫn ra)…"
                className="w-full py-3.5 pl-12 pr-12 text-slate-900 placeholder-slate-400 bg-white rounded-xl border-0 focus:ring-2 focus:ring-amber-400 text-sm sm:text-base transition-all outline-none font-medium min-h-[50px] [&::-webkit-search-cancel-button]:hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Xóa từ khóa tìm kiếm"
                  className="absolute right-3 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="hidden sm:inline-flex items-center gap-1.5 ml-2 px-5 min-h-[50px] rounded-xl font-extrabold text-sm text-[#001833] bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer shrink-0 shadow-md"
            >
              <span>Quét ngay</span>
            </button>
          </div>
        </form>

        {/* Quick Filter Chips */}
        <div className="flex flex-nowrap sm:flex-wrap items-center sm:justify-center gap-2 sm:max-w-4xl overflow-x-auto -mx-4 px-4 sm:mx-auto sm:px-0 pb-1 [scrollbar-width:none]">
          <span className="text-xs font-semibold text-blue-200/80 mr-1 hidden sm:inline-block">
            Mục tiêu nhanh:
          </span>
          {quickFilters.map((chip) => {
            const IconComponent = chip.icon;
            const isSelected = quickFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => onQuickFilterChange(chip.id)}
                aria-pressed={isSelected}
                className={`shrink-0 min-h-[38px] flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-[#001833] font-extrabold shadow-md shadow-amber-500/20'
                    : 'bg-white/10 text-blue-50 hover:bg-white/20 border border-white/15 backdrop-blur-xs'
                }`}
              >
                <IconComponent
                  className={`w-3.5 h-3.5 ${isSelected ? 'text-[#001833]' : 'text-cyan-300'}`}
                  aria-hidden="true"
                />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results Jump Button */}
        {isFiltering && (
          <button
            type="button"
            onClick={scrollToFeed}
            className="mt-5 inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full text-sm font-bold text-[#001833] bg-cyan-300 hover:bg-cyan-200 cursor-pointer shadow-md"
            aria-live="polite"
          >
            Xem {resultCount} kết quả phù hợp
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </button>
        )}

        {/* Key Project Metrics Banner (Glass Dark Cards) */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mt-10 text-left">
          <div className="bg-white/8 backdrop-blur-md p-4 rounded-2xl border border-white/15 hover:border-amber-300/40 transition-colors">
            <div className="flex items-center gap-2 text-amber-300 mb-1">
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Thực trạng</span>
            </div>
            <div className="text-xl font-extrabold text-white">84,3%</div>
            <div className="text-xs text-blue-100/80">Sinh viên từng lỡ hẹn do trôi bài</div>
          </div>

          <div className="bg-white/8 backdrop-blur-md p-4 rounded-2xl border border-white/15 hover:border-cyan-300/40 transition-colors">
            <div className="flex items-center gap-2 text-cyan-300 mb-1">
              <TrendingUp className="w-4 h-4" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Giải pháp</span>
            </div>
            <div className="text-xl font-extrabold text-white">100% Tập trung</div>
            <div className="text-xs text-blue-100/80">Tổng hợp tại 1 trạm Radar duy nhất</div>
          </div>

          <div className="bg-white/8 backdrop-blur-md p-4 rounded-2xl border border-white/15 hover:border-emerald-300/40 transition-colors">
            <div className="flex items-center gap-2 text-emerald-300 mb-1">
              <Award className="w-4 h-4" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Quyền lợi</span>
            </div>
            <div className="text-xl font-extrabold text-white">ĐRL & Certificate</div>
            <div className="text-xs text-blue-100/80">Minh bạch mốc điểm & Chứng nhận</div>
          </div>

          <div className="bg-white/8 backdrop-blur-md p-4 rounded-2xl border border-white/15 hover:border-sky-300/40 transition-colors">
            <div className="flex items-center gap-2 text-sky-300 mb-1">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Phục vụ</span>
            </div>
            <div className="text-xl font-extrabold text-white">K57 — K60</div>
            <div className="text-xs text-blue-100/80">Đặc biệt tối ưu cho Tân SV K60</div>
          </div>
        </div>
      </div>
    </section>
  );
};

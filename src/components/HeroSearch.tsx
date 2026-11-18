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
  Compass
} from 'lucide-react';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  quickFilter: string;
  onQuickFilterChange: (filter: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
  quickFilter,
  onQuickFilterChange,
}) => {
  const quickFilters = [
    { id: 'all', label: 'Tất cả cơ hội', icon: Compass },
    { id: 'freshman', label: 'Dành cho SV năm nhất (K60)', icon: GraduationCap },
    { id: 'points', label: 'Tích lũy Điểm rèn luyện', icon: Award },
    { id: 'cert', label: 'Săn Certificate làm CV', icon: FileCheck2 },
    { id: 'culture', label: 'Giao lưu Văn hóa & Ngôn ngữ', icon: Globe2 },
    { id: 'prize', label: 'Giải thưởng lớn & Học bổng', icon: Trophy },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/70">
      
      {/* Decorative radar background rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-40" aria-hidden="true">
        <div className="absolute inset-0 rounded-full border border-blue-200/50"></div>
        <div className="absolute inset-16 rounded-full border border-blue-200/40"></div>
        <div className="absolute inset-32 rounded-full border border-blue-200/30"></div>
        <div className="absolute inset-48 rounded-full border border-dashed border-blue-300/40"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Academic Project Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#003B73] text-xs font-semibold mb-6 shadow-xs animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>Dự án Sáng kiến CNTT&TT Nhóm 73 — Trường ĐH Ngoại ngữ, ĐHQGHN</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003B73] tracking-tight leading-[1.2] mb-4">
          Trạm Radar bắt trọn mọi cơ hội cuộc thi, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B4F9F] via-[#1E88E5] to-blue-600">
            hội thảo & hoạt động ngoại khóa
          </span>{' '}
          tại ULIS
        </h1>

        {/* Survey insight description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
          Giải quyết tình trạng bài đăng bị phân tán trên nhiều Fanpage CLB và Đoàn - Hội khiến sinh viên dễ bị trôi tin. 
          Theo khảo sát thực tế <strong className="text-slate-900 font-semibold">108 sinh viên ULIS</strong>, có tới{' '}
          <strong className="text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
            84,3% sinh viên từng bỏ lỡ cơ hội
          </strong>{' '}
          do cập nhật muộn hoặc quên hạn nộp hồ sơ.
        </p>

        {/* Key Project Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10 text-left">
          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 text-rose-600 mb-1">
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider">Thực trạng</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">84.3%</div>
            <div className="text-xs text-slate-500">Sinh viên từng lỡ hẹn do trôi bài</div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <TrendingUp className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider">Giải pháp</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">100% Tập trung</div>
            <div className="text-xs text-slate-500">Tổng hợp tại 1 trạm Radar duy nhất</div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <Award className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider">Quyền lợi</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">ĐRL & Certificate</div>
            <div className="text-xs text-slate-500">Minh bạch mốc điểm & Chứng nhận</div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider">Phục vụ</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">K57 — K60</div>
            <div className="text-xs text-slate-500">Đặc biệt tối ưu cho Tân SV K60</div>
          </div>
        </div>

        {/* Central Real-time Search Box */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-blue-600" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Tìm kiếm cuộc thi, sự kiện, workshop tại ULIS"
              placeholder="Tìm kiếm cuộc thi, workshop, CLB (VD: Tranh biện, NCKH, Tiếng Anh, STENT, Dịch thuật...)"
              className="w-full py-4 pl-12 pr-12 text-slate-900 placeholder-slate-400 bg-white rounded-2xl border-2 border-slate-200 focus:border-[#003B73] focus:ring-4 focus:ring-blue-100/60 shadow-lg shadow-blue-900/5 text-sm sm:text-base transition-all outline-none font-medium min-h-[52px]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                aria-label="Xóa từ khóa tìm kiếm"
                className="absolute right-3.5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline-block">
            Mục tiêu nhanh:
          </span>
          {quickFilters.map((chip) => {
            const IconComponent = chip.icon;
            const isSelected = quickFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => onQuickFilterChange(chip.id)}
                aria-label={`Lọc theo ${chip.label}`}
                className={`min-h-[40px] flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#003B73] text-white shadow-md shadow-blue-900/20 scale-105'
                    : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-[#003B73] border border-slate-200/90 shadow-2xs'
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-200' : 'text-slate-500'}`} aria-hidden="true" />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

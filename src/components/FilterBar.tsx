'use client';

import React from 'react';
import { 
  ArrowUpDown, 
  RotateCcw, 
  Layers,
  Sparkles,
  LayoutGrid,
  List
} from 'lucide-react';

interface FilterBarProps {
  category: string;
  onCategoryChange: (cat: string) => void;
  benefit: string;
  onBenefitChange: (ben: string) => void;
  sortBy: 'deadline' | 'latest' | 'popular';
  onSortByChange: (sort: 'deadline' | 'latest' | 'popular') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalFiltered: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  category,
  onCategoryChange,
  benefit,
  onBenefitChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  totalFiltered,
  onResetFilters,
  hasActiveFilters,
}) => {
  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Tất cả loại hình' },
    { id: 'competition', label: 'Cuộc thi học thuật' },
    { id: 'talkshow', label: 'Tọa đàm / Hội thảo' },
    { id: 'workshop', label: 'Workshop kỹ năng' },
    { id: 'culture', label: 'Giao lưu văn hóa' },
    { id: 'recruitment', label: 'Tuyển thành viên CLB' },
  ];

  const benefits: { id: string; label: string }[] = [
    { id: 'all', label: 'Tất cả quyền lợi' },
    { id: 'training_points', label: 'Cộng điểm rèn luyện (ĐRL)' },
    { id: 'certificate', label: 'Cấp chứng nhận (Certificate)' },
    { id: 'prizes', label: 'Có giải thưởng / Học bổng' },
    { id: 'internship', label: 'Cơ hội thực tập doanh nghiệp' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-5 shadow-xs mb-6 sm:mb-8">

      {/* Top Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-100">

        {/* Left: Filter Controls (2 columns on phones; the "Tất cả …" option names each select) */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">

          {/* Category Dropdown */}
          <div className="flex items-center gap-2 min-w-0">
            <label htmlFor="filter-category" className="sr-only sm:not-sr-only text-xs font-semibold text-slate-500 whitespace-nowrap sm:flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              Loại hình:
            </label>
            <select
              id="filter-category"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full sm:w-auto min-w-0 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-3 py-2 min-h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73] transition-all cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Benefit Dropdown */}
          <div className="flex items-center gap-2 min-w-0">
            <label htmlFor="filter-benefit" className="sr-only sm:not-sr-only text-xs font-semibold text-slate-500 whitespace-nowrap sm:flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              Quyền lợi:
            </label>
            <select
              id="filter-benefit"
              value={benefit}
              onChange={(e) => onBenefitChange(e.target.value)}
              className="w-full sm:w-auto min-w-0 text-xs sm:text-sm font-semibold bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-3 py-2 min-h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73] transition-all cursor-pointer"
            >
              {benefits.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Right: Sorting Selector & View Mode Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 lg:flex-none min-w-0">
            <label htmlFor="filter-sort" className="text-xs font-semibold text-slate-500 whitespace-nowrap flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              Sắp xếp:
            </label>
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as 'deadline' | 'latest' | 'popular')}
              className="flex-1 lg:flex-none min-w-0 text-xs sm:text-sm font-semibold bg-blue-50/70 text-[#003B73] border border-blue-200 rounded-xl px-3 py-2 min-h-[40px] focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73] transition-all cursor-pointer"
            >
              <option value="deadline">⏰ Sắp hết hạn đăng ký (Ưu tiên)</option>
              <option value="latest">✨ Mới cập nhật gần nhất</option>
              <option value="popular">🔥 Được quan tâm nhiều nhất</option>
            </select>
          </div>

          {/* View Mode Switcher */}
          <div
            role="group"
            aria-label="Chế độ hiển thị bảng tin"
            className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200"
          >
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              aria-pressed={viewMode === 'grid'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#003B73] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Lưới</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              aria-pressed={viewMode === 'list'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-[#003B73] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Bảng lịch</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Summary Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
        <div className="text-xs sm:text-sm text-slate-600 font-medium">
          <span className="font-bold text-[#003B73]">{totalFiltered}</span> hoạt động còn mở đăng ký
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            aria-label="Đặt lại các bộ lọc"
            className="min-h-[36px] flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Đặt lại bộ lọc</span>
          </button>
        )}
      </div>

    </div>
  );
};

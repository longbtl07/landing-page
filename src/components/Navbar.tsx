'use client';

import React, { useState } from 'react';
import { 
  Radio, 
  ShieldCheck, 
  CalendarDays, 
  Users, 
  Menu, 
  X, 
  Bookmark
} from 'lucide-react';

interface NavbarProps {
  savedCount: number;
  onOpenSavedDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  onOpenSavedDrawer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <a 
            href="#" 
            aria-label="Về trang chủ ULIS Events & Competitions Radar"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-1"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#003B73] to-[#0B4F9F] text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-blue-200" aria-hidden="true" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" aria-hidden="true"></span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#003B73]">
                  ULIS Radar
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100/80 text-[#003B73] border border-blue-200">
                  <Radio className="w-3 h-3 text-blue-600 animate-pulse" aria-hidden="true" />
                  Live Portal
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:block">
                Events & Competitions Radar • ĐH Ngoại ngữ, ĐHQGHN
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <a
              href="#radar-feed"
              className="min-h-[44px] flex items-center px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#003B73] hover:bg-slate-100/80 rounded-xl transition-all"
            >
              Bảng tin sự kiện
            </a>
            <a
              href="#teammate-finder"
              className="min-h-[44px] flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#003B73] hover:bg-slate-100/80 rounded-xl transition-all"
            >
              <Users className="w-4 h-4 text-blue-600" aria-hidden="true" />
              Ghép đội dự thi
            </a>
            
            {/* Lịch đã lưu button */}
            <button
              onClick={onOpenSavedDrawer}
              aria-label={`Mở ngăn kéo Lịch đã lưu, hiện có ${savedCount} sự kiện`}
              className="min-h-[44px] relative flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#003B73] bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 rounded-xl transition-all group cursor-pointer ml-1"
            >
              <Bookmark className={`w-4 h-4 transition-colors ${savedCount > 0 ? 'text-[#1E88E5] fill-[#1E88E5]' : 'text-slate-500'}`} aria-hidden="true" />
              <span>Lịch đã lưu</span>
              {savedCount > 0 ? (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-blue-600 rounded-full shadow-xs animate-in zoom-in-50">
                  {savedCount}
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-normal">(0)</span>
              )}
            </button>
          </nav>

          {/* Mobile Menu & Drawer Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenSavedDrawer}
              aria-label={`Lịch đã lưu (${savedCount} sự kiện)`}
              className="min-h-[44px] min-w-[44px] relative flex items-center justify-center p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <Bookmark className={`w-5 h-5 ${savedCount > 0 ? 'text-[#1E88E5] fill-[#1E88E5]' : ''}`} aria-hidden="true" />
              {savedCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 text-[10px] font-bold text-white bg-blue-600 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div id="mobile-nav" className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            <a
              href="#radar-feed"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <CalendarDays className="w-4 h-4 text-[#003B73]" aria-hidden="true" />
              Bảng tin sự kiện & Cuộc thi
            </a>
            <a
              href="#teammate-finder"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <Users className="w-4 h-4 text-blue-600" aria-hidden="true" />
              Ghép đội dự thi
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSavedDrawer();
              }}
              className="min-h-[44px] flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 text-[#1E88E5]" aria-hidden="true" />
                Lịch đã lưu & Nhắc deadline
              </div>
              {savedCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-blue-600 rounded-full">
                  {savedCount} sự kiện
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

'use client';

import React, { useState } from 'react';
import {
  Radio,
  ShieldCheck,
  CalendarDays,
  Users,
  Menu,
  X,
  Bookmark,
  Sparkles,
  FileCheck,
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
    <header className="sticky top-0 z-40 w-full glass-nav-dark border-b border-white/10 text-white shadow-lg shadow-slate-950/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo Brand */}
          <a
            href="#"
            aria-label="Về trang chủ ULIS Events & Competitions Radar"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-xl p-1"
          >
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#0B4F9F] via-[#1E88E5] to-cyan-400 text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" aria-hidden="true" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-[#001833] flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" aria-hidden="true" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  ULIS Radar
                </span>
                <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-400/15 text-cyan-200 border border-cyan-400/30">
                  <Radio className="w-3 h-3 text-cyan-300 animate-pulse" aria-hidden="true" />
                  Đang quét tín hiệu
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-blue-200/80 font-medium hidden sm:block">
                Sự kiện & Cuộc thi • ĐH Ngoại ngữ, ĐHQGHN
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <a
              href="#benefits-section"
              className="min-h-[40px] flex items-center px-3 py-2 text-xs lg:text-sm font-semibold text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              Lợi ích
            </a>
            <a
              href="#radar-feed"
              className="min-h-[40px] flex items-center px-3 py-2 text-xs lg:text-sm font-semibold text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              Bảng tin
            </a>
            <a
              href="#media-showcase"
              className="hidden lg:flex min-h-[40px] items-center px-3 py-2 text-sm font-semibold text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              Video & Ảnh
            </a>
            <a
              href="#teammate-finder"
              className="min-h-[40px] flex items-center gap-1.5 px-3 py-2 text-xs lg:text-sm font-semibold text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              <Users className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
              Ghép đội
            </a>
            <a
              href="#register-section"
              className="hidden lg:flex min-h-[40px] items-center px-3 py-2 text-sm font-semibold text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              Đăng ký
            </a>

            {/* Lịch đã lưu button */}
            <button
              onClick={onOpenSavedDrawer}
              aria-label={`Mở ngăn kéo Lịch đã lưu, hiện có ${savedCount} sự kiện`}
              className="min-h-[42px] relative flex items-center gap-2 px-4 py-2 text-xs lg:text-sm font-bold text-[#001833] bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer ml-2"
            >
              <Bookmark
                className={`w-4 h-4 transition-colors ${
                  savedCount > 0 ? 'text-[#001833] fill-[#001833]' : 'text-[#001833]'
                }`}
                aria-hidden="true"
              />
              <span>Lịch đã lưu</span>
              {savedCount > 0 ? (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-extrabold text-amber-300 bg-[#001833] rounded-full">
                  {savedCount}
                </span>
              ) : (
                <span className="text-xs text-[#001833]/75 font-semibold">(0)</span>
              )}
            </button>
          </nav>

          {/* Mobile Menu & Drawer Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenSavedDrawer}
              aria-label={`Lịch đã lưu (${savedCount} sự kiện)`}
              className="min-h-[42px] relative flex items-center gap-1.5 px-3 rounded-xl bg-amber-400 text-[#001833] font-bold text-xs cursor-pointer"
            >
              <Bookmark className={`w-4 h-4 ${savedCount > 0 ? 'fill-[#001833]' : ''}`} aria-hidden="true" />
              <span>{savedCount}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl text-blue-100 hover:bg-white/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-white/10 bg-[#001833]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1.5 shadow-2xl"
        >
          <a
            href="#benefits-section"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-blue-100 hover:bg-white/10"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" aria-hidden="true" />
            Giá trị & Lợi ích
          </a>
          <a
            href="#radar-feed"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-blue-100 hover:bg-white/10"
          >
            <CalendarDays className="w-4 h-4 text-amber-300" aria-hidden="true" />
            Bảng tin sự kiện & Cuộc thi
          </a>
          <a
            href="#teammate-finder"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-blue-100 hover:bg-white/10"
          >
            <Users className="w-4 h-4 text-cyan-300" aria-hidden="true" />
            Ghép đội dự thi
          </a>
          <a
            href="#register-section"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[44px] flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-blue-100 hover:bg-white/10"
          >
            <FileCheck className="w-4 h-4 text-emerald-300" aria-hidden="true" />
            Đăng ký tham gia hoạt động
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSavedDrawer();
            }}
            className="min-h-[44px] flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold text-[#001833] bg-amber-400 text-left cursor-pointer mt-2"
          >
            <div className="flex items-center gap-3">
              <Bookmark className="w-4 h-4" aria-hidden="true" />
              Lịch đã lưu & Nhắc deadline
            </div>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold text-amber-300 bg-[#001833] rounded-full">
                {savedCount} sự kiện
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

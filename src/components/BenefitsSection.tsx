'use client';

import React from 'react';
import {
  Radar,
  Award,
  BellRing,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  return (
    <section
      id="benefits-section"
      aria-labelledby="benefits-heading"
      className="py-14 bg-white border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#003B73] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#1E88E5]" aria-hidden="true" />
              <span>Giá trị cốt lõi • Hệ sinh thái ULIS Radar</span>
            </div>
            <h2
              id="benefits-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#002244] tracking-tight"
            >
              Tại sao sinh viên Ngoại ngữ chọn ULIS Radar?
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md leading-relaxed">
            Thiết kế chuyên biệt để chấm dứt tình trạng trôi bài fanpage, giúp sinh viên K57 – K60 chủ động tích lũy thành tích suốt 4 năm đại học.
          </p>
        </div>

        {/* Asymmetric Bento Grid (distinct from uniform 4-card rows) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Featured Dark Bento Tile (5 cols, 2 rows) */}
          <div className="lg:col-span-5 lg:row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001833] via-[#002855] to-[#003B73] text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl shadow-blue-950/15">
            <div
              aria-hidden="true"
              className="absolute -right-12 -bottom-12 w-56 h-56 rounded-full border border-cyan-400/20 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -right-4 -bottom-4 w-36 h-36 rounded-full border border-amber-300/25 pointer-events-none"
            />

            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1E88E5] to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <Radar className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-[#001833]">
                  01 • Không lo trôi bài
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold leading-snug pt-2">
                Gom trọn 30+ nguồn CLB, Khoa & Đoàn - Hội về 1 trạm duy nhất
              </h3>

              <p className="text-sm text-blue-100/90 leading-relaxed">
                Không còn cảnh lướt Facebook suốt cả buổi tối mới thấy bài tuyển thành viên hay cuộc thi đã đóng đơn từ hôm qua. Toàn bộ tin tức được chuẩn hóa lịch trình và sắp xếp theo độ khẩn cấp.
              </p>

              <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-cyan-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                  <span>Cập nhật liên tục từ các Khoa chuyên ngữ & CLB</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                  <span>Tìm kiếm tiếng Việt không dấu siêu tốc</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                  <span>Đếm ngược thời gian thực tới từng giờ chót</span>
                </li>
              </ul>
            </div>

            <div className="relative mt-8 pt-5 border-t border-white/15 flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold text-amber-300">84,3%</div>
                <div className="text-xs text-blue-200">Sinh viên ULIS từng lỡ tin trước khi có Radar</div>
              </div>
              <a
                href="#radar-feed"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold text-white transition-colors"
              >
                <span>Khám phá ngay</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Top Wide Tile (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 p-6 sm:p-7 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-2.5 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  02 • Tối ưu CV & ĐRL
                </span>
                <span className="text-xs font-semibold text-slate-500">Minh bạch quyền lợi</span>
              </div>
              <h3 className="text-lg font-extrabold text-[#002244]">
                Lọc chính xác Điểm rèn luyện & Giấy chứng nhận (Certificate)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Phân định rõ hoạt động nào được cộng ĐRL (+5 đến +15 điểm), hoạt động nào cấp Certificate song ngữ hay có học bổng/thực tập để bạn đầu tư thời gian đúng mục tiêu.
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-8 h-8" aria-hidden="true" />
            </div>
          </div>

          {/* Right Bottom Split Tiles */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-3xl bg-amber-50/60 hover:bg-amber-50 border border-amber-200/80 p-6 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                    <BellRing className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-amber-900 border border-amber-200">
                    03 • Không cần đăng nhập
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">
                  Lưu lịch & Xuất file .ics
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ghi nhớ tự động trên trình duyệt không cần tài khoản và xuất file lịch <code className="text-xs font-bold">.ics</code> nhập thẳng vào Google/Apple Calendar.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-blue-50/60 hover:bg-blue-50 border border-blue-200/80 p-6 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#003B73] text-white flex items-center justify-center shadow-sm">
                    <Users className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-[#003B73] border border-blue-200">
                    04 • Kết nối liên khoa
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">
                  Ghép đội dự thi nhanh
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tìm ngay bạn đồng hành mạnh Design, Research hoặc Speaking giữa các Khoa K57 – K60 để tự tin chinh phục mọi cuộc thi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

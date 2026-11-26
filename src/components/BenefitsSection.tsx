'use client';

import React from 'react';
import {
  Radar,
  Award,
  BellRing,
  Users,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Radar,
      badge: 'Không lo trôi bài',
      title: 'Gom trọn 30+ nguồn CLB & Khoa',
      desc: 'Tổng hợp tức thì các cuộc thi, hội thảo từ Đoàn - Hội, Liên chi Đoàn các Khoa và các CLB ULIS về một bảng tin duy nhất — chấm dứt cảnh lỡ tin do thuật toán Facebook.',
      accent: 'from-blue-600 to-sky-500',
      lightBg: 'bg-blue-50 text-[#003B73] border-blue-200',
      highlights: ['Cập nhật liên tục hàng ngày', 'Tìm kiếm tiếng Việt không dấu'],
    },
    {
      icon: Award,
      badge: 'Tối ưu CV & ĐRL',
      title: 'Lọc đúng Điểm rèn luyện & Chứng nhận',
      desc: 'Phân loại minh bạch hoạt động nào có cộng Điểm rèn luyện (+ĐRL), cấp Certificate song ngữ hay có giải thưởng/cơ hội thực tập phù hợp từng khóa K57 – K60.',
      accent: 'from-emerald-600 to-teal-500',
      lightBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      highlights: ['Filter nhanh theo mục tiêu', 'Hiển thị rõ quyền lợi từng thẻ'],
    },
    {
      icon: BellRing,
      badge: 'Không cần đăng nhập',
      title: 'Lưu lịch & Xuất file .ics trong 1 chạm',
      desc: 'Trải nghiệm mượt mà không cần tạo tài khoản rườm rà. Dữ liệu lưu trực tiếp trên trình duyệt và xuất file .ics nhập thẳng vào Google Calendar hoặc Apple Calendar.',
      accent: 'from-amber-500 to-orange-500',
      lightBg: 'bg-amber-50 text-amber-800 border-amber-200',
      highlights: ['Nhắc trước hạn chót 24h', 'Tương thích mọi thiết bị'],
    },
    {
      icon: Users,
      badge: 'Kết nối liên khoa',
      title: 'Sàn Ghép đội dự thi nhanh chóng',
      desc: 'Thiếu thành viên giỏi Design slide, Research hay Speaking? Đăng tin tìm đồng đội theo đúng cuộc thi để kết nối nhanh sinh viên K57 – K60 trên toàn trường.',
      accent: 'from-indigo-600 to-blue-600',
      lightBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      highlights: ['Kết nối đa Khoa ngoại ngữ', 'Liên hệ trực tiếp qua Zalo/FB'],
    },
  ];

  return (
    <section
      id="benefits-section"
      aria-labelledby="benefits-heading"
      className="py-14 bg-white border-y border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#003B73] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#1E88E5]" aria-hidden="true" />
            <span>Giá trị cốt lõi dành cho sinh viên Ngoại ngữ</span>
          </div>
          <h2
            id="benefits-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#003B73] tracking-tight mb-3"
          >
            Tại sao 84,3% sinh viên cần ULIS Radar?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Khắc phục hoàn toàn tình trạng bỏ lỡ hạn đăng ký vì thông tin phân tán — giúp bạn chủ động tích lũy thành tích suốt 4 năm đại học.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative bg-slate-50/70 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.accent} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${item.lightBg}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                  {item.desc}
                </p>

                <ul className="space-y-1.5 pt-3 border-t border-slate-200/80">
                  {item.highlights.map((hl) => (
                    <li
                      key={hl}
                      className="flex items-center gap-1.5 text-xs font-medium text-slate-700"
                    >
                      <CheckCircle2
                        className="w-3.5 h-3.5 text-emerald-600 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

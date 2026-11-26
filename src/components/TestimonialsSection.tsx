'use client';

import React from 'react';
import { Star, Quote, MessageSquareQuote, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 't1',
      name: 'Nguyễn Minh Anh',
      role: 'Sinh viên K60 • Khoa Sư phạm Tiếng Anh',
      avatar: 'MA',
      avatarBg: 'from-blue-600 to-sky-500',
      rating: 5,
      tag: 'Tân sinh viên K60',
      quote:
        'Mới vào trường mình bị ngợp vì có quá nhiều fanpage CLB. Nhờ lọc nhanh mục "Dành cho SV năm nhất (K60)" trên Radar, mình kịp đăng ký 2 workshop làm CV và tích được 8 điểm rèn luyện ngay học kỳ đầu.',
    },
    {
      id: 't2',
      name: 'Trần Hoàng Nam',
      role: 'Sinh viên K58 • Khoa Ngôn ngữ & Văn hóa Nhật Bản',
      avatar: 'HN',
      avatarBg: 'from-indigo-600 to-blue-600',
      rating: 5,
      tag: 'Ghép đội thi học thuật',
      quote:
        'Tính năng Ghép đội dự thi cực kỳ hữu ích! Mình đăng tin tìm bạn giỏi Design slide cho cuộc thi hùng biện và chỉ sau 1 buổi tối đã ghép đủ team với 2 bạn bên Khoa Tiếng Anh.',
    },
    {
      id: 't3',
      name: 'Lê Thảo Vy',
      role: 'Cựu sinh viên K56 • Mentor Học thuật ULIS',
      avatar: 'TV',
      avatarBg: 'from-emerald-600 to-teal-500',
      rating: 5,
      tag: 'Cựu sinh viên K56',
      quote:
        'Ngày trước tụi mình phải tự lưu link Google Sheet rất dễ sót deadline. Nhìn giao diện Radar bây giờ vừa có cảnh báo đếm ngược, vừa xuất thẳng ra file .ics vào Google Calendar — quá tiện cho các em K57–K60!',
    },
    {
      id: 't4',
      name: 'Phạm Gia Huy',
      role: 'Phó Chủ nhiệm CLB Truyền thông & Sự kiện (K59)',
      avatar: 'GH',
      avatarBg: 'from-amber-500 to-orange-500',
      rating: 5,
      tag: 'Đại diện CLB / BTC',
      quote:
        'Từ khi gửi thông tin sự kiện qua cổng tiếp nhận của Nhóm 73, lượng sinh viên tiếp cận form đăng ký của CLB tăng rõ rệt, đặc biệt là các bạn sinh viên năm nhất không còn hỏi lại deadline sát giờ đóng đơn.',
    },
  ];

  return (
    <section
      id="testimonials-section"
      aria-labelledby="testimonials-heading"
      className="py-16 bg-slate-50 border-t border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
              <MessageSquareQuote className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
              <span>Phản hồi thực tế từ cộng đồng ULIS</span>
            </div>
            <h2
              id="testimonials-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#003B73] tracking-tight mb-2"
            >
              Sinh viên & CLB nói gì về ULIS Radar?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Đánh giá từ sinh viên các khóa K57 – K60, cựu sinh viên và đại diện Ban tổ chức các câu lạc bộ trực thuộc trường.
            </p>
          </div>

          {/* Summary Rating Pill */}
          <div className="inline-flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs self-start md:self-auto">
            <div>
              <div className="text-2xl font-extrabold text-[#003B73] leading-none">
                4.9<span className="text-sm font-semibold text-slate-400">/5.0</span>
              </div>
              <div className="flex items-center gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            <div className="h-9 w-px bg-slate-200" aria-hidden="true" />
            <div className="text-xs text-slate-600">
              <div className="font-bold text-slate-800">Khảo sát trải nghiệm</div>
              <div>108+ sinh viên ULIS đánh giá</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="relative bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
            >
              <Quote
                className="w-8 h-8 text-blue-100 absolute top-5 right-6"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-0.5" aria-label={`Đánh giá ${item.rating} trên 5 sao`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#003B73] border border-blue-100">
                    <ShieldCheck className="w-3 h-3 text-[#1E88E5]" aria-hidden="true" />
                    {item.tag}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                  aria-hidden="true"
                >
                  {item.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  PlayCircle,
  Images,
  Sparkles,
  CheckCircle2,
  Maximize2,
  X,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-debate',
    src: '/images/debate-ulis.jpg',
    alt: 'Sinh viên ULIS tham gia cuộc thi tranh biện tiếng Anh trên sân khấu hội trường',
    title: 'Đấu trường Tranh biện & Hùng biện',
    category: 'Cuộc thi học thuật',
    caption: 'Các cuộc thi tranh biện song ngữ quy mô toàn trường và liên đại học.',
  },
  {
    id: 'g-workshop',
    src: '/images/workshop-ulis.jpg',
    alt: 'Sinh viên tham dự workshop kỹ năng viết CV và chiến lược IELTS tại giảng đường',
    title: 'Workshop Kỹ năng & Chứng nhận CV',
    category: 'Phát triển bản thân',
    caption: 'Cập nhật lịch hội thảo nghề nghiệp, luyện IELTS và cấp Certificate.',
  },
  {
    id: 'g-culture',
    src: '/images/culture-ulis.jpg',
    alt: 'Lễ hội giao lưu văn hóa và ngôn ngữ quốc tế tại khuôn viên ĐH Ngoại ngữ',
    title: 'Lễ hội Văn hóa Đa ngôn ngữ',
    category: 'Giao lưu quốc tế',
    caption: 'Không gian giao lưu văn hóa Anh, Trung, Nhật, Hàn, Pháp, Đức, Nga...',
  },
  {
    id: 'g-teammate',
    src: '/images/teammate-ulis.jpg',
    alt: 'Nhóm sinh viên ULIS thảo luận ghép đội chuẩn bị cho cuộc thi tại thư viện',
    title: 'Ghép đội Học thuật Liên khoa',
    category: 'Teammate Finder',
    caption: 'Tìm đồng đội ăn ý về Design, Research và Presentation chỉ trong vài phút.',
  },
];

export const MediaShowcaseSection: React.FC = () => {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  return (
    <section
      id="media-showcase"
      aria-labelledby="media-heading"
      className="py-16 bg-white border-t border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#003B73] text-xs font-bold mb-3">
            <Images className="w-3.5 h-3.5 text-[#1E88E5]" aria-hidden="true" />
            <span>Sân khấu trải nghiệm ULIS</span>
          </div>
          <h2
            id="media-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#002244] tracking-tight mb-3"
          >
            Video giới thiệu & Hình ảnh hoạt động sinh viên
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Khám phá nhịp sống ngoại khóa sôi động tại Trường Đại học Ngoại ngữ và cách ULIS Radar giúp bạn bắt trọn mọi cơ hội.
          </p>
        </div>

        {/* Midnight Stage Theatre Block for Video */}
        <div className="rounded-3xl bg-gradient-to-br from-[#00142B] via-[#002244] to-[#003B73] text-white p-5 sm:p-8 lg:p-10 shadow-2xl shadow-blue-950/15 border border-cyan-400/20 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Video Player (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-cyan-300/25 shadow-2xl bg-slate-950">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/debate-ulis.jpg"
                  aria-label="Video giới thiệu hệ thống ULIS Events & Competitions Radar"
                  className="w-full aspect-video object-cover"
                >
                  <source src="/videos/ulis-radar-demo.mp4" type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ phát video HTML5.
                </video>
              </div>
            </div>

            {/* Video Summary Copy (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold border border-amber-300/30">
                <PlayCircle className="w-4 h-4 text-amber-300" aria-hidden="true" />
                <span>Video Demo Tổng Quan • 12 giây</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                Từ thông tin rời rạc đến lộ trình ngoại khóa bài bản
              </h3>

              <p className="text-sm text-blue-100/90 leading-relaxed">
                Video mô phỏng nhanh quy trình hoạt động của ULIS Radar: gom tin sự kiện từ 30+ CLB, lọc theo mục tiêu Điểm rèn luyện hoặc Certificate, ghép đội dự thi và xuất lịch trực tiếp về điện thoại.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-cyan-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                  <span>Thiết kế riêng cho sinh viên K57 – K60</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                  <span>Xem dạng Lưới Poster hoặc Bảng lịch Timeline</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                  <span>Thông tin được kiểm duyệt bởi Ban biên tập Nhóm 73</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4-Image Activity Gallery */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base sm:text-lg font-extrabold text-[#002244] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1E88E5]" aria-hidden="true" />
              <span>Không gian hoạt động sinh viên tiêu biểu</span>
            </h3>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Bấm vào ảnh để phóng to
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GALLERY_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxItem(item)}
                className="group text-left bg-slate-50 hover:bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#003B73] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001833]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 text-[#001833] text-[11px] font-bold">
                      <Maximize2 className="w-3 h-3" aria-hidden="true" />
                      Phóng to
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E88E5] mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200"
          >
            <div className="relative aspect-video w-full bg-slate-900">
              <Image
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Đóng xem ảnh"
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E88E5]">
                {lightboxItem.category}
              </span>
              <h4 className="text-lg font-extrabold text-[#003B73] mt-0.5">
                {lightboxItem.title}
              </h4>
              <p className="text-sm text-slate-600 mt-1">{lightboxItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

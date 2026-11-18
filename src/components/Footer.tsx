'use client';

import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink, 
  GraduationCap, 
  Compass,
  Radio,
  PlusCircle
} from 'lucide-react';

interface FooterProps {
  onOpenSubmitModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSubmitModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Academic Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white shadow-md">
                <ShieldCheck className="w-6 h-6 text-blue-100" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white tracking-tight">
                  ULIS Events & Competitions Radar
                </h3>
                <span className="text-xs text-blue-400 font-semibold flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" aria-hidden="true" />
                  Hệ thống tổng hợp & theo dõi cơ hội sinh viên Ngoại ngữ
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Sáng kiến giải quyết triệt để tình trạng phân tán thông tin trên nhiều fanpage CLB, hỗ trợ sinh viên ULIS (K57 – K60) không bỏ lỡ các mốc hạn chót, tối ưu hóa điểm rèn luyện và săn chứng nhận hoàn thiện CV học thuật.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-1.5 max-w-md">
              <div className="font-semibold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-400" aria-hidden="true" />
                <span>Đơn vị thực hiện:</span>
              </div>
              <p className="text-slate-300 font-medium">
                <strong>Nhóm CNTT&TT 73</strong> — Học kỳ I năm học 2026 – 2027
              </p>
              <p className="text-slate-400 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Trường Đại học Ngoại ngữ, Đại học Quốc gia Hà Nội (Số 2, Phạm Văn Đồng, Cầu Giấy, Hà Nội)</span>
              </p>
            </div>
          </div>

          {/* Col 2: Support & Media Cooperation (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" aria-hidden="true" />
              Hỗ trợ kỹ thuật & Hợp tác truyền thông
            </h4>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Dành cho các Câu lạc bộ, Liên chi Đoàn các Khoa và đối tác có nhu cầu phối hợp đăng tải và truyền thông hoạt động:
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-slate-200">
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                  <span className="font-bold text-xs" aria-hidden="true">👤</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Đại diện đầu mối liên hệ:</span>
                  <strong className="text-white">Nguyễn Hải Long (Trưởng nhóm)</strong>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-200">
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Email tiếp nhận:</span>
                  <a 
                    href="mailto:nguyenhailong050807@gmail.com" 
                    className="text-blue-400 hover:text-blue-300 hover:underline font-mono"
                  >
                    nguyenhailong050807@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-200">
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Hotline / Zalo hỗ trợ:</span>
                  <a 
                    href="tel:0822551976" 
                    className="text-white hover:text-blue-300 font-mono font-semibold"
                  >
                    0822551976
                  </a>
                </div>
              </div>
            </div>

            {/* Dedicated Club / Organizer Submission CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenSubmitModal}
                aria-label="Mở cổng gửi thông tin hoạt động dành cho Ban tổ chức và CLB"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-blue-300 bg-blue-950/80 hover:bg-blue-900 border border-blue-700/80 transition-all cursor-pointer shadow-sm hover:text-white"
              >
                <PlusCircle className="w-4 h-4 text-blue-400" aria-hidden="true" />
                <span>Gửi thông tin sự kiện (Dành cho CLB / BTC)</span>
              </button>
            </div>
          </div>

          {/* Col 3: Academic Portals & Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" aria-hidden="true" />
              Cổng thông tin hữu ích
            </h4>

            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://ulis.vnu.edu.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between py-1 border-b border-slate-800/80 transition-colors"
                >
                  <span>Cổng thông tin Trường ĐH Ngoại ngữ</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://ulis.vnu.edu.vn/nguoi-hoc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between py-1 border-b border-slate-800/80 transition-colors"
                >
                  <span>Cổng Đào tạo & Người học ULIS</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/ulis.vnu.edu.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center justify-between py-1 border-b border-slate-800/80 transition-colors"
                >
                  <span>Đoàn Thanh niên - Hội Sinh viên</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="#radar-feed"
                  className="hover:text-white flex items-center justify-between py-1 border-b border-slate-800/80 transition-colors"
                >
                  <span>Bảng tin cơ hội ngoại khóa</span>
                  <span className="text-[10px] text-blue-400 font-semibold">Radar Feed</span>
                </a>
              </li>
              <li>
                <a
                  href="#teammate-finder"
                  className="hover:text-white flex items-center justify-between py-1 transition-colors"
                >
                  <span>Sàn ghép đội thi học thuật</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Teammate</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & academic motto */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 <strong>ULIS Events & Competitions Radar</strong> — Phát triển bởi Nhóm CNTT&TT 73.
          </div>
          <div className="text-slate-400 flex items-center gap-1.5">
            <span>Bắt trọn cơ hội — Nâng tầm tri thức — Kiến tạo tương lai sinh viên Ngoại ngữ</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

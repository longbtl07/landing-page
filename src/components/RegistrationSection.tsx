'use client';

import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  CalendarCheck,
  Mail,
  User,
  GraduationCap,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { EventItem } from '@/types';

interface RegistrationSectionProps {
  availableEvents: EventItem[];
  onRegisterSuccess: (title: string, message: string) => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  availableEvents,
  onRegisterSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('K60');
  const [faculty, setFaculty] = useState('Khoa Sư phạm Tiếng Anh');
  const [selectedEventId, setSelectedEventId] = useState(
    availableEvents[0]?.id || 'weekly-radar'
  );
  const [interestNote, setInterestNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Vui lòng nhập địa chỉ email hợp lệ (ưu tiên email VNU/ULIS hoặc Gmail).');
      return;
    }

    const chosenEvent =
      selectedEventId === 'weekly-radar'
        ? 'Bản tin Radar Deadline hàng tuần'
        : availableEvents.find((ev) => ev.id === selectedEventId)?.title ||
          'Hoạt động sinh viên ULIS';

    setIsSubmitted(true);
    onRegisterSuccess(
      'Đăng ký tham gia thành công!',
      `Đã ghi nhận đăng ký của ${fullName.trim()} (${batch}) cho "${chosenEvent.substring(0, 40)}".`
    );
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setInterestNote('');
    setErrorMsg('');
  };

  return (
    <section
      id="register-section"
      aria-labelledby="register-heading"
      className="py-16 bg-gradient-to-b from-white to-blue-50/60 border-t border-slate-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg shadow-blue-900/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Academic Pitch & Highlights */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#003B73] via-[#0B4F9F] to-[#1E88E5] text-white p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-xs font-semibold text-blue-50">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                <span>Đăng ký nhanh • Không cần tạo tài khoản</span>
              </div>

              <h2
                id="register-heading"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug"
              >
                Đăng ký tham gia hoạt động & nhận Radar Deadline
              </h2>

              <p className="text-sm text-blue-100 leading-relaxed">
                Chọn trực tiếp sự kiện bạn muốn tham gia hoặc đăng ký nhận tổng hợp hạn chót Điểm rèn luyện & Cuộc thi hàng tuần dành riêng cho sinh viên ULIS (K57 – K60).
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-blue-50">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Gửi nhắc nhở trước hạn đóng đơn 24h qua Email sinh viên</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Ưu tiên suất tham dự Workshop kỹ năng & Talkshow có Certificate</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Hỗ trợ kết nối Ban tổ chức CLB & Khoa khi cần xác nhận ĐRL</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 text-xs text-blue-100">
              <strong className="text-white block mb-1">
                Cam kết bảo mật thông tin sinh viên
              </strong>
              Thông tin chỉ dùng để điều phối hoạt động và nhắc lịch sự kiện từ Nhóm CNTT&TT 73 — ULIS.
            </div>
          </div>

          {/* Right Column: Live Interactive Registration Form */}
          <div className="lg:col-span-7 p-8 sm:p-10">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CalendarCheck className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-extrabold text-[#003B73]">
                  Đã ghi nhận đăng ký của bạn!
                </h3>
                <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                  Cảm ơn <strong>{fullName}</strong> ({batch} — {faculty}). Hệ thống đã lưu thông tin tham gia và sẽ gửi lịch nhắc qua email{' '}
                  <span className="font-mono text-[#003B73]">{email}</span>.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-[#003B73] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                >
                  Đăng ký thêm hoạt động khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-2">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Phiếu đăng ký tham gia hoạt động ULIS
                  </h3>
                  <p className="text-xs text-slate-500">
                    Điền thông tin dưới đây để giữ chỗ hoặc nhận thông báo sớm nhất.
                  </p>
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold"
                  >
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="reg-fullname"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Họ và tên sinh viên <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User
                        className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                        aria-hidden="true"
                      />
                      <input
                        id="reg-fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="VD: Nguyễn Minh Anh"
                        className="w-full pl-10 pr-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="reg-email"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Email liên hệ / VNU <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail
                        className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                        aria-hidden="true"
                      />
                      <input
                        id="reg-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="VD: minhanh.ulis@vnu.edu.vn"
                        className="w-full pl-10 pr-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="reg-batch"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Khóa học
                    </label>
                    <div className="relative">
                      <GraduationCap
                        className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                        aria-hidden="true"
                      />
                      <select
                        id="reg-batch"
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
                      >
                        <option value="K60">K60 (Tân sinh viên - Năm 1)</option>
                        <option value="K59">K59 (Sinh viên năm 2)</option>
                        <option value="K58">K58 (Sinh viên năm 3)</option>
                        <option value="K57">K57 (Sinh viên năm 4)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="reg-faculty"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Khoa / Đơn vị
                    </label>
                    <div className="relative">
                      <BookOpen
                        className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                        aria-hidden="true"
                      />
                      <select
                        id="reg-faculty"
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
                      >
                        <option value="Khoa Sư phạm Tiếng Anh">Khoa Sư phạm Tiếng Anh</option>
                        <option value="Khoa Tiếng Anh">Khoa Tiếng Anh</option>
                        <option value="Khoa NN&VH Trung Quốc">Khoa NN&VH Trung Quốc</option>
                        <option value="Khoa NN&VH Nhật Bản">Khoa NN&VH Nhật Bản</option>
                        <option value="Khoa NN&VH Hàn Quốc">Khoa NN&VH Hàn Quốc</option>
                        <option value="Khoa NN&VH Pháp / Đức / Nga">Khoa NN&VH Pháp / Đức / Nga</option>
                        <option value="Đào tạo Quốc tế / CLC">Đào tạo Quốc tế / CLC</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reg-event"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Hoạt động / Chương trình muốn đăng ký
                  </label>
                  <select
                    id="reg-event"
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
                  >
                    <option value="weekly-radar">
                      Nhận bản tin tổng hợp Deadline & ĐRL hàng tuần (Tất cả sự kiện)
                    </option>
                    {availableEvents.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.title} (Hạn: {ev.deadlineFormatted})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="reg-note"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Mục tiêu tham gia hoặc câu hỏi cho BTC (không bắt buộc)
                  </label>
                  <input
                    id="reg-note"
                    type="text"
                    value={interestNote}
                    onChange={(e) => setInterestNote(e.target.value)}
                    placeholder="VD: Muốn tích điểm rèn luyện, tìm hiểu thể lệ vòng sơ loại..."
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full min-h-[48px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#003B73] via-[#0B4F9F] to-[#1E88E5] hover:opacity-95 shadow-md shadow-blue-900/15 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-blue-200" aria-hidden="true" />
                    <span>Xác nhận đăng ký tham gia</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

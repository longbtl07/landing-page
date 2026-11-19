'use client';

import React, { useState } from 'react';
import { X, Send, PlusCircle, ShieldCheck } from 'lucide-react';
import { EventItem, EventCategory, EventBenefit } from '@/types';
import { todayISO } from '@/utils';
import { useModal } from '@/utils/useModal';

interface SubmitEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEvent: (newEvent: EventItem) => void;
}

export const SubmitEventModal: React.FC<SubmitEventModalProps> = ({
  isOpen,
  onClose,
  onSubmitEvent,
}) => {
  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [category, setCategory] = useState<EventCategory>('workshop');
  const [deadline, setDeadline] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Benefits toggles
  const [benefitPoints, setBenefitPoints] = useState(true);
  const [benefitCert, setBenefitCert] = useState(true);
  const [benefitPrize, setBenefitPrize] = useState(false);
  const [benefitInternship, setBenefitInternship] = useState(false);
  const [isFreshman, setIsFreshman] = useState(true);

  const panelRef = useModal<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  const minDeadline = todayISO();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim() || !organizer.trim() || !deadline) {
      setErrorMsg('Vui lòng điền đầy đủ tên hoạt động, đơn vị tổ chức và hạn chót đăng ký!');
      return;
    }
    if (deadline < minDeadline) {
      setErrorMsg('Hạn chót đóng đơn không thể là ngày trong quá khứ.');
      return;
    }

    const benefitsArray: EventBenefit[] = [];
    const benefitBadges: string[] = [];

    if (benefitPoints) {
      benefitsArray.push('training_points');
      benefitBadges.push('+Điểm rèn luyện');
    }
    if (benefitCert) {
      benefitsArray.push('certificate');
      benefitBadges.push('Có Certificate');
    }
    if (benefitPrize) {
      benefitsArray.push('prizes');
      benefitBadges.push('Có Giải thưởng');
    }
    if (benefitInternship) {
      benefitsArray.push('internship');
      benefitBadges.push('Cơ hội thực tập');
    }

    const categoryLabels: Record<EventCategory, string> = {
      competition: 'Cuộc thi',
      talkshow: 'Tọa đàm / Hội thảo',
      workshop: 'Workshop kỹ năng',
      culture: 'Giao lưu văn hóa',
      recruitment: 'Tuyển thành viên CLB',
    };

    const gradients = [
      'from-blue-700 via-sky-800 to-indigo-900',
      'from-emerald-700 via-teal-800 to-cyan-900',
      'from-purple-700 via-indigo-800 to-slate-900',
      'from-rose-700 via-pink-800 to-amber-900',
    ];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    const newEvent: EventItem = {
      id: `custom-event-${Date.now()}`,
      title: title.trim(),
      organizer: organizer.trim(),
      organizerBadge: organizer.trim(),
      organizerType: 'club',
      category,
      categoryLabel: categoryLabels[category],
      targetAudience: isFreshman ? 'Sinh viên K57 - K60 toàn trường (Đặc biệt chào đón K60)' : 'Toàn thể sinh viên ULIS (K57 - K60)',
      isFreshmanFriendly: isFreshman,
      benefits: benefitsArray,
      benefitBadges: benefitBadges.length > 0 ? benefitBadges : ['+Điểm rèn luyện', 'Có Certificate'],
      trainingPoints: benefitPoints ? 3 : 0,
      hasCertificate: benefitCert,
      hasPrize: benefitPrize,
      deadline,
      deadlineFormatted: `${deadline.split('-').reverse().join('/')} (23:59)`,
      eventDate: eventDate.trim() || 'Sẽ thông báo chi tiết',
      location: location.trim() || 'Trường ĐH Ngoại ngữ - ĐHQGHN',
      isOnline: location.toLowerCase().includes('online') || location.toLowerCase().includes('zoom'),
      bannerGradient: randomGradient,
      bannerTheme: 'Sự kiện do BTC/CLB gửi đăng tải',
      bannerTag: 'CHỜ BAN BIÊN TẬP DUYỆT',
      shortDesc: shortDesc.trim() || 'Chương trình do đơn vị tổ chức gửi lên Radar, đang chờ Ban biên tập kiểm duyệt.',
      fullDesc: fullDesc.trim() || (shortDesc.trim() || 'Thông tin hoạt động được cập nhật liên tục từ Ban Tổ chức.'),
      detailedBenefits: [
        benefitPoints ? 'Cộng điểm rèn luyện theo quy chế của Đoàn trường và Phòng CT&CTSV.' : 'Cộng điểm rèn luyện tham gia hoạt động.',
        benefitCert ? 'Được cấp Giấy chứng nhận (Certificate) chính thức của đơn vị tổ chức.' : 'Hỗ trợ xác nhận tham gia sự kiện.',
        'Mở rộng mạng lưới kết nối bạn bè tại Trường ĐH Ngoại ngữ - ĐHQGHN.'
      ],
      timeline: [
        { stage: 'Đóng đơn đăng ký', time: deadline.split('-').reverse().join('/'), desc: 'Hạn cuối tiếp nhận hồ sơ thí sinh/người tham dự' },
        { stage: 'Diễn ra chương trình chính thức', time: eventDate.trim() || 'Sẽ thông báo', desc: 'Tổ chức tại địa điểm công bố' }
      ],
      registrationUrl: registrationUrl.trim(),
      contactEmail: contactEmail.trim(),
      contactFanpage: '',
      rating: 0,
      reviewCount: 0,
      reviews: [],
      tags: ['Sự kiện mới', categoryLabels[category], 'ULIS Radar'],
      createdAt: new Date().toISOString(),
      viewsCount: 0,
    };

    onSubmitEvent(newEvent);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-submit-event-title"
    >
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div ref={panelRef} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#003B73] via-[#0B4F9F] to-[#1E88E5] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <PlusCircle className="w-5 h-5 text-blue-200" aria-hidden="true" />
            </div>
            <div>
              <h3 id="modal-submit-event-title" className="text-lg font-bold">
                Cổng tiếp nhận thông tin (Dành cho CLB / BTC)
              </h3>
              <p className="text-xs text-blue-100 flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                <span>Kiểm duyệt & bảo trợ truyền thông bởi Ban biên tập Nhóm 73</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ gửi sự kiện"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
            ℹ️ <strong>Dành cho Ban tổ chức / CLB:</strong> Điền thông tin sự kiện để thông báo đến toàn thể sinh viên các khóa K57 – K60 tại ULIS. Mọi thông tin gửi về sẽ được Ban biên tập Nhóm 73 kiểm duyệt và hiển thị trực tiếp lên Radar.
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-medium text-xs">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="evt-title" className="block font-semibold text-slate-800 mb-1">
              Tên sự kiện / Cuộc thi <span className="text-rose-500">*</span>
            </label>
            <input
              id="evt-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Cuộc thi Thuyết trình Tiếng Nhật: Nét đẹp Văn hóa Tokai 2026"
              className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
            />
          </div>

          {/* Organizer & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="evt-organizer" className="block font-semibold text-slate-800 mb-1">
                Đơn vị tổ chức <span className="text-rose-500">*</span>
              </label>
              <input
                id="evt-organizer"
                type="text"
                required
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="VD: CLB Tiếng Nhật JPC, LCĐ Khoa SPTA..."
                className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              />
            </div>

            <div>
              <label htmlFor="evt-category" className="block font-semibold text-slate-800 mb-1">Loại hình</label>
              <select
                id="evt-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              >
                <option value="competition">Cuộc thi học thuật</option>
                <option value="talkshow">Tọa đàm / Hội thảo</option>
                <option value="workshop">Workshop kỹ năng thực chiến</option>
                <option value="culture">Giao lưu văn hóa</option>
                <option value="recruitment">Tuyển thành viên CLB</option>
              </select>
            </div>
          </div>

          {/* Deadline & Event Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="evt-deadline" className="block font-semibold text-slate-800 mb-1">
                Hạn chót đóng đơn <span className="text-rose-500">*</span>
              </label>
              <input
                id="evt-deadline"
                type="date"
                required
                min={minDeadline}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              />
            </div>

            <div>
              <label htmlFor="evt-date" className="block font-semibold text-slate-800 mb-1">
                Thời gian diễn ra
              </label>
              <input
                id="evt-date"
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                placeholder="VD: 28/11/2026 (08:30 - 11:30)"
                className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              />
            </div>
          </div>

          {/* Location & Registration URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="evt-location" className="block font-semibold text-slate-800 mb-1">
                Địa điểm tổ chức
              </label>
              <input
                id="evt-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="VD: Hội trường Sunwah, ULIS hoặc Online MS Teams"
                className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              />
            </div>

            <div>
              <label htmlFor="evt-url" className="block font-semibold text-slate-800 mb-1">
                Link đơn đăng ký (Google Form / Link gốc)
              </label>
              <input
                id="evt-url"
                type="url"
                value={registrationUrl}
                onChange={(e) => setRegistrationUrl(e.target.value)}
                placeholder="https://forms.gle/..."
                className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              />
            </div>
          </div>

          {/* Benefit Checkboxes */}
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 space-y-2">
            <span className="font-bold text-[#003B73] block">Quyền lợi dành cho sinh viên tham gia:</span>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={benefitPoints}
                  onChange={(e) => setBenefitPoints(e.target.checked)}
                  className="rounded text-[#003B73] focus:ring-blue-500 w-4 h-4"
                />
                <span>Cộng điểm rèn luyện (ĐRL)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={benefitCert}
                  onChange={(e) => setBenefitCert(e.target.checked)}
                  className="rounded text-[#003B73] focus:ring-blue-500 w-4 h-4"
                />
                <span>Cấp Certificate hoàn thành</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={benefitPrize}
                  onChange={(e) => setBenefitPrize(e.target.checked)}
                  className="rounded text-[#003B73] focus:ring-blue-500 w-4 h-4"
                />
                <span>Giải thưởng tiền mặt / Hiện vật</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={benefitInternship}
                  onChange={(e) => setBenefitInternship(e.target.checked)}
                  className="rounded text-[#003B73] focus:ring-blue-500 w-4 h-4"
                />
                <span>Cơ hội thực tập doanh nghiệp</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer col-span-2 min-h-[36px]">
                <input
                  type="checkbox"
                  checked={isFreshman}
                  onChange={(e) => setIsFreshman(e.target.checked)}
                  className="rounded text-[#003B73] focus:ring-blue-500 w-4 h-4"
                />
                <span>Hoạt động đặc biệt thân thiện với Tân sinh viên K60</span>
              </label>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label htmlFor="evt-desc" className="block font-semibold text-slate-800 mb-1">
              Mô tả ngắn gọn về hoạt động (1 - 2 câu)
            </label>
            <textarea
              id="evt-desc"
              rows={2}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="Nêu tóm tắt mục tiêu, thể lệ và đối tượng tham gia..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
            />
          </div>

          {/* Full Description / Timeline */}
          <div>
            <label htmlFor="evt-fulldesc" className="block font-semibold text-slate-800 mb-1">
              Chi tiết lộ trình hoặc nội dung bổ sung (tùy chọn)
            </label>
            <textarea
              id="evt-fulldesc"
              rows={2}
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              placeholder="Thông tin thêm về diễn giả, lộ trình các vòng thi..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label htmlFor="evt-contact" className="block font-semibold text-slate-800 mb-1">
              Email đầu mối liên hệ của BTC
            </label>
            <input
              id="evt-contact"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="VD: clb.ulis@vnu.edu.vn"
              className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="min-h-[44px] flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#003B73] via-[#0B4F9F] to-[#1E88E5] hover:opacity-95 shadow-md shadow-blue-900/15 cursor-pointer"
            >
              <Send className="w-4 h-4 text-blue-200" aria-hidden="true" />
              <span>Gửi duyệt & Đăng tải</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

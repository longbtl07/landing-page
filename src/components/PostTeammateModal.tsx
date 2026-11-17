'use client';

import React, { useState, useEffect } from 'react';
import { X, Users, Send } from 'lucide-react';
import { TeammatePost, EventItem } from '@/types';

interface PostTeammateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (post: TeammatePost) => void;
  availableEvents: EventItem[];
}

export const PostTeammateModal: React.FC<PostTeammateModalProps> = ({
  isOpen,
  onClose,
  onAddPost,
  availableEvents,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [faculty, setFaculty] = useState('Khoa Sư phạm Tiếng Anh');
  const [batch, setBatch] = useState('K58');
  const [targetEventTitle, setTargetEventTitle] = useState(availableEvents[0]?.title || '');
  const [customEvent, setCustomEvent] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [description, setDescription] = useState('');
  const [currentMembers, setCurrentMembers] = useState(1);
  const [maxMembers, setMaxMembers] = useState(3);
  const [contactEmail, setContactEmail] = useState('');
  const [contactZalo, setContactZalo] = useState('');
  const [contactFacebook, setContactFacebook] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!authorName.trim() || !contactEmail.trim()) {
      setErrorMsg('Vui lòng nhập họ tên và email sinh viên để liên hệ.');
      return;
    }

    if (currentMembers > maxMembers) {
      setErrorMsg('Số thành viên hiện có không thể lớn hơn quy mô team tối đa.');
      return;
    }

    const skillsArray = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const colors = ['bg-blue-600', 'bg-indigo-600', 'bg-rose-600', 'bg-emerald-600', 'bg-amber-600', 'bg-teal-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const finalEventTitle = targetEventTitle === 'custom' ? (customEvent.trim() || 'Cuộc thi mở') : targetEventTitle;

    const newPost: TeammatePost = {
      id: `team-${Date.now()}`,
      authorName: authorName.trim(),
      faculty,
      batch,
      avatarColor: randomColor,
      targetEventTitle: finalEventTitle,
      lookingFor: skillsArray.length > 0 ? skillsArray : ['Tìm bạn đồng hành đam mê', 'Hỗ trợ nội dung & thuyết trình'],
      description: description.trim() || 'Chúng mình đang rất hào hứng với cuộc thi này và mong muốn tìm bạn cùng chung chí hướng!',
      currentMembers: Number(currentMembers),
      maxMembers: Number(maxMembers),
      contactEmail: contactEmail.trim(),
      contactZalo: contactZalo.trim() || undefined,
      contactFacebook: contactFacebook.trim() || undefined,
      createdAt: 'Vừa xong',
      status: 'recruiting',
    };

    onAddPost(newPost);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-post-teammate-title"
    >
      
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#003B73] to-[#0B4F9F] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <Users className="w-5 h-5 text-blue-200" aria-hidden="true" />
            </div>
            <div>
              <h3 id="modal-post-teammate-title" className="text-lg font-bold">
                Đăng tin tìm đồng đội dự thi
              </h3>
              <p className="text-xs text-blue-100">
                Kết nối với sinh viên các Khoa, ghép team học thuật & tranh biện
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ đăng tin"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-medium text-xs">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Row 1: Name, Batch, Faculty */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label htmlFor="tm-name" className="block font-semibold text-slate-800 mb-1">
                Họ và tên <span className="text-rose-500">*</span>
              </label>
              <input
                id="tm-name"
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="VD: Trần Tuấn Minh"
                className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              />
            </div>

            <div>
              <label htmlFor="tm-batch" className="block font-semibold text-slate-800 mb-1">Khóa học</label>
              <select
                id="tm-batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              >
                <option value="K58">K58 (Tân sinh viên)</option>
                <option value="K57">K57 (Sinh viên năm 2)</option>
                <option value="K56">K56 (Sinh viên năm 3)</option>
                <option value="K55">K55 (Sinh viên năm cuối)</option>
              </select>
            </div>

            <div>
              <label htmlFor="tm-faculty" className="block font-semibold text-slate-800 mb-1">Khoa / Đơn vị</label>
              <select
                id="tm-faculty"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              >
                <option value="Khoa Sư phạm Tiếng Anh">Khoa Sư phạm Tiếng Anh</option>
                <option value="Khoa NN&VH các nước nói Tiếng Anh">Khoa NN&VH các nước Tiếng Anh</option>
                <option value="Khoa NN&VH Trung Quốc">Khoa NN&VH Trung Quốc</option>
                <option value="Khoa NN&VH Nhật Bản">Khoa NN&VH Nhật Bản</option>
                <option value="Khoa NN&VH Hàn Quốc">Khoa NN&VH Hàn Quốc</option>
                <option value="Khoa NN&VH Pháp">Khoa NN&VH Pháp</option>
                <option value="Khoa NN&VH Đức">Khoa NN&VH Đức</option>
                <option value="Khoa NN&VH Nga">Khoa NN&VH Nga</option>
                <option value="Khoa Ngôn ngữ & Văn hóa Đông Nam Á">Khoa NN&VH ĐNÁ</option>
                <option value="Khoa Luật & KHXH">Khoa Luật & KHXH</option>
              </select>
            </div>
          </div>

          {/* Row 2: Target Event */}
          <div>
            <label htmlFor="tm-event" className="block font-semibold text-slate-800 mb-1">
              Cuộc thi / Hoạt động muốn tham gia <span className="text-rose-500">*</span>
            </label>
            <select
              id="tm-event"
              value={targetEventTitle}
              onChange={(e) => setTargetEventTitle(e.target.value)}
              className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
            >
              {availableEvents.map((evt) => (
                <option key={evt.id} value={evt.title}>
                  {evt.title}
                </option>
              ))}
              <option value="custom">-- Cuộc thi khác ngoài danh sách --</option>
            </select>

            {targetEventTitle === 'custom' && (
              <input
                type="text"
                value={customEvent}
                onChange={(e) => setCustomEvent(e.target.value)}
                placeholder="Nhập tên cuộc thi / hoạt động..."
                aria-label="Tên cuộc thi khác"
                className="w-full mt-2 px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              />
            )}
          </div>

          {/* Row 3: Skills looking for */}
          <div>
            <label htmlFor="tm-skills" className="block font-semibold text-slate-800 mb-1">
              Kỹ năng / Vị trí đang thiếu <span className="text-slate-400 font-normal">(cách nhau bằng dấu phẩy)</span>
            </label>
            <input
              id="tm-skills"
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="VD: Cần bạn Design slide Canva/Figma, Mạnh Speaking Tiếng Anh, Viết đề cương NCKH"
              className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
            />
          </div>

          {/* Row 4: Team member numbers */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="tm-current" className="block font-semibold text-slate-800 mb-1">Số thành viên hiện có</label>
              <input
                id="tm-current"
                type="number"
                min={1}
                max={5}
                value={currentMembers}
                onChange={(e) => setCurrentMembers(Number(e.target.value))}
                className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              />
            </div>
            <div>
              <label htmlFor="tm-max" className="block font-semibold text-slate-800 mb-1">Quy mô team mong muốn</label>
              <input
                id="tm-max"
                type="number"
                min={2}
                max={6}
                value={maxMembers}
                onChange={(e) => setMaxMembers(Number(e.target.value))}
                className="w-full px-3 py-2 min-h-[44px] rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
              />
            </div>
          </div>

          {/* Row 5: Description / Message */}
          <div>
            <label htmlFor="tm-desc" className="block font-semibold text-slate-800 mb-1">
              Lời nhắn & Mô tả ngắn về định hướng của nhóm
            </label>
            <textarea
              id="tm-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="VD: Nhóm mình đã có ý tưởng sơ bộ và giảng viên cố vấn. Đang tìm một bạn nhiệt tình, cởi mở để cùng ôn luyện và nộp bài trước hạn..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#003B73]"
            />
          </div>

          {/* Row 6: Contact Info */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
            <span className="font-bold text-slate-900 block">Thông tin liên hệ của bạn:</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Email sinh viên (bắt buộc)"
                  aria-label="Email liên hệ sinh viên"
                  className="w-full px-3 py-2 min-h-[44px] rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={contactZalo}
                  onChange={(e) => setContactZalo(e.target.value)}
                  placeholder="Số điện thoại / Zalo"
                  aria-label="Số điện thoại hoặc Zalo"
                  className="w-full px-3 py-2 min-h-[44px] rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                value={contactFacebook}
                onChange={(e) => setContactFacebook(e.target.value)}
                placeholder="Link Facebook cá nhân (nếu có)"
                aria-label="Link Facebook cá nhân"
                className="w-full px-3 py-2 min-h-[44px] rounded-lg border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Submit CTA */}
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
              className="min-h-[44px] flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#003B73] to-[#0B4F9F] hover:opacity-95 shadow-md shadow-blue-900/15 cursor-pointer"
            >
              <Send className="w-4 h-4 text-blue-200" aria-hidden="true" />
              <span>Đăng tin ngay</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

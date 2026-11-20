'use client';

import React, { useState, useCallback } from 'react';
import { 
  Users, 
  UserPlus, 
  MessageCircle, 
  Mail, 
  Check, 
  Copy, 
  X,
  Share2
} from 'lucide-react';
import { TeammatePost } from '@/types';
import { useModal } from '@/utils/useModal';

/** Turns stored contact text into a tappable link, or null when it isn't a usable one. */
function contactHref(kind: 'email' | 'zalo' | 'fb', value: string): string | null {
  if (kind === 'email') return `mailto:${value}`;
  if (kind === 'zalo') {
    const digits = value.replace(/\D/g, '');
    return /^0\d{9}$/.test(digits) ? `https://zalo.me/${digits}` : null;
  }
  return `https://${value.replace(/^https?:\/\//, '')}`;
}

interface TeammateSectionProps {
  teammates: TeammatePost[];
  onOpenPostModal: () => void;
  onCopyText: (text: string, label: string) => void;
}

export const TeammateSection: React.FC<TeammateSectionProps> = ({
  teammates,
  onOpenPostModal,
  onCopyText,
}) => {
  const [selectedPost, setSelectedPost] = useState<TeammatePost | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const closePopup = useCallback(() => setSelectedPost(null), []);
  const panelRef = useModal<HTMLDivElement>(!!selectedPost, closePopup);

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedKey(key);
        onCopyText(text, label);
        setTimeout(() => setCopiedKey(null), 2500);
      })
      .catch(() => {
        onCopyText(text, label);
      });
  };

  return (
    <section id="teammate-finder" className="py-14 bg-gradient-to-b from-slate-50 to-blue-50/40 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/80 text-[#003B73] mb-2.5">
              <Users className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
              <span>Teammate Radar — Ghép đội dự thi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003B73] tracking-tight">
              Không còn nỗi lo đi thi một mình!
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1 leading-relaxed">
              Kết nối chéo sinh viên giữa các Khoa Ngôn ngữ & Sư phạm. Tìm mảnh ghép tài năng về Thuyết trình, Slide Design, Dịch thuật hoặc Xử lý số liệu NCKH.
            </p>
          </div>

          <button
            onClick={onOpenPostModal}
            aria-label="Đăng tin tìm đồng đội mới"
            className="min-h-[44px] flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-[#003B73] hover:bg-[#0B4F9F] shadow-md shadow-blue-900/15 hover:shadow-lg transition-all shrink-0 active:scale-[0.98] cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-blue-200" aria-hidden="true" />
            <span>+ Đăng tin tìm đồng đội</span>
          </button>
        </div>

        {/* Teammate Cards Grid */}
        {teammates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {teammates.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Author Info & Status */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${post.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
                        {post.authorName.split(' ').slice(-1)[0]?.substring(0, 2).toUpperCase() || 'SV'}
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {post.authorName}
                        </h4>
                        <div className="text-xs text-slate-500 font-medium">
                          {post.faculty} • <span className="font-semibold text-blue-700">{post.batch}</span>
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
                      Đang tuyển {post.currentMembers}/{post.maxMembers}
                    </span>
                  </div>

                  {/* Target Competition */}
                  <div className="mb-3 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100/80">
                    <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-0.5">
                      Cuộc thi mục tiêu:
                    </span>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                      {post.targetEventTitle}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    &ldquo;{post.description}&rdquo;
                  </p>

                  {/* Skills Missing Tags */}
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Cần tìm vị trí/kỹ năng:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {post.lookingFor.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200"
                        >
                          ⚡ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Row */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {post.createdAt}
                  </span>

                  <button
                    onClick={() => setSelectedPost(post)}
                    aria-label={`Kết nối với ${post.authorName}`}
                    className="min-h-[40px] flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#003B73] to-[#0B4F9F] hover:opacity-95 shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-blue-200" aria-hidden="true" />
                    <span>Kết nối ngay</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-bold text-slate-800 text-sm">Chưa có tin tìm đồng đội nào</h3>
            <p className="text-xs text-slate-500 mt-1">Hãy là người đầu tiên đăng bài tìm bạn thi!</p>
          </div>
        )}

      </div>

      {/* CONNECT POPUP / CONTACT MODAL */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-connect-author-title"
        >
          <div 
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div ref={panelRef} className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#003B73] to-[#0B4F9F] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full ${selectedPost.avatarColor} border-2 border-white text-white flex items-center justify-center font-bold text-base shadow-sm`}>
                  {selectedPost.authorName.split(' ').slice(-1)[0]?.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 id="modal-connect-author-title" className="text-base font-bold leading-tight">
                    Kết nối với {selectedPost.authorName}
                  </h3>
                  <p className="text-xs text-blue-100 mt-0.5">
                    {selectedPost.faculty} • {selectedPost.batch}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                aria-label="Đóng popup thông tin liên hệ"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-black/20 hover:bg-black/40 text-white cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-700">
              
              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100">
                <span className="text-[11px] font-semibold text-blue-800 uppercase block">
                  Dự thi cùng mục tiêu:
                </span>
                <span className="font-bold text-slate-900 block mt-0.5">
                  {selectedPost.targetEventTitle}
                </span>
              </div>

              <div className="space-y-2.5">
                <span className="font-bold text-slate-900 block">Thông tin liên hệ trực tiếp:</span>

                {/* Email */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 min-h-[48px]">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
                    <a href={contactHref('email', selectedPost.contactEmail)!} className="font-medium text-blue-700 underline break-all">
                      {selectedPost.contactEmail}
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy(selectedPost.contactEmail, 'email', 'Email')}
                    aria-label="Sao chép email"
                    className="min-h-[36px] flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 p-1.5 rounded cursor-pointer"
                  >
                    {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span>{copiedKey === 'email' ? 'Đã chép' : 'Sao chép'}</span>
                  </button>
                </div>

                {/* Zalo */}
                {selectedPost.contactZalo && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 min-h-[48px]">
                    <div className="flex items-center gap-2.5">
                      <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                      {contactHref('zalo', selectedPost.contactZalo) ? (
                        <a href={contactHref('zalo', selectedPost.contactZalo)!} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline">
                          Zalo: {selectedPost.contactZalo}
                        </a>
                      ) : (
                        <span className="font-medium text-slate-800">Zalo/SĐT: {selectedPost.contactZalo}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleCopy(selectedPost.contactZalo!, 'zalo', 'Zalo/SĐT')}
                      aria-label="Sao chép số điện thoại hoặc Zalo"
                      className="min-h-[36px] flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 p-1.5 rounded cursor-pointer"
                    >
                      {copiedKey === 'zalo' ? <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                      <span>{copiedKey === 'zalo' ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                )}

                {/* Facebook */}
                {selectedPost.contactFacebook && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 min-h-[48px]">
                    <div className="flex items-center gap-2.5">
                      <Share2 className="w-4 h-4 text-indigo-600 shrink-0" aria-hidden="true" />
                      <a href={contactHref('fb', selectedPost.contactFacebook)!} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline truncate max-w-[200px]">
                        {selectedPost.contactFacebook}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopy(selectedPost.contactFacebook!, 'fb', 'Facebook')}
                      aria-label="Sao chép link Facebook"
                      className="min-h-[36px] flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 p-1.5 rounded cursor-pointer"
                    >
                      {copiedKey === 'fb' ? <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                      <span>{copiedKey === 'fb' ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Ready-to-send Intro Template */}
              <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-amber-900 uppercase">
                    Mẫu tin nhắn làm quen gợi ý:
                  </span>
                  <button
                    onClick={() => {
                      const msg = `Chào bạn ${selectedPost.authorName}, mình là sinh viên ULIS. Mình thấy bài tìm đồng đội của bạn cho cuộc thi "${selectedPost.targetEventTitle}" trên ULIS Radar. Mình rất muốn cùng tham gia và trao đổi thêm với nhóm nhé!`;
                      handleCopy(msg, 'intro-msg', 'Tin nhắn mẫu');
                    }}
                    className="min-h-[36px] text-[11px] font-bold text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'intro-msg' ? '✓ Đã chép' : 'Chép mẫu tin nhắn'}
                  </button>
                </div>
                <p className="text-xs text-amber-950 italic leading-relaxed">
                  &ldquo;Chào bạn {selectedPost.authorName}, mình là sinh viên ULIS. Mình thấy bài tìm đồng đội của bạn cho cuộc thi &quot;{selectedPost.targetEventTitle}&quot; trên ULIS Radar...&rdquo;
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#003B73] text-white hover:bg-[#0B4F9F] transition-all cursor-pointer"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

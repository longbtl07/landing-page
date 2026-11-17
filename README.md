# 📡 ULIS Events & Competitions Radar

> **Hệ thống tổng hợp và theo dõi sự kiện, cuộc thi học thuật, workshop & hoạt động ngoại khóa dành cho sinh viên Trường Đại học Ngoại ngữ - Đại học Quốc gia Hà Nội (ULIS - VNU).**

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 Bối cảnh & Vấn đề giải quyết

Trong môi trường đại học, sinh viên ULIS có vô vàn cơ hội tham gia các sự kiện, cuộc thi, hội thảo và hoạt động ngoại khóa nhằm phát triển năng lực chuyên môn, ngoại ngữ và kỹ năng mềm. Tuy nhiên, thông tin hiện bị phân tán trên hơn 30 Fanpage của các Câu lạc bộ, Liên chi Đoàn các Khoa và Đoàn - Hội.

Theo **khảo sát thực tế trên 108 sinh viên ULIS**:
- **84.3% sinh viên từng bỏ lỡ sự kiện / cuộc thi** do cập nhật muộn hoặc bài đăng bị trôi trên mạng xã hội.
- Sinh viên gặp khó khăn khi tìm đồng đội có kỹ năng bù trừ (Design, Speaking, NCKH, Video) khi tham gia các cuộc thi học thuật.
- Khó theo dõi hạn chót đăng ký và minh bạch quyền lợi (Điểm rèn luyện, Certificate, Học bổng).

**ULIS Radar** ra đời như một trạm tập trung dữ liệu 100% cơ hội, trang bị tính năng nhắc nhở hạn chót, sàn ghép đội dự thi và kênh tiếp nhận sự kiện hai chiều.

---

## ✨ Tính năng nổi bật (Interactive MVP)

1. **Bảng tin Radar thời gian thực (Live Feed):**
   - Tổng hợp các hoạt động từ Đoàn Thanh niên, Hội Sinh viên, các Khoa chuyên ngữ (SPTA, Pháp, Đức, Nhật, Hàn, Trung, Nga...) và các CLB trực thuộc (UDC, EC, UPC, STENT...).
   - Đánh dấu **Hạn chót khẩn cấp (Urgent Deadlines $\le 3$ ngày)** với badge đếm ngược trực quan.
   - Hiển thị minh bạch quyền lợi: Cộng điểm rèn luyện (ĐRL), cấp Certificate, cơ hội thực tập và học bổng.

2. **Bộ lọc đa chiều & Tìm kiếm thông minh (Smart Search & Filters):**
   - Tìm kiếm không phân biệt dấu tiếng Việt (`normalizeVietnamese` NFD).
   - Lọc nhanh theo mục tiêu: *Dành cho SV năm nhất (K58)*, *Tích lũy Điểm rèn luyện*, *Săn Certificate làm CV*, *Giao lưu Văn hóa*, *Săn Giải thưởng lớn*.
   - Lọc theo Loại hình & Quyền lợi, sắp xếp theo thời hạn đóng đơn hoặc độ phổ biến.

3. **Lịch đã lưu & Nhắc nhở Deadline 24h (Saved Events Drawer):**
   - Lưu sự kiện vào danh sách cá nhân chỉ với 1 chạm.
   - Công tắc kích hoạt nhắc nhở tự động trước hạn đóng đơn 24h.
   - **Xuất file lịch cá nhân (`.ics`):** Tải về và đồng bộ trực tiếp vào Google Calendar, Apple Calendar hoặc Outlook.

4. **Sàn ghép đội dự thi (Teammate Radar):**
   - Nơi kết nối chéo sinh viên giữa các khoa để thành lập đội dự thi NCKH, Tranh biện, Dịch thuật.
   - Đăng tin tuyển thành viên với các yêu cầu kỹ năng cụ thể.
   - Popup kết nối trực tiếp (Zalo, Email, Facebook) kèm mẫu tin nhắn làm quen sao chép nhanh.

5. **Kênh tiếp nhận sự kiện hai chiều (Submit Event Modal):**
   - Dành riêng cho Ban tổ chức, Liên chi Đoàn và các CLB gửi thông tin hoạt động mới.
   - Tự động kiểm duyệt và hiển thị trực tiếp lên đầu bảng tin Radar.

6. **Đánh giá & Review mùa trước (Past Season Insights):**
   - Điểm đánh giá trung bình từ sinh viên các khóa trước (K55, K56, K57) giúp tăng độ tin cậy.

---

## 🛠️ Công nghệ sử dụng

- **Framework:** Next.js 16 (App Router) với React 19
- **Ngôn ngữ:** TypeScript (Strict type safety, 0 any)
- **Styling:** Tailwind CSS v4 (@theme tokens, responsive mobile-first)
- **Icons:** Lucide Icons
- **Font chữ:** `Be Vietnam Pro` (Google Fonts) tối ưu hiển thị tiếng Việt học thuật
- **Bundler:** Turbopack

---

## 🚀 Hướng dẫn cài đặt & Chạy cục bộ

```bash
# 1. Clone repository
git clone https://github.com/longbtl07/landing-page.git
cd landing-page

# 2. Cài đặt dependencies
npm install

# 3. Chạy môi trường development
npm run dev

# 4. Mở trình duyệt và truy cập
http://localhost:3000
```

---

## 🏛️ Đơn vị thực hiện

- **Đơn vị thực hiện:** Nhóm CNTT&TT 73 — Lớp FLF-1007
- **Đơn vị đào tạo:** Trường Đại học Ngoại ngữ, Đại học Quốc gia Hà Nội
- **Địa chỉ:** Số 2, Phạm Văn Đồng, Cầu Giấy, Hà Nội
- **Đầu mối liên hệ & Hợp tác truyền thông:**
  - **Nguyễn Hải Long (Trưởng nhóm)**
  - Email: [nguyenhailong050807@gmail.com](mailto:nguyenhailong050807@gmail.com)
  - Số điện thoại / Zalo: `0822551976`

---

*© 2026 ULIS Events & Competitions Radar. Bắt trọn cơ hội — Nâng tầm tri thức — Kiến tạo tương lai sinh viên Ngoại ngữ.*

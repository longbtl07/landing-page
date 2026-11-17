import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-be-vietnam-pro',
});

export const metadata: Metadata = {
  title: 'ULIS Events & Competitions Radar | Trạm Radar Sự kiện & Cuộc thi Ngoại ngữ',
  description: 'Hệ thống tổng hợp, phân loại và nhắc deadline sự kiện, cuộc thi, workshop học thuật dành cho sinh viên Trường Đại học Ngoại ngữ - Đại học Quốc gia Hà Nội.',
  keywords: [
    'ULIS',
    'Trường Đại học Ngoại ngữ',
    'ĐHQGHN',
    'Sự kiện ULIS',
    'Cuộc thi sinh viên',
    'Điểm rèn luyện',
    'Học bổng',
    'CLB ULIS',
    'Ghép đội dự thi'
  ],
  authors: [{ name: 'Nhóm CNTT&TT 73 — ULIS' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} scroll-smooth`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900 flex flex-col">
        {children}
      </body>
    </html>
  );
}

import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  X,
  CheckCircle2,
  Bus as BusIcon,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
  Users,
  Smartphone,
  Route,
  Zap,
  TrendingDown,
  AlertTriangle,
  Award,
  ChevronDown,
  FileDown,
} from 'lucide-react';
import reportAppPreviewImg from '../assets/images/report_bus_app_preview_1791188441570.jpg';
import reportRouteOptImg from '../assets/images/report_route_optimization_1791188454801.jpg';
import reportNotificationImg from '../assets/images/report_parent_notification_1791188466726.jpg';
import reportFleetArchImg from '../assets/images/report_fleet_management_architecture_1791189056593.jpg';

interface SystemReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemReportModal: React.FC<SystemReportModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  // Generate downloadable standalone HTML / Word-compatible Document
  const handleDownloadHtmlDoc = () => {
    const reportHtmlContent = `<!DOCTYPE html>
<html lang="ku" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>ڕاپۆرتی سیستەمی زیرەکی پاسی قوتابخانە - هێدی ئاغا و ئیبراهیم ئەحمەد</title>
  <style>
    body {
      font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      direction: rtl;
      text-align: right;
      line-height: 1.8;
      color: #1e293b;
      background: #f8fafc;
      padding: 30px;
      margin: 0;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .header-box {
      background: #fef3c7;
      border: 1px solid #fde68a;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 30px;
      text-align: center;
    }
    h1 {
      color: #0f172a;
      font-size: 26px;
      margin-top: 0;
      margin-bottom: 8px;
    }
    .authors-box {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #fcd34d;
      font-size: 15px;
      font-weight: bold;
      color: #78350f;
    }
    .section-title {
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
      border-right: 4px solid #f59e0b;
      padding-right: 12px;
      margin-top: 32px;
      margin-bottom: 12px;
    }
    p {
      font-size: 14px;
      color: #334155;
      text-align: justify;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 16px 0;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 16px;
      border-radius: 10px;
    }
    .card strong {
      display: block;
      color: #0f172a;
      margin-bottom: 6px;
      font-size: 14px;
    }
    .table-custom {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 13px;
    }
    .table-custom th, .table-custom td {
      border: 1px solid #cbd5e1;
      padding: 10px 12px;
      text-align: right;
    }
    .table-custom th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: bold;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-box">
      <h1>سیستەمی زیرەکی چاودێری و ڕێکخستنی پاسی قوتابخانە (ڕێگای پارێزراو)</h1>
      <p style="margin: 0; color: #92400e; font-weight: 600;">ڕاپۆرتی تەکنیکی گشتگیر و زانستی دەربارەی پێکهاتە، شێوازی کارکردن، سوودەکان و دەرئەنجامەکان</p>
      <div class="authors-box">
        <span>ئامادەکردنی پرۆژە: هێدی ئاغا</span>
        <span>•</span>
        <span>هاوکار / بەشداربوو: ئیبراهیم ئەحمەد</span>
      </div>
    </div>

    <div class="section-title">١. پێشەکی و کێشە چارەسەرکراوەکان (Problem Statement)</div>
    <p>
      گواستنەوەی خوێندکاران یەکێکە لە گرنگترین و هەستیارترین بەشەکانی کەرتی پەروەردە. لە شێوازی دێرینەی هاتوچۆدا، سێ کێشەی سەرەکی و مەترسیدار بوونیان هەبوو:
      یەکەم: چاوەڕوانی زۆری منداڵان لەبەردەم ماڵ لە وەرزی سەرما، بەفر، باران یان گەرمای تونددا.
      دووەم: دڵەڕاوکێی بەردەوامی دایک و باوکان لە کاتی دواکەوتنی پاس بەهۆی نەبوونی هیچ زانیارییەکی ڕاستەوخۆ (Real-time).
      سێیەم: بەفیڕۆچوونی کات و سووتەمەنییەکی یەکجار زۆر لەلایەن شۆفێرانەوە بەهۆی نەبوونی ڕێڕەوی ڕێکخراوی زانستی و ڕۆیشتن بۆ ماڵی ئەو قوتابیانەی کە ئەو ڕۆژە نەخۆشن و نایەن بۆ قوتابخانە.
      سیستەمی "ڕێگای پارێزراو" بە شێوازێکی ژیرانە سەرجەم ئەم ئاستەنگانەی چارەسەر کردووە.
    </p>

    <div class="section-title">٢. پێکهاتە و مۆدیۆلە سەرەکییەکانی سیستەمەکە</div>
    <div class="grid">
      <div class="card">
        <strong>١. دەروازەی دایک و باوکان (Parent Portal)</strong>
        چاودێریکردنی شوێنی پاس لەسەر نەخشەی زیندوو، وەرگرتنی زەنگی ئاگاداری ١ خولەک پێش گەیشتن، هەژمارکردنی کاتی گەیشتن بە خولەک (ETA)، ئاگادارکردنەوە لە نەهاتنی منداڵ بەهۆی نەخۆشی، و گۆڕینی ناونیشانی کاتی.
      </div>
      <div class="card">
        <strong>٢. داشبۆردی شۆفێری پاس (Driver Console)</strong>
        پیشاندانی ڕێڕەوی ڕێکخراو بەپێی کورتترین خاڵ، لیستی وێستگەکان بە پلەبەندی زانستی، تۆمارکردنی کاتی سواربوونی قوتابی بە یەک کرتە، و ناردنی ئاگاداری دواکەوتن بەهۆی قەرەباڵغی.
      </div>
      <div class="card">
        <strong>٣. ژووری کۆنتڕۆڵی قوتابخانە (School Dispatch Center)</strong>
        چاودێریکردنی هاوکاتی سەرجەم پاسەکان لەسەر یەک نەخشە، بەستنەوەی خێزان و قوتابی نوێ بە هێڵەکان، و پەخشی ئاگاداری لەناکاو (Critical Emergency Broadcasts).
      </div>
      <div class="card">
        <strong>٤. ئەلگۆریتمی ڕێکخستنی ڕێگا (TSP Optimization)</strong>
        پێوانەکردنی مەودای نێوان ماڵی قوتابییەکان و قوتابخانە بۆ کەمکردنەوەی سووتەمەنی تا ڕادەی ٣٥٪ و ڕێگریکردن لە دووبارە ڕۆیشتنەوە بە هەمان شەقامدا.
      </div>
    </div>

    <div class="section-title">٣. سیستەمەکە چۆن کاردەکات؟ (هەنگاو بە هەنگاو)</div>
    <p>
      ١. لە بەیانیاندا کاتێک شۆفێرەکە لەسەر داشبۆردەکەی دوگمەی "دەستپێکردنی دەوام" دادەگرێت، سیستەمەکە ڕاستەوخۆ پەخشی GPS دەستپێدەکات.<br>
      ٢. سیستەمەکە بە ئەلگۆریتمی TSP کورتترین ڕێگای وێستگەکان دیاری دەکات، و وێستگەی ئەو قوتابیانە دەسڕێتەوە کە باوانیان پێشوەختە نەهاتنیان تۆمارکردووە.<br>
      ٣. لەگەڵ نزیکبوونەوەی پاسەکە بۆ دووری ١ خولەک لە ماڵی هەر قوتابییەک، بازنەی جوگرافی (Geofence) دەستبەجێ زەنگی ئاگاداری بۆ باوان لێدەدات.<br>
      ٤. کاتێک منداڵەکە سواری پاس دەبێت، شۆفێر کرتە لە "سەرکەوت" دەکات و باوان لە هەمان چرکەدا ئاگاداری گەیشتن و سواربوون لە ئەپەکەدا دەبینن.<br>
      ٥. لە کۆتایی گەشتەکەدا، کاتێک پاس دەگاتە قوتابخانە دۆخی هەموو قوتابییەکان بۆ "گەیشتە قوتابخانە" دەگۆڕێت.
    </p>

    <div class="section-title">٤. بەراوردی نێوان شێوازی کۆن و سیستەمی نوێ</div>
    <table class="table-custom">
      <thead>
        <tr>
          <th>خاڵی بەراورد</th>
          <th>سیستەمی تەقلیدی کۆن</th>
          <th>سیستەمی زیرەکی "ڕێگای پارێزراو"</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>کاتی چاوەڕوانی منداڵ</td>
          <td>١٠ بۆ ٢٥ خولەک لەسەر شەقام</td>
          <td>کەمتر لە ١ خولەک لەبەردەم ماڵ</td>
        </tr>
        <tr>
          <td>مەسرەفی سووتەمەنی</td>
          <td>بەرز بەهۆی ڕێگای ناڕێکخراو</td>
          <td>پاشەکەوتکردنی تا ٣٥٪ بەنزین</td>
        </tr>
        <tr>
          <td>ئاگاداری دایک و باوک</td>
          <td>نادیار و پڕ لە دڵەڕاوکێ</td>
          <td>چاودێری ڕاستەوخۆی GPS لەگەڵ ETA</td>
        </tr>
        <tr>
          <td>نەهاتنی قوتابی</td>
          <td>ڕۆیشتنی پاس بۆ بەردەم ماڵ بەبێ سوود</td>
          <td>پەڕاندنی خۆکارانەی وێستگەکە</td>
        </tr>
        <tr>
          <td>ڕووداوی لەناکاو یان دواکەوتن</td>
          <td>پەیوەندی تەلەفۆنی تاک بە تاک</td>
          <td>پەخشی بەپەلەی ناوەندی لە چرکەیەکدا</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">٥. دەرئەنجام و سوودە چەسپاوەکان</div>
    <p>
      ئەم پڕۆژەیە بە سەرکەوتوویی سەلامەتی و ئاسوودەیی دابین دەکات، تێچووی ئۆتۆمبێلەکان کەم دەکاتەوە، و هاوکاری پاکڕاگرتنی ژینگە دەکات لە ڕێگەی کەمکردنەوەی دووکەڵ و گازی زیانبەخش (CO2). ئەمەش نیشانەی دەستکەوتێکی تەکنەلۆژی سەردەمیانەیە بۆ قوتابخانە پێشکەوتووەکان.
    </p>

    <div class="footer">
      ئامادەکراوە لەلایەن: هێدی ئاغا و ئیبراهیم ئەحمەد · سیستەمی ڕێگای پارێزراو · ٢٠٢٦
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([reportHtmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Raporti-Systemi-Pasi-Qutabxana-Hedi-w-Ibrahim.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('ڕاپۆرتەکە بە فۆرماتی HTML/Word بە سەرکەوتوویی دابەزی!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  // Generate downloadable pure Text / Markdown format
  const handleDownloadTextDoc = () => {
    const reportText = `================================================================================
ڕاپۆرتی گشتگیری سیستەمی زیرەکی چاودێری و ڕێکخستنی پاسی قوتابخانە (ڕێگای پارێزراو)
================================================================================

ئامادەکردنی پرۆژە و ڕاپۆرت:
١. هێدی ئاغا
٢. ئیبراهیم ئەحمەد

بەروار: ٢٠٢٦
پوختەی سیستەم: چاودێری ڕاستەوخۆ، کورتکردنەوەی ڕێگا، و ئاگاداری ١ خولەک پێش گەیشتن

--------------------------------------------------------------------------------
١. پێشەکی و کێشە چارەسەرکراوەکان (Problem Statement)
--------------------------------------------------------------------------------
گواستنەوەی خوێندکاران یەکێکە لە گرنگترین و هەستیارترین بەشەکانی کەرتی پەروەردە. لە شێوازی دێرینەی هاتوچۆدا، سێ کێشەی سەرەکی بوونیان هەبوو:
١. چاوەڕوانی زۆری منداڵان لەبەردەم ماڵ لە وەرزی سەرما، بەفر، باران یان گەرمادا.
٢. دڵەڕاوکێی بەردەوامی باوان لە کاتی دواکەوتنی پاس بەهۆی نەبوونی زانیاری ڕاستەوخۆ.
٣. بەفیڕۆچوونی سووتەمەنی و کات بەهۆی ڕێگای ناڕێکخراو و ڕۆیشتن بۆ ماڵی قوتابیانی نەخۆش.
سیستەمی "ڕێگای پارێزراو" سەرجەم ئەم ئاستەنگانەی چارەسەر کردووە.

--------------------------------------------------------------------------------
٢. پێکهاتە سەرەکییەکانی سیستەمەکە
--------------------------------------------------------------------------------
- دەروازەی باوان (Parent Portal): چاودێری ڕاستەوخۆی پاس لەسەر نەخشە، زەنگی ئاگاداری ١ خولەک، کاتی گەیشتن (ETA)، و پەیوەندی بەڕێوەبەرایەتی.
- کۆنسۆڵی شۆفێر (Driver Console): ڕێڕەوی ڕێکخراو، لیستی وێستگەکان، تۆمارکردنی سەرکەوتن یان نەهاتن، و دوگمەی دەستپێکردنی دەوام.
- ژووری کۆنتڕۆڵی قوتابخانە (School Dispatch Hub): چاودێریکردنی هەموو پاسەکان لەسەر یەک نەخشە، بەڕێوەبردنی خێزانەکان، و پەخشی بەپەلە.
- ئەلگۆریتمی TSP (Route Optimization): کورتکردنەوەی ڕێگا و پاشەکەوتی سووتەمەنی تا ٣٥٪.

--------------------------------------------------------------------------------
٣. شێوازی کارکردنی سیستەمەکە (هەنگاو بە هەنگاو)
--------------------------------------------------------------------------------
١. شۆفێر لەسەر داشبۆردەکەی دەست بە دەوام دەکات، و ڕاستەوخۆ پەخشی GPS چالاک دەبێت.
٢. ئەلگۆریتمی TSP کورتترین ڕێگای خاڵەکان هەڵدەبژێرێت و وێستگەی قوتابیانی نەهاتوو لادەبات.
٣. لە دووری ١ خولەک لە ماڵی قوتابی، سیستەم زەنگی ئاگاداری بۆ مۆبایلی باوان دەنێرێت.
٤. لەگەڵ سەرکەوتنی منداڵ، شۆفێر کرتە لە "سەرکەوت" دەکات و دۆخی قوتابی لە چرکەیەکدا نوێ دەبێتەوە.
٥. لە کاتی گەیشتن بە قوتابخانە، تەواوی قوتابییەکان وەک گەیشتوو تۆمار دەبن.

--------------------------------------------------------------------------------
٤. بەراوردی خاڵ بە خاڵ
--------------------------------------------------------------------------------
* کاتی چاوەڕوانی: لە ١٥ خولەکەوە کەمکرایەوە بۆ کەمتر لە ١ خولەک.
* سووتەمەنی: پاشەکەوتی تا ٣٥٪ لە خەرجی بەنزین و کەمکردنەوەی دووکەڵ.
* پەیوەندی: نەهێشتنی پەیوەندی تەلەفۆنی ناپێویست و بەکارهێنانی ئاگاداری خۆکار.
* ڕووداوی لەناکاو: ناردنی پەیامی بەپەلەی هاوکات بۆ سەرجەم خێزانەکان.

--------------------------------------------------------------------------------
دەرئەنجام:
سیستەمی "ڕێگای پارێزراو" پرۆژەیەکی پێشکەوتووی هاوچەرخە بۆ بەرزکردنەوەی سەلامەتی، ئاسوودەیی دایک و باوکان، و پاراستنی ژینگە و سامانی نیشتمانی.

ئامادەکراوە لەلایەن: هێدی ئاغا و ئیبراهیم ئەحمەد
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Raporti-Systemi-Pasi-Qutabxana.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('ڕاپۆرتەکە بە فۆرماتی دەقی تەواو (TXT) دابەزی!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div
      id="system-report-modal"
      dir="rtl"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 flex items-center justify-center font-sans text-right print:p-0 print:bg-white print:static"
    >
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto flex flex-col print:max-h-none print:shadow-none print:border-none print:w-full">
        {/* Modal Top Bar (Hidden during printing) */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 bg-white/95 backdrop-blur-xs z-20 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">ڕاپۆرتی تێروتەسەلی سیستەم</h2>
              <p className="text-xs text-slate-500">هەموو زانیارییەکان، وێنەکان، و شێوازی داگرتن</p>
            </div>
          </div>

          {/* Action Download & Print Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownloadHtmlDoc}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="داگرتنی دۆکیومێنت بە تەواوی دیزاین و فۆرماتەوە"
            >
              <Download className="w-4 h-4" />
              <span>داگرتنی فایل (HTML / Word)</span>
            </button>

            <button
              onClick={handleDownloadTextDoc}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
              title="داگرتنی دەقی تەواوی ڕاپۆرت وەک دەقی ڕوون"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>دەق (TXT)</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="چاپکردن یان پاشەکەوتکردن وەک PDF"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>چاپکردن / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Download Success Callout Banner */}
        {downloadSuccess && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">{downloadSuccess}</span>
          </div>
        )}

        {/* Printable Report Document Body */}
        <div className="p-6 sm:p-10 space-y-8 text-slate-800 leading-relaxed print:p-0 print:space-y-6">
          {/* Header Card / Title Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 print:border-slate-300 print:bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-200/80 inline-block mb-2">
                  ڕاپۆرتی زانستی، تەکنیکی و مەیدانی
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  سیستەمی زیرەکی چاودێری و ڕێکخستنی پاسی قوتابخانە
                </h1>
                <p className="text-sm text-slate-600 font-medium mt-1">
                  پڕۆژەی چاودێریکردنی ڕاستەوخۆ (Real-Time GPS)، کورتکردنەوەی ڕێگا (TSP)، و زەنگی ئاگاداری ١ خولەک پێش گەیشتن
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md flex-shrink-0 self-start sm:self-center">
                <BusIcon className="w-8 h-8" />
              </div>
            </div>

            {/* AUTHORS / TEAM MEMBERS ON TOP (Explicitly requested by user) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                  هـ
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block">ئامادەکردنی پرۆژە:</span>
                  <strong className="text-sm font-extrabold text-slate-900">هێدی ئاغا</strong>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                  ئـ
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block">بەشداربوو / هاوکار:</span>
                  <strong className="text-sm font-extrabold text-slate-900">ئیبراهیم ئەحمەد</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: System Overview & Problem Solved */}
          <section className="space-y-3">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-r-4 border-amber-500 pr-3">
              <span>١. پێشەکی و کێشە چارەسەرکراوەکان (Problem Statement)</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed text-justify">
              گواستنەوەی خوێندکاران یەکێکە لە گرنگترین پایەکانی ڕێکخستنی ساڵانەی پەروەردە. لە شێوازی باو و دێرینی هاتوچۆی پاسەکاندا، سێ گرفتی قورس و بەردەوام ڕووبەڕووی خێزانەکان، شۆفێران و قوتابخانەکان دەبوونەوە:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>١. چاوەڕوانی مەترسیدار</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  وەستانی درێژخایەنی منداڵان لەسەر شەقام لە کەشوهەوای ناخۆش (سەرمای زستان، بەفر، باران یان گەرمای توند) کە دەبووە هۆی نەخۆشکەوتن و مەترسی هاتوچۆ.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-amber-800">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>٢. دڵەڕاوکێ و بێئاگایی</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  نەبوونی هیچ چاودێرییەکی زیندوو بۆ ئەوەی دایک و باوک بزانن پاسەکە لە کوێیە، ئایا کەوتۆتە قەرەباڵغی یان نا، و تەلەفۆنکردنی بەردەوام کە شۆفێری سەرگەردان دەکرد.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-indigo-800">
                  <TrendingDown className="w-4 h-4 text-indigo-600" />
                  <span>٣. بەفیڕۆچوونی سووتەمەنی</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  ڕۆیشتنی پاسەکان بە ڕێگای ناڕێکخراو و چوونە بەردەم ماڵی ئەو قوتابیانەی کە ئەو ڕۆژە نایەن، کە دەبووە هۆی بەفیڕۆچوونی سەدان لیتر بەنزین و کاتی گرنگ.
                </p>
              </div>
            </div>
          </section>

          {/* Section Image 1: App Preview */}
          <div className="my-4 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <img
              src={reportAppPreviewImg}
              alt="ڕووبەری ئەپڵیکەیشنی ڕێگای پارێزراو"
              className="w-full h-auto max-h-[360px] object-cover"
            />
            <div className="p-2.5 bg-slate-900 text-white text-xs text-center font-medium">
              وێنەی ١: نەخشەی ڕاستەوخۆ و ڕووبەری سەرەکی ئەپڵیکەیشنی چاودێری پاس
            </div>
          </div>

          {/* Section 2: Four Core Architectural Modules */}
          <section className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-r-4 border-amber-500 pr-3">
              <span>٢. تەلارسازی و پایە سەرەکییەکانی سیستەمەکە</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-black">
                    ١
                  </div>
                  <span>دەروازەی باوان (Parent Portal)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  - نەخشەی زیندوو کە تەنها منداڵانی خۆیان پیشان دەدات بۆ پاراستنی نهێنی خێزانەکانی تر.<br />
                  - هەژمارکردنی کاتی گەیشتنی ڕاستەقینە (ETA) بە چرکە و خولەک.<br />
                  - زەنگی هۆشیارکەرەوەی دەنگدار (Chime Alert) ڕێک ١ خولەک پێش گەیشتنی پاس.<br />
                  - دوگمەی "٢ خولەک چاوەڕوانی" و تۆمارکردنی نەهاتنی منداڵ بەبێ پەیوەندی تەلەفۆنی.<br />
                  - گۆڕینی ناونیشانی کاتی لە کاتی سەردانی ماڵی خزم یان داپیرە.
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-black">
                    ٢
                  </div>
                  <span>کۆنسۆڵی شۆفێری پاس (Driver Console)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  - کورتترین ڕێڕەوی ڕێکخراوی هەنگاو بە هەنگاو (Turn-by-turn Navigation).<br />
                  - دوگمەی گەورەی دەستپێکردن و تەواوکردنی دەوام بە بەستنەوەی GPSی مۆبایل.<br />
                  - دوگمەی یەک-کرتەیی بۆ تۆمارکردنی "سواربوو" یان "نەهاتوو".<br />
                  - ڕێکخستنی سەرلەنوێی ڕێگاکە و پەڕاندنی خۆکارانەی وێستگەی نەهاتووەکان.<br />
                  - دوگمەی ڕاگەیاندنی دواکەوتن و دوگمەی فریاگوزاری بەپەلە (SOS).
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center font-black">
                    ٣
                  </div>
                  <span>ژووری بەڕێوەبەرایەتی قوتابخانە (School Dispatch)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  - کۆنتڕۆڵی تەواوی بەلەمی پاسەکان (Fleet Management) لەسەر یەک نەخشەی پانۆراما.<br />
                  - زێدەکردنی پاسی نوێ، شۆفێری نوێ، خێزان و قوتابی نوێ بە یەک کلیک.<br />
                  - گۆڕینی پاسی قوتابی لە نێوان پاسەکاندا بە شێوەی خۆکار.<br />
                  - ناردنی پەخشی بەپەلەی ناوەندی (Critical Broadcast) بۆ هەموو خێزانەکان یان پاسێکی دیاریکراو.<br />
                  - تۆماری گەشتە کۆنەکان و لێکۆڵینەوە لە کاتی گەیشتن و بەنزینی بەکارهاتوو.
                </p>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-900 flex items-center justify-center font-black">
                    ٤
                  </div>
                  <span>ئەلگۆریتمی ڕێکخستنی ڕێگا (TSP Engine)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  - بەکارهێنانی ئەلگۆریتمی گەشتی فرۆشیار (Traveling Salesperson Problem).<br />
                  - هەژمارکردنی مەودای ڕاستەقینەی سەر شەقام و دیاریکردنی باشترین هاوکێشەی سووتەمەنی.<br />
                  - کەمکردنەوەی مەودای سووڕانەوە و ڕێگریکردن لە دووبارە بوونەوەی شەقامەکان.<br />
                  - نیشاندانی ڕێگای بەراوردکاری (ڕێگای کۆنی ناڕێکخراو بەرامبەر ڕێگای زیرەکی نوێ).
                </p>
              </div>
            </div>
          </section>

          {/* Section Image 2: Route Optimization & Fuel Diagram */}
          <div className="my-4 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <img
              src={reportRouteOptImg}
              alt="دیاریکردنی کورتترین ڕێگا و پاشەکەوتی سووتەمەنی"
              className="w-full h-auto max-h-[360px] object-cover"
            />
            <div className="p-2.5 bg-slate-900 text-white text-xs text-center font-medium">
              وێنەی ٢: نەخشەی ڕێکخستنی زیرەکی کورتترین ڕێگا و کەمکردنەوەی تێچووی سووتەمەنی تا ٣٥٪
            </div>
          </div>

          {/* Section 3: How it Works Step-by-Step */}
          <section className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-r-4 border-amber-500 pr-3">
              <span>٣. سیستەمەکە چۆن کاردەکات؟ (قۆناغەکانی گەشت لە بەیانی تا ئێوارە)</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0">
                  ١
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">دەستپێکردنی دەوام و دروستکردنی ڕێڕەو</h4>
                  <p className="mt-0.5 leading-relaxed">
                    شۆفێرەکە کاتژمێر ٧:١٥ بەیانی دوگمەی "دەستپێکردنی کار" دادەگرێت. سیستەمەکە دەستبەجێ بەستەرێکی تەلەمەتری GPS دروستدەکات. ئەو منداڵانەی کە باوانیان تۆماری نەهاتنیان کردووە، ڕاستەوخۆ لە نەخشەکە پەڕێندرێن و کورتترین ڕێڕەو دادەڕێژرێت.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0">
                  ٢
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">بەدواداچوونی ڕاستەوخۆ و هەژمارکردنی خێرایی</h4>
                  <p className="mt-0.5 leading-relaxed">
                    پاسەکە کاتێک بە شەقامەکاندا دەڕوات، خێراییەکەی (کم/ک)، ئاڕاستەکەی (Heading)، و کاتی چاوەڕوانکراوی گەیشتنی هەر وێستگەیەک (ETA) لەسەر مۆبایلی باوان دەنوێندرێتەوە بەبێ پێویستی نوێکردنەوەی دەستی (Refresh).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0">
                  ٣
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">زەنگی ئاگاداری ١ خولەک پێش گەیشتن (Geofence Trigger)</h4>
                  <p className="mt-0.5 leading-relaxed">
                    کاتێک پاسەکە دەگاتە بازنەی مەودایی دیاریکراوی ماڵی هەر قوتابییەک، زەنگێکی هۆشیارکەرەوەی ئۆتۆماتیکی لەسەر مۆبایلی سەرپەرشتیار دەنگ دەدات. دایک و باوک دڵنیا دەبنەوە لەوەی منداڵەکەیان دەرگای ماڵ بکاتەوە و ڕێک لەگەڵ وەستانی پاسەکە سوار بێت بەبێ هیچ چاوەڕوانییەک.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0">
                  ٤
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">تەواوکردنی وێستگەکان و گەیشتن بە قوتابخانە</h4>
                  <p className="mt-0.5 leading-relaxed">
                    شۆفێرەکە بە پەنجەننانێک دۆخی هەر قوتابییەک بۆ "سواربوو" دەگۆڕێت و کاتی سواربوونی ورد تۆمار دەکرێت. دوای هەڵگرتنی دوایین قوتابی، پاس ڕاستەوخۆ بەرەو قوتابخانە بەڕێ دەکەوێت و بەڕێوەبەرایەتی دەزانێت کە هەموو منداڵەکان بە سەلامەتی گەیشتنە حەوشەی قوتابخانە.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section Image 3: Parent 1-Min Notification */}
          <div className="my-4 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <img
              src={reportNotificationImg}
              alt="ئاگاداری ١ خولەک پێش گەیشتن"
              className="w-full h-auto max-h-[360px] object-cover"
            />
            <div className="p-2.5 bg-slate-900 text-white text-xs text-center font-medium">
              وێنەی ٣: زەنگی ئاگاداری ١ خولەک پێش گەیشتنی پاس لەسەر مۆبایلی سەرپەرشتیار
            </div>
          </div>

          {/* Section 4: Detailed Comparison Matrix */}
          <section className="space-y-3">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-r-4 border-amber-500 pr-3">
              <span>٤. بەراوردی زانستی نێوان سیستەمی کۆن و سیستەمی ڕێگای پارێزراو</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                    <th className="py-2.5 px-3">تایبەتمەندی</th>
                    <th className="py-2.5 px-3">شێوازی تەقلیدی کۆن</th>
                    <th className="py-2.5 px-3 bg-amber-50 text-amber-950">سیستەمی نوێ (ڕێگای پارێزراو)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">کاتی وەستانی منداڵ لە دەرەوە</td>
                    <td className="py-2.5 px-3 text-slate-600">١٠ بۆ ٢٥ خولەک لە کەشوهەوای سەرما یان گەرما</td>
                    <td className="py-2.5 px-3 bg-amber-50/50 font-bold text-emerald-700">کەمتر لە ١ خولەک لەبەردەم دەرگا</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">مەسرەفی سووتەمەنی و ڕێڕەو</td>
                    <td className="py-2.5 px-3 text-slate-600">ڕێڕەوی ناڕێکخراو و بەفیڕۆچوونی سووتەمەنی</td>
                    <td className="py-2.5 px-3 bg-amber-50/50 font-bold text-amber-700">پاشەکەوتکردنی تا ٣٥٪ بەنزین بە TSP</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">زانیاری دایک و باوک لە شوێنی پاس</td>
                    <td className="py-2.5 px-3 text-slate-600">بێئاگایی تەواو؛ تەنها پەیوەندی تەلەفۆنی ناڕوون</td>
                    <td className="py-2.5 px-3 bg-amber-50/50 font-bold text-slate-900">چاودێری ڕاستەوخۆ لەسەر نەخشە بە چرکە</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">چارەسەری نەهاتنی منداڵ</td>
                    <td className="py-2.5 px-3 text-slate-600">پاس دەچێتە بەردەم ماڵ و هۆڕن لێدەدات</td>
                    <td className="py-2.5 px-3 bg-amber-50/50 font-bold text-emerald-700">تۆمارکردنی پێشوەخت و پەڕاندنی وێستگەکە</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">باری لەناکاو و دواکەوتن</td>
                    <td className="py-2.5 px-3 text-slate-600">تەلەفۆنکردن بۆ دەیان خێزان یان بێدەنگی</td>
                    <td className="py-2.5 px-3 bg-amber-50/50 font-bold text-rose-700">پەخشی بەپەلەی ناوەندی بە یەک کلیک</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section Image 4: Fleet Management Architecture */}
          <div className="my-4 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <img
              src={reportFleetArchImg}
              alt="تەلارسازی بەڕێوەبردنی ناوەندی بەلەمی پاسەکان"
              className="w-full h-auto max-h-[360px] object-cover"
            />
            <div className="p-2.5 bg-slate-900 text-white text-xs text-center font-medium">
              وێنەی ٤: تابلۆی کۆنتڕۆڵی ناوەندی بەڕێوەبەرایەتی قوتابخانە و تەلارسازی پێوەندییەکان
            </div>
          </div>

          {/* Section 5: Measurable Benefits & Outcomes */}
          <section className="space-y-3">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-r-4 border-amber-500 pr-3">
              <span>٥. سوود و دەرئەنجامە چەسپاوەکان</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>پاراستنی تەواوی سەلامەتی قوتابیان</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  نەهێشتنی تەواوی کاتی وەستانی منداڵ لەسەر شەقام لە وەرزی سەرما و باراندا، و کەمکردنەوەی مەترسی ڕووداوەکانی هاتوچۆ بۆ نزیکەی سفر.
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>پاشەکەوتی دارایی و پاراستنی ژینگە</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  پاشەکەوتکردنی تا ٣٥٪ بەنزین و کەمکردنەوەی تێچووی ئۆتۆمبێلەکان، لەگەڵ کەمکردنەوەی دووکەڵ و گازی زیانبەخشی کاربۆن (CO2).
                </p>
              </div>

              <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-1">
                <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>ڕوونی زانیاری و ئاسوودەیی دایک و باوک</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  نەمانی هەموو جۆرە دڵەڕاوکێیەک لە ماڵەکاندا؛ دایک و باوکان دەزانن کەی منداڵەکەیان سوار بوو، کەی دەگاتە قوتابخانە، و بە پێچەوانەوە.
                </p>
              </div>

              <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-700" />
                  <span>بەڕێوەبردنی خێرا و مۆدێرن بۆ قوتابخانە</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  قوتابخانە خاوەنی تۆمارێکی دیجیتاڵییە بۆ هەموو گەشتەکان، کاتەکانی گەیشتن، و ڕێکخستنی خێزانی نوێ بەبێ پێویستی بە نووسراوی کاغەزی کۆن.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 space-y-3 text-xs shadow-md">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>دەرئەنجامی گشتی پڕۆژەکە</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-justify">
              سیستەمی "ڕێگای پارێزراو" هەنگاوێکی گەورەیە بەرەو بەدیجیتاڵکردنی هاتوچۆی قوتابخانەکان لە هەرێمی کوردستان. ئەم پرۆژەیە نیشانیدەدات کە چۆن تەکنەلۆژیا، ئەلگۆریتمە زانستییەکان، و دیزاینی سادە و گونجاو دەتوانن ژیانی ڕۆژانەی سەدان خێزان ئاسانتر بکەن و سەلامەتی منداڵان بپارێزن.
            </p>
            <div className="pt-3 text-slate-400 text-[11px] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-semibold text-amber-400">ئامادەکراوە لەلایەن: هێدی ئاغا و ئیبراهیم ئەحمەد</span>
              <span>سیستەمی زیرەکی ڕێگای پارێزراو · Horizon Academy · ٢٠٢٦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

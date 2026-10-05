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
  Users,
  Smartphone,
  Route,
  Zap,
  FileDown,
  Eye,
  Settings,
  BookOpen,
  Image as ImageIcon,
  Landmark,
} from 'lucide-react';
import ranyaDriverConsoleImg from '../assets/images/ranya_driver_console_1791210838875.jpg';
import ranyaParentPortalImg from '../assets/images/ranya_parent_portal_1791210849316.jpg';
import ranyaSchoolFleetImg from '../assets/images/ranya_school_fleet_1791210863295.jpg';
import ranyaEduDirectorateImg from '../assets/images/ranya_edu_directorate_1791210877659.jpg';

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

  // Generate downloadable standalone HTML / Word-compatible Document (Clean Academic Styling)
  const handleDownloadHtmlDoc = () => {
    const reportHtmlContent = `<!DOCTYPE html>
<html lang="ku" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>ڕاپۆرتی سیستەمی زیرەکی پاسی قوتابخانە لە شاری ڕانیە - هێدی ئاغا و ئیبراهیم ئەحمەد</title>
  <style>
    body {
      font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      direction: rtl;
      text-align: right;
      line-height: 1.9;
      color: #0f172a;
      background: #f8fafc;
      padding: 30px;
      margin: 0;
    }
    .container {
      max-width: 940px;
      margin: 0 auto;
      background: #ffffff;
      padding: 44px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
    }
    .title-page {
      border: 2px solid #334155;
      background: #f8fafc;
      padding: 32px 24px;
      border-radius: 6px;
      margin-bottom: 28px;
      text-align: center;
    }
    h1 {
      color: #020617;
      font-size: 24px;
      margin: 8px 0;
      font-weight: 800;
      line-height: 1.5;
    }
    .owners-grid {
      display: flex;
      justify-content: center;
      gap: 36px;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #cbd5e1;
      font-size: 15px;
      font-weight: 700;
      color: #1e293b;
    }
    .section-title {
      font-size: 17px;
      font-weight: 800;
      color: #020617;
      border-right: 4px solid #334155;
      padding-right: 12px;
      margin-top: 36px;
      margin-bottom: 14px;
      background: #f1f5f9;
      padding-top: 6px;
      padding-bottom: 6px;
    }
    p {
      font-size: 13.5px;
      color: #334155;
      text-align: justify;
      margin-bottom: 12px;
    }
    .content-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      padding: 16px 20px;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    .content-box strong {
      color: #020617;
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
    }
    ul, ol {
      margin-top: 6px;
      margin-bottom: 6px;
      padding-right: 20px;
      font-size: 13px;
      color: #334155;
    }
    li {
      margin-bottom: 6px;
    }
    .table-custom {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 12.5px;
    }
    .table-custom th, .table-custom td {
      border: 1px solid #cbd5e1;
      padding: 10px 14px;
      text-align: right;
    }
    .table-custom th {
      background: #f1f5f9;
      color: #020617;
      font-weight: 700;
    }
    .footer {
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid #cbd5e1;
      text-align: center;
      font-size: 12px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="title-page">
      <h1>ڕاپۆرتی سیستەمی زیرەکی چاودێری و ڕێکخستنی پاسی قوتابخانە</h1>
      <p style="margin: 6px 0; color: #475569; font-size: 13.5px;">نموونەی مەیدانی بۆ قوتابخانەکانی شاری ڕانیە (گەڕەکەکانی ڕزگاری، ئاشتی، نەورۆز، و دەروازە)</p>
      
      <div class="owners-grid">
        <div>
          <span style="font-size: 11px; color: #64748b; display: block; font-weight: 600;">خاوەنی پڕۆژە (Owner):</span>
          هێدی ئاغا
        </div>
        <div style="border-right: 1px solid #cbd5e1; padding-right: 36px;">
          <span style="font-size: 11px; color: #64748b; display: block; font-weight: 600;">خاوەنی پڕۆژە (Owner):</span>
          ئیبراهیم ئەحمەد
        </div>
      </div>
      <div style="margin-top: 14px; font-size: 11.5px; color: #64748b;">
        شاری ڕانیە · دەڤەری ڕاپەڕین · ساڵی ٢٠٢٦
      </div>
    </div>

    <div class="section-title">١. پێشەکی، کێشەی چارەسەرکراو و چەمکی گشتی پڕۆژەکە لە شاری ڕانیە</div>
    <p>
      گواستنەوەی ڕۆژانەی قوتابیان لە نێوان ماڵ و قوتابخانەکان لە <strong>شاری ڕانیە</strong> (وەک گەڕەکەکانی ئاشتی، ڕزگاری، نەورۆز، و دەروازە) گرنگترین جومگەی ژێرخانی پەروەردەییە. لە شێوازی نەریتیدا لە ڕانیە، منداڵان لە وەرزی زستان و سەرمای توندی ناوچەکەدا ١٥ بۆ ٣٠ خولەک لەبەر دەرگا چاوەڕوانی هاتنی پاس دەبوون، هاوکات دایک و باوکان بەردەوام تەلەفۆنیان بۆ شۆفێران دەکرد. سیستەمی "ڕێگای پارێزراو" بە چاودێری ڕاستەوخۆ و ئەلگۆریتمی کورتکردنەوەی ڕێگا (TSP) کێشەکانی لە شاری ڕانیە بە تەواوی چارەسەر کردووە.
    </p>

    <div class="section-title">٢. شۆفێری پاس چۆن کاردەکات و چی دەبینێت لەسەر مۆبایلەکەی؟ (نموونەی ڕانیە)</div>
    <div class="content-box">
      <strong>شۆفێری پاس لەسەر مۆبایلەکەی چی دەبینێت:</strong>
      <ul>
        <li><strong>دۆخی کارکردن (GPS):</strong> نیشاندەری چالاکبوونی گەشت بەرەو قوتابخانەی بنەڕەتی ڕانیە یان قوتابخانەی کانی.</li>
        <li><strong>کارتی وێستگەی ئێستا:</strong> بۆ نموونە: ماڵی قوتابی لە <strong>گەڕەکی ئاشتی، نزیک مزگەوتی گەورە</strong> بە ژمارە مۆبایل و ناونیشانی ورد.</li>
        <li><strong>کاتی ماوە و مەودا (ETA & Distance):</strong> کاتی ماوە بە خولەک بەپێی شەقامەکانی شاری ڕانیە و قەرەباڵغی ناو بازاڕ.</li>
        <li><strong>دوگمەی سواری پاس بوو / نەهاتووە:</strong> بە یەک دەستلێدان لەسەر شاشەکە سواربوونی منداڵ لە گەڕەکی ئاشتی تۆمار دەکرێت.</li>
      </ul>
    </div>

    <div class="section-title">٣. دایک و باوک چۆن کاردەکەن و چی دەبینن لەسەر مۆبایلی خۆیان؟ (نموونەی ڕانیە)</div>
    <div class="content-box">
      <strong>دایک و باوک لەسەر مۆبایلەکەیان چی دەبینن:</strong>
      <ul>
        <li><strong>نەخشەی ڕاستەوخۆی ڕانیە:</strong> بینینی جووڵەی پاسەکە لەسەر شەقام بەرەو ماڵی خۆیان لە <strong>گەڕەکی ڕزگاری لە ڕانیە</strong>.</li>
        <li><strong>زەنگی ئاگاداری ١ خولەک پێش گەیشتن:</strong> لەگەڵ نزیکبوونەوەی پاس بۆ ١ خولەک دووری، زەنگی ئاگاداری لێدەدات تا منداڵەکەیان بنێرنە بەردەم دەرگا.</li>
        <li><strong>دۆخی سات بە ساتی منداڵ:</strong> "سواربوو لە کاتی 07:42 AM لە گەڕەکی ڕزگاری" و "گەیشتە قوتابخانە لە 08:05 AM".</li>
        <li><strong>دوگمەی چاوەڕوانی ٢ خولەک و نەهاتن:</strong> ڕێگریکردن لە وەستانی پاس لە شەقامەکانی ڕانیەدا.</li>
      </ul>
    </div>

    <div class="section-title">٤. بەڕێوەبەرایەتی قوتابخانە چۆن کاردەکات؟ (نموونەی قوتابخانەی ئامادەیی کانی لە ڕانیە)</div>
    <div class="content-box">
      <strong>بەڕێوەبەرایەتی قوتابخانە لەسەر مۆبایلەکەی چی دەبینێت:</strong>
      <ul>
        <li><strong>تابلۆی بەلەمی پاسەکانی قوتابخانە:</strong> چاودێری سەرجەم پاسەکان کە بە گەڕەکەکانی نەورۆز، ئاشتی، ڕزگاری و دەروازەدا دەڕۆن بەرەو قوتابخانەی کانی.</li>
        <li><strong>نەخشەی سەرپەرشتیاری گشتی:</strong> پیشاندانی هەموو پاسەکان لە یەک کاتدا لەسەر نەخشەی شاری ڕانیە بە خێرایی ڕاستەقینە.</li>
        <li><strong>پەخشی بەپەلەی قوتابخانە:</strong> ناردنی ئاگاداری دەستبەجێ بۆ خێزانەکانی سنووری گەڕەکەکانی ڕانیە.</li>
      </ul>
    </div>

    <div class="section-title">٥. بەڕێوەبەرایەتی پەروەردەی ڕانیە (Directorate of Education in Ranya) - سەرپەرشتیاری باڵا</div>
    <div class="content-box">
      <strong>دەسەڵاتی باڵای بەڕێوەبەرایەتی پەروەردەی ڕانیە:</strong>
      <ul>
        <li><strong>نەخشەی ماکرۆی تەواوی شاری ڕانیە:</strong> چاودێری سەرجەم قوتابخانەکانی شاری ڕانیە (قوتابخانەی کانی، قوتابخانەی بنەڕەتی ڕانیە، قوتابخانەی سەرکەوتن، قوتابخانەی هەڵگورد).</li>
        <li><strong>سەنتەری کەشوهەوا و قەیرانەکان لە ڕانیە:</strong> دەرکردنی بڕیاری پشووی فەرمی لە کاتی بەفربارین لە کێوی کێوەڕەش و سەرماوسۆڵەی دەڤەری ڕاپەڕین بە یەک نامە بۆ هەموو قوتابخانە و خێزانەکانی سنوورەکە.</li>
        <li><strong>ڕێکخستنی هێڵەکانی هاتوچۆ لە ڕانیە:</strong> ڕێگریکردن لە قەرەباڵغی لە شەقامە سەرەکییەکانی شاری ڕانیە.</li>
      </ul>
    </div>

    <div class="section-title">٦. ئەلگۆریتمی ڕێکخستنی کورتترین ڕێڕەو (TSP) لە شەقامەکانی ڕانیە</div>
    <p>
      پێوانەکردنی دووری نێوان گەڕەکەکانی ئاشتی، نەورۆز و ڕزگاری بەرەو قوتابخانەکان، کە دەبێتە هۆی پاشەکەوتکردنی تا ٣٥٪ بەنزین و کەمکردنەوەی ڕۆژانە ١٥ بۆ ٢٥ خولەک لە کاتی گەشتی پاسەکان لە ڕانیە.
    </p>

    <div class="section-title">٧. بەراوردی خاڵ بە خاڵی نێوان شێوازی کۆن و سیستەمی نوێ</div>
    <table class="table-custom">
      <thead>
        <tr>
          <th>تایبەتمەندی</th>
          <th>شێوازی تەقلیدی کۆن لە ڕانیە</th>
          <th>سیستەمی نوێ (ڕێگای پارێزراو)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>کاتی چاوەڕوانی منداڵ لە سەرما</td>
          <td>١٥ بۆ ٣٠ خولەک لە گەڕەکەکانی ڕانیە</td>
          <td>کەمتر لە ١ خولەک لەبەردەم دەرگا</td>
        </tr>
        <tr>
          <td>مەسرەفی سووتەمەنی و ڕێڕەو</td>
          <td>ڕێڕەوی ناڕێکخراو و بەفیڕۆچوونی سووتەمەنی</td>
          <td>پاشەکەوتکردنی تا ٣٥٪ بەنزین بە TSP</td>
        </tr>
        <tr>
          <td>چاودێری باوان</td>
          <td>تەلەفۆنکردنی بەردەوام و دڵەڕاوکێ</td>
          <td>چاودێری ڕاستەوخۆ لەسەر نەخشەی ڕانیە (ETA)</td>
        </tr>
        <tr>
          <td>باری لەناکاو و بەفربارین</td>
          <td>سەرلێشێوان و بێئاگایی لە دەوام</td>
          <td>پەخشی بەپەلەی پەروەردەی ڕانیە بە یەک چرکە</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">٨. سوود و دەستکەوتە سەرەکییەکان</div>
    <div class="content-box">
      <ul>
        <li><strong>پاراستنی سەلامەتی منداڵان (١٠٠٪):</strong> نەمانی چاوەڕوانی منداڵ لە سەرمای زستانی ڕانیە.</li>
        <li><strong>پاشەکەوتی سووتەمەنی:</strong> تا ٣٥٪ کەمکردنەوەی بەنزینی پاسەکانی قوتابخانە.</li>
        <li><strong>کۆنتڕۆڵی دیجیتاڵی بۆ پەروەردەی ڕانیە:</strong> سەرپەرشتیاری سەرتاسەری بۆ هەموو قوتابخانەکانی شارەکە.</li>
      </ul>
    </div>

    <div class="section-title">٩. شاشە سەرەکییەکانی سیستەم لەسەر مۆبایل (نموونەی شاری ڕانیە)</div>
    <p>
      ١. شۆفێری پاس - گەڕەکی ئاشتی، ڕانیە (قوتابخانەی بنەڕەتی ڕانیە)<br>
      ٢. خێزان و دایک و باوکان - گەڕەکی ڕزگاری، شاری ڕانیە<br>
      ٣. بەڕێوەبەرایەتی قوتابخانەی ئامادەیی کانی لە ڕانیە (گەڕەکەکانی نەورۆز و ئاشتی)<br>
      ٤. بەڕێوەبەرایەتی پەروەردەی ڕانیە (چاودێری گشتی قوتابخانەکانی شاری ڕانیە)
    </p>

    <div class="footer">
      خاوەنی پڕۆژە: هێدی ئاغا و ئیبراهیم ئەحمەد · سیستەمی ڕێگای پارێزراو · شاری ڕانیە · ٢٠٢٦
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([reportHtmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Raporti-Pasi-Qutabxana-Ranya-Hedi-w-Ibrahim.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('ڕاپۆرتە فەرمییەکەی شاری ڕانیە بە فۆرماتی HTML/Word دابەزی!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  // Generate downloadable pure Text / Markdown format
  const handleDownloadTextDoc = () => {
    const reportText = `================================================================================
ڕاپۆرتی سیستەمی زیرەکی چاودێری و ڕێکخستنی پاسی قوتابخانە (ڕێگای پارێزراو)
نموونەی مەیدانی بۆ قوتابخانەکانی شاری ڕانیە لە کوردستانی عێراق
================================================================================

خاوەنی پڕۆژە (Owners):
١. هێدی ئاغا (Owner)
٢. ئیبراهیم ئەحمەد (Owner)

شوێن: شاری ڕانیە · دەڤەری ڕاپەڕین
بەروار: ٢٠٢٦
پوختە: چاودێری ڕاستەوخۆی GPS، کورتکردنەوەی ڕێگا (TSP)، و ئاگاداری ١ خولەک پێش گەیشتن

--------------------------------------------------------------------------------
١. پێشەکی و کێشە چارەسەرکراوەکان لە شاری ڕانیە
--------------------------------------------------------------------------------
گواستنەوەی ڕۆژانەی قوتابیان لە نێوان ماڵ و قوتابخانەکان لە گەڕەکەکانی شاری ڕانیە
(گەڕەکی ئاشتی، ڕزگاری، نەورۆز، دەروازە). لە شێوازی کۆندا منداڵان لە سەرمای زستانی
ناوچەکەدا ١٥ بۆ ٣٠ خولەک لەبەردەم ماڵ دەوەستان. ئەم سیستەمە بە کورتکردنەوەی ڕێگا و
چاودێری ڕاستەوخۆ تەواوی ئەم کێشانەی چارەسەر کردووە.

--------------------------------------------------------------------------------
٢. شۆفێری پاس چۆن کاردەکات؟ (نموونەی شاری ڕانیە)
--------------------------------------------------------------------------------
- دوگمەی دۆخی کارکردن (GPS) بۆ قوتابخانەی بنەڕەتی ڕانیە لە گەڕەکی ئاشتی
- کارتی وێستگەی ئێستا: ماڵی قوتابی لە گەڕەکی ئاشتی، نزیک مزگەوتی گەورە
- کاتی ماوە بە خولەک بەپێی شەقامەکانی شاری ڕانیە
- دوگمەی "سواری پاس بوو" و "نەهاتووە"

--------------------------------------------------------------------------------
٣. دایک و باوک چۆن کاردەکەن؟ (نموونەی شاری ڕانیە)
--------------------------------------------------------------------------------
- نەخشەی ڕاستەوخۆی شاری ڕانیە بەرەو گەڕەکی ڕزگاری
- زەنگی ئاگاداری ١ خولەک پێش گەیشتنی پاس بە ماڵیان
- دۆخی سات بە ساتی منداڵ و دوگمەکانی چاوەڕوانی ٢ خولەک و نەهاتن

--------------------------------------------------------------------------------
٤. بەڕێوەبەرایەتی قوتابخانە لە شاری ڕانیە (قوتابخانەی ئامادەیی کانی)
--------------------------------------------------------------------------------
- تابلۆی بەلەمی پاسەکانی قوتابخانەی کانی لە گەڕەکەکانی نەورۆز، ئاشتی، و ڕزگاری
- نەخشەی سەرپەرشتیاری شار و پەخشی بەپەلەی قوتابخانە

--------------------------------------------------------------------------------
٥. بەڕێوەبەرایەتی پەروەردەی ڕانیە (Directorate of Education in Ranya)
--------------------------------------------------------------------------------
- نەخشەی ماکرۆی هەموو قوتابخانەکانی شاری ڕانیە (قوتابخانەی کانی، سەرکەوتن، هەڵگورد)
- دەرکردنی بڕیاری پشووی بەپەلە لە کاتی بەفربارین لە کێوی کێوەڕەش بۆ هەموو شارەکە
- ڕێکخستنی هێڵەکان بۆ ڕێگریکردن لە قەرەباڵغی لە شەقامەکانی شاری ڕانیە

--------------------------------------------------------------------------------
٦. ئەلگۆریتمی ڕێکخستنی کورتترین ڕێڕەو (TSP)
--------------------------------------------------------------------------------
- سووتەمەنی تا ٣٥٪ پاشەکەوت دەکرێت لە شەقامەکانی ڕانیەدا.
- ڕۆژانە ١٥ بۆ ٢٥ خولەک کاتی گەشت پاشەکەوت دەکرێت.

--------------------------------------------------------------------------------
٩. شاشەکانی ئەپڵیکەیشن لەسەر مۆبایل (شاری ڕانیە):
--------------------------------------------------------------------------------
١. شۆفێری پاس - گەڕەکی ئاشتی، شاری ڕانیە (قوتابخانەی بنەڕەتی ڕانیە)
٢. خێزان و دایک و باوکان - گەڕەکی ڕزگاری، شاری ڕانیە
٣. بەڕێوەبەرایەتی قوتابخانەی ئامادەیی کانی لە ڕانیە (گەڕەکەکانی نەورۆز و ئاشتی)
٤. بەڕێوەبەرایەتی پەروەردەی ڕانیە (چاودێری گشتی قوتابخانەکانی شاری ڕانیە)

خاوەنی پڕۆژە: هێدی ئاغا و ئیبراهیم ئەحمەد · شاری ڕانیە · ٢٠٢٦
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Raporti-Pasi-Qutabxana-Ranya.txt');
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
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs p-3 sm:p-6 flex items-center justify-center font-sans text-right print:p-0 print:bg-white print:static"
    >
      <div className="bg-white rounded-2xl border border-slate-300 shadow-xl max-w-5xl w-full max-h-[92vh] overflow-y-auto flex flex-col print:max-h-none print:shadow-none print:border-none print:w-full">
        {/* Modal Top Bar (Minimalist Executive Header) */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 bg-white/95 backdrop-blur-xs z-20 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-slate-200" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">ڕاپۆرتی فەرمی پڕۆژە</h2>
              <p className="text-xs text-slate-500">سیستەمی زیرەکی چاودێری پاسی قوتابخانە بۆ شاری ڕانیە (ڕێگای پارێزراو)</p>
            </div>
          </div>

          {/* Action Download & Print Buttons (Minimalist Style) */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownloadHtmlDoc}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="داگرتنی دۆکیومێنت بە فۆرماتی فەرمی HTML / Word"
            >
              <Download className="w-3.5 h-3.5 text-slate-300" />
              <span>داگرتنی فایل (HTML / Word)</span>
            </button>

            <button
              onClick={handleDownloadTextDoc}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
              title="داگرتنی دەقی تەواوی ڕاپۆرت وەک دەقی ڕوون"
            >
              <FileDown className="w-3.5 h-3.5 text-slate-600" />
              <span>دەق (TXT)</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="چاپکردن یان پاشەکەوتکردن وەک PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>چاپکردن / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Download Success Callout Banner */}
        {downloadSuccess && (
          <div className="mx-6 mt-4 p-3 bg-slate-100 border border-slate-300 text-slate-800 text-xs rounded-lg flex items-center gap-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-slate-700 flex-shrink-0" />
            <span className="font-semibold">{downloadSuccess}</span>
          </div>
        )}

        {/* Printable Report Document Body */}
        <div className="p-6 sm:p-10 space-y-8 text-slate-800 leading-relaxed print:p-0 print:space-y-6">
          {/* Simple Cover Title Page (Clean & Formal - Focused on Ranya Schools) */}
          <div className="border border-slate-300 rounded-xl p-6 sm:p-8 bg-slate-50/70 text-center space-y-3 print:border-slate-400 print:bg-white">
            <div className="space-y-1.5 max-w-2xl mx-auto">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                ڕاپۆرتی سیستەمی زیرەکی چاودێری و ڕێکخستنی پاسی قوتابخانە
              </h1>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                نموونەی مەیدانی بۆ قوتابخانەکانی شاری ڕانیە (گەڕەکەکانی ڕزگاری، ئاشتی، نەورۆز، و دەروازە)
              </p>
            </div>

            {/* OWNERS DISPLAY (Both names clearly designated as Owners) */}
            <div className="pt-4 border-t border-slate-200 max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
              <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  هـ
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block">خاوەنی پڕۆژە (Owner):</span>
                  <strong className="text-xs font-bold text-slate-900">هێدی ئاغا</strong>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  ئـ
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block">خاوەنی پڕۆژە (Owner):</span>
                  <strong className="text-xs font-bold text-slate-900">ئیبراهیم ئەحمەد</strong>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-1 text-center">
              <span>شاری ڕانیە · دەڤەری ڕاپەڕین · ساڵی ٢٠٢٦</span>
            </div>
          </div>

          {/* Section 1: Problem Statement & System Concept in Ranya */}
          <section className="space-y-3">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <span>١. پێشەکی و کێشە چارەسەرکراوەکان لە شاری ڕانیە</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              گواستنەوەی ڕۆژانەی خوێندکارانی قوتابخانە لە نێوان ماڵ و قوتابخانەکان لە <strong>شاری ڕانیە</strong> (وەک گەڕەکەکانی ئاشتی، ڕزگاری، نەورۆز، دەروازە، و مامۆستایان) گرنگترین جومگەی کەرتی پەروەردەیە. لە شێوازی نەریتیدا لە ڕانیە، منداڵان لە وەرزی زستان و سەرمای توندی دەڤەری ڕاپەڕیندا ناچار دەبوون ١٥ بۆ ٣٠ خولەک لەبەر دەرگا چاوەڕوانی هاتنی پاس بن. هاوکات دایک و باوکان بەردەوام تەلەفۆنیان بۆ شۆفێران دەکرد لەبەر نەبوونی زانیاری لەسەر کاتی گەیشتنی پاسەکە لەناو قەرەباڵغی شەقامەکانی شار. سیستەمی <strong>"ڕێگای پارێزراو"</strong> ئەم کێشانەی لە سەرجەم قوتابخانەکانی ڕانیە بە تەواوی چارەسەر کردووە.
            </p>
          </section>

          {/* Section 2: Step 1 - How Bus Driver Works in Ranya */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <BusIcon className="w-4 h-4 text-slate-700" />
              <span>٢. شۆفێری پاس چۆن کاردەکات لە شاری ڕانیە؟ (قوتابخانەی بنەڕەتی ڕانیە)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>چی دەبینێت لەسەر مۆبایلەکەی؟ (نموونەی ڕانیە)</span>
                </div>
                <ul className="space-y-1 text-slate-600 list-disc list-inside leading-relaxed">
                  <li><strong>دۆخی کارکردن (GPS):</strong> نیشاندەری دەوامی چالاک بەرەو قوتابخانەی بنەڕەتی ڕانیە لە گەڕەکی ئاشتی.</li>
                  <li><strong>ڕێڕەوی ڕێکخراو لە ڕانیە:</strong> نەخشەی شەقامەکانی گەڕەکی ئاشتی و نەورۆز بە کورتترین دووری.</li>
                  <li><strong>کارتی وێستگەی ئێستا:</strong> ناوی قوتابی لە <strong>گەڕەکی ئاشتی، نزیک مزگەوتی گەورە، ڕانیە</strong> بە ژمارە مۆبایلی باوان.</li>
                  <li><strong>کاتی ماوە و دووری:</strong> کاتی ماوە بۆ گەیشتن (ETA) بە خولەک بەپێی ترافیکی ناو بازاڕی ڕانیە.</li>
                  <li><strong>دوگمەکانی کردار:</strong> دوگمەی سەوزی <strong>"سواری پاس بوو"</strong> و سووری <strong>"نەهاتووە"</strong>.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Settings className="w-3.5 h-3.5 text-slate-600" />
                  <span>شۆفێرەکە لە پراکتیکدا چۆن کاردەکات؟</span>
                </div>
                <ol className="space-y-1 text-slate-600 list-decimal list-inside leading-relaxed">
                  <li>لە کاتژمێر ٧:١٥ی بەیانی لە گەڕەکی ئاشتی دوگمەی <strong>"دەستپێکردنی کار (GPS)"</strong> دادەگرێت.</li>
                  <li>پاسەکە بەپێی کورتترین ڕێگای گەڕەکەکانی ڕانیە بەرەو وێستگەی یەکەم دەڕوات.</li>
                  <li>لە بەردەم ماڵی قوتابی لە گەڕەکی ئاشتی، شۆفێر دوگمەی <strong>"سواری پاس بوو"</strong> دادەگرێت.</li>
                  <li>ئەگەر قوتابی ئامادە نەبێت، دوگمەی <strong>"نەهاتووە"</strong> دادەگرێت تا ڕێگاکە سەرلەنوێ کورت بکرێتەوە.</li>
                  <li>لە کاتی قەرەباڵغی لە شەقامی سەرەکی، دوگمەی <strong>"ڕاگەیاندنی دواکەوتن"</strong> دادەگرێت.</li>
                  <li>لە کاتی ڕووداوی لەناکاو، دوگمەی سووری <strong>"فریاگوزاری لەناکاو (SOS)"</strong> دادەگرێت.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 3: Step 2 - How Parents Work in Ranya */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <Users className="w-4 h-4 text-slate-700" />
              <span>٣. دایک و باوک چۆن کاردەکەن لە شاری ڕانیە؟ (گەڕەکی ڕزگاری)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>چی دەبینن لەسەر مۆبایلی خۆیان؟ (نموونەی ڕانیە)</span>
                </div>
                <ul className="space-y-1 text-slate-600 list-disc list-inside leading-relaxed">
                  <li><strong>نەخشەی ڕاستەوخۆ:</strong> بینینی جووڵەی پاسەکە بەرەو ماڵی خۆیان لە <strong>گەڕەکی ڕزگاری لە ڕانیە</strong>.</li>
                  <li><strong>کاتی گەیشتن (ETA):</strong> ژمارەی خولەکی ماوە تا پاسەکە دەگاتە بەردەم دەرگای ماڵەکەیان لە گەڕەکی ڕزگاری.</li>
                  <li><strong>زەنگی ئاگاداری ١ خولەک:</strong> لەگەڵ گەیشتنی پاس بە ١ خولەک دووری، دەنگی زەنگ لێدەدات تا منداڵ لە سەرمای زستاندا نەوەستێت.</li>
                  <li><strong>دۆخی سات بە ساتی منداڵ:</strong> وەک "سواربوو لە کاتی 07:42 AM لە گەڕەکی ڕزگاری" و "گەیشتە قوتابخانەی کانی لە 08:05 AM".</li>
                  <li><strong>پەیوەندی بە شۆفێر:</strong> ژمارە تەلەفۆنی شۆفێر و تابلۆی پاس.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                  <span>دایک و باوک لە ڕانیە چۆن کاردەکەن؟</span>
                </div>
                <ol className="space-y-1 text-slate-600 list-decimal list-inside leading-relaxed">
                  <li>لەگەڵ لێدانی <strong>زەنگی ١ خولەک پێش گەیشتن</strong>، منداڵەکەیان دەنێرنە بەردەم دەرگا تا پاسەکە ڕاستەوخۆ هەڵیبگرێت.</li>
                  <li>ئەگەر کەمێک دوابکەون، دوگمەی <strong>"⏳ چاوەڕوانی ٢ خولەک"</strong> دادەگرن تا شۆفێر ئاگادار بێت.</li>
                  <li>ئەگەر منداڵ نەخۆش بێت، دوگمەی <strong>"❌ ئەمڕۆ نایەت"</strong> دادەگرن تا پاس نەیەتە ناو کۆڵانەکەیان.</li>
                  <li>لە کاتی چوون بۆ ماڵی خزم لە گەڕەکێکی تر، بە دوگمەی <strong>"📍 دەستکاریکردنی شوێن"</strong> ناونیشانی کاتی دادەنێن.</li>
                  <li>بە دوگمەی <strong>"💬 پرسیار بۆ بەڕێوەبەرایەتی"</strong> چاتی ڕاستەوخۆ لەگەڵ قوتابخانە دەکەن.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 4: Step 3 - School Management in Ranya */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span>٤. بەڕێوەبەرایەتی قوتابخانە چۆن کاردەکات؟ (قوتابخانەی ئامادەیی کانی لە ڕانیە)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>چی دەبینن لەسەر مۆبایلی سەرپەرشتیاری قوتابخانە؟</span>
                </div>
                <ul className="space-y-1 text-slate-600 list-disc list-inside leading-relaxed">
                  <li><strong>تابلۆی بەلەمی پاسەکانی قوتابخانەی کانی:</strong> پاسەکانی هێڵی گەڕەکی نەورۆز، هێڵی گەڕەکی ئاشتی، و هێڵی گەڕەکی ڕزگاری لە ڕانیە.</li>
                  <li><strong>نەخشەی سەرپەرشتیاری شار:</strong> پیشاندانی هەموو پاسەکانی قوتابخانە لە یەک کاتدا لەسەر نەخشەی شاری ڕانیە.</li>
                  <li><strong>دایرێکتۆری قوتابیانی ڕانیە:</strong> گەڕان بەپێی گەڕەک (ئاشتی، نەورۆز، ڕزگاری)، مۆبایل، یان پاس.</li>
                  <li><strong>سندوقی پەیامەکان:</strong> وەڵامدانەوەی خێرای پرسیار و داواکاری خێزانەکانی شاری ڕانیە.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Settings className="w-3.5 h-3.5 text-slate-600" />
                  <span>بەڕێوەبەرایەتی قوتابخانە لە پراکتیکدا چۆن کاردەکات؟</span>
                </div>
                <ol className="space-y-1 text-slate-600 list-decimal list-inside leading-relaxed">
                  <li>بە دوگمەی <strong>"+ پاسی نوێ"</strong> شۆفێر و پاسی نوێ زیاد دەکەن بۆ گەڕەکەکانی شاری ڕانیە.</li>
                  <li>بە دوگمەی <strong>"+ خێزانی نوێ"</strong> خێزان و ناونیشانی ماڵ لە ڕانیە لە سیستەم تۆمار دەکەن.</li>
                  <li>بە یەک کلیک دەتوانن پاسی هەر قوتابییەک بگۆڕن بۆ پاسێکی تر لە لیستی هەڵبژاردندا.</li>
                  <li>لە کاتی بەفر یان بارانی بەخوڕ، لە بەشی <strong>"پەخشی بەپەلە (Broadcasts)"</strong> نامەی هۆشداری دەستبەجێ بڵاودەکەنەوە.</li>
                  <li>وەڵامی پرسیاری دایک و باوکان دەدەنەوە لە مۆدیۆلی چاتدا.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 5: General Directorate of Education in Ranya */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <Landmark className="w-4 h-4 text-slate-700" />
              <span>٥. بەڕێوەبەرایەتی پەروەردەی ڕانیە (Directorate of Education in Ranya) - سەرپەرشتیاری باڵا</span>
            </h3>

            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              مۆدیۆلی بەڕێوەبەرایەتی پەروەردەی ڕانیە بەرزترین ئاستی سەرپەرشتیاری ناوچەییە، کە چاودێری و کۆنتڕۆڵی باڵای هەیە بەسەر تەواوی قوتابخانەکانی شاری ڕانیە (وەک: قوتابخانەی ئامادەیی کانی، قوتابخانەی بنەڕەتی ڕانیە، قوتابخانەی سەرکەوتن، و قوتابخانەی هەڵگورد). ئەم بەشە تەنها تایبەتە بە قوتابخانە پەروەردەییەکان.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>چی دەبینن لەسەر شاشەی پەروەردەی ڕانیە؟</span>
                </div>
                <ul className="space-y-1 text-slate-600 list-disc list-inside leading-relaxed">
                  <li><strong>نەخشەی ماکرۆی شاری ڕانیە:</strong> پیشاندانی هەموو قوتابخانەکانی شاری ڕانیە و دەیان پاس بە یەک کاتدا لەسەر نەخشەی شار.</li>
                  <li><strong>ئاماری گشتی پەروەردەی ڕانیە:</strong> ژمارەی سەرجەم قوتابخانەکانی شارەکە، کۆی گشتی پاسە چالاکەکان، و ڕێژەی پابەندبوون بە کات لە هەموو گەڕەکەکاندا.</li>
                  <li><strong>سەنتەری کەشوهەوا و بەفربارین لە کێوی کێوەڕەش:</strong> کۆنتڕۆڵی دەرکردنی بڕیاری پشووی فەرمی لە کاتی بەفربارینی قورس یان لافاو بۆ هەموو قوتابخانەکانی ڕانیە.</li>
                  <li><strong>وردبینی سەلامەتی و خێرایی:</strong> چاودێریکردنی خێرایی شۆفێران لە شەقامەکانی شاری ڕانیەدا.</li>
                  <li><strong>شیکاری سووتەمەنی و پاشەکەوتی شار:</strong> پێوانەی بەنزینی پاشەکەوتکراو لە تەواوی سنووری پەروەردەی ڕانیە.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Settings className="w-3.5 h-3.5 text-slate-600" />
                  <span>پەروەردەی ڕانیە لە پراکتیکدا چۆن کاردەکات؟</span>
                </div>
                <ol className="space-y-1 text-slate-600 list-decimal list-inside leading-relaxed">
                  <li><strong>ڕێکخستنی سنووری جوگرافی لە ڕانیە (Zoning):</strong> دابەشکردنی هێڵی پاسەکان لە نێوان قوتابخانەکانی ڕانیە بۆ کەمکردنەوەی قەرەباڵغی لە شەقامە سەرەکییەکان.</li>
                  <li><strong>ناردنی ئاگاداری فەرمی لەناکاو بۆ هەموو ڕانیە:</strong> ناردنی یەک پەیامی هاوکات بۆ هەموو بەڕێوەبەرانی قوتابخانە، شۆفێرەکان و هەزاران خێزان لە چرکەیەکدا.</li>
                  <li><strong>یەکلاییکردنەوەی کێشە چارەسەرنەکراوەکان:</strong> بەدواداچوونی سکاڵاکان لە نێوان باوان و کارگێڕی قوتابخانەکان.</li>
                  <li><strong>پشکنینی ساڵانەی سەلامەتی پاسەکان لە ڕانیە:</strong> مۆڵەتدان و پشکنینی ئۆتۆمبێلەکان پێش دەستپێکردنی وەرزی نوێ.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 6: TSP Route Engine in Ranya */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <Route className="w-4 h-4 text-slate-700" />
              <span>٦. ئەلگۆریتمی ڕێکخستنی کورتترین ڕێڕەو (TSP) لە شەقامەکانی ڕانیە</span>
            </h3>

            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              سیستەمەکە ئەلگۆریتمی ماتماتیکی <strong>Traveling Salesperson Problem (TSP)</strong> بەکاردەهێنێت بۆ پێوانەکردنی مەودای نێوان گەڕەکەکانی ئاشتی، نەورۆز، ڕزگاری، و دەروازە بەرەو قوتابخانەکانی شاری ڕانیە. ئەم ئەلگۆریتمە کورتترین ئەڵقەی هاتوچۆ دادەڕێژێت و ڕێگری لە ڕۆیشتنی دووبارە بە هەمان کۆڵاندا دەکات. دەرئەنجام:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">پاشەکەوتی سووتەمەنی تا ٣٥٪</span>
                <p className="text-slate-600 text-[11px]">کەمکردنەوەی بەرچاوی بەنزین و تێچووی پاسەکان لە شاری ڕانیە.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">پاشەکەوتی کات: ١٥-٢٥ خولەک</span>
                <p className="text-slate-600 text-[11px]">پاشەکەوتکردنی کاتی گەشت لە نۆبەی بەیانی و نیوەڕۆ لە ڕانیە.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">پاراستنی ژینگە لە گازی CO2</span>
                <p className="text-slate-600 text-[11px]">کەمکردنەوەی دەردانی دووکەڵی پاسەکان لە سنووری شاری ڕانیە.</p>
              </div>
            </div>
          </section>

          {/* Section 7: Scientific Comparison Matrix in Ranya Context */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <span>٧. بەراوردی زانستی نێوان سیستەمی کۆن و سیستەمی ڕێگای پارێزراو لە ڕانیە</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs border border-slate-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-slate-900 font-bold">
                    <th className="py-2.5 px-3">تایبەتمەندی</th>
                    <th className="py-2.5 px-3">شێوازی تەقلیدی کۆن لە ڕانیە</th>
                    <th className="py-2.5 px-3 bg-slate-200 text-slate-900">سیستەمی نوێ (ڕێگای پارێزراو)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">کاتی وەستانی منداڵ لە سەرما</td>
                    <td className="py-2.5 px-3 text-slate-600">١٥ بۆ ٣٠ خولەک لە گەڕەکەکانی ڕانیە</td>
                    <td className="py-2.5 px-3 bg-slate-50 font-bold text-slate-900">کەمتر لە ١ خولەک لەبەردەم دەرگا</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">مەسرەفی سووتەمەنی و ڕێڕەو</td>
                    <td className="py-2.5 px-3 text-slate-600">ڕێڕەوی ناڕێکخراو و بەفیڕۆچوونی سووتەمەنی</td>
                    <td className="py-2.5 px-3 bg-slate-50 font-bold text-slate-900">پاشەکەوتکردنی تا ٣٥٪ بەنزین بە TSP</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">ئاگاداری باوان لە شوێنی پاس</td>
                    <td className="py-2.5 px-3 text-slate-600">بێئاگایی تەواو و تەلەفۆنکردنی بەردەوام</td>
                    <td className="py-2.5 px-3 bg-slate-50 font-bold text-slate-900">چاودێری ڕاستەوخۆ لەسەر نەخشەی ڕانیە (ETA)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">چارەسەری نەهاتنی منداڵ</td>
                    <td className="py-2.5 px-3 text-slate-600">پاس دەچێتە بەردەم ماڵ و هۆڕن لێدەدات</td>
                    <td className="py-2.5 px-3 bg-slate-50 font-bold text-slate-900">تۆمارکردنی پێشوەختە و پەڕاندنی خۆکار</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">باری لەناکاو و بەفربارین</td>
                    <td className="py-2.5 px-3 text-slate-600">سەرلێشێوان و بێئاگایی لە دەوام</td>
                    <td className="py-2.5 px-3 bg-slate-50 font-bold text-slate-900">پەخشی بەپەلەی پەروەردەی ڕانیە بە یەک چرکە</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">سەرپەرشتیاری پەروەردەیی لە شاردا</td>
                    <td className="py-2.5 px-3 text-slate-600">نادیار و پەرتەوازە بەبێ ئاماری زیندوو</td>
                    <td className="py-2.5 px-3 bg-slate-50 font-bold text-slate-900">کۆنتڕۆڵی تەواوی بەڕێوەبەرایەتی پەروەردەی ڕانیە</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 8: Key Advantages in Ranya Context */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <span>٨. سوود و دەستکەوتە سەرەکییەکان لە شاری ڕانیە</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">پاراستنی سەلامەتی منداڵان (١٠٠٪)</span>
                <p className="text-slate-600 leading-relaxed">نەهێشتنی تەواوی کاتی وەستانی منداڵ لە سەرمای زستانی ڕانیە لەسەر شەقام، و کەمکردنەوەی مەترسی ڕووداوەکان بۆ صفر.</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">پاشەکەوتی دارایی و ژینگەیی</span>
                <p className="text-slate-600 leading-relaxed">پاشەکەوتکردنی تا ٣٥٪ بەنزین و کەمکردنەوەی تێچووی پاسەکان، لەگەڵ کەمکردنەوەی گازی زیانبەخشی کاربۆن (CO2) لە شاری ڕانیە.</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">ئاسوودەیی و متمانەی باوان لە ڕانیە</span>
                <p className="text-slate-600 leading-relaxed">نەمانی هەموو جۆرە دڵەڕاوکێیەک لە ماڵەکاندا بەهۆی چاودێری ڕاستەوخۆ و زەنگی ١ خولەک پێش گەیشتنی پاس.</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">بەڕێوەبردنی پێشکەوتوو بۆ پەروەردەی ڕانیە</span>
                <p className="text-slate-600 leading-relaxed">کۆنتڕۆڵی دیجیتاڵی بۆ سەرجەم قوتابخانەکانی شاری ڕانیە و بەڕێوەبەرایەتی پەروەردەی ڕانیە بەبێ نووسراوی کاغەزی کۆن.</p>
              </div>
            </div>
          </section>

          {/* Section 9: ALL 4 MOBILE SCREENSHOTS ON BOTTOM - COMPACT & SMALLER SIZE */}
          <section className="space-y-3 border-t-2 border-slate-200 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
              <div>
                <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-700" />
                  <span>٩. شاشە سەرەکییەکانی سیستەم لەسەر مۆبایل (نموونەی شاری ڕانیە)</span>
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  شاشەکان بە نموونەی ڕاستەقینەی قوتابخانەکانی شاری ڕانیە دیزاین کراون
                </p>
              </div>
              <span className="text-[9px] font-bold text-slate-600 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded self-start sm:self-auto">
                ٤ شاشەی مۆبایل (قەبارەی کەمکراوە)
              </span>
            </div>

            {/* Compact Symmetrical Grid: Smaller dimensions with max container width */}
            <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {/* Image 1: Bus Driver - Ranya */}
              <div className="bg-white border border-slate-300 rounded-lg p-1.5 flex flex-col justify-between space-y-1.5 shadow-2xs hover:border-slate-400 transition">
                <div className="text-right space-y-0.5">
                  <span className="text-[8px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1 py-0.2 rounded inline-block">
                    ١. شۆفێر · ڕانیە
                  </span>
                  <h4 className="text-[10px] font-bold text-slate-900 truncate">کۆنسۆڵی شۆفێر</h4>
                </div>
                <div className="w-full aspect-[9/16] max-h-[220px] rounded overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={ranyaDriverConsoleImg}
                    alt="شاشەی مۆبایلی شۆفێری پاس لە شاری ڕانیە"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>

              {/* Image 2: Family / Parents - Ranya */}
              <div className="bg-white border border-slate-300 rounded-lg p-1.5 flex flex-col justify-between space-y-1.5 shadow-2xs hover:border-slate-400 transition">
                <div className="text-right space-y-0.5">
                  <span className="text-[8px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1 py-0.2 rounded inline-block">
                    ٢. باوان · ڕانیە
                  </span>
                  <h4 className="text-[10px] font-bold text-slate-900 truncate">دەروازەی باوان</h4>
                </div>
                <div className="w-full aspect-[9/16] max-h-[220px] rounded overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={ranyaParentPortalImg}
                    alt="شاشەی مۆبایلی باوان لە شاری ڕانیە"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>

              {/* Image 3: School Administration - Ranya School Fleet */}
              <div className="bg-white border border-slate-300 rounded-lg p-1.5 flex flex-col justify-between space-y-1.5 shadow-2xs hover:border-slate-400 transition">
                <div className="text-right space-y-0.5">
                  <span className="text-[8px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1 py-0.2 rounded inline-block">
                    ٣. قوتابخانەی کانی
                  </span>
                  <h4 className="text-[10px] font-bold text-slate-900 truncate">بەلەمی پاسەکان</h4>
                </div>
                <div className="w-full aspect-[9/16] max-h-[220px] rounded overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={ranyaSchoolFleetImg}
                    alt="شاشەی بەڕێوەبەرایەتی قوتابخانەی کانی لە ڕانیە"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>

              {/* Image 4: General Directorate of Education in Ranya */}
              <div className="bg-white border border-slate-300 rounded-lg p-1.5 flex flex-col justify-between space-y-1.5 shadow-2xs hover:border-slate-400 transition">
                <div className="text-right space-y-0.5">
                  <span className="text-[8px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1 py-0.2 rounded inline-block">
                    ٤. پەروەردەی ڕانیە
                  </span>
                  <h4 className="text-[10px] font-bold text-slate-900 truncate">پەروەردەی گشتی</h4>
                </div>
                <div className="w-full aspect-[9/16] max-h-[220px] rounded overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={ranyaEduDirectorateImg}
                    alt="شاشەی بەڕێوەبەرایەتی پەروەردەی ڕانیە"
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion Banner */}
          <div className="bg-slate-900 text-slate-200 rounded-xl p-5 space-y-2 text-xs shadow-sm">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <BookOpen className="w-4 h-4 text-slate-300" />
              <span>دەرئەنجامی گشتی پڕۆژەکە بۆ شاری ڕانیە</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-justify">
              سیستەمی "ڕێگای پارێزراو" هەنگاوێکی گەورەیە بۆ بەدیجیتاڵکردنی هاتوچۆی قوتابخانەکانی شاری ڕانیە لە هەرێمی کوردستان. ئەم پڕۆژەیە سەلامەتی منداڵان لە سەرمای زستان دەپارێزێت، دڵەڕاوکێی باوان ناهێڵێت، ئاسانکاری بۆ شۆفێران دەکات، و کۆنتڕۆڵی تەواوی ناوچەکە بۆ بەڕێوەبەرایەتی پەروەردەی ڕانیە دەستەبەر دەکات.
            </p>
            <div className="pt-2 text-slate-400 text-[11px] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-semibold text-slate-200">خاوەنی پڕۆژە: هێدی ئاغا و ئیبراهیم ئەحمەد</span>
              <span>سیستەمی زیرەکی ڕێگای پارێزراو · شاری ڕانیە · ساڵی ٢٠٢٦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

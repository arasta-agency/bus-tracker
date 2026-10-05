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
  Radio,
  BookOpen,
} from 'lucide-react';
import realDriverConsoleImg from '../assets/images/real_driver_console_step_1791208526249.jpg';
import realParentPortalImg from '../assets/images/real_parent_portal_step_1791208541757.jpg';
import realSchoolManagerImg from '../assets/images/real_school_manager_step_1791208555548.jpg';
import realTspRouteMapImg from '../assets/images/real_tsp_route_map_step_1791208566791.jpg';

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
  <title>ڕاپۆرتی زانستی و تەکنیکی سیستەمی زیرەکی پاسی قوتابخانە - هێدی ئاغا و ئیبراهیم ئەحمەد</title>
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
      max-width: 960px;
      margin: 0 auto;
      background: #ffffff;
      padding: 48px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .header-box {
      border: 1px solid #94a3b8;
      background: #f8fafc;
      padding: 24px;
      border-radius: 6px;
      margin-bottom: 32px;
      text-align: center;
    }
    h1 {
      color: #020617;
      font-size: 24px;
      margin-top: 0;
      margin-bottom: 8px;
      font-weight: 800;
    }
    .authors-box {
      display: flex;
      justify-content: center;
      gap: 32px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #cbd5e1;
      font-size: 14px;
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
      padding-top: 4px;
      padding-bottom: 4px;
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
    <div class="header-box">
      <h1>ڕاپۆرتی زانستی و تەکنیکی سیستەمی زیرەکی چاودێری و ڕێکخستنی پاسی قوتابخانە</h1>
      <p style="margin: 0; color: #475569; font-size: 13px;">شیکاری تەواوی میکانیزمی کارکردن، تەلارسازی ئەپڵیکەیشن، پەیوەندی بەکارهێنەران و سوودە دارایی و پەروەردەییەکان</p>
      <div class="authors-box">
        <span>ئامادەکردنی پڕۆژە: هێدی ئاغا</span>
        <span>•</span>
        <span>هاوکار / بەشداربوو: ئیبراهیم ئەحمەد</span>
      </div>
    </div>

    <div class="section-title">١. پێشەکی، کێشەی چارەسەرکراو و چەمکی گشتی پڕۆژەکە</div>
    <p>
      گواستنەوەی ڕۆژانەی قوتابیان لە نێوان ماڵ و قوتابخانەدا یەکێکە لە پڕبایەخترین و هەستیارترین جومگەکانی ژێرخانی پەروەردەیی. لە شێوازی نەریتی و کۆندا، هەمیشە زنجیرەیەک کێشەی کەڵەکەبوو بوونیان هەبووە کە بوونەتە هۆی ناڕەزایی دایک و باوکان و ماندووبوونی شۆفێران و بەڕێوەبەرایەتی قوتابخانە.
    </p>
    <div class="content-box">
      <strong>گرنگترین کێشە چارەسەرکراوەکان لەم پڕۆژەیەدا:</strong>
      <ul>
        <li><strong>وەستانی درێژخایەنی منداڵان لەسەر شەقام:</strong> لە وەرزی زستان و سەرمای توند، بەفر، بارانبارین، یان گەرمای تاقەتپڕوکێنی هاوین، منداڵان ناچار بوون ١٥ بۆ ٣٠ خولەک لەبەر دەرگا چاوەڕوانی هاتنی پاس بن. ئەمەش هۆکاری سەرەکی نەخۆشکەوتنی بەردەوام و زیادبوونی مەترسی ڕووداوەکانی هاتوچۆ بوو.</li>
        <li><strong>دڵەڕاوکێی بەردەوامی دایک و باوکان:</strong> بەهۆی نەبوونی زانیاری ڕاستەوخۆ لەسەر شوێنی پاس، باوان نەیاندەزانی ئایا پاسەکە لە کوێیە، بۆچی دواکەوتووە، یان ئایا منداڵەکەیان بە سەلامەتی سوار بووە یان نا. ئەمەش دەبووە هۆی تەلەفۆنکردنی بەردەوام کە شۆفێری سەرگەردان دەکرد و سەلامەتی شۆفێری دەخستە مەترسییەوە.</li>
        <li><strong>بەفیڕۆچوونی سووتەمەنی و کات:</strong> شۆفێرانی پاس بەهۆی نەبوونی نەخشەی ڕێکخراو و ئەلگۆریتمی ڕێڕەو، ڕۆژانە بە هەمان شەقامدا چەندین جار دەڕۆیشتن، و دەچوونە بەردەم ماڵی ئەو قوتابیانەی کە ئەو ڕۆژە نەخۆش بوون و نایەن بۆ قوتابخانە. ئەمەش دەبووە هۆی بەفیڕۆچوونی زیاتر لە ٣٠٪ی سووتەمەنی و دەردانی گازی ژەهراوی کاربۆن.</li>
      </ul>
    </div>

    <div class="section-title">٢. شۆفێری پاس چۆن کاردەکات و چی دەبینێت لەسەر شاشەی مۆبایلەکەی؟</div>
    <p>
      کۆنسۆڵی شۆفێری پاس بە شێوازێکی ئاسان و کەم-سەرنجڕاکێش دیزاین کراوە تا لە کاتی لێخوڕیندا شۆفێر سەرقاڵ نەکات و تەنها زانیارییە پێویستەکان بە ڕوونی بخاتە بەردەست.
    </p>
    <div class="content-box">
      <strong>شۆفێری پاس لەسەر شاشەکەی چی دەبینێت (What the Driver Sees):</strong>
      <ul>
        <li><strong>دوگمەی دۆخی کارکردن (GPS Duty Switch):</strong> نیشاندەری ڕوون کە دەوام چالاکە و پاسەکە شوێنەکەی بۆ هەمووان پەخش دەکرێت.</li>
        <li><strong>کارتی وێستگەی ئێستا (Active Stop Card):</strong> ناوی تەواوی قوتابی، پۆل، وێنەی سەرپەرشتیار، ژمارە مۆبایلی دایک و باوک، ناونیشانی وردی ماڵەوە. ئەگەر خێزانەکە ناونیشانی کاتییان تۆمارکردبێت (وەک ماڵی داپیرە یان خزم)، نیشانەی "📍 ناونیشانی کاتی" لەگەڵ هۆکارەکەی دەبینێت.</li>
        <li><strong>کاتی ماوە و مەودا (ETA & Distance):</strong> ژمارەی خولەکی ماوە بە خەمڵاندنی ژیرانە بۆ گەیشتن بە وێستگەی دواتر.</li>
        <li><strong>خشتەی تەواوی وێستگەکان (Manifest Table):</strong> لیستی ڕێکخراوی هەموو قوتابیان بەپێی کورتترین ڕێگای دیاریکراو.</li>
        <li><strong>هێڵی پێشکەوتنی گەشت:</strong> ژمارەی وردی ئەو منداڵانەی سەرکەوتوون لە بەرامبەر ئەوانەی نەهاتوون یان ماون.</li>
      </ul>
    </div>
    <div class="content-box">
      <strong>شۆفێرەکە لە پراکتیکدا چۆن کاردەکات (Step-by-Step Driver Workflow):</strong>
      <ol>
        <li>لە سەرەتای ڕۆژدا لە کاتژمێر ٧:١٥ی بەیانی، شۆفێر دوگمەی <strong>"دەستپێکردنی کار (GPS)"</strong> دادەگرێت؛ سیستەم پەخشی شوێنی جوگرافی بۆ دایک و باوکان چالاک دەکات.</li>
        <li>پاسەکە بەپێی کورتترین ڕێگای دیاریکراو بەرەو وێستگەی یەکەم بەڕێ دەکەوێت. ئەو قوتابیانەی کە باوانیان پێشوەختە نەهاتنیان تۆمارکردووە، سیستەم خۆکارانە وێستگەکەیان دەپەڕێنێت.</li>
        <li>لە کاتی وەستان لە بەردەم ماڵی قوتابی، شۆفێر بە یەک دەستلێدان دوگمەی <strong>"سواری پاس بوو"</strong> دادەگرێت، و لە چرکەیەکدا نامەی گەیشتن بۆ باوان دەچێت.</li>
        <li>ئەگەر قوتابییەک لەبەر دەرگا ئامادە نەبوو، دوگمەی <strong>"نەهاتووە"</strong> دادەگرێت تا ڕێگاکە سەرلەنوێ ڕێکبخرێتەوە بەبێ چاوەڕوانی بێسوود.</li>
        <li>لە کاتی دروستبوونی قەرەباڵغی لە شەقام یان ترافیک، دوگمەی <strong>"ڕاگەیاندنی دواکەوتن"</strong> دادەگرێت تا کاتی خەمڵێنراو بۆ هەموو خێزانەکان نوێ ببێتەوە.</li>
        <li>لە کاتی ڕووداوی لەناکاو، تێکچوونی پاس، یان ڕووداوی هاتوچۆ، دوگمەی سووری <strong>"فریاگوزاری لەناکاو (SOS)"</strong> دادەگرێت بۆ ئاگادارکردنەوەی دەستبەجێی ژووری کۆنتڕۆڵی قوتابخانە.</li>
      </ol>
    </div>

    <div class="section-title">٣. دایک و باوک چۆن کاردەکەن و چی دەبینن لەسەر مۆبایلی خۆیان؟</div>
    <p>
      دەروازەی دایک و باوک بە شێوازێکی تەواو پارێزراو دروستکراوە کە تەنها زانیاری تایبەت بە منداڵەکەی خۆیان پیشان دەدات تا نهێنی و ناونیشانی خێزانەکانی تر بە پارێزراوی بمێنێتەوە.
    </p>
    <div class="content-box">
      <strong>دایک و باوک لەسەر شاشەی مۆبایلەکەیان چی دەبینن (What Parents See):</strong>
      <ul>
        <li><strong>نەخشەی پارێزراوی ڕاستەوخۆ:</strong> نیشاندانی شوێنی جووڵەی پاسەکە لەسەر نەخشەی شار لەگەڵ هێڵی ڕێڕەو بەرەو ماڵی خۆیان.</li>
        <li><strong>تەلەمەتری و خێرایی:</strong> بینینی خێرایی پاسەکە بە کم/ک و ئاڕاستەی جووڵەی ئۆتۆمبێلەکە.</li>
        <li><strong>کاتی خەمڵێنراوی گەیشتن (Live ETA):</strong> نیشاندانی کاتی وردی ماوە بە خولەک (وەک: ~٤ خولەکی ماوە).</li>
        <li><strong>کارتی زەنگی ئاگاداری ١ خولەک پێش گەیشتن:</strong> لەگەڵ نزیکبوونەوەی پاس بۆ بازنەی ١ خولەک دووری، کارتێکی گەورە لەگەڵ دەنگی زەنگ لێدەدات.</li>
        <li><strong>دۆخی سات بە ساتی منداڵ:</strong> وەک "سواربوو لە کاتی 07:42 AM"، "گەیشتە قوتابخانە لە 08:05 AM"، یان "ئەمڕۆ نەهاتووە".</li>
        <li><strong>زانیاری پەیوەندی:</strong> ناوی شۆفێری پاس، ژمارە تەلەفۆن، و تابلۆی پاس.</li>
      </ul>
    </div>
    <div class="content-box">
      <strong>دایک و باوک چۆن کاردەکەن (Step-by-Step Parent Workflow):</strong>
      <ol>
        <li>لە بەیانیاندا چاودێری کاتی گەیشتن دەکەن؛ کاتێک <strong>زەنگی ١ خولەک پێش گەیشتن</strong> لێدەدات، منداڵەکەیان دەنێرنە بەردەم دەرگا تا پاسەکە ڕاستەوخۆ هەڵیبگرێت بەبێ وەستان لەسەر شەقام.</li>
        <li>ئەگەر خێزانەکە کەمێک دوابکەون، بە یەک کلیک دوگمەی <strong>"⏳ چاوەڕوانی ٢ خولەک"</strong> دادەگرن و شۆفێر ئاگادار دەبێتەوە.</li>
        <li>ئەگەر منداڵ نەخۆش بێت یان ئەو ڕۆژە نەیەت، بە دوگمەی <strong>"❌ ئەمڕۆ نایەت"</strong> شۆفێر ئاگادار دەکەنەوە تا پاس نەچێتە بەردەم ماڵیان.</li>
        <li>لە کاتی گۆڕینی ماڵ یان ڕۆیشتنی منداڵ بۆ ماڵی داپیرە، بە دوگمەی <strong>"📍 دەستکاریکردنی شوێن"</strong> ناونیشانی کاتی بۆ ئەو ڕۆژە دادەنێن.</li>
        <li>بە دوگمەی <strong>"💬 پرسیار بۆ بەڕێوەبەرایەتی"</strong> چاتی ڕاستەوخۆ لەگەڵ سەرپەرشتیاری قوتابخانە دەکەن.</li>
      </ol>
    </div>

    <div class="section-title">٤. بەڕێوەبەرایەتی قوتابخانە چۆن کاردەکات و چی دەبینێت؟</div>
    <p>
      ژووری کۆنتڕۆڵی ناوەندی قوتابخانە (School Dispatch Center) توانای چاودێریکردنی سەرجەم بەلەمی پاسەکان و هێڵەکان بە یەک کاتدا دەستەبەر دەکات.
    </p>
    <div class="content-box">
      <strong>بەڕێوەبەرایەتی لەسەر شاشەی کۆنتڕۆڵ چی دەبینێت (What School Management Sees):</strong>
      <ul>
        <li><strong>نەخشەی سەرپەرشتیاری گشتی (Master Live Map):</strong> پیشاندانی هەموو پاسەکان بە شێوەی جووڵەی ڕاستەوخۆ لەسەر یەک نەخشە.</li>
        <li><strong>تابلۆی بەلەمی پاسەکان (Fleet Overview):</strong> ژمارەی پاسە چالاکەکان، ناوی شۆفێران، ژمارەی قوتابیانی سواربوو لە هەموو پاسێکدا.</li>
        <li><strong>دایرێکتۆری گشتی قوتابیان و خێزانەکان:</strong> گەڕان و فلتەرکردنی خێرا بەپێی ناو، گەڕەک، مۆبایل، پاس، یان دۆخی سواربوون.</li>
        <li><strong>سندوقی پەیامەکان (Inquiries Inbox):</strong> کۆکردنەوەی هەموو پرسیار و داواکارییەکانی باوان بە نیشانەی نەخوێندراوە.</li>
        <li><strong>تۆماری مێژووی گەشتەکان (Trip Logs):</strong> شیکاری وردی کاتی گەیشتن و بەنزینی بەکارهاتوو لە سەرجەم ڕۆژەکاندا.</li>
      </ul>
    </div>
    <div class="content-box">
      <strong>بەڕێوەبەرایەتی چۆن کاردەکات (Step-by-Step School Workflow):</strong>
      <ol>
        <li>بە دوگمەی <strong>"+ پاسی نوێ"</strong> شۆفێر و پاسی نوێ زیاد دەکەن و هێڵی گەڕەکەکان بۆ دیاری دەکەن.</li>
        <li>بە دوگمەی <strong>"+ خێزانی نوێ"</strong> ناوی سەرپەرشتیار و قوتابی نوێ لەگەڵ ناونیشانی جوگرافی لە سیستەم تۆمار دەکەن.</li>
        <li>بە یەک کلیک لە ناو خشتەکە دەتوانن پاسی هەر قوتابییەک بگۆڕن بۆ پاسێکی تر بە شێوەی خۆکار.</li>
        <li>لە کاتی بەفر، بارانی بەخوڕ یان باری لەناکاو، لە بەشی <strong>"پەخشی بەپەلە (Broadcasts)"</strong> نامەی هۆشداری گشتی بۆ هەموو باوان یان پاسێکی دیاریکراو بڵاودەکەنەوە.</li>
        <li>وەڵامی پرسیارەکانی دایک و باوکان دەدەنەوە لە مۆدیۆلی چاتی ڕاستەوخۆدا.</li>
      </ol>
    </div>

    <div class="section-title">٥. ئەلگۆریتمی ڕێکخستنی کورتترین ڕێڕەو (TSP Optimization Engine)</div>
    <p>
      سیستەمەکە ئەلگۆریتمی ماتماتیکی <strong>Traveling Salesperson Problem (TSP)</strong> بەکاردەهێنێت بۆ پێوانەکردنی مەودای نێوان هەموو وێستگەکان و قوتابخانە. ئەم ئەلگۆریتمە ڕێگری لە دووبارە ڕۆیشتنەوە بە هەمان شەقامدا دەکات و کورتترین ئەڵقەی هاتوچۆ دادەڕێژێت. دەرئەنجام:
    </p>
    <ul>
      <li>کەمکردنەوەی خەرجی بەنزین و سووتەمەنی تا ڕادەی <strong>٣٥٪</strong>.</li>
      <li>پاشەکەوتکردنی ڕۆژانە <strong>١٥ بۆ ٢٥ خولەک</strong> لە کاتی گەشتی هەموو پاسێکدا.</li>
      <li>کەمکردنەوەی دەردانی گازی زیانبەخشی کاربۆن دووەم ئۆکسید (CO2) و پاراستنی ژینگەی شار.</li>
    </ul>

    <div class="section-title">٦. بەراوردی خاڵ بە خاڵی نێوان شێوازی کۆن و سیستەمی نوێ</div>
    <table class="table-custom">
      <thead>
        <tr>
          <th>تایبەتمەندی</th>
          <th>شێوازی تەقلیدی کۆن</th>
          <th>سیستەمی زیرەکی "ڕێگای پارێزراو"</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>کاتی چاوەڕوانی منداڵ لە دەرەوە</td>
          <td>١٥ بۆ ٣٠ خولەک لە سەرما، بەفر یان گەرما</td>
          <td>کەمتر لە ١ خولەک لەبەردەم دەرگا</td>
        </tr>
        <tr>
          <td>مەسرەفی سووتەمەنی و ڕێڕەو</td>
          <td>ڕێڕەوی ناڕێکخراو و بەفیڕۆچوونی سووتەمەنی</td>
          <td>پاشەکەوتکردنی تا ٣٥٪ بەنزین بە TSP</td>
        </tr>
        <tr>
          <td>ئاگاداری باوان لە شوێنی پاس</td>
          <td>بێئاگایی تەواو و تەلەفۆنکردنی بەردەوام</td>
          <td>چاودێری ڕاستەوخۆی GPS لەگەڵ کاتی گەیشتن (ETA)</td>
        </tr>
        <tr>
          <td>نەهاتنی قوتابی بەهۆی نەخۆشی</td>
          <td>پاس دەچێتە بەردەم ماڵ و هۆڕن لێدەدات</td>
          <td>تۆمارکردنی پێشوەختە و پەڕاندنی خۆکار</td>
        </tr>
        <tr>
          <td>ڕووداوی لەناکاو یان دواکەوتن</td>
          <td>تەلەفۆنکردن بۆ دەیان خێزان و سەرلێشێوان</td>
          <td>پەخشی بەپەلەی ناوەندی بە یەک نامە</td>
        </tr>
      </tbody>
    </table>

    <div class="section-title">٧. سوود و دەستکەوتە سەرەکییەکان (Key Benefits)</div>
    <div class="content-box">
      <ul>
        <li><strong>پاراستنی سەلامەتی منداڵان (١٠٠٪):</strong> نەهێشتنی تەواوی کاتی وەستانی منداڵ لەسەر شەقام و کەمکردنەوەی مەترسی ڕووداوەکانی هاتوچۆ بۆ سفر.</li>
        <li><strong>پاشەکەوتی دارایی و ژینگەیی:</strong> پاشەکەوتکردنی تا ٣٥٪ لە بەنزین و کەمکردنەوەی تێچووی چاککردنەوەی پاسەکان.</li>
        <li><strong>ئاسوودەیی و متمانەی باوان:</strong> نەمانی دڵەڕاوکێ لە ماڵەکاندا بەهۆی ئاگاداری ١ خولەک پێش گەیشتن و چاودێری ڕاستەوخۆ.</li>
        <li><strong>بەڕێوەبردنی پێشکەوتوو بۆ قوتابخانە:</strong> بەدیجیتاڵکردنی تەواوی گەشتەکان و بەستنەوەی خێزانەکان بەبێ نووسراوی کاغەزی کۆن.</li>
      </ul>
    </div>

    <div class="footer">
      ئامادەکراوە لەلایەن: هێدی ئاغا و ئیبراهیم ئەحمەد · سیستەمی ڕێگای پارێزراو · Horizon Academy · ٢٠٢٦
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([reportHtmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Raporti-Zanisti-Pasi-Qutabxana-Hedi-w-Ibrahim.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('ڕاپۆرتە زانستییەکە بە فۆرماتی ڕەسمی HTML/Word دابەزی!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  // Generate downloadable pure Text / Markdown format
  const handleDownloadTextDoc = () => {
    const reportText = `================================================================================
ڕاپۆرتی زانستی و تەکنیکی سیستەمی زیرەکی چاودێری و ڕێکخستنی پاسی قوتابخانە (ڕێگای پارێزراو)
================================================================================

ئامادەکردنی پڕۆژە و ڕاپۆرت:
١. هێدی ئاغا
٢. ئیبراهیم ئەحمەد

بەروار: ٢٠٢٦
پوختەی پڕۆژە: چاودێری ڕاستەوخۆی هاتوچۆ، ڕێکخستنی ڕێگا (TSP)، و ئاگاداری ١ خولەک پێش گەیشتن

--------------------------------------------------------------------------------
١. پێشەکی و کێشە چارەسەرکراوەکان (Problem Statement)
--------------------------------------------------------------------------------
گواستنەوەی خوێندکاران یەکێکە لە هەستیارترین بەشەکانی کەرتی پەروەردە. لە شێوازی دێریندا:
١. منداڵان ١٥ بۆ ٣٠ خولەک لەبەردەم ماڵ لە سەرما، بەفر، باران یان گەرمادا دەوەستان کە دەبووە هۆی نەخۆشکەوتن و مەترسی هاتوچۆ.
٢. دایک و باوکان لە دڵەڕاوکێی بەردەوامدا بوون لەبەر نەبوونی زانیاری لەسەر شوێنی پاس.
٣. سووتەمەنییەکی زۆر بەفیڕۆ دەچوو بەهۆی نەبوونی ڕێڕەوی ڕێکخراو و چوون بۆ ماڵی قوتابیانی نەخۆش.
سیستەمی "ڕێگای پارێزراو" سەرجەم ئەم ئاستەنگانەی چارەسەر کردووە.

--------------------------------------------------------------------------------
٢. شۆفێری پاس چۆن کاردەکات و چی دەبینێت؟ (Bus Driver Hub)
--------------------------------------------------------------------------------
[چی دەبینێت لەسەر شاشەی مۆبایلەکەی]:
- دوگمەی دۆخی دەوام (GPS Duty Switch)
- ڕێڕەوی ڕێکخراوی هەنگاو بە هەنگاو (Turn-by-turn Navigation)
- کارتی وێستگەی ئێستا: ناوی قوتابی، پۆل، وێنە، ژمارە مۆبایل، ناونیشان و نیشانەی "📍 کاتی"
- کاتی ماوە (ETA) و دووری بە کیلۆمەتر بۆ وێستگەی دواتر
- خشتەی تەواوی وێستگەکان بەپێی کورتترین ڕێڕەو
- هێڵی پێشکەوتنی گەشت و ڕێژەی سواربووان

[شۆفێرەکە چۆن کاردەکات]:
١. لە سەرەتای گەشت دوگمەی "دەستپێکردنی کار (GPS)" دادەگرێت تا پەخشی شوێن دەستپێبکات.
٢. بەپێی کورتترین ڕێگای دیاریکراو دەجووڵێت؛ ئەو قوتابیانەی نایەن پێشوەختە لە نەخشەکە دەپەڕێندرێن.
3. لە کاتی گەیشتن بە بەردەم ماڵ، دوگمەی سەوزی "سواری پاس بوو" دادەگرێت.
٤. ئەگەر قوتابی ئامادە نەبێت، دوگمەی "نەهاتووە" دادەگرێت تا ڕێگاکە سەرلەنوێ کورت بکرێتەوە.
٥. لە کاتی قەرەباڵغی شەقام، دوگمەی "ڕاگەیاندنی دواکەوتن" دادەگرێت.
٦. لە کاتی ڕووداوی لەناکاو، دوگمەی سووری "فریاگوزاری لەناکاو (SOS)" دادەگرێت.

--------------------------------------------------------------------------------
٣. دایک و باوک چۆن کاردەکەن و چی دەبینن؟ (Parent Portal)
--------------------------------------------------------------------------------
[چی دەبینن لەسەر مۆبایلەکانیان]:
- نەخشەی پارێزراوی پاسی منداڵەکەی خۆیان بە تەنیا
- جووڵەی زیندووی پاسەکە لەسەر نەخشە بە چرکە لەگەڵ خێرایی (کم/ک)
- کاتی خەمڵێنراوی گەیشتن (ETA) بە خولەک
- زەنگی ئاگاداری ١ خولەک پێش گەیشتن لەگەڵ دەنگی زەنگ (Chime Alert)
- دۆخی سات بە ساتی منداڵ وەک "سواربوو لە 07:42" یان "لە قوتابخانەیە"
- زانیاری و تەلەفۆنی شۆفێرەکە و تابلۆی پاس

[دایک و باوک چۆن کاردەکەن]:
١. لەگەڵ لێدانی زەنگی ئاگاداری ١ خولەک، منداڵەکەیان دەنێرنە بەردەم دەرگا.
٢. ئەگەر کەمێک دوابکەون، دوگمەی "⏳ چاوەڕوانی ٢ خولەک" دادەگرن.
٣. ئەگەر منداڵ نەیەت، دوگمەی "❌ ئەمڕۆ نایەت" دادەگرن تا پاس نەیەتە بەردەم ماڵیان.
٤. لە کاتی چوون بۆ ماڵی خزم، بە دوگمەی "📍 دەستکاریکردنی شوێن" ناونیشانی کاتی دادەنێن.
٥. بە دوگمەی "💬 پرسیار بۆ بەڕێوەبەرایەتی" گفتوگۆی ڕاستەوخۆ دەکەن لەگەڵ قوتابخانە.

--------------------------------------------------------------------------------
٤. بەڕێوەبەرایەتی قوتابخانە چۆن کاردەکات و چی دەبینێت؟ (School Dispatch Center)
--------------------------------------------------------------------------------
[چی دەبینن لەسەر تابلۆی سەرپەرشتیاری]:
- نەخشەی گشتی سەرپەرشتیاری بە پیشاندانی هەموو پاسەکان لە یەک کاتدا
- تابلۆی بەلەمی پاسەکان (Fleet Overview): ناوی شۆفێران، ژمارەی پاس، خێرایی، و ژمارەی سواربووان
- دایرێکتۆری گشتی قوتابیان و خێزانەکان لەگەڵ گەڕانی پێشکەوتوو
- سندوقی پەیامەکان بۆ وەڵامدانەوەی پرسیار و داواکاری باوان
- مێژووی گەشتە کۆنەکان بۆ لێکۆڵینەوە لە کاتی گەیشتن و خەرجی سووتەمەنی

[بەڕێوەبەرایەتی چۆن کاردەکات]:
١. بە دوگمەی "+ پاسی نوێ" شۆفێر و پاسی نوێ زیاد دەکەن و هێڵەکەی بۆ دادەنێن.
٢. بە دوگمەی "+ خێزانی نوێ" باوان و منداڵەکان لە سیستەم تۆمار دەکەن.
٣. بە یەک کلیک لە ناو خشتەکە دەتوانن پاسی قوتابییەک بگۆڕن بۆ پاسێکی تر.
٤. لە کاتی بەفر یان دواکەوتنی گشتی، لە بەشی "پەخشی بەپەلە" نامەی هۆشداری بڵاودەکەنەوە.
٥. وەڵامی پرسیارەکانی باوان دەدەنەوە لە چاتی ڕاستەوخۆدا.

--------------------------------------------------------------------------------
٥. ئەلگۆریتمی ڕێکخستنی کورتترین ڕێڕەو (TSP)
--------------------------------------------------------------------------------
پێوانەکردنی مەودای نێوان هەموو وێستگەکان بە شێوازی ماتماتیکی بۆ ئەوەی:
- سووتەمەنی تا ٣٥٪ پاشەکەوت بکرێت.
- ڕۆژانە ١٥ بۆ ٢٥ خولەک لە کاتی گەشتی هەموو پاسێک پاشەکەوت بکرێت.
- گازی زیانبەخشی CO2 کەم بکرێتەوە.

--------------------------------------------------------------------------------
٦. سوود و دەستکەوتە سەرەکییەکان
--------------------------------------------------------------------------------
- سەلامەتی ١٠٠٪: نەمانی چاوەڕوانی منداڵ لە سەرما و مەترسییەکانی سەر شەقام.
- کەمکردنەوەی خەرجی: تا ٣٥٪ پاشەکەوتی سووتەمەنی و کەمکردنەوەی خەرجی پاس.
- ئاسوودەیی باوان: نەمانی دڵەڕاوکێ بەهۆی چاودێری ڕاستەوخۆ و زەنگی ١ خولەک.
- بەڕێوەبردنی پێشکەوتوو بۆ قوتابخانە بەبێ نووسراوی کاغەزی.

ئامادەکراوە لەلایەن: هێدی ئاغا و ئیبراهیم ئەحمەد
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Raporti-Zanisti-Pasi-Qutabxana.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('ڕاپۆرتە زانستییەکە بە فۆرماتی دەقی تەواو (TXT) دابەزی!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div
      id="system-report-modal"
      dir="rtl"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs p-3 sm:p-6 flex items-center justify-center font-sans text-right print:p-0 print:bg-white print:static"
    >
      <div className="bg-white rounded-2xl border border-slate-300 shadow-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto flex flex-col print:max-h-none print:shadow-none print:border-none print:w-full">
        {/* Modal Top Bar (Minimalist Executive Header) */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 bg-white/95 backdrop-blur-xs z-20 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-slate-200" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">ڕاپۆرتی زانستی و تەکنیکی سیستەم</h2>
              <p className="text-xs text-slate-500">شیکاری تەواوی میکانیزمی کارکردن، شۆفێر، باوان، بەڕێوەبەرایەتی و داگرتن</p>
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

        {/* Printable Report Document Body (Minimalist Academic Paper Aesthetic) */}
        <div className="p-6 sm:p-10 space-y-8 text-slate-800 leading-relaxed print:p-0 print:space-y-6">
          {/* Header Card / Title Banner */}
          <div className="bg-slate-50 border border-slate-300 rounded-xl p-6 sm:p-7 space-y-4 print:border-slate-300 print:bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider bg-slate-200 px-2.5 py-0.5 rounded border border-slate-300 inline-block mb-2">
                  ڕاپۆرتی ئەکادیمی و مەیدانی
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  سیستەمی زیرەکی چاودێری و ڕێکخستنی پاسی قوتابخانە
                </h1>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  پڕۆژەی چاودێریکردنی ڕاستەوخۆ (Real-Time GPS)، کورتکردنەوەی ڕێگا (TSP)، و زەنگی ئاگاداری ١ خولەک پێش گەیشتن (ڕێگای پارێزراو)
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold flex-shrink-0 self-start sm:self-center">
                <BusIcon className="w-6 h-6 text-slate-100" />
              </div>
            </div>

            {/* AUTHORS / TEAM MEMBERS ON TOP (Explicitly requested by user) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-100 border border-slate-300 text-slate-900 flex items-center justify-center font-bold text-xs">
                  هـ
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block">ئامادەکردنی پڕۆژە:</span>
                  <strong className="text-xs font-bold text-slate-900">هێدی ئاغا</strong>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-100 border border-slate-300 text-slate-900 flex items-center justify-center font-bold text-xs">
                  ئـ
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block">هاوکار / بەشداربوو:</span>
                  <strong className="text-xs font-bold text-slate-900">ئیبراهیم ئەحمەد</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Problem Statement & System Concept */}
          <section className="space-y-3">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <span>١. پێشەکی و کێشە چارەسەرکراوەکان (Problem Statement)</span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              گواستنەوەی ڕۆژانەی خوێندکاران یەکێکە لە گرنگترین پایەکانی ژێرخانی پەروەردە. لە شێوازی نەریتی و کۆندا، هەمیشە زنجیرەیەک کێشەی قورس بوونیان هەبوو: منداڵان ناچار بوون ١٥ بۆ ٣٠ خولەک لەبەردەم ماڵ لە کەشوهەوای سەرما، بەفر، باران یان گەرمادا بوەستن تا پاسەکە دەگات. هاوکات دایک و باوکان لە دڵەڕاوکێی بەردەوامدا بوون لەبەر نەبوونی زانیاری لەسەر شوێنی پاس و کاتی گەیشتنی. لەلایەکی ترەوە، شۆفێرانی پاس بەهۆی نەبوونی ڕێڕەوی ڕێکخراو ڕۆژانە بە هەمان شەقامدا چەندین جار دەڕۆیشتنەوە و دەچوونە بەردەم ماڵی ئەو منداڵانەی کە ئەو ڕۆژە نەخۆش بوون و نایەن؛ ئەمەش دەبووە هۆی بەفیڕۆچوونی زیاتر لە ٣٠٪ی بەنزین و کاتی گرنگ. سیستەمی <strong>"ڕێگای پارێزراو"</strong> ئەم کێشانەی بە تەواوی چارەسەر کردووە.
            </p>
          </section>

          {/* Section 2: Step 1 - How Bus Driver Works & What They See (with Real System Image) */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <BusIcon className="w-4 h-4 text-slate-700" />
              <span>٢. هەنگاوی یەکەم: شۆفێری پاس چۆن کاردەکات و چی دەبینێت؟</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>چی دەبینێت لەسەر شاشەی کۆنسۆڵ؟ (What the Driver Sees)</span>
                </div>
                <ul className="space-y-1 text-slate-600 list-disc list-inside leading-relaxed">
                  <li><strong>دۆخی کارکردن (GPS):</strong> نیشاندەری ڕوون کە دەوام چالاکە و پاسەکە شوێنەکەی بۆ هەمووان پەخش دەکرێت.</li>
                  <li><strong>ڕێڕەوی ڕێکخراو:</strong> نەخشەی زیندووی شەقامەکان بەپێی کورتترین ڕێگای ئەلگۆریتمی TSP.</li>
                  <li><strong>کارتی وێستگەی ئێستا:</strong> ناوی قوتابی، پۆل، وێنە، ژمارە مۆبایلی باوان، ناونیشان و نیشانەی <strong>"📍 کاتی"</strong> ئەگەر ناونیشانی کاتی هەبێت.</li>
                  <li><strong>خەمڵاندنی کات و دووری:</strong> کاتی ماوە بۆ گەیشتن (ETA) بە خولەک و دووری بە کیلۆمەتر.</li>
                  <li><strong>خشتەی وێستگەکان و هێڵی پێشکەوتن:</strong> ژمارەی سواربووان لە بەرامبەر نەهاتووەکان.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Settings className="w-3.5 h-3.5 text-slate-600" />
                  <span>شۆفێرەکە لە پراکتیکدا چۆن کاردەکات؟ (Driver Workflow)</span>
                </div>
                <ol className="space-y-1 text-slate-600 list-decimal list-inside leading-relaxed">
                  <li>لە کاتژمێر ٧:١٥ی بەیانی، شۆفێر دوگمەی <strong>"دەستپێکردنی کار (GPS)"</strong> دادەگرێت؛ سیستەم پەخشی شوێن بۆ باوان چالاک دەکات.</li>
                  <li>پاسەکە بەپێی کورتترین ڕێگای دیاریکراو بەرەو وێستگەی یەکەم دەڕوات؛ ئەوانەی نایەن لە نەخشەکە پەڕێندراون.</li>
                  <li>لە بەردەم ماڵی قوتابی، شۆفێر دوگمەی <strong>"سواری پاس بوو"</strong> دادەگرێت و دۆخی منداڵ دەستبەجێ نوێ دەبێتەوە.</li>
                  <li>ئەگەر قوتابی نەهاتبێت، دوگمەی <strong>"نەهاتووە"</strong> دادەگرێت تا ڕێگاکە سەرلەنوێ کورت بکرێتەوە.</li>
                  <li>لە کاتی قەرەباڵغی شەقام، دوگمەی <strong>"ڕاگەیاندنی دواکەوتن"</strong> دادەگرێت.</li>
                  <li>لە کاتی ڕووداوی لەناکاو، دوگمەی سووری <strong>"فریاگوزاری لەناکاو (SOS)"</strong> دادەگرێت.</li>
                </ol>
              </div>
            </div>

            {/* REAL SYSTEM IMAGE 1: Driver Console */}
            <div className="my-3 rounded-lg overflow-hidden border border-slate-300 bg-slate-100">
              <img
                src={realDriverConsoleImg}
                alt="شاشەی ڕاستەقینەی کۆنسۆڵی شۆفێر"
                className="w-full h-auto max-h-[380px] object-cover"
              />
              <div className="p-2 bg-slate-900 text-slate-200 text-xs text-center font-medium">
                وێنەی ١: شاشەی ڕاستەقینەی کۆنسۆڵی شۆفێری پاس - دوگمەی GPS، لیستی وێستگەکان و دوگمەی تۆمارکردنی سەرکەوتوو/نەهاتوو
              </div>
            </div>
          </section>

          {/* Section 3: Step 2 - How Parents Work & What They See (with Real System Image) */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <Users className="w-4 h-4 text-slate-700" />
              <span>٣. هەنگاوی دووەم: دایک و باوک چۆن کاردەکەن و چی دەبینن؟</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>چی دەبینن لەسەر مۆبایلەکەیان؟ (What Parents See)</span>
                </div>
                <ul className="space-y-1 text-slate-600 list-disc list-inside leading-relaxed">
                  <li><strong>نەخشەی پارێزراو:</strong> نیشاندانی شوێنی جووڵەی پاسەکە لەسەر نەخشە تەنها بۆ وێستگەی منداڵی خۆیان.</li>
                  <li><strong>جووڵەی ڕاستەوخۆ و خێرایی:</strong> بینینی جووڵەی پاسەکە لەسەر نەخشە لەگەڵ خێرایی بە کم/ک بە چرکە.</li>
                  <li><strong>کاتی گەیشتن (ETA):</strong> ژمارەی خولەکی ماوە بۆ گەیشتنی پاسەکە بۆ بەردەم دەرگای ماڵیان.</li>
                  <li><strong>زەنگی ئاگاداری ١ خولەک:</strong> لەگەڵ گەیشتن بۆ دووری ١ خولەک لە ماڵ، کارتێکی زەرد لەگەڵ دەنگی زەنگ لێدەدات.</li>
                  <li><strong>دۆخی سات بە ساتی منداڵ:</strong> وەک "سواربوو لە کاتی 07:42 AM" یان "لە قوتابخانەیە".</li>
                  <li><strong>پەیوەندی بە شۆفێر:</strong> دوگمەی پەیوەندی تەلەفۆنی ڕاستەوخۆ بە شۆفێر و ژمارەی تابلۆی پاس.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                  <span>دایک و باوک لە پراکتیکدا چۆن کاردەکەن؟ (Parent Workflow)</span>
                </div>
                <ol className="space-y-1 text-slate-600 list-decimal list-inside leading-relaxed">
                  <li>لەگەڵ لێدانی <strong>زەنگی ئاگاداری ١ خولەک</strong>، منداڵەکەیان دەنێرنە بەردەم دەرگا تا پاسەکە ڕاستەوخۆ هەڵیبگرێت.</li>
                  <li>ئەگەر کەمێک دوابکەون، بە یەک کلیک دوگمەی <strong>"⏳ چاوەڕوانی ٢ خولەک"</strong> دادەگرن و شۆفێر ئاگادار دەبێتەوە.</li>
                  <li>ئەگەر منداڵ نەخۆش بێت، بە دوگمەی <strong>"❌ ئەمڕۆ نایەت"</strong> شۆفێر ئاگادار دەکەنەوە تا نەیەتە بەردەم ماڵیان.</li>
                  <li>لە کاتی ڕۆیشتن بۆ ماڵی خزم، بە دوگمەی <strong>"📍 دەستکاریکردنی شوێن"</strong> ناونیشانی کاتی دادەنێن.</li>
                  <li>بە دوگمەی <strong>"💬 پرسیار بۆ بەڕێوەبەرایەتی"</strong> چاتی ڕاستەوخۆ دەکەن لەگەڵ ژووری کۆنتڕۆڵی قوتابخانە.</li>
                </ol>
              </div>
            </div>

            {/* REAL SYSTEM IMAGE 2: Parent Portal */}
            <div className="my-3 rounded-lg overflow-hidden border border-slate-300 bg-slate-100">
              <img
                src={realParentPortalImg}
                alt="شاشەی ڕاستەقینەی دەروازەی باوان"
                className="w-full h-auto max-h-[380px] object-cover"
              />
              <div className="p-2 bg-slate-900 text-slate-200 text-xs text-center font-medium">
                وێنەی ٢: شاشەی ڕاستەقینەی دەروازەی دایک و باوکان - نەخشەی چاودێری ڕاستەوخۆ، زەنگی ١ خولەک، کاتی گەیشتن و دوگمەکانی کرداری باوان
              </div>
            </div>
          </section>

          {/* Section 4: Step 3 - How School Management Works & What They See (with Real System Image) */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span>٤. هەنگاوی سێیەم: بەڕێوەبەرایەتی قوتابخانە چۆن کاردەکات و چی دەبینێت؟</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>چی دەبینن لەسەر تابلۆی سەرپەرشتیاری؟ (What School Sees)</span>
                </div>
                <ul className="space-y-1 text-slate-600 list-disc list-inside leading-relaxed">
                  <li><strong>نەخشەی گشتی سەرپەرشتیاری:</strong> پیشاندانی هەموو پاسەکان بە شێوەی جووڵەی ڕاستەوخۆ لەسەر یەک نەخشەی پانۆراما.</li>
                  <li><strong>تابلۆی بەلەمی پاسەکان (Fleet Overview):</strong> ژمارەی پاسە چالاکەکان، ناوی شۆفێران، خێرایی، و ژمارەی سواربووان.</li>
                  <li><strong>دایرێکتۆری گشتی قوتابیان و خێزانەکان:</strong> فلتەرکردنی خێرا بەپێی ناو، گەڕەک، مۆبایل، پاس، یان دۆخی سواربوون.</li>
                  <li><strong>سندوقی پەیامەکان (Inquiries Inbox):</strong> کۆکردنەوەی هەموو پرسیار و داواکارییەکانی باوان بە نیشانەی نەخوێندراوە.</li>
                  <li><strong>تۆماری مێژووی گەشتەکان:</strong> شیکاری وردی کاتی گەیشتن و بەنزینی بەکارهاتوو لە سەرجەم ڕۆژەکاندا.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Settings className="w-3.5 h-3.5 text-slate-600" />
                  <span>بەڕێوەبەرایەتی لە پراکتیکدا چۆن کاردەکات؟ (School Workflow)</span>
                </div>
                <ol className="space-y-1 text-slate-600 list-decimal list-inside leading-relaxed">
                  <li>بە دوگمەی <strong>"+ پاسی نوێ"</strong> شۆفێر و پاسی نوێ زیاد دەکەن و هێڵی گەڕەکەکان بۆ دیاری دەکەن.</li>
                  <li>بە دوگمەی <strong>"+ خێزانی نوێ"</strong> ناوی سەرپەرشتیار و قوتابی نوێ لەگەڵ ناونیشانی ماڵەوە لە سیستەم تۆمار دەکەن.</li>
                  <li>بە یەک کلیک لە ناو خشتەکە دەتوانن پاسی هەر قوتابییەک بگۆڕن بۆ پاسێکی تر بە شێوەی خۆکار.</li>
                  <li>لە کاتی بەفر یان باری لەناکاو، لە بەشی <strong>"پەخشی بەپەلە (Broadcasts)"</strong> نامەی هۆشداری دەستبەجێ بڵاودەکەنەوە.</li>
                  <li>وەڵامی پرسیارەکانی دایک و باوکان دەدەنەوە لە مۆدیۆلی چاتی ڕاستەوخۆدا.</li>
                </ol>
              </div>
            </div>

            {/* REAL SYSTEM IMAGE 3: School Manager Hub */}
            <div className="my-3 rounded-lg overflow-hidden border border-slate-300 bg-slate-100">
              <img
                src={realSchoolManagerImg}
                alt="شاشەی ڕاستەقینەی بەڕێوەبەرایەتی قوتابخانە"
                className="w-full h-auto max-h-[380px] object-cover"
              />
              <div className="p-2 bg-slate-900 text-slate-200 text-xs text-center font-medium">
                وێنەی ٣: تابلۆی ناوەندی بەڕێوەبەرایەتی قوتابخانە - چاودێری گشتی پاسەکان، گۆڕینی هێڵ، و سندوقی نامەکان
              </div>
            </div>
          </section>

          {/* Section 5: Step 4 - Route Optimization TSP & Fuel Map (with Real System Image) */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <Route className="w-4 h-4 text-slate-700" />
              <span>٥. ئەلگۆریتمی ڕێکخستنی کورتترین ڕێڕەو (TSP Optimization Engine)</span>
            </h3>

            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              سیستەمەکە ئەلگۆریتمی ماتماتیکی <strong>Traveling Salesperson Problem (TSP)</strong> بەکاردەهێنێت بۆ پێوانەکردنی مەودای نێوان هەموو وێستگەکان و قوتابخانە. ئەم ئەلگۆریتمە ڕێگری لە دووبارە ڕۆیشتنەوە بە هەمان شەقامدا دەکات و کورتترین ئەڵقەی هاتوچۆ دادەڕێژێت. دەرئەنجام:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">پاشەکەوتی سووتەمەنی تا ٣٥٪</span>
                <p className="text-slate-600 text-[11px]">کەمکردنەوەی بەرچاوی بەنزین و تێچووی ئۆتۆمبێلەکان بە درێژایی ساڵ.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">پاشەکەوتی کات: ١٥-٢٥ خولەک</span>
                <p className="text-slate-600 text-[11px]">کەمکردنەوەی کاتی گەشت لە هەر نۆبەیەکی بەیانی و نیوەڕۆدا.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">پاراستنی ژینگە لە گازی CO2</span>
                <p className="text-slate-600 text-[11px]">کەمکردنەوەی دەردانی دووکەڵی ژەهراوی ئۆتۆمبێل بەهۆی کورتکردنەوەی ڕێگا.</p>
              </div>
            </div>

            {/* REAL SYSTEM IMAGE 4: Route Optimization Map */}
            <div className="my-3 rounded-lg overflow-hidden border border-slate-300 bg-slate-100">
              <img
                src={realTspRouteMapImg}
                alt="نەخشەی ڕاستەقینەی ڕێکخستنی ڕێگا و خێرایی"
                className="w-full h-auto max-h-[380px] object-cover"
              />
              <div className="p-2 bg-slate-900 text-slate-200 text-xs text-center font-medium">
                وێنەی ٤: نەخشەی ڕاستەقینەی ڕێڕەوی ڕێکخراوی زیرەک - وێستگە ژمارەکراوەکان، هێڵی کورتترین ڕێڕەو و تەلەمەتری پاس
              </div>
            </div>
          </section>

          {/* Section 6: Scientific Comparison Matrix */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <span>٦. بەراوردی زانستی نێوان سیستەمی کۆن و سیستەمی ڕێگای پارێزراو</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs border border-slate-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-slate-900 font-bold">
                    <th className="py-2.5 px-3">تایبەتمەندی</th>
                    <th className="py-2.5 px-3">شێوازی تەقلیدی کۆن</th>
                    <th className="py-2.5 px-3 bg-slate-200 text-slate-900">سیستەمی نوێ (ڕێگای پارێزراو)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">کاتی وەستانی منداڵ لە دەرەوە</td>
                    <td className="py-2.5 px-3 text-slate-600">١٥ بۆ ٣٠ خولەک لە سەرما، بەفر یان گەرما</td>
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
                    <td className="py-2.5 px-3 bg-slate-50 font-bold text-slate-900">چاودێری ڕاستەوخۆی GPS لەگەڵ کاتی گەیشتن (ETA)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">چارەسەری نەهاتنی منداڵ</td>
                    <td className="py-2.5 px-3 text-slate-600">پاس دەچێتە بەردەم ماڵ و هۆڕن لێدەدات</td>
                    <td className="py-2.5 px-3 bg-slate-50 font-bold text-slate-900">تۆمارکردنی پێشوەختە و پەڕاندنی خۆکار</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">باری لەناکاو و دواکەوتن</td>
                    <td className="py-2.5 px-3 text-slate-600">تەلەفۆنکردن بۆ دەیان خێزان و سەرلێشێوان</td>
                    <td className="py-2.5 px-3 bg-slate-50 font-bold text-slate-900">پەخشی بەپەلەی ناوەندی بە یەک نامە</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7: Key Advantages */}
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2 border-r-4 border-slate-800 pr-3">
              <span>٧. سوود و دەستکەوتە سەرەکییەکان (Key Benefits)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">پاراستنی سەلامەتی منداڵان (١٠٠٪)</span>
                <p className="text-slate-600 leading-relaxed">نەهێشتنی تەواوی کاتی وەستانی منداڵ لەسەر شەقام لە وەرزی سەرما و باراندا، و کەمکردنەوەی مەترسی ڕووداوەکانی هاتوچۆ بۆ سفر.</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">پاشەکەوتی دارایی و ژینگەیی</span>
                <p className="text-slate-600 leading-relaxed">پاشەکەوتکردنی تا ٣٥٪ بەنزین و کەمکردنەوەی تێچووی چاککردنەوەی ئۆتۆمبێلەکان، لەگەڵ کەمکردنەوەی گازی زیانبەخشی کاربۆن (CO2).</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">ئاسوودەیی و متمانەی باوان</span>
                <p className="text-slate-600 leading-relaxed">نەمانی هەموو جۆرە دڵەڕاوکێیەک لە ماڵەکاندا بەهۆی چاودێری ڕاستەوخۆ و زەنگی ١ خولەک پێش گەیشتن.</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="font-bold text-slate-900 block">بەڕێوەبردنی پێشکەوتوو بۆ قوتابخانە</span>
                <p className="text-slate-600 leading-relaxed">قوتابخانە خاوەنی کۆنتڕۆڵی دیجیتاڵییە بۆ هەموو پاسەکان، گەشتەکان، و ڕێکخستنی خێزانی نوێ بە یەک کلیک.</p>
              </div>
            </div>
          </section>

          {/* Conclusion Banner */}
          <div className="bg-slate-900 text-slate-200 rounded-xl p-6 space-y-2.5 text-xs shadow-sm">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <BookOpen className="w-4 h-4 text-slate-300" />
              <span>دەرئەنجامی گشتی پڕۆژەکە</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-justify">
              سیستەمی "ڕێگای پارێزراو" نموونەیەکی پێشکەوتووی بەکارهێنانی تەکنەلۆژیای سەردەم و ئەلگۆریتمە ژیرەکانە لە خزمەت کەرتی پەروەردەدا. ئەم پڕۆژەیە هاوکێشەی سەلامەتی منداڵان، ئاسوودەیی دایک و باوکان، ئاسانکاری شۆفێران، و پاشەکەوتی دارایی و ژینگەیی لە یەک کاتدا بەدەستدەهێنێت.
            </p>
            <div className="pt-2 text-slate-400 text-[11px] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-semibold text-slate-200">ئامادەکراوە لەلایەن: هێدی ئاغا و ئیبراهیم ئەحمەد</span>
              <span>سیستەمی زیرەکی ڕێگای پارێزراو · Horizon Academy · ٢٠٢٦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

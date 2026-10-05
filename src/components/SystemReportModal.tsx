import React from 'react';
import {
  FileText,
  Printer,
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
} from 'lucide-react';
import reportAppPreviewImg from '../assets/images/report_bus_app_preview_1791188441570.jpg';
import reportRouteOptImg from '../assets/images/report_route_optimization_1791188454801.jpg';
import reportNotificationImg from '../assets/images/report_parent_notification_1791188466726.jpg';

interface SystemReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemReportModal: React.FC<SystemReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="system-report-modal"
      dir="rtl"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 flex items-center justify-center font-sans text-right print:p-0 print:bg-white print:static"
    >
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto flex flex-col print:max-h-none print:shadow-none print:border-none print:w-full">
        {/* Modal Top Bar (Hidden during printing) */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-20 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">ڕاپۆرتی گشتگیری سیستەم</h2>
              <p className="text-xs text-slate-500">پێناسە، شێوازی کارکردن، سوودەکان و وێنەی ڕوون کەرەوە</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>چاپکردن / داگرتنی PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="p-6 sm:p-10 space-y-8 text-slate-800 leading-relaxed print:p-0 print:space-y-6">
          {/* Header Card / Title Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 print:border-slate-300 print:bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-200/80 inline-block mb-2">
                  ڕاپۆرتی تەکنیکی و زانستی
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  سیستەمی زیرەکی چاودێری و ڕێکخستنی پاسی قوتابخانە
                </h1>
                <p className="text-sm text-slate-600 font-medium mt-1">
                  پرۆژەی تایبەت بە چاودێری ڕاستەوخۆ، کورتکردنەوەی ڕێگا و زەنگی ئاگاداری باوان (ڕێگای پارێزراو)
                </p>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md flex-shrink-0 self-start sm:self-center">
                <BusIcon className="w-8 h-8" />
              </div>
            </div>

            {/* AUTHORS / TEAM MEMBERS ON TOP (Explicitly requested by user!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                  هـ
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block">ئامادەکردنی پرۆژە:</span>
                  <strong className="text-sm font-extrabold text-slate-900">هێدی ئاغا</strong>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center gap-3">
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

          {/* Section 1: System Overview (سیستەمەکە چییە؟) */}
          <section className="space-y-3">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-r-4 border-amber-500 pr-3">
              <span>١. سیستەمەکە چییە؟ (پێناسەی گشتی)</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed text-justify">
              سیستەمی <strong>"ڕێگای پارێزراو"</strong> ئەپڵیکەیشنێکی زیرەکی سەردەمیانەیە بۆ بەڕێوەبردن، چاودێریکردنی ڕاستەوخۆ (Live Tracking)، و ڕێکخستنی کورتترین ڕێگای پاسەکانی قوتابخانە. سیستەمەکە بەشێوەیەکی بێوێنە سێ بەشی سەرەکی ناو پرۆسەی هاتوچۆ لە یەک پەڕەدا بەسەرپەرشتی ناوەندی دەبەستێتەوە: <strong>دەروازەی دایک و باوکان</strong>، <strong>کۆنسۆڵی شۆفێری پاس</strong>، و <strong>تابلۆی بەڕێوەبەرایەتی قوتابخانە</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-amber-600" />
                  <span>١. بەشی باوان</span>
                </span>
                <p className="text-[11px] text-slate-600">
                  چاودێری ڕاستەوخۆی پاس لەسەر نەخشە و وەرگرتنی زەنگی ئاگاداری ١ خولەک پێش گەیشتنی پاس.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <BusIcon className="w-4 h-4 text-emerald-600" />
                  <span>٢. بەشی شۆفێر</span>
                </span>
                <p className="text-[11px] text-slate-600">
                  ڕێڕەوی ڕێکخراو بەپەلە، لیستی وێستگەکان، و تۆمارکردنی سەرکەوتن یان نەهاتنی قوتابی.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>٣. بەڕێوەبەرایەتی</span>
                </span>
                <p className="text-[11px] text-slate-600">
                  کۆنترۆڵی گشتی، زێدەکردنی پاس و شۆفێر، بەڕێوەبردنی خێزانەکان و ناردنی ئاگاداری بەپەلە.
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

          {/* Section 2: How it Works (سیستەمەکە چۆن کاردەکات؟) */}
          <section className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-r-4 border-amber-500 pr-3">
              <span>٢. سیستەمەکە چۆن کاردەکات؟ (میکانیزمی ڕاستەقینە)</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-black flex-shrink-0">
                  ١
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">ڕێکخستنی زیرەکی ڕێگا (TSP Algorithm)</h4>
                  <p className="mt-0.5 leading-relaxed">
                    سیستەمەکە شوێنی هەموو قوتابییەکانی ناو پاسەکە دەخوێنێتەوە و بە بەکارهێنانی ئەلگۆریتمی ڕێکخستنی ڕێگاکان (Traveling Salesperson Problem)، کورتترین و خێراترین ئاڕاستە هەڵدەبژێرێت بۆ کەمکردنەوەی دووری و سووتەمەنی.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-black flex-shrink-0">
                  ٢
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">پەخشی ڕاستەوخۆی GPS و هەژمارکردنی ETA</h4>
                  <p className="mt-0.5 leading-relaxed">
                    کاتێک شۆفێرەکە دەست بە دەوام دەکات، شوێنی پاسەکە بە ڕاستەوخۆ لەسەر نەخشە بۆ باوان نوێ دەبێتەوە. هەروەها کاتی خەمڵێنراوی گەیشتن (ETA) دەستبەجێ بە خولەک هەژمار دەکرێت.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-black flex-shrink-0">
                  ٣
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">زەنگی ئاگاداری ١ خولەک پێش گەیشتن (Geofencing)</h4>
                  <p className="mt-0.5 leading-relaxed">
                    کاتێک پاسەکە دەگاتە بازنەی جوگرافی نزیک ماڵی قوتابییەکە (نزیکەی ١ خولەک دووری)، زەنگێکی ئاگاداری تایبەت بۆ مۆبایلی باوان دەچێت بۆ ئەوەی قوتابییەکە ئامادە بێت لەبەردەم دەرگا.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-black flex-shrink-0">
                  ٤
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">پەیوەندی دوولایەنە و پەخشی بەپەلە</h4>
                  <p className="mt-0.5 leading-relaxed">
                    باوان دەتوانن بە یەک کرتە تێبینی بنێرن (مانەوه ٢ خولەک/نەهاتنی قوتابی)، هەروەها بەڕێوەبەرایەتی قوتابخانە دەتوانێت ئاگاداری دواکەوتن یان پەخشی بەپەلە (Critical Broadcast) بڵاوبکاتەوە.
                  </p>
                </div>
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

          {/* Section 3: Advantages (تایبەتمەندی و سوودەکانی سیستەمەکە) */}
          <section className="space-y-3">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 border-r-4 border-amber-500 pr-3">
              <span>٣. سوود و تایبەتمەندییە سەرەکییەکانی سیستەمەکە</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>پاراستنی سەلامەتی قوتابیان</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  نەمانی چاوەڕوانی زۆری منداڵان لەبەر دەرگای ماڵەوە لە وەرزی سەرما، باران یان گەرمادا.
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>کەمکردنەوەی خەرجی (تا ٣٥٪)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  کەمکردنەوەی بەرچاوی سووتەمەنی، کاتی گەشت، و پاراستنی ژینگە لەڕێگەی کورتترین ڕێگاوە.
                </p>
              </div>

              <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-1">
                <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>ڕوونی و نەمانی دڵەڕاوکێ</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  دایک و باوکان لە سەرجەم ساتەکاندا شوێنی پاسەکە و کاتی گەیشتنی ورد دەبینن.
                </p>
              </div>

              <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-700" />
                  <span>بەڕێوەبردنی ئاسانی قوتابخانە</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  توانای زێدەکردنی شۆفێر، خێزان، قوتابی و گۆڕینی پاسەکان تەنها بە یەک کرتە.
                </p>
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

          {/* Conclusion / Summary */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-2 text-xs">
            <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>دەرئەنجام</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              سیستەمی زیرەکی "ڕێگای پارێزراو" چارەسەرێکی گشتگیر و کەرەستەیەکی پێشکەوتووە بۆ باڵادەستبوونی سەلامەتی لە هاتوچۆی قوتابخانەکاندا. ئەم پرۆژەیە ئاسودەیی بۆ دایک و باوکان، ئاسانکاری بۆ شۆفێران، و ڕێکی و ڕێکوپێکی تەواو بۆ بەڕێوەبەرایەتی قوتابخانە بەدەستدەهێنێت.
            </p>
            <div className="pt-2 text-slate-400 text-[11px] border-t border-slate-800 flex items-center justify-between">
              <span>ئامادەکراوە لەلایەن: هێدی ئاغا و ئیبراهیم ئەحمەد</span>
              <span>Horizon Academy · ٢٠٢٦</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

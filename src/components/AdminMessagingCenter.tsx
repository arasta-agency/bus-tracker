import React, { useEffect, useState } from 'react';
import { Bus, ChatMessage, CriticalBroadcast, School, Student, BroadcastTargetType, BroadcastUrgency } from '../types';
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Bus as BusIcon,
  CheckCircle2,
  Clock,
  Filter,
  Inbox,
  Megaphone,
  MessageSquare,
  Phone,
  Plus,
  Radio,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import { realtimeMessenger } from '../services/realtimeMessagingService';
import { soundPlayer } from '../utils/audioAlert';

interface AdminMessagingCenterProps {
  school: School;
  buses: Bus[];
  students: Student[];
}

const BROADCAST_TEMPLATES = [
  {
    title: 'دواکەوتنی گەشتی بەیانیان بەهۆی کەشوهەوا',
    content: 'ئاگاداری سەرجەم بەڕێزان دەکەین کە بەهۆی بارانبارین و تەمەوە، گەشتی بەیانیان نزیکەی ١٠ خولەک دوادەکەوێت. سەلامەتی منداڵەکانتان لە پێشینەی کارەکانمانە.',
    urgency: 'important' as BroadcastUrgency,
  },
  {
    title: 'ئامادەبوونی خێرا لەبەردەم ماڵ',
    content: 'تکایە ٥ خولەک پێش گەیشتنی پاس لەبەردەم ماڵ ئامادە بن تاکو هیچ گەشتێک دوانەکەوێت و ڕێگاکان بە کورتکراوەیی بمێننەوە.',
    urgency: 'general' as BroadcastUrgency,
  },
  {
    title: 'ئاگاداری لەناکاو: گۆڕینی ڕێڕەوی هاتوچۆ',
    content: 'بەهۆی داخستنی کاتی شەقام، پاسی دیاریکراو بە ڕێگای جێگرەوەدا دەڕوات. تکایە چاودێری نەخشەی ڕاستەوخۆ لەناو ئەپڵیکەیشن بکەن.',
    urgency: 'critical' as BroadcastUrgency,
  },
  {
    title: 'گەیشتنی سەلامەتانەی سەرجەم پاسەکان بە قوتابخانە',
    content: 'سوپاس بۆ خوا سەرجەم پاسەکانی قوتابخانە بە سەلامەتی گەیشتنە گەراجی قوتابخانە و تەواوی قوتابیان لە پۆلەکانیاندان.',
    urgency: 'general' as BroadcastUrgency,
  },
];

const CANNED_REPLIES = [
  'سڵاو، داواکارییەکەتان گەیشت و پەسەند کرا. سوپاس بۆ پەیوەندیکردنتان.',
  'شۆفێری پاسەکە بە تەلەفۆن ئاگادارکرایەوە کە ٢ خولەک چاوەڕوان بێت.',
  'پاسەکە لە کاتی دیاریکراودا دەگاتە بەردەم ماڵتان، سەلامەت بن.',
  'ئاگاداری تەندروستی منداڵەکەتانین و لە تەنیشت چاودێرەکە دادەنیشێت.',
];

export const AdminMessagingCenter: React.FC<AdminMessagingCenterProps> = ({
  school,
  buses,
  students,
}) => {
  const [subTab, setSubTab] = useState<'inbox' | 'broadcast' | 'history'>('inbox');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [broadcasts, setBroadcasts] = useState<CriticalBroadcast[]>([]);
  const [selectedParentEmail, setSelectedParentEmail] = useState<string>('');
  const [replyText, setReplyText] = useState('');
  const [inboxFilter, setInboxFilter] = useState<'all' | 'unread'>('all');
  const [inboxSearch, setInboxSearch] = useState('');

  // Broadcast Composer State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState<BroadcastTargetType>('all_parents');
  const [broadcastBusId, setBroadcastBusId] = useState<string>(buses[0]?.id || 'bus_104');
  const [broadcastGrade, setBroadcastGrade] = useState<string>('پۆلی یەکەم');
  const [broadcastUrgency, setBroadcastUrgency] = useState<BroadcastUrgency>('important');
  const [broadcastSuccessNotice, setBroadcastSuccessNotice] = useState<string | null>(null);

  // Subscribe to real-time events
  useEffect(() => {
    setMessages(realtimeMessenger.getMessages());
    setBroadcasts(realtimeMessenger.getBroadcasts());

    const unsubscribe = realtimeMessenger.subscribe((event) => {
      setMessages(realtimeMessenger.getMessages());
      setBroadcasts(realtimeMessenger.getBroadcasts());
      if (event.type === 'NEW_INQUIRY') {
        soundPlayer.playProximityChime();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Group messages by parent email
  const inquiries = messages.filter((m) => m.type === 'inquiry' || m.type === 'reply');

  // Map of unique parent conversations
  const parentConversations = React.useMemo(() => {
    const map = new Map<string, {
      parentEmail: string;
      parentName: string;
      parentPhone?: string;
      studentName?: string;
      busNumber?: string;
      busId?: string;
      latestMessage: ChatMessage;
      unreadCount: number;
    }>();

    inquiries.forEach((msg) => {
      const email = (msg.parentEmail || 'unknown@family.edu').toLowerCase();
      const existing = map.get(email);
      const isUnread = !msg.read && msg.senderRole === 'parent';

      if (!existing) {
        map.set(email, {
          parentEmail: email,
          parentName: msg.senderRole === 'parent' ? msg.senderName : 'باوان',
          parentPhone: msg.parentPhone,
          studentName: msg.studentName,
          busNumber: msg.busNumber,
          busId: msg.busId,
          latestMessage: msg,
          unreadCount: isUnread ? 1 : 0,
        });
      } else {
        if (msg.createdAt > existing.latestMessage.createdAt) {
          existing.latestMessage = msg;
          if (msg.senderRole === 'parent') {
            existing.parentName = msg.senderName;
          }
        }
        if (isUnread) {
          existing.unreadCount += 1;
        }
      }
    });

    return Array.from(map.values()).sort(
      (a, b) => b.latestMessage.createdAt - a.latestMessage.createdAt
    );
  }, [inquiries]);

  // Set default selected parent if none selected
  useEffect(() => {
    if (!selectedParentEmail && parentConversations.length > 0) {
      setSelectedParentEmail(parentConversations[0].parentEmail);
    }
  }, [parentConversations, selectedParentEmail]);

  // Messages for active selected parent
  const activeConversationMessages = inquiries
    .filter(
      (m) => m.parentEmail && m.parentEmail.toLowerCase() === selectedParentEmail.toLowerCase()
    )
    .sort((a, b) => a.createdAt - b.createdAt);

  const activeParentInfo = parentConversations.find(
    (p) => p.parentEmail.toLowerCase() === selectedParentEmail.toLowerCase()
  );

  const handleSendReply = (text?: string) => {
    const content = (text || replyText).trim();
    if (!content || !selectedParentEmail) return;

    realtimeMessenger.replyToInquiry({
      senderId: 'manager_kenar',
      senderName: `${school.principalName} (بەڕێوەبەرایەتی)`,
      parentEmail: selectedParentEmail,
      studentName: activeParentInfo?.studentName,
      busNumber: activeParentInfo?.busNumber,
      content,
    });

    setReplyText('');
    soundPlayer.playSuccessTone();
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastContent.trim()) return;

    const targetBus = buses.find((b) => b.id === broadcastBusId);

    const bcast = realtimeMessenger.sendBroadcast({
      title: broadcastTitle,
      content: broadcastContent,
      senderName: `${school.principalName} (کۆنتڕۆڵی قوتابخانە)`,
      targetType: broadcastTarget,
      targetBusId: broadcastTarget === 'bus_group' ? broadcastBusId : undefined,
      targetBusNumber: broadcastTarget === 'bus_group' ? targetBus?.busNumber : undefined,
      targetGrade: broadcastTarget === 'grade_group' ? broadcastGrade : undefined,
      urgency: broadcastUrgency,
    });

    soundPlayer.playSuccessTone();
    setBroadcastSuccessNotice(`ڕاگەیاندنی بەپەلە ("${bcast.title}") بە سەرکەوتوویی بۆ گرووپی دیاریکراو پەخشکرا.`);
    setBroadcastTitle('');
    setBroadcastContent('');

    setTimeout(() => {
      setBroadcastSuccessNotice(null);
    }, 5000);
  };

  const totalUnreadInquiries = parentConversations.reduce((acc, p) => acc + p.unreadCount, 0);

  const filteredConversations = parentConversations.filter((p) => {
    if (inboxFilter === 'unread' && p.unreadCount === 0) return false;
    if (inboxSearch) {
      const q = inboxSearch.toLowerCase();
      return (
        p.parentName.toLowerCase().includes(q) ||
        (p.studentName && p.studentName.toLowerCase().includes(q)) ||
        p.parentEmail.toLowerCase().includes(q) ||
        (p.busNumber && p.busNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div id="admin-messaging-center" dir="rtl" className="space-y-4 font-sans text-right">
      {/* Sub Navigation Bar */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setSubTab('inbox')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              subTab === 'inbox'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Inbox className="w-3.5 h-3.5 text-amber-500" />
            <span>سندوقی نامەکان</span>
            {totalUnreadInquiries > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setSubTab('broadcast')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              subTab === 'broadcast'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5 text-slate-700" />
            <span>پەخشی بەپەلە</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              subTab === 'history'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-slate-700" />
            <span>مێژووی پەخشەکان ({broadcasts.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>سیستەمی ڕاستەوخۆ کارایە</span>
        </div>
      </div>

      {/* ================= SUB-TAB 1: INBOX ================= */}
      {subTab === 'inbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left / Conversation List (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-500" />
                <span>داواکاری و پرسیاری باوان ({parentConversations.length})</span>
              </h4>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setInboxFilter('all')}
                  className={`text-[11px] px-2 py-0.5 rounded-lg font-bold transition cursor-pointer ${
                    inboxFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  هەموو
                </button>
                <button
                  type="button"
                  onClick={() => setInboxFilter('unread')}
                  className={`text-[11px] px-2 py-0.5 rounded-lg font-bold transition cursor-pointer ${
                    inboxFilter === 'unread'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  وەڵامنەدراوە ({totalUnreadInquiries})
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="گەڕان بەپێی ناوی باوان، قوتابی..."
                value={inboxSearch}
                onChange={(e) => setInboxSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 pr-8 text-xs text-slate-800 focus:outline-none focus:border-amber-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>

            {/* Conversation list */}
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  هیچ نامەیەک نەدۆزرایەوە
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const isSelected = conv.parentEmail.toLowerCase() === selectedParentEmail.toLowerCase();

                  return (
                    <div
                      key={conv.parentEmail}
                      onClick={() => {
                        setSelectedParentEmail(conv.parentEmail);
                        realtimeMessenger.markAsRead(conv.parentEmail);
                      }}
                      className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                        isSelected
                          ? 'bg-amber-50/70 border-amber-400 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center font-bold text-xs">
                            {conv.parentName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                              <span>{conv.parentName}</span>
                              {conv.unreadCount > 0 && (
                                <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 rounded-full">
                                  نوێ
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500">
                              سەرپەرشتیاری: {conv.studentName || 'قوتابی'}
                            </span>
                          </div>
                        </div>

                        <div className="text-left">
                          <span className="text-[10px] text-slate-400 font-mono">
                            {conv.latestMessage.timestamp}
                          </span>
                          {conv.busNumber && (
                            <span className="block text-[9px] bg-slate-200 text-slate-700 font-bold px-1.5 rounded mt-0.5">
                              {conv.busNumber}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-1 pr-1 font-medium">
                        {conv.latestMessage.senderRole === 'manager' && 'ئێوە: '}
                        {conv.latestMessage.content}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right / Active Chat Thread & Reply (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[580px] overflow-hidden">
            {activeParentInfo ? (
              <>
                {/* Chat Top Banner */}
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{activeParentInfo.parentName}</h4>
                      <p className="text-xs text-slate-400">
                        قوتابی: <strong className="text-amber-300">{activeParentInfo.studentName}</strong> • {activeParentInfo.busNumber || 'پاس'} • {activeParentInfo.parentPhone || activeParentInfo.parentEmail}
                      </p>
                    </div>
                  </div>

                  {activeParentInfo.parentPhone && (
                    <a
                      href={`tel:${activeParentInfo.parentPhone}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl text-xs font-bold transition flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>پەیوەندی تەلەفۆنی</span>
                    </a>
                  )}
                </div>

                {/* Message stream */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
                  {activeConversationMessages.map((msg) => {
                    const isFromAdmin = msg.senderRole === 'manager';

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isFromAdmin ? 'items-start' : 'items-end'}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-slate-500">
                          <span className="font-bold text-slate-700">
                            {isFromAdmin ? 'بەڕێوەبەرایەتی قوتابخانە' : msg.senderName}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-[10px]">{msg.timestamp}</span>
                        </div>

                        <div
                          className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                            isFromAdmin
                              ? 'bg-amber-400 text-slate-950 font-medium rounded-tr-none border border-amber-500/30'
                              : 'bg-slate-900 text-white rounded-tl-none'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick canned replies */}
                <div className="p-2.5 bg-slate-50 border-t border-slate-200 overflow-x-auto">
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">
                      وەڵامی خێرا:
                    </span>
                    {CANNED_REPLIES.map((canned, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendReply(canned)}
                        className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-amber-50 border border-slate-200 text-slate-800 text-[11px] rounded-lg transition cursor-pointer shadow-2xs font-medium"
                      >
                        {canned}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reply Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendReply();
                  }}
                  className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`وەڵام بنووسە بۆ ${activeParentInfo.parentName}...`}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white transition text-right"
                  />

                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-amber-400 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4 rotate-180 text-amber-400" />
                    <span>ناردنی وەڵام</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <Inbox className="w-12 h-12 text-slate-300 mb-2" />
                <p className="text-sm font-bold text-slate-600">هیچ گفتوگۆیەک هەڵنەبژێردراوە</p>
                <p className="text-xs text-slate-400 mt-1">تکایە لە ستوونی ڕاستەوە دایک و باوکێک هەڵبژێرە</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= SUB-TAB 2: CRITICAL BROADCAST STUDIO ================= */}
      {subTab === 'broadcast' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <Megaphone className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-900 text-base">
                  ستۆدیۆی پەخشی ڕاگەیاندنی بەپەلە و لەناکاو
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                ناردنی ئاگاداری ڕاستەوخۆ و دەستبەجێ بۆ مۆبایلی دایک و باوکان بەپێی پاس، پۆل، یان سەرجەم قوتابخانە.
              </p>
            </div>

            <span className="text-xs bg-rose-50 text-rose-700 font-bold px-3 py-1.5 rounded-full border border-rose-200 flex items-center gap-1.5 self-start">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>پەخشی ڕاستەوخۆ دەگات</span>
            </span>
          </div>

          {/* Success banner */}
          {broadcastSuccessNotice && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-2xl flex items-center gap-2 font-bold animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{broadcastSuccessNotice}</span>
            </div>
          )}

          {/* Quick template selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>قاڵبی ئامادەکراو بۆ ڕاگەیاندنی خێرا:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BROADCAST_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setBroadcastTitle(tmpl.title);
                    setBroadcastContent(tmpl.content);
                    setBroadcastUrgency(tmpl.urgency);
                  }}
                  className="p-3 text-right bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 rounded-xl transition cursor-pointer text-xs space-y-1"
                >
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>{tmpl.title}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                        tmpl.urgency === 'critical'
                          ? 'bg-rose-100 text-rose-800'
                          : tmpl.urgency === 'important'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {tmpl.urgency === 'critical' ? 'بەپەلە' : tmpl.urgency === 'important' ? 'گرنگ' : 'ئاسایی'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{tmpl.content}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Broadcast Form */}
          <form onSubmit={handleSendBroadcast} className="space-y-4">
            {/* Target Audience & Urgency Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Target Audience */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>دیاریکردنی گرووپی ئامانج:</span>
                </label>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="targetType"
                      checked={broadcastTarget === 'all_parents'}
                      onChange={() => setBroadcastTarget('all_parents')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span>📢 سەرجەم دایک و باوکانی قوتابخانە ({students.length} خێزان)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="targetType"
                      checked={broadcastTarget === 'bus_group'}
                      onChange={() => setBroadcastTarget('bus_group')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span>🚌 تەنها دایک و باوکانی پاسێکی دیاریکراو</span>
                  </label>

                  {broadcastTarget === 'bus_group' && (
                    <div className="pr-5 pt-1">
                      <select
                        aria-label="دیاریکردنی پاس بۆ پەخش"
                        value={broadcastBusId}
                        onChange={(e) => setBroadcastBusId(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-rose-400"
                      >
                        {buses.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.busNumber} ({b.driverName} - {b.plate})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="targetType"
                      checked={broadcastTarget === 'grade_group'}
                      onChange={() => setBroadcastTarget('grade_group')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span>🎓 تەنها دایک و باوکانی قۆناغێکی خوێندن</span>
                  </label>

                  {broadcastTarget === 'grade_group' && (
                    <div className="pr-5 pt-1">
                      <select
                        aria-label="دیاریکردنی قۆناغ بۆ پەخش"
                        value={broadcastGrade}
                        onChange={(e) => setBroadcastGrade(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-rose-400"
                      >
                        <option value="باخچەی ساوایان">باخچەی ساوایان (KG)</option>
                        <option value="پۆلی یەکەم">پۆلی یەکەم</option>
                        <option value="پۆلی دووەم">پۆلی دووەم</option>
                        <option value="پۆلی سێیەم">پۆلی سێیەم</option>
                        <option value="پۆلی چوارەم">پۆلی چوارەم</option>
                        <option value="پۆلی پێنجەم">پۆلی پێنجەم</option>
                        <option value="پۆلی شەشەم">پۆلی شەشەم</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Urgency Level */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>ئاستی بەپەلەیی و گرنگی پەیام:</span>
                </label>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="urgencyLevel"
                      checked={broadcastUrgency === 'critical'}
                      onChange={() => setBroadcastUrgency('critical')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                        🔴 لەناکاو و بەپەلە (Emergency / Detour)
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        زەنگی ئاگاداری بەپەلە لەسەر مۆبایلی باوان لێدەدات.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="urgencyLevel"
                      checked={broadcastUrgency === 'important'}
                      onChange={() => setBroadcastUrgency('important')}
                      className="text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                        🟡 ئاگاداری گرنگ (Notice / Delay)
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        ئاگاداری دواکەوتن یان گۆڕانکاری لە کاتەکان.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="urgencyLevel"
                      checked={broadcastUrgency === 'general'}
                      onChange={() => setBroadcastUrgency('general')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                        🔵 ئاگاداری ئاسایی (General Announcement)
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        ڕاگەیاندنی گشتی، بەبێ دەنگی بێزارکەر.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                سەردێڕی ڕاگەیاندنەکە:
              </label>
              <input
                type="text"
                id="broadcast-title-input"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="بۆ نموونە: دواکەوتنی پاسی ١٠٤ بەهۆی کارکردن لە شەقام"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition text-right font-bold"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                دەقی ڕاگەیاندنەکە:
              </label>
              <textarea
                id="broadcast-content-input"
                value={broadcastContent}
                onChange={(e) => setBroadcastContent(e.target.value)}
                placeholder="دەقی تەواوی پەیامەکە لێرە بنووسە کە دەستبەجێ بۆ باوان دەڕوات..."
                rows={4}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition text-right leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                id="submit-critical-broadcast-btn"
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/20 transition flex items-center gap-2 cursor-pointer"
              >
                <Megaphone className="w-4 h-4 text-white" />
                <span>ناردنی دەستبەجێی پەخشی ڕاستەوخۆ</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= SUB-TAB 3: BROADCAST HISTORY ================= */}
      {subTab === 'history' && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">
              مێژووی سەرجەم پەخش و ڕاگەیاندنە نێردراوەکان ({broadcasts.length})
            </h4>
            <span className="text-xs text-slate-500">پەخشە نێردراوەکان بۆ دایک و باوکان</span>
          </div>

          <div className="space-y-2.5">
            {broadcasts.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                هیچ پەخشێک نەنێردراوە
              </div>
            ) : (
              broadcasts.map((bcast) => {
                const isCritical = bcast.urgency === 'critical';
                const isImportant = bcast.urgency === 'important';

                return (
                  <div
                    key={bcast.id}
                    className={`p-4 rounded-2xl border ${
                      isCritical
                        ? 'bg-rose-50/70 border-rose-200'
                        : isImportant
                        ? 'bg-amber-50/70 border-amber-200'
                        : 'bg-slate-50 border-slate-200'
                    } space-y-2`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                            isCritical ? 'bg-rose-600 text-white' : 'bg-slate-900 text-amber-300'
                          }`}
                        >
                          <Megaphone className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 text-xs">{bcast.title}</h5>
                          <span className="text-[10px] text-slate-500">
                            نێرەر: {bcast.senderName} • کات: {bcast.timestamp}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-rose-200 text-rose-900'
                            : isImportant
                            ? 'bg-amber-200 text-amber-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}
                      >
                        {bcast.targetType === 'all_parents'
                          ? '📢 سەرجەم باوان'
                          : bcast.targetType === 'bus_group'
                          ? `🚌 ${bcast.targetBusNumber || 'گرووپی پاس'}`
                          : `🎓 ${bcast.targetGrade || 'قۆناغ'}`}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {bcast.content}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

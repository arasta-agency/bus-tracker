import React, { useEffect, useRef, useState } from 'react';
import { Bus, ChatMessage, CriticalBroadcast, School, Student } from '../types';
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  HelpCircle,
  Megaphone,
  MessageSquare,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { realtimeMessenger } from '../services/realtimeMessagingService';
import { soundPlayer } from '../utils/audioAlert';

interface ParentInquiryChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  school: School;
  bus?: Bus;
  parentName: string;
}

const QUICK_INQUIRIES = [
  'ئایا پاسەکە لە کاتی ئاسایی خۆیدا دەگات؟',
  'منداڵەکەم ئەمڕۆ دەرمانی پێیە تکایە ئاگاداری بن',
  'ئەمڕۆ لەگەڵ باپیری دەگەڕێتەوە ماڵەوە',
  'تکایە شوێنی دابەزینی کاتی پەسەند بکەن',
  'تکایە ٢ خولەک چاوەڕوان بن لەبەردەم ماڵ',
];

export const ParentInquiryChatModal: React.FC<ParentInquiryChatModalProps> = ({
  isOpen,
  onClose,
  student,
  school,
  bus,
  parentName,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load and subscribe to real-time updates
  useEffect(() => {
    setMessages(realtimeMessenger.getMessages());

    const unsubscribe = realtimeMessenger.subscribe((event) => {
      setMessages(realtimeMessenger.getMessages());
      if (event.type === 'NEW_REPLY' || event.type === 'CRITICAL_BROADCAST') {
        soundPlayer.playProximityChime();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Filter messages relevant to this parent/student
  // Includes inquiries/replies for this student's parent AND broadcasts targeting all parents or this bus/grade
  const conversationMessages = messages.filter((msg) => {
    if (msg.type === 'broadcast') {
      if (!msg.broadcastTarget || msg.broadcastTarget === 'all_parents') return true;
      if (msg.broadcastTarget === 'bus_group' && msg.targetBusId === student.busId) return true;
      if (msg.broadcastTarget === 'grade_group' && msg.targetGrade && student.grade.includes(msg.targetGrade)) return true;
      return false;
    }

    const matchesEmail = msg.parentEmail && msg.parentEmail.toLowerCase() === student.parentEmail.toLowerCase();
    const matchesStudent = msg.studentId && msg.studentId === student.id;
    return matchesEmail || matchesStudent;
  }).sort((a, b) => a.createdAt - b.createdAt);

  useEffect(() => {
    if (isOpen) {
      realtimeMessenger.markAsRead(student.parentEmail);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen, conversationMessages.length, student.parentEmail]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content) return;

    realtimeMessenger.sendInquiry({
      senderId: `usr_parent_${student.id}`,
      senderName: parentName || student.parentName,
      parentEmail: student.parentEmail,
      parentPhone: student.parentPhone,
      studentId: student.id,
      studentName: student.name,
      busId: student.busId,
      busNumber: bus ? bus.busNumber : 'پاسی قوتابخانە',
      content,
    });

    setInputText('');
    soundPlayer.playSuccessTone();
  };

  return (
    <div
      id="parent-inquiry-chat-modal"
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm font-sans text-right animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden h-[85vh] max-h-[680px] flex flex-col">
        {/* Header */}
        <div className="bg-white text-slate-900 p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">
                  پەیوەندی بە بەڕێوەبەرایەتی
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="ئۆنلاین" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                سەرپەرشتیاری <strong className="text-slate-800">{student.name}</strong> · {school.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Sub-header */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ژووری کۆنتڕۆڵی هاتوچۆ: {school.principalName}</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {bus ? `${bus.busNumber} (${bus.plate})` : 'پاسی دیاریکراو'}
          </span>
        </div>

        {/* Quick Inquiries Carousel */}
        <div className="p-3 bg-amber-50/50 border-b border-amber-100 overflow-x-auto">
          <div className="text-[10px] font-bold text-amber-900 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>پرسیاری خێرا (بە یەک کرتە بنێرە):</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {QUICK_INQUIRIES.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-amber-100 text-slate-800 text-[11px] font-semibold rounded-lg border border-amber-200 transition cursor-pointer shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
          {conversationMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <MessageSquare className="w-10 h-10 mb-2 text-slate-300" />
              <p className="text-xs font-bold text-slate-600">هیچ پەیامێکی پێشوو نییە</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                دەتوانیت هەر پرسیار یان داواکارییەکت هەبێت دەربارەی پاسەکە و گەیشتنی منداڵەکەت ڕاستەوخۆ بۆ بەڕێوەبەرایەتی بنووسیت.
              </p>
            </div>
          ) : (
            conversationMessages.map((msg) => {
              if (msg.type === 'broadcast') {
                const isCritical = msg.urgency === 'critical';
                const isImportant = msg.urgency === 'important';

                return (
                  <div
                    key={msg.id}
                    className={`my-2 p-3.5 rounded-2xl border ${
                      isCritical
                        ? 'bg-rose-50 border-rose-300 text-rose-950'
                        : isImportant
                        ? 'bg-amber-50 border-amber-300 text-amber-950'
                        : 'bg-blue-50 border-blue-200 text-blue-950'
                    } shadow-xs space-y-1.5`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        <Megaphone className={`w-4 h-4 ${isCritical ? 'text-rose-600' : 'text-amber-600'}`} />
                        <span>📢 ڕاگەیاندنی بەپەلەی قوتابخانە: {msg.title || 'ئاگاداری گشتی'}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs leading-relaxed font-medium">{msg.content}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[10px] text-slate-500">
                      <span>نێردراوە بۆ: {msg.broadcastTarget === 'bus_group' ? `باوکانی ${msg.targetBusNumber || 'پاس'}` : 'سەرجەم باوان'}</span>
                      <span className="font-semibold text-slate-700">{msg.senderName}</span>
                    </div>
                  </div>
                );
              }

              const isFromParent = msg.senderRole === 'parent';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isFromParent ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-slate-500">
                    <span className="font-bold text-slate-700">
                      {isFromParent ? 'ئێوە (باوان)' : msg.senderName}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-[10px]">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isFromParent
                        ? 'bg-slate-900 text-white rounded-tr-none'
                        : 'bg-amber-400 text-slate-950 font-medium rounded-tl-none border border-amber-500/30'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            id="parent-inquiry-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="پرسیار یان تێبینییەکەت لێرە بنووسە بۆ بەڕێوەبەرایەتی..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-2xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white transition text-right"
          />

          <button
            type="submit"
            id="parent-send-inquiry-btn"
            disabled={!inputText.trim()}
            className="p-2.5 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 rounded-2xl font-bold transition flex items-center justify-center cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
};

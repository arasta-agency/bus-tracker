import React, { useEffect, useState } from 'react';
import { Bus, School, Student, TripShift } from '../types';
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Clock,
  Home,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  RotateCcw,
  UserPlus,
  Users,
  Volume2,
  Megaphone,
} from 'lucide-react';
import { soundPlayer } from '../utils/audioAlert';
import { EditLocationModal } from './EditLocationModal';
import { AddChildModal } from './AddChildModal';
import { ParentInquiryChatModal } from './ParentInquiryChatModal';
import { realtimeMessenger } from '../services/realtimeMessagingService';
import { ChatMessage, CriticalBroadcast } from '../types';

interface ParentPortalProps {
  students: Student[];
  allStudents?: Student[];
  selectedStudentId: string;
  onSelectStudentId: (studentId: string) => void;
  bus: Bus;
  school: School;
  shift: TripShift;
  parentName?: string;
  isAdmin?: boolean;
  onAddChild?: (newChild: {
    name: string;
    grade: string;
    avatarBg: string;
    address: string;
    lat: number;
    lng: number;
    notes?: string;
  }) => void;
  onSwitchParentDemo?: (studentId: string) => void;
  onParentSendNotice: (studentId: string, messageType: 'running_late' | 'mark_absent') => void;
  onUpdateStudentAddress?: (
    studentId: string,
    update: {
      address: string;
      lat: number;
      lng: number;
      isTemporary: boolean;
      reason?: string;
      updatePermanent?: boolean;
    }
  ) => void;
  onRevertToPermanentAddress?: (studentId: string) => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  students,
  allStudents = [],
  selectedStudentId,
  onSelectStudentId,
  bus,
  school,
  shift,
  parentName,
  isAdmin = false,
  onAddChild,
  onSwitchParentDemo,
  onParentSendNotice,
  onUpdateStudentAddress,
  onRevertToPermanentAddress,
}) => {
  const [parentNoteSuccess, setParentNoteSuccess] = useState<string | null>(null);
  const [isEditLocationOpen, setIsEditLocationOpen] = useState(false);
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [realtimeBroadcasts, setRealtimeBroadcasts] = useState<CriticalBroadcast[]>([]);
  const [realtimeMessages, setRealtimeMessages] = useState<ChatMessage[]>([]);

  const currentChild = students.find((s) => s.id === selectedStudentId) || students[0];

  useEffect(() => {
    setRealtimeBroadcasts(realtimeMessenger.getBroadcasts());
    setRealtimeMessages(realtimeMessenger.getMessages());

    const unsubscribe = realtimeMessenger.subscribe(() => {
      setRealtimeBroadcasts(realtimeMessenger.getBroadcasts());
      setRealtimeMessages(realtimeMessenger.getMessages());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const relevantBroadcasts = realtimeBroadcasts.filter((b) => {
    if (b.targetType === 'all_parents') return true;
    if (b.targetType === 'bus_group' && b.targetBusId === currentChild.busId) return true;
    if (b.targetType === 'grade_group' && b.targetGrade && currentChild.grade.includes(b.targetGrade)) return true;
    return false;
  });

  const latestBroadcast = relevantBroadcasts[0];

  const unreadRepliesCount = realtimeMessages.filter(
    (m) =>
      m.senderRole === 'manager' &&
      m.type === 'reply' &&
      !m.read &&
      m.parentEmail?.toLowerCase() === currentChild.parentEmail.toLowerCase()
  ).length;

  const is1MinProximity =
    currentChild.proximityAlertTriggered ||
    currentChild.status === 'proximity_alert_sent' ||
    currentChild.status === 'bus_arrived';

  const isBoarded = currentChild.status === 'boarded' || currentChild.status === 'at_school';
  const isAtSchool = currentChild.status === 'at_school';
  const isAbsent = currentChild.status === 'absent';

  const handleAction = (type: 'running_late' | 'mark_absent') => {
    onParentSendNotice(currentChild.id, type);
    const msg =
      type === 'running_late'
        ? 'ئاگاداری بۆ شۆفێر نێردرا: تکایە ٢ خولەک چاوەڕوان بن، منداڵەکەت لە دەرگایە.'
        : 'ئاگاداری بۆ قوتابخانە نێردرا: قوتابی ئەمڕۆ نایەت بۆ قوتابخانە.';
    setParentNoteSuccess(msg);
    setTimeout(() => setParentNoteSuccess(null), 4000);
  };

  return (
    <div id="parent-portal" dir="rtl" className="space-y-4 font-sans text-right">
      {/* Official Broadcast Alert (clean callout if exists) */}
      {latestBroadcast && (
        <div
          id="parent-live-broadcast-banner"
          className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 flex items-start justify-between gap-3 shadow-xs"
        >
          <div className="flex items-start gap-2.5">
            <Megaphone className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <span>{latestBroadcast.title}</span>
                <span className="text-[10px] text-amber-700/80 font-normal">
                  ({latestBroadcast.timestamp})
                </span>
              </div>
              <p className="mt-1 leading-relaxed text-amber-900/90">{latestBroadcast.content}</p>
            </div>
          </div>
          <button
            onClick={() => setIsChatModalOpen(true)}
            className="text-xs font-bold text-amber-900 hover:underline flex-shrink-0 cursor-pointer"
          >
            وەڵامدانەوە
          </button>
        </div>
      )}

      {/* 1-Minute Proximity Arrival Banner */}
      {is1MinProximity && !isBoarded && !isAbsent && (
        <div
          id="proximity-1min-hero-alert"
          className="bg-amber-500 text-slate-950 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3 font-medium"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                پاسەکە نزیکەی ١ خولەک لە ماڵتان دوورە!
              </h3>
              <p className="text-xs text-slate-900 mt-0.5">
                تکایە {currentChild.name} لەبەردەم ماڵ ئامادە بێت.
              </p>
            </div>
          </div>

          <button
            onClick={() => soundPlayer.playProximityChime()}
            className="p-2 bg-slate-950 text-white rounded-xl text-xs hover:bg-slate-900 transition flex items-center gap-1 cursor-pointer shrink-0"
            title="دەنگی زەنگ"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      )}

      {/* Main Student Status Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4">
        {/* Child Selector Tabs (if parent has multiple children) */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {students.map((student) => {
              const isSelected = student.id === currentChild.id;
              return (
                <button
                  key={student.id}
                  id={`select-child-${student.id}`}
                  onClick={() => onSelectStudentId(student.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${student.avatarBg}`} />
                  <span>{student.name}</span>
                </button>
              );
            })}
          </div>

          {onAddChild && (
            <button
              id="open-add-child-modal-btn"
              type="button"
              onClick={() => setIsAddChildOpen(true)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>منداڵێکی تر</span>
            </button>
          )}
        </div>

        {/* Child Details & Live Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`w-12 h-12 rounded-xl ${currentChild.avatarBg} text-white flex items-center justify-center font-bold text-lg flex-shrink-0`}
            >
              {currentChild.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base text-slate-900">{currentChild.name}</h2>
                <span className="text-xs text-slate-500 font-medium">· {currentChild.grade}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentChild.address}</span>
                {currentChild.isTemporaryAddress && (
                  <span className="text-amber-700 text-[11px] font-bold mr-1">
                    (ناونیشانی کاتی)
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Current Live ETA / Status Indicator */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 sm:text-left text-right">
            <span className="text-[11px] text-slate-500 block mb-0.5">دۆخی گەیشتن</span>
            {isBoarded ? (
              <span className="text-emerald-700 font-bold text-sm flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {isAtSchool
                    ? 'لە قوتابخانەیە'
                    : `سواربوو (${currentChild.boardedTime || '7:45 AM'})`}
                </span>
              </span>
            ) : isAbsent ? (
              <span className="text-rose-600 font-bold text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                <span>ئەمڕۆ نەهاتووە</span>
              </span>
            ) : is1MinProximity ? (
              <span className="text-amber-600 font-black text-sm flex items-center gap-1">
                <Clock className="w-4 h-4 animate-spin" />
                <span>کەمتر لە ١ خولەک</span>
              </span>
            ) : (
              <span className="text-slate-900 font-bold text-sm flex items-center gap-1">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>~{currentChild.etaMinutes} خولەک</span>
              </span>
            )}
          </div>
        </div>

        {/* Temporary address notice if set */}
        {currentChild.isTemporaryAddress && onRevertToPermanentAddress && (
          <div className="bg-slate-50 p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 text-slate-700">
            <span>
              هۆکاری ناونیشانی کاتی: <strong>{currentChild.addressChangeReason || 'دیاریکراوی باوان'}</strong>
            </span>
            <button
              onClick={() => onRevertToPermanentAddress(currentChild.id)}
              className="text-indigo-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>گەڕاندنەوە بۆ هەمیشەیی</span>
            </button>
          </div>
        )}

        {/* Success message banner */}
        {parentNoteSuccess && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{parentNoteSuccess}</span>
          </div>
        )}

        {/* Action Buttons: 4 Clear, Simple Actions */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
          <button
            id="parent-open-chat-btn"
            onClick={() => setIsChatModalOpen(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>پرسیار بۆ بەڕێوەبەرایەتی</span>
            {unreadRepliesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>

          <button
            id="open-edit-location-btn"
            onClick={() => setIsEditLocationOpen(true)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 text-slate-500" />
            <span>دەستکاریکردنی شوێن</span>
          </button>

          <button
            id="parent-running-late-btn"
            onClick={() => handleAction('running_late')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            ⏳ چاوەڕوانی ٢ خولەک
          </button>

          <button
            id="parent-mark-absent-btn"
            onClick={() => handleAction('mark_absent')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            ❌ ئەمڕۆ نایەت
          </button>
        </div>
      </div>

      {/* Bus and Driver Information Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-base">
            🚌
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              {bus.busNumber} · شۆفێر {bus.driverName}
            </h4>
            <p className="text-slate-500 mt-0.5">
              تابلۆ: {bus.plate} · {bus.isOnDuty ? '🟢 لە خزمەتدایە' : '⚪ وەستاوە'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            id="call-driver-btn"
            href={`tel:${bus.driverPhone}`}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-medium transition flex items-center gap-1.5 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-slate-600" />
            <span>پەیوەندی بە شۆفێر</span>
          </a>

          <a
            id="call-school-btn"
            href={`tel:${school.phone}`}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-medium transition flex items-center gap-1.5 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-slate-600" />
            <span>قوتابخانە</span>
          </a>
        </div>
      </div>

      {/* Modals */}
      <ParentInquiryChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        student={currentChild}
        school={school}
        bus={bus}
        parentName={parentName || currentChild.parentName}
      />

      {isEditLocationOpen && onUpdateStudentAddress && (
        <EditLocationModal
          isOpen={isEditLocationOpen}
          onClose={() => setIsEditLocationOpen(false)}
          student={currentChild}
          onSaveAddress={(studentId, update) => {
            onUpdateStudentAddress(studentId, update);
            const msg = update.isTemporary
              ? `شوێنی کاتی بۆ ${currentChild.name} تۆمارکرا.`
              : `ناونیشانی هەمیشەیی بۆ ${currentChild.name} نوێکرایەوە.`;
            setParentNoteSuccess(msg);
            setTimeout(() => setParentNoteSuccess(null), 5000);
          }}
        />
      )}

      {isAddChildOpen && onAddChild && (
        <AddChildModal
          isOpen={isAddChildOpen}
          onClose={() => setIsAddChildOpen(false)}
          parentName={parentName || currentChild.parentName}
          parentPhone={currentChild.parentPhone}
          parentEmail={currentChild.parentEmail}
          existingChild={currentChild}
          onAddChild={(newChild) => {
            onAddChild(newChild);
            const msg = `منداڵی نوێ (${newChild.name}) زیادکرا.`;
            setParentNoteSuccess(msg);
            setTimeout(() => setParentNoteSuccess(null), 5000);
          }}
        />
      )}
    </div>
  );
};

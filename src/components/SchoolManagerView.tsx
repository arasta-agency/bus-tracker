import React, { useState } from 'react';
import { Bus, OptimizationMetrics, School, Student, TripShift } from '../types';
import {
  AlertTriangle,
  Bus as BusIcon,
  CheckCircle2,
  Clock,
  History,
  Phone,
  Plus,
  Search,
  ShieldAlert,
  UserPlus,
  Users,
  MessageSquare,
} from 'lucide-react';
import { BusDetailsModal } from './BusDetailsModal';
import { ParentDetailsModal } from './ParentDetailsModal';
import { HistoricalTripsView } from './HistoricalTripsView';
import { AddBusDriverModal } from './AddBusDriverModal';
import { AddFamilyModal } from './AddFamilyModal';
import { AdminMessagingCenter } from './AdminMessagingCenter';
import { realtimeMessenger } from '../services/realtimeMessagingService';
import { MOCK_HISTORICAL_TRIPS } from '../data/mockHistoricalTrips';

interface SchoolManagerViewProps {
  school: School;
  buses: Bus[];
  students: Student[];
  metrics: OptimizationMetrics;
  shift: TripShift;
  onOpenBroadcastModal: () => void;
  onOpenDelayModal: () => void;
  onSelectStudent: (studentId: string) => void;
  onToggleAbsentStatus?: (studentId: string) => void;
  onFocusBusOnMap?: (busId: string) => void;
  onAddBus?: (newBus: Bus) => void;
  onAddFamily?: (familyData: {
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    address: string;
    lat: number;
    lng: number;
    children: Array<{
      name: string;
      grade: string;
      avatarBg: string;
      busId: string;
      notes?: string;
    }>;
  }) => void;
  onAssignStudentToBus?: (studentId: string, busId: string) => void;
}

export const SchoolManagerView: React.FC<SchoolManagerViewProps> = ({
  school,
  buses,
  students,
  metrics,
  shift,
  onOpenBroadcastModal,
  onOpenDelayModal,
  onSelectStudent,
  onToggleAbsentStatus,
  onFocusBusOnMap,
  onAddBus,
  onAddFamily,
  onAssignStudentToBus,
}) => {
  const [activeTab, setActiveTab] = useState<'buses' | 'parents' | 'messages' | 'history'>('buses');
  const [searchTerm, setSearchTerm] = useState('');
  const [busFilter, setBusFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [unreadInquiriesCount, setUnreadInquiriesCount] = useState(0);

  // Subscribe to real-time incoming parent inquiries
  React.useEffect(() => {
    const updateCount = () => {
      const msgs = realtimeMessenger.getMessages();
      const count = msgs.filter((m) => m.senderRole === 'parent' && !m.read).length;
      setUnreadInquiriesCount(count);
    };
    updateCount();
    return realtimeMessenger.subscribe(updateCount);
  }, []);

  const [isAddBusModalOpen, setIsAddBusModalOpen] = useState(false);
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
  const [selectedBusForModal, setSelectedBusForModal] = useState<Bus | null>(null);
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<Student | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.parentPhone.includes(searchTerm);

    if (!matchesSearch) return false;
    if (busFilter !== 'all' && s.busId !== busFilter) return false;
    if (statusFilter === 'all') return true;
    if (statusFilter === 'boarded') return s.status === 'boarded' || s.status === 'at_school';
    if (statusFilter === 'waiting') return s.status === 'home_waiting' || s.status === 'proximity_alert_sent';
    if (statusFilter === 'absent') return s.status === 'absent';
    return true;
  });

  return (
    <div id="school-manager-view" dir="rtl" className="space-y-4 font-sans text-right">
      {/* Clean Top Navigation Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs overflow-x-auto">
          <button
            id="manager-tab-buses"
            onClick={() => setActiveTab('buses')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 ${
              activeTab === 'buses'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BusIcon className="w-3.5 h-3.5" />
            <span>پاسەکان ({buses.length})</span>
          </button>

          <button
            id="manager-tab-parents"
            onClick={() => setActiveTab('parents')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 ${
              activeTab === 'parents'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>قوتابیان و خێزانەکان ({students.length})</span>
          </button>

          <button
            id="manager-tab-messages"
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 ${
              activeTab === 'messages'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            <span>پەیامەکان</span>
            {unreadInquiriesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>

          <button
            id="manager-tab-history"
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 ${
              activeTab === 'history'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>مێژووی گەشتەکان</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {onAddBus && (
            <button
              id="manager-add-bus-btn"
              onClick={() => setIsAddBusModalOpen(true)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>پاسی نوێ</span>
            </button>
          )}

          {onAddFamily && (
            <button
              id="manager-add-family-btn"
              onClick={() => setIsAddFamilyModalOpen(true)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition flex items-center gap-1 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>خێزانی نوێ</span>
            </button>
          )}

          <button
            id="manager-quick-delay-btn"
            onClick={onOpenDelayModal}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition flex items-center gap-1 cursor-pointer"
            title="ئاگاداری دواکەوتنی پاس"
          >
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>دواکەوتن</span>
          </button>

          <button
            id="manager-quick-emergency-btn"
            onClick={onOpenBroadcastModal}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-medium rounded-xl transition flex items-center gap-1 cursor-pointer"
            title="ئاگاداری لەناکاو"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>لەناکاو</span>
          </button>
        </div>
      </div>

      {/* ================= TAB: ALL BUSES ================= */}
      {activeTab === 'buses' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {buses.map((bus) => {
              const assigned = students.filter((s) => s.busId === bus.id);
              const boarded = assigned.filter((s) => s.status === 'boarded' || s.status === 'at_school').length;

              return (
                <div
                  key={bus.id}
                  onClick={() => setSelectedBusForModal(bus)}
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:border-slate-300 transition cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                        🚌
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{bus.busNumber}</h4>
                        <span className="text-[11px] text-slate-500 font-mono">{bus.plate}</span>
                      </div>
                    </div>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        bus.isOnDuty
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {bus.isOnDuty ? 'چالاکە' : 'وەستاوە'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span>شۆفێر:</span>
                      <strong className="text-slate-800">{bus.driverName}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>قوتابیانی ئەم پاسە:</span>
                      <span className="font-bold text-slate-800">
                        {boarded} لە {assigned.length} سواربوون
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-400 text-[11px]">کرتە بکە بۆ زانیاری و دەستکاری</span>
                    <button
                      type="button"
                      className="text-xs font-semibold text-indigo-600 hover:underline"
                    >
                      بینینی قوتابیان ←
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB: PARENTS & STUDENTS ================= */}
      {activeTab === 'parents' && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="گەڕان بەپێی ناوی قوتابی، باوان، مۆبایل..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pr-8 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>

            <div className="flex items-center gap-2">
              <select
                aria-label="فلتەر بەپێی پاس"
                value={busFilter}
                onChange={(e) => setBusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 cursor-pointer"
              >
                <option value="all">هەموو پاسەکان</option>
                {buses.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.busNumber}
                  </option>
                ))}
              </select>

              <select
                aria-label="فلتەر بەپێی دۆخ"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 cursor-pointer"
              >
                <option value="all">هەموو دۆخەکان</option>
                <option value="boarded">سواربووەکان</option>
                <option value="waiting">چاوەڕوانەکان</option>
                <option value="absent">نەهاتووەکان</option>
              </select>
            </div>
          </div>

          {/* Clean Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-3">ناوی قوتابی</th>
                  <th className="py-2.5 px-3">باوان و مۆبایل</th>
                  <th className="py-2.5 px-3">ناونیشان</th>
                  <th className="py-2.5 px-3">پاسی دیاریکراو</th>
                  <th className="py-2.5 px-3">دۆخ</th>
                  <th className="py-2.5 px-3 text-center">کردار</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s) => {
                  const isBoarded = s.status === 'boarded' || s.status === 'at_school';
                  const isAbsent = s.status === 'absent';

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {s.name} <span className="text-slate-400 font-normal">({s.grade})</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {s.parentName} · <span className="font-mono text-slate-500">{s.parentPhone}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 max-w-[180px] truncate" title={s.address}>
                        {s.address}
                      </td>
                      <td className="py-3 px-3">
                        {onAssignStudentToBus ? (
                          <select
                            aria-label={`گۆڕینی پاس بۆ ${s.name}`}
                            value={s.busId}
                            onChange={(e) => onAssignStudentToBus(s.id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 cursor-pointer"
                          >
                            {buses.map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.busNumber}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-slate-700 font-medium">{s.busId}</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        {isBoarded ? (
                          <span className="text-emerald-700 font-medium">سواربوو</span>
                        ) : isAbsent ? (
                          <span className="text-rose-600 font-medium">نەهاتوو</span>
                        ) : (
                          <span className="text-slate-500">چاوەڕوان</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => setSelectedStudentForModal(s)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                        >
                          زانیاری
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB: MESSAGES & BROADCASTS ================= */}
      {activeTab === 'messages' && (
        <AdminMessagingCenter school={school} buses={buses} students={students} />
      )}

      {/* ================= TAB: HISTORY ================= */}
      {activeTab === 'history' && (
        <HistoricalTripsView logs={MOCK_HISTORICAL_TRIPS} buses={buses} />
      )}

      {/* Modals */}
      <BusDetailsModal
        bus={selectedBusForModal}
        isOpen={!!selectedBusForModal}
        onClose={() => setSelectedBusForModal(null)}
        assignedStudents={
          selectedBusForModal
            ? students.filter((s) => s.busId === selectedBusForModal.id)
            : []
        }
        allStudents={students}
        school={school}
        onFocusBusOnMap={onFocusBusOnMap}
        onAssignStudentToBus={onAssignStudentToBus}
      />

      <ParentDetailsModal
        student={selectedStudentForModal}
        isOpen={!!selectedStudentForModal}
        onClose={() => setSelectedStudentForModal(null)}
        assignedBus={
          selectedStudentForModal
            ? buses.find((b) => b.id === selectedStudentForModal.busId)
            : undefined
        }
        buses={buses}
        school={school}
        onToggleAbsentStatus={onToggleAbsentStatus}
        onFocusOnMap={onSelectStudent}
        onAssignStudentToBus={onAssignStudentToBus}
      />

      {onAddBus && (
        <AddBusDriverModal
          isOpen={isAddBusModalOpen}
          onClose={() => setIsAddBusModalOpen(false)}
          existingBuses={buses}
          onAddBus={onAddBus}
          school={school}
        />
      )}

      {onAddFamily && (
        <AddFamilyModal
          isOpen={isAddFamilyModalOpen}
          onClose={() => setIsAddFamilyModalOpen(false)}
          buses={buses}
          school={school}
          onAddFamily={onAddFamily}
        />
      )}
    </div>
  );
};

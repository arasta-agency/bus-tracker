import React, { useState } from 'react';
import { Bus, OptimizationMetrics, School, StopWaypoint, Student, TripShift } from '../types';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  LocateFixed,
  MapPin,
  Navigation,
  Pause,
  Phone,
  Play,
  Power,
  PowerOff,
  RotateCcw,
  ShieldAlert,
  Smartphone,
  UserCheck,
  UserX,
} from 'lucide-react';

interface DriverConsoleProps {
  bus: Bus;
  students: Student[];
  school: School;
  waypoints: StopWaypoint[];
  metrics: OptimizationMetrics;
  shift: TripShift;
  onToggleDuty: () => void;
  onTogglePhoneGps?: () => void;
  onStartSimulation: () => void;
  onPauseSimulation: () => void;
  onResetSimulation: () => void;
  onSetSimulationSpeed: (speed: number) => void;
  onBoardStudent: (studentId: string) => void;
  onMarkAbsent: (studentId: string) => void;
  onSkipStop: (studentId: string) => void;
  onOptimizeRoute: () => void;
  onReportDelay: () => void;
  onTriggerEmergency: () => void;
  onSelectStudent: (studentId: string) => void;
}

export const DriverConsole: React.FC<DriverConsoleProps> = ({
  bus,
  students,
  school,
  waypoints,
  metrics,
  shift,
  onToggleDuty,
  onTogglePhoneGps,
  onStartSimulation,
  onPauseSimulation,
  onResetSimulation,
  onSetSimulationSpeed,
  onBoardStudent,
  onMarkAbsent,
  onSkipStop,
  onOptimizeRoute,
  onReportDelay,
  onTriggerEmergency,
  onSelectStudent,
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Next pending student
  const activeStudent = students.find(
    (s) => s.status === 'home_waiting' || s.status === 'proximity_alert_sent' || s.status === 'bus_arrived'
  );

  const boardedCount = students.filter((s) => s.status === 'boarded' || s.status === 'at_school').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;
  const totalCount = students.length;
  const progressPercent = totalCount > 0 ? Math.round(((boardedCount + absentCount) / totalCount) * 100) : 0;

  const handleOptimizeClick = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      onOptimizeRoute();
      setIsOptimizing(false);
    }, 600);
  };

  return (
    <div id="driver-console" dir="rtl" className="space-y-4 font-sans text-right">
      {/* Driver Duty & Shift Control Card */}
      <div
        id="driver-duty-card"
        className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
              🚌
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {bus.driverName} · {bus.busNumber}
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">({bus.plate})</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {shift === 'morning_pickup' ? 'نۆبەی بەیانیان: کۆکردنەوەی قوتابیان' : 'نۆبەی نیوەڕوان: گەڕاندنەوەی ماڵەوە'}
              </p>
            </div>
          </div>

          {/* Duty Switch Button */}
          <div className="flex items-center gap-2">
            <button
              id={bus.isOnDuty ? 'driver-deactivate-btn' : 'driver-activate-btn'}
              onClick={onToggleDuty}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                bus.isOnDuty
                  ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {bus.isOnDuty ? (
                <>
                  <PowerOff className="w-3.5 h-3.5" />
                  <span>تەواوکردنی دەوام</span>
                </>
              ) : (
                <>
                  <Power className="w-3.5 h-3.5" />
                  <span>دەستپێکردنی کار (GPS)</span>
                </>
              )}
            </button>

            {onTogglePhoneGps && bus.isOnDuty && (
              <button
                id="driver-toggle-real-gps-btn"
                onClick={onTogglePhoneGps}
                className={`p-2 rounded-xl border text-xs transition cursor-pointer ${
                  bus.phoneGpsActive
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
                title="جی پی ئێسی مۆبایل"
              >
                <LocateFixed className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Route Simulation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {!bus.isSimulating ? (
              <button
                id="driver-start-route-btn"
                onClick={onStartSimulation}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>دەستپێکردنی جووڵە</span>
              </button>
            ) : (
              <button
                id="driver-pause-route-btn"
                onClick={onPauseSimulation}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <Pause className="w-3.5 h-3.5 fill-slate-950" />
                <span>وەستاندن</span>
              </button>
            )}

            <button
              id="driver-reset-route-btn"
              onClick={onResetSimulation}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              title="سەرەتای ڕێگا"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Speed Multiplier */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl font-medium text-slate-600">
              {[1, 2, 5, 10].map((spd) => (
                <button
                  key={spd}
                  onClick={() => onSetSimulationSpeed(spd)}
                  className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                    bus.simulationSpeed === spd
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="flex items-center gap-2 text-slate-600">
            <span>
              سواربووان: <strong className="text-slate-900">{boardedCount}</strong> لە {totalCount}
            </span>
            <span className="text-slate-300">·</span>
            <span>نەهاتوو: <strong className="text-slate-700">{absentCount}</strong></span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Active Student Stop Card */}
      {activeStudent ? (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-amber-400 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-lg">
              وێستگەی ئێستا (#{activeStudent.pickupSequence})
            </span>
            <span className="text-slate-500">
              دووری: <strong>{activeStudent.distanceKm} کم</strong> (~{activeStudent.etaMinutes} خ)
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-bold text-base text-slate-900">{activeStudent.name}</h4>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{activeStudent.address}</span>
                {activeStudent.isTemporaryAddress && (
                  <span className="text-amber-800 text-[11px] font-bold mr-1">
                    (ناونیشانی کاتی)
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                سەرپەرشتیار: {activeStudent.parentName} ·{' '}
                <a
                  href={`tel:${activeStudent.parentPhone}`}
                  className="text-indigo-600 hover:underline font-mono"
                >
                  {activeStudent.parentPhone}
                </a>
              </p>
            </div>

            {activeStudent.notes && (
              <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl text-xs text-amber-900 max-w-xs">
                {activeStudent.notes}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <button
              id={`board-student-${activeStudent.id}`}
              onClick={() => onBoardStudent(activeStudent.id)}
              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>سواری پاس بوو</span>
            </button>

            <button
              id={`absent-student-${activeStudent.id}`}
              onClick={() => onMarkAbsent(activeStudent.id)}
              className="px-4 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
            >
              <UserX className="w-4 h-4" />
              <span>نەهاتووە</span>
            </button>

            <button
              id={`skip-student-${activeStudent.id}`}
              onClick={() => onSkipStop(activeStudent.id)}
              className="px-3 py-2 text-slate-500 hover:text-slate-800 text-xs font-medium cursor-pointer"
            >
              پەڕاندن
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs text-center space-y-1 text-xs">
          <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="font-bold text-slate-900 text-sm">هەموو وێستگەکان تەواو بوون</h4>
          <p className="text-slate-500">پاسەکە بەرەو {school.name} دەڕوات.</p>
        </div>
      )}

      {/* Quick Incident Reporting Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 text-xs">
        <span className="text-slate-600">پێویستت بە ڕاگەیاندنی بارودۆخی پاس هەیە؟</span>
        <div className="flex items-center gap-2">
          <button
            id="driver-report-delay-btn"
            onClick={onReportDelay}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-medium transition cursor-pointer"
          >
            ڕاگەیاندنی دواکەوتن
          </button>
          <button
            id="driver-emergency-btn"
            onClick={onTriggerEmergency}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-medium transition cursor-pointer"
          >
            فریاگوزاری لەناکاو
          </button>
        </div>
      </div>

      {/* Manifest Table */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <h4 className="font-bold text-slate-900">لیستی قوتابیانی ئەم پاسە ({students.length})</h4>
          <button
            onClick={handleOptimizeClick}
            disabled={isOptimizing}
            className="text-xs text-indigo-600 hover:underline font-semibold cursor-pointer"
          >
            {isOptimizing ? 'ڕێکخستنەوە...' : 'کورتکردنەوەی ڕێگا'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2 px-2">#</th>
                <th className="py-2 px-2">قوتابی</th>
                <th className="py-2 px-2">ناونیشان</th>
                <th className="py-2 px-2">دۆخ</th>
                <th className="py-2 px-2 text-center">کردار</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => {
                const isCompleted = student.status === 'boarded' || student.status === 'at_school';
                const isAbsent = student.status === 'absent';
                const isCurrent = activeStudent?.id === student.id;

                return (
                  <tr
                    key={student.id}
                    onClick={() => onSelectStudent(student.id)}
                    className={`hover:bg-slate-50 transition cursor-pointer ${
                      isCurrent ? 'bg-amber-50/50 font-medium' : ''
                    }`}
                  >
                    <td className="py-2.5 px-2 text-slate-400 font-mono">
                      {student.pickupSequence}
                    </td>
                    <td className="py-2.5 px-2 font-semibold text-slate-900">
                      {student.name}
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 max-w-[180px] truncate">
                      {student.address}
                    </td>
                    <td className="py-2.5 px-2">
                      {isCompleted ? (
                        <span className="text-emerald-700">سواربوو</span>
                      ) : isAbsent ? (
                        <span className="text-rose-600">نەهاتوو</span>
                      ) : isCurrent ? (
                        <span className="text-amber-800 font-bold">ئێستا</span>
                      ) : (
                        <span className="text-slate-400">چاوەڕوان</span>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {!isCompleted && !isAbsent && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBoardStudent(student.id);
                          }}
                          className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-medium transition cursor-pointer"
                        >
                          سەرکەوت
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

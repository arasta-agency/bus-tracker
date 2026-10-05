import React from 'react';
import {
  Bus as BusIcon,
  Bell,
  ShieldAlert,
  Volume2,
  VolumeX,
  Users,
  School as SchoolIcon,
  Sun,
  Moon,
  LogOut,
  LogIn,
  HelpCircle,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { AuthUser, TripShift } from '../types';
import { soundPlayer } from '../utils/audioAlert';

interface HeaderProps {
  currentUser?: AuthUser | null;
  onSignOut?: () => void;
  onOpenLogin?: () => void;
  onOpenHowToUse?: () => void;
  onOpenReport?: () => void;
  activeRole: 'driver' | 'parent' | 'manager';
  onRoleChange: (role: 'driver' | 'parent' | 'manager') => void;
  shift: TripShift;
  onShiftChange: (shift: TripShift) => void;
  emergencyActive: boolean;
  emergencyMessage?: string;
  onClearEmergency?: () => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  unreadMessagesCount?: number;
  onOpenMessages?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSignOut,
  onOpenLogin,
  onOpenHowToUse,
  onOpenReport,
  activeRole,
  onRoleChange,
  shift,
  onShiftChange,
  emergencyActive,
  emergencyMessage,
  onClearEmergency,
  unreadCount,
  onOpenNotifications,
  unreadMessagesCount = 0,
  onOpenMessages,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header
      id="app-header"
      dir="rtl"
      className="bg-white text-slate-800 border-b border-slate-200 sticky top-0 z-40 font-sans"
    >
      {/* Emergency alert bar if active */}
      {emergencyActive && (
        <div
          id="emergency-banner"
          className="bg-rose-50 border-b border-rose-200 px-4 py-2 flex items-center justify-between text-rose-950 text-xs font-medium"
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span className="font-bold text-rose-800">ئاگاداری لەناکاو:</span>
            <span>{emergencyMessage || 'ئاگاداری فریاگوزاری لە قوتابخانەوە دەرکراوە.'}</span>
          </div>
          {onClearEmergency && (
            <button
              id="clear-emergency-btn"
              onClick={onClearEmergency}
              className="text-xs text-rose-700 hover:text-rose-900 underline font-semibold cursor-pointer"
            >
              داخستن
            </button>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
            <BusIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base text-slate-900 leading-none">
              پاسی قوتابخانە
            </h1>
            <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">
              سیستەمی چاودێری و گەیشتنی پارێزراو
            </p>
          </div>
        </div>

        {/* Center Zone: Clean Segmented Role Switcher */}
        {currentUser?.role === 'manager' ? (
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
            <button
              id="role-tab-manager"
              onClick={() => onRoleChange('manager')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeRole === 'manager'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SchoolIcon className="w-3.5 h-3.5" />
              <span>بەڕێوەبەرایەتی</span>
            </button>

            <button
              id="role-tab-driver"
              onClick={() => onRoleChange('driver')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeRole === 'driver'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BusIcon className="w-3.5 h-3.5" />
              <span>شۆفێر</span>
            </button>

            <button
              id="role-tab-parent"
              onClick={() => onRoleChange('parent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeRole === 'parent'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>دایک و باوک</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl font-medium">
            {currentUser?.role === 'parent' ? (
              <>
                <Users className="w-3.5 h-3.5 text-slate-700" />
                <span>دەروازەی باوان</span>
              </>
            ) : (
              <>
                <BusIcon className="w-3.5 h-3.5 text-slate-700" />
                <span>داشبۆردی شۆفێر</span>
              </>
            )}
          </div>
        )}

        {/* Action Controls Zone */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Shift Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-0.5 text-xs">
            <button
              id="shift-morning-btn"
              onClick={() => onShiftChange('morning_pickup')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition cursor-pointer ${
                shift === 'morning_pickup'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="گەشتی بەیانیان (هێنانی قوتابیان)"
            >
              <Sun className="w-3 h-3 text-amber-500" />
              <span>بەیانیان</span>
            </button>
            <button
              id="shift-afternoon-btn"
              onClick={() => onShiftChange('afternoon_dropoff')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition cursor-pointer ${
                shift === 'afternoon_dropoff'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="گەشتی نیوەڕوان (گەڕاندنەوەی ماڵەوە)"
            >
              <Moon className="w-3 h-3 text-indigo-500" />
              <span>نیوەڕوان</span>
            </button>
          </div>

          {/* Realtime Messages icon */}
          {onOpenMessages && (
            <button
              id="header-messages-btn"
              onClick={onOpenMessages}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
              title="پەیامەکان و پەخشی بەپەلە"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
              )}
            </button>
          )}

          {/* Notifications bell */}
          <button
            id="notifications-bell-btn"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            title="ئاگادارییەکان"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {/* Sound toggle */}
          <button
            id="toggle-sound-btn"
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) {
                soundPlayer.playSuccessTone();
              }
            }}
            title={soundEnabled ? 'دەنگ چالاکە' : 'دەنگ بێدەنگە'}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* System Report button */}
          {onOpenReport && (
            <button
              id="header-report-btn"
              onClick={onOpenReport}
              title="ڕاپۆرتی گشتگیری سیستەم"
              className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">ڕاپۆرت</span>
            </button>
          )}

          {/* Help button */}
          {onOpenHowToUse && (
            <button
              id="header-how-to-use-btn"
              onClick={onOpenHowToUse}
              title="ڕێنمایی کورت"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}

          {/* User Profile / Logout */}
          {currentUser ? (
            <div className="flex items-center gap-2 pr-1 mr-1 border-r border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-amber-300 font-bold text-xs flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-slate-800 hidden md:inline max-w-[100px] truncate">
                {currentUser.name}
              </span>
              <button
                id="header-signout-btn"
                onClick={onSignOut}
                className="p-1.5 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                title="چوونەدەرەوە"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            onOpenLogin && (
              <button
                id="header-signin-btn"
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-xl transition cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>چوونەژوورەوە</span>
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

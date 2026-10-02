import React, { useState } from 'react';
import {
  Bus as BusIcon,
  Users,
  School as SchoolIcon,
  Smartphone,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { AuthUser, Bus, School, Student, TripShift, UserRole } from '../types';
import { HowToUseModal } from './HowToUseModal';

interface LoginPageProps {
  buses: Bus[];
  students: Student[];
  school: School;
  currentShift: TripShift;
  onLogin: (user: AuthUser, selectedShift?: TripShift) => void;
  onContinueAsGuest?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  buses,
  students,
  school,
  currentShift,
  onLogin,
  onContinueAsGuest,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('driver');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);

  // Driver fields
  const [driverIdentifier, setDriverIdentifier] = useState<string>('0750 445 8821');
  const [driverPin, setDriverPin] = useState<string>('1040');

  // Parent fields
  const [parentContact, setParentContact] = useState<string>('sara.ali@example.com');
  const [parentPasscode, setParentPasscode] = useState<string>('••••••••');

  // Manager fields
  const [managerEmail, setManagerEmail] = useState<string>('dispatch@horizonacademy.edu');
  const [managerPassword, setManagerPassword] = useState<string>('••••••••');

  const handleDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!driverIdentifier.trim()) {
      setErrorMessage('تکایە ژمارەی مۆبایل یان ناسنامەی شۆفێر بنووسە');
      return;
    }

    const cleanInput = driverIdentifier.replace(/[\s-]/g, '').toLowerCase();
    const matchedBus =
      buses.find(
        (b) =>
          b.driverPhone.replace(/[\s-]/g, '').includes(cleanInput) ||
          b.driverName.toLowerCase().includes(cleanInput) ||
          b.id.toLowerCase() === cleanInput ||
          b.plate.toLowerCase().includes(cleanInput) ||
          b.busNumber.toLowerCase().includes(cleanInput)
      ) || buses[0];

    const user: AuthUser = {
      id: matchedBus.id,
      name: matchedBus.driverName,
      role: 'driver',
      emailOrPhone: driverIdentifier,
      busId: matchedBus.id,
      busNumber: matchedBus.busNumber,
      avatarBg: 'bg-amber-500',
      title: 'شۆفێری پاسی قوتابخانە',
      schoolName: school.name,
    };

    onLogin(user, currentShift);
  };

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!parentContact.trim()) {
      setErrorMessage('تکایە ژمارەی مۆبایل یان ئیمەیڵی تۆمارکراو بنووسە');
      return;
    }

    const cleanInput = parentContact.replace(/[\s-]/g, '').toLowerCase();
    const matchedStudent =
      students.find(
        (s) =>
          s.parentEmail.toLowerCase().includes(cleanInput) ||
          s.parentPhone.replace(/[\s-]/g, '').includes(cleanInput) ||
          s.parentName.toLowerCase().includes(cleanInput)
      ) || students[0];

    const user: AuthUser = {
      id: `usr_parent_${matchedStudent.id}`,
      name: matchedStudent.parentName,
      role: 'parent',
      emailOrPhone: parentContact,
      studentId: matchedStudent.id,
      avatarBg: 'bg-emerald-600',
      title: 'دایک و باوکی قوتابی',
      schoolName: school.name,
    };

    onLogin(user);
  };

  const handleManagerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!managerEmail.trim()) {
      setErrorMessage('تکایە ئیمەیڵی فەرمی کارمەندی بەڕێوەبەرایەتی بنووسە');
      return;
    }

    const user: AuthUser = {
      id: 'usr_manager_vance',
      name: school.principalName,
      role: 'manager',
      emailOrPhone: managerEmail,
      avatarBg: 'bg-indigo-600',
      title: 'بەڕێوەبەری هاتوچۆ و سەلامەتی قوتابخانە',
      schoolName: school.name,
    };

    onLogin(user);
  };

  // Quick 1-click Demo Fillers
  const fillDriverDemo = (busId: string = 'bus_104') => {
    setSelectedRole('driver');
    const bus = buses.find((b) => b.id === busId) || buses[0];
    setDriverIdentifier(bus.driverPhone);
    setDriverPin(bus.id === 'bus_104' ? '1040' : '1080');
    setErrorMessage(null);
  };

  const fillParentDemo = (studentId: string = 'stu_1') => {
    setSelectedRole('parent');
    const stu = students.find((s) => s.id === studentId) || students[0];
    setParentContact(stu.parentEmail);
    setParentPasscode('482910');
    setErrorMessage(null);
  };

  const fillManagerDemo = () => {
    setSelectedRole('manager');
    setManagerEmail('dispatch@horizonacademy.edu');
    setManagerPassword('SchoolAdmin2026!');
    setErrorMessage(null);
  };

  return (
    <div
      id="login-page"
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between py-6 px-4 font-sans text-right"
    >
      {/* Top Header */}
      <header className="max-w-xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <BusIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-sm">پاسی قوتابخانە</h1>
            <p className="text-[11px] text-slate-500">چاودێری ڕاستەوخۆ و ئاگاداری ١ خولەک</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="how-to-use-btn"
            onClick={() => setIsHowToUseOpen(true)}
            className="text-xs text-slate-600 hover:text-slate-900 p-2 rounded-xl transition flex items-center gap-1 font-medium cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">ڕێنمایی</span>
          </button>

          {onContinueAsGuest && (
            <button
              id="continue-as-guest-btn"
              onClick={onContinueAsGuest}
              className="text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>تاقیکردنەوە</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md mx-auto w-full my-6">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
          {/* Card Title */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-slate-900">چوونەژوورەوە بۆ سیستەم</h2>
            <p className="text-xs text-slate-500">
              دەوری خۆت دیاری بکە بۆ دەستپێکردن
            </p>
          </div>

          {/* Role Selection Segmented Bar */}
          <div
            id="login-role-selector"
            className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs"
          >
            <button
              id="select-role-driver"
              type="button"
              onClick={() => {
                setSelectedRole('driver');
                setErrorMessage(null);
              }}
              className={`py-2 px-1 rounded-lg font-medium transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                selectedRole === 'driver'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BusIcon className="w-4 h-4" />
              <span>شۆفێر</span>
            </button>

            <button
              id="select-role-parent"
              type="button"
              onClick={() => {
                setSelectedRole('parent');
                setErrorMessage(null);
              }}
              className={`py-2 px-1 rounded-lg font-medium transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                selectedRole === 'parent'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>دایک و باوک</span>
            </button>

            <button
              id="select-role-manager"
              type="button"
              onClick={() => {
                setSelectedRole('manager');
                setErrorMessage(null);
              }}
              className={`py-2 px-1 rounded-lg font-medium transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                selectedRole === 'manager'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SchoolIcon className="w-4 h-4" />
              <span>بەڕێوەبەر</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* FORM: DRIVER */}
          {selectedRole === 'driver' && (
            <form id="driver-login-form" onSubmit={handleDriverSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ژمارەی مۆبایل یان ناسنامەی شۆفێر
                </label>
                <input
                  id="driver-phone-input"
                  type="text"
                  value={driverIdentifier}
                  onChange={(e) => setDriverIdentifier(e.target.value)}
                  placeholder="بۆ نموونە: 0750 445 8821"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  کۆدی نهێنی (PIN)
                </label>
                <div className="relative">
                  <input
                    id="driver-pin-input"
                    type={showPassword ? 'text' : 'password'}
                    value={driverPin}
                    onChange={(e) => setDriverPin(e.target.value)}
                    maxLength={6}
                    placeholder="1040"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:bg-white focus:border-slate-400 focus:outline-none transition pl-9 text-right"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-2.5 top-2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                id="driver-submit-btn"
                type="submit"
                className="w-full mt-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>چوونەژوورەوە</span>
              </button>
            </form>
          )}

          {/* FORM: PARENT */}
          {selectedRole === 'parent' && (
            <form id="parent-login-form" onSubmit={handleParentSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ئیمەیڵ یان مۆبایلی باوان
                </label>
                <input
                  id="parent-email-input"
                  type="text"
                  value={parentContact}
                  onChange={(e) => setParentContact(e.target.value)}
                  placeholder="بۆ نموونە: sara.ali@example.com"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  وشەی نهێنی
                </label>
                <div className="relative">
                  <input
                    id="parent-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={parentPasscode}
                    onChange={(e) => setParentPasscode(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition pl-9 text-right"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-2.5 top-2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                id="parent-submit-btn"
                type="submit"
                className="w-full mt-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>چوونەژوورەوە</span>
              </button>
            </form>
          )}

          {/* FORM: MANAGER */}
          {selectedRole === 'manager' && (
            <form id="manager-login-form" onSubmit={handleManagerSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ئیمەیڵی بەڕێوەبەرایەتی
                </label>
                <input
                  id="manager-email-input"
                  type="email"
                  value={managerEmail}
                  onChange={(e) => setManagerEmail(e.target.value)}
                  placeholder="dispatch@horizonacademy.edu"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  وشەی نهێنی
                </label>
                <div className="relative">
                  <input
                    id="manager-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={managerPassword}
                    onChange={(e) => setManagerPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition pl-9 text-right"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-2.5 top-2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                id="manager-submit-btn"
                type="submit"
                className="w-full mt-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>چوونەژوورەوە بۆ بەڕێوەبەرایەتی</span>
              </button>
            </form>
          )}

          {/* Quick Demo Shortcuts */}
          <div className="pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-400 block mb-1.5">تاقیکردنەوەی خێرا:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => fillDriverDemo('bus_104')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-medium transition cursor-pointer"
              >
                شۆفێری پاس ١٠٤
              </button>
              <button
                type="button"
                onClick={() => fillParentDemo('stu_1')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-medium transition cursor-pointer"
              >
                باوان (سارا عەلی)
              </button>
              <button
                type="button"
                onClick={fillManagerDemo}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-medium transition cursor-pointer"
              >
                بەڕێوەبەرایەتی
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-2">
        سیستەمی پارێزراوی پاسی قوتابخانە · Horizon Academy
      </footer>

      {isHowToUseOpen && (
        <HowToUseModal isOpen={isHowToUseOpen} onClose={() => setIsHowToUseOpen(false)} />
      )}
    </div>
  );
};

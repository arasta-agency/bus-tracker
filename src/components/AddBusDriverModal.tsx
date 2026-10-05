import React, { useState } from 'react';
import { Bus, School } from '../types';
import {
  AlertCircle,
  Bus as BusIcon,
  CheckCircle2,
  Compass,
  Fuel,
  Gauge,
  Phone,
  ShieldCheck,
  User,
  Users,
  X,
} from 'lucide-react';

interface AddBusDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  school: School;
  existingBuses: Bus[];
  onAddBus: (newBus: Bus) => void;
}

const DRIVER_AVATARS = [
  {
    name: 'شۆفێر ١',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'شۆفێر ٢',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'شۆفێر ٣',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
  },
  {
    name: 'شۆفێر ٤',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
  },
];

const PRESET_DEPOTS = [
  { name: 'گەراجی سەرەکی قوتابخانە', lat: 36.2512, lng: 44.8854 },
  { name: 'گەڕەکی ئاشتی (ڕانیە)', lat: 36.2520, lng: 44.8840 },
  { name: 'گەڕەکی بەختیاری (ڕانیە)', lat: 36.2625, lng: 44.8810 },
  { name: 'گەڕەکی قەڵات (ڕانیە)', lat: 36.2588, lng: 44.8825 },
];

export const AddBusDriverModal: React.FC<AddBusDriverModalProps> = ({
  isOpen,
  onClose,
  school,
  existingBuses,
  onAddBus,
}) => {
  // Suggest next bus number
  const nextBusNum = `Bus ${104 + existingBuses.length * 4}`;
  const [busNumber, setBusNumber] = useState(`پاسی ${104 + existingBuses.length * 4}`);
  const [plate, setPlate] = useState(`24-B-${Math.floor(1000 + Math.random() * 9000)}`);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('0750 ');
  const [driverPhoto, setDriverPhoto] = useState(DRIVER_AVATARS[0].url);
  const [model, setModel] = useState('Toyota Coaster Deluxe');
  const [year, setYear] = useState('2024');
  const [capacity, setCapacity] = useState('24');
  const [fuelTankLiters, setFuelTankLiters] = useState('95');
  const [selectedDepot, setSelectedDepot] = useState(PRESET_DEPOTS[0]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!driverName.trim()) {
      setErrorMessage('تکایە ناوی تەواوی شۆفێر بنووسە');
      return;
    }
    if (!driverPhone.trim() || driverPhone.trim().length < 8) {
      setErrorMessage('تکایە ژمارەی مۆبایلی شۆفێر بە دروستی بنووسە');
      return;
    }
    if (!busNumber.trim()) {
      setErrorMessage('تکایە ژمارە یان ناوی پاس بنووسە');
      return;
    }

    const newBusId = `bus_${Date.now()}`;
    const newBus: Bus = {
      id: newBusId,
      busNumber: busNumber.trim(),
      plate: plate.trim() || `24-B-${Math.floor(1000 + Math.random() * 9000)}`,
      driverName: driverName.trim(),
      driverPhone: driverPhone.trim(),
      driverPhoto: driverPhoto,
      capacity: parseInt(capacity, 10) || 24,
      fuelTankLiters: parseInt(fuelTankLiters, 10) || 90,
      avgLitersPer100Km: 29.0,
      currentLat: selectedDepot.lat,
      currentLng: selectedDepot.lng,
      heading: 0,
      speedKmh: 0,
      status: 'idle',
      isOnDuty: true,
      dutyStartedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      phoneGpsActive: true,
      assignedSchoolId: school.id,
      currentStopIndex: 0,
      isSimulating: false,
      simulationSpeed: 2,
      delayMinutes: 0,
      emergencyActive: false,
      model: model.trim() || 'Toyota Coaster',
      year: parseInt(year, 10) || 2024,
      lastServiceDate: new Date().toISOString().split('T')[0],
      maintenanceStatus: 'excellent',
    };

    onAddBus(newBus);
    onClose();
  };

  return (
    <div
      id="add-bus-driver-modal"
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm font-sans text-right animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20">
              <BusIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">
                تۆمارکردنی پاس و شۆفێری نوێ بۆ قوتابخانە
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                تایبەت بە بەڕێوەبەرایەتی: <span className="text-amber-300 font-bold">{school.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Driver Information */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <User className="w-4 h-4 text-amber-500" />
              <span>زانیاری کەسی شۆفێر</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ناوی تەواوی شۆفێر:
                </label>
                <input
                  type="text"
                  id="new-driver-name-input"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="بۆ نموونە: سەردار قادر سەعید"
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400 transition text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ژمارەی مۆبایلی شۆفێر:
                </label>
                <input
                  type="text"
                  id="new-driver-phone-input"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="0750 123 4567"
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-400 transition text-right"
                />
              </div>
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                وێنەی شۆفێر:
              </label>
              <div className="flex items-center gap-3">
                {DRIVER_AVATARS.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setDriverPhoto(avatar.url)}
                    className={`relative rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                      driverPhoto === avatar.url
                        ? 'border-amber-500 ring-2 ring-amber-400/50 scale-105'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={avatar.url} alt={avatar.name} className="w-10 h-10 object-cover" />
                    {driverPhoto === avatar.url && (
                      <span className="absolute bottom-0 right-0 bg-amber-500 text-slate-950 p-0.5 rounded-tl">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Bus Specifications */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <BusIcon className="w-4 h-4 text-indigo-600" />
              <span>تایبەتمەندی و زانیاری پاسەکە</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ناو / ژمارەی پاس:
                </label>
                <input
                  type="text"
                  id="new-bus-number-input"
                  value={busNumber}
                  onChange={(e) => setBusNumber(e.target.value)}
                  placeholder="پاسی ١١٢"
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400 transition text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  تابلۆی فەرمی پاس:
                </label>
                <input
                  type="text"
                  id="new-bus-plate-input"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  placeholder="24-B-8899"
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-400 transition text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  مۆدێلی ئۆتۆمبێل:
                </label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Toyota Coaster"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400 transition text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ساڵی دروستکردن:
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2024"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-400 transition text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  توانای کورسی:
                </label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="24"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-400 transition text-right"
                />
              </div>
            </div>

            {/* Fuel Tank & Starting Depot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  تەنکی سووتەمەنی (لیتر):
                </label>
                <input
                  type="number"
                  value={fuelTankLiters}
                  onChange={(e) => setFuelTankLiters(e.target.value)}
                  placeholder="95"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-400 transition text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  شوێنی دەستپێکی پاس (گەراج/وێستگە):
                </label>
                <select
                  aria-label="شوێنی دەستپێکی پاس"
                  value={selectedDepot.name}
                  onChange={(e) => {
                    const match = PRESET_DEPOTS.find((d) => d.name === e.target.value);
                    if (match) setSelectedDepot(match);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-400 transition cursor-pointer"
                >
                  {PRESET_DEPOTS.map((depot) => (
                    <option key={depot.name} value={depot.name}>
                      {depot.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              پاشگەزبوونەوە
            </button>
            <button
              type="submit"
              id="confirm-add-bus-btn"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <BusIcon className="w-4 h-4 text-slate-950" />
              <span>تۆمارکردن و زیادکردنی پاسەکە</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

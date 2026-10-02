import React, { useState } from 'react';
import { Bus, School, Student } from '../types';
import {
  AlertCircle,
  Bus as BusIcon,
  CheckCircle2,
  Home,
  MapPin,
  Plus,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  X,
} from 'lucide-react';

interface AddFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  school: School;
  buses: Bus[];
  onAddFamily: (familyData: {
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
}

const RANYA_NEIGHBORHOODS = [
  { name: 'گەڕەکی بەختیاری', address: 'ڕانیە، گەڕەکی بەختیاری، شەقامی سەرەکی', lat: 36.2625, lng: 44.8810 },
  { name: 'گەڕەکی قەڵات', address: 'ڕانیە، گەڕەکی قەڵات، کۆڵانی گوڵەکان', lat: 36.2588, lng: 44.8825 },
  { name: 'گەڕەکی دڵۆپە', address: 'ڕانیە، گەڕەکی دڵۆپە، نزیک پەیمانگا', lat: 36.2642, lng: 44.8778 },
  { name: 'گەڕەکی نەورۆز / ڕاستی', address: 'ڕانیە، گەڕەکی نەورۆز، کۆڵانی ١٦', lat: 36.2465, lng: 44.8882 },
  { name: 'گەڕەکی شەهیدان', address: 'ڕانیە، گەڕەکی شەهیدان، کۆڵانی ٨', lat: 36.2562, lng: 44.8968 },
  { name: 'گەڕەکی ئاشتی', address: 'ڕانیە، گەڕەکی ئاشتی، نزیک باخچە', lat: 36.2608, lng: 44.8905 },
  { name: 'شەقامی مام جەلال', address: 'ڕانیە، شەقامی مام جەلال، بەرامبەر زانکۆ', lat: 36.2520, lng: 44.8840 },
  { name: 'شەقامی پێشەوا', address: 'ڕانیە، شەقامی پێشەوا، نزیک قەڵاتی نوێ', lat: 36.2510, lng: 44.8769 },
];

const GRADE_OPTIONS = [
  'پۆلی یەکەم (ژووری ١٠١)',
  'پۆلی دووەم (ژووری ١٠٢)',
  'پۆلی سێیەم (ژووری ٢٠١)',
  'پۆلی چوارەم (ژووری ٢٠٤)',
  'پۆلی پێنجەم (ژووری ٣٠١)',
  'پۆلی شەشەم (ژووری ٣٠٥)',
  'باخچەی ساوایان (KG)',
];

const COLOR_OPTIONS = [
  'bg-emerald-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-teal-500',
  'bg-indigo-600',
];

interface ChildFormState {
  id: string;
  name: string;
  grade: string;
  avatarBg: string;
  busId: string;
  notes: string;
}

export const AddFamilyModal: React.FC<AddFamilyModalProps> = ({
  isOpen,
  onClose,
  school,
  buses,
  onAddFamily,
}) => {
  // Family Information
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('0750 ');
  const [parentEmail, setParentEmail] = useState('');
  const [address, setAddress] = useState(RANYA_NEIGHBORHOODS[0].address);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(RANYA_NEIGHBORHOODS[0]);

  // Children list (default 1 child)
  const defaultBusId = buses[0]?.id || 'bus_104';
  const [children, setChildren] = useState<ChildFormState[]>([
    {
      id: 'child_1',
      name: '',
      grade: 'پۆلی یەکەم (ژووری ١٠١)',
      avatarBg: 'bg-emerald-500',
      busId: defaultBusId,
      notes: '',
    },
  ]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddChildRow = () => {
    const nextIdx = children.length + 1;
    const nextColor = COLOR_OPTIONS[nextIdx % COLOR_OPTIONS.length];
    setChildren((prev) => [
      ...prev,
      {
        id: `child_${Date.now()}_${Math.random()}`,
        name: '',
        grade: 'پۆلی دووەم (ژووری ١٠٢)',
        avatarBg: nextColor,
        busId: prev[0]?.busId || defaultBusId,
        notes: '',
      },
    ]);
  };

  const handleRemoveChildRow = (id: string) => {
    if (children.length <= 1) return;
    setChildren((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateChild = (id: string, field: keyof ChildFormState, value: string) => {
    setChildren((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!parentName.trim()) {
      setErrorMessage('تکایە ناوی تەواوی باوان / سەرپەرشتیار بنووسە');
      return;
    }
    if (!parentPhone.trim() || parentPhone.trim().length < 8) {
      setErrorMessage('تکایە ژمارەی مۆبایلی باوان بە دروستی بنووسە');
      return;
    }

    // Validate that every child has a name
    for (let i = 0; i < children.length; i++) {
      if (!children[i].name.trim()) {
        setErrorMessage(`تکایە ناوی قوتابی #${i + 1} بنووسە`);
        return;
      }
    }

    const emailValue = parentEmail.trim() || `${parentName.trim().replace(/\s+/g, '.').toLowerCase()}@family.edu`;

    onAddFamily({
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      parentEmail: emailValue,
      address: address.trim(),
      lat: selectedNeighborhood.lat,
      lng: selectedNeighborhood.lng,
      children: children.map((c) => ({
        name: c.name.trim(),
        grade: c.grade.trim(),
        avatarBg: c.avatarBg,
        busId: c.busId,
        notes: c.notes.trim() || undefined,
      })),
    });

    onClose();
  };

  return (
    <div
      id="add-family-modal"
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm font-sans text-right animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-emerald-500/20">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">
                تۆمارکردنی خێزانی نوێ لەگەڵ زانیاری منداڵەکانیان
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                تایبەت بە بەڕێوەبەرایەتی قوتابخانە • دەستنیشانکردنی دەستبەجێی پاسی قوتابیان
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
        <form onSubmit={handleSubmit} className="p-5 space-y-5 overflow-y-auto flex-1">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* SECTION 1: PARENT / GUARDIAN DETAILS */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs pb-1 border-b border-slate-200">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>بەشی ١: زانیاری سەرپەرشتیار / دایک و باوک</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ناوی تەواوی باوان:
                </label>
                <input
                  type="text"
                  id="new-family-parent-name"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="بۆ نموونە: د. هێمن کاروان"
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400 transition text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ژمارەی مۆبایل:
                </label>
                <input
                  type="text"
                  id="new-family-parent-phone"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="0750 334 5566"
                  required
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-amber-400 transition text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ئیمەیڵی پەیوەندی (ئارەزوومەندانە):
                </label>
                <input
                  type="email"
                  id="new-family-parent-email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="hemin.k@example.com"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400 transition text-right"
                />
              </div>
            </div>

            {/* Neighborhood / Address Preset Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>ناونیشان و گەڕەکی نیشتەجێبوون (لە ڕانیە):</span>
                <span className="text-[10px] text-slate-400 font-normal">کلیک بکە بۆ دیاریکردنی خێرای شوێن</span>
              </label>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {RANYA_NEIGHBORHOODS.map((hood) => (
                  <button
                    key={hood.name}
                    type="button"
                    onClick={() => {
                      setSelectedNeighborhood(hood);
                      setAddress(hood.address);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
                      selectedNeighborhood.name === hood.name
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-400 font-bold shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{hood.name}</span>
                  </button>
                ))}
              </div>

              <input
                type="text"
                id="new-family-address-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="ڕانیە، ناوی گەڕەک، کۆڵان، نیشانەی نزیک"
                required
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400 transition text-right"
              />
            </div>
          </div>

          {/* SECTION 2: CHILDREN LIST (SUPPORT MULTIPLE CHILDREN) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                <Users className="w-4 h-4 text-amber-500" />
                <span>بەشی ٢: زانیاری منداڵەکان و دیاریکردنی پاس ({children.length} منداڵ)</span>
              </div>

              <button
                type="button"
                onClick={handleAddChildRow}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-slate-950" />
                <span>+ زیادکردنی منداڵێکی تر بۆ ئەم خێزانە</span>
              </button>
            </div>

            {/* Child items */}
            <div className="space-y-3">
              {children.map((child, index) => (
                <div
                  key={child.id}
                  className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full ${child.avatarBg} text-white text-xs font-bold flex items-center justify-center`}>
                        {index + 1}
                      </span>
                      <span className="font-bold text-xs text-slate-800">
                        منداڵی ژمارە {index + 1}
                      </span>
                    </div>

                    {children.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveChildRow(child.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                        title="سڕینەوەی ئەم منداڵە"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Child Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        ناوی سیانی قوتابی:
                      </label>
                      <input
                        type="text"
                        value={child.name}
                        onChange={(e) => handleUpdateChild(child.id, 'name', e.target.value)}
                        placeholder="بۆ نموونە: دیار هێمن کاروان"
                        required
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition text-right"
                      />
                    </div>

                    {/* Grade / Class */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        پۆل و ژوور:
                      </label>
                      <select
                        aria-label="پۆل و ژووری خوێندنی قوتابی"
                        value={child.grade}
                        onChange={(e) => handleUpdateChild(child.id, 'grade', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-400 transition cursor-pointer"
                      >
                        {GRADE_OPTIONS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Bus Assignment Dropdown */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        دەستنیشانکردنی پاس:
                      </label>
                      <select
                        aria-label="دەستنیشانکردنی پاسی قوتابی"
                        value={child.busId}
                        onChange={(e) => handleUpdateChild(child.id, 'busId', e.target.value)}
                        className="w-full bg-amber-50/70 border border-amber-300 font-bold rounded-xl px-2.5 py-2 text-xs text-amber-950 focus:outline-none focus:border-amber-500 transition cursor-pointer"
                      >
                        {buses.map((bus) => (
                          <option key={bus.id} value={bus.id}>
                            🚌 {bus.busNumber} ({bus.driverName} - {bus.plate})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes & Avatar color row */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        value={child.notes}
                        onChange={(e) => handleUpdateChild(child.id, 'notes', e.target.value)}
                        placeholder="تێبینی تایبەت (ئارەزوومەندانە): بەردەم ماڵ، نەخۆشی یان شوێنی دابەزین"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white transition text-right"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-[10px] text-slate-500">ڕەنگ:</span>
                      {COLOR_OPTIONS.slice(0, 5).map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={() => handleUpdateChild(child.id, 'avatarBg', col)}
                          className={`w-5 h-5 rounded-full ${col} transition cursor-pointer ${
                            child.avatarBg === col ? 'ring-2 ring-slate-900 scale-110' : 'opacity-60 hover:opacity-100'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
              id="confirm-add-family-btn"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>تۆمارکردنی سەرجەم زانیارییەکان</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  ChevronRight, 
  Calendar, 
  CreditCard, 
  Clock, 
  ChevronLeft,
  Phone,
  Home,
  MapPin,
  Zap,
  ShieldCheck,
  Sparkles,
  Info,
  Tag,
  Plus,
  Minus,
  Maximize2,
  Map as MapIcon,
  AlertTriangle,
  Sun,
  CloudSun,
  Moon,
  TrendingUp,
  Ban,
  User,
  Hash,
  MapPinned
} from 'lucide-react';
import { Button, Card, Input, Select, Badge } from '../components/ui';
import { SERVICES, LOCATIONS } from '../lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

const BASE_TIME_SLOTS = [
  { time: '09:00 AM', hour: 9, category: 'Morning', icon: Sun, badge: 'Popular' },
  { time: '11:00 AM', hour: 11, category: 'Morning', icon: Sun },
  { time: '02:00 PM', hour: 14, category: 'Afternoon', icon: CloudSun, badge: 'Fastest' },
  { time: '04:00 PM', hour: 16, category: 'Afternoon', icon: CloudSun },
  { time: '06:00 PM', hour: 18, category: 'Evening', icon: Moon },
];

const ADDONS_LIST = [
  { id: 'sanitization', label: 'Sanitization+', price: 499, icon: Sparkles, desc: '99.9% germ elimination' },
  { id: 'eco', label: 'Eco-Formula', price: 299, icon: ShieldCheck, desc: 'Pet & kid safe' },
  { id: 'priority', label: 'Priority Expert', price: 399, icon: Zap, desc: 'Top-rated professional' }
];

const getNextDays = (days: number) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: d.toISOString().split('T')[0],
      isToday: i === 0
    });
  }
  return dates;
};

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [dates] = useState(getNextDays(14));
  const [zoom, setZoom] = useState(1);
  const mapRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    serviceId: searchParams.get('service') || SERVICES[0].id,
    variantLabel: '',
    locationId: searchParams.get('location') || '',
    date: '',
    time: '',
    name: '',
    phone: '',
    address: '',
    selectedAddons: [] as string[],
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    address: false
  });

  const selectedService = SERVICES.find(s => s.id === formData.serviceId);
  const selectedVariant = selectedService?.variants.find(v => v.label === formData.variantLabel);
  const selectedLocation = LOCATIONS.find(l => l.id === formData.locationId);

  const dynamicSlots = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const isToday = formData.date === dates[0].fullDate;
    const dateSeed = formData.date.split('-').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return BASE_TIME_SLOTS.map((slot, index) => {
      let status: 'available' | 'full' | 'past' | 'limited' = 'available';
      if (isToday && slot.hour <= currentHour + 1) {
        status = 'past';
      } else {
        const pseudoRandom = (dateSeed + index) % 10;
        if (pseudoRandom < 2) status = 'full';
        else if (pseudoRandom < 4) status = 'limited';
      }
      return { ...slot, status };
    });
  }, [formData.date, dates]);

  const updateField = (field: string, value: any) => {
    if (field === 'phone') value = value.replace(/\D/g, '').slice(0, 10);
    setFormData(p => ({ ...p, [field]: value }));
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const toggleAddon = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(id) 
        ? prev.selectedAddons.filter(a => a !== id)
        : [...prev.selectedAddons, id]
    }));
  };

  useEffect(() => {
    if (selectedService && !formData.variantLabel) {
      updateField('variantLabel', selectedService.variants[0].label);
    }
  }, [formData.serviceId]);

  useEffect(() => {
    if (!formData.date) updateField('date', dates[0].fullDate);
  }, [dates]);

  useEffect(() => {
    if (formData.time) {
      const currentSlot = dynamicSlots.find(s => s.time === formData.time);
      if (!currentSlot || currentSlot.status === 'past' || currentSlot.status === 'full') {
        updateField('time', '');
      }
    }
  }, [formData.date, dynamicSlots]);

  const isValidPhone = /^[6-9]\d{9}$/.test(formData.phone);
  const isValidName = formData.name.trim().length >= 3;
  const isValidAddress = formData.address.trim().length >= 10;
  
  const isStep1Valid = !!formData.serviceId && !!formData.locationId && !!formData.variantLabel;
  const isStep2Valid = !!formData.date && !!formData.time;
  const isStep3Valid = isValidName && isValidPhone && isValidAddress;

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 1), 2.5));
  };

  const handlePinDragEnd = (event: any, info: any) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((info.point.x - rect.left) / rect.width) * 100;
    const y = ((info.point.y - rect.top) / rect.height) * 100;
    let closest = LOCATIONS[0];
    let minDistance = Infinity;
    LOCATIONS.forEach(loc => {
      if (loc.coords) {
        const d = Math.sqrt(Math.pow(loc.coords.x - x, 2) + Math.pow(loc.coords.y - y, 2));
        if (d < minDistance) {
          minDistance = d;
          closest = loc;
        }
      }
    });
    updateField('locationId', closest.id);
  };

  const basePrice = (typeof selectedVariant?.price === 'number') ? selectedVariant.price : 0;
  const addonsTotal = formData.selectedAddons.reduce((acc, id) => {
    const addon = ADDONS_LIST.find(a => a.id === id);
    return acc + (addon?.price || 0);
  }, 0);
  const subtotal = basePrice + addonsTotal;
  const discount = Math.round(subtotal * 0.1);
  const tax = Math.round((subtotal - discount) * 0.18);
  const totalPayable = subtotal - discount + tax;

  const selectedFullDate = dates.find(d => d.fullDate === formData.date);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 selection:bg-blue-100">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 5 ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="p-16 text-center bg-white rounded-[4rem] shadow-3xl overflow-hidden relative border-none">
                <div className="absolute top-0 left-0 w-full h-3 bg-blue-600" />
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }} className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10">
                  <CheckCircle2 size={56} />
                </motion.div>
                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Booking Successful!</h2>
                <p className="text-gray-500 font-medium mb-12 max-w-sm mx-auto">Thank you for choosing Shoba. Your cleaning expert will see you on {selectedFullDate?.date} {selectedFullDate?.month} at {formData.time}.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button variant="secondary" size="lg" onClick={() => navigate('/status')} className="rounded-2xl">Track Order</Button>
                   <Button variant="outline" size="lg" onClick={() => navigate('/')} className="rounded-2xl">Return Home</Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="p-8 md:p-14 shadow-3xl border-none bg-white rounded-[3.5rem]">
                <div className="flex items-center gap-6 mb-12 border-b border-gray-100 pb-10">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-200">
                    {step}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                      {step === 1 ? 'Configure Service' : step === 2 ? 'Schedule Visit' : step === 3 ? 'Contact Info' : 'Final Review'}
                    </h2>
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.25em]">Step {step} of 4</p>
                  </div>
                </div>

                {step === 1 && (
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Service Type</label>
                        <Select value={formData.serviceId} onChange={e => updateField('serviceId', e.target.value)}>
                          {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                        </Select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Choose Package</label>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedService?.variants.map(v => (
                            <button
                              key={v.label} 
                              onClick={() => updateField('variantLabel', v.label)}
                              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center group ${formData.variantLabel === v.label ? 'border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-200' : 'border-gray-50 bg-gray-50/50 hover:border-blue-200'}`}
                            >
                              <span className="text-[11px] font-black mb-1 uppercase tracking-tighter">{v.label}</span>
                              <span className={`text-[10px] font-bold ${formData.variantLabel === v.label ? 'text-blue-100' : 'text-green-600'}`}>
                                {v.price === 'inspection' ? 'Quote Required' : `₹${v.price}`}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                         <h3 className="text-xl font-black text-gray-900">Neighborhood Mapping</h3>
                         <div className="flex items-center gap-2">
                            <button onClick={() => handleZoom(0.25)} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all"><Plus size={18} /></button>
                            <button onClick={() => handleZoom(-0.25)} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all"><Minus size={18} /></button>
                         </div>
                      </div>
                      <div ref={mapRef} className="relative aspect-[21/9] bg-blue-50/50 rounded-[3rem] overflow-hidden border-2 border-gray-100 shadow-inner cursor-crosshair">
                        <motion.div className="absolute inset-0 w-full h-full origin-center" animate={{ scale: zoom }} transition={{ type: 'spring', stiffness: 200, damping: 30 }}>
                          <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#2563EB 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
                          {LOCATIONS.map(loc => (
                            <button key={loc.id} onClick={() => updateField('locationId', loc.id)} className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: `${loc.coords?.x}%`, top: `${loc.coords?.y}%` }}>
                              <div className={`w-4 h-4 rounded-full border-4 transition-all ${formData.locationId === loc.id ? 'bg-blue-600 border-white scale-125 shadow-xl shadow-blue-300' : 'bg-white border-blue-200'}`} />
                            </button>
                          ))}
                        </motion.div>
                        <motion.div drag dragConstraints={mapRef} dragElastic={0} onDragEnd={handlePinDragEnd} className="absolute z-30 cursor-grab active:cursor-grabbing" style={{ left: selectedLocation?.coords ? `${selectedLocation.coords.x}%` : '50%', top: selectedLocation?.coords ? `${selectedLocation.coords.y}%` : '50%' }} animate={{ left: selectedLocation?.coords ? `${selectedLocation.coords.x}%` : '50%', top: selectedLocation?.coords ? `${selectedLocation.coords.y}%` : '50%' }}>
                           <div className="flex flex-col items-center -translate-y-full">
                              <div className="bg-white px-5 py-2.5 rounded-2xl shadow-3xl border-2 border-blue-600 mb-3 flex items-center gap-2"><MapPin size={18} className="text-blue-600" /><span className="text-sm font-black text-gray-900">{selectedLocation?.name || 'Drag Pin'}</span></div>
                              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl ring-4 ring-white rotate-45"><MapIcon size={24} className="-rotate-45" /></div>
                           </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-16">
                    <div className="space-y-6">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Calendar size={16} className="text-blue-600" /> Preferred Date</label>
                      <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar -mx-10 px-10">
                        {dates.map((d) => (
                          <motion.button key={d.fullDate} onClick={() => updateField('date', d.fullDate)} whileHover={{ scale: 1.02 }} className={`flex flex-col items-center justify-center min-w-[110px] h-[140px] rounded-[3rem] border-2 transition-all shrink-0 ${formData.date === d.fullDate ? 'border-blue-600 bg-blue-600 text-white shadow-2xl' : 'border-gray-50 bg-white shadow-sm'}`}>
                            <span className="text-[10px] font-black uppercase mb-1 opacity-60">{d.month}</span>
                            <span className="text-3xl font-black">{d.date}</span>
                            <span className="text-[10px] font-black uppercase mt-1 opacity-70">{d.day}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-10">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><Clock size={16} className="text-blue-600" /> Dynamic Slots</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dynamicSlots.map(slot => (
                          <motion.button key={slot.time} disabled={slot.status === 'past' || slot.status === 'full'} onClick={() => updateField('time', slot.time)} className={`p-6 rounded-[2.5rem] border-2 transition-all flex items-center justify-between ${formData.time === slot.time ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xl' : (slot.status === 'past' || slot.status === 'full') ? 'opacity-40 grayscale cursor-not-allowed border-gray-50' : 'border-gray-50 bg-white hover:border-blue-200'}`}>
                            <div className="flex items-center gap-4">
                               <div className={`p-3 rounded-2xl ${formData.time === slot.time ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}><slot.icon size={22} /></div>
                               <div className="text-left"><span className="text-lg font-black block">{slot.time}</span><span className="text-[10px] font-bold uppercase tracking-widest">{slot.status === 'past' ? 'Passed' : 'Window'}</span></div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <h3 className="text-xl font-black text-gray-900 flex items-center gap-3"><User size={20} className="text-blue-600" /> Personal Details</h3>
                        <div className="space-y-6">
                           <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label><Input placeholder="Rahul Sharma" value={formData.name} onChange={e => updateField('name', e.target.value)} onBlur={() => handleBlur('name')} />{touched.name && !isValidName && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">Min 3 chars</p>}</div>
                           <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label><Input placeholder="10-digit Number" type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)} onBlur={() => handleBlur('phone')} />{touched.phone && !isValidPhone && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">Valid 10-digit number</p>}</div>
                           <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Service Address</label><Input placeholder="House/Flat No, Apartment, Area" value={formData.address} onChange={e => updateField('address', e.target.value)} onBlur={() => handleBlur('address')} />{touched.address && !isValidAddress && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">Complete address required</p>}</div>
                        </div>
                      </div>
                      <div className="space-y-8">
                         <h3 className="text-xl font-black text-gray-900 flex items-center gap-3"><Sparkles size={20} className="text-blue-600" /> Premium Upgrades</h3>
                         <div className="grid grid-cols-1 gap-3">
                            {ADDONS_LIST.map(addon => (
                              <button key={addon.id} onClick={() => toggleAddon(addon.id)} className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all ${formData.selectedAddons.includes(addon.id) ? 'border-blue-600 bg-blue-50' : 'border-transparent bg-gray-50/50 hover:bg-gray-100'}`}><div className="flex items-center gap-3"><div className={`p-2 rounded-xl ${formData.selectedAddons.includes(addon.id) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}><addon.icon size={16} /></div><div className="text-left"><p className="text-[11px] font-black text-gray-900">{addon.label}</p><p className="text-[9px] font-bold text-gray-400 uppercase">{addon.desc}</p></div></div><span className="text-[11px] font-black text-blue-600">+₹{addon.price}</span></button>
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                         <div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Review Booking</h3>
                            <p className="text-gray-500 font-medium">Please verify your service details before we confirm.</p>
                         </div>
                         <div className="space-y-4">
                            <div className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-start gap-5">
                               <div className="p-4 bg-blue-600 text-white rounded-[1.5rem] shadow-lg"><Sparkles size={24} /></div>
                               <div>
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Service & Area</p>
                                  <p className="text-lg font-black text-gray-900">{selectedService?.title} ({selectedVariant?.label})</p>
                                  <p className="text-sm font-bold text-blue-600 mt-1 flex items-center gap-1"><MapPinned size={14} /> {selectedLocation?.name}</p>
                               </div>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-start gap-5">
                               <div className="p-4 bg-blue-600 text-white rounded-[1.5rem] shadow-lg"><Calendar size={24} /></div>
                               <div>
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Schedule</p>
                                  <p className="text-lg font-black text-gray-900">{selectedFullDate?.day}, {selectedFullDate?.date} {selectedFullDate?.month}</p>
                                  <p className="text-sm font-bold text-blue-600 mt-1 flex items-center gap-1"><Clock size={14} /> {formData.time} Arrival Window</p>
                               </div>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-start gap-5">
                               <div className="p-4 bg-blue-600 text-white rounded-[1.5rem] shadow-lg"><User size={24} /></div>
                               <div>
                                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Customer Info</p>
                                  <p className="text-lg font-black text-gray-900">{formData.name}</p>
                                  <p className="text-sm font-medium text-gray-500 mt-1 line-clamp-1">{formData.address}</p>
                               </div>
                            </div>
                         </div>
                      </div>
                      <div className="bg-gray-900 text-white rounded-[3.5rem] p-10 shadow-3xl overflow-hidden relative">
                         <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><ShieldCheck size={180} /></div>
                         <h3 className="text-xl font-black mb-10 border-b border-white/10 pb-6 flex items-center justify-between">Order Summary <Hash size={20} className="text-gray-700" /></h3>
                         <div className="space-y-5 mb-10">
                           <div className="flex justify-between text-base"><span className="text-gray-400 font-bold">{selectedVariant?.label} Service</span><span className="font-black text-white">₹{basePrice}</span></div>
                           {formData.selectedAddons.map(id => {
                             const addon = ADDONS_LIST.find(a => a.id === id);
                             return <div key={id} className="flex justify-between text-sm"><span className="text-gray-400 font-bold">{addon?.label}</span><span className="font-black text-blue-400">+₹{addon?.price}</span></div>;
                           })}
                           <div className="h-px bg-white/10 my-4" />
                           <div className="flex justify-between text-sm text-green-400"><span className="font-black uppercase tracking-tighter text-[11px]">Elite Loyalty Discount (10%)</span><span className="font-black">-₹{discount}</span></div>
                           <div className="flex justify-between text-sm text-gray-400"><span className="font-bold">GST (18%)</span><span className="font-black">₹{tax}</span></div>
                         </div>
                         <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10"><div className="flex justify-between items-end"><div><span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] block mb-2">Total Payable</span><span className="text-5xl font-black text-white leading-none">₹{totalPayable}</span></div></div></div>
                         <div className="mt-8 flex items-center justify-center gap-6 text-gray-500 text-[9px] font-black uppercase tracking-widest"><div className="flex items-center gap-2"><CreditCard size={14} /> Pay Post-Visit</div><div className="flex items-center gap-2"><ShieldCheck size={14} /> 100% Satisfaction</div></div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-20 flex gap-6 pt-12 border-t border-gray-50">
                  {step > 1 && (
                    <Button variant="ghost" onClick={() => setStep(step - 1)} className="flex-1 h-20 rounded-[2rem] font-black uppercase text-xs tracking-widest text-gray-400 hover:text-gray-900 transition-all group">
                      <ChevronLeft size={24} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
                    </Button>
                  )}
                  <Button 
                    variant="secondary" size="xl" className="flex-[2] h-20 rounded-[2rem] text-xl shadow-2xl shadow-blue-500/20 group"
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && !isStep1Valid) ||
                      (step === 2 && !isStep2Valid) ||
                      (step === 3 && !isStep3Valid)
                    }
                  >
                    {step === 4 ? 'Confirm & Book Now' : 'Continue'} 
                    <ChevronRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import { Search, Loader2, CheckCircle2, Clock, User, MapPin, Calendar, ChevronLeft, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button, Card, Input } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';

const MOCK_BOOKING = {
  id: 'SHOBA-77312',
  status: 'confirmed',
  service: 'Full Home Deep Cleaning',
  variant: '3 BHK',
  date: 'Today, Oct 24',
  time: '11:00 AM',
  location: 'HSR Layout, Bangalore',
  expert: 'Manjunath G.',
  rating: '4.9/5',
  total: '₹6,999'
};

const STATUS_STEPS = [
  { key: 'requested', label: 'Requested', icon: Clock },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'assigned', label: 'Expert Assigned', icon: User },
  { key: 'completed', label: 'Done', icon: ShieldCheck },
];

export default function StatusPage() {
  const [searchParams] = useSearchParams();
  const [phone, setPhone] = useState(searchParams.get('phone') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<typeof MOCK_BOOKING | null>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Enter a valid 10-digit number');
      return;
    }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      if (phone === '9876543210' || phone === '9123456789') setBooking(MOCK_BOOKING);
      else setError('No active booking found for this number.');
      setIsLoading(false);
    }, 1500);
  };

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.key === booking?.status);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 mb-10 transition-colors">
          <ChevronLeft size={14} /> Return Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Track Booking</h1>
          <p className="text-gray-500 font-medium">Real-time status of your home service expert.</p>
        </div>

        <Card className="p-4 mb-12 shadow-2xl rounded-3xl border-none bg-white">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Input 
                type="tel" placeholder="Enter your 10-digit mobile" 
                value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="pl-12 h-16 rounded-2xl bg-gray-50 border-none font-bold text-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
            </div>
            <Button type="submit" variant="primary" disabled={isLoading} className="w-16 h-16 rounded-2xl shrink-0">
              {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          </form>
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-4 ml-4">{error}</motion.p>}
        </Card>

        <AnimatePresence mode="wait">
          {booking && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="p-10 bg-white rounded-[2.5rem] shadow-xl border-none relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />
                <div className="flex justify-between items-center mb-12">
                  <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{booking.id}</div>
                  <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {booking.status}
                  </div>
                </div>
                <div className="relative flex justify-between px-2">
                  <div className="absolute top-5 left-4 right-4 h-0.5 bg-gray-100 -z-0" />
                  <div 
                    className="absolute top-5 left-4 h-0.5 bg-blue-600 transition-all duration-1000 -z-0"
                    style={{ width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 95}%` }}
                  />
                  {STATUS_STEPS.map((step, idx) => {
                    const isActive = idx <= currentStepIndex;
                    return (
                      <div key={step.key} className="relative z-10 flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-white border-2 border-gray-100 text-gray-200'}`}>
                          <step.icon size={18} />
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest mt-4 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-300'}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-8 bg-white rounded-3xl shadow-lg border-none">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Service Info</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Sparkles size={20} /></div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Service & Variant</p>
                        <p className="font-black text-gray-900">{booking.service} ({booking.variant})</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="text-center p-8 bg-blue-600 text-white rounded-3xl shadow-xl">
                <p className="text-sm font-bold opacity-90 mb-1">Need help?</p>
                <p className="text-lg font-black tracking-tight">Support: +91 98765 43210</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

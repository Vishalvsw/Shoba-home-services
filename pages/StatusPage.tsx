
'use client';

import React, { useState } from 'react';
import { Search, Loader2, CheckCircle2, Clock, User, MapPin, Calendar, ChevronLeft, ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Button, Card, Input } from '../components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MOCK_BOOKING = {
  id: 'SHOBA-77312',
  status: 'assigned',
  service: 'Deep Home Cleaning',
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
  const [phone, setPhone] = useState('');
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
      // For demo purposes, any number works
      setBooking(MOCK_BOOKING);
      setIsLoading(false);
    }, 1200);
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
          <p className="text-gray-500 font-medium">Get the live status of your home service professional.</p>
        </div>

        <Card className="p-4 mb-12 shadow-2xl rounded-[2rem] border-none bg-white">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Input 
                type="tel" placeholder="Enter your mobile number" 
                value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="pl-12 h-16 rounded-2xl bg-gray-50 border-none font-bold text-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
            </div>
            <Button type="submit" variant="secondary" disabled={isLoading} className="w-16 h-16 rounded-2xl shrink-0">
              {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          </form>
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-4 ml-4">{error}</motion.p>}
        </Card>

        <AnimatePresence mode="wait">
          {booking && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card className="p-10 bg-white rounded-[2.5rem] shadow-xl border-none relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
                <div className="flex justify-between items-center mb-12">
                  <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{booking.id}</div>
                  <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200">
                    Live Status
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
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-white border-2 border-gray-100 text-gray-200'}`}>
                          <step.icon size={20} />
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest mt-4 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-300'}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-8 bg-white rounded-[2.5rem] shadow-lg border-none">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Clock size={12} /> Service Info</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Sparkles size={20} /></div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Service</p>
                        <p className="font-black text-gray-900">{booking.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Calendar size={20} /></div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Slot</p>
                        <p className="font-black text-gray-900">{booking.date} @ {booking.time}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-white rounded-[2.5rem] shadow-lg border-none">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2"><User size={12} /> Pro Details</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><User size={20} /></div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Assigned Expert</p>
                        <p className="font-black text-gray-900">{booking.expert} <span className="text-yellow-600 ml-2">★ 4.9</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Zap size={20} /></div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Verification</p>
                        <p className="font-black text-green-600">Background Checked</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="p-8 bg-blue-600 text-white rounded-[2rem] shadow-2xl shadow-blue-900/20 text-center">
                <p className="text-xs font-bold text-blue-200 mb-1 uppercase tracking-widest">Need urgent help?</p>
                <p className="text-2xl font-black">Call Support: +91 98765 43210</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

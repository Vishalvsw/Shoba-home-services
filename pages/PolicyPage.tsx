
import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  RefreshCcw, 
  CheckCircle2, 
  ChevronLeft,
  CalendarDays,
  CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, Badge } from '../components/ui';
import { motion } from 'framer-motion';

export default function PolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 mb-10 transition-colors">
          <ChevronLeft size={14} /> Back to home
        </Link>

        <header className="mb-16">
          <Badge variant="default" className="mb-4">Standard Operating Procedure</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Cancellation & <br />
            <span className="text-blue-600">Rescheduling Policy</span>
          </h1>
          <p className="text-gray-500 mt-6 text-lg font-medium max-w-2xl">
            We value your time and our professionals' commitment. Our policies are designed to be fair to both our customers and our service experts.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {/* Main Cancellation Card */}
          <Card className="p-10 md:p-12 bg-white border-none shadow-xl rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <AlertCircle size={160} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-3">
              <Clock className="text-blue-600" /> Cancellation Guidelines
            </h2>
            
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-3xl bg-green-50 border border-green-100">
                  <div className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-2">Flexible</div>
                  <h3 className="font-black text-gray-900 text-lg mb-1">{">"} 24 Hours</h3>
                  <p className="text-sm text-gray-500 font-bold">No charges. Full refund or free rescheduling.</p>
                </div>
                <div className="p-6 rounded-3xl bg-orange-50 border border-orange-100">
                  <div className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2">Standard</div>
                  <h3 className="font-black text-gray-900 text-lg mb-1">4 - 24 Hours</h3>
                  <p className="text-sm text-gray-500 font-bold">50% service fee applies to cover pro's commute/slot.</p>
                </div>
                <div className="p-6 rounded-3xl bg-red-50 border border-red-100">
                  <div className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">Critical</div>
                  <h3 className="font-black text-gray-900 text-lg mb-1">{"<"} 4 Hours</h3>
                  <p className="text-sm text-gray-500 font-bold">100% service fee applies for last-minute cancellation.</p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                    <RefreshCcw size={18} className="text-blue-600" /> Rescheduling Terms
                </h4>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-sm font-medium text-gray-600">
                        <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Rescheduling is free if done at least 12 hours before the service slot.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm font-medium text-gray-600">
                        <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Slots can be moved up to 7 days from the original booking date.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm font-medium text-gray-600">
                        <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                        <span>If a professional has already reached your location, rescheduling will attract a ₹200 convenience fee.</span>
                    </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Refund & Guarantee Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-blue-600 text-white border-none shadow-2xl rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 opacity-10">
                    <ShieldCheck size={200} />
                </div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <ShieldCheck size={24} /> 100% Satisfaction
                </h3>
                <p className="text-blue-100 text-sm font-medium leading-relaxed mb-6">
                    Not happy with the results? We offer a 7-day re-service guarantee. If any part of the agreed checklist is missed, we'll send an expert back to fix it for free.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest border border-white/20">
                    ISO 9001:2015 Quality Policy
                </div>
            </Card>

            <Card className="p-8 bg-white border-none shadow-xl rounded-[2.5rem]">
                <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard size={24} className="text-blue-600" /> Refund Process
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
                    Eligible refunds are processed back to the original payment method within 5-7 business days. For cash bookings, the amount is credited as Shoba Wallet points.
                </p>
                <Link to="/status" className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2">
                    Check Refund Status <ChevronLeft size={14} className="rotate-180" />
                </Link>
            </Card>
          </div>

          {/* Help Footer */}
          <div className="text-center py-10">
              <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-4">Need further clarification?</p>
              <div className="flex flex-wrap justify-center gap-8">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600"><CalendarDays size={20} /></div>
                      <div className="text-left">
                          <p className="text-[10px] font-black text-gray-400 uppercase">Support Hours</p>
                          <p className="font-black text-gray-900 text-sm">24 / 7 Available</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600"><ShieldCheck size={20} /></div>
                      <div className="text-left">
                          <p className="text-[10px] font-black text-gray-400 uppercase">Helpline</p>
                          <p className="font-black text-gray-900 text-sm">+91 98765 43210</p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

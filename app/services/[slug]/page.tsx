
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, Clock, Shield, AlertCircle, Sparkles, ChevronLeft } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import { SERVICES } from '@/lib/constants';

export default function ServiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    return <div className="p-32 text-center font-bold text-gray-400">Service not found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 mb-8 transition-colors">
          <ChevronLeft size={14} /> Back to explore
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1 space-y-12">
            <header className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">{service.title}</h1>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">{service.fullDescription}</p>
            </header>

            {/* Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.images.map((img, i) => (
                <div key={i} className="aspect-video rounded-3xl overflow-hidden shadow-xl">
                  <img src={img} alt={`${service.title} image ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Variants Table */}
            <Card className="p-8 border-none shadow-xl rounded-3xl overflow-hidden bg-white">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <Badge variant="price">Rates Card</Badge> Selection Guide
              </h2>
              <div className="space-y-4">
                {service.variants.map((variant, i) => (
                  <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors group cursor-default">
                    <div>
                      <div className="font-black text-lg text-gray-900 group-hover:text-blue-700 transition-colors">{variant.label}</div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{variant.sizeInfo}</div>
                    </div>
                    <div className="text-right">
                      {variant.price === 'inspection' ? (
                        <span className="text-xs font-black text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">Inspection Required</span>
                      ) : (
                        <div className="flex flex-col items-end">
                          <span className="text-2xl font-black text-green-600">₹{variant.price}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Final Price</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-50">
                   <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <Check size={20} />
                   </div>
                   <span className="font-bold text-gray-700">{feat}</span>
                </div>
              ))}
            </div>

            {/* FAQs */}
            {service.faqs.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black">Frequently Asked</h3>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => (
                    <details key={i} className="group bg-white rounded-2xl border-2 border-gray-50 p-6 cursor-pointer open:border-blue-100">
                      <summary className="flex items-center justify-between list-none font-black text-gray-800">
                        {faq.question}
                        <ChevronLeft size={20} className="group-open:-rotate-90 transition-transform -rotate-180 text-blue-600" />
                      </summary>
                      <p className="mt-4 text-gray-500 leading-relaxed font-medium">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-96">
            <div className="sticky top-24">
              <Card className="p-8 shadow-2xl rounded-3xl border-none relative bg-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
                <h3 className="text-xl font-black mb-2">Book Service</h3>
                <div className="mb-8">
                  <span className="text-4xl font-black text-green-600">{service.priceRange.split(' ')[0]}</span>
                  <span className="text-xs font-bold text-gray-400 ml-2 uppercase">Starting</span>
                </div>

                <div className="space-y-5 mb-10 border-t border-gray-50 pt-8">
                   <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                     <Clock className="text-blue-500" size={18} /> Duration: 2-6 Hours
                   </div>
                   <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                     <Shield className="text-blue-500" size={18} /> Expert Service Guarantee
                   </div>
                   <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                     <Sparkles className="text-blue-500" size={18} /> Eco-friendly Cleaning
                   </div>
                </div>

                <Button 
                  variant="primary" 
                  size="xl" 
                  className="w-full h-16 rounded-2xl text-lg shadow-xl shadow-blue-900/10"
                  onClick={() => router.push(`/booking?service=${service.id}`)}
                >
                  Book Slot
                </Button>
                
                <p className="text-center text-[10px] font-bold text-gray-400 uppercase mt-6 flex items-center justify-center gap-2">
                  <AlertCircle size={12} /> Pay after service completion
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

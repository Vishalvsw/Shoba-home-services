
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Clock, Shield, AlertCircle, Info } from 'lucide-react';
import { Button, Card, Badge } from '../components/ui';
import { SERVICES } from '../lib/constants';

export default function ServiceDetail() {
  const params = useParams();
  const slug = params?.slug;
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    return <div className="p-20 text-center">Service not found. <Link to="/" className="text-blue-600 underline">Go Home</Link></div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN - CONTENT */}
          <div className="flex-1">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:text-blue-600">Home</Link> &gt; <span className="text-gray-900">{service.title}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{service.title}</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{service.fullDescription}</p>

            {/* Detailed Pricing Table */}
            <Card className="p-6 mb-8 border-none shadow-sm overflow-hidden">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Badge variant="price">Verified Rates</Badge> Detailed Rate Card
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type / Size</th>
                                <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Estimated Area</th>
                                <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Final Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {service.variants.map((v, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-4 font-bold text-gray-900">{v.label}</td>
                                    <td className="py-4 px-4 text-gray-500 text-sm">{v.sizeInfo}</td>
                                    <td className="py-4 px-4 text-right">
                                        {v.price === 'inspection' ? (
                                            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full border border-orange-100">Inspection Req.</span>
                                        ) : (
                                            <span className="text-lg font-extrabold text-green-600">₹{v.price}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
                    <Info size={14} className="mt-0.5 shrink-0" />
                    <p>Flat 50% discount already applied to the final prices shown above. Actual market rates are usually 2x higher.</p>
                </div>
            </Card>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-2 mb-10 rounded-xl overflow-hidden">
              <img src={service.images[0]} alt="Service 1" className="w-full h-48 object-cover" />
              <div className="grid grid-rows-1 h-48">
                 <img src={service.images[0]} alt="Service 2" className="w-full h-full object-cover grayscale opacity-50" />
              </div>
            </div>

            {/* Features List */}
            <Card className="p-6 mb-8 border-none shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What's Included</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="text-green-600 mt-1 shrink-0" size={18} />
                    <span className="text-gray-700">{feat}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* FAQs */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Common Questions</h2>
              {service.faqs.map((faq, i) => (
                <details key={i} className="bg-white rounded-lg border border-gray-200 open:ring-1 open:ring-blue-100 p-4 cursor-pointer">
                  <summary className="font-semibold text-gray-900 list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-blue-600 text-xl font-light">+</span>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - PRICING CARD (Sticky) */}
          <div className="lg:w-96">
            <div className="sticky top-24">
              <Card className="p-6 shadow-xl border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Booking</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-extrabold text-green-600">{service.priceRange.split(' ')[0]}</span>
                </div>
                <p className="text-xs text-gray-500 mb-6">Select your house size in the next step to see exact price.</p>

                <div className="space-y-4 mb-8 border-t border-b border-gray-100 py-4">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Clock size={16} className="text-blue-500" />
                    <span>Duration: 2-6 Hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Shield size={16} className="text-blue-500" />
                    <span>Price Guarantee</span>
                  </div>
                </div>

                <Link to={`/booking?service=${service.id}`}>
                  <Button variant="primary" size="xl" className="w-full shadow-orange-500/30">
                    Select & Book
                  </Button>
                </Link>
                
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  <AlertCircle size={12} />
                  <span>No payment required until service completion</span>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

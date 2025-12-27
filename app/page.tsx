
'use client';

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Star, MapPin, Search, ArrowRight, ChevronDown, Loader2, X } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { SERVICES, LOCATIONS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

const CardImageSlider = ({ images, title }: { images: string[], title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="h-56 relative overflow-hidden bg-gray-200">
      <AnimatePresence mode='popLayout'>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={title}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover absolute inset-0"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
      <div className="absolute bottom-4 left-4 flex gap-1 z-20">
        {images.map((_, idx) => (
          <div key={idx} className={`w-1 h-1 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-3' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
    setIsDropdownOpen(false);
    setSearchQuery('');
    setIsLoadingServices(true);
    setTimeout(() => setIsLoadingServices(false), 800);
  };

  const currentCity = LOCATIONS.find(l => l.id === selectedCity);
  const filteredLocations = LOCATIONS.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#2563EB 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-8 border border-blue-100 shadow-sm">
              <ShieldCheck size={14} className="text-blue-600" /> Professional Grade Equipment
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.05] mb-8">
              Reliable Home Care,<br />
              <span className="text-blue-600 relative inline-block">
                Tailored for You.
                <motion.span 
                  className="absolute bottom-1 left-0 w-full h-2 bg-blue-100 -z-10" 
                  initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.8, duration: 1 }}
                />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
              Instant booking for deep cleaning, pest control, and sofa revival. Expertly verified professionals across Bangalore.
            </p>

            {/* City Selector */}
            <div className="max-w-md mx-auto relative z-40">
              <div className="relative">
                <button 
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    if (!isDropdownOpen) setSearchQuery('');
                  }}
                  className="w-full flex items-center bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-2 pr-4 transition-all hover:border-blue-300 focus:ring-4 focus:ring-blue-100"
                >
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mr-3">
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-0.5">Where do you live?</span>
                    <span className={`text-lg font-bold ${selectedCity ? 'text-gray-900' : 'text-gray-400'}`}>
                      {currentCity?.name || "Select Service Area..."}
                    </span>
                  </div>
                  <ChevronDown className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-2 text-left z-50 flex flex-col"
                    >
                      {/* Search Bar inside dropdown */}
                      <div className="p-2 border-b border-gray-50 mb-2">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            autoFocus
                            type="text"
                            placeholder="Search neighborhood..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none"
                          />
                          {searchQuery && (
                            <button 
                              onClick={() => setSearchQuery('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="max-h-64 overflow-y-auto custom-scrollbar">
                        {filteredLocations.length > 0 ? (
                          filteredLocations.map((loc) => (
                            <button
                              key={loc.id}
                              onClick={() => handleCitySelect(loc.id)}
                              className={`w-full px-5 py-3 rounded-xl flex items-center justify-between group transition-colors mb-1 last:mb-0 ${selectedCity === loc.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
                            >
                              <span className="font-bold">{loc.name}</span>
                              {selectedCity === loc.id ? (
                                <CheckCircle2 size={18} />
                              ) : (
                                <ArrowRight size={16} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="p-6 text-center">
                            <p className="text-sm font-bold text-gray-400">No neighborhoods found</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="relative mt-24 max-w-7xl mx-auto">
            <AnimatePresence mode='wait'>
              {isLoadingServices ? (
                <motion.div 
                  key="loading" 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24"
                >
                  <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Mapping Local Experts...</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="services"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {SERVICES.map((service, idx) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group"
                    >
                      <div className="bg-white rounded-3xl border-2 border-gray-50 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full text-left">
                        <CardImageSlider images={service.images} title={service.title} />
                        <div className="p-8 flex flex-col flex-grow">
                          <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                          <p className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-2">{service.shortDescription}</p>
                          
                          <div className="mt-auto flex items-center justify-between">
                            <div>
                               <span className="text-[10px] font-black text-gray-400 uppercase block">Starting From</span>
                               <span className="text-2xl font-black text-green-600">{service.priceRange.split(' ')[0]}</span>
                            </div>
                            <Button 
                              variant="primary" 
                              onClick={() => {
                                if (selectedCity) navigate(`/booking?service=${service.id}&location=${selectedCity}`);
                                else navigate(`/services/${service.slug}`);
                              }}
                              className="px-6 rounded-2xl"
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="bg-gray-50 py-16 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, label: "Verified Pros", sub: "Safety First" },
              { icon: CheckCircle2, label: "Fixed Prices", sub: "No Surprises" },
              { icon: Star, label: "4.9/5 Rating", sub: "Happy Users" },
              { icon: MapPin, label: "Hyperlocal", sub: "Always Near" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center text-blue-600 mb-4">
                  <item.icon size={28} />
                </div>
                <div className="font-black text-gray-900 mb-1">{item.label}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area Links */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Serviced Neighborhoods</h2>
          <p className="text-gray-500 mb-12 max-w-md mx-auto">Available in almost every corner of Bangalore. Just select your area and book.</p>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {LOCATIONS.map(loc => (
              <Link 
                key={loc.id} 
                to={`/locations/${loc.slug}`}
                className="px-6 py-3 rounded-2xl border-2 border-gray-50 hover:border-blue-200 hover:bg-blue-50 transition-all font-bold text-sm text-gray-700 flex items-center gap-2"
              >
                <MapPin size={14} className="text-blue-600" /> {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

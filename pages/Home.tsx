
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  Zap,
  CheckCircle2,
  Clock,
  Award,
  Star,
  Users,
  Quote,
  Target,
  BadgePercent,
  Search
} from 'lucide-react';
import { Button, Card, Badge } from '../components/ui';
import { SERVICES, LOCATIONS, TESTIMONIALS } from '../lib/constants';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

// --- Particle Component ---
const Particle: React.FC<{ index: number }> = ({ index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 50 + index * 2, damping: 20 + index });
  const springY = useSpring(y, { stiffness: 50 + index * 2, damping: 20 + index });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveFactor = 0.05 + (index % 5) * 0.01;
      x.set((clientX - window.innerWidth / 2) * moveFactor);
      y.set((clientY - window.innerHeight / 2) * moveFactor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [index, x, y]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="absolute rounded-full bg-blue-400 pointer-events-none opacity-20"
      initial={{ 
        width: Math.random() * 8 + 2, 
        height: Math.random() * 8 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleCitySelect = (cityId: string) => {
    setIsRefreshing(true);
    setSelectedCity(cityId);
    setIsDropdownOpen(false);
    // Simulate data refresh for localized services
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const currentCity = LOCATIONS.find(l => l.id === selectedCity);

  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-20 pb-24 overflow-hidden bg-gray-900">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1581578731117-10d52143b0d8?auto=format&fit=crop&w=1920&q=80" 
            alt="Pristine Home Interior" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/60 to-gray-900" />
          <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[1px]" />
          
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

          {[...Array(20)].map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Centered Content Wrapper */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-2xl shadow-blue-500/40 mx-auto"
              >
                <ShieldCheck size={18} /> Bangalore's #1 Home Care Platform
              </motion.div>
              
              <h1 className="text-6xl md:text-9xl font-black text-white tracking-tight leading-[0.9] mb-10 drop-shadow-2xl">
                Affordable<br />
                <span className="text-blue-500">Excellence.</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-xl mx-auto font-medium leading-relaxed mb-16 drop-shadow-md">
                Experience premium deep cleaning and pest management delivered by background-verified experts at prices that fit your life.
              </p>

              {/* Enhanced & Prominent CTA Selector - Centered */}
              <div className="max-w-xl relative z-50 mx-auto">
                <motion.div 
                  className="relative group"
                  animate={{ scale: isDropdownOpen ? 1 : [1, 1.015, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="relative w-full flex items-center bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(37,99,235,0.4)] border-2 border-transparent p-5 transition-all hover:border-blue-400"
                  >
                    <div className="p-4 bg-blue-600 text-white rounded-2xl mr-6 shadow-2xl shadow-blue-200">
                      <MapPin size={40} />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest block mb-1">Select Service Area</span>
                      <span className={`text-2xl font-black ${selectedCity ? 'text-gray-900' : 'text-gray-400'}`}>
                        {currentCity?.name || "Choose Your Neighborhood..."}
                      </span>
                    </div>
                    <ChevronDown className={`text-blue-300 mr-4 transition-transform duration-500 ${isDropdownOpen ? 'rotate-180' : ''}`} size={32} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-6 bg-white rounded-[2.5rem] shadow-3xl border border-gray-100 overflow-hidden z-50 p-4 text-left"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {LOCATIONS.map((loc) => (
                            <button
                              key={loc.id}
                              onClick={() => handleCitySelect(loc.id)}
                              className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${selectedCity === loc.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'hover:bg-blue-50 text-gray-700 font-bold'}`}
                            >
                              <span>{loc.name}</span>
                              {selectedCity === loc.id && <Zap size={16} className="fill-white" />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Quick Trust Badges - Centered */}
              <div className="mt-14 flex flex-wrap gap-10 items-center justify-center">
                 <div className="flex items-center gap-3">
                    <BadgePercent className="text-blue-500" size={24} />
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">50% Off First Booking</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-500" size={24} />
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">ISO 9001 Certified</span>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Trust Indicator */}
        <div className="hidden xl:block absolute bottom-20 right-20 z-20">
           <motion.div 
             initial={{ opacity: 0, x: 50 }} 
             animate={{ opacity: 1, x: 0 }} 
             transition={{ delay: 1 }}
             className="bg-white/10 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/20 shadow-2xl flex items-center gap-6"
           >
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xl">
                 <Users size={32} />
              </div>
              <div>
                 <div className="text-3xl font-black text-white">15,000+</div>
                 <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Happy Bangalore Homes</div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section id="services" className="py-40 container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="text-left">
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Signature Offerings</h2>
              <div className="flex items-center gap-4">
                <p className="text-gray-500 text-xl font-medium">Transparent, all-inclusive pricing. No hidden visit fees.</p>
                {selectedCity && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100 shadow-sm">
                    <MapPin size={14} /> Showing {currentCity?.name} Rates
                  </motion.div>
                )}
              </div>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 px-8 py-5 bg-green-50 text-green-700 rounded-3xl border border-green-100">
                  <CheckCircle2 size={20} />
                  <span className="text-xs font-black uppercase tracking-widest text-center">Satisfaction Guaranteed</span>
               </div>
            </div>
          </div>

          <motion.div 
            key={selectedCity}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`grid grid-cols-1 md:grid-cols-3 gap-14 relative ${isRefreshing ? 'pointer-events-none opacity-40' : ''}`}
          >
            {isRefreshing && (
              <div className="absolute inset-0 z-50 flex items-center justify-center">
                 <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Search className="text-blue-600" size={48} />
                 </motion.div>
              </div>
            )}
            {SERVICES.map((service, idx) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="group">
                <div className="bg-white rounded-[3.5rem] border-2 border-gray-50 shadow-sm hover:shadow-[0_80px_120px_-40px_rgba(0,0,0,0.15)] transition-all duration-700 overflow-hidden flex flex-col h-full relative">
                  <div className="h-80 overflow-hidden relative">
                    <img src={service.images[0]} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Dynamic Availability Badge */}
                    <AnimatePresence>
                      {selectedCity && (
                        <motion.div 
                          initial={{ x: -20, opacity: 0 }} 
                          animate={{ x: 0, opacity: 1 }} 
                          className="absolute top-8 left-8 bg-blue-600 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-2xl border border-blue-400"
                        >
                          <Zap size={16} className="fill-white" />
                          <span className="text-[10px] font-black uppercase tracking-[0.1em]">Available in {currentCity?.name}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="absolute top-8 right-8 bg-white/95 backdrop-blur px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-2xl">
                      <Star size={18} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-black">4.9</span>
                    </div>
                  </div>
                  
                  <div className="p-12 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-8">
                       <Sparkles size={18} className="text-blue-600" />
                       <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Top Rated Expert Service</span>
                    </div>
                    
                    <h3 className="text-4xl font-black text-gray-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors">{service.title}</h3>
                    <p className="text-gray-600 text-base font-medium mb-12 leading-relaxed line-clamp-2">{service.shortDescription}</p>
                    
                    <div className="mt-auto space-y-8">
                      <div className="flex items-center justify-between p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group/price">
                        <div className="relative z-10">
                          <span className="text-[11px] font-black text-gray-400 uppercase block tracking-widest mb-1">
                            {selectedCity ? 'Local Rate' : 'From'}
                          </span>
                          <span className="text-3xl font-black text-green-600">
                            {service.priceRange.split(' ')[0]}
                          </span>
                        </div>
                        <div className="text-right relative z-10">
                          {selectedCity ? (
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter mb-1">Expert Found Nearby</span>
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-200" />
                            </div>
                          ) : (
                            <span className="text-[11px] font-black text-orange-600 bg-orange-100 px-4 py-2 rounded-2xl">20% OFF</span>
                          )}
                        </div>
                        {selectedCity && <motion.div layoutId="bg-highlight" className="absolute inset-0 bg-blue-50/30 -z-0" />}
                      </div>
                      
                      <Button 
                        variant="secondary" size="lg" className="w-full h-20 rounded-[2rem] text-xl shadow-2xl shadow-blue-500/20"
                        onClick={() => navigate(`/booking?service=${service.id}${selectedCity ? `&location=${selectedCity}` : ''}`)}
                      >
                        {selectedCity ? `Book in ${currentCity?.name}` : 'Book Now'} <ArrowRight size={24} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- TRUST BANNER --- */}
      <section className="py-32 bg-gray-900 text-white rounded-[5rem] mx-4 mb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 text-center">
            {[
              { icon: ShieldCheck, title: "Verified Pros", desc: "Rigorous 10-point background check for every expert." },
              { icon: Award, title: "Service Warranty", desc: "7-day re-service guarantee for total peace of mind." },
              { icon: Clock, title: "On-Time Arrival", desc: "Punctual professional or get ₹200 credited back." },
              { icon: Zap, title: "Post-Job Payment", desc: "Review the work and pay securely after completion." }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -12 }} className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mb-10 text-blue-400 border border-white/10 shadow-2xl">
                  <item.icon size={44} />
                </div>
                <h4 className="text-2xl font-black mb-6">{item.title}</h4>
                <p className="text-base text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="pb-40 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">The Talk of the Layout</h2>
                <p className="text-gray-500 text-xl font-medium">Join over 15,000 Bangalore families who trust Shoba.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {TESTIMONIALS.map((review) => (
                    <Card key={review.id} className="p-12 border-none bg-gray-50 rounded-[4rem] shadow-sm relative group">
                        <Quote className="absolute top-12 right-12 text-gray-200/50" size={72} />
                        <div className="relative z-10">
                            <div className="flex gap-1.5 mb-8">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />)}
                            </div>
                            <p className="text-gray-700 font-medium mb-12 leading-relaxed text-xl">"{review.comment}"</p>
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-200">
                                    {review.user[0]}
                                </div>
                                <div>
                                    <p className="font-black text-gray-900 text-xl">{review.user}</p>
                                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">{review.service}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      {/* --- AREA NAVIGATION --- */}
      <section className="py-40 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-20 flex flex-col items-center">
             <div className="p-7 bg-white rounded-[3rem] shadow-2xl border border-gray-100 mb-10">
                 <Target size={52} className="text-blue-600" />
             </div>
             <h2 className="text-5xl font-black text-gray-900">Neighborhood Hubs</h2>
             <p className="text-gray-500 text-lg mt-6">Real-time availability across all of Bangalore's major layouts.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {LOCATIONS.map(loc => (
              <Link 
                key={loc.id} 
                to={`/locations/${loc.slug}`}
                className="px-12 py-8 rounded-[2.5rem] bg-white border-2 border-transparent hover:border-blue-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all font-black text-sm uppercase tracking-[0.25em] text-gray-700 flex items-center gap-4 group"
              >
                <MapPin size={24} className="text-blue-600 group-hover:scale-110 transition-transform" /> {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Search, 
  MapPin, 
  Phone, 
  Calendar, 
  LayoutDashboard,
  ArrowRight,
  ShieldCheck,
  Home as HomeIcon,
  MessageSquare
} from 'lucide-react';
import { Button } from './ui';
// Fixed error on line 222: Added missing LOCATIONS import
import { SERVICES, LOCATIONS } from '../lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Book', path: '/booking', icon: Calendar },
    { name: 'Track', path: '/status', icon: LayoutDashboard },
    { name: 'Support', path: 'tel:+919876543210', icon: Phone, isExternal: true },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white selection:bg-blue-100">
      {/* Navbar - Desktop & Mobile Header */}
      <nav className="sticky top-0 z-[60] bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group outline-none">
              <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:rotate-6 transition-transform shadow-lg shadow-blue-500/20">
                <Sparkles size={20} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none text-gray-900">SHOBA</span>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Services</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="relative group">
                <button className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors py-2 uppercase tracking-wide">
                  Services <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full -left-10 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-4 group-hover:translate-y-0 p-3 text-gray-900 mt-2">
                  <div className="p-3 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">Our Specialities</div>
                  <div className="grid gap-1">
                    {SERVICES.map(service => (
                      <Link 
                        key={service.id} 
                        to={`/services/${service.slug}`}
                        className="flex items-center gap-4 px-4 py-4 hover:bg-blue-50 rounded-2xl transition-all group/item"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-blue-100 group-hover/item:text-blue-600 transition-colors">
                           <Sparkles size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-black text-gray-900">{service.title}</div>
                          <div className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Expert Verified</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/status" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-wide">
                 <Search size={16} /> Track Order
              </Link>
              
              <Link to="/booking">
                <Button variant="primary" size="md" className="rounded-2xl px-8 h-12 shadow-blue-500/20">Book Now</Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle (Only for additional links, main actions are in Bottom Nav) */}
            <button 
              className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[70] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[80%] bg-white z-[80] shadow-2xl p-8 flex flex-col md:hidden"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 rounded-full"><X size={24} /></button>
              </div>
              
              <div className="space-y-8 flex-1">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Explore Shoba</h4>
                  <div className="grid gap-4">
                    <Link to="/about" className="text-xl font-black text-gray-900">About Us</Link>
                    <Link to="/policy" className="text-xl font-black text-gray-900">Policies</Link>
                    <Link to="/status" className="text-xl font-black text-gray-900">Track Booking</Link>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Our Services</h4>
                  <div className="grid gap-4">
                    {SERVICES.map(s => (
                      <Link key={s.id} to={`/services/${s.slug}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                        <Sparkles size={20} className="text-blue-600" />
                        <span className="font-bold">{s.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl text-blue-700">
                  <Phone size={20} />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-70">24/7 Support</div>
                    <div className="font-black">+91 98765 43210</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-2xl border-t border-gray-100 px-6 py-4 flex justify-between items-center shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return link.isExternal ? (
            <a 
              key={link.name} 
              href={link.path} 
              className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <link.icon size={22} />
              <span className="text-[9px] font-black uppercase tracking-widest">{link.name}</span>
            </a>
          ) : (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <link.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-70'}`}>{link.name}</span>
              {isActive && (
                <div className="flex flex-col items-center mt-0.5">
                  <motion.div layoutId="activeDot" className="w-1 h-1 rounded-full bg-blue-600" />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer - Only visible on desktop or large screens to keep mobile clean */}
      <footer className="hidden md:block bg-gray-900 text-gray-400 py-24 border-t border-gray-800">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2 text-white outline-none">
                <Sparkles size={28} className="text-blue-500" />
                <span className="text-2xl font-black tracking-tight">SHOBA</span>
              </Link>
              <p className="text-sm leading-relaxed max-w-xs">
                Premium home care services delivered by background-verified experts. We use industrial standards to bring peace back to your space.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 text-[11px] uppercase tracking-widest">Resources</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/booking" className="hover:text-white transition-colors">Book a Professional</Link></li>
                <li><Link to="/status" className="hover:text-white transition-colors">Track Status</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Our Vision</Link></li>
                <li><Link to="/policy" className="hover:text-white transition-colors">Cancellation Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 text-[11px] uppercase tracking-widest">Neighborhoods</h4>
              <ul className="space-y-4 text-sm font-medium">
                {/* Fixed line 222: Now properly refers to the imported LOCATIONS array */}
                {LOCATIONS.slice(0, 4).map(loc => (
                  <li key={loc.id}><Link to={`/locations/${loc.slug}`} className="hover:text-white transition-colors">{loc.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-8 text-[11px] uppercase tracking-widest">Get In Touch</h4>
              <div className="space-y-6">
                <p className="text-sm font-medium">support@shobaclean.com</p>
                <div className="text-3xl font-black text-white">+91 98765 43210</div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors"><MessageSquare size={18} /></div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors"><Phone size={18} /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-10 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">
            © {new Date().getFullYear()} SHOBA CLEAN SERVICES PRIVATE LIMITED • BANGALORE, INDIA
          </div>
        </div>
      </footer>
    </div>
  );
}
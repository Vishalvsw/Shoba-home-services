
'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles, Search, MapPin, Phone } from 'lucide-react';
import { Button } from './ui';
import { SERVICES } from '../lib/constants';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50 selection:bg-blue-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group outline-none">
              <div className="bg-white text-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
                <Sparkles size={22} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none">SHOBA</span>
                <span className="text-[10px] font-bold text-blue-100 uppercase tracking-[0.2em]">Services</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-bold hover:text-blue-100 transition-colors py-2 uppercase tracking-wide">
                  Services <ChevronDown size={14} />
                </button>
                <div className="absolute top-full -left-10 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 p-2 text-gray-900 mt-2">
                  <div className="p-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">Our Offerings</div>
                  {SERVICES.map(service => (
                    <Link 
                      key={service.id} 
                      to={`/services/${service.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-blue-100 group-hover/item:text-blue-600">
                         <Sparkles size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-bold">{service.title}</div>
                        <div className="text-[10px] text-green-600 font-bold uppercase">{service.priceRange.split(' ')[0]} ONWARDS</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/status" className="flex items-center gap-2 text-sm font-bold hover:text-blue-100 transition-colors uppercase tracking-wide">
                 <Search size={16} /> Track Booking
              </Link>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
               <div className="flex flex-col items-end mr-2">
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">24/7 Support</span>
                  <a href="tel:+919876543210" className="font-bold text-white flex items-center gap-1 text-sm hover:underline">
                    +91 98765 43210
                  </a>
               </div>
              <Link to="/booking">
                <Button variant="primary" size="sm" className="shadow-lg shadow-blue-900/20 px-6">Book Now</Button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-white hover:bg-blue-500 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white text-gray-900 border-t border-gray-100 px-4 py-8 space-y-6 shadow-2xl">
            <Link to="/" className="block text-lg font-bold hover:text-blue-600">Home</Link>
            <Link to="/status" className="flex items-center gap-3 text-lg font-bold text-blue-600 bg-blue-50 p-4 rounded-2xl">
               <Search size={22} /> Track Your Booking
            </Link>
            <div>
              <div className="mb-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Our Services</div>
              <div className="grid grid-cols-1 gap-2">
                {SERVICES.map(service => (
                  <Link key={service.id} to={`/services/${service.slug}`} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl active:bg-blue-100 transition-colors">
                    <span className="font-bold">{service.title}</span>
                    <span className="text-xs font-black text-green-600">{service.priceRange.split(' ')[0]}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/booking">
              <Button variant="primary" size="lg" className="w-full h-16 text-lg rounded-2xl">Book Now</Button>
            </Link>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2 text-white outline-none">
                <Sparkles size={24} className="text-blue-500" />
                <span className="text-xl font-black tracking-tight">SHOBA</span>
              </Link>
              <p className="text-sm leading-relaxed">
                Professional home care services. Verified experts. Transparent pricing. 100% Satisfaction Guarantee.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Explore</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link to="/booking" className="hover:text-blue-400 transition-colors">Book Service</Link></li>
                <li><Link to="/status" className="hover:text-blue-400 transition-colors">Check Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/policy" className="hover:text-blue-400 transition-colors">Cancellation Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Contact</h4>
              <p className="text-sm mb-4">support@shobaclean.com</p>
              <p className="text-xl font-bold text-white">+91 98765 43210</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-[10px] font-bold uppercase tracking-widest text-gray-600">
            © {new Date().getFullYear()} SHOBA CLEAN SERVICES PRIVATE LIMITED.
          </div>
        </div>
      </footer>
    </div>
  );
}

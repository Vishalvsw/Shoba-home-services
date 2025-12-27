
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Star } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { LOCATIONS, SERVICES } from '../lib/constants';

export default function LocationDetail() {
  const params = useParams();
  const slug = params?.slug;
  const location = LOCATIONS.find(l => l.slug === slug);

  if (!location) return <div className="p-20 text-center font-black text-gray-400">Location not found.</div>;

  return (
    <div className="bg-white">
      {/* Local Hero */}
      <div className="relative h-[250px] md:h-[450px]">
        <img src={location.heroImage} alt={`Services in ${location.name}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-6xl font-black mb-2 tracking-tight">Home Services in {location.name}</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium">{location.description}</p>
            <div className="flex items-center justify-center gap-2 mt-6 text-[10px] font-black uppercase tracking-widest bg-white/20 w-fit mx-auto px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
              <MapPin size={14} /> Serviceable across all major layouts
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Verified Services in {location.name}</h2>
            <p className="text-gray-500 font-medium max-w-md mx-auto">Instant booking with background-verified experts near you.</p>
        </div>
        
        {/* Service List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {SERVICES.map(service => (
            <Card key={service.id} className="p-8 hover:border-blue-300 transition-all border-2 border-gray-50 shadow-sm hover:shadow-xl rounded-[2rem] group">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
              </div>
              
              <div className="mb-8">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-2">Starting At</p>
                <p className="text-4xl font-black text-green-600 mb-4">{service.priceRange.split(' ')[0]}</p>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{service.shortDescription}</p>
              </div>

              <Link to={`/booking?service=${service.id}&location=${location.id}`}>
                <Button variant="primary" size="lg" className="w-full h-14 rounded-2xl shadow-lg shadow-orange-500/10">
                    Book in {location.name}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Local Trust Indicators */}
        <div className="mt-24 border-t border-gray-100 pt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6 text-blue-600"><ShieldCheck size={32} /></div>
                    <h3 className="font-black text-gray-900 mb-2">Verified Experts</h3>
                    <p className="text-sm text-gray-500 font-medium">All professionals in {location.name} are background checked.</p>
                </div>
                <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6 text-yellow-500"><Star fill="currentColor" size={32} /></div>
                    <h3 className="font-black text-gray-900 mb-2">Top Rated Hub</h3>
                    <p className="text-sm text-gray-500 font-medium">Consistently rated 4.9/5 by 5,000+ residents in {location.name}.</p>
                </div>
                <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6 text-blue-600"><MapPin size={32} /></div>
                    <h3 className="font-black text-gray-900 mb-2">Local Support</h3>
                    <p className="text-sm text-gray-500 font-medium">Dedicated support team and supervisor available in {location.name}.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

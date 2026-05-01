import React, { useState } from 'react';
import { Search, Package, MapPin, Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency, cn } from '../lib/utils';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call for luxury feel
    setTimeout(() => {
      // Mock data for now since we don't have a backend to query real orders easily without knowing IDs
      if (orderId.toUpperCase() === 'VG123') {
        setTrackingData({
          id: 'VG123456789',
          status: 'shipped',
          courier: 'FedEx Priority Global',
          trackingNumber: '7845-9231-1044',
          estimatedDelivery: 'May 14, 2026',
          items: [
            { name: 'Merino Wool Turtleneck', quantity: 1, price: 4800 },
            { name: 'Silk Pocket Square', quantity: 2, price: 4500 }
          ],
          timeline: [
            { status: 'Order Placed', date: 'May 01, 2026, 14:30', completed: true },
            { status: 'Processed & Inspected', date: 'May 02, 2026, 09:15', completed: true },
            { status: 'Departed Warehouse', date: 'May 03, 2026, 11:00', completed: true },
            { status: 'In Transit', date: 'May 04, 2026, 16:45', completed: false, active: true },
            { status: 'Out for Delivery', date: 'Pending', completed: false },
            { status: 'Delivered', date: 'Exp. May 14', completed: false }
          ]
        });
      } else {
        // Fallback for demo
        setTrackingData('not-found');
      }
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
      <div className="max-w-3xl mx-auto">
          <header className="text-center mb-16 md:mb-24 animate-reveal">
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold mb-6 block underline underline-offset-8">MANIFEST TRACKING</span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif mb-10 leading-tight">Locate Your <br /><span className="italic font-light">Acquisition.</span></h1>
          <p className="text-luxury-charcoal/50 text-sm md:text-lg leading-relaxed max-w-xl mx-auto">
            Review the real-time odyssey of your selected pieces as they travel from our atelier to your residence.
          </p>
        </header>

        <form onSubmit={handleTrack} className="bg-luxury-cream/20 p-8 md:p-20 border border-luxury-charcoal/5 mb-16 md:mb-24 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-luxury-gold transform -translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4 md:space-y-6">
              <label className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/40 block">Order Identifier</label>
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. VG123"
                className="w-full bg-transparent border-b border-luxury-charcoal/10 py-3 md:py-4 text-lg md:text-xl font-serif italic outline-none focus:border-luxury-gold transition-colors placeholder:text-luxury-charcoal/10"
                required
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <label className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/40 block">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@excellence.com"
                className="w-full bg-transparent border-b border-luxury-charcoal/10 py-3 md:py-4 text-lg md:text-xl font-serif italic outline-none focus:border-luxury-gold transition-colors placeholder:text-luxury-charcoal/10"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={isSearching}
            className="mt-16 w-full md:w-auto bg-luxury-charcoal text-white px-20 py-8 text-[11px] uppercase tracking-[0.4em] font-black hover:bg-luxury-gold transition-all duration-700 ease-[0.16,1,0.3,1] shadow-2xl flex items-center justify-center space-x-6 group disabled:bg-luxury-charcoal/20"
          >
            {isSearching ? (
              <span className="animate-pulse">Accessing Archive...</span>
            ) : (
              <>
                <span>Illuminate Status</span>
                <Search className="w-4 h-4 group-hover:scale-125 transition-transform" />
              </>
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {trackingData === 'not-found' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20 bg-red-50/50 border border-red-100 rounded-sm"
            >
              <p className="text-red-800 font-serif italic text-xl mb-4">Manifest Not Found.</p>
              <p className="text-red-800/60 text-xs uppercase tracking-widest font-bold">Please verify your credentials or contact the concierge.</p>
            </motion.div>
          )}

          {trackingData && trackingData !== 'not-found' && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16 animate-reveal"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-10 border border-luxury-charcoal/5 shadow-xl space-y-6">
                  <div className="w-10 h-10 bg-luxury-cream rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/20 mb-2">Order Archive</p>
                    <p className="text-xl font-serif italic text-luxury-charcoal">{trackingData.id}</p>
                  </div>
                </div>
                <div className="bg-white p-10 border border-luxury-charcoal/5 shadow-xl space-y-6">
                  <div className="w-10 h-10 bg-luxury-cream rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/20 mb-2">Expected Arrival</p>
                    <p className="text-xl font-serif italic text-luxury-charcoal">{trackingData.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="bg-white p-10 border border-luxury-charcoal/5 shadow-xl space-y-6">
                  <div className="w-10 h-10 bg-luxury-cream rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/20 mb-2">Courier Partner</p>
                    <p className="text-xl font-serif italic text-luxury-charcoal">{trackingData.courier}</p>
                  </div>
                </div>
              </div>

              <div className="bg-luxury-cream/10 border border-luxury-charcoal/5 p-12 md:p-20">
                <h3 className="text-2xl font-serif mb-16 italic border-b border-luxury-charcoal/5 pb-8">Journey Progress</h3>
                
                <div className="relative space-y-16">
                  {/* Progress Line */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-luxury-charcoal/5 shadow-inner" />
                  
                  {trackingData.timeline.map((step: any, index: number) => (
                    <div key={index} className="relative pl-12 group">
                      <div className={cn(
                        "absolute left-0 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-700",
                        step.completed ? "bg-luxury-gold border-luxury-gold text-white" : 
                        step.active ? "bg-white border-luxury-gold text-luxury-gold animate-pulse shadow-lg" : 
                        "bg-white border-luxury-charcoal/10 text-luxury-charcoal/20"
                      )}>
                        {step.completed ? <CheckCircle2 className="w-4 h-4" /> : 
                         step.active ? <Clock className="w-4 h-4" /> : 
                         <Circle className="w-2 h-2 fill-current" />}
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <p className={cn(
                            "text-lg font-serif italic transition-colors duration-500",
                            step.completed || step.active ? "text-luxury-charcoal" : "text-luxury-charcoal/20"
                          )}>
                            {step.status}
                          </p>
                        </div>
                        <p className={cn(
                          "text-[10px] uppercase tracking-[0.3em] font-black",
                          step.completed || step.active ? "text-luxury-gold" : "text-luxury-charcoal/10"
                        )}>
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-luxury-charcoal/5 p-12">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/40 mb-10 text-center">Selected Masterpieces In Shipment</h4>
                <div className="space-y-8">
                  {trackingData.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center border-b border-luxury-charcoal/5 pb-8 last:border-0 last:pb-0">
                      <div className="flex items-center space-x-8">
                        <span className="text-xl font-serif italic text-luxury-charcoal/20">{idx + 1}.</span>
                        <p className="text-lg font-serif italic">{item.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/20 mb-1">Quantity: {item.quantity}</p>
                        <p className="text-sm font-black tracking-widest">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-32 pt-32 border-t border-luxury-charcoal/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold block">Delivery Protocol</span>
              <h2 className="text-4xl md:text-5xl font-serif italic mb-8">The Vingraz <br />Standard of Arrival.</h2>
              <p className="text-luxury-charcoal/60 leading-relaxed font-medium">
                Every acquisition is more than a shipment; it's the final chapter of our artisanal journey. We ensure that the experience of unboxing is as meticulous as the craftsmanship of the pieces themselves.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-luxury-gold/30 flex items-center justify-center text-[10px] font-black italic">01</div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest font-black mb-2">Archival Packaging</h4>
                    <p className="text-[10px] text-luxury-charcoal/40 leading-relaxed font-bold tracking-widest uppercase">Acid-free tissue, cedar-scented inserts, and signature archival boxes.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-luxury-gold/30 flex items-center justify-center text-[10px] font-black italic">02</div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest font-black mb-2">White Glove Handling</h4>
                    <p className="text-[10px] text-luxury-charcoal/40 leading-relaxed font-bold tracking-widest uppercase">Direct-from-atelier transit to minimize touchpoints and ensure purity.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] bg-luxury-cream overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1549463591-24c1882bd398?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                alt="Luxury Packaging"
              />
              <div className="absolute inset-0 bg-luxury-charcoal/10 mix-blend-multiply" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

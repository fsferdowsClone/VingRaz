import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ChevronLeft, MapPin, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency, cn } from '../lib/utils';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    postalCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'bkash'
  });

  const districts = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Final Order Placement
      alert('Order placed successfully! In a real app, this would redirect to bKash/SSLCommerz gateway.');
      clearCart();
      navigate('/profile');
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
        <div className="flex flex-col lg:flex-row gap-24">
          {/* Main Checkout Flow */}
          <div className="flex-grow">
            <button 
              onClick={() => step > 1 ? setStep(step - 1) : navigate('/cart')}
              className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/30 hover:text-luxury-charcoal transition-all duration-500 mb-16 group"
            >
              <div className="w-10 h-10 rounded-full border border-luxury-charcoal/5 flex items-center justify-center group-hover:border-luxury-gold transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <span>RETURN TO {step > 1 ? 'INFORMATION' : 'BAG'}</span>
            </button>

            <div className="flex items-center space-x-6 mb-24">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all duration-700", step >= 1 ? "bg-luxury-charcoal text-white border-luxury-charcoal shadow-xl" : "border-luxury-charcoal/5 text-luxury-charcoal/20")}>01</div>
              <div className={cn("h-px w-12 transition-all duration-700", step >= 2 ? "bg-luxury-charcoal" : "bg-luxury-charcoal/5")} />
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all duration-700", step >= 2 ? "bg-luxury-charcoal text-white border-luxury-charcoal shadow-xl" : "border-luxury-charcoal/5 text-luxury-charcoal/20")}>02</div>
              <div className={cn("h-px w-12 transition-all duration-700", step >= 3 ? "bg-luxury-charcoal" : "bg-luxury-charcoal/5")} />
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-luxury-charcoal/5 text-luxury-charcoal/20">03</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-20 max-w-2xl">
              {step === 1 ? (
                <div className="space-y-20 animate-reveal">
                  <section>
                    <div className="mb-12">
                      <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold mb-4 block">Identity</span>
                      <h2 className="text-4xl font-serif italic border-b border-luxury-charcoal/5 pb-8">Client Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="flex flex-col space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/30">Email Credentials</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-luxury-cream/30 border-b border-luxury-charcoal/10 px-0 py-5 focus:outline-none focus:border-luxury-gold transition-all duration-500 text-sm font-medium uppercase tracking-widest placeholder:text-luxury-charcoal/10" placeholder="NAME@SERVICE.COM" />
                      </div>
                      <div className="flex flex-col space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/30">Direct Contact</label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-luxury-cream/30 border-b border-luxury-charcoal/10 px-0 py-5 focus:outline-none focus:border-luxury-gold transition-all duration-500 text-sm font-medium uppercase tracking-widest placeholder:text-luxury-charcoal/10" placeholder="+880 — OPTIONAL" />
                      </div>
                    </div>
                  </section>

                  <section>
                    <div className="mb-12">
                      <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold mb-4 block">Logistics</span>
                      <h2 className="text-4xl font-serif italic border-b border-luxury-charcoal/5 pb-8">Designated Port</h2>
                    </div>
                    <div className="space-y-10">
                      <div className="flex flex-col space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/30">Full Legal Name</label>
                        <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="bg-luxury-cream/30 border-b border-luxury-charcoal/10 px-0 py-5 focus:outline-none focus:border-luxury-gold transition-all duration-500 text-sm font-medium uppercase tracking-widest" />
                      </div>
                      <div className="flex flex-col space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/30">Detailed Address / Landmark</label>
                        <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="bg-luxury-cream/30 border-b border-luxury-charcoal/10 px-0 py-5 focus:outline-none focus:border-luxury-gold transition-all duration-500 text-sm font-medium h-24 resize-none placeholder:text-luxury-charcoal/10" placeholder="APARTMENT, STREET, AREA..." />
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        <div className="flex flex-col space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/30">District / Zone</label>
                          <select value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="bg-luxury-cream/30 border-b border-luxury-charcoal/10 px-0 py-5 focus:outline-none focus:border-luxury-gold transition-all duration-500 text-sm font-black uppercase tracking-widest cursor-pointer">
                            {districts.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        <div className="flex flex-col space-y-4">
                          <label className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/30">Postal Index</label>
                          <input required type="text" value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} className="bg-luxury-cream/30 border-b border-luxury-charcoal/10 px-0 py-5 focus:outline-none focus:border-luxury-gold transition-all duration-500 text-sm font-medium uppercase tracking-widest placeholder:text-luxury-charcoal/10" placeholder="0000" />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <div className="mb-12">
                      <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold mb-4 block">Transit</span>
                      <h2 className="text-4xl font-serif italic border-b border-luxury-charcoal/5 pb-8">Transit Mode</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      {[
                        { id: 'standard', label: 'Archival Standard', desc: 'Secure transit in Vingraz luxury boxes. 3-5 days.', cost: 'Complimentary' },
                        { id: 'express', label: 'Priority Global (DHL)', desc: 'Expedited transit for global clients. 1-2 days.', cost: formatCurrency(2500) },
                        { id: 'whiteglove', label: 'White Glove Concierge', desc: 'Personalized delivery with signature unveiling. Dhaka only.', cost: formatCurrency(5000) }
                      ].map(mode => (
                        <label key={mode.id} className={cn("flex items-center justify-between p-10 border transition-all duration-700 ease-[0.16,1,0.3,1] cursor-pointer group", formData.shippingMethod === mode.id ? "border-luxury-gold bg-luxury-gold/5 shadow-xl scale-[1.02]" : "border-luxury-charcoal/5 hover:border-luxury-charcoal/20")}>
                          <div className="flex items-center space-x-10">
                            <input type="radio" name="shipping" checked={formData.shippingMethod === mode.id} onChange={() => setFormData({...formData, shippingMethod: mode.id})} className="w-5 h-5 accent-luxury-gold" />
                            <div className="flex flex-col">
                              <span className="text-xs uppercase tracking-[0.3em] font-black mb-1">{mode.label}</span>
                              <span className="text-[9px] uppercase tracking-widest text-luxury-charcoal/30 font-bold">{mode.desc}</span>
                            </div>
                          </div>
                          <div className="text-[10px] font-black tracking-widest text-luxury-gold">{mode.cost}</div>
                        </label>
                      ))}
                    </div>
                  </section>
                </div>
              ) : (
                <div className="space-y-20 animate-reveal">
                  <section>
                    <div className="mb-12">
                      <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold mb-4 block">Security</span>
                      <h2 className="text-4xl font-serif italic border-b border-luxury-charcoal/5 pb-8">Valued Exchange</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      {['BKASH', 'NAGAD', 'CARD'].map(method => (
                        <label key={method} className={cn("flex items-center justify-between p-10 border transition-all duration-700 ease-[0.16,1,0.3,1] cursor-pointer group", formData.paymentMethod === method.toLowerCase() ? "border-luxury-gold bg-luxury-gold/5 shadow-xl scale-[1.02]" : "border-luxury-charcoal/5 hover:border-luxury-charcoal/20")}>
                          <div className="flex items-center space-x-10">
                            <input type="radio" name="payment" checked={formData.paymentMethod === method.toLowerCase()} onChange={() => setFormData({...formData, paymentMethod: method.toLowerCase()})} className="w-5 h-5 accent-luxury-gold" />
                            <div className="flex flex-col">
                              <span className="text-xs uppercase tracking-[0.3em] font-black mb-1">{method}</span>
                              <span className="text-[9px] uppercase tracking-widest text-luxury-charcoal/30 font-bold">Encrypted Transaction Interface</span>
                            </div>
                          </div>
                          <div className="w-16 h-10 bg-white/50 border border-luxury-charcoal/5 flex items-center justify-center text-[7px] font-black tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">SECURE</div>
                        </label>
                      ))}
                    </div>
                  </section>

                  <div className="p-12 bg-luxury-cream/30 border border-luxury-charcoal/5 text-center">
                    <p className="text-[9px] leading-loose text-luxury-charcoal/40 uppercase tracking-[0.4em] font-black italic">
                      Finalized through 256-bit SSL Architecture. <br /> Automated receipt manifest will be issued upon success.
                    </p>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full bg-luxury-charcoal text-white py-8 text-[11px] uppercase tracking-[0.5em] font-black hover:bg-luxury-gold hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-700 ease-[0.16,1,0.3,1] shadow-xl">
                {step === 1 ? 'PROCEED TO VALUATION' : 'COMPLETE PROCUREMENT'}
              </button>
            </form>
          </div>

          {/* Cart Sidebar */}
          <div className="w-full lg:w-[480px]">
            <div className="bg-luxury-cream/20 p-12 border border-luxury-charcoal/5 sticky top-32">
              <div className="flex items-center justify-between mb-12 pb-8 border-b border-luxury-charcoal/5">
                <h3 className="text-lg font-serif italic">Curated Manifest</h3>
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-luxury-gold">{items.length} Elements</span>
              </div>

              <div className="space-y-10 mb-16 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                {items.map(item => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex space-x-8 group">
                    <div className="w-20 aspect-[3/4] overflow-hidden border border-luxury-charcoal/5">
                      <img src={item.product.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-lg font-serif mb-2 italic">{item.product.name}</p>
                      <div className="space-y-1">
                         <p className="text-[8px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/30">REF: {item.productId.slice(0, 8)}</p>
                         <p className="text-[9px] uppercase tracking-[0.2em] font-black text-luxury-charcoal/50">{item.size} / {item.color} — QTY {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-lg font-serif text-luxury-charcoal/80 italic">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-6 pt-10 border-t border-luxury-charcoal/5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/20">Initial Total</span>
                  <span className="text-lg font-serif italic text-luxury-charcoal/60">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/20">Logistics</span>
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black text-green-600 italic">Excluded</span>
                </div>
                <div className="h-px bg-luxury-charcoal/10 my-6" />
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.5em] font-black text-luxury-gold block mb-2">Final Valuation</span>
                    <span className="text-3xl font-serif italic">Archive Total</span>
                  </div>
                  <span className="text-4xl font-serif text-luxury-gold leading-none">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

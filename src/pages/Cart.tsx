import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../lib/utils';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-32 h-32 bg-luxury-cream/50 rounded-full flex items-center justify-center mb-12 border border-luxury-charcoal/5"
        >
          <ShoppingBag className="w-10 h-10 text-luxury-charcoal/20" />
        </motion.div>
        <h2 className="text-5xl font-serif mb-6 italic animate-reveal">Your selection is vacant.</h2>
        <p className="text-luxury-charcoal/40 max-w-sm mb-16 font-medium leading-relaxed animate-reveal" style={{ animationDelay: '200ms' }}>
          Explore the VINGRAZ universe and discover pieces crafted for the refined collector.
        </p>
        <Link
          to="/collection/all"
          className="bg-luxury-charcoal text-white px-16 py-6 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-luxury-gold hover:shadow-2xl transition-all duration-700 ease-[0.16,1,0.3,1]"
        >
          Initiate Discovery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24 md:py-32 bg-white">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Items List */}
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-luxury-charcoal/5 pb-12 gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold mb-4 block">Archive</span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-none tracking-tight">Shopping Bag.</h1>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-luxury-charcoal/30 bg-luxury-cream px-4 py-2 rounded-full">
              {totalItems} {totalItems === 1 ? 'Curated Piece' : 'Curated Pieces'}
            </span>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, idx) => (
                <motion.div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row gap-8 py-10 border-b border-luxury-charcoal/5 last:border-0 group"
                >
                  <div className="w-full sm:w-40 aspect-[3/4] bg-luxury-cream overflow-hidden border border-luxury-charcoal/5">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/product/${item.productId}`} className="text-2xl font-serif italic hover:text-luxury-gold transition-all duration-500 mb-2 block">
                          {item.product.name}
                        </Link>
                        <div className="flex flex-wrap gap-4 text-[9px] uppercase tracking-[0.2em] font-black text-luxury-charcoal/40">
                          <span className="flex items-center space-x-2">
                             <span className="w-1 h-px bg-luxury-charcoal/20" />
                             <span>Dimensions: <span className="text-luxury-charcoal">{item.size}</span></span>
                          </span>
                          <span className="flex items-center space-x-2">
                             <span className="w-1 h-px bg-luxury-charcoal/20" />
                             <span>Palette: <span className="text-luxury-charcoal">{item.color}</span></span>
                          </span>
                        </div>
                      </div>
                      <p className="text-xl font-serif text-luxury-charcoal/80">{formatCurrency(item.price * item.quantity)}</p>
                    </div>

                    <div className="flex justify-between items-end mt-12 sm:mt-0">
                      <div className="flex items-center bg-luxury-cream/50 border border-luxury-charcoal/5 p-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center hover:text-luxury-gold transition-colors duration-500"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-xs font-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:text-luxury-gold transition-colors duration-500"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId, item.size, item.color)}
                        className="text-luxury-charcoal/20 hover:text-red-500 transition-all duration-500 flex items-center space-x-3 group/remove"
                      >
                        <span className="text-[9px] uppercase tracking-[0.2em] font-black opacity-0 group-hover/remove:opacity-100 transition-opacity">Remove Item</span>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-20">
            <button
              onClick={() => navigate('/collection/all')}
              className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/30 hover:text-luxury-gold transition-all duration-500 group"
            >
              <div className="w-10 h-10 rounded-full border border-luxury-charcoal/5 flex items-center justify-center group-hover:border-luxury-gold transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span>Continue Discovery</span>
            </button>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="w-full lg:w-[450px]">
          <div className="bg-luxury-cream/30 p-12 border border-luxury-charcoal/5 lg:sticky lg:top-32">
            <h2 className="text-3xl font-serif mb-12 italic border-b border-luxury-charcoal/5 pb-8">Financial Overview</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/30">Sub-total</span>
                <span className="text-lg font-serif italic">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/30">Shipping</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full italic">Complimentary</span>
              </div>
              
              <div className="bg-white/50 p-6 border border-luxury-charcoal/5 flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <Truck className="w-4 h-4 text-luxury-gold" />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/60">Estimated Arrival</span>
                </div>
                <span className="text-[10px] font-black tracking-widest text-luxury-charcoal">May 08 - May 12</span>
              </div>

              <div className="h-px bg-luxury-charcoal/10 my-4" />
              <div className="flex justify-between items-end">
                <div>
                   <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold block mb-2">Total Amount</span>
                   <span className="text-3xl font-serif italic text-luxury-charcoal">Expected Total</span>
                </div>
                <span className="text-4xl font-serif text-luxury-gold leading-none">{formatCurrency(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-luxury-charcoal text-white py-8 text-[11px] uppercase tracking-[0.4em] font-black hover:bg-luxury-gold hover:shadow-2xl transition-all duration-700 ease-[0.16,1,0.3,1] mb-12 flex items-center justify-center space-x-6 group"
            >
              <span>SECURE PROCUREMENT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </button>

            <div className="space-y-8 pt-8 border-t border-luxury-charcoal/5">
              <div className="flex flex-col space-y-4">
                <p className="text-[9px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/20">Authorized Gateways</p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="px-3 py-1.5 border border-luxury-charcoal/5 text-[9px] font-black uppercase tracking-widest text-luxury-charcoal/40">VISA / MC</div>
                  <div className="px-3 py-1.5 border border-luxury-charcoal/5 text-[9px] font-black uppercase tracking-widest text-luxury-charcoal/40">AMEX</div>
                  <div className="px-3 py-1.5 border border-luxury-charcoal/5 text-[9px] font-black uppercase tracking-widest text-luxury-gold">bKash</div>
                </div>
              </div>
              
              <div className="bg-white/50 p-6 border border-luxury-charcoal/5">
                 <p className="text-[9px] uppercase tracking-widest font-medium text-luxury-charcoal/40 leading-relaxed text-center italic">
                    Encryption standards are active. Your data remains strictly confidential within the VINGRAZ ecosystem.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

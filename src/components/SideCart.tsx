import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';

export default function SideCart() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-luxury-charcoal/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-luxury-charcoal/5 flex items-center justify-between bg-luxury-cream/20">
              <div className="flex items-center gap-4">
                <ShoppingBag className="w-5 h-5 text-luxury-gold" />
                <h2 className="text-xl font-serif italic tracking-tight">Shopping Bag</h2>
                <span className="text-[10px] bg-luxury-charcoal text-white px-2 py-0.5 rounded-full font-black">
                  {totalItems}
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:text-luxury-gold transition-colors group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                    <div className="w-24 h-24 bg-luxury-cream rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-luxury-charcoal/10" />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif italic mb-2">Your bag is empty</h3>
                        <p className="text-sm text-luxury-charcoal/40 max-w-[240px]">
                            It seems you haven't discovered your next statement piece yet.
                        </p>
                    </div>
                    <button 
                        onClick={() => {
                            setIsCartOpen(false);
                            navigate('/collection/all');
                        }}
                        className="text-[10px] uppercase tracking-[0.4em] font-black py-4 px-8 border border-luxury-charcoal/10 hover:border-luxury-gold hover:text-luxury-gold transition-all"
                    >
                        Explore Collection
                    </button>

                    <div className="pt-16 w-full animate-reveal" style={{ animationDelay: '400ms' }}>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/40 mb-8 text-center underline underline-offset-8 decoration-luxury-gold/30">
                          Recommended For You
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Silk Pocket Square', price: 4500, img: 'https://images.unsplash.com/photo-1589756823851-ede1be67418a' },
                                { name: 'Leather Card Holder', price: 8900, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93' }
                            ].map((rec) => (
                                <div key={rec.name} className="space-y-4 group cursor-pointer">
                                    <div className="aspect-[3/4] bg-luxury-cream overflow-hidden">
                                        <img src={rec.img} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-serif italic">{rec.name}</p>
                                        <p className="text-[8px] uppercase tracking-widest font-black text-luxury-charcoal/40 mt-1">{formatCurrency(rec.price)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              ) : (
                  <div className="space-y-8">
                    {items.map((item, idx) => (
                      <motion.div 
                        key={`${item.productId}-${item.size}-${item.color}`} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: "circOut" }}
                        className="flex gap-6 group"
                      >
                        <Link 
                          to={`/product/${item.productId}`}
                          onClick={() => setIsCartOpen(false)}
                          className="w-24 aspect-[3/4] bg-luxury-cream overflow-hidden flex-shrink-0 relative"
                        >
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-luxury" 
                          />
                          <div className="absolute inset-0 bg-luxury-charcoal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </Link>
                        <div className="flex-grow flex flex-col pt-1">
                          <div className="flex justify-between items-start mb-2">
                            <Link 
                               to={`/product/${item.productId}`}
                               onClick={() => setIsCartOpen(false)}
                               className="text-sm font-serif italic hover:text-luxury-gold transition-colors duration-500"
                            >
                              {item.product.name}
                            </Link>
                            <button 
                              onClick={() => removeFromCart(item.productId, item.size, item.color)}
                              className="text-luxury-charcoal/20 hover:text-red-500 transition-colors duration-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-luxury-charcoal/40 font-black mb-4">
                            {item.size} <span className="mx-2 opacity-20">/</span> {item.color}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-6 py-1.5 px-4 border border-luxury-charcoal/5 rounded-full bg-luxury-cream/20">
                              <button 
                                  onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                                  className="text-luxury-charcoal/30 hover:text-luxury-gold transition-colors duration-500"
                              >
                                  <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-[10px] font-black tracking-widest w-4 text-center">{item.quantity}</span>
                              <button 
                                  onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                                  className="text-luxury-charcoal/30 hover:text-luxury-gold transition-colors duration-500"
                              >
                                  <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                            <span className="text-xs font-black tracking-[0.1em] text-luxury-charcoal/80">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 bg-luxury-cream/10 border-t border-luxury-charcoal/5 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/40">Estimated Total</span>
                  <span className="text-2xl font-serif italic">{formatCurrency(totalPrice)}</span>
                </div>
                
                <div className="space-y-3">
                    <button 
                        onClick={() => {
                            setIsCartOpen(false);
                            navigate('/checkout');
                        }}
                        className="w-full bg-luxury-charcoal text-white py-6 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-luxury-gold transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
                    >
                        <span>Initiate Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => {
                            setIsCartOpen(false);
                            navigate('/cart');
                        }}
                        className="w-full border border-luxury-charcoal/10 py-5 text-[10px] uppercase tracking-[0.4em] font-black hover:border-luxury-gold hover:text-luxury-gold transition-all"
                    >
                        View Full Bag
                    </button>
                </div>
                <p className="text-[9px] uppercase tracking-widest text-center text-luxury-charcoal/30 font-medium">
                  Complimentary express shipping on orders over {formatCurrency(20000)}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

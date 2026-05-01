import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const isOutOfStock = product.inventoryCount <= 0;
  const currentPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price;

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity, selectedSize, selectedColor);
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-luxury-charcoal/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] rounded-sm"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-luxury-charcoal/5 text-luxury-charcoal hover:text-luxury-gold transition-all duration-300 md:top-6 md:right-6"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Images */}
            <div className={`w-full md:w-1/2 bg-luxury-cream overflow-hidden flex flex-col ${isOutOfStock ? 'grayscale opacity-80' : ''}`}>
              <div className="relative flex-grow overflow-hidden aspect-[3/4] md:aspect-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={product.images[activeImage]}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {isOutOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-luxury-charcoal/20">
                    <span className="bg-luxury-charcoal text-white text-[10px] uppercase tracking-[0.5em] font-black px-6 py-3 shadow-2xl">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              <div className="flex p-4 gap-2 bg-white/50 backdrop-blur-md overflow-x-auto custom-scrollbar no-scrollbar-mobile">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative flex-shrink-0 w-16 md:w-20 aspect-square overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === idx ? 'border-luxury-gold' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white custom-scrollbar">
              <div className="mb-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-gold">
                    {product.category} — {product.subCategory}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-luxury-charcoal mb-4 leading-tight italic">
                  {product.name}
                </h2>
                <div className="flex items-center gap-4">
                  <p className={`text-xl font-medium ${product.isOnSale ? 'text-luxury-gold' : 'text-luxury-charcoal/60'}`}>
                     {formatCurrency(currentPrice)}
                  </p>
                  {product.isOnSale && (
                    <p className="text-sm font-medium text-luxury-charcoal/30 line-through">
                      {formatCurrency(product.price)}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-10">
                {/* Sizes */}
                {!isOutOfStock && (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/40 mb-6 underline underline-offset-4 decoration-luxury-gold/30">
                      Select Size
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold border transition-all duration-300 ${
                            selectedSize === size
                              ? 'bg-luxury-charcoal text-white border-luxury-charcoal'
                              : 'bg-white text-luxury-charcoal border-luxury-charcoal/10 hover:border-luxury-gold'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {!isOutOfStock && (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/40 mb-6 underline underline-offset-4 decoration-luxury-gold/30">
                      The Palette
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`group relative flex items-center gap-3 px-4 py-2 border transition-all duration-300 ${
                            selectedColor === color
                              ? 'border-luxury-gold bg-luxury-cream/50'
                              : 'border-luxury-charcoal/10 hover:border-luxury-gold'
                          }`}
                        >
                          <div 
                            className="w-4 h-4 rounded-full border border-luxury-charcoal/5" 
                            style={{ backgroundColor: color.toLowerCase() }} 
                          />
                          <span className="text-[10px] uppercase tracking-widest font-bold">
                            {color}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                {!isOutOfStock && (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/40 mb-6">
                      Quantity
                    </h4>
                    <div className="flex items-center space-x-8 border-b border-luxury-charcoal/10 pb-4 inline-flex">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="text-luxury-charcoal/40 hover:text-luxury-gold transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl font-serif italic w-8 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="text-luxury-charcoal/40 hover:text-luxury-gold transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-6 space-y-4">
                  {!isOutOfStock ? (
                    <>
                      <button
                        onClick={() => {
                          addToCart(product, quantity, selectedSize, selectedColor);
                          onClose();
                        }}
                        className="w-full bg-luxury-charcoal text-white py-6 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-luxury-gold transition-all duration-500 shadow-xl flex items-center justify-center space-x-4"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </button>
                      <button
                        onClick={handleBuyNow}
                        className="w-full bg-luxury-gold text-white py-6 text-[10px] uppercase tracking-[0.4em] font-black hover:bg-luxury-charcoal transition-all duration-500 shadow-xl"
                      >
                        Buy Now — {formatCurrency(currentPrice * quantity)}
                      </button>
                    </>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-luxury-charcoal/10 text-luxury-charcoal/30 py-6 text-[10px] uppercase tracking-[0.4em] font-black cursor-not-allowed flex items-center justify-center space-x-4"
                    >
                      <span>Item Unavailable</span>
                    </button>
                  ) }
                  
                  <Link 
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center justify-center space-x-2 text-[10px] uppercase tracking-[0.3em] font-black text-luxury-gold hover:text-luxury-charcoal transition-all py-4 group"
                  >
                    <span>Full Product Archive</span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

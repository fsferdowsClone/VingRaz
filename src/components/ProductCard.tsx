import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const isOutOfStock = product.inventoryCount <= 0;
  const currentPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
        className={cn("group relative", isOutOfStock && "opacity-80")}
      >
        <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-luxury-cream">
          <Link to={`/product/${product.id}`} className="block h-full relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-all duration-[1.5s] ease-luxury group-hover:scale-110",
                isOutOfStock ? "grayscale" : "group-hover:opacity-0"
              )}
            />
            {product.images.length > 1 && !isOutOfStock && (
              <img
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-luxury"
              />
            )}
          </Link>
          
          {/* Status Badges */}
          <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
            {isOutOfStock ? (
              <span className="bg-luxury-charcoal text-white text-[8px] uppercase tracking-[0.4em] font-black px-3 py-1.5 shadow-lg">
                SOLD OUT
              </span>
            ) : (
              <>
                {product.isOnSale && (
                  <span className="bg-white text-luxury-charcoal text-[8px] uppercase tracking-[0.4em] font-black px-3 py-1.5 shadow-lg">
                    SALE
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-luxury-gold text-white text-[8px] uppercase tracking-[0.4em] font-black px-3 py-1.5 shadow-lg">
                    FEATURED
                  </span>
                )}
              </>
            )}
          </div>

          {/* Quick Add Overlay */}
          {!isOutOfStock && (
            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] z-20 flex flex-col gap-2">
              <button 
                onClick={() => setIsQuickViewOpen(true)}
                className="w-full bg-white/90 backdrop-blur-md text-luxury-charcoal py-4 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-luxury-gold hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-2"
              >
                <Zap className="w-3 h-3" />
                <span>Quick View</span>
              </button>
              <button 
                onClick={() => addToCart(product, 1, product.sizes[0], product.colors[0])}
                className="w-full bg-luxury-charcoal text-white py-4 text-[10px] uppercase tracking-[0.3em] font-black hover:bg-luxury-gold transition-all duration-500 shadow-xl"
              >
                Quick Add — {formatCurrency(currentPrice)}
              </button>
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-luxury-charcoal/10 pointer-events-none group-hover:bg-luxury-charcoal/20 transition-colors duration-500" />
          )}
          
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col gap-2">
             <button 
              onClick={() => setIsQuickViewOpen(true)}
              className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-luxury-charcoal hover:bg-luxury-gold hover:text-white transition-all duration-500 shadow-lg"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-1 overflow-hidden">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-[10px] uppercase tracking-[0.25em] text-luxury-charcoal/30 font-black">
                {product.subCategory}
              </p>
              {product.rating && (
                <div className="flex items-center space-x-1">
                  <span className="text-[8px] font-black text-luxury-gold">{product.rating.toFixed(1)}</span>
                  <div className="w-1 h-1 rounded-full bg-luxury-gold" />
                </div>
              )}
            </div>
            <Link to={`/product/${product.id}`} className="block group/title">
              <h3 className="text-lg font-serif text-luxury-charcoal transition-all duration-700 ease-luxury group-hover/title:text-luxury-gold group-hover/title:translate-x-1">
                {product.name}
              </h3>
            </Link>
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '100%' }}
               transition={{ duration: 1, ease: "circOut", delay: 0.4 }}
               className="h-[1px] bg-luxury-charcoal/5 mt-4" 
            />
            <div className="mt-4 flex items-center space-x-3">
              <div className="flex items-center gap-3">
                <p className={cn(
                  "text-xs font-black tracking-widest uppercase",
                  product.isOnSale ? "text-luxury-gold" : "text-luxury-taupe"
                )}>
                  {formatCurrency(currentPrice)}
                </p>
                {product.isOnSale && (
                  <p className="text-[10px] font-medium text-luxury-charcoal/30 line-through tracking-widest">
                    {formatCurrency(product.price)}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
}

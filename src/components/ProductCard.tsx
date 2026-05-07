import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import { productService } from '../services/productService';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const isOutOfStock = product.inventoryCount <= 0;
  const currentPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price;

  const handleMouseEnter = () => {
    productService.getProductById(product.id);
  };

  return (
    <>
      <motion.div
        onMouseEnter={handleMouseEnter}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ y: -4, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
        className={cn("group relative bg-white transition-all duration-700", isOutOfStock && "opacity-80")}
      >
        <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-luxury-cream">
          <Link to={`/product/${product.id}`} className="block h-full relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-all duration-[1.5s] ease-luxury group-hover:scale-105",
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
            
            {/* Soft Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700 pointer-events-none" />
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
            <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col gap-2">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white/95 backdrop-blur-md text-luxury-charcoal py-4 text-[9px] uppercase tracking-[0.4em] font-black hover:bg-luxury-gold hover:text-white transition-all duration-700 shadow-xl flex items-center justify-center gap-3 border border-black/5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 delay-0"
                onClick={() => setIsQuickViewOpen(true)}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick View</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-luxury-charcoal text-white py-4 text-[9px] uppercase tracking-[0.4em] font-black hover:bg-luxury-gold transition-all duration-700 shadow-xl border border-white/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 delay-75"
                onClick={() => addToCart(product, 1, product.sizes[0], product.colors[0])}
              >
                Add — {formatCurrency(currentPrice)}
              </motion.button>
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-luxury-charcoal/10 pointer-events-none group-hover:bg-luxury-charcoal/20 transition-colors duration-500" />
          )}
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

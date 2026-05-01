import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Filter, ChevronDown, LayoutGrid, List, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { productService } from '../services/productService';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { cn } from '../lib/utils';

export default function Collection() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [activeSubCategory, setActiveSubCategory] = useState('All');

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await productService.getProductsByCategory(id || 'all');
      
      const sorted = sortProducts(data, sortBy);
      setProducts(sorted);
      setFilteredProducts(sorted);
      setLoading(false);
    }
    load();
  }, [id]);

  useEffect(() => {
    if (activeSubCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.subCategory === activeSubCategory));
    }
  }, [activeSubCategory, products]);

  const subCategories = ['All', ...new Set(products.map(p => p.subCategory))];

  const sortProducts = (items: Product[], criteria: string) => {
    const list = [...items];
    const getPrice = (p: Product) => (p.isOnSale && p.salePrice ? p.salePrice : p.price);

    switch (criteria) {
      case 'price-low':
        return list.sort((a, b) => getPrice(a) - getPrice(b));
      case 'price-high':
        return list.sort((a, b) => getPrice(b) - getPrice(a));
      case 'alphabetical':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
      default:
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  };

  const handleSortChange = (criteria: string) => {
    setSortBy(criteria);
    setProducts(sortProducts(products, criteria));
    setIsSortOpen(false);
  };

  const sortOptions = [
    { label: 'Newest Arrivals', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Alphabetical', value: 'alphabetical' },
  ];

  const titles: Record<string, string> = {
    all: 'Complete Collection',
    men: "Men's Apparel",
    women: "Women's Collection",
    kids: 'Junior Luxury',
    new: 'New Arrivals'
  };

  const descriptions: Record<string, string> = {
    all: 'Explore our entire range of timeless apparel, designed with a focus on quality and minimal aesthetic.',
    men: 'A curated selection of modern classics, from tailored outerwear to essential knitwear for the refined gentleman.',
    women: 'Fluid silhouettes and premium materials come together to define our women’s vision for effortless elegance.',
    kids: 'Smaller steps, same uncompromising quality. Our junior collection brings sophisticated style to every age.',
    new: 'The latest additions to the VINGRAZ universe. Fresh designs crafted for the current season and beyond.'
  };

  const heroImages: Record<string, string> = {
    all: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop',
    men: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=2574&auto=format&fit=crop',
    women: 'https://images.unsplash.com/photo-1539109132314-34a93a553f19?q=80&w=2670&auto=format&fit=crop',
    kids: 'https://images.unsplash.com/photo-1514090458221-65bb69af63e6?q=80&w=2670&auto=format&fit=crop',
    new: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?q=80&w=2670&auto=format&fit=crop'
  };

  return (
    <div className="min-h-screen pb-24 bg-white">
      {/* Visual Header / Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-luxury-charcoal">
        <motion.div
           initial={{ scale: 1.1, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="absolute inset-0"
        >
          <img 
            src={heroImages[id || 'all'] || heroImages.all} 
            className="w-full h-full object-cover opacity-60" 
            alt="Collection Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal/40 via-transparent to-white" />
        </motion.div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-4 mb-8 text-[10px] uppercase tracking-[0.4em] font-black text-white/60">
                 <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
                 <span className="w-8 h-px bg-white/20" />
                 <span className="text-luxury-gold">{titles[id || 'all'] || 'Selection'}</span>
              </div>
              
              <motion.h1 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-6xl md:text-8xl lg:text-9xl mb-8 leading-none text-white font-serif"
              >
                {titles[id || 'all'] || 'Selection'}<br />
                <span className="italic font-light opacity-60">Archive.</span>
              </motion.h1>
            </div>
            
            <div className="flex items-center space-x-12 pb-2">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="flex flex-col items-end text-white"
               >
                 <span className="text-[10px] uppercase tracking-widest font-black text-white/20">Manifest Listing</span>
                 <span className="text-2xl font-serif italic text-luxury-gold">{filteredProducts.length} Curated Pieces</span>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative -mt-16 z-20">
        <div className="bg-white p-8 mb-16 shadow-2xl">
            <p className="text-luxury-charcoal/50 max-w-2xl font-medium leading-relaxed text-lg italic">
                {descriptions[id || 'all'] || descriptions.all}
            </p>
        </div>
        {/* Navigation & Filters Bar */}
        <div className="sticky top-[80px] z-40 bg-white/95 backdrop-blur-xl py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-luxury-charcoal/5 mb-16 transition-all duration-500">
          <div className="flex overflow-x-auto no-scrollbar gap-3 w-full md:w-auto pb-4 md:pb-0">
            {subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubCategory(sub)}
                className={cn(
                  "px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-700 ease-[0.16,1,0.3,1] relative overflow-hidden flex-shrink-0",
                  activeSubCategory === sub 
                    ? "bg-luxury-charcoal text-white shadow-xl" 
                    : "bg-luxury-cream text-luxury-charcoal/40 hover:bg-white hover:text-luxury-charcoal border border-transparent hover:border-luxury-charcoal/10"
                )}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-4">
              <span className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/40">Sort Selection:</span>
              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em] font-black group transition-colors hover:text-luxury-gold"
                >
                  <span>{sortOptions.find(o => o.value === sortBy)?.label}</span>
                  <ChevronDown className={cn("w-3 h-3 transition-transform duration-700", isSortOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {isSortOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-0 mt-8 w-64 bg-white border border-luxury-charcoal/5 shadow-2xl z-20"
                      >
                        <div className="p-4 border-b border-luxury-charcoal/5">
                           <span className="text-[8px] uppercase tracking-[0.5em] font-black text-luxury-charcoal/20">Refine Order</span>
                        </div>
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            className={cn(
                              "w-full text-left px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-500",
                              sortBy === option.value ? "text-luxury-gold bg-luxury-cream" : "text-luxury-charcoal/60 hover:bg-luxury-cream hover:text-luxury-charcoal"
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="h-4 w-px bg-luxury-charcoal/5" />
            
            <button className="flex items-center space-x-3 group">
              <div className="w-10 h-10 p-2 border border-luxury-charcoal/10 flex items-center justify-center group-hover:border-luxury-gold transition-colors duration-500">
                <Filter className="w-4 h-4 text-luxury-charcoal/60 group-hover:text-luxury-gold transition-colors duration-500" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/60 group-hover:text-luxury-gold transition-colors duration-500 hidden md:block">Filter</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-x-8 md:gap-y-16">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-luxury-charcoal/5 aspect-[3/4] mb-4" />
                <div className="h-4 bg-luxury-charcoal/5 w-2/3 mb-2" />
                <div className="h-4 bg-luxury-charcoal/5 w-1/3" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-x-8 md:gap-y-16">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="text-2xl mb-4 font-serif">No items found.</h3>
            <p className="text-luxury-charcoal/50 mb-8">We couldn't find any products in this collection.</p>
            <Link to="/collection/all" className="bg-luxury-charcoal text-white px-8 py-4 text-xs uppercase tracking-widest font-bold">
              Back to All
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

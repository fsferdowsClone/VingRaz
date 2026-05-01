import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Product } from '../types';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [currentHero, setCurrentHero] = useState(0);
  const heroSlides = [
    {
      title: "Art of Subtlety",
      italic: "Subtlety.",
      subtitle: "Explore the new VINGRAZ collection. Timeless designs crafted with uncompromising quality.",
      image: "https://images.unsplash.com/photo-1539109132314-34a93a553f19?q=80&w=2670&auto=format&fit=crop",
      badge: "Spring Summer 2026"
    },
    {
      title: "Defining Luxury",
      italic: "Modernity.",
      subtitle: "A fusion of traditional craftsmanship and contemporary silhouettes.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
      badge: "Limited Edition"
    },
    {
      title: "Essential Pieces",
      italic: "Elegance.",
      subtitle: "Curated essentials for the refined wardrobe. Minimalist aesthetic, maximal quality.",
      image: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=2070&auto=format&fit=crop",
      badge: "New Arrivals"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [dressProducts, setDressProducts] = useState<Product[]>([]);
  const [upcomingProducts, setUpcomingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [featured, dresses, upcoming] = await Promise.all([
          productService.getFeaturedProducts(),
          productService.getDresses(),
          productService.getUpcomingProducts()
        ]);
        setFeaturedProducts(featured);
        setDressProducts(dresses);
        setUpcomingProducts(upcoming);
      } catch (error) {
        console.error("Error loading homepage data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const categories = [
    {
      id: 'women',
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2040&auto=format&fit=crop',
      description: 'Elegant essentials and statement pieces.'
    },
    {
      id: 'men',
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2000&auto=format&fit=crop',
      description: 'Refined classics for the modern man.'
    },
    {
      id: 'kids',
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1444881421460-d838c3b98f95?q=80&w=2070&auto=format&fit=crop',
      description: 'Sophisticated style for the little ones.'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1584917663903-b77bb1f7c271?q=80&w=2070&auto=format&fit=crop',
      description: 'The final touch for every look.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section Carousel */}
      <section className="relative h-[95vh] flex items-center overflow-hidden bg-luxury-charcoal">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={heroSlides[currentHero].image} 
              alt="VingRaz Hero" 
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHero}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="max-w-4xl"
            >
              <div className="text-mask mb-8">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                  className="text-[10px] sm:text-xs uppercase tracking-[0.5em] font-black text-luxury-gold block"
                >
                  {heroSlides[currentHero].badge}
                </motion.span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-[8vw] lg:text-[10rem] font-serif font-light leading-[0.85] mb-12 tracking-[-0.04em]">
                <div className="text-mask">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  >
                    {heroSlides[currentHero].title.split(' ').slice(0, -1).join(' ')}
                  </motion.div>
                </div>
                <div className="text-mask mt-4 sm:mt-12">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="italic font-light opacity-80"
                  >
                    {heroSlides[currentHero].italic}
                  </motion.div>
                </div>
              </h1>
              
              <div className="text-mask">
                <motion.p 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                  className="text-sm sm:text-base md:text-lg text-white/50 mb-16 font-medium max-w-md leading-relaxed"
                >
                  {heroSlides[currentHero].subtitle}
                </motion.p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8 mt-16 overflow-hidden">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <Link
                    to="/collection/all"
                    className="group relative overflow-hidden bg-white text-luxury-charcoal px-14 py-7 text-[10px] uppercase tracking-[0.4em] font-black transition-all duration-700 ease-luxury hover:text-white"
                  >
                    <span className="relative z-10">THE COLLECTION</span>
                    <div className="absolute inset-0 bg-luxury-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-luxury" />
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  <Link
                    to="/artisan-story"
                    className="group flex items-center space-x-6 px-14 py-7 text-[10px] uppercase tracking-[0.4em] font-black border border-white/10 hover:border-white transition-all duration-700 ease-luxury"
                  >
                    <span>OUR ETHOS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-700 ease-luxury" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Vertical Indicators */}
        <div className="absolute bottom-24 right-6 md:right-16 flex flex-col space-y-12 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHero(idx)}
              className="group flex items-end justify-end space-x-6 text-right"
            >
              <div className="flex flex-col items-end">
                <span className={cn(
                  "text-[10px] uppercase font-black tracking-widest transition-all duration-500",
                  currentHero === idx ? "text-luxury-gold" : "text-white/20 group-hover:text-white/60"
                )}>0{idx + 1}</span>
              </div>
              <div className={cn(
                "w-px transition-all duration-700 ease-in-out bg-white/20 overflow-hidden relative",
                currentHero === idx ? "h-24" : "h-12"
              )}>
                 {currentHero === idx && (
                   <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: '100%' }}
                     transition={{ duration: 6, ease: "linear" }}
                     className="absolute top-0 w-full bg-luxury-gold"
                   />
                 )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Boutique Categories Section */}
      <section className="py-24 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 sm:mb-24 md:mb-32 space-y-12 lg:space-y-0">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold mb-6 md:mb-8 block underline underline-offset-8">THE BOUTIQUE</span>
              <h2 className="text-4xl sm:text-6xl md:text-8xl mb-8 leading-tight">Curated Selection for <br /><span className="italic font-light">Every Facet.</span></h2>
              <p className="text-luxury-charcoal/40 leading-relaxed font-medium text-base md:text-lg">
                Explore our meticulously crafted universes, where each piece is a deliberate statement of intent and quality.
              </p>
            </div>
            <Link to="/collection/all" className="group flex items-center space-x-6 text-[10px] uppercase tracking-[0.4em] font-black border-b border-luxury-charcoal/10 pb-4 hover:border-luxury-gold transition-all duration-500">
              <span>EXPLORE ENTIRE CATALOG</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-4 transition-transform duration-500" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className="group relative"
              >
                <Link to={`/collection/${cat.id}`} className="block relative aspect-[4/6] overflow-hidden bg-luxury-cream luxury-card-hover">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover grayscale-[0.2] transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="absolute top-8 left-8 overflow-hidden">
                    <motion.span 
                      whileInView={{ y: [20, 0], opacity: [0, 1] }}
                      transition={{ duration: 1.2, ease: "circOut" }}
                      className="text-[40px] font-serif italic text-white/20 select-none block"
                    >
                      0{idx + 1}
                    </motion.span>
                  </div>
                  
                  <div className="absolute inset-x-8 bottom-8 p-0 translate-y-8 group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100">
                    <p className="text-white text-[10px] uppercase tracking-[0.2em] font-black leading-relaxed max-w-[200px]">
                      {cat.description}
                    </p>
                  </div>
                </Link>
                <div className="mt-10 px-2">
                  <div className="flex justify-between items-end">
                    <h3 className="text-3xl font-serif text-luxury-charcoal group-hover:text-luxury-gold transition-all duration-500 leading-none">
                      {cat.name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-luxury-charcoal/20 group-hover:text-luxury-gold group-hover:translate-x-2 transition-all duration-500" />
                  </div>
                  <div className="w-full h-px bg-luxury-charcoal/5 group-hover:bg-luxury-gold/20 transition-all duration-700 mt-6" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Items / Featured */}
      {!loading && featuredProducts.length > 0 && (
        <section className="py-24 sm:py-32 bg-luxury-cream/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
              <div className="max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold mb-6 block">
                  Hot This Month
                </span>
                <h2 className="text-4xl md:text-5xl mb-6">Curated Essentials</h2>
                <p className="text-luxury-charcoal/60 leading-relaxed font-medium">
                  A selection of our most-coveted pieces, defining the contemporary wardrobe with ease and elegance.
                </p>
              </div>
              <Link to="/collection/new" className="group flex items-center space-x-2 text-xs uppercase tracking-widest font-bold border-b border-luxury-charcoal/20 pb-2 hover:border-luxury-gold transition-all">
                <span>Shop New</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The Dress Edit - Editorial Section */}
      {!loading && dressProducts.length > 0 && (
        <section className="py-24 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-20 items-start">
            <div className="w-full lg:w-5/12 lg:sticky lg:top-32">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-gold mb-6 block">
                The Silhouette Series
              </span>
              <h2 className="text-5xl md:text-8xl mb-8 font-serif leading-tight">The Dress <br /><span className="italic font-light">Edit.</span></h2>
              <p className="text-luxury-charcoal/60 leading-relaxed font-medium mb-12 text-lg">
                Curated for the effortlessly poised. Explore silhouettes that transition from sunrise gatherings to midnight affairs with unmatched grace.
              </p>
              
              <div className="space-y-8 border-l border-luxury-charcoal/10 pl-8 mb-12">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal mb-2">Styling Suggestion — 01</h4>
                  <p className="text-sm text-luxury-charcoal/50 leading-relaxed">Pair our Silk Wrap Midi with minimal gold accents and a structured leather tote for a boardroom-to-bistro transition.</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal mb-2">Styling Suggestion — 02</h4>
                  <p className="text-sm text-luxury-charcoal/50 leading-relaxed">The Asymmetric Pleated Gown demands simplicity. A sleek bun and statement earrings are all you need.</p>
                </div>
              </div>

              <Link to="/collection/women" className="group flex items-center space-x-4 text-xs uppercase tracking-[0.3em] font-black">
                <span>Discover the full collection</span>
                <div className="w-12 h-px bg-luxury-charcoal group-hover:w-20 transition-all duration-500" />
              </Link>
            </div>
            
            <div className="w-full lg:w-7/12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-24">
                {dressProducts.slice(0, 4).map((dress, idx) => (
                  <div key={dress.id} className={cn(idx % 2 !== 0 && "mt-12 lg:mt-32")}>
                    <ProductCard product={dress} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming / Coming Soon */}
      {!loading && upcomingProducts.length > 0 && (
        <section className="py-48 bg-luxury-charcoal text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-32" />
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold mb-6 block">
                  Next Seasonal Drop
                </span>
                <h2 className="text-6xl md:text-8xl mb-8 font-serif leading-none">The Artisan <br /><span className="italic font-light">Series.</span></h2>
                <p className="text-white/40 max-w-md mb-12 font-medium leading-relaxed text-lg">
                  Dropping next month. A celebration of handmade textures, organic dyes, and the raw beauty of natural fibers.
                </p>
                <div className="flex items-center space-x-12">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-luxury-charcoal overflow-hidden bg-white/10">
                        <img src={`https://images.unsplash.com/photo-${1441984904996 + i}-e0b6ba687e12?q=80&w=100&auto=format&fit=crop`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-luxury-gold">+320 PEOPLE JOINED WAITLIST</span>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] bg-white/5 overflow-hidden group">
                  <img 
                    src={upcomingProducts[0].images[0]} 
                    alt="Artisan Collection Preview" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-2000"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 text-[10px] uppercase tracking-widest font-black hover:bg-white hover:text-luxury-charcoal transition-all">
                      Notify Me
                    </button>
                  </div>
                </div>
                <div className="absolute -top-12 -right-12 w-48 h-48 border border-white/10 flex items-center justify-center hidden xl:flex">
                   <div className="text-[10px] uppercase tracking-[0.5em] font-black rotate-90 text-white/20">PREVIEW ONLY</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Heritage / Story Section */}
      <section className="py-24 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
           <div className="w-full md:w-1/2 order-2 md:order-1">
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4">
                 <div className="aspect-[4/5] bg-luxury-cream">
                   <img src="https://images.unsplash.com/photo-1614975058789-41d4023795b5?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
                 </div>
                 <div className="aspect-square bg-luxury-cream">
                    <img src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
                 </div>
               </div>
               <div className="pt-12 space-y-4">
                 <div className="aspect-square bg-luxury-cream">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
                 </div>
                 <div className="aspect-[4/5] bg-luxury-cream">
                    <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
                 </div>
               </div>
             </div>
           </div>
           <div className="w-full md:w-1/2 order-1 md:order-2">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-gold mb-6 block">Our Heritage</span>
              <h2 className="text-4xl md:text-6xl mb-8 font-serif leading-tight">The Path of <br /><span className="italic font-light">Excellence.</span></h2>
              <p className="text-luxury-charcoal/60 leading-relaxed font-medium mb-8 text-lg">
                Founded on the belief that luxury should be felt, not just seen. At VINGRAZ APPARELS, we bridge the gap between world-class tailoring and modern minimalism.
              </p>
              <p className="text-luxury-charcoal/60 leading-relaxed font-medium mb-12">
                Every stitch is a testament to our dedication to the craft. We source the finest fibers from sustainable producers globally, ensuring that every piece that bears the VINGRAZ name is a masterpiece of endurance and design.
              </p>
              <Link to="/artisan-story" className="bg-luxury-charcoal text-white px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-luxury-gold transition-all inline-block">
                Our Philosophy
              </Link>
           </div>
        </div>
      </section>

      {/* Brand Identity Section */}
      <section className="bg-luxury-charcoal text-white py-32 px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-7xl mb-12 max-w-4xl leading-tight">
              Crafted in Bangladesh, <br /> 
              <span className="text-luxury-gold italic">Designed for the World.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mt-12">
              <div className="p-8 border border-white/5">
                <p className="text-3xl font-serif mb-2">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Premium Cotton</p>
              </div>
              <div className="p-8 border border-white/5">
                <p className="text-3xl font-serif mb-2">Ethics</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Sustainable Sourcing</p>
              </div>
              <div className="p-8 border border-white/5">
                <p className="text-3xl font-serif mb-2">Global</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Shipping Ready</p>
              </div>
              <div className="p-8 border border-white/5">
                <p className="text-3xl font-serif mb-2">Safe</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Local Gateways</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Background Decorative Text */}
        <motion.div 
          style={{ x: '-10%' }}
          animate={{ x: '-50%' }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-serif font-black text-white/[0.03] whitespace-nowrap pointer-events-none select-none"
        >
          VINGRAZ APPARELS · ARTISANAL EXCELLENCE · EST. 2026 · VINGRAZ APPARELS · ARTISANAL EXCELLENCE · EST. 2026
        </motion.div>
      </section>

      {/* Concierge / Private Appointment Section */}
      <section className="py-24 sm:py-32 md:py-48 px-4 sm:px-6 md:px-12 bg-luxury-cream/10 border-y border-luxury-charcoal/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group">
                <div className="aspect-square bg-luxury-cream overflow-hidden luxury-card-hover">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 2, ease: "circOut" }}
                      src="https://images.unsplash.com/photo-1544161515-4af6b1d46fd5?q=80&w=2070&auto=format&fit=crop" 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                      alt="Concierge Service"
                    />
                </div>
                <div className="absolute bottom-0 right-0 lg:-bottom-12 lg:-right-12 w-48 h-48 md:w-64 md:h-64 bg-white p-6 md:p-8 shadow-2xl flex flex-col justify-center animate-reveal">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-gold mb-4">Service 01</span>
                    <h4 className="text-lg md:text-xl font-serif italic mb-4">Virtual Consultation</h4>
                    <p className="text-[10px] text-luxury-charcoal/40 leading-relaxed font-bold tracking-widest uppercase">Connect with our stylists globally. Live from Dhaka.</p>
                </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold mb-8 block underline underline-offset-8">THE CONCIERGE</span>
              <h2 className="text-4xl sm:text-6xl md:text-8xl mb-10 leading-tight">Personalized <br /><span className="italic font-light text-luxury-gold/60 lg:text-luxury-charcoal/100">Advisory.</span></h2>
              <p className="text-luxury-charcoal/60 leading-relaxed font-medium mb-12 text-base md:text-lg">
                For those who seek a more refined journey. Our concierge service offers private appointments, virtual styling sessions, and personalized selection assistance.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal mb-4">Private Viewing</h4>
                  <p className="text-sm text-luxury-charcoal/50 leading-relaxed">Book a session at our private atelier or your preferred location.</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal mb-4">Made-to-Measure</h4>
                  <p className="text-sm text-luxury-charcoal/50 leading-relaxed">Customize select silhouettes to your exact dimensions and needs.</p>
                </div>
              </div>

              <button className="group flex items-center space-x-8 px-14 py-7 bg-luxury-charcoal text-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-luxury-gold transition-all duration-700 shadow-2xl">
                <span>REQUEST APPOINTMENT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-4 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold mb-6 block">Join the Circle</span>
          <h2 className="text-4xl mb-8">Receive our curation.</h2>
          <p className="text-luxury-charcoal/60 mb-12 font-medium">
            Be the first to know about new arrivals, private sales, and exclusive collection previews.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow bg-white border border-luxury-charcoal/10 px-6 py-4 focus:outline-none focus:border-luxury-gold transition-colors text-sm font-medium"
            />
            <button className="bg-luxury-charcoal text-white px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-luxury-gold transition-colors">
              Subscribe
            </button>
          </form>
          <p className="mt-8 text-[10px] text-luxury-charcoal/30 font-medium">
            By subscribing, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </section>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { cn, formatCurrency } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, profile } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle transparent vs solid background
      setIsScrolled(currentScrollY > 50);
      
      // Handle hide/show logic
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Men', path: '/collection/men' },
    { name: 'Women', path: '/collection/women' },
    { name: 'Kids', path: '/collection/kids' },
    { name: 'Accessories', path: '/collection/accessories' },
    { name: 'New Arrivals', path: '/collection/new' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[60] bg-luxury-charcoal text-white/60 py-2.5 px-4 md:px-6 text-[7px] md:text-[8px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black flex items-center justify-between overflow-hidden whitespace-nowrap">
        <div className="hidden sm:flex items-center space-x-12">
            <div className="flex items-center space-x-4">
                <span>BDT</span>
                <span className="w-[1px] h-3 bg-white/10" />
                <span>Bangladesh</span>
            </div>
        </div>

        <div className="flex-grow flex justify-center px-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div 
            animate={{ x: [0, -1400] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="flex space-x-12 md:space-x-16"
            >
            <span>Complimentary worldwide delivery on selections over {formatCurrency(25000)}</span>
            <span>The Silhouette Series — Now Available Exclusively Online</span>
            <span>Artisanal Quality — Designed for the Modern Minimalist</span>
            <span>Private Consultations — Book Your Session via Concierge</span>
            {/* Duplicate for seamless scroll */}
            <span>Complimentary worldwide delivery on selections over {formatCurrency(25000)}</span>
            <span>The Silhouette Series — Now Available Exclusively Online</span>
            <span>Artisanal Quality — Designed for the Modern Minimalist</span>
            <span>Private Consultations — Book Your Session via Concierge</span>
            </motion.div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
            <Link to="/track-order" className="group flex items-center space-x-2 cursor-pointer hover:text-white transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
              <span>Track Manifest</span>
            </Link>
            <span className="cursor-help hover:text-white transition-colors">Client Services</span>
            <span className="cursor-help hover:text-white transition-colors underline underline-offset-4 decoration-luxury-gold">Sign In</span>
        </div>
      </div>

      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -140 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed left-0 w-full z-50 transition-all duration-1000 px-4 sm:px-8 md:px-12',
          isScrolled 
            ? 'top-0 py-3 md:py-4 bg-white/70 backdrop-blur-3xl border-b border-luxury-charcoal/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]' 
            : 'top-[42px] py-6 md:py-10 bg-transparent'
        )}
      >
      <div className="max-w-[1700px] mx-auto flex items-center justify-between">
        {/* Left: Menu & Desktop Nav */}
        <div className="flex items-center space-x-6 md:space-x-12">
          <button 
            className="group flex items-center space-x-4 focus:outline-none"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="relative w-7 h-4 overflow-hidden flex flex-col justify-between">
              <span className={cn("h-[1px] bg-luxury-charcoal transition-all duration-700 ease-luxury", isScrolled ? "w-5" : "w-7 group-hover:w-3")} />
              <span className={cn("h-[1px] bg-luxury-charcoal transition-all duration-700 ease-luxury delay-75", isScrolled ? "w-3" : "w-5 group-hover:w-7")} />
              <span className={cn("h-[1px] bg-luxury-charcoal transition-all duration-700 ease-luxury delay-150", isScrolled ? "w-5" : "w-2 group-hover:w-5")} />
            </div>
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.4em] font-black group-hover:text-luxury-gold transition-colors duration-700">EXPLORE</span>
          </button>

          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-[9px] uppercase tracking-[0.6em] font-black hover:text-luxury-gold transition-all duration-1000 relative group overflow-hidden py-1',
                  location.pathname === link.path ? 'text-luxury-gold' : 'text-luxury-charcoal'
                )}
              >
                <div className="relative overflow-hidden">
                   <span className="block group-hover:-translate-y-full transition-transform duration-700 ease-luxury">{link.name}</span>
                   <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-luxury italic">
                      {link.name}
                   </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Center: Brand */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group z-10">
          <motion.span 
            initial={{ opacity: 0, tracking: '1em' }}
            animate={{ 
              opacity: 1, 
              tracking: isScrolled ? '0.4em' : '0.8em',
              scale: isScrolled ? 0.9 : 1
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-black text-luxury-charcoal transition-all duration-1000 text-2xl md:text-4xl"
          >
            VINGRAZ
          </motion.span>
          <span className={cn(
            "font-black text-luxury-taupe opacity-40 group-hover:opacity-100 transition-all duration-1000 mt-1 uppercase",
            isScrolled ? "text-[5px] tracking-[0.4em]" : "text-[7px] tracking-[0.8em]"
          )}>
            EST. 2026
          </span>
        </Link>

        {/* Right: Actions & Desktop Nav */}
        <div className="flex items-center space-x-6 md:space-x-12">
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-[9px] uppercase tracking-[0.5em] font-black hover:text-luxury-gold transition-all duration-500 relative group',
                  location.pathname === link.path ? 'text-luxury-gold' : 'text-luxury-charcoal'
                )}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-luxury-gold transition-all duration-700 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-luxury-gold transition-all duration-500 hover:scale-110"
            >
              <Search className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            <Link to="/profile" className="hover:text-luxury-gold transition-all duration-500 hover:scale-110">
              <User className={cn("w-3.5 h-3.5 md:w-4 md:h-4", user ? "text-luxury-gold" : "text-luxury-charcoal")} />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group py-2"
            >
              <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:text-luxury-gold transition-all duration-500" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-white text-[7px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full animate-reveal shadow-lg">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 h-full w-full sm:w-4/5 max-w-sm bg-white z-[70] p-10 md:p-16 flex flex-col shadow-2xl overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-2xl md:text-3xl font-serif font-black tracking-tighter">VINGRAZ</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-luxury-charcoal/5 hover:border-luxury-gold transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-8">
                <Link
                  to="/artisan-story"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold mb-6 block underline underline-offset-[12px] decoration-luxury-gold/30 hover:decoration-luxury-gold transition-all"
                >
                  The Artisan Story
                </Link>
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-baseline space-x-6"
                  >
                    <span className="text-[10px] font-serif italic text-luxury-charcoal/20 transition-all duration-700 group-hover:text-luxury-gold group-hover:translate-x-2">0{idx + 1}</span>
                    <span className="text-3xl md:text-4xl font-serif italic hover:translate-x-4 transition-transform duration-700 hover:text-luxury-gold">
                      {link.name}
                    </span>
                  </Link>
                ))}
                
                <div className="h-px bg-luxury-charcoal/5 my-12" />
                
                <div className="grid grid-cols-2 gap-8">
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col space-y-2 group"
                  >
                    <span className="text-[8px] uppercase tracking-widest font-black text-luxury-charcoal/40 group-hover:text-luxury-gold transition-colors">Identity</span>
                    <span className="text-sm font-serif italic">My Profile</span>
                  </Link>
                  <Link
                    to="/track-order"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col space-y-2 group"
                  >
                    <span className="text-[8px] uppercase tracking-widest font-black text-luxury-charcoal/40 group-hover:text-luxury-gold transition-colors">Logistic</span>
                    <span className="text-sm font-serif italic">Live Tracking</span>
                  </Link>
                </div>
              </div>

              <div className="mt-auto pt-16">
                <p className="text-[9px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/20 mb-6 font-bold">Inquiries & Support</p>
                <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest font-bold text-luxury-charcoal/60">
                  <Link to="/help" className="hover:text-luxury-gold transition-colors">Client Service</Link>
                  <Link to="/shipping" className="hover:text-luxury-gold transition-colors">Shipping</Link>
                  <Link to="/returns" className="hover:text-luxury-gold transition-colors">Returns</Link>
                  <Link to="/concierge" className="hover:text-luxury-gold transition-colors">Concierge</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/95 backdrop-blur-3xl z-[100] flex flex-col"
          >
            <div className="flex justify-between items-center p-8 md:p-12">
              <span className="text-[10px] uppercase tracking-[0.6em] font-black text-luxury-charcoal/20">Global Manifest Search</span>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="group flex items-center space-x-4 text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/40 hover:text-luxury-charcoal transition-all duration-500"
              >
                <span>DISMISS</span>
                <div className="w-10 h-10 rounded-full border border-luxury-charcoal/5 flex items-center justify-center group-hover:rotate-90 transition-transform duration-700">
                    <X className="w-5 h-5" />
                </div>
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12">
              <form onSubmit={handleSearchSubmit} className="w-full max-w-5xl">
                <div className="relative group">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Refine your search..."
                    className="w-full bg-transparent border-b border-luxury-charcoal/5 py-10 md:py-16 text-3xl sm:text-5xl md:text-7xl font-serif italic focus:outline-none focus:border-luxury-gold transition-all duration-1000 placeholder:text-luxury-charcoal/5"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-luxury-gold transition-all duration-1000 group-focus-within:w-full" />
                  <button 
                    type="submit"
                    className="absolute right-0 bottom-10 md:bottom-16 p-4 text-luxury-charcoal/10 hover:text-luxury-gold transition-all duration-700 hover:scale-125"
                  >
                    <Search className="w-8 h-8 md:w-16 md:h-16 stroke-[0.5]" />
                  </button>
                </div>
                
                <div className="mt-16 flex flex-wrap gap-4 md:gap-8 justify-center animate-reveal">
                  <span className="w-full text-center text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/20 mb-4">Curated Intentions</span>
                  {['Evening Wear', 'The Cashmere Series', 'Leather Goods', 'Sustainable Linen', 'Limited Editions'].map(term => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term);
                        navigate(`/search?q=${encodeURIComponent(term)}`);
                        setIsSearchOpen(false);
                      }}
                      className="group px-8 py-4 border border-luxury-charcoal/5 rounded-full text-[9px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/50 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-700 overflow-hidden relative"
                    >
                      <span className="relative z-10">{term}</span>
                      <div className="absolute inset-0 bg-luxury-gold/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
                    </button>
                  ))}
                </div>
              </form>
            </div>
            
            <div className="p-12 text-center">
                <p className="text-[10px] uppercase tracking-[0.8em] font-black text-luxury-charcoal/10">Vingraz Apparels &copy; 2026</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    </>
  );
}

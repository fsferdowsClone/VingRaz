import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, ChevronUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-luxury-charcoal text-white pt-32 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Background Decorative Text - Architectural Scale */}
      <div className="absolute bottom-0 left-0 text-[25vw] font-serif font-black text-white/[0.01] whitespace-nowrap pointer-events-none select-none translate-y-[20%]">
        VINGRAZ
      </div>
      <div className="absolute top-0 right-0 text-[15vw] font-serif font-black text-white/[0.015] whitespace-nowrap pointer-events-none select-none translate-y-[-10%] rotate-90 origin-top-right">
        EST. 2026
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          {/* Brand & Newsletter */}
          <div className="flex flex-col space-y-16">
            <div>
              <h2 className="text-5xl font-serif font-black tracking-[-0.04em] mb-10">VINGRAZ</h2>
              <div className="space-y-4">
                <p className="text-[10px] text-white/40 leading-relaxed max-w-xs uppercase tracking-[0.4em] font-black">
                  The Official Atelier
                </p>
                <p className="text-xs text-white/60 leading-relaxed font-medium italic">
                  DHAKA · PARIS · NEW YORK · LONDON
                </p>
              </div>
              <div className="flex items-center space-x-8 mt-12 text-white/20">
                {['Instagram', 'LinkedIn', 'Vogue', 'Twitter'].map(social => (
                  <a key={social} href="#" className="text-[9px] uppercase tracking-[0.3em] font-black hover:text-luxury-gold transition-all duration-700 hover:-translate-y-1">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/5">
              <h3 className="text-[10px] uppercase tracking-[0.5em] font-black mb-8 text-luxury-gold underline underline-offset-8">THE MANIFEST</h3>
              <p className="text-[10px] text-white/30 mb-8 leading-relaxed font-black tracking-widest uppercase">Join our inner circle for priority access to seasonal drops and artisanal insights.</p>
              <form className="relative group max-w-sm">
                <input 
                  type="email" 
                  placeholder="IDENTITY@EXCELLENCE.COM" 
                  className="w-full bg-transparent border-b border-white/10 py-5 px-0 text-[10px] uppercase tracking-[0.3em] font-black focus:outline-none focus:border-luxury-gold transition-all duration-1000 placeholder:text-white/5"
                />
                <button className="absolute right-0 bottom-5 text-[10px] uppercase tracking-[0.4em] font-black text-white/20 hover:text-luxury-gold transition-all duration-700 translate-x-2 group-focus-within:translate-x-0">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>

          {/* Curation */}
          <div className="lg:pl-12">
            <h3 className="text-[10px] uppercase tracking-[0.6em] font-black mb-12 text-white/20">Curation</h3>
            <ul className="flex flex-col space-y-6">
              {[
                { name: "Men's Collection", path: "/collection/men" },
                { name: "Women's Collection", path: "/collection/women" },
                { name: "The Silhouette Series", path: "/collection/dresses" },
                { name: "Limited Accessories", path: "/collection/accessories" },
                { name: "Recent Acquisitions", path: "/collection/new" }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs font-medium text-white/60 hover:text-luxury-gold transition-all duration-500 ease-luxury hover:pl-2 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logistics */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.6em] font-black mb-12 text-white/20">Logistics</h3>
            <ul className="flex flex-col space-y-6">
              {[
                { name: "Track Manifest", path: "/track-order" },
                { name: "Global Logistics", path: "/shipping" },
                { name: "Returns Protocol", path: "/returns" },
                { name: "Client Services", path: "/contact" },
                { name: "Authentication", path: "/faq" }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs font-medium text-white/60 hover:text-luxury-gold transition-all duration-500 ease-luxury hover:pl-2 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ethos */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.6em] font-black mb-12 text-white/20">Ethos</h3>
            <ul className="flex flex-col space-y-6">
              {[
                { name: "The Artisan Story", path: "/artisan-story" },
                { name: "Sustainability Report", path: "/sustainability" },
                { name: "Atelier Careers", path: "/careers" },
                { name: "Privacy Protocol", path: "/privacy" },
                { name: "Terms of Engagement", path: "/terms" }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-xs font-medium text-white/60 hover:text-luxury-gold transition-all duration-500 ease-luxury hover:pl-2 block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col space-y-4 items-center md:items-start">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-black">
              © {currentYear} VINGRAZ ATELIER. DEFINING EXCELLENCE.
            </p>
            <div className="flex items-center space-x-6 grayscale opacity-20 hover:opacity-100 transition-all duration-1000">
               <span className="text-[8px] font-black tracking-widest border border-white/20 px-2 py-0.5">SSL ENCRYPTED</span>
               <span className="text-[8px] font-black tracking-widest border border-white/20 px-2 py-0.5">TLS 1.3</span>
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className="flex flex-col items-center group transition-all duration-1000 relative"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-3 group-hover:border-luxury-gold transition-all duration-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-luxury-gold scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-700 ease-luxury" />
                <ChevronUp className="w-5 h-5 relative z-10 group-hover:text-luxury-charcoal transition-colors duration-700" />
            </div>
            <span className="text-[8px] uppercase tracking-[0.5em] font-black text-white/20 group-hover:text-luxury-gold transition-colors duration-700">TO ZENITH</span>
          </button>

          <div className="flex flex-col items-center md:items-end space-y-4">
             <div className="flex items-center space-x-8 grayscale opacity-20 hover:opacity-100 transition-all duration-1000">
                <span className="text-[9px] font-black tracking-tighter">BKASH</span>
                <span className="text-[9px] font-black tracking-tighter">NAGAD</span>
                <span className="text-[9px] font-black tracking-tighter">VISA</span>
                <span className="text-[9px] font-black tracking-tighter">AMEX</span>
             </div>
             <p className="text-[8px] text-white/10 tracking-[0.2em] font-medium">DESIGNED IN DHAKA · HOSTED GLOBALLY</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

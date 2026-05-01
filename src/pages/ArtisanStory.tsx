import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function ArtisanStory() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop" 
            alt="Artisan Craft" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-6">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[10px] uppercase tracking-[0.8em] font-black mb-10 block"
          >
            Our Philosophy
          </motion.span>
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-6xl md:text-9xl font-serif leading-[0.8] tracking-[-0.04em] mb-12"
          >
            The Hands<br />
            <span className="italic font-light opacity-60">Behind.</span>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-48">
          <motion.div 
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -40, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=2070&auto=format&fit=crop" 
                alt="Artisan Process" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 bg-white p-12 shadow-2xl max-w-xs hidden md:block">
              <p className="text-[10px] uppercase tracking-widest font-black text-luxury-gold mb-4">Established</p>
              <p className="text-sm font-serif italic text-luxury-charcoal/60 leading-relaxed">
                "We believe that a garment's soul is born in the workshop, not the factory."
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 40, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-gold mb-8 block">Legacy of Craft</span>
            <h2 className="text-5xl md:text-7xl mb-12 leading-[0.9] tracking-tighter font-serif">Meticulous.<br />Original.</h2>
            <div className="space-y-8 text-luxury-charcoal/50 leading-relaxed text-lg text-justify-edge font-medium">
              <p>
                At VINGRAZ, our journey begins in the heart of Dhaka, where traditions of textile excellence span generations. Each piece in our collection is a testament to the patient hands of master artisans.
              </p>
              <p>
                We eschew the velocity of fast fashion in favor of a deliberate, slow-cured process. This ensures that every stitch, every seam, and every silhouette meets our uncompromising standards for quality and longevity.
              </p>
              <div className="pt-8 flex items-center space-x-6">
                <div className="w-16 h-px bg-luxury-gold" />
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-charcoal">Dhaka — Bangladesh</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-48">
          {[
            { 
              title: "Ethical Selection", 
              desc: "We ensure fair living wages and dignified working conditions for every individual in our supply chain." 
            },
            { 
              title: "Sustainable Thread", 
              desc: "100% GOTS certified cotton and recycled linen form the core of our material palette." 
            },
            { 
              title: "Artisan First", 
              desc: "Our workshops are spaces of education and empowerment, preserving ancestral weaving techniques." 
            }
          ].map((val, idx) => (
            <motion.div 
              key={val.title}
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 40, opacity: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="bg-luxury-cream/30 p-12 border border-luxury-charcoal/5 group hover:bg-white transition-all duration-700"
            >
              <span className="text-4xl text-luxury-gold opacity-20 group-hover:opacity-100 transition-opacity duration-700 mb-8 block">0{idx + 1}</span>
              <h3 className="text-xl font-serif mb-6">{val.title}</h3>
              <p className="text-[11px] uppercase tracking-widest leading-loose text-luxury-charcoal/40 font-black">{val.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Narrative */}
        <motion.div 
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto border-t border-luxury-charcoal/5 pt-32"
        >
          <Quote className="w-12 h-12 text-luxury-gold/20 mx-auto mb-12" />
          <h2 className="text-4xl md:text-6xl font-serif italic text-luxury-charcoal/80 leading-tight mb-16">
            "Design is a conversation between the material and the maker. We are simply the curators of that dialogue."
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-6 filter grayscale">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" alt="Founder" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black">Founder & Curator</span>
            <span className="text-[8px] uppercase tracking-[0.8em] font-black text-luxury-gold mt-2">VINGRAZ APPARELS</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

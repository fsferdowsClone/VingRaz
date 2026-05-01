import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LuxuryLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="overflow-hidden mb-4">
             <motion.span 
               initial={{ y: 100 }}
               animate={{ y: 0 }}
               transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
               className="block font-serif text-5xl md:text-7xl font-black tracking-[0.2em] text-luxury-charcoal"
             >
               VINGRAZ
             </motion.span>
          </div>
          
          <div className="h-[1px] w-24 bg-luxury-charcoal/10 relative overflow-hidden">
             <motion.div 
               initial={{ x: '-100%' }}
               animate={{ x: '100%' }}
               transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
               className="absolute inset-0 bg-luxury-gold"
             />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[10px] uppercase tracking-[0.8em] font-black mt-8 text-luxury-charcoal/40"
          >
            L'EXCÈS DE RAFFINEMENT
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ChevronRight } from 'lucide-react';
import { productService } from '../services/productService';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      setLoading(true);
      const allProducts = await productService.getAllProducts();
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
      setLoading(false);
    }
    performSearch();
  }, [query]);

  return (
    <div className="min-h-screen pb-32 bg-white">
      <header className="relative bg-white pt-32 pb-24 px-6 md:px-12 border-b border-luxury-charcoal/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-4 mb-10 text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/30">
                 <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
                 <span className="w-8 h-px bg-luxury-charcoal/10" />
                 <span className="text-luxury-gold">Search Intelligence</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl mb-10 animate-reveal leading-none">
                {query ? (
                  <>
                    <span className="italic font-light opacity-60 italic">Results for</span><br />
                    {query}
                  </>
                ) : 'Explore Collection'}
              </h1>
              
              <p className="text-luxury-charcoal/50 max-w-xl font-medium leading-relaxed text-lg text-justify-edge animate-reveal">
                {products.length} {products.length === 1 ? 'Exquisite Piece' : 'Exquisite Pieces'} Discovered in our Archives.
              </p>
            </div>
            
            <div className="flex items-center space-x-12 pb-2">
               <div className="flex flex-col items-end">
                 <span className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/20">Query Strength</span>
                 <span className="text-2xl font-serif italic text-luxury-gold">Optimal</span>
               </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 sm:py-24">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-x-8 md:gap-y-24">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-luxury-charcoal/5 aspect-[3/4] mb-8" />
                <div className="h-6 bg-luxury-charcoal/5 w-2/3 mb-4" />
                <div className="h-4 bg-luxury-charcoal/5 w-1/3" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-x-8 md:gap-y-24">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-48 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-luxury-cream/50 rounded-full flex items-center justify-center mx-auto mb-10 border border-luxury-charcoal/5">
              <SearchIcon className="w-8 h-8 text-luxury-charcoal/10" />
            </div>
            <h3 className="text-4xl font-serif mb-6 italic text-luxury-charcoal/80">No matches found in our dossier.</h3>
            <p className="text-luxury-charcoal/50 mb-16 font-medium leading-relaxed">
              Our archives yielded no results for your specific inquiry. You may wish to explore our broader selection or consult our concierge.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/collection/all" 
                className="px-16 py-6 bg-luxury-charcoal text-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-luxury-gold hover:shadow-2xl transition-all duration-700 ease-[0.16,1,0.3,1]"
              >
                Return to Full Archive
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

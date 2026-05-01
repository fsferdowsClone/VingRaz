import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Share2, ChevronRight, Truck, RefreshCw, ShieldCheck, Star, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { productService } from '../services/productService';
import { Product, Review } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, profile } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const data = await productService.getProductById(id);
      if (data) {
        setProduct(data);
        setSelectedSize(data.sizes[0]);
        setSelectedColor(data.colors[0]);
        
        // Fetch related products
        const all = await productService.getProductsByCategory(data.category);
        setRelatedProducts(all.filter(p => p.id !== data.id).slice(0, 4));

        // Fetch reviews
        const productReviews = await productService.getProductReviews(id);
        setReviews(productReviews);
      }
      setLoading(false);
    }
    load();
    window.scrollTo(0, 0);
  }, [id]);

  const isOutOfStock = product?.inventoryCount ? product.inventoryCount <= 0 : true;
  const currentPrice = product?.isOnSale && product?.salePrice ? product.salePrice : product?.price || 0;

  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;
    setIsAdding(true);
    addToCart(product, 1, selectedSize, selectedColor);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleBuyNow = () => {
    if (!product || isOutOfStock) return;
    addToCart(product, 1, selectedSize, selectedColor);
    navigate('/checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile || !id || !product) return;
    
    setSubmittingReview(true);
    try {
      await productService.addReview(id, {
        userId: user.uid,
        userName: profile.displayName,
        userPhoto: profile.photoURL,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        productId: id
      });
      
      // Refresh reviews
      const updatedReviews = await productService.getProductReviews(id);
      setReviews(updatedReviews);
      
      // Update local product rating (approximate)
      const newReviewCount = (product.reviewCount || 0) + 1;
      const newRating = ((product.rating || 0) * (product.reviewCount || 0) + reviewForm.rating) / newReviewCount;
      setProduct({ ...product, rating: newRating, reviewCount: newReviewCount });
      
      setReviewForm({ rating: 5, comment: '' });
      setShowReviewForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row gap-12 animate-pulse">
        <div className="w-full md:w-2/3 aspect-[4/5] bg-luxury-charcoal/5" />
        <div className="w-full md:w-1/3 space-y-8">
          <div className="h-10 bg-luxury-charcoal/5 w-3/4" />
          <div className="h-6 bg-luxury-charcoal/5 w-1/4" />
          <div className="h-32 bg-luxury-charcoal/5 w-full" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-48 text-center">
        <h2 className="text-3xl font-serif mb-6">Product not found.</h2>
        <button onClick={() => navigate(-1)} className="text-luxury-gold uppercase tracking-widest text-xs font-bold underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 pb-24">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 mb-12 text-[10px] uppercase tracking-widest font-bold text-luxury-charcoal/40">
        <button onClick={() => navigate('/')} className="hover:text-luxury-charcoal transition-colors">Home</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => navigate(`/collection/${product.category}`)} className="hover:text-luxury-charcoal transition-colors">
          {product.category}
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-luxury-charcoal">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 xl:gap-32 items-start">
        {/* Images Grid - Sticky Implementation */}
        <div className="w-full lg:w-[60%] lg:sticky lg:top-32 flex flex-col md:flex-row gap-8">
          {/* Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 order-2 md:order-1 pt-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  'w-24 aspect-[3/4] overflow-hidden transition-all duration-700 ease-luxury relative group',
                  activeImage === idx ? 'opacity-100' : 'opacity-40 hover:opacity-100'
                )}
              >
                <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                <AnimatePresence>
                  {activeImage === idx && (
                    <motion.div 
                      layoutId="activeThumb"
                      className="absolute inset-0 border border-luxury-gold pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-grow aspect-[3/4] overflow-hidden bg-luxury-cream relative group order-1 md:order-2 luxury-card-hover rounded-sm shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                src={product.images[activeImage]}
                alt={product.name}
                className={cn("w-full h-full object-cover", isOutOfStock && "grayscale opacity-80")}
              />
            </AnimatePresence>
            
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-luxury-charcoal/30 backdrop-blur-[2px]">
                <span className="bg-luxury-charcoal text-white text-[12px] uppercase tracking-[0.6em] font-black px-12 py-6 shadow-2xl">
                  ARCHIVAL ONLY
                </span>
              </div>
            )}

            <div className="absolute bottom-12 right-12 flex flex-col space-y-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
              <button className="p-5 bg-white/70 backdrop-blur-3xl rounded-full shadow-2xl hover:bg-luxury-gold hover:text-white transition-all duration-700 text-luxury-charcoal">
                <Share2 className="w-5 h-5 stroke-[1.5]" />
              </button>
              <button className="p-5 bg-white/70 backdrop-blur-3xl rounded-full shadow-2xl hover:bg-luxury-gold hover:text-white transition-all duration-700 text-luxury-charcoal">
                <Heart className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
            
            <div className="absolute bottom-12 left-12">
               <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">Atelier Dhaka — No. {product.id.slice(-4).toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Info Sidebar - Efficient Content Reveal */}
        <div className="w-full lg:w-[40%] flex flex-col pt-8 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
            className="mb-16 border-b border-luxury-charcoal/5 pb-16"
          >
            <div className="text-mask mb-6">
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-[10px] uppercase tracking-[0.6em] font-black text-luxury-gold block"
              >
                {product.category} / {product.subCategory}
              </motion.span>
            </div>
            <h1 className="text-5xl md:text-8xl mb-12 leading-[0.85] tracking-[-0.05em] font-serif italic text-luxury-charcoal">{product.name}</h1>
            
            <div className="flex items-center space-x-12 mb-12">
              <div className="flex flex-col">
                <div className="flex items-center gap-6">
                  <p className={cn(
                    "text-4xl font-serif font-light",
                    product.isOnSale ? "text-luxury-gold" : "text-luxury-charcoal/90"
                  )}>
                    {formatCurrency(currentPrice)}
                  </p>
                  {product.isOnSale && (
                    <p className="text-xl font-serif italic text-luxury-charcoal/20 line-through">
                      {formatCurrency(product.price)}
                    </p>
                  )}
                </div>
              </div>
              <div className="h-px flex-grow bg-luxury-charcoal/5" />
              <div className="flex items-center space-x-3 text-[10px] font-black tracking-widest text-luxury-charcoal/30">
                 <span>EXCELLENCE GUARANTEED</span>
                 <ShieldCheck className="w-4 h-4 text-luxury-gold/50" />
              </div>
            </div>
            
            <p className="text-luxury-charcoal/50 leading-relaxed font-medium text-lg mb-12 text-justify-edge border-l-2 border-luxury-gold/10 pl-10">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/30 mb-4">Composition</h4>
                  <p className="text-xs font-black tracking-widest text-luxury-charcoal/70">100% GOTS ORGANIC COTTON</p>
               </div>
               <div>
                  <h4 className="text-[9px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/30 mb-4">Profile</h4>
                  <p className="text-xs font-black tracking-widest text-luxury-charcoal/70">ARCHITECTURAL SILHOUETTE</p>
               </div>
            </div>
          </motion.div>

          <div className="space-y-16 mb-16">
            {/* Color Selection */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal">Palette — {selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-6">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'group relative transition-all duration-500',
                      selectedColor === color ? 'scale-110' : 'opacity-40 hover:opacity-100 hover:scale-105'
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all duration-700 flex items-center justify-center",
                      selectedColor === color ? "border-luxury-gold shadow-[0_0_20px_rgba(197,160,40,0.2)]" : "border-transparent"
                    )}>
                      <div 
                        className="w-8 h-8 rounded-full border border-luxury-charcoal/5" 
                        style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal">Dimensions — {selectedSize}</span>
                <button className="text-[9px] uppercase tracking-widest font-black underline underline-offset-4 text-luxury-gold">Sizing Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'w-16 h-16 flex items-center justify-center text-[10px] tracking-widest font-black transition-all duration-700 ease-[0.16,1,0.3,1]',
                      selectedSize === size 
                        ? 'bg-luxury-charcoal text-white shadow-xl scale-105' 
                        : 'bg-white border border-luxury-charcoal/5 text-luxury-charcoal/40 hover:border-luxury-charcoal hover:text-luxury-charcoal'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-luxury-charcoal/5 space-y-4">
            <button
              disabled={!selectedSize || !selectedColor || isAdding || isOutOfStock}
              onClick={handleAddToCart}
              className={cn(
                'w-full py-8 text-[11px] uppercase tracking-[0.4em] font-black transition-all duration-700 ease-[0.16,1,0.3,1] relative overflow-hidden group',
                isAdding ? 'bg-green-600' : 
                isOutOfStock ? 'bg-luxury-charcoal/5 text-luxury-charcoal/20 cursor-not-allowed' :
                'bg-luxury-charcoal text-white hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]'
              )}
            >
              {!isAdding && !isOutOfStock && <div className="absolute inset-0 bg-luxury-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700" />}
              <AnimatePresence mode="wait">
                {isAdding ? (
                  <motion.span
                    key="added"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="relative z-10 flex justify-center items-center"
                  >
                    ACQUIRED
                  </motion.span>
                ) : isOutOfStock ? (
                  <motion.span
                    key="soldout"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="relative z-10 flex justify-center items-center"
                  >
                    UNAVAILABLE
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="relative z-10 flex justify-center items-center space-x-3"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO SELECTION</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {!isOutOfStock && !isAdding && (
              <button
                onClick={handleBuyNow}
                className="w-full py-8 bg-luxury-gold text-white text-[11px] uppercase tracking-[0.4em] font-black hover:bg-luxury-charcoal transition-all duration-500 shadow-xl"
              >
                Buy Now — {formatCurrency(currentPrice)}
              </button>
            )}
            
            <div className="mt-12 space-y-6">
              <details className="group border-b border-luxury-charcoal/5 pb-4">
                <summary className="flex justify-between items-center cursor-pointer list-none text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/60">
                  <span>Care Instructions</span>
                  <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="mt-6 text-sm text-luxury-charcoal/50 leading-relaxed font-medium transition-all duration-700">
                  <ul className="space-y-4 list-disc pl-4">
                    <li>Dry clean recommended for maintaining the garment's pristine silhouette.</li>
                    <li>If hand washing, use cold water and pH-neutral detergent.</li>
                    <li>Lay flat to dry out of direct sunlight.</li>
                  </ul>
                </div>
              </details>
              
               <details className="group border-b border-luxury-charcoal/5 pb-4">
                <summary className="flex justify-between items-center cursor-pointer list-none text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/60">
                  <span>Ethical Sourcing</span>
                  <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="mt-6 text-sm text-luxury-charcoal/50 leading-relaxed font-medium transition-all duration-700">
                  This piece was crafted in our Dhaka workshop using 100% GOTS certified cotton, supporting local artisans with fair living wages.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* Value Props & Delivery Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-20 border-y border-luxury-charcoal/5 my-24 bg-luxury-cream/10 px-8">
        <div className="space-y-6 group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-luxury-gold group-hover:text-white transition-all duration-700">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal mb-3">Expedited Transit</h4>
            <p className="text-[11px] text-luxury-charcoal/40 font-medium leading-relaxed">Complimentary DHL Express shipping on orders exceeding {formatCurrency(20000)}. Transit time: 2-3 business days globally.</p>
          </div>
        </div>
        
        <div className="space-y-6 group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-luxury-gold group-hover:text-white transition-all duration-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal mb-3">Aesthetic Integrity</h4>
            <p className="text-[11px] text-luxury-charcoal/40 font-medium leading-relaxed">Each piece is hand-inspected and secured in archival-grade, eco-conscious packaging to ensure pristine arrival.</p>
          </div>
        </div>

        <div className="space-y-6 group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-luxury-gold group-hover:text-white transition-all duration-700">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal mb-3">Effortless Returns</h4>
            <p className="text-[11px] text-luxury-charcoal/40 font-medium leading-relaxed">We offer a 7-day complimentary return period for unworn pieces in their original condition. Concierge pick-up available.</p>
          </div>
        </div>

        <div className="space-y-6 group border-l border-luxury-charcoal/5 pl-0 lg:pl-8">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-luxury-gold group-hover:text-white transition-all duration-700">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-gold mb-3">Tracking Manifest</h4>
            <p className="text-[11px] text-luxury-charcoal/40 font-medium leading-relaxed">Real-time GPS tracking enabled for all premium shipments. Access your journey via our <Link to="/track-order" className="underline decoration-luxury-gold/30 hover:text-luxury-gold">Live Manifest</Link>.</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-48 pt-24 border-t border-luxury-charcoal/5">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold mb-6 block">
              Client Feedback
            </span>
            <h2 className="text-4xl md:text-6xl mb-8 font-serif italic">Verified Testimonials</h2>
            <p className="text-luxury-charcoal/60 leading-relaxed font-medium text-lg">
              Insights from our global community of collectors. Each piece is evaluated on silhouette, texture, and endurance.
            </p>
          </div>
          
          <div className="flex flex-col items-end">
             <div className="text-center mb-8">
               <span className="text-6xl font-serif italic">{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
               <div className="flex justify-center mt-4 mb-2">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating || 5) ? "text-luxury-gold fill-luxury-gold" : "text-luxury-charcoal/10")} />
                 ))}
               </div>
               <p className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/40">Average Rating</p>
             </div>
             {user ? (
               <button 
                 onClick={() => setShowReviewForm(!showReviewForm)}
                 className="bg-luxury-charcoal text-white px-10 py-5 text-[10px] uppercase tracking-widest font-black hover:bg-luxury-gold transition-all duration-500"
               >
                 {showReviewForm ? 'REDUCE FORM' : 'ADD TESTIMONIAL'}
               </button>
             ) : (
               <p className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/40 bg-luxury-cream/50 px-8 py-4 border border-luxury-charcoal/5">
                 Sign in to share your thoughts
               </p>
             )}
          </div>
        </div>

        <AnimatePresence>
          {showReviewForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-24"
            >
              <form onSubmit={handleReviewSubmit} className="max-w-2xl mx-auto bg-luxury-cream/20 p-12 border border-luxury-charcoal/5">
                <div className="flex flex-col space-y-10">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/40 block mb-6">Valuation (1-5 Stars)</label>
                    <div className="flex space-x-4">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="focus:outline-none transition-transform hover:scale-125"
                        >
                          <Star className={cn("w-8 h-8", star <= reviewForm.rating ? "text-luxury-gold fill-luxury-gold" : "text-luxury-charcoal/10")} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <label className="text-[10px] uppercase tracking-widest font-black text-luxury-charcoal/40">Observation Details</label>
                    <textarea
                      required
                      value={reviewForm.comment}
                      onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      className="bg-white border-b border-luxury-charcoal/10 px-0 py-5 text-sm font-medium focus:border-luxury-gold transition-colors resize-none h-32"
                      placeholder="DESCRIBE SILHOUETTE, TEXTURE, AND FIT..."
                    />
                  </div>
                  <button
                    disabled={submittingReview}
                    type="submit"
                    className="bg-luxury-charcoal text-white py-6 text-[10px] uppercase tracking-widest font-black hover:bg-luxury-gold transition-all duration-700 disabled:opacity-50"
                  >
                    {submittingReview ? 'RECORDING...' : 'FINALIZE SUBMISSION'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group border-b border-luxury-charcoal/5 pb-12"
              >
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-luxury-cream border border-luxury-charcoal/5">
                    {review.userPhoto ? (
                      <img src={review.userPhoto} alt={review.userName} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-black text-luxury-charcoal/20">
                        {review.userName[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-serif italic text-luxury-charcoal mb-1">{review.userName}</h4>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-2.5 h-2.5", i < review.rating ? "text-luxury-gold fill-luxury-gold" : "text-luxury-charcoal/10")} />
                      ))}
                    </div>
                  </div>
                  <div className="flex-grow flex justify-end">
                    <span className="text-[8px] uppercase tracking-widest font-black text-luxury-charcoal/20 italic">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-luxury-charcoal/60 leading-loose font-medium italic text-lg">
                  "{review.comment}"
                </p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 py-24 text-center border border-dashed border-luxury-charcoal/10 bg-luxury-cream/10">
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-luxury-charcoal/30">No testimonials yet. Be the first to share your experience.</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-32 pt-24 border-t border-luxury-charcoal/5">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gold mb-6 block">
                Recommendation
              </span>
              <h2 className="text-4xl md:text-5xl mb-6">Complete the Look</h2>
              <p className="text-luxury-charcoal/60 leading-relaxed font-medium">
                Our stylists have curated these pieces to perfectly complement your selection.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, Package, MapPin, Settings, Shield, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { loginWithGoogle, logout } from '../services/firebase';
import { formatCurrency } from '../lib/utils';

export default function Profile() {
  const { user, profile, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="py-48 text-center animate-pulse text-xs uppercase tracking-widest font-bold">Checking Credentials...</div>;

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-32 px-6 flex flex-col items-center text-center">
        <h1 className="text-4xl font-serif mb-8">Access Your Circle</h1>
        <p className="text-luxury-charcoal/50 mb-12 font-medium">Log in to view your orders, save items to your wishlist, and manage your luxury experience.</p>
        <button
          onClick={loginWithGoogle}
          className="w-full bg-luxury-charcoal text-white py-6 text-xs uppercase tracking-widest font-black hover:bg-luxury-gold transition-colors flex items-center justify-center space-x-4"
        >
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale invert" alt="Google" />
          <span>Continue with Google</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
      <div className="flex flex-col lg:flex-row gap-24">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 space-y-16">
          <div className="animate-reveal">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border-2 border-luxury-gold p-1 shadow-[0_20px_40px_-10px_rgba(197,160,40,0.2)]">
              <img src={profile?.photoURL || 'https://via.placeholder.com/150'} alt={profile?.displayName} className="w-full h-full object-cover rounded-full" />
            </div>
            <h2 className="text-4xl font-serif mb-2 leading-none tracking-tight">{profile?.displayName}</h2>
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/30">{profile?.email}</p>
            {isAdmin && <span className="inline-block mt-6 text-[8px] bg-luxury-charcoal text-white px-3 py-1.5 uppercase tracking-[0.4em] font-black">Admin Access</span>}
          </div>

          <nav className="flex flex-col space-y-6 animate-reveal" style={{ animationDelay: '200ms' }}>
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold mb-4">Concierge Services</span>
            <button className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.2em] font-black text-luxury-charcoal group">
              <div className="w-8 h-8 rounded-full border border-luxury-charcoal/10 flex items-center justify-center group-hover:border-luxury-gold transition-colors duration-500">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
              <span className="group-hover:text-luxury-gold transition-colors duration-500">Profile Overview</span>
            </button>
            <button className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.2em] font-black text-luxury-charcoal/40 hover:text-luxury-charcoal transition-all duration-500 group">
              <div className="w-8 h-8 rounded-full border border-luxury-charcoal/5 flex items-center justify-center group-hover:border-luxury-gold transition-colors duration-500">
                <Package className="w-3.5 h-3.5" />
              </div>
              <span>Selection Archive</span>
            </button>
            <button className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.2em] font-black text-luxury-charcoal/40 hover:text-luxury-charcoal transition-all duration-500 group">
              <div className="w-8 h-8 rounded-full border border-luxury-charcoal/5 flex items-center justify-center group-hover:border-luxury-gold transition-colors duration-500">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span>Shipment Port</span>
            </button>
            {isAdmin && (
              <button className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.2em] font-black text-luxury-charcoal/40 hover:text-luxury-charcoal transition-all duration-500 group">
                <div className="w-8 h-8 rounded-full border border-luxury-charcoal/5 flex items-center justify-center group-hover:border-luxury-gold transition-colors duration-500">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <span>Curator Panel</span>
              </button>
            )}
            <div className="h-px bg-luxury-charcoal/5 my-8" />
            <button onClick={() => logout()} className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.2em] font-black text-red-500/60 hover:text-red-500 transition-all duration-500">
              <LogOut className="w-4 h-4" />
              <span>Relinquish Session</span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-grow space-y-24">
          <section className="bg-luxury-cream/30 p-16 border border-luxury-charcoal/5">
            <h3 className="text-3xl font-serif mb-12 italic border-b border-luxury-charcoal/5 pb-8">Client Dossier</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/20">Identity</p>
                <p className="text-lg font-serif italic text-luxury-charcoal">{profile?.displayName}</p>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/20">Designated Port</p>
                <p className="text-[11px] font-black uppercase tracking-widest leading-loose">{profile?.address || 'UNSPECIFIED.'}</p>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/20">Patron Since</p>
                <p className="text-lg font-serif italic text-luxury-charcoal">{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'EST. 2026'}</p>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-luxury-charcoal/20">Privilege Level</p>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-luxury-gold">Gold Selection Member</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-luxury-charcoal/5 pb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-luxury-gold mb-4 block">Archive</span>
                <h3 className="text-4xl font-serif">Recent Selection.</h3>
              </div>
              <button className="text-[10px] uppercase tracking-[0.2em] font-black text-luxury-charcoal/40 underline underline-offset-8 hover:text-luxury-charcoal transition-colors">Manifest All Orders</button>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
                {/* Example of an active shipment */}
                <div className="bg-white p-10 border border-luxury-charcoal/5 group shadow-sm hover:shadow-2xl transition-all duration-700">
                    <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
                        <div className="flex gap-8">
                            <div className="w-24 aspect-[3/4] bg-luxury-cream overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-xl font-serif italic">Cashmere Blend Blazer</p>
                                <p className="text-[9px] uppercase tracking-[0.2em] font-black text-luxury-charcoal/30">ORD-VNG-84920</p>
                                <div className="inline-flex items-center space-x-2 bg-luxury-gold/5 px-2 py-1">
                                    <Clock className="w-3 h-3 text-luxury-gold" />
                                    <span className="text-[8px] uppercase tracking-[0.3em] font-black text-luxury-gold">Departed Atelier</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:items-end justify-between">
                            <span className="text-2xl font-serif italic text-luxury-charcoal/80">{formatCurrency(18500)}</span>
                            <button 
                                onClick={() => navigate('/track-order')}
                                className="text-[9px] uppercase tracking-[0.4em] font-black py-4 px-8 border border-luxury-charcoal/5 hover:border-luxury-gold hover:text-luxury-gold transition-all"
                            >
                                Track Manifest
                            </button>
                        </div>
                    </div>
                    <div className="h-1 bg-luxury-charcoal/5 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '40%' }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="h-full bg-luxury-gold"
                        />
                    </div>
                </div>

                <div className="py-20 border border-dashed border-luxury-charcoal/5 flex flex-col items-center justify-center bg-luxury-cream/5">
                  <div className="w-12 h-12 bg-luxury-cream/50 rounded-full flex items-center justify-center mb-6">
                    <Package className="w-5 h-5 text-luxury-charcoal/20" />
                  </div>
                  <p className="text-xs font-medium text-luxury-charcoal/30 italic">No historical archives found.</p>
                </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

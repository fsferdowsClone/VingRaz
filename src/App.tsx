import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Search from './pages/Search';
import ArtisanStory from './pages/ArtisanStory';
import TrackOrder from './pages/TrackOrder';
import LuxuryLoader from './components/LuxuryLoader';

export default function App() {
  const location = useLocation();
  
  return (
    <AuthProvider>
      <CartProvider>
        <LuxuryLoader />
        <Layout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/artisan-story" element={<ArtisanStory />} />
            <Route path="/collection/:id" element={<Collection />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/search" element={<Search />} />
            <Route path="/track-order" element={<TrackOrder />} />
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}


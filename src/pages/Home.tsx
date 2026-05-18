import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
};

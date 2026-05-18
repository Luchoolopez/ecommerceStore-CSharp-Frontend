import React from 'react';
import { Typography, Button } from '../ui';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[calc(100vh-80px)] border-b border-outline overflow-hidden bg-surface flex items-center">
      {/* Background Image - Neutral/Alcohol Premium Aesthetic */}
      <div className="absolute inset-0 opacity-40 grayscale mix-blend-luminosity">
        <img 
          src="https://images.unsplash.com/photo-1614316790518-a664e1f7c11a?q=80&w=2560&auto=format&fit=crop" 
          alt="Premium Bottle Display" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-24 flex flex-col items-center md:items-start text-center md:text-left gap-8 mt-12">
        <Typography variant="headline-xl" className="text-on-surface whitespace-pre-line leading-[0.85]">
          {'PREMIUM\nRESERVE'}
        </Typography>
        
        <Typography variant="body-lg" className="max-w-md text-on-surface">
          Exclusivity captured in glass. Discover our curated selection of high-end reserves and minimalist spirits. No compromises, just pure essence.
        </Typography>

        <Link to="/shop">
          <Button variant="primary" className="mt-4">
            EXPLORE COLLECTION
          </Button>
        </Link>
      </div>
    </section>
  );
};

import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import {InfoSection} from '../components/home/InfoSection';
import { ManifestoSection } from '../components/home/ManifestoSection';

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />
      <HeroSection />
      <InfoSection />
      <FeaturedProducts />
      <ManifestoSection />
      <Footer />
    </div>
  );
};

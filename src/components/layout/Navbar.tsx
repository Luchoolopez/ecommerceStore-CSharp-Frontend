import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import { Typography } from '../ui/Typography';
import { useCartContext } from '../../context/cartContext';

export const Navbar = () => {
  const { carrito } = useCartContext();
  
  const cartItemCount = carrito?.items.reduce((total, item) => total + item.cantidad, 0) || 0;

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface border-b border-outline">
      <div className="grid grid-cols-3 items-center px-4 md:px-6 h-[80px]">
        {/* Left: Navigation */}
        <div className="flex gap-4 md:gap-8">
          <Link to="/shop" className="hover:text-primary transition-colors">
            <Typography variant="label-caps">Tienda</Typography>
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors hidden md:block">
            <Typography variant="label-caps">Nosotros</Typography>
          </Link>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center">
          <Link to="/">
            <Typography variant="headline-md" className="tracking-widest">
              FLOYD
            </Typography>
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex justify-end gap-6 items-center">
          <button className="hover:text-primary transition-colors">
            <Search size={24} strokeWidth={1.5} />
          </button>
          <Link to="/profile" className="hover:text-primary transition-colors">
            <User size={24} strokeWidth={1.5} />
          </Link>
          <Link to="/cart" className="relative hover:text-primary transition-colors">
            <ShoppingCart size={24} strokeWidth={1.5} />
            {cartItemCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-primary text-on-primary w-5 h-5 flex items-center justify-center text-[10px] font-bold font-hanken rounded-none">
                {cartItemCount}
              </div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

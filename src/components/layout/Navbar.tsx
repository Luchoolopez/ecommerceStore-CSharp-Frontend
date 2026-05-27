import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { Typography } from '../ui/Typography';
import { useCartContext } from '../../context/cartContext';
import { useAuthContext } from '../../context/authContext';

export const Navbar = () => {
  const { carrito } = useCartContext();
  const { user } = useAuthContext();
  const cartItemCount = carrito?.items?.reduce((total, item) => total + item.cantidad, 0) || 0;
  const userLink = user ? '/perfil' : '/login';

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface border-b border-outline">
      <div className="grid grid-cols-3 items-center px-4 md:px-6 h-[72px]">
        {/* Left: Navigation */}
        <div className="flex gap-4 md:gap-8">
          <Link to="/tienda" className="hover:text-primary transition-colors">
            <Typography variant="label-caps">Tienda</Typography>
          </Link>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center">
          <Link to="/">
            <Typography variant="headline-md" className="tracking-widest uppercase">
              ELIXIR
            </Typography>
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex justify-end gap-5 items-center">
          <Link to={userLink} className="hover:text-primary transition-colors" aria-label="Mi cuenta">
            <User size={22} strokeWidth={1.5} />
          </Link>
          <Link to="/carrito" className="relative hover:text-primary transition-colors" aria-label="Carrito">
            <ShoppingCart size={22} strokeWidth={1.5} />
            {cartItemCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-primary text-on-primary w-5 h-5 flex items-center justify-center text-[10px] font-bold font-hanken">
                {cartItemCount}
              </div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

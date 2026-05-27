import React, { createContext, useContext, type ReactNode, useEffect } from 'react';
import { useCarrito as useCarritoHook } from '../hooks/useCarrito';
import { useAuthContext } from './authContext';

type CartContextType = ReturnType<typeof useCarritoHook>;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cart = useCarritoHook();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      cart.fetchCarrito();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]); // solo disparar cuando cambia el ID del usuario, no la referencia del hook

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

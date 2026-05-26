import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Shop } from '../pages/Shop';
import { ProductoDetalle } from '../pages/ProductoDetalle';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tienda" element={<Shop />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} />
    </Routes>
  );
};

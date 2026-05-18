import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add more routes here as we build them */}
    </Routes>
  );
};

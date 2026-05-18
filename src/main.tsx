import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/authContext'
import { CartProvider } from './context/cartContext'
import { ScrollToTop } from './routes/scrollToTop'
import { HelmetProvider } from 'react-helmet-async'
import { ToastProvider } from './components/ui/toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <BrowserRouter>
              <ScrollToTop />
              <App />
            </BrowserRouter>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)

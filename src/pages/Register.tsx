import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuthContext } from '../context/authContext';
import { Typography } from '../components/ui';


export const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        nombre,
        email,
        password,
      });
      navigate('/', { replace: true });
    } catch {
      // El error ya lo maneja el hook y se muestra en pantalla
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Panel lateral con imagen — solo desktop */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-outline">
        <img
          alt="Vice — Bebidas Alcohólicas Premium"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/20 to-transparent" />
        <div className="absolute bottom-12 left-10 right-10">
          <Link to="/" className="block mb-8">
            <Typography variant="headline-md" className="text-primary uppercase tracking-tighter">
              VICE
            </Typography>
          </Link>
          <Typography
            variant="headline-lg"
            className="text-primary uppercase leading-none text-[48px]"
          >
            ÚNETE A
            <br />
            VICE
          </Typography>
          <Typography variant="body-md" className="text-outline mt-4 max-w-xs">
            Creá tu cuenta y explorá nuestra selección de destilados.
          </Typography>
        </div>
      </div>

      {/* Formulario */}
      <div className="flex-1 flex flex-col">
        {/* Header móvil */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 border-b border-outline">
          <Link to="/">
            <Typography variant="headline-md" className="text-primary uppercase tracking-tighter">
              VICE
            </Typography>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-12 max-w-lg w-full mx-auto lg:max-w-none">
          {/* Back button */}
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-outline hover:text-primary transition-colors w-fit">
            <ArrowLeft size={18} />
            <span className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase">Volver al home</span>
          </Link>

          {/* Tabs */}
          <div className="flex border-b border-outline mb-10">
            <Link
              to="/login"
              className="pb-4 mr-8 font-hanken font-bold text-[12px] tracking-[0.15em] uppercase text-outline hover:text-on-surface transition-colors"
            >
              Iniciar Sesión
            </Link>
            <span className="pb-4 font-hanken font-bold text-[12px] tracking-[0.15em] uppercase text-primary relative">
              Crear Cuenta
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
            </span>
          </div>

          <Typography
            variant="headline-lg"
            as="h1"
            className="text-primary uppercase leading-none text-[40px] md:text-[56px] mb-2"
          >
            Crear Cuenta
          </Typography>
          <Typography variant="body-md" className="text-outline mb-10">
            Completá tus datos para registrarte.
          </Typography>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Nombre */}
            <div className="flex flex-col gap-1">
              <label className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
                Nombre
              </label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Juan"
                className="bg-transparent border border-outline focus:border-primary text-on-surface font-hanken text-[16px] px-4 py-3 outline-none transition-colors placeholder:text-outline/50"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan@ejemplo.com"
                className="bg-transparent border border-outline focus:border-primary text-on-surface font-hanken text-[16px] px-4 py-3 outline-none transition-colors placeholder:text-outline/50"
              />
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1">
              <label className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border border-outline focus:border-primary text-on-surface font-hanken text-[16px] px-4 py-3 pr-12 outline-none transition-colors placeholder:text-outline/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error del backend */}
            {error && (
              <div className="border border-error px-4 py-3">
                <Typography variant="body-md" className="text-error">
                  {error}
                </Typography>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-primary text-on-primary font-hanken font-bold text-[13px] tracking-[0.15em] uppercase py-4 flex items-center justify-center gap-3 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              {!loading && <ArrowRight size={18} />}
            </button>

            {/* Link a login */}
            <div className="text-center border-t border-outline pt-6">
              <Typography variant="body-md" className="text-outline">
                ¿Ya tenés cuenta?{' '}
                <Link
                  to="/login"
                  className="text-primary underline underline-offset-4 hover:text-on-surface transition-colors"
                >
                  Iniciá sesión
                </Link>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

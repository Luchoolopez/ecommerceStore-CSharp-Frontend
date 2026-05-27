import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuthContext } from '../context/authContext';
import { Typography } from '../components/ui';

// Imagen de botella del proyecto Stitch
const SIDE_IMAGE = 'https://lh3.googleusercontent.com/aida/ADBb0uiXEdBbJRmncyP9dzorBfUsdRymP5-jkzIMVP_yyhQ0xxgjL3_oCZv_ikKFcaxt1GDfj9M1dyqo6nICd-b98ilRDtZdeXJAaBHk7TNxOO-4Ezf9nF4oFEcWUrQ1PMgecErgtqE_R7rjVviHMyzKLsPH05iCnKHaDewQjrqJE8EFo3Zs02UrakCouxsaLuvNDiyUfU-8w1CL4JLrmKL1dLtXSIBAL9dpgp1Hr7XYz_f1D8pG3pN_w_4YTHE8';

type AuthMode = 'login' | 'register';

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register, loading, error } = useAuthContext();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        const res = await login({ email, passwordHash: password });
        // Redirigir según rol
        if (res.usuario.rol === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        await register({ nombre, apellido, email, passwordHash: password, telefono: telefono || undefined });
        navigate('/', { replace: true });
      }
    } catch {
      // el error ya lo maneja el hook
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Panel lateral con imagen — solo desktop */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-outline">
        <img
          src={SIDE_IMAGE}
          alt="Floyd — Fragancias de autor"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/20 to-transparent" />
        {/* Texto sobre imagen */}
        <div className="absolute bottom-12 left-10 right-10">
          <Link to="/" className="block mb-8">
            <Typography variant="headline-md" className="text-primary uppercase tracking-tighter">
              FLOYD
            </Typography>
          </Link>
          <Typography variant="headline-lg" className="text-primary uppercase leading-none text-[48px]">
            FRAGANCIAS<br />DE AUTOR
          </Typography>
          <Typography variant="body-md" className="text-outline mt-4 max-w-xs">
            La arquitectura del aroma.
          </Typography>
        </div>
      </div>

      {/* Panel de formulario */}
      <div className="flex-1 flex flex-col">
        {/* Header móvil */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 border-b border-outline">
          <Link to="/">
            <Typography variant="headline-md" className="text-primary uppercase tracking-tighter">
              FLOYD
            </Typography>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-20 py-12 max-w-lg w-full mx-auto lg:max-w-none">
          {/* Tabs Login / Registro */}
          <div className="flex border-b border-outline mb-10">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`pb-4 mr-8 font-hanken font-bold text-[12px] tracking-[0.15em] uppercase transition-colors relative ${
                mode === 'login' ? 'text-primary' : 'text-outline hover:text-on-surface'
              }`}
            >
              Iniciar Sesión
              {mode === 'login' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`pb-4 font-hanken font-bold text-[12px] tracking-[0.15em] uppercase transition-colors relative ${
                mode === 'register' ? 'text-primary' : 'text-outline hover:text-on-surface'
              }`}
            >
              Crear Cuenta
              {mode === 'register' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          </div>

          {/* Título */}
          <Typography variant="headline-lg" as="h1" className="text-primary uppercase leading-none text-[40px] md:text-[56px] mb-2">
            {mode === 'login' ? 'Bienvenido' : 'Crear Cuenta'}
          </Typography>
          <Typography variant="body-md" className="text-outline mb-10">
            {mode === 'login'
              ? 'Ingresá a tu cuenta para continuar.'
              : 'Completá tus datos para registrarte.'}
          </Typography>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Campos solo en registro */}
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      placeholder="Juan"
                      className="bg-transparent border border-outline focus:border-primary text-on-surface font-hanken text-[16px] px-4 py-3 outline-none transition-colors placeholder:text-outline/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
                      Apellido
                    </label>
                    <input
                      type="text"
                      required
                      value={apellido}
                      onChange={e => setApellido(e.target.value)}
                      placeholder="García"
                      className="bg-transparent border border-outline focus:border-primary text-on-surface font-hanken text-[16px] px-4 py-3 outline-none transition-colors placeholder:text-outline/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
                    Teléfono <span className="text-outline/50 normal-case">(opcional)</span>
                  </label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                    placeholder="+54 11 1234-5678"
                    className="bg-transparent border border-outline focus:border-primary text-on-surface font-hanken text-[16px] px-4 py-3 outline-none transition-colors placeholder:text-outline/50"
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="font-hanken font-bold text-[11px] tracking-[0.12em] uppercase text-outline">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border border-outline focus:border-primary text-on-surface font-hanken text-[16px] px-4 py-3 pr-12 outline-none transition-colors placeholder:text-outline/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
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
              {loading ? 'Procesando...' : mode === 'login' ? 'Ingresar' : 'Crear Cuenta'}
              {!loading && <ArrowRight size={18} />}
            </button>

            {/* Switch mode */}
            <div className="text-center border-t border-outline pt-6">
              {mode === 'login' ? (
                <Typography variant="body-md" className="text-outline">
                  ¿No tenés cuenta?{' '}
                  <button type="button" onClick={() => setMode('register')} className="text-primary underline underline-offset-4 hover:text-on-surface transition-colors">
                    Registrate
                  </button>
                </Typography>
              ) : (
                <Typography variant="body-md" className="text-outline">
                  ¿Ya tenés cuenta?{' '}
                  <button type="button" onClick={() => setMode('login')} className="text-primary underline underline-offset-4 hover:text-on-surface transition-colors">
                    Iniciá sesión
                  </button>
                </Typography>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

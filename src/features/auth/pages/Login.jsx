import { useEffect, useState } from 'react'
import { signIn, signUp, signInWithGoogle } from '../lib/auth'
import { useNavigate } from 'react-router'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'login') {
        await signIn(email, password)
      } else {
        await signUp(email, password)
      }
      navigate("/")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () =>
    setMode(mode === 'login' ? 'register' : 'login')

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fb7c00] text-black"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fb7c00] text-black"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#fb7c00] text-white py-3 rounded-xl font-semibold hover:bg-[#e66f00] transition disabled:opacity-50 cursor-pointer"
          >
            {loading
              ? 'Procesando...'
              : mode === 'login'
              ? 'Ingresar'
              : 'Registrarse'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">o</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full py-3 border rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition text-black cursor-pointer"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continuar con Google
        </button>

        <p className="text-center mt-6 text-sm text-black">
          {mode === 'login'
            ? '¿No tenés cuenta? '
            : '¿Ya tenés cuenta? '}
          <button
            onClick={toggleMode}
            className="text-[#fb7c00] font-semibold hover:underline"
          >
            {mode === 'login'
              ? 'Registrate'
              : 'Ingresá'}
          </button>
        </p>
      </div>
    </div>
  )
}

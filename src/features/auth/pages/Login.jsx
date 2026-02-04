import { useEffect, useState } from "react"
import { signIn, signUp, signInWithGoogle } from "../lib/auth"
import { useNavigate } from "react-router"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Login() {
  const [mode, setMode] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Validaciones en tiempo real
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    const errors = []
    if (password.length < 6) {
      errors.push("Mínimo 6 caracteres")
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Una mayúscula")
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Una minúscula")
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Un número")
    }
    return errors
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    
    if (value && !validateEmail(value)) {
      setValidationErrors(prev => ({ ...prev, email: "Email inválido" }))
    } else {
      setValidationErrors(prev => {
        const { email, ...rest } = prev
        return rest
      })
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    
    if (mode === "register" && value) {
      const errors = validatePassword(value)
      if (errors.length > 0) {
        setValidationErrors(prev => ({ ...prev, password: errors }))
      } else {
        setValidationErrors(prev => {
          const { password, ...rest } = prev
          return rest
        })
      }
    }

    // Validar confirmación si ya hay valor
    if (mode === "register" && confirmPassword && value !== confirmPassword) {
      setValidationErrors(prev => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }))
    } else {
      setValidationErrors(prev => {
        const { confirmPassword, ...rest } = prev
        return rest
      })
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    
    if (value && value !== password) {
      setValidationErrors(prev => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }))
    } else {
      setValidationErrors(prev => {
        const { confirmPassword, ...rest } = prev
        return rest
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validaciones finales
    const errors = {}
    
    if (!validateEmail(email)) {
      errors.email = "Email inválido"
    }

    if (mode === "register") {
      const passwordErrors = validatePassword(password)
      if (passwordErrors.length > 0) {
        errors.password = passwordErrors
      }
      
      if (password !== confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden"
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    setLoading(true)

    try {
      if (mode === "login") {
        const result = await signIn(email, password)
        if (result.error) {
          throw result.error
        }
        navigate("/")
      } else {
        const result = await signUp(email, password)
        if (result.error) {
          throw result.error
        }
        setShowEmailConfirmation(true)
      }
    } catch (err) {
      console.error("Auth error:", err)
      
      // Mensajes de error personalizados
      let errorMessage = "Ocurrió un error. Por favor, intentá de nuevo."
      
      if (err.message?.includes("Invalid login credentials")) {
        errorMessage = "Email o contraseña incorrectos"
      } else if (err.message?.includes("User already registered")) {
        errorMessage = "Este email ya está registrado. Intentá iniciar sesión."
      } else if (err.message?.includes("Email not confirmed")) {
        errorMessage = "Por favor, confirmá tu email antes de iniciar sesión"
      } else if (err.message?.includes("Invalid email")) {
        errorMessage = "El formato del email no es válido"
      } else if (err.message?.includes("Password should be at least 6 characters")) {
        errorMessage = "La contraseña debe tener al menos 6 caracteres"
      } else if (err.message?.includes("Unable to validate email address")) {
        errorMessage = "No se pudo validar el email. Verificá que sea correcto."
      } else if (err.message?.includes("Email rate limit exceeded")) {
        errorMessage = "Demasiados intentos. Por favor, esperá unos minutos."
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login")
    setError(null)
    setValidationErrors({})
    setPassword("")
    setConfirmPassword("")
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const handleCloseDialog = () => {
    setShowEmailConfirmation(false)
    navigate("/")
  }

  const handleGoogleSignIn = async () => {
    try {
      setError(null)
      await signInWithGoogle()
    } catch (err) {
      console.error("Google sign in error:", err)
      setError("Error al iniciar sesión con Google. Por favor, intentá de nuevo.")
    }
  }

  const isFormValid = () => {
    if (!email || !password) return false
    if (Object.keys(validationErrors).length > 0) return false
    if (mode === "register" && (!confirmPassword || password !== confirmPassword)) return false
    return true
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-25 pb-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {mode === "login" ? "Bienvenido de nuevo" : "Crear cuenta"}
          </h2>
          <p className="text-muted-foreground">
            {mode === "login" 
              ? "Ingresá para continuar disfrutando de Cut!" 
              : "Unite a la comunidad de fanáticos del cine"}
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-xl p-6 lg:p-8">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background transition-all ${
                  validationErrors.email ? "border-red-500 focus:ring-red-500" : ""
                }`}
                required
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background transition-all ${
                    validationErrors.password ? "border-red-500 focus:ring-red-500" : ""
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password strength indicator for register */}
              {mode === "register" && password && (
                <div className="mt-2 space-y-1">
                  {validationErrors.password ? (
                    <div className="text-xs space-y-0.5">
                      <p className="text-muted-foreground">La contraseña debe tener:</p>
                      {validationErrors.password.map((err, idx) => (
                        <p key={idx} className="text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {err}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-green-500 text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Contraseña válida
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password (solo en registro) */}
            {mode === "register" && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background transition-all ${
                      validationErrors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validationErrors.confirmPassword}
                  </p>
                )}
                {confirmPassword && !validationErrors.confirmPassword && confirmPassword === password && (
                  <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Las contraseñas coinciden
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                mode === "login" ? "Ingresar" : "Registrarse"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">o</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 border border-border rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continuar con Google
          </button>

          {/* Toggle Mode */}
          <p className="text-center mt-6 text-sm">
            {mode === "login" ? "¿No tenés cuenta? " : "¿Ya tenés cuenta? "}
            <button 
              onClick={toggleMode} 
              className="text-primary font-semibold hover:underline"
              disabled={loading}
            >
              {mode === "login" ? "Registrate" : "Ingresá"}
            </button>
          </p>
        </div>

        {/* Additional info for register */}
        {mode === "register" && (
          <p className="text-center mt-4 text-xs text-muted-foreground">
            Al registrarte, aceptás nuestros términos de servicio y política de privacidad
          </p>
        )}
      </div>

      {/* Email Confirmation Dialog */}
      <Dialog open={showEmailConfirmation} onOpenChange={setShowEmailConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <DialogTitle className="text-center text-xl">¡Confirmá tu email!</DialogTitle>
            <DialogDescription className="text-center space-y-3 pt-2">
              <p>
                Te enviamos un correo de confirmación a <span className="font-semibold text-foreground">{email}</span>
              </p>
              <p className="text-sm">
                Revisá tu bandeja de entrada y hacé clic en el link de confirmación para activar tu cuenta.
              </p>
              <p className="text-xs text-muted-foreground">Si no lo ves, revisá la carpeta de spam.</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={handleCloseDialog}
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Entendido
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  Film,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import bgImage from "@/shared/assets/cinema-film-reels-pattern.png";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // EmailJS espera un objeto con los nombres de los campos que definiste en tu template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: "Equipo Cut!", // Opcional: nombre del destinatario
      };

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      console.log("Email enviado exitosamente:", response);
      setIsSubmitted(true);

      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Error al enviar email:", error);
      setError(
        error.text ||
          "Hubo un error al enviar el mensaje. Por favor, intentá de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div
        style={{ background: `url(${bgImage})` }}
        className="absolute inset-0 opacity-2 bg-cover bg-center"
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left content - Info */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Estamos para ayudarte
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              ¿Tenés alguna{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">
                pregunta?
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Ya sea que tengas una sugerencia, encontraste un bug o simplemente
              querés charlar sobre películas, ¡nos encantaría leerte!
            </p>

            {/* Contact cards */}
            <div className="space-y-4 pt-8">
              <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-6 flex items-start gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Escribinos directamente
                  </p>
                  <a
                    href="mailto:contacto@cut.com"
                    className="text-primary hover:underline font-medium"
                  >
                    caminnosalbertodev@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-6 flex items-start gap-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Film className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Comunidad</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Unite a nuestra comunidad
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Contact form */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />

            <div className="relative bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-8 shadow-2xl">
              {isSubmitted ? (
                // Success message
                <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">¡Mensaje enviado!</h3>
                  <p className="text-muted-foreground text-center">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                </div>
              ) : (
                // Contact form
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <MessageSquare className="w-6 h-6 text-primary" />
                      Envianos un mensaje
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Completá el formulario y te responderemos a la brevedad
                    </p>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-sm font-medium mb-2 block"
                      >
                        Nombre
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-background/50 border-border/60 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-medium mb-2 block"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-background/50 border-border/60 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium mb-2 block"
                      >
                        Asunto
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="¿De qué se trata?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-background/50 border-border/60 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="text-sm font-medium mb-2 block"
                      >
                        Mensaje
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Contanos más..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        rows={5}
                        className="bg-background/50 border-border/60 focus:border-primary transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg h-12 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Floating decoration */}
            <div
              className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-3 shadow-lg animate-float hidden lg:block"
              style={{ animationDelay: "0.5s" }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

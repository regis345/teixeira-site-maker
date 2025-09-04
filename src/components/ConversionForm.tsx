import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Phone,
  Clock,
  Shield,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ConversionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Google Ads Conversion Tracking
    if (typeof window !== 'undefined' && window.trackFormConversion) {
      window.trackFormConversion();
    }

    // Send to WhatsApp
    const message = `Olá! Meu nome é ${formData.name}.
Telefone: ${formData.phone}
Email: ${formData.email}
Serviço: ${formData.service}
Mensagem: ${formData.message}`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    toast({
      title: "Mensagem enviada!",
      description: "Redirecionando para WhatsApp...",
    });

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: ''
    });
  };

  const handlePhoneClick = () => {
    // Phone Conversion Tracking
    if (typeof window !== 'undefined' && window.trackPhoneConversion) {
      window.trackPhoneConversion();
    }
    
    window.location.href = 'tel:';
  };

  const handleWhatsAppClick = () => {
    // WhatsApp Conversion Tracking
    if (typeof window !== 'undefined' && window.trackWhatsAppConversion) {
      window.trackWhatsAppConversion();
    }
    
    const message = "Olá! Gostaria de contratar os serviços de investigação";
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 bg-detective-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <Card className="bg-detective-surface border-detective-accent p-8">
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <Badge variant="outline" className="border-detective-gold text-detective-gold px-4 py-2">
                  CONTATO RÁPIDO
                </Badge>
                
                <h2 className="text-3xl font-bold text-foreground">
                  Solicite seu
                  <span className="text-detective-gold"> Orçamento</span>
                </h2>
                
                <p className="text-muted-foreground">
                  Preencha o formulário e receba uma proposta personalizada em minutos
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="bg-detective-dark border-detective-accent"
                />
                
                <Input
                  type="tel"
                  placeholder="Seu telefone/WhatsApp"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="bg-detective-dark border-detective-accent"
                />
                
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-detective-dark border-detective-accent"
                />
                
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full p-3 bg-detective-dark border border-detective-accent rounded-md text-foreground"
                  required
                >
                  <option value="">Selecione o serviço</option>
                  <option value="Investigação Conjugal">Investigação Conjugal</option>
                  <option value="Investigação Empresarial">Investigação Empresarial</option>
                  <option value="Investigação Familiar">Investigação Familiar</option>
                  <option value="Localização de Pessoas">Localização de Pessoas</option>
                  <option value="Investigação Jurídica">Investigação Jurídica</option>
                  <option value="Outro">Outro</option>
                </select>
                
                <Textarea
                  placeholder="Descreva resumidamente seu caso..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-detective-dark border-detective-accent min-h-[100px]"
                  required
                />
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-gold hover:shadow-gold text-detective-dark font-bold py-4"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enviar via WhatsApp
                </Button>
              </form>
            </div>
          </Card>

          {/* Benefits & CTAs */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <Card className="bg-detective-dark border-detective-gold p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Precisa falar
                <span className="text-detective-gold"> Agora</span>?
              </h3>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4"
                >
                  <MessageCircle className="w-6 h-6 mr-2" />
                  WhatsApp Direto
                </Button>
                
                <Button 
                  onClick={handlePhoneClick}
                  variant="outline"
                  size="lg"
                  className="w-full border-detective-gold text-detective-gold hover:bg-detective-gold hover:text-detective-dark font-bold py-4"
                >
                  <Phone className="w-6 h-6 mr-2" />
                  (61) 3356-3925
                </Button>
              </div>
            </Card>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: Clock, text: "Atendimento 24 horas" },
                { icon: Shield, text: "Sigilo absoluto garantido" },
                { icon: CheckCircle, text: "14+ anos de experiência" },
                { icon: CheckCircle, text: "Resultados comprovados" }
              ].map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-detective-surface/50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-detective-dark" />
                    </div>
                    <span className="text-foreground font-medium">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Urgency */}
            <Card className="bg-detective-surface border-detective-accent p-6 text-center">
              <h4 className="text-lg font-bold text-detective-gold mb-2">
                🚨 Caso Urgente?
              </h4>
              <p className="text-muted-foreground text-sm">
                Entre em contato imediatamente. Atendemos emergências 24 horas.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  MessageCircle, 
  Phone, 
  MapPin,
  Clock,
  Eye,
  Target
} from "lucide-react";

export const Footer = () => {
  const handleWhatsAppClick = () => {
    const whatsappNumber = "556133563925";
    const whatsappMessage = "Olá! Gostaria de mais informações sobre os serviços do Detetive Regis";
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    "Investigação Conjugal",
    "Investigação Empresarial", 
    "Localização de Pessoas",
    "Monitoramento e Vigilância",
    "Rastreamento GPS",
    "Investigação Familiar"
  ];

  return (
    <footer className="bg-detective-dark border-t border-detective-accent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center">
                <Shield className="w-7 h-7 text-detective-dark" />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">Detetive</div>
                <div className="text-detective-gold font-semibold text-sm -mt-1">REGIS</div>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              agencia de - Investigações, mais de 14 anos oferecendo serviços profissionais 
              de investigação particular com total discrição e ética.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="w-4 h-4 text-detective-gold mr-2" />
                Sigilo Absoluto
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Target className="w-4 h-4 text-detective-gold mr-2" />
                Resultados Eficazes
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-detective-gold mr-2" />
                Atendimento 24h
              </div>
            </div>
          </div>

          {/* Serviços */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Nossos Serviços</h3>
            <div className="space-y-3">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection('servicos')}
                  className="block text-sm text-muted-foreground hover:text-detective-gold transition-colors duration-200 text-left"
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Links Rápidos</h3>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/'}
                className="block text-sm text-muted-foreground hover:text-detective-gold transition-colors duration-200 text-left"
              >
                Início
              </button>
              <button
                onClick={() => window.location.href = '/#sobre'}
                className="block text-sm text-muted-foreground hover:text-detective-gold transition-colors duration-200 text-left"
              >
                Sobre o Detetive
              </button>
              <button
                onClick={() => window.location.href = '/#servicos'}
                className="block text-sm text-muted-foreground hover:text-detective-gold transition-colors duration-200 text-left"
              >
                Serviços
              </button>
              <button
                onClick={() => window.location.href = '/investigacao-juridica'}
                className="block text-sm text-muted-foreground hover:text-detective-gold transition-colors duration-200 text-left"
              >
                Investigação Jurídica
              </button>
              <button
                onClick={() => window.location.href = '/#contato'}
                className="block text-sm text-muted-foreground hover:text-detective-gold transition-colors duration-200 text-left"
              >
                Contato
              </button>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Entre em Contato</h3>
            
            <div className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-detective-gold mr-3 flex-shrink-0" />
                <div>
                  <div className="text-detective-gold font-semibold">Brasília - DF</div>
                  <div>Atuação em todo o Brasil</div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-detective-gold mr-3" />
                (61) 3356-3925
              </div>
            </div>

            <Button 
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-gold hover:shadow-gold text-detective-dark font-bold py-3 transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-detective-accent my-12" />

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="text-sm text-muted-foreground text-center lg:text-left">
            © 2024 Detetive Regis - agencia de Investigações. Todos os direitos reservados.
          </div>
          
          <div className="text-sm text-muted-foreground text-center lg:text-right">
            <span className="text-detective-gold font-semibold">Reginaldo Silva</span> - 
            Detetive Particular Credenciado
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="bg-detective-surface/50 border-detective-accent p-6 mt-8">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            <strong className="text-detective-gold">Aviso Legal:</strong> Todos os serviços são realizados dentro da legalidade vigente. 
            agencia de - Investigações atua com total ética profissional, respeitando a privacidade e os direitos individuais. 
            Nossos investigadores são devidamente credenciados e seguem rigorosamente o código de conduta da profissão.
          </p>
        </Card>
      </div>
    </footer>
  );
};
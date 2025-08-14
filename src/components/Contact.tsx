import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  Eye,
  Zap
} from "lucide-react";

export const Contact = () => {
  const whatsappNumber = "";
  const phoneNumber = "";
  
  const handleWhatsAppClick = () => {
    const whatsappMessage = "Olá! Gostaria de solicitar uma consultoria sobre investigação particular";
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:+${whatsappNumber}`, '_self');
  };

  const features = [
    {
      icon: Shield,
      title: "Sigilo Absoluto",
      description: "Confidencialidade garantida em todos os casos"
    },
    {
      icon: Eye,
      title: "Discrição Total",
      description: "Investigações realizadas sem exposição"
    },
    {
      icon: Zap,
      title: "Resultados Rápidos",
      description: "Agilidade na entrega de relatórios"
    }
  ];

  return (
    <section id="contato" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="border-detective-gold text-detective-gold px-4 py-2">
            ENTRE EM CONTATO
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Precisa de uma
            <span className="text-detective-gold"> Investigação</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conte conosco para esclarecer suas dúvidas com total profissionalismo e discrição. 
            Estamos prontos para atendê-lo 24 horas por dia.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário de Contato Principal */}
          <div className="lg:col-span-2">
            <Card className="bg-detective-surface border-detective-accent p-8 lg:p-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Consultoria Gratuita
                  </h3>
                  <p className="text-muted-foreground">
                    Entre em contato agora mesmo para uma avaliação inicial gratuita do seu caso. 
                    Responderemos em até 2 horas.
                  </p>
                </div>

                {/* Botões de Contato */}
                <div className="grid gap-4">
                  <Button 
                    onClick={handleWhatsAppClick}
                    size="lg"
                    className="group bg-gradient-gold hover:shadow-gold text-detective-dark font-bold p-6 text-lg h-auto justify-start transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center w-full">
                      <div className="w-12 h-12 bg-detective-dark/10 rounded-lg flex items-center justify-center mr-4">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">WhatsApp</div>
                        <div className="text-sm opacity-80">Resposta imediata</div>
                      </div>
                    </div>
                  </Button>

                  <Button 
                    onClick={handlePhoneClick}
                    variant="outline"
                    size="lg"
                    className="group border-detective-gold text-detective-gold hover:bg-detective-gold hover:text-detective-dark font-bold p-6 text-lg h-auto justify-start transition-all duration-300"
                  >
                    <div className="flex items-center w-full">
                      <div className="w-12 h-12 bg-detective-gold/10 rounded-lg flex items-center justify-center mr-4">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold">{phoneNumber}</div>
                        <div className="text-sm opacity-80">Ligação direta</div>
                      </div>
                    </div>
                  </Button>
                </div>

                {/* Informações Importantes */}
                <div className="bg-detective-dark/50 border border-detective-accent rounded-xl p-6">
                  <h4 className="text-lg font-bold text-foreground mb-4 flex items-center">
                    <Clock className="w-5 h-5 text-detective-gold mr-2" />
                    Atendimento 24h
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Consulta inicial gratuita</p>
                    <p>• Orçamento sem compromisso</p>
                    <p>• Atendimento em todo o Brasil</p>
                    <p>• Urgências atendidas imediatamente</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Informações Laterais */}
          <div className="space-y-6">
            {/* Localização */}
            <Card className="bg-detective-surface border-detective-accent p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-detective-gold mr-3" />
                <h3 className="text-lg font-bold text-foreground">Localização</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p className="font-semibold text-detective-gold">Sede Principal</p>
                <p>Brasília - DF</p>
                <p className="text-sm mt-3">
                  <strong>Atuação:</strong> Todo território nacional
                </p>
              </div>
            </Card>

            {/* Garantias */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                
                return (
                  <Card 
                    key={index}
                    className="bg-detective-surface border-detective-accent p-4 hover:border-detective-gold transition-colors duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-detective-dark" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* CTA Urgente */}
            <Card className="bg-detective-dark border-detective-gold p-6 text-center">
              <h4 className="text-lg font-bold text-detective-gold mb-3">
                Caso Urgente?
              </h4>
              <p className="text-foreground text-sm mb-4">
                Para situações que requerem ação imediata
              </p>
              <Button 
                onClick={handleWhatsAppClick}
                variant="outline"
                size="sm"
                className="border-detective-gold text-detective-gold hover:bg-detective-gold hover:text-detective-dark font-bold w-full"
              >
                Contato Urgente
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
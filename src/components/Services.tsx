import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Building2, 
  Search, 
  Eye, 
  MapPin, 
  Users,
  Shield,
  Clock
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Investigação Conjugal",
    description: "Descubra a verdade em casos relacionados a relacionamentos, com abordagem discreta e profissional para esclarecer dúvidas.",
    features: ["Infidelidade", "Comportamento suspeito", "Relacionamentos extraconjugais"]
  },
  {
    icon: Building2,
    title: "Investigação Empresarial", 
    description: "Proteja seu negócio com nossos serviços especializados, identificando fraudes, espionagem corporativa e outras ameaças.",
    features: ["Fraudes internas", "Espionagem corporativa", "Due diligence"]
  },
  {
    icon: Search,
    title: "Localização de Desaparecidos",
    description: "Encontramos pessoas desaparecidas usando técnicas avançadas de investigação e nossa vasta rede de contatos.",
    features: ["Pessoas desaparecidas", "Familiares perdidos", "Devedores"]
  },
  {
    icon: Eye,
    title: "Monitoramento e Vigilância",
    description: "Serviços especializados de monitoramento com tecnologia de ponta e profissionais experientes.",
    features: ["Vigilância discreta", "Relatórios detalhados", "Evidências fotográficas"]
  },
  {
    icon: MapPin,
    title: "Rastreamento GPS",
    description: "Tecnologia avançada de rastreamento para monitoramento de veículos e pessoas com precisão.",
    features: ["Rastreamento veicular", "Localização em tempo real", "Histórico de rotas"]
  },
  {
    icon: Users,
    title: "Investigação Familiar",
    description: "Proteção familiar com investigações especializadas para garantir a segurança dos seus entes queridos.",
    features: ["Monitoramento de filhos", "Babás e domésticas", "Segurança familiar"]
  }
];

export const Services = () => {
  const handleWhatsAppClick = () => {
    const whatsappNumber = "";
    const whatsappMessage = "Olá! Gostaria de mais informações sobre os serviços de investigação";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="servicos" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="border-detective-gold text-detective-gold px-4 py-2">
            NOSSOS SERVIÇOS
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Serviços de Detetive Particular em
            <span className="text-detective-gold"> Brasília DF</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <strong className="text-detective-gold">Detetive particular em Brasília</strong> oferecendo serviços especializados 
            de <strong className="text-detective-gold">investigação particular</strong> com mais de 14 anos 
            de experiência como <strong className="text-detective-gold">investigador privado no DF</strong>, sempre priorizando a discrição, ética e resultados eficazes.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <Card 
                key={index}
                className="group bg-detective-surface border-detective-accent hover:border-detective-gold transition-all duration-300 hover:shadow-professional hover:shadow-detective-gold/10 p-8"
              >
                <div className="space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-detective-dark" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-detective-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-detective-gold transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-detective-gold rounded-full mr-3" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Diferenciação */}
        <div className="bg-detective-surface border border-detective-accent rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Por que escolher nosso 
                <span className="text-detective-gold"> Detetive Particular em Brasília DF</span>?
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-detective-accent rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-detective-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">14+ Anos como Detetive Particular</h4>
                    <p className="text-muted-foreground text-sm">Vasta experiência como investigador privado em Brasília com centenas de casos resolvidos</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-detective-accent rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-detective-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Total Discrição</h4>
                    <p className="text-muted-foreground text-sm">Sigilo absoluto e confidencialidade garantida</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-right space-y-4">
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-gradient-gold hover:shadow-gold text-detective-dark font-bold px-8 py-4 transition-all duration-300 hover:scale-105"
              >
                Solicitar Orçamento
              </Button>
              
              <Button 
                onClick={() => window.location.href = '/investigacao-juridica'}
                variant="outline"
                size="lg"
                className="border-detective-gold text-detective-gold hover:bg-detective-gold hover:text-detective-dark font-bold px-8 py-4 transition-all duration-300 hover:scale-105 block lg:inline-block"
              >
                Investigação Jurídica
              </Button>
              
              <p className="text-sm text-muted-foreground mt-3">
                Detetive particular atuando em todo o Brasil, especialista em Brasília DF
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
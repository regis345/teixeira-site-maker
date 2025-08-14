import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Target, 
  Users2, 
  MapPin, 
  Quote,
  CheckCircle
} from "lucide-react";

export const About = () => {
  const handleWhatsAppClick = () => {
    const whatsappNumber = "";
    const whatsappMessage = "Olá! Gostaria de conhecer melhor o trabalho do Reginaldo";
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const achievements = [
    { icon: Award, label: "14+ Anos", sublabel: "de Experiência" },
    { icon: Users2, label: "500+", sublabel: "Casos Resolvidos" },
    { icon: MapPin, label: "Todo Brasil", sublabel: "Área de Atuação" },
    { icon: Target, label: "100%", sublabel: "Discrição" }
  ];

  const qualities = [
    "Formação especializada em investigação particular",
    "Graduação em Tecnologia em Investigação Profissional",
    "Atuação ética e dentro da legalidade",
    "Relatórios detalhados e evidências concretas",
    "Atendimento personalizado 24 horas",
    "Sigilo absoluto garantido"
  ];

  return (
    <section id="sobre" className="py-20 bg-detective-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="border-detective-gold text-detective-gold px-4 py-2">
            CONHEÇA O DETETIVE
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Detetive Particular
            <span className="text-detective-gold"> - Reginaldo</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Conteúdo Principal */}
          <div className="space-y-8">
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-detective-gold/20" />
              <blockquote className="text-xl lg:text-2xl font-medium text-foreground italic pl-8 border-l-4 border-detective-gold">
                "Se você nunca ouviu falar de mim, então estou fazendo um excelente trabalho."
              </blockquote>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                O detetive particular <strong className="text-detective-gold">Detetive Particular</strong> é conhecido no mundo 
                da investigação particular como <strong>Reginaldo</strong> e possui mais de 14 anos de experiência 
                atuando em <strong className="text-detective-gold">Brasília-DF e região metropolitana</strong>.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Atendendo clientes em <strong className="text-detective-gold">todas as regiões administrativas do DF</strong> 
                - Plano Piloto, Taguatinga, Ceilândia, Samambaia, Sobradinho, Planaltina, Gama, Santa Maria, 
                São Sebastião, Recanto das Emas, Riacho Fundo, Núcleo Bandeirante, Brazlândia, Paranoá, 
                Águas Claras, Vicente Pires e Fercal. Desempenhamos nossos serviços com rapidez e discrição total.
              </p>
            </div>

            {/* Qualidades */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">Diferenciais Profissionais</h3>
              <div className="grid gap-3">
                {qualities.map((quality, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-detective-gold flex-shrink-0" />
                    <span className="text-muted-foreground">{quality}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-gradient-gold hover:shadow-gold text-detective-dark font-bold px-8 py-4 transition-all duration-300 hover:scale-105"
            >
              Fale com o Detetive
            </Button>
          </div>

          {/* Estatísticas e Credenciais */}
          <div className="space-y-8">
            {/* Números */}
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                
                return (
                  <Card 
                    key={index}
                    className="bg-detective-surface border-detective-accent p-6 text-center group hover:border-detective-gold transition-colors duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-detective-dark" />
                    </div>
                    <div className="text-3xl font-bold text-detective-gold mb-1">
                      {achievement.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.sublabel}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Missão */}
            <Card className="bg-detective-dark border-detective-gold p-8">
              <h3 className="text-xl font-bold text-detective-gold mb-4">Nossa Missão</h3>
              <p className="text-foreground leading-relaxed mb-6">
                Entregar soluções individuais e personalizadas de investigações particulares 
                nas áreas de infidelidade conjugal, empresarial e particular.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Atuar com total discrição, qualidade de serviço único e lícito com excelência, 
                seja em campo ou no meio digital.
              </p>
            </Card>

            {/* Área de Atuação */}
            <Card className="bg-detective-surface border-detective-accent p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-detective-gold mr-3" />
                <h3 className="text-lg font-bold text-foreground">Área de Atuação</h3>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <strong className="text-detective-gold">Base:</strong> Brasília-DF (Asa Sul, Asa Norte, Lago Sul, Lago Norte)
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-detective-gold">Principais cidades:</strong> Taguatinga, Ceilândia, Samambaia, Águas Claras, Sobradinho, Planaltina, Gama
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-detective-gold">Entorno:</strong> Formosa-GO, Luziânia-GO, Valparaíso-GO, Cidade Ocidental-GO, Santo Antônio do Descoberto-GO
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-detective-gold">Nacional:</strong> Todo o Brasil, inclusive interior
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
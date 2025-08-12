import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Scale, 
  FileText, 
  Search, 
  Building, 
  Camera, 
  Users,
  Shield,
  Clock,
  CheckCircle,
  Gavel,
  Eye,
  MapPin,
  DollarSign,
  AlertTriangle,
  MessageCircle
} from "lucide-react";

const legalServices = [
  {
    icon: Scale,
    title: "Investigação para Divórcio",
    description: "Coleta de provas para processos de separação e divórcio, incluindo investigação de infidelidade e ocultação de bens.",
    features: ["Prova de infidelidade", "Investigação patrimonial", "Guarda de filhos", "Pensão alimentícia"]
  },
  {
    icon: DollarSign,
    title: "Investigação Patrimonial",
    description: "Localização e avaliação de bens, propriedades e ativos para processos judiciais e execuções.",
    features: ["Localização de bens", "Avaliação patrimonial", "Contas bancárias", "Imóveis e veículos"]
  },
  {
    icon: Building,
    title: "Due Diligence Jurídica",
    description: "Investigação empresarial para fusões, aquisições e parcerias comerciais com relatórios detalhados.",
    features: ["Background empresarial", "Situação financeira", "Histórico judicial", "Reputação no mercado"]
  },
  {
    icon: AlertTriangle,
    title: "Investigação de Fraudes",
    description: "Apuração de fraudes empresariais, trabalhistas e previdenciárias para suporte em ações judiciais.",
    features: ["Fraude previdenciária", "Fraude trabalhista", "Estelionato", "Apropriação indébita"]
  },
  {
    icon: FileText,
    title: "Coleta de Provas",
    description: "Obtenção legal de evidências para processos cíveis, criminais e trabalhistas com validade jurídica.",
    features: ["Provas documentais", "Testemunhas", "Perícias técnicas", "Laudos especializados"]
  },
  {
    icon: Users,
    title: "Localização de Pessoas",
    description: "Encontrar devedores, réus, testemunhas e herdeiros para citações e intimações judiciais.",
    features: ["Citação de réus", "Localização de devedores", "Busca de herdeiros", "Testemunhas"]
  }
];

const benefits = [
  {
    icon: Shield,
    title: "Legalidade Garantida",
    description: "Todos os procedimentos seguem rigorosamente a legislação vigente"
  },
  {
    icon: FileText,
    title: "Relatórios Técnicos",
    description: "Documentação completa com validade jurídica para uso processual"
  },
  {
    icon: Clock,
    title: "Prazos Processuais",
    description: "Cumprimento rigoroso de deadlines e urgências judiciais"
  },
  {
    icon: Eye,
    title: "Discrição Profissional",
    description: "Sigilo absoluto adequado à sensibilidade dos casos jurídicos"
  }
];

const LegalInvestigation = () => {
  const handleWhatsAppClick = () => {
    const whatsappNumber = "5561982844543";
    const whatsappMessage = "Olá! Sou advogado(a) e preciso de serviços de investigação para caso jurídico";
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Jurídico */}
        <section className="py-20 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-overlay" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-8">
              <Badge variant="outline" className="border-detective-gold text-detective-gold px-4 py-2">
                INVESTIGAÇÃO JURÍDICA
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Investigação no</span>
                <br />
                <span className="text-detective-gold">Âmbito Jurídico</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Suporte especializado para advogados e escritórios de advocacia em 
                <strong className="text-detective-gold">Brasília-DF e região</strong>, com investigações técnicas, 
                coleta de provas e relatórios com validade jurídica para tribunais do DF e federais.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-gold hover:shadow-gold text-detective-dark font-bold px-8 py-4 text-lg"
                >
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Consultoria Jurídica
                </Button>
                
                <div className="text-sm text-detective-gold">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Atendimento de urgência 24h
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços Jurídicos */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Serviços
                <span className="text-detective-gold"> Especializados</span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Investigações jurídicas especializadas para advogados em Brasília, atendendo 
                o TJDFT, Tribunais Federais, STJ e STF com total conformidade legal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {legalServices.map((service, index) => {
                const IconComponent = service.icon;
                
                return (
                  <Card 
                    key={index}
                    className="group bg-detective-surface border-detective-accent hover:border-detective-gold transition-all duration-300 hover:shadow-professional p-8"
                  >
                    <div className="space-y-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-8 h-8 text-detective-dark" />
                        </div>
                        <Gavel className="absolute -top-2 -right-2 w-6 h-6 text-detective-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                            <CheckCircle className="w-4 h-4 text-detective-gold mr-3" />
                            <span className="text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-20 bg-detective-surface/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl font-bold text-foreground">
                Por que Advogados
                <span className="text-detective-gold"> Confiam em Nós</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                
                return (
                  <Card 
                    key={index}
                    className="bg-detective-surface border-detective-accent p-6 text-center hover:border-detective-gold transition-colors duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-detective-dark" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </Card>
                );
              })}
            </div>

            {/* CTA para Advogados */}
            <Card className="bg-detective-dark border-detective-gold p-8 lg:p-12 text-center">
              <div className="max-w-4xl mx-auto space-y-6">
                <Scale className="w-16 h-16 text-detective-gold mx-auto" />
                
                <h3 className="text-3xl font-bold text-foreground">
                  Parceria com
                  <span className="text-detective-gold"> Escritórios de Advocacia</span>
                </h3>
                
                <p className="text-xl text-muted-foreground">
                  Oferecemos condições especiais para escritórios de advocacia e 
                  advogados com demanda regular de investigações.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-detective-gold mb-2">24h</div>
                    <div className="text-sm text-muted-foreground">Prazo médio de resposta</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-detective-gold mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Validade jurídica</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-detective-gold mb-2">14+</div>
                    <div className="text-sm text-muted-foreground">Anos de experiência</div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-gold hover:shadow-gold text-detective-dark font-bold px-8 py-4 text-lg"
                >
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Falar com Especialista
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Processo de Trabalho */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl font-bold text-foreground">
                Nosso
                <span className="text-detective-gold"> Processo</span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Metodologia estruturada para garantir a qualidade e validade jurídica 
                de todas as investigações realizadas.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Briefing Jurídico", desc: "Análise detalhada do caso e objetivos processuais" },
                { step: "02", title: "Planejamento", desc: "Estratégia investigativa conforme necessidades legais" },
                { step: "03", title: "Execução", desc: "Investigação dentro dos parâmetros legais estabelecidos" },
                { step: "04", title: "Relatório", desc: "Entrega de relatório técnico com validade jurídica" }
              ].map((item, index) => (
                <Card key={index} className="bg-detective-surface border-detective-accent p-6 text-center relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center text-detective-dark font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <div className="pt-6">
                    <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contato Especializado */}
        <section className="py-20 bg-detective-surface/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <Card className="bg-detective-surface border-detective-accent p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Precisa de Investigação
                <span className="text-detective-gold"> Jurídica</span>?
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8">
                Entre em contato para uma consultoria especializada sobre seu caso. 
                Atendemos advogados e escritórios em todo o Brasil.
              </p>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-gradient-gold hover:shadow-gold text-detective-dark font-bold px-8 py-4 text-lg w-full sm:w-auto"
                >
                  <MessageCircle className="w-6 h-6 mr-2" />
                  WhatsApp - Consultoria Jurídica
                </Button>
                
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 text-detective-gold" />
                  Brasília-DF | Atendimento em todo o Brasil
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LegalInvestigation;
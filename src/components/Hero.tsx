import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import heroImage from "@/assets/detective-hero.jpg";

export const Hero = () => {
  const whatsappNumber = "556133563925";
  const whatsappMessage = "Olá! Gostaria de mais informações sobre os serviços do Detetive Teixeira";
  
  const handleWhatsAppClick = () => {
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background com gradiente investigativo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-detective-dark via-detective-dark/90 to-transparent" />
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-detective-gold">NÃO SEJA</span>
                <br />
                <span className="text-foreground">O ÚLTIMO</span>
                <br />
                <span className="text-detective-gold">A SABER</span>
              </h1>
              
              <div className="h-1 w-24 bg-gradient-gold rounded-full" />
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-lg leading-relaxed">
                <strong className="text-detective-gold">RS – INVESTIGAÇÕES</strong> é uma empresa privada com mais de 
                <strong className="text-detective-gold"> 14 anos</strong> de investigação particular em 
                <strong className="text-detective-gold">Brasília-DF</strong> e região.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground max-w-2xl">
                Detetive particular atuando em <strong className="text-detective-gold">Brasília, Taguatinga, Ceilândia, 
                Samambaia, Águas Claras</strong> e todo o Distrito Federal. Sempre pautando nosso trabalho 
                na ética e no sigilo, com resultados positivos comprovados.
              </p>
              
              <Button 
                onClick={handleWhatsAppClick}
                size="lg"
                className="group bg-gradient-gold hover:shadow-gold text-detective-dark font-bold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 mr-2 group-hover:animate-bounce" />
                FALE CONOSCO!
              </Button>
            </div>
            
            {/* Credenciais */}
            <div className="bg-detective-surface/50 backdrop-blur-sm border border-detective-accent rounded-xl p-6 max-w-2xl">
              <p className="text-sm text-detective-gold font-semibold mb-2">DETETIVE CREDENCIADO</p>
              <p className="text-foreground leading-relaxed">
                <strong>Reginaldo Silva</strong>, formado em investigação particular pelo instituto 
                INVESTIG – Instituto de Inteligência e Investigação, graduado no curso: 
                Tecnologia em Investigação Profissional, pela UNINTER.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-detective-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-detective-gold rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
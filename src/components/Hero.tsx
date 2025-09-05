import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import heroImage from "@/assets/detective-hero.jpg";

export const Hero = () => {
  const whatsappNumber = "556133563925";
  const whatsappMessage = "Olá! Gostaria de mais informações sobre os serviços do Reginaldo";
  
  const handleWhatsAppClick = () => {
    // Google Ads Conversion Tracking
    if (typeof window !== 'undefined' && window.trackWhatsAppConversion) {
      window.trackWhatsAppConversion();
    }
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background com gradiente investigativo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-detective-dark via-detective-dark/90 to-detective-dark/70" />
      <div className="absolute inset-0 bg-gradient-overlay opacity-80" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 py-24">
        <div className="grid lg:grid-cols-12 gap-16 items-center min-h-[60vh]">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-8 space-y-12">
            {/* H1 SEO Otimizado (visualmente oculto) */}
            <h1 className="sr-only">
              Detetive Particular em Brasília DF - Investigador Privado Especialista em Infidelidade, Pessoas Desaparecidas e Investigação Empresarial | Reginaldo Detetive Particular Brasília
            </h1>
            
            <div className="space-y-8">
              {/* Badge Profissional */}
              <div className="inline-flex items-center bg-detective-gold/10 border border-detective-gold/30 rounded-full px-6 py-3 backdrop-blur-sm">
                <span className="text-detective-gold font-semibold text-sm tracking-wider uppercase">Detetive Credenciado • 14+ Anos</span>
              </div>
              
              {/* Título Visual Principal */}
              <div className="space-y-4">
                <div className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight" role="banner" aria-label="Slogan principal">
                  <div className="text-detective-gold drop-shadow-lg">NÃO SEJA</div>
                  <div className="text-white drop-shadow-lg">O ÚLTIMO</div>
                  <div className="text-detective-gold drop-shadow-lg">A SABER</div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="h-1 w-32 bg-gradient-gold rounded-full" />
                  <div className="h-2 w-2 bg-detective-gold rounded-full animate-pulse" />
                </div>
              </div>
              
              <p className="text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed font-light">
                <strong className="text-detective-gold">Detetive particular em Brasília DF</strong> profissional com mais de 
                <strong className="text-detective-gold"> 14 anos</strong> de experiência como 
                <strong className="text-detective-gold">investigador particular em Brasília</strong>. 
                <strong className="text-detective-gold">Detetive particular especialista</strong> em investigação de infidelidade, 
                pessoas desaparecidas e investigação empresarial em todo o 
                <strong className="text-detective-gold">Distrito Federal</strong>.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-lg lg:text-xl text-gray-300 max-w-3xl leading-relaxed font-light">
                  <strong className="text-detective-gold font-semibold">Detetive particular em Brasília DF</strong> atuando como 
                  <strong className="text-detective-gold font-semibold">investigador privado</strong> em 
                  <strong className="text-detective-gold font-semibold"> Brasília, Taguatinga, Ceilândia, 
                  Samambaia, Águas Claras</strong> e todo o Distrito Federal. 
                  <strong className="text-detective-gold font-semibold">Detetive particular especialista</strong> em 
                  <strong className="text-detective-gold font-semibold"> investigação de infidelidade conjugal em Brasília</strong>, 
                  sempre pautando nosso trabalho como <strong className="text-detective-gold font-semibold">detetive particular</strong> 
                  na ética e no sigilo, com resultados positivos comprovados.
                </h2>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleWhatsAppClick}
                    size="lg"
                    className="group bg-gradient-gold hover:shadow-gold text-detective-dark font-bold px-10 py-6 text-lg rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                  >
                    <MessageCircle className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                    CONSULTA GRATUITA
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold px-10 py-6 text-lg rounded-xl backdrop-blur-sm transition-all duration-500"
                    onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Conheça Nossos Serviços
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Credenciais */}
            <div className="bg-black/20 backdrop-blur-md border border-detective-gold/30 rounded-2xl p-8 max-w-3xl shadow-professional">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-detective-gold rounded-full mt-2 animate-pulse" />
                <div>
                  <p className="text-detective-gold font-bold mb-3 text-sm tracking-wider uppercase">Detetive Credenciado</p>
                  <p className="text-gray-200 leading-relaxed font-light">
                    <strong className="text-white font-semibold">Detetive Particular em Brasília DF</strong>, formado em investigação particular pelo instituto 
                    INVESTIG – Instituto de Inteligência e Investigação. <strong className="text-white font-semibold">Investigador privado graduado</strong> no curso: 
                    Tecnologia em Investigação Profissional, pela UNINTER. <strong className="text-white font-semibold">Detetive particular credenciado</strong> 
                    atuando profissionalmente em Brasília e região metropolitana do Distrito Federal.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar com estatísticas */}
          <div className="lg:col-span-4 space-y-6">
            <div className="grid gap-6">
              <div className="bg-black/30 backdrop-blur-md border border-detective-gold/20 rounded-2xl p-6 shadow-card">
                <div className="text-center">
                  <div className="text-4xl font-black text-detective-gold mb-2">14+</div>
                  <div className="text-white font-medium">Anos de Experiência</div>
                </div>
              </div>
              
              <div className="bg-black/30 backdrop-blur-md border border-detective-gold/20 rounded-2xl p-6 shadow-card">
                <div className="text-center">
                  <div className="text-4xl font-black text-detective-gold mb-2">500+</div>
                  <div className="text-white font-medium">Casos Resolvidos</div>
                </div>
              </div>
              
              <div className="bg-black/30 backdrop-blur-md border border-detective-gold/20 rounded-2xl p-6 shadow-card">
                <div className="text-center">
                  <div className="text-4xl font-black text-detective-gold mb-2">24h</div>
                  <div className="text-white font-medium">Atendimento</div>
                </div>
              </div>
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
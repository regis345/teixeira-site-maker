import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Menu, 
  X, 
  Shield 
} from "lucide-react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    // Google Ads Conversion Tracking
    if (typeof window !== 'undefined' && window.trackWhatsAppConversion) {
      window.trackWhatsAppConversion();
    }
    
    const whatsappNumber = "";
    const whatsappMessage = "Olá! Gostaria de mais informações sobre os serviços do Reginaldo";
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handleNavigation = (item: { id: string; href: string }) => {
    if (item.href.startsWith('/#')) {
      // Navegação interna na página inicial
      if (window.location.pathname !== '/') {
        window.location.href = item.href;
      } else {
        const sectionId = item.id;
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Navegação para outras páginas
      window.location.href = item.href;
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Início", id: "inicio", href: "/" },
    { label: "Sobre", id: "sobre", href: "/#sobre" },
    { label: "Serviços", id: "servicos", href: "/#servicos" },
    { label: "Investigação Jurídica", id: "juridica", href: "/investigacao-juridica" },
    { label: "Contato", id: "contato", href: "/#contato" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-detective-dark/95 backdrop-blur-md border-b border-detective-accent shadow-professional' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-detective-dark" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">Detetive</div>
              <div className="text-detective-gold font-semibold text-sm -mt-1">REGINALDO</div>
            </div>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className="text-foreground hover:text-detective-gold transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:flex">
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-gradient-gold hover:shadow-gold text-detective-dark font-bold px-6 py-2 transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Menu Mobile */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-detective-accent bg-detective-dark/95 backdrop-blur-md">
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className="block w-full text-left px-4 py-2 text-foreground hover:text-detective-gold hover:bg-detective-accent/50 rounded transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="px-4 pt-4 border-t border-detective-accent">
                <Button 
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-gold hover:shadow-gold text-detective-dark font-bold py-3 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Fale Conosco
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
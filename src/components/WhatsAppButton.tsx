import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Preciso dos serviços de um detetive particular em Brasília DF. Gostaria de mais informações."
    );
    const whatsappUrl = `https://wa.me/556133563925?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        size="lg"
        className="rounded-full w-16 h-16 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="w-8 h-8 text-white" />
      </Button>
    </div>
  );
};
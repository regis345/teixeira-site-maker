import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { ConversionForm } from "@/components/ConversionForm";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { DetectiveAI } from "@/components/DetectiveAI";

const Index = () => {
  const handleLeadQualified = (leadData: any) => {
    console.log('Lead qualificado pela IA:', leadData);
    // Aqui você pode enviar dados para analytics, CRM, etc.
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section id="inicio">
          <Hero />
        </section>
        <About />
        <Services />
        <ConversionForm />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
      <DetectiveAI onLeadQualified={handleLeadQualified} />
    </div>
  );
};

export default Index;

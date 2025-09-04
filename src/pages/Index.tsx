import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { ConversionForm } from "@/components/ConversionForm";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SEOOptimizer } from "@/components/SEOOptimizer";
import { AutoSEOContent } from "@/components/AutoSEOContent";
import { SEOMonitor } from "@/components/SEOMonitor";

const Index = () => {

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
      <WhatsAppButton />
      <SEOOptimizer autoOptimize={true} showDebugInfo={process.env.NODE_ENV === 'development'} />
      <AutoSEOContent />
      <SEOMonitor />
    </div>
  );
};

export default Index;

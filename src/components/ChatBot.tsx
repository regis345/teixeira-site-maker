import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDetectiveAI } from "../hooks/useDetectiveAI";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface LeadData {
  name?: string;
  phone?: string;
  email?: string;
  caseType?: string;
  urgency?: string;
  location?: string;
  description?: string;
  aiScore?: number;
  aiCategory?: string;
  aiUrgency?: string;
  aiConfidence?: number;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [conversationStage, setConversationStage] = useState("greeting");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Integração com IA de análise
  const {
    isLoaded: aiLoaded,
    leadScore,
    behavior,
    analyzeLead,
    analyzeDetectiveIntent,
    personalizeContent
  } = useDetectiveAI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensagem inicial do bot
      addBotMessage(
        "👋 Olá! Sou o assistente digital do Reginaldo, detetive particular em Brasília.\n\n" +
        "Estou aqui para entender sua situação e ver como posso ajudar com seu caso de investigação. " +
        "Todas as informações são tratadas com absoluto sigilo.\n\n" +
        "Para começar, qual é seu nome?"
      );
    }
  }, [isOpen]);

  const addMessage = (content: string, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (content: string) => {
    setTimeout(() => addMessage(content, true), 500);
  };

  const processUserMessage = async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      // Usa IA para analisar a intenção do usuário
      let aiAnalysis = null;
      if (aiLoaded) {
        const intentAnalysis = analyzeDetectiveIntent(userMessage);
        aiAnalysis = await analyzeLead(userMessage);
        console.log('Análise IA da mensagem:', { intentAnalysis, aiAnalysis, behavior });
      }
      
      let botResponse = "";
      let newLeadData = { ...leadData };
      let nextStage = conversationStage;

      switch (conversationStage) {
        case "greeting":
          newLeadData.name = userMessage;
          botResponse = `Prazer em conhecê-lo, ${userMessage}! 🤝\n\n` +
            "Para que eu possa direcionar melhor nossa conversa, você poderia me contar brevemente " +
            "que tipo de situação você está enfrentando?\n\n" +
            "Por exemplo:\n" +
            "• Suspeita de infidelidade conjugal\n" +
            "• Investigação empresarial\n" +
            "• Localização de pessoas\n" +
            "• Investigação de fraudes\n" +
            "• Outro tipo de caso";
          nextStage = "case_type";
          break;

        case "case_type":
          newLeadData.caseType = userMessage;
          
          // Usa IA para personalizar a resposta baseada no tipo de caso
          let personalizedResponse = "";
          if (aiAnalysis && aiAnalysis.category !== 'geral') {
            switch (aiAnalysis.category) {
              case 'infidelidade':
                personalizedResponse = "Entendo que suspeitas de infidelidade são extremamente delicadas. " +
                  "Trabalho com total discrição e uso métodos legais para obter evidências sólidas.";
                break;
              case 'pessoa_desaparecida':
                personalizedResponse = "Casos de pessoa desaparecida requerem ação rápida. " +
                  "Tenho recursos e contatos especializados para este tipo de investigação.";
                break;
              case 'fraude':
                personalizedResponse = "Investigações de fraude exigem análise técnica detalhada. " +
                  "Coleto evidências que podem ser usadas juridicamente.";
                break;
              default:
                personalizedResponse = `Entendi sua situação sobre ${userMessage.toLowerCase()}.`;
            }
          } else {
            personalizedResponse = `Entendi sua situação sobre ${userMessage.toLowerCase()}.`;
          }
          
          botResponse = `${personalizedResponse}\n\n` +
            "Em casos como este, a discrição e rapidez são fundamentais. " +
            "Para que eu possa avaliar a urgência e prioridade do seu caso:\n\n" +
            "Esta é uma situação que precisa de atenção **imediata** (até 24h), " +
            "**urgente** (alguns dias) ou podemos trabalhar com um prazo **normal** (1-2 semanas)?";
          nextStage = "urgency";
          break;

        case "urgency":
          newLeadData.urgency = userMessage;
          
          // Adiciona análise de urgência por IA
          let urgencyNote = "";
          if (aiAnalysis && (aiAnalysis.urgency === 'alta' || aiAnalysis.urgency === 'critica')) {
            urgencyNote = "\n\n🚨 **Observação:** Pela análise da sua situação, " +
              "recomendo que iniciemos a investigação o mais rápido possível para preservar evidências.";
          }
          
          botResponse = `Perfeito! Classificamos seu caso como ${userMessage.toLowerCase()}.${urgencyNote}\n\n` +
            "Para otimizar nosso atendimento, em qual região de Brasília você está localizado " +
            "ou onde precisamos focar a investigação?\n\n" +
            "Atendemos todo o DF: Plano Piloto, Taguatinga, Ceilândia, Águas Claras, " +
            "Samambaia, Sobradinho, Planaltina, Gama, e demais regiões.";
          nextStage = "location";
          break;

        case "location":
          newLeadData.location = userMessage;
          botResponse = `Ótimo! Temos experiência sólida na região de ${userMessage}.\n\n` +
            "Você poderia compartilhar mais alguns detalhes sobre o caso? " +
            "Quanto mais informações você fornecer, melhor poderemos estruturar a investigação.\n\n" +
            "Lembre-se: todas as informações são tratadas com absoluto sigilo profissional.";
          nextStage = "details";
          break;

        case "details":
          newLeadData.description = userMessage;
          
          // Usa IA para dar feedback específico sobre o caso
          let caseAssessment = "Baseado no que você compartilhou, este é exatamente o tipo de caso em que " +
            "temos expertise comprovada com mais de 14 anos de experiência.";
          
          if (aiAnalysis && aiAnalysis.confidence > 0.6) {
            caseAssessment = "Analisando os detalhes que você forneceu, posso confirmar que " +
              "este caso está dentro da nossa área de especialização. " +
              `A experiência de 14 anos em casos ${aiAnalysis.category !== 'geral' ? `de ${aiAnalysis.category}` : 'similares'} ` +
              "nos permite oferecer uma abordagem muito eficaz.";
          }
          
          botResponse = `Obrigado pelas informações detalhadas, ${newLeadData.name}.\n\n${caseAssessment}\n\n` +
            "Para finalizarmos e agendar uma conversa com o Reginaldo, " +
            "você poderia compartilhar seu melhor número de WhatsApp?";
          nextStage = "contact";
          break;

        case "contact":
          newLeadData.phone = userMessage;
          // Salvar lead no banco de dados aqui
          await saveLeadToDatabase(newLeadData);
          
          botResponse = `Excelente, ${newLeadData.name}! 🎯\n\n` +
            "Suas informações foram registradas com segurança. O Reginaldo entrará em contato " +
            `através do WhatsApp ${userMessage} ainda hoje para discutir os próximos passos.\n\n` +
            "**O que acontece agora:**\n" +
            "1️⃣ Análise preliminar do seu caso (gratuita)\n" +
            "2️⃣ Contato via WhatsApp em até 2 horas\n" +
            "3️⃣ Reunião para planejar a investigação\n\n" +
            "Você também pode entrar em contato diretamente:";
          nextStage = "completed";
          break;

        default:
          botResponse = "Obrigado pela mensagem! O Reginaldo entrará em contato em breve.";
      }

      // Salva dados da IA junto com o lead
      if (aiAnalysis) {
        newLeadData.aiScore = aiAnalysis.score;
        newLeadData.aiCategory = aiAnalysis.category;
        newLeadData.aiUrgency = aiAnalysis.urgency;
        newLeadData.aiConfidence = aiAnalysis.confidence;
      }
      
      setLeadData(newLeadData);
      setConversationStage(nextStage);
      addBotMessage(botResponse);

      if (nextStage === "completed") {
        // Mostrar botões de ação após completar o lead
        setTimeout(() => {
          addBotMessage(
            "📱 **Ações rápidas:**\n" +
            "• Clique no botão WhatsApp abaixo para falar agora\n" +
            "• Ou aguarde nosso contato em até 2 horas\n\n" +
            "Muito obrigado pela confiança! 🔍"
          );
        }, 2000);
      }

    } catch (error) {
      console.error("Erro ao processar mensagem:", error);
      addBotMessage(
        "Desculpe, houve um erro temporário. Por favor, tente novamente ou " +
        "entre em contato diretamente pelo WhatsApp: (61) 98284-4543"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const saveLeadToDatabase = async (data: LeadData) => {
    try {
      // Implementar salvamento no Supabase
      const leadInfo = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        case_type: data.caseType,
        urgency: data.urgency,
        location: data.location,
        description: data.description,
        source: 'chatbot',
        created_at: new Date().toISOString(),
        messages: JSON.stringify(messages)
      };
      
      // TODO: Implementar chamada para Supabase
      console.log("Lead salvo:", leadInfo);
      
      toast({
        title: "Informações registradas!",
        description: "Entraremos em contato em breve.",
      });
      
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, false);
    setInputValue("");
    
    await processUserMessage(userMessage);
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = "";
    const whatsappMessage = `Olá Reginaldo! Vim através do chatbot do site. Meu nome é ${leadData.name || 'Cliente'} e preciso de ajuda com investigação particular.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-gold hover:shadow-gold text-detective-dark shadow-lg hover:scale-110 transition-all duration-300"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <Card className={`fixed right-6 z-50 bg-detective-surface border-detective-accent shadow-2xl transition-all duration-300 ${
          isMinimized 
            ? 'bottom-6 w-80 h-16' 
            : 'bottom-6 w-96 h-[500px]'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-detective-accent bg-gradient-gold text-detective-dark rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bot className="w-5 h-5" />
                {aiLoaded && (
                  <Brain className="w-3 h-3 absolute -top-1 -right-1 text-blue-500" />
                )}
              </div>
              <div>
                <div className="font-bold text-sm">
                  Assistente Reginaldo {aiLoaded && <span className="text-blue-600">IA</span>}
                </div>
                <div className="text-xs opacity-80">
                  Detetive Particular - DF {aiLoaded && "• Com IA"}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0 hover:bg-detective-dark/20"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 p-0 hover:bg-detective-dark/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 space-y-4 overflow-y-auto h-80">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-detective-accent text-foreground'
                          : 'bg-gradient-gold text-detective-dark'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.isBot && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                        {!message.isBot && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                        <div className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-detective-accent text-foreground p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-detective-gold rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-detective-gold rounded-full animate-bounce [animation-delay:0.1s]" />
                          <div className="w-2 h-2 bg-detective-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {conversationStage === "completed" && (
                  <div className="flex justify-center">
                    <Button
                      onClick={handleWhatsAppClick}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Falar no WhatsApp Agora
                    </Button>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-detective-accent">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 bg-detective-dark border-detective-accent text-foreground"
                    disabled={isLoading || conversationStage === "completed"}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    size="sm"
                    className="bg-gradient-gold hover:shadow-gold text-detective-dark"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2 text-center">
                  🔒 Conversa sigilosa e segura
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
};
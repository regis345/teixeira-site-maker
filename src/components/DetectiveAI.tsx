import React, { useEffect, useState } from 'react';
import { useDetectiveAI } from '../hooks/useDetectiveAI';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, Eye, Shield, Clock } from 'lucide-react';

interface DetectiveAIProps {
  onLeadQualified?: (leadData: any) => void;
}

export const DetectiveAI: React.FC<DetectiveAIProps> = ({ onLeadQualified }) => {
  const {
    isLoaded,
    leadScore,
    behavior,
    personalizedContent,
    shouldShowOffer,
    analyzeLead,
    personalizeContent,
    shouldShowSpecialOffer
  } = useDetectiveAI();

  const [showFloatingMessage, setShowFloatingMessage] = useState(false);
  const [showUrgentOffer, setShowUrgentOffer] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Analisa automaticamente após carregamento
  useEffect(() => {
    if (isLoaded && !hasAnalyzed) {
      const timer = setTimeout(async () => {
        const score = await analyzeLead();
        const content = personalizeContent(score);
        console.log('Análise de IA:', { score, content });
        
        if (onLeadQualified && score.confidence > 0.4) {
          onLeadQualified({ score, behavior, content });
        }
        
        setHasAnalyzed(true);
      }, 10000); // Analisa após 10 segundos

      return () => clearTimeout(timer);
    }
  }, [isLoaded, hasAnalyzed, analyzeLead, personalizeContent, onLeadQualified, behavior]);

  // Mostra mensagem flutuante para leads qualificados
  useEffect(() => {
    if (leadScore && leadScore.confidence > 0.5 && behavior.timeOnPage > 30) {
      const timer = setTimeout(() => {
        setShowFloatingMessage(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [leadScore, behavior.timeOnPage]);

  // Mostra oferta urgente para casos críticos
  useEffect(() => {
    if (leadScore && (leadScore.urgency === 'alta' || leadScore.urgency === 'critica')) {
      const timer = setTimeout(() => {
        setShowUrgentOffer(true);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [leadScore]);

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critica': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'alta': return <Eye className="h-4 w-4 text-orange-600" />;
      case 'media': return <Shield className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critica': return 'destructive';
      case 'alta': return 'destructive';
      case 'media': return 'outline';
      default: return 'secondary';
    }
  };

  const handleContactWhatsApp = () => {
    const message = leadScore 
      ? `Olá, vim pelo site e preciso de investigação ${leadScore.category !== 'geral' ? `de ${leadScore.category}` : 'particular'}. ${leadScore.urgency === 'alta' || leadScore.urgency === 'critica' ? 'É um caso urgente.' : ''}`
      : "Olá, vim pelo site e preciso de um detetive particular.";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5561999887766?text=${encodedMessage}`, '_blank');
  };

  if (!isLoaded) {
    return null; // IA ainda carregando
  }

  return (
    <div className="detective-ai-container">
      {/* Mensagem Flutuante Personalizada */}
      {showFloatingMessage && personalizedContent && (
        <Card className="fixed bottom-4 right-4 z-50 max-w-sm p-4 shadow-lg border-l-4 border-primary animate-slide-in">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              {leadScore && getUrgencyIcon(leadScore.urgency)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-2">
                {personalizedContent}
              </p>
              {leadScore && (
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={getUrgencyColor(leadScore.urgency) as any} className="text-xs">
                    {leadScore.urgency.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Confiança: {Math.round(leadScore.confidence * 100)}%
                  </span>
                </div>
              )}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={handleContactWhatsApp}
                  className="flex-1"
                >
                  WhatsApp
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setShowFloatingMessage(false)}
                >
                  Depois
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Oferta Urgente para Casos Críticos */}
      {showUrgentOffer && leadScore && (leadScore.urgency === 'alta' || leadScore.urgency === 'critica') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
          <Card className="max-w-md mx-4 p-6 border-red-200 bg-white">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Atendimento Prioritário
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {leadScore.category === 'pessoa_desaparecida' 
                  ? "Casos de pessoa desaparecida requerem ação imediata. Nossa equipe está pronta para te atender agora."
                  : leadScore.category === 'infidelidade'
                  ? "Entendemos a urgência da sua situação. Oferecemos atendimento imediato e total discrição."
                  : "Situações urgentes requerem ação rápida. Entre em contato conosco agora."}
              </p>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={handleContactWhatsApp}
                >
                  Contato Imediato
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowUrgentOffer(false)}
                >
                  Fechar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Indicador de IA Ativa (apenas para desenvolvimento) */}
      {process.env.NODE_ENV === 'development' && leadScore && (
        <div className="fixed top-4 left-4 z-40">
          <Card className="p-3 text-xs bg-blue-50 border-blue-200">
            <div className="font-mono">
              <div>Score: {leadScore.score}</div>
              <div>Categoria: {leadScore.category}</div>
              <div>Urgência: {leadScore.urgency}</div>
              <div>Confiança: {Math.round(leadScore.confidence * 100)}%</div>
              <div>Tempo: {Math.round(behavior.timeOnPage)}s</div>
              <div>Scroll: {behavior.scrollDepth}%</div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
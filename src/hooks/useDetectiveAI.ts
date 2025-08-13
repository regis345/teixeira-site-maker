import { useState, useEffect, useRef } from 'react';
import { pipeline } from '@huggingface/transformers';

interface LeadScore {
  score: number;
  category: string;
  urgency: 'baixa' | 'media' | 'alta' | 'critica';
  intent: string;
  confidence: number;
}

interface BehaviorPattern {
  timeOnPage: number;
  scrollDepth: number;
  clickPattern: string[];
  searchIntent: string;
  deviceInfo: string;
}

interface DetectiveAIState {
  isLoaded: boolean;
  leadScore: LeadScore | null;
  behavior: BehaviorPattern;
  personalizedContent: string;
  shouldShowOffer: boolean;
}

export const useDetectiveAI = () => {
  const [state, setState] = useState<DetectiveAIState>({
    isLoaded: false,
    leadScore: null,
    behavior: {
      timeOnPage: 0,
      scrollDepth: 0,
      clickPattern: [],
      searchIntent: '',
      deviceInfo: navigator.userAgent
    },
    personalizedContent: '',
    shouldShowOffer: false
  });

  const classifierRef = useRef<any>(null);
  const startTimeRef = useRef(Date.now());
  const behaviorTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Inicializa o modelo de IA
  useEffect(() => {
    const initializeAI = async () => {
      try {
        // Usa um modelo pequeno e rápido para classificação de texto
        const classifier = await pipeline(
          'text-classification',
          'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
          { device: 'wasm' }
        );
        
        classifierRef.current = classifier;
        setState(prev => ({ ...prev, isLoaded: true }));
        console.log('IA para Detetive carregada com sucesso');
      } catch (error) {
        console.error('Erro ao carregar IA:', error);
      }
    };

    initializeAI();
  }, []);

  // Analisa comportamento do usuário
  useEffect(() => {
    const updateBehavior = () => {
      const timeOnPage = (Date.now() - startTimeRef.current) / 1000;
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      setState(prev => ({
        ...prev,
        behavior: {
          ...prev.behavior,
          timeOnPage,
          scrollDepth: Math.max(prev.behavior.scrollDepth, scrollDepth)
        }
      }));
    };

    const handleScroll = () => updateBehavior();
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementInfo = target.tagName + (target.className ? '.' + target.className : '');
      
      setState(prev => ({
        ...prev,
        behavior: {
          ...prev.behavior,
          clickPattern: [...prev.behavior.clickPattern.slice(-9), elementInfo]
        }
      }));
      
      updateBehavior();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);
    
    behaviorTimerRef.current = setInterval(updateBehavior, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      if (behaviorTimerRef.current) {
        clearInterval(behaviorTimerRef.current);
      }
    };
  }, []);

  // Analisa intenção de busca por detetive
  const analyzeDetectiveIntent = (text: string): LeadScore => {
    // Palavras-chave específicas para detetive particular
    const detectiveKeywords = {
      infidelidade: { weight: 10, urgency: 'alta' as const },
      traicao: { weight: 10, urgency: 'alta' as const },
      investigacao: { weight: 8, urgency: 'media' as const },
      detetive: { weight: 9, urgency: 'media' as const },
      particular: { weight: 7, urgency: 'media' as const },
      espiao: { weight: 6, urgency: 'media' as const },
      evidencia: { weight: 8, urgency: 'alta' as const },
      prova: { weight: 8, urgency: 'alta' as const },
      seguir: { weight: 7, urgency: 'alta' as const },
      marido: { weight: 9, urgency: 'alta' as const },
      esposa: { weight: 9, urgency: 'alta' as const },
      pessoa: { weight: 5, urgency: 'media' as const },
      desaparecida: { weight: 10, urgency: 'critica' as const },
      sumiu: { weight: 9, urgency: 'critica' as const },
      fraude: { weight: 8, urgency: 'alta' as const },
      golpe: { weight: 8, urgency: 'alta' as const },
      seguranca: { weight: 6, urgency: 'media' as const },
      vigilancia: { weight: 7, urgency: 'media' as const },
      monitorar: { weight: 7, urgency: 'alta' as const }
    };

    const textLower = text.toLowerCase();
    let totalScore = 0;
    let maxUrgency: 'baixa' | 'media' | 'alta' | 'critica' = 'baixa';
    let detectedIntent = '';

    Object.entries(detectiveKeywords).forEach(([keyword, data]) => {
      if (textLower.includes(keyword)) {
        totalScore += data.weight;
        if (getUrgencyLevel(data.urgency) > getUrgencyLevel(maxUrgency)) {
          maxUrgency = data.urgency;
          detectedIntent = keyword;
        }
      }
    });

    // Categoriza o tipo de caso
    let category = 'geral';
    if (textLower.includes('infidelidade') || textLower.includes('traicao')) {
      category = 'infidelidade';
    } else if (textLower.includes('desaparecida') || textLower.includes('sumiu')) {
      category = 'pessoa_desaparecida';
    } else if (textLower.includes('fraude') || textLower.includes('golpe')) {
      category = 'fraude';
    } else if (textLower.includes('seguranca') || textLower.includes('vigilancia')) {
      category = 'seguranca';
    }

    const confidence = Math.min(totalScore / 50, 1); // Normaliza para 0-1

    return {
      score: totalScore,
      category,
      urgency: maxUrgency,
      intent: detectedIntent,
      confidence
    };
  };

  const getUrgencyLevel = (urgency: string): number => {
    switch (urgency) {
      case 'critica': return 4;
      case 'alta': return 3;
      case 'media': return 2;
      case 'baixa': return 1;
      default: return 0;
    }
  };

  // Analisa o lead baseado no comportamento
  const analyzeLead = async (userText?: string): Promise<LeadScore> => {
    let score = 0;
    let urgency: 'baixa' | 'media' | 'alta' | 'critica' = 'baixa';
    let category = 'visitante';
    let intent = '';
    let confidence = 0;

    // Analisa texto se fornecido
    if (userText && classifierRef.current) {
      const textAnalysis = analyzeDetectiveIntent(userText);
      score += textAnalysis.score;
      urgency = textAnalysis.urgency;
      category = textAnalysis.category;
      intent = textAnalysis.intent;
      confidence = textAnalysis.confidence;
    }

    // Analisa comportamento
    const { timeOnPage, scrollDepth, clickPattern } = state.behavior;

    // Tempo na página (indicador de interesse)
    if (timeOnPage > 120) score += 15; // 2+ minutos
    else if (timeOnPage > 60) score += 10; // 1+ minuto
    else if (timeOnPage > 30) score += 5; // 30+ segundos

    // Profundidade de scroll
    if (scrollDepth > 80) score += 10;
    else if (scrollDepth > 50) score += 5;
    else if (scrollDepth > 25) score += 2;

    // Padrão de cliques (indicadores de interesse)
    const relevantClicks = clickPattern.filter(click => 
      click.includes('contact') || 
      click.includes('whatsapp') || 
      click.includes('button') || 
      click.includes('form')
    ).length;
    score += relevantClicks * 5;

    // Ajusta urgência baseada no comportamento
    if (timeOnPage > 180 && scrollDepth > 70) {
      urgency = urgency === 'baixa' ? 'media' : urgency;
    }

    const finalScore: LeadScore = {
      score,
      category,
      urgency,
      intent: intent || 'navegacao',
      confidence: Math.max(confidence, Math.min(score / 100, 1))
    };

    setState(prev => ({ ...prev, leadScore: finalScore }));
    return finalScore;
  };

  // Personaliza conteúdo baseado na análise
  const personalizeContent = (leadScore: LeadScore): string => {
    const { category, urgency, confidence } = leadScore;

    if (confidence < 0.3) {
      return "Precisa de ajuda com alguma situação delicada? Nossos investigadores podem te ajudar.";
    }

    let content = "";

    switch (category) {
      case 'infidelidade':
        content = urgency === 'alta' || urgency === 'critica' 
          ? "Suspeitas de infidelidade? Obtenha as evidências que precisa de forma profissional e discreta. Atendimento imediato."
          : "Investigação de infidelidade com total discrição. Evidências sólidas para sua tranquilidade.";
        break;
      
      case 'pessoa_desaparecida':
        content = "Pessoa desaparecida? Cada minuto conta. Nossa equipe especializada age rapidamente. Contate-nos agora!";
        break;
      
      case 'fraude':
        content = "Vítima de golpe ou fraude? Investigamos e coletamos evidências para sua defesa legal. Consultoria gratuita.";
        break;
      
      case 'seguranca':
        content = "Precisa de segurança pessoal ou vigilância? Profissionais especializados em proteção e monitoramento.";
        break;
      
      default:
        if (urgency === 'alta' || urgency === 'critica') {
          content = "Situação urgente? Nossos investigadores estão prontos para te atender. Discrição garantida.";
        } else {
          content = "Investigação particular profissional em Brasília. Consulta gratuita e sigilosa.";
        }
    }

    setState(prev => ({ ...prev, personalizedContent: content }));
    return content;
  };

  // Determina se deve mostrar oferta especial
  const shouldShowSpecialOffer = (): boolean => {
    const { leadScore, behavior } = state;
    
    if (!leadScore) return false;
    
    const shouldShow = 
      leadScore.confidence > 0.5 || 
      leadScore.urgency === 'alta' || 
      leadScore.urgency === 'critica' ||
      (behavior.timeOnPage > 120 && behavior.scrollDepth > 60);
    
    setState(prev => ({ ...prev, shouldShowOffer: shouldShow }));
    return shouldShow;
  };

  return {
    ...state,
    analyzeLead,
    personalizeContent,
    shouldShowSpecialOffer,
    analyzeDetectiveIntent
  };
};
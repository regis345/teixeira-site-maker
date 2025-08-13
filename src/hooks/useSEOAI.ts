import { useState, useEffect, useRef } from 'react';
import { pipeline } from '@huggingface/transformers';

interface SEOAnalysis {
  score: number;
  keywords: { word: string; density: number; relevance: number; }[];
  suggestions: string[];
  metaTags: {
    title: string;
    description: string;
    keywords: string[];
  };
  contentOptimization: {
    headings: string[];
    missingKeywords: string[];
    readabilityScore: number;
  };
  localSEO: {
    location: string;
    businessType: string;
    suggestions: string[];
  };
}

interface SEOState {
  isLoaded: boolean;
  analysis: SEOAnalysis | null;
  currentPage: string;
  optimizedContent: any;
  isAnalyzing: boolean;
}

export const useSEOAI = () => {
  const [state, setState] = useState<SEOState>({
    isLoaded: false,
    analysis: null,
    currentPage: '/',
    optimizedContent: null,
    isAnalyzing: false
  });

  const analyzerRef = useRef<any>(null);

  // Palavras-chave principais para detetive particular em Brasília
  const PRIMARY_KEYWORDS = [
    'detetive particular',
    'investigador privado',
    'investigação particular',
    'detetive brasilia',
    'investigador brasilia',
    'investigação infidelidade',
    'detetive particular df',
    'investigação pessoa desaparecida',
    'detetive privado brasilia',
    'investigação fraude',
    'vigilância particular',
    'investigação matrimonial'
  ];

  const LOCATION_KEYWORDS = [
    'brasilia', 'df', 'distrito federal', 'taguatinga', 'ceilândia',
    'aguas claras', 'samambaia', 'sobradinho', 'planaltina', 'gama',
    'plano piloto', 'asa norte', 'asa sul'
  ];

  const LONG_TAIL_KEYWORDS = [
    'como contratar detetive particular em brasilia',
    'melhor investigador privado df',
    'detetive para flagrante infidelidade',
    'investigação discreta brasilia',
    'quanto custa detetive particular',
    'investigador experiente brasilia',
    'detetive particular confiavel df',
    'investigação profissional brasilia'
  ];

  // Inicializa a IA de análise de texto
  useEffect(() => {
    const initializeAI = async () => {
      try {
        // Modelo para análise de texto e extração de características
        const analyzer = await pipeline(
          'feature-extraction',
          'Xenova/all-MiniLM-L6-v2',
          { device: 'wasm' }
        );
        
        analyzerRef.current = analyzer;
        setState(prev => ({ ...prev, isLoaded: true }));
        console.log('IA SEO carregada com sucesso');
      } catch (error) {
        console.error('Erro ao carregar IA SEO:', error);
      }
    };

    initializeAI();
  }, []);

  // Analisa o conteúdo da página atual
  const analyzePageSEO = async (): Promise<SEOAnalysis> => {
    setState(prev => ({ ...prev, isAnalyzing: true }));

    try {
      // Coleta todo o texto da página
      const pageText = document.body.innerText.toLowerCase();
      const pageTitle = document.title;
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      
      // Analisa densidade de palavras-chave
      const keywordAnalysis = analyzeKeywordDensity(pageText);
      
      // Gera sugestões de melhoria
      const suggestions = generateSEOSuggestions(pageText, keywordAnalysis);
      
      // Otimiza meta tags
      const optimizedMeta = optimizeMetaTags(pageText, keywordAnalysis);
      
      // Analisa estrutura de conteúdo
      const contentOpt = analyzeContentStructure();
      
      // Análise de SEO local
      const localSEO = analyzeLocalSEO(pageText);
      
      // Calcula score geral de SEO
      const seoScore = calculateSEOScore(keywordAnalysis, contentOpt, localSEO);

      const analysis: SEOAnalysis = {
        score: seoScore,
        keywords: keywordAnalysis,
        suggestions,
        metaTags: optimizedMeta,
        contentOptimization: contentOpt,
        localSEO
      };

      setState(prev => ({ 
        ...prev, 
        analysis,
        isAnalyzing: false 
      }));

      return analysis;
    } catch (error) {
      console.error('Erro na análise SEO:', error);
      setState(prev => ({ ...prev, isAnalyzing: false }));
      throw error;
    }
  };

  // Analisa densidade de palavras-chave
  const analyzeKeywordDensity = (text: string) => {
    const allKeywords = [...PRIMARY_KEYWORDS, ...LOCATION_KEYWORDS, ...LONG_TAIL_KEYWORDS];
    const totalWords = text.split(/\s+/).length;
    
    return allKeywords.map(keyword => {
      const keywordCount = (text.match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
      const density = (keywordCount / totalWords) * 100;
      
      // Calcula relevância baseada na importância da palavra-chave
      let relevance = 0;
      if (PRIMARY_KEYWORDS.includes(keyword)) relevance = 1.0;
      else if (LOCATION_KEYWORDS.includes(keyword)) relevance = 0.8;
      else if (LONG_TAIL_KEYWORDS.includes(keyword)) relevance = 0.9;
      
      return {
        word: keyword,
        density,
        relevance: relevance * Math.min(density / 2, 1) // Ótima densidade é ~2%
      };
    }).sort((a, b) => b.relevance - a.relevance);
  };

  // Gera sugestões inteligentes de SEO
  const generateSEOSuggestions = (text: string, keywords: any[]) => {
    const suggestions: string[] = [];
    
    // Verifica densidade de palavras-chave principais
    const mainKeywords = keywords.filter(k => PRIMARY_KEYWORDS.includes(k.word));
    const lowDensityKeywords = mainKeywords.filter(k => k.density < 1);
    
    if (lowDensityKeywords.length > 0) {
      suggestions.push(
        `Aumentar menções de: ${lowDensityKeywords.map(k => k.word).join(', ')} no conteúdo principal`
      );
    }

    // Verifica palavras-chave de localização
    const locationKeywords = keywords.filter(k => LOCATION_KEYWORDS.includes(k.word));
    const missingLocations = locationKeywords.filter(k => k.density === 0);
    
    if (missingLocations.length > 3) {
      suggestions.push('Adicionar mais referências geográficas específicas do DF');
    }

    // Verifica long-tail keywords
    const longTailPresent = keywords.filter(k => LONG_TAIL_KEYWORDS.includes(k.word) && k.density > 0).length;
    if (longTailPresent < 3) {
      suggestions.push('Incorporar mais frases de cauda longa no conteúdo');
    }

    // Verifica estrutura de headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length < 3) {
      suggestions.push('Adicionar mais cabeçalhos estruturados (H1, H2, H3) com palavras-chave');
    }

    // Verifica links internos
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"]');
    if (internalLinks.length < 5) {
      suggestions.push('Aumentar links internos relevantes para melhorar autoridade da página');
    }

    // Verifica meta description
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    if (!metaDesc || metaDesc.length < 140) {
      suggestions.push('Otimizar meta description com 150-160 caracteres incluindo palavras-chave principais');
    }

    return suggestions;
  };

  // Otimiza meta tags automaticamente
  const optimizeMetaTags = (text: string, keywords: any[]) => {
    const topKeywords = keywords.slice(0, 5).map(k => k.word);
    const locationKw = keywords.find(k => LOCATION_KEYWORDS.includes(k.word))?.word || 'Brasília';
    const mainService = 'detetive particular';

    const optimizedTitle = `${mainService.charAt(0).toUpperCase() + mainService.slice(1)} em ${locationKw.charAt(0).toUpperCase() + locationKw.slice(1)} - Investigação Profissional | Reginaldo`;
    
    const optimizedDescription = `Detetive particular experiente em ${locationKw} com 14 anos de experiência. ` +
      `Investigação discreta e profissional: infidelidade, pessoas desaparecidas, fraudes. ` +
      `Atendimento 24h em todo o DF. Consulta gratuita.`;

    return {
      title: optimizedTitle.length > 60 ? optimizedTitle.substring(0, 57) + '...' : optimizedTitle,
      description: optimizedDescription.length > 160 ? optimizedDescription.substring(0, 157) + '...' : optimizedDescription,
      keywords: topKeywords
    };
  };

  // Analisa estrutura do conteúdo
  const analyzeContentStructure = () => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .map(h => h.textContent || '');
    
    const missingKeywords = PRIMARY_KEYWORDS.filter(keyword => {
      return !headings.some(heading => 
        heading.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    // Calcula score de legibilidade baseado na estrutura
    const h1Count = document.querySelectorAll('h1').length;
    const h2Count = document.querySelectorAll('h2').length;
    const h3Count = document.querySelectorAll('h3').length;
    const paragraphCount = document.querySelectorAll('p').length;
    
    let readabilityScore = 0;
    if (h1Count === 1) readabilityScore += 20; // Apenas um H1
    if (h2Count >= 2) readabilityScore += 20; // Múltiplos H2
    if (h3Count >= 1) readabilityScore += 15; // Pelo menos um H3
    if (paragraphCount >= 5) readabilityScore += 25; // Conteúdo substancial
    if (document.querySelectorAll('ul, ol').length >= 1) readabilityScore += 20; // Listas

    return {
      headings,
      missingKeywords,
      readabilityScore
    };
  };

  // Análise de SEO local
  const analyzeLocalSEO = (text: string) => {
    const suggestions: string[] = [];
    const businessType = 'Detetive Particular';
    const location = 'Brasília, DF';

    // Verifica menções de localização
    const locationMentions = LOCATION_KEYWORDS.filter(loc => 
      text.includes(loc.toLowerCase())
    ).length;

    if (locationMentions < 3) {
      suggestions.push('Mencionar mais bairros e regiões específicas do DF');
    }

    // Verifica informações de contato
    const hasPhone = text.includes('61') || text.includes('whatsapp');
    const hasAddress = text.includes('brasília') || text.includes('df');

    if (!hasPhone) {
      suggestions.push('Destacar mais o número de contato local');
    }

    if (!hasAddress) {
      suggestions.push('Incluir referências geográficas específicas');
    }

    // Verifica horário de atendimento
    const hasHours = text.includes('24h') || text.includes('horário') || text.includes('atendimento');
    if (!hasHours) {
      suggestions.push('Adicionar informações sobre horário de atendimento');
    }

    return {
      location,
      businessType,
      suggestions
    };
  };

  // Calcula score geral de SEO
  const calculateSEOScore = (keywords: any[], content: any, local: any) => {
    let score = 0;

    // Score por densidade de palavras-chave principais (40 pontos)
    const mainKeywordsDensity = keywords
      .filter(k => PRIMARY_KEYWORDS.includes(k.word))
      .reduce((sum, k) => sum + Math.min(k.density, 3), 0); // Máximo 3% por palavra
    score += Math.min(mainKeywordsDensity * 5, 40);

    // Score por estrutura de conteúdo (30 pontos)
    score += (content.readabilityScore * 30) / 100;

    // Score por SEO local (20 pontos)
    const localMentions = LOCATION_KEYWORDS.filter(loc =>
      document.body.innerText.toLowerCase().includes(loc)
    ).length;
    score += Math.min(localMentions * 2, 20);

    // Score por meta tags (10 pontos)
    const metaDesc = document.querySelector('meta[name="description"]');
    const title = document.title;
    if (metaDesc && title) {
      const metaHasKeywords = PRIMARY_KEYWORDS.some(kw => 
        metaDesc.getAttribute('content')?.toLowerCase().includes(kw) ||
        title.toLowerCase().includes(kw)
      );
      if (metaHasKeywords) score += 10;
    }

    return Math.min(Math.round(score), 100);
  };

  // Aplica otimizações automáticas
  const applyAutomaticOptimizations = async () => {
    if (!state.analysis) return;

    const { metaTags } = state.analysis;

    // Atualiza título da página
    document.title = metaTags.title;

    // Atualiza ou cria meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = metaTags.description;

    // Adiciona meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = metaTags.keywords.join(', ');

    // Adiciona JSON-LD para SEO local
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Detective",
      "name": "Reginaldo - Detetive Particular",
      "description": "Detetive particular experiente em Brasília com mais de 14 anos de experiência",
      "url": window.location.origin,
      "telephone": "+55-61-98284-4543",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Brasília",
        "addressRegion": "DF",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-15.7942",
        "longitude": "-47.8822"
      },
      "serviceArea": {
        "@type": "Place",
        "name": "Distrito Federal, Brasil"
      },
      "priceRange": "$$",
      "openingHours": "Mo-Su 00:00-23:59",
      "serviceType": ["Investigação Particular", "Detetive Privado", "Investigação Infidelidade", "Investigação Fraude"]
    };

    // Remove script JSON-LD anterior se existir
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Adiciona novo script JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    console.log('Otimizações SEO aplicadas automaticamente');
  };

  // Gera conteúdo otimizado para SEO
  const generateOptimizedContent = (topic: string) => {
    const templates = {
      'investigacao-infidelidade': {
        title: 'Investigação de Infidelidade em Brasília - Detetive Particular Especializado',
        content: `Como detetive particular especializado em investigação de infidelidade em Brasília, 
          oferecemos serviços discretos e profissionais para descobrir a verdade. 
          Com 14 anos de experiência no DF, utilizamos métodos legais e éticos.`,
        keywords: ['investigação infidelidade', 'detetive particular brasília', 'flagrante infidelidade df']
      },
      'pessoa-desaparecida': {
        title: 'Investigação de Pessoa Desaparecida - Detetive Particular Brasília DF',
        content: `Investigação profissional de pessoas desaparecidas em Brasília e todo o DF. 
          Detetive particular com experiência e recursos para localizar pessoas rapidamente. 
          Atendimento emergencial 24h.`,
        keywords: ['pessoa desaparecida brasília', 'investigador privado df', 'localização de pessoas']
      }
    };

    return templates[topic as keyof typeof templates] || null;
  };

  return {
    ...state,
    analyzePageSEO,
    applyAutomaticOptimizations,
    generateOptimizedContent,
    PRIMARY_KEYWORDS,
    LOCATION_KEYWORDS,
    LONG_TAIL_KEYWORDS
  };
};
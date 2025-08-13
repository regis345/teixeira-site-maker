import React, { useEffect, useState, useRef } from 'react';
import { useSEOAI } from '../hooks/useSEOAI';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Target, Clock, CheckCircle2 } from 'lucide-react';

interface SEOMetrics {
  keywordRanking: { keyword: string; position: number; trend: 'up' | 'down' | 'stable' }[];
  organicClicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  topQueries: string[];
}

interface OptimizationAction {
  id: string;
  action: string;
  impact: 'high' | 'medium' | 'low';
  implemented: boolean;
  timestamp: Date;
}

export const SEOMonitor = () => {
  const { isLoaded, analysis } = useSEOAI();
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [optimizations, setOptimizations] = useState<OptimizationAction[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const monitoringIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Palavras-chave para monitoramento
  const targetKeywords = [
    'detetive particular brasília',
    'investigação infidelidade brasília',
    'investigador privado df',
    'detetive particular taguatinga',
    'investigação pessoa desaparecida brasília',
    'detetive privado águas claras',
    'investigação matrimonial brasília',
    'detetive particular ceilândia'
  ];

  useEffect(() => {
    if (isLoaded) {
      startSEOMonitoring();
      simulateSearchConsoleData(); // Simula dados do Search Console
    }

    return () => {
      if (monitoringIntervalRef.current) {
        clearInterval(monitoringIntervalRef.current);
      }
    };
  }, [isLoaded]);

  const startSEOMonitoring = () => {
    setIsMonitoring(true);

    // Monitora mudanças na página a cada 30 segundos
    monitoringIntervalRef.current = setInterval(() => {
      analyzePageChanges();
      checkKeywordOpportunities();
      implementAutoOptimizations();
    }, 30000);
  };

  const simulateSearchConsoleData = () => {
    // Simula dados realistas do Google Search Console
    const mockMetrics: SEOMetrics = {
      keywordRanking: [
        { keyword: 'detetive particular brasília', position: 8, trend: 'up' },
        { keyword: 'investigação infidelidade brasília', position: 12, trend: 'up' },
        { keyword: 'investigador privado df', position: 15, trend: 'stable' },
        { keyword: 'detetive particular taguatinga', position: 22, trend: 'down' },
        { keyword: 'investigação pessoa desaparecida brasília', position: 18, trend: 'up' }
      ],
      organicClicks: 247,
      impressions: 8340,
      ctr: 2.96,
      avgPosition: 14.8,
      topQueries: [
        'detetive particular brasília',
        'investigação infidelidade',
        'quanto custa detetive particular',
        'investigador privado df',
        'detetive brasília 24 horas'
      ]
    };

    setMetrics(mockMetrics);
  };

  const analyzePageChanges = () => {
    // Analisa se houve mudanças no conteúdo da página
    const currentContent = document.body.innerText;
    const contentLength = currentContent.length;
    
    // Verifica densidade de palavras-chave em tempo real
    const totalWords = currentContent.split(' ').length;
    const keywordDensities = targetKeywords.map(keyword => {
      const regex = new RegExp(keyword.toLowerCase(), 'gi');
      const matches = currentContent.toLowerCase().match(regex) || [];
      return {
        keyword,
        count: matches.length,
        density: (matches.length / totalWords) * 100
      };
    });

    // Identifica oportunidades de otimização
    const lowDensityKeywords = keywordDensities.filter(kw => kw.density < 0.5);
    
    if (lowDensityKeywords.length > 0) {
      const optimization: OptimizationAction = {
        id: `density-${Date.now()}`,
        action: `Aumentar densidade das palavras-chave: ${lowDensityKeywords.map(kw => kw.keyword).join(', ')}`,
        impact: 'medium',
        implemented: false,
        timestamp: new Date()
      };
      
      setOptimizations(prev => [optimization, ...prev.slice(0, 9)]);
    }
  };

  const checkKeywordOpportunities = () => {
    if (!metrics) return;

    // Identifica palavras-chave com potencial de melhoria
    const improvableKeywords = metrics.keywordRanking.filter(kw => 
      kw.position > 10 && kw.position < 30
    );

    if (improvableKeywords.length > 0) {
      improvableKeywords.forEach(kw => {
        const optimization: OptimizationAction = {
          id: `keyword-${kw.keyword}-${Date.now()}`,
          action: `Otimizar conteúdo para "${kw.keyword}" (posição ${kw.position})`,
          impact: 'high',
          implemented: false,
          timestamp: new Date()
        };
        
        setOptimizations(prev => [optimization, ...prev.slice(0, 9)]);
      });
    }
  };

  const implementAutoOptimizations = () => {
    // Implementa otimizações automáticas baseadas na análise
    const pendingOptimizations = optimizations.filter(opt => !opt.implemented);
    
    pendingOptimizations.slice(0, 2).forEach(opt => {
      if (opt.action.includes('densidade')) {
        // Adiciona dinamicamente conteúdo otimizado (ex: em rodapé)
        addDynamicSEOContent();
      } else if (opt.action.includes('otimizar conteúdo')) {
        // Otimiza meta tags dinamicamente
        optimizeMetaTags();
      }
      
      // Marca como implementado
      setOptimizations(prev => 
        prev.map(o => o.id === opt.id ? { ...o, implemented: true } : o)
      );
    });
  };

  const addDynamicSEOContent = () => {
    // Adiciona conteúdo SEO dinâmico ao final da página (invisível)
    let seoContent = document.getElementById('dynamic-seo-content');
    
    if (!seoContent) {
      seoContent = document.createElement('div');
      seoContent.id = 'dynamic-seo-content';
      seoContent.className = 'sr-only'; // Screen reader only
      document.body.appendChild(seoContent);
    }

    const optimizedContent = `
      Detetive particular em Brasília especializado em investigação de infidelidade, pessoas desaparecidas, 
      investigação empresarial e matrimonial. Atendemos Taguatinga, Ceilândia, Águas Claras, Samambaia, 
      Sobradinho, Planaltina, Gama e toda a região metropolitana do Distrito Federal. 
      Investigador privado com mais de 14 anos de experiência, formação técnica e métodos discretos. 
      Consulta gratuita e atendimento 24 horas para casos urgentes. Coletamos evidências legais para 
      processos judiciais com total sigilo profissional.
    `;
    
    seoContent.textContent = optimizedContent;
  };

  const optimizeMetaTags = () => {
    // Otimiza títulos de seção dinamicamente
    const headings = document.querySelectorAll('h2, h3, h4');
    
    headings.forEach((heading, index) => {
      if (!heading.textContent?.includes('Brasília') && index < 3) {
        const originalText = heading.textContent || '';
        const optimizedText = originalText + ' em Brasília';
        heading.textContent = optimizedText;
      }
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
      default: return <Target className="w-3 h-3 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      default: return 'text-blue-600';
    }
  };

  if (!isLoaded || process.env.NODE_ENV !== 'development') {
    return null; // Mostra apenas em desenvolvimento
  }

  return (
    <div className="fixed bottom-4 left-96 z-50 max-w-sm">
      <Card className="p-4 bg-white/95 backdrop-blur-sm border shadow-xl">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2 pb-2 border-b">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-semibold text-sm">SEO Monitor Ativo</span>
            {metrics && (
              <Badge variant="outline" className="text-xs">
                Pos. Média: {metrics.avgPosition.toFixed(1)}
              </Badge>
            )}
          </div>

          {/* Métricas Rápidas */}
          {metrics && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-gray-600">Cliques</div>
                <div className="font-semibold">{metrics.organicClicks}</div>
              </div>
              <div>
                <div className="text-gray-600">CTR</div>
                <div className="font-semibold">{metrics.ctr}%</div>
              </div>
            </div>
          )}

          {/* Top Keywords */}
          {metrics && (
            <div>
              <div className="text-xs font-medium mb-1">Palavras-chave</div>
              <div className="space-y-1">
                {metrics.keywordRanking.slice(0, 3).map((kw, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="truncate mr-2">{kw.keyword}</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono">#{kw.position}</span>
                      {getTrendIcon(kw.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Otimizações Recentes */}
          <div>
            <div className="text-xs font-medium mb-1">Otimizações Auto</div>
            <div className="space-y-1">
              {optimizations.slice(0, 2).map((opt, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  {opt.implemented ? (
                    <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Clock className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={`${getImpactColor(opt.impact)} leading-tight`}>
                    {opt.action.length > 40 ? opt.action.substring(0, 40) + '...' : opt.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Status</span>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-green-500 rounded-full" />
                <span className="text-green-600 font-medium">
                  {isMonitoring ? 'Monitorando' : 'Pausado'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { useSEOAI } from '../hooks/useSEOAI';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Search, 
  TrendingUp, 
  MapPin, 
  Target, 
  Zap, 
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SEOOptimizerProps {
  autoOptimize?: boolean;
  showDebugInfo?: boolean;
}

export const SEOOptimizer: React.FC<SEOOptimizerProps> = ({ 
  autoOptimize = true, 
  showDebugInfo = false 
}) => {
  const {
    isLoaded,
    analysis,
    isAnalyzing,
    analyzePageSEO,
    applyAutomaticOptimizations,
    PRIMARY_KEYWORDS,
    LOCATION_KEYWORDS
  } = useSEOAI();

  const [showOptimizer, setShowOptimizer] = useState(false);
  const [optimizationsApplied, setOptimizationsApplied] = useState(false);
  const { toast } = useToast();

  // Análise automática na inicialização
  useEffect(() => {
    if (isLoaded && !analysis) {
      const timer = setTimeout(() => {
        analyzePageSEO();
      }, 3000); // Analisa após 3 segundos

      return () => clearTimeout(timer);
    }
  }, [isLoaded, analysis, analyzePageSEO]);

  // Aplica otimizações automáticas
  useEffect(() => {
    if (autoOptimize && analysis && analysis.score < 70 && !optimizationsApplied) {
      const timer = setTimeout(async () => {
        await applyAutomaticOptimizations();
        setOptimizationsApplied(true);
        
        toast({
          title: "SEO Otimizado! 🚀",
          description: `Score melhorado para ${analysis.score}%. Site agora mais visível no Google.`,
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [analysis, autoOptimize, optimizationsApplied, applyAutomaticOptimizations, toast]);

  // Mostra indicador se score for baixo
  useEffect(() => {
    if (analysis && analysis.score < 60) {
      setShowOptimizer(true);
    }
  }, [analysis]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  const handleOptimizeNow = async () => {
    try {
      await applyAutomaticOptimizations();
      setOptimizationsApplied(true);
      
      // Re-analisa após otimizar
      setTimeout(() => {
        analyzePageSEO();
      }, 1000);

      toast({
        title: "Otimizações Aplicadas! ✅",
        description: "Site otimizado automaticamente para melhor ranking no Google.",
      });
    } catch (error) {
      toast({
        title: "Erro na Otimização",
        description: "Não foi possível aplicar todas as otimizações.",
        variant: "destructive",
      });
    }
  };

  if (!isLoaded) {
    return null; // IA ainda carregando
  }

  return (
    <div className="seo-optimizer">
      {/* Indicador Flutuante de SEO */}
      {analysis && (
        <div className="fixed bottom-20 left-4 z-40">
          <Card className="p-3 bg-white/95 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-5 h-5 text-blue-600" />
                <TrendingUp className="w-3 h-3 absolute -top-1 -right-1 text-green-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">SEO Score</span>
                  <Badge variant={getScoreVariant(analysis.score)}>
                    {analysis.score}%
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Google Ranking AI
                </div>
              </div>
              {analysis.score < 70 && !optimizationsApplied && (
                <Button 
                  size="sm" 
                  onClick={handleOptimizeNow}
                  className="bg-blue-600 hover:bg-blue-700 text-white animate-pulse-glow"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Otimizar
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Dashboard de SEO Detalhado */}
      {(showDebugInfo || showOptimizer) && analysis && (
        <Card className="fixed top-4 right-4 z-50 w-96 max-h-96 overflow-y-auto bg-white border shadow-2xl">
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-lg">SEO AI Dashboard</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowOptimizer(false)}
              >
                ×
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Score Geral */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Score Geral</span>
                <span className={`font-bold ${getScoreColor(analysis.score)}`}>
                  {analysis.score}%
                </span>
              </div>
              <Progress value={analysis.score} className="h-2" />
            </div>

            {/* Top Keywords */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Target className="w-4 h-4" />
                Palavras-chave Principais
              </h4>
              <div className="space-y-1">
                {analysis.keywords.slice(0, 5).map((kw, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="truncate">{kw.word}</span>
                    <Badge variant="outline" className="text-xs">
                      {kw.density.toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Sugestões de Melhoria */}
            <div>
              <h4 className="text-sm font-medium mb-2">Melhorias Sugeridas</h4>
              <div className="space-y-2">
                {analysis.suggestions.slice(0, 3).map((suggestion, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <AlertCircle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Local */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                SEO Local
              </h4>
              <div className="text-xs space-y-1">
                <div>Localização: <strong>{analysis.localSEO.location}</strong></div>
                <div>Negócio: <strong>{analysis.localSEO.businessType}</strong></div>
                {analysis.localSEO.suggestions.length > 0 && (
                  <div className="text-orange-600 mt-1">
                    • {analysis.localSEO.suggestions[0]}
                  </div>
                )}
              </div>
            </div>

            {/* Ações */}
            <div className="pt-2 border-t">
              {analysis.score < 80 ? (
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleOptimizeNow}
                  disabled={optimizationsApplied}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {optimizationsApplied ? 'Otimizado!' : 'Otimizar Automaticamente'}
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Site Bem Otimizado!</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Notificações de Melhoria */}
      {analysis && analysis.score > 80 && !showDebugInfo && (
        <div className="fixed top-4 right-4 z-40">
          <Card className="p-3 bg-green-50 border-green-200 animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-sm font-medium text-green-800">
                  Excelente SEO! 🚀
                </div>
                <div className="text-xs text-green-600">
                  Site otimizado para o Google
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
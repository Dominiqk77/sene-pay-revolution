
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Shield, 
  Target, 
  Brain,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle,
  Award,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ValueAddedWidgetsProps {
  merchantId?: string;
}

const ValueAddedWidgets: React.FC<ValueAddedWidgetsProps> = ({ merchantId }) => {
  const [liveMetrics, setLiveMetrics] = useState({
    activeUsers: 0,
    transactionsPerMinute: 0,
    systemHealth: 99.8,
    fraudAlerts: 0
  });

  // Simulation des métriques en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeUsers: Math.floor(Math.random() * 50) + 120,
        transactionsPerMinute: Math.floor(Math.random() * 15) + 5,
        systemHealth: 99.5 + Math.random() * 0.5,
        fraudAlerts: Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Données de comparaison marché (mockées)
  const marketComparison = {
    averageSuccessRate: 92.3,
    yourSuccessRate: 96.8,
    averageResponseTime: 2.1,
    yourResponseTime: 0.85,
    marketPosition: 'Top 5%'
  };

  // Insights IA
  const aiInsights = [
    {
      type: 'opportunity',
      title: 'Optimisation Orange Money',
      description: 'Augmentez Orange Money de 15% pour +23% de revenus',
      confidence: 94,
      priority: 'high'
    },
    {
      type: 'prediction',
      title: 'Pic de trafic prévu',
      description: 'Volume +40% attendu vendredi entre 14h-17h',
      confidence: 87,
      priority: 'medium'
    },
    {
      type: 'alert',
      title: 'Anomalie détectée',
      description: 'Légère baisse Wave (-8%) depuis hier',
      confidence: 91,
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Métriques temps réel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Utilisateurs actifs</p>
                <p className="text-2xl font-bold text-green-600">{liveMetrics.activeUsers}</p>
              </div>
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <Globe className="h-8 w-8 text-green-500 opacity-20 absolute -top-2 -left-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Trans./minute</p>
                <p className="text-2xl font-bold text-blue-600">{liveMetrics.transactionsPerMinute}</p>
              </div>
              <div className="relative">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <Zap className="h-8 w-8 text-blue-500 opacity-20 absolute -top-2 -left-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Santé système</p>
                <p className="text-2xl font-bold text-purple-600">{liveMetrics.systemHealth.toFixed(1)}%</p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alertes fraude</p>
                <p className="text-2xl font-bold text-red-600">{liveMetrics.fraudAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparaison marché */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-senepay-orange" />
            Performance vs Marché
            <Badge className="bg-green-100 text-green-700">
              {marketComparison.marketPosition}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Taux de succès</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-bold text-green-600">
                    +{(marketComparison.yourSuccessRate - marketComparison.averageSuccessRate).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Vous: {marketComparison.yourSuccessRate}%</span>
                  <span>Marché: {marketComparison.averageSuccessRate}%</span>
                </div>
                <Progress value={marketComparison.yourSuccessRate} className="h-2" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Temps de réponse</span>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-bold text-green-600">
                    -{((marketComparison.averageResponseTime - marketComparison.yourResponseTime) / marketComparison.averageResponseTime * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Vous: {marketComparison.yourResponseTime}s</span>
                  <span>Marché: {marketComparison.averageResponseTime}s</span>
                </div>
                <Progress value={(marketComparison.averageResponseTime - marketComparison.yourResponseTime) / marketComparison.averageResponseTime * 100} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights IA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-senepay-orange" />
            Intelligence Artificielle
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              IA Premium
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => {
              const IconComponent = insight.type === 'opportunity' ? Lightbulb : 
                                  insight.type === 'prediction' ? Clock : 
                                  AlertTriangle;
              
              const priorityColor = insight.priority === 'high' ? 'bg-red-100 text-red-700 border-red-200' :
                                  insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                  'bg-blue-100 text-blue-700 border-blue-200';

              return (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 rounded-full bg-senepay-orange/10">
                    <IconComponent className="h-4 w-4 text-senepay-orange" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <Badge className={`text-xs ${priorityColor} border`}>
                        {insight.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {insight.confidence}% confiance
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                  <CheckCircle className="h-4 w-4 text-gray-400 cursor-pointer hover:text-green-500 transition-colors" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Widget de performance globale */}
      <Card className="bg-gradient-to-r from-senepay-orange/5 to-senepay-gold/5 border-senepay-orange/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-senepay-orange" />
            Score de Performance Global
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-6xl font-bold text-senepay-orange mb-2">96</div>
            <div className="text-lg font-medium text-gray-700 mb-4">Excellent</div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-green-600">98%</div>
                <div className="text-gray-600">Fiabilité</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600">95%</div>
                <div className="text-gray-600">Vitesse</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-600">94%</div>
                <div className="text-gray-600">Sécurité</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-orange-600">97%</div>
                <div className="text-gray-600">UX</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueAddedWidgets;

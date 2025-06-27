
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap, Target, Globe, Clock, Award, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface ValueAddedWidgetsProps {
  merchantId?: string;
}

const ValueAddedWidgets = ({ merchantId }: ValueAddedWidgetsProps) => {
  const [liveStats, setLiveStats] = useState({
    activeUsers: 12,
    transactionsPerMinute: 3.7,
    conversionRate: 94.8,
    averageResponseTime: 145
  });

  // Simulation de données en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1,
        transactionsPerMinute: Math.max(0, prev.transactionsPerMinute + (Math.random() - 0.5) * 0.5),
        conversionRate: Math.max(85, Math.min(99, prev.conversionRate + (Math.random() - 0.5) * 2)),
        averageResponseTime: Math.max(100, prev.averageResponseTime + Math.floor(Math.random() * 20) - 10)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const performanceMetrics = [
    { label: "Taux de succès", value: "98.7%", trend: "up", color: "text-green-600" },
    { label: "Temps de réponse", value: `${liveStats.averageResponseTime}ms`, trend: "down", color: "text-green-600" },
    { label: "Disponibilité", value: "99.94%", trend: "stable", color: "text-blue-600" },
    { label: "Sécurité", value: "100%", trend: "stable", color: "text-green-600" }
  ];

  const businessInsights = [
    {
      title: "Pic d'activité détecté",
      description: "25% d'augmentation des transactions dans la dernière heure",
      type: "opportunity",
      impact: "high"
    },
    {
      title: "Nouveau record mensuel",
      description: "Vous avez dépassé votre meilleur mois de 15%",
      type: "achievement",
      impact: "high"
    },
    {
      title: "Optimisation suggérée",
      description: "Orange Money performe 12% mieux que les autres méthodes",
      type: "suggestion",
      impact: "medium"
    }
  ];

  const marketComparison = {
    yourPerformance: 94.8,
    marketAverage: 87.2,
    topPerformers: 96.1
  };

  return (
    <div className="space-y-6">
      {/* Métriques en temps réel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-5 w-5 text-green-600" />
              <Badge className="bg-green-100 text-green-800 text-xs">LIVE</Badge>
            </div>
            <div className="text-2xl font-bold text-green-800">{liveStats.activeUsers}</div>
            <div className="text-sm text-green-600">Utilisateurs actifs</div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-1"></div>
                <span className="text-xs text-blue-600">TEMPS RÉEL</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-800">{liveStats.transactionsPerMinute.toFixed(1)}</div>
            <div className="text-sm text-blue-600">Trans./minute</div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-purple-600" />
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-purple-800">{liveStats.conversionRate.toFixed(1)}%</div>
            <div className="text-sm text-purple-600">Taux conversion</div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Globe className="h-5 w-5 text-orange-600" />
              <Badge className="bg-orange-100 text-orange-800 text-xs">GLOBAL</Badge>
            </div>
            <div className="text-2xl font-bold text-orange-800">8</div>
            <div className="text-sm text-orange-600">Pays actifs</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance par rapport au marché */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-senepay-orange" />
            Performance vs Marché 
            <Badge className="bg-green-100 text-green-800">TOP 10%</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Votre performance</span>
                <span className="font-semibold text-senepay-orange">{marketComparison.yourPerformance}%</span>
              </div>
              <Progress value={marketComparison.yourPerformance} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Moyenne du marché</span>
                <span className="font-semibold text-gray-600">{marketComparison.marketAverage}%</span>
              </div>
              <Progress value={marketComparison.marketAverage} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Top performers</span>
                <span className="font-semibold text-green-600">{marketComparison.topPerformers}%</span>
              </div>
              <Progress value={marketComparison.topPerformers} className="h-2" />
            </div>
            <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
              🎉 Félicitations ! Vous performez {(marketComparison.yourPerformance - marketComparison.marketAverage).toFixed(1)} points au-dessus de la moyenne du marché.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-senepay-orange" />
            Insights Intelligence
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">IA</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {businessInsights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                insight.type === 'opportunity' ? 'border-green-500 bg-green-50' :
                insight.type === 'achievement' ? 'border-blue-500 bg-blue-50' :
                'border-orange-500 bg-orange-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                  <Badge variant={insight.impact === 'high' ? 'default' : 'secondary'} className="ml-2">
                    {insight.impact === 'high' ? 'FORT' : 'MOYEN'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métriques de performance détaillées */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-senepay-orange" />
            Métriques de Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                <div className="flex items-center justify-center">
                  {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                  {metric.trend === 'stable' && <div className="w-4 h-1 bg-gray-400 rounded"></div>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueAddedWidgets;

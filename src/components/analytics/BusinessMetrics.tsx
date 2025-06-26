
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock,
  Zap,
  Target,
  ArrowUpRight
} from 'lucide-react';

interface BusinessMetricsProps {
  metrics: {
    mrr: number;
    arr: number;
    churnRate: number;
    customerLtv: number;
    averageOrderValue: number;
    conversionRate: number;
    responseTime: number;
    uptime: number;
    mrrGrowth: number;
    customerGrowth: number;
  };
}

const BusinessMetrics = ({ metrics }: BusinessMetricsProps) => {
  const metricCards = [
    {
      title: 'MRR (Monthly Recurring Revenue)',
      value: `${metrics.mrr.toLocaleString()} FCFA`,
      change: metrics.mrrGrowth,
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-green-600',
      description: 'Revenus récurrents mensuels'
    },
    {
      title: 'ARR (Annual Recurring Revenue)',
      value: `${metrics.arr.toLocaleString()} FCFA`,
      change: metrics.mrrGrowth * 0.8,
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-blue-600',
      description: 'Revenus récurrents annuels'
    },
    {
      title: 'Customer LTV',
      value: `${metrics.customerLtv.toLocaleString()} FCFA`,
      change: 12.5,
      icon: <Users className="h-5 w-5" />,
      color: 'text-purple-600',
      description: 'Valeur vie client moyenne'
    },
    {
      title: 'Taux de Conversion',
      value: `${metrics.conversionRate.toFixed(1)}%`,
      change: 5.2,
      icon: <Target className="h-5 w-5" />,
      color: 'text-orange-600',
      description: 'Transactions réussies / totales'
    },
    {
      title: 'Panier Moyen',
      value: `${metrics.averageOrderValue.toLocaleString()} FCFA`,
      change: -2.1,
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-green-600',
      description: 'Montant moyen par transaction'
    },
    {
      title: 'Temps de Réponse API',
      value: `${Math.round(metrics.responseTime)}ms`,
      change: -8.5,
      trend: 'down',
      icon: <Zap className="h-5 w-5" />,
      color: 'text-blue-600',
      description: 'Performance système moyenne'
    },
    {
      title: 'Uptime',
      value: `${metrics.uptime.toFixed(2)}%`,
      change: 0.1,
      icon: <Clock className="h-5 w-5" />,
      color: 'text-green-600',
      description: 'Disponibilité du service'
    },
    {
      title: 'Churn Rate',
      value: `${metrics.churnRate.toFixed(1)}%`,
      change: -1.2,
      trend: 'down',
      icon: <TrendingDown className="h-5 w-5" />,
      color: 'text-red-600',
      description: 'Taux de désabonnement mensuel'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Métriques Business</h3>
          <p className="text-sm text-gray-600">Indicateurs clés de performance de votre business</p>
        </div>
        <Badge className="bg-gradient-to-r from-senepay-orange to-senepay-gold text-white">
          Niveau Premium
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-gray-100 ${metric.color}`}>
                  {metric.icon}
                </div>
                <div className="flex items-center space-x-1">
                  {metric.change > 0 || metric.trend === 'down' ? (
                    <ArrowUpRight className={`h-4 w-4 ${
                      metric.trend === 'down' ? 'text-green-600 rotate-180' : 
                      metric.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`} />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.change > 0 || metric.trend === 'down' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{Math.abs(metric.change).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold mb-1">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessMetrics;

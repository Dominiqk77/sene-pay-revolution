
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

interface EnhancedStatsProps {
  stats?: {
    totalRevenue: number;
    totalTransactions: number;
    successRate: number;
    averageOrderValue: number;
    todayRevenue: number;
    todayTransactions: number;
    activeCustomers: number;
    responseTime: number;
  };
}

const EnhancedStats = ({ stats }: EnhancedStatsProps) => {
  // Données mock si pas de stats fournies
  const defaultStats = {
    totalRevenue: 2450000,
    totalTransactions: 1247,
    successRate: 96.8,
    averageOrderValue: 18500,
    todayRevenue: 125000,
    todayTransactions: 23,
    activeCustomers: 89,
    responseTime: 145
  };

  const currentStats = stats || defaultStats;

  const statItems: StatItem[] = [
    {
      title: 'Revenus Totaux',
      value: `${currentStats.totalRevenue.toLocaleString()} FCFA`,
      change: 15.3,
      trend: 'up',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-green-600',
      subtitle: 'Ce mois'
    },
    {
      title: 'Transactions',
      value: currentStats.totalTransactions.toString(),
      change: 8.7,
      trend: 'up',
      icon: <Activity className="h-5 w-5" />,
      color: 'text-blue-600',
      subtitle: 'Total'
    },
    {
      title: 'Taux de Succès',
      value: `${currentStats.successRate}%`,
      change: 2.1,
      trend: 'up',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'text-green-600',
      subtitle: 'Performance'
    },
    {
      title: 'Panier Moyen',
      value: `${currentStats.averageOrderValue.toLocaleString()} FCFA`,
      change: -3.2,
      trend: 'down',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-orange-600',
      subtitle: 'Par transaction'
    },
    {
      title: 'Revenus Aujourd\'hui',
      value: `${currentStats.todayRevenue.toLocaleString()} FCFA`,
      change: 22.4,
      trend: 'up',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-green-600',
      subtitle: `${currentStats.todayTransactions} transactions`
    },
    {
      title: 'Clients Actifs',
      value: currentStats.activeCustomers.toString(),
      change: 12.8,
      trend: 'up',
      icon: <Users className="h-5 w-5" />,
      color: 'text-purple-600',
      subtitle: 'Ce mois'
    },
    {
      title: 'Temps de Réponse',
      value: `${currentStats.responseTime}ms`,
      change: -8.5,
      trend: 'up',
      icon: <Clock className="h-5 w-5" />,
      color: 'text-blue-600',
      subtitle: 'API moyenne'
    },
    {
      title: 'Disponibilité',
      value: '99.9%',
      change: 0.1,
      trend: 'stable',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'text-green-600',
      subtitle: 'Uptime'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  {stat.subtitle && (
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : stat.trend === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </span>
                </div>
                <Badge 
                  variant={stat.trend === 'up' ? 'default' : stat.trend === 'down' ? 'destructive' : 'secondary'}
                  className="text-xs mt-1"
                >
                  {stat.trend === 'up' ? 'Hausse' : stat.trend === 'down' ? 'Baisse' : 'Stable'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EnhancedStats;

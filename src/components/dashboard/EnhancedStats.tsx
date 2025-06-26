
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
  bgColor: string;
  cardBg: string;
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
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      cardBg: 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200',
      subtitle: 'Ce mois'
    },
    {
      title: 'Transactions',
      value: currentStats.totalTransactions.toString(),
      change: 8.7,
      trend: 'up',
      icon: <Activity className="h-5 w-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      cardBg: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200',
      subtitle: 'Total'
    },
    {
      title: 'Taux de Succès',
      value: `${currentStats.successRate}%`,
      change: 2.1,
      trend: 'up',
      icon: <CheckCircle className="h-5 w-5" />,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-500 to-emerald-600',
      cardBg: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
      subtitle: 'Performance'
    },
    {
      title: 'Panier Moyen',
      value: `${currentStats.averageOrderValue.toLocaleString()} FCFA`,
      change: -3.2,
      trend: 'down',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-500 to-red-500',
      cardBg: 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200',
      subtitle: 'Par transaction'
    },
    {
      title: 'Revenus Aujourd\'hui',
      value: `${currentStats.todayRevenue.toLocaleString()} FCFA`,
      change: 22.4,
      trend: 'up',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'text-senepay-orange',
      bgColor: 'bg-gradient-to-br from-senepay-orange to-senepay-gold',
      cardBg: 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-300',
      subtitle: `${currentStats.todayTransactions} transactions`
    },
    {
      title: 'Clients Actifs',
      value: currentStats.activeCustomers.toString(),
      change: 12.8,
      trend: 'up',
      icon: <Users className="h-5 w-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-500 to-pink-600',
      cardBg: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200',
      subtitle: 'Ce mois'
    },
    {
      title: 'Temps de Réponse',
      value: `${currentStats.responseTime}ms`,
      change: -8.5,
      trend: 'up',
      icon: <Clock className="h-5 w-5" />,
      color: 'text-cyan-600',
      bgColor: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      cardBg: 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200',
      subtitle: 'API moyenne'
    },
    {
      title: 'Disponibilité',
      value: '99.9%',
      change: 0.1,
      trend: 'stable',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'text-teal-600',
      bgColor: 'bg-gradient-to-br from-teal-500 to-green-600',
      cardBg: 'bg-gradient-to-br from-teal-50 to-green-50 border-teal-200',
      subtitle: 'Uptime'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statItems.map((stat, index) => (
        <Card key={index} className={`hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 ${stat.cardBg}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl shadow-lg ${stat.bgColor} text-white`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  {stat.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : stat.trend === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : (
                    <div className="h-4 w-4" />
                  )}
                  <span className={`text-sm font-bold ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </span>
                </div>
                <Badge 
                  variant={stat.trend === 'up' ? 'default' : stat.trend === 'down' ? 'destructive' : 'secondary'}
                  className={`text-xs font-semibold ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                    stat.trend === 'down' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                    'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {stat.trend === 'up' ? '📈 Hausse' : stat.trend === 'down' ? '📉 Baisse' : '➖ Stable'}
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


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap,
  DollarSign,
  Clock,
  Globe,
  Award
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
  const formatCurrency = (value: number) => `${value.toLocaleString()} FCFA`;
  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* MRR */}
      <Card className="border-l-4 border-l-senepay-orange">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">MRR</p>
              <p className="text-xl font-bold">{formatCurrency(metrics.mrr)}</p>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">+{formatPercentage(metrics.mrrGrowth)}</span>
              </div>
            </div>
            <div className="p-2 bg-senepay-orange/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-senepay-orange" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ARR */}
      <Card className="border-l-4 border-l-senepay-gold">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ARR</p>
              <p className="text-xl font-bold">{formatCurrency(metrics.arr)}</p>
              <Badge variant="outline" className="text-xs mt-1">
                x12 MRR
              </Badge>
            </div>
            <div className="p-2 bg-senepay-gold/10 rounded-lg">
              <Target className="h-6 w-6 text-senepay-gold" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer LTV */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customer LTV</p>
              <p className="text-xl font-bold">{formatCurrency(metrics.customerLtv)}</p>
              <div className="flex items-center text-sm">
                <Users className="h-3 w-3 text-blue-600 mr-1" />
                <span className="text-blue-600">+{formatPercentage(metrics.customerGrowth)}</span>
              </div>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Churn Rate */}
      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Churn Rate</p>
              <p className="text-xl font-bold">{formatPercentage(metrics.churnRate)}</p>
              <Badge variant={metrics.churnRate < 5 ? "default" : "destructive"} className="text-xs mt-1">
                {metrics.churnRate < 5 ? "Excellent" : "À surveiller"}
              </Badge>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-red-600 rotate-180" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AOV */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Panier Moyen</p>
              <p className="text-xl font-bold">{formatCurrency(metrics.averageOrderValue)}</p>
              <p className="text-xs text-gray-500 mt-1">Par transaction</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Rate */}
      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux Conversion</p>
              <p className="text-xl font-bold">{formatPercentage(metrics.conversionRate)}</p>
              <Badge variant="outline" className="text-xs mt-1">
                Industrie: 2.3%
              </Badge>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Time */}
      <Card className="border-l-4 border-l-orange-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Temps Réponse</p>
              <p className="text-xl font-bold">{metrics.responseTime}ms</p>
              <Badge variant="default" className="text-xs mt-1">
                <Zap className="h-3 w-3 mr-1" />
                Rapide
              </Badge>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uptime */}
      <Card className="border-l-4 border-l-emerald-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Disponibilité</p>
              <p className="text-xl font-bold">{formatPercentage(metrics.uptime)}</p>
              <Badge variant="default" className="text-xs mt-1 bg-green-100 text-green-800">
                SLA 99.9%
              </Badge>
            </div>
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Globe className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessMetrics;


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign } from 'lucide-react';

interface RevenueData {
  date: string;
  revenue: number;
  transactions: number;
}

interface RevenueChartProps {
  data: RevenueData[];
  period: '7d' | '30d' | '90d';
  totalRevenue: number;
  growth: number;
}

const RevenueChart = ({ data, period, totalRevenue, growth }: RevenueChartProps) => {
  const periodLabels = {
    '7d': '7 derniers jours',
    '30d': '30 derniers jours', 
    '90d': '90 derniers jours'
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-senepay-orange" />
              Revenus - {periodLabels[period]}
            </CardTitle>
            <CardDescription>
              Évolution des revenus et transactions
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {totalRevenue.toLocaleString()} FCFA
            </div>
            <div className={`flex items-center text-sm ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis 
                yAxisId="left"
                tick={{ fontSize: 12 }}
                stroke="#666"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string) => [
                  name === 'revenue' 
                    ? `${value.toLocaleString()} FCFA`
                    : `${value} transactions`,
                  name === 'revenue' ? 'Revenus' : 'Transactions'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#ff6b35" 
                strokeWidth={3}
                dot={{ fill: '#ff6b35', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ff6b35', strokeWidth: 2 }}
                yAxisId="left"
              />
              <Line 
                type="monotone" 
                dataKey="transactions" 
                stroke="#ffd700" 
                strokeWidth={2}
                dot={{ fill: '#ffd700', strokeWidth: 2, r: 3 }}
                yAxisId="right"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;

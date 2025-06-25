
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface SuccessRateData {
  method: string;
  successRate: number;
  totalTransactions: number;
  successfulTransactions: number;
}

interface SuccessRateChartProps {
  data: SuccessRateData[];
}

const SuccessRateChart = ({ data }: SuccessRateChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Taux de succès par méthode
        </CardTitle>
        <CardDescription>
          Performance des différentes méthodes de paiement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                stroke="#666"
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                type="category"
                dataKey="method" 
                tick={{ fontSize: 12 }}
                stroke="#666"
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value}% (${props.payload.successfulTransactions}/${props.payload.totalTransactions})`,
                  'Taux de succès'
                ]}
              />
              <Bar 
                dataKey="successRate" 
                fill={(entry: any) => {
                  if (entry >= 90) return '#10b981'; // Green
                  if (entry >= 75) return '#f59e0b'; // Yellow
                  return '#ef4444'; // Red
                }}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessRateChart;

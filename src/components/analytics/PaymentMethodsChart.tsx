import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
interface PaymentMethodData {
  name: string;
  value: number;
  count: number;
  color: string;
}
interface PaymentMethodsChartProps {
  data: PaymentMethodData[];
}
const PaymentMethodsChart = ({
  data
}: PaymentMethodsChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-senepay-gold" />
          Répartition par méthode
        </CardTitle>
        <CardDescription>
          Volume des transactions par méthode de paiement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }} formatter={(value: number, name: string, props: any) => [`${value.toLocaleString()} FCFA (${props.payload.count} transactions)`, name]} />
              <Legend verticalAlign="bottom" height={36} formatter={(value, entry: any) => <span style={{
              color: entry.color
            }} className="font-medium text-xs">
                    {value} 
                    <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                      {(entry.payload.value / total * 100).toFixed(1)}%
                    </span>
                  </span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>;
};
export default PaymentMethodsChart;
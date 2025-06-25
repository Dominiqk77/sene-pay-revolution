
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  AlertCircle,
  Lightbulb,
  Zap
} from 'lucide-react';

interface Prediction {
  type: 'revenue' | 'growth' | 'risk' | 'opportunity';
  title: string;
  value: string;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
  recommendation?: string;
}

interface AIPredictionsProps {
  predictions: Prediction[];
}

const AIPredictions = ({ predictions }: AIPredictionsProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'revenue': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'growth': return <Target className="h-5 w-5 text-blue-600" />;
      case 'risk': return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'opportunity': return <Lightbulb className="h-5 w-5 text-yellow-600" />;
      default: return <Brain className="h-5 w-5 text-purple-600" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'revenue': return 'default';
      case 'growth': return 'secondary';
      case 'risk': return 'destructive';
      case 'opportunity': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Prédictions IA & Recommandations
        </CardTitle>
        <CardDescription>
          Intelligence artificielle pour optimiser vos performances
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getIcon(prediction.type)}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{prediction.title}</h4>
                      <Badge variant={getBadgeVariant(prediction.type)}>
                        {prediction.type}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {prediction.value}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                    {prediction.confidence}% confiance
                  </div>
                  <Progress 
                    value={prediction.confidence} 
                    className="w-20 h-2 mt-1"
                  />
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                {prediction.description}
              </p>

              {prediction.recommendation && (
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Recommandation IA
                    </p>
                    <p className="text-sm text-blue-800">
                      {prediction.recommendation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPredictions;

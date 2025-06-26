
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target,
  Lightbulb,
  ArrowRight
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
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'revenue': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'growth': return <Target className="h-5 w-5 text-blue-600" />;
      case 'risk': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'opportunity': return <Lightbulb className="h-5 w-5 text-orange-600" />;
      default: return <Brain className="h-5 w-5 text-purple-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'revenue': return 'bg-green-100 text-green-800';
      case 'growth': return 'bg-blue-100 text-blue-800';
      case 'risk': return 'bg-red-100 text-red-800';
      case 'opportunity': return 'bg-orange-100 text-orange-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          Prédictions IA & Recommandations
        </CardTitle>
        <CardDescription>
          Insights alimentés par intelligence artificielle pour optimiser vos performances
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getTypeIcon(prediction.type)}
                  <div>
                    <h4 className="font-semibold text-gray-900">{prediction.title}</h4>
                    <p className="text-2xl font-bold text-senepay-orange">{prediction.value}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(prediction.type)} variant="secondary">
                    {prediction.type === 'revenue' ? 'Revenus' :
                     prediction.type === 'growth' ? 'Croissance' :
                     prediction.type === 'risk' ? 'Risque' : 'Opportunité'}
                  </Badge>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {prediction.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : prediction.trend === 'down' ? (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                      {prediction.confidence}% confiance
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-3">{prediction.description}</p>

              {prediction.recommendation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-blue-800 font-medium mb-1">Recommandation IA</p>
                      <p className="text-sm text-blue-700">{prediction.recommendation}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                      Appliquer
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span className="font-semibold text-purple-800">IA SenePay Premium</span>
          </div>
          <p className="text-sm text-purple-700 mb-3">
            Nos algorithmes analysent vos données en temps réel pour vous fournir des insights 
            actionnables et des recommandations personnalisées.
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
            Voir toutes les prédictions
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPredictions;

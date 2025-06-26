
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, FileSpreadsheet, Calendar, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DataExportProps {
  merchantId?: string;
}

const DataExport = ({ merchantId }: DataExportProps) => {
  const [exportType, setExportType] = useState<'transactions' | 'analytics' | 'reconciliation'>('transactions');
  const [format, setFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'custom'>('month');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setLoading(true);
    
    try {
      // Simuler l'export
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fileName = `${exportType}_${period}_${new Date().toISOString().split('T')[0]}.${format}`;
      
      toast({
        title: "Export réussi",
        description: `Fichier ${fileName} téléchargé avec succès`,
      });
      
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getExportStats = () => {
    const stats = {
      transactions: { count: 1247, size: '2.3 MB' },
      analytics: { count: 89, size: '1.1 MB' },
      reconciliation: { count: 342, size: '0.8 MB' }
    };
    return stats[exportType];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export de Données
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Type de données</label>
            <Select value={exportType} onValueChange={(value: any) => setExportType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transactions">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Transactions
                  </div>
                </SelectItem>
                <SelectItem value="analytics">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    Analytics
                  </div>
                </SelectItem>
                <SelectItem value="reconciliation">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Réconciliation
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Format</label>
            <Select value={format} onValueChange={(value: any) => setFormat(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Période</label>
            <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="custom">Personnalisé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">
              {getExportStats().count} enregistrements • {getExportStats().size}
            </span>
          </div>
          <Badge variant="outline">
            {exportType === 'transactions' ? 'Transactions' :
             exportType === 'analytics' ? 'Analytics' : 'Réconciliation'}
          </Badge>
        </div>

        <Button 
          onClick={handleExport}
          disabled={loading}
          className="w-full bg-gradient-to-r from-senepay-orange to-senepay-gold"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Export en cours...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Exporter les données
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataExport;

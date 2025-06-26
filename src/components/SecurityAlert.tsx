
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, ShieldAlert, ShieldCheck, RefreshCw } from 'lucide-react';
import { useSecurityMonitoring } from '@/hooks/useSecurityMonitoring';
import { useUserRole } from '@/hooks/useUserRole';

const SecurityAlert = () => {
  const { metrics, isHighRisk, isMediumRisk, resetMetrics } = useSecurityMonitoring();
  const { isSuperAdmin } = useUserRole();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(isHighRisk || (isMediumRisk && isSuperAdmin));
  }, [isHighRisk, isMediumRisk, isSuperAdmin]);

  if (!showAlert) return null;

  const getRiskColor = (): "default" | "destructive" => {
    if (isHighRisk) return 'destructive';
    return 'default';
  };

  const getRiskIcon = () => {
    if (isHighRisk) return <ShieldAlert className="h-4 w-4" />;
    if (isMediumRisk) return <Shield className="h-4 w-4" />;
    return <ShieldCheck className="h-4 w-4" />;
  };

  const getRiskMessage = () => {
    if (isHighRisk) {
      return "Activité suspecte détectée. Veuillez vérifier votre compte immédiatement.";
    }
    if (isMediumRisk) {
      return "Activité inhabituelle détectée. Surveillance recommandée.";
    }
    return "Système sécurisé.";
  };

  return (
    <Alert variant={getRiskColor()} className="mb-4">
      {getRiskIcon()}
      <AlertTitle className="flex items-center gap-2">
        Alerte de Sécurité
        <Badge variant={isHighRisk ? 'destructive' : 'secondary'}>
          {isHighRisk ? 'CRITIQUE' : 'ATTENTION'}
        </Badge>
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-3">{getRiskMessage()}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex justify-between">
            <span>Tentatives échouées :</span>
            <span className="font-medium">{metrics.failedLoginAttempts}</span>
          </div>
          <div className="flex justify-between">
            <span>Activités suspectes :</span>
            <span className="font-medium">{metrics.suspiciousActivities}</span>
          </div>
          <div className="flex justify-between">
            <span>Dernier scan :</span>
            <span className="font-medium">
              {metrics.lastSecurityScan 
                ? metrics.lastSecurityScan.toLocaleTimeString() 
                : 'Jamais'
              }
            </span>
          </div>
        </div>

        {isSuperAdmin && (
          <div className="mt-4 flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={resetMetrics}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-3 w-3" />
              Réinitialiser
            </Button>
            <Button 
              size="sm" 
              onClick={() => window.location.href = '/super-admin'}
              className="flex items-center gap-2"
            >
              <Shield className="h-3 w-3" />
              Tableau de bord sécurité
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default SecurityAlert;

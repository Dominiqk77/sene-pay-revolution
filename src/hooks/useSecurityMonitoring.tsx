
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { logSecurityEvent, detectAnomalousActivity } from '@/utils/securityUtils';
import { supabase } from '@/integrations/supabase/client';

interface SecurityMetrics {
  failedLoginAttempts: number;
  suspiciousActivities: number;
  lastSecurityScan: Date | null;
  riskLevel: 'low' | 'medium' | 'high';
}

export const useSecurityMonitoring = () => {
  const { user } = useAuth();
  const { isSuperAdmin } = useUserRole();
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    failedLoginAttempts: 0,
    suspiciousActivities: 0,
    lastSecurityScan: null,
    riskLevel: 'low'
  });

  // Surveiller les tentatives de connexion échouées
  useEffect(() => {
    const monitorAuthFailures = () => {
      const originalError = console.error;
      console.error = (...args) => {
        const message = args.join(' ');
        if (message.includes('Invalid login credentials') || 
            message.includes('SignIn error')) {
          logSecurityEvent({
            action: 'FAILED_LOGIN_ATTEMPT',
            resourceType: 'authentication',
            metadata: {
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent
            }
          });
          
          setMetrics(prev => ({
            ...prev,
            failedLoginAttempts: prev.failedLoginAttempts + 1,
            riskLevel: prev.failedLoginAttempts > 5 ? 'high' : 'medium'
          }));
        }
        originalError.apply(console, args);
      };

      return () => {
        console.error = originalError;
      };
    };

    const cleanup = monitorAuthFailures();
    return cleanup;
  }, []);

  // Scanner périodique de sécurité pour les super admins
  useEffect(() => {
    if (!isSuperAdmin) return;

    const performSecurityScan = async () => {
      try {
        // Récupérer les transactions récentes
        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('*')
          .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Détecter les activités suspectes
        const anomaliesDetected = detectAnomalousActivity(transactions || []);
        
        if (anomaliesDetected) {
          setMetrics(prev => ({
            ...prev,
            suspiciousActivities: prev.suspiciousActivities + 1,
            riskLevel: 'high'
          }));
        }

        // Vérifier les logs d'audit récents
        const { data: auditLogs } = await supabase
          .from('audit_logs')
          .select('*')
          .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())
          .order('created_at', { ascending: false });

        // Analyser les patterns suspects dans les logs
        if (auditLogs && auditLogs.length > 0) {
          const suspiciousActions = auditLogs.filter(log => 
            log.action.includes('FAILED') || 
            log.action.includes('SUSPICIOUS') ||
            log.action.includes('ANOMALY')
          );

          if (suspiciousActions.length > 10) {
            logSecurityEvent({
              action: 'HIGH_SUSPICIOUS_ACTIVITY_DETECTED',
              resourceType: 'audit_logs',
              metadata: {
                suspiciousActionCount: suspiciousActions.length,
                timeframe: '1_hour'
              }
            });
          }
        }

        setMetrics(prev => ({
          ...prev,
          lastSecurityScan: new Date()
        }));

      } catch (error) {
        console.error('Security scan failed:', error);
      }
    };

    // Scanner toutes les 10 minutes pour les super admins
    const interval = setInterval(performSecurityScan, 10 * 60 * 1000);
    
    // Scanner immédiatement
    performSecurityScan();

    return () => clearInterval(interval);
  }, [isSuperAdmin]);

  // Logger l'activité utilisateur normale
  useEffect(() => {
    if (user) {
      logSecurityEvent({
        action: 'USER_SESSION_ACTIVE',
        resourceType: 'authentication',
        metadata: {
          userId: user.id,
          email: user.email,
          timestamp: new Date().toISOString()
        }
      });
    }
  }, [user]);

  return {
    metrics,
    isHighRisk: metrics.riskLevel === 'high',
    isMediumRisk: metrics.riskLevel === 'medium',
    resetMetrics: () => setMetrics({
      failedLoginAttempts: 0,
      suspiciousActivities: 0,
      lastSecurityScan: null,
      riskLevel: 'low'
    })
  };
};

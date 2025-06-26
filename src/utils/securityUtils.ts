
// Utilitaires de sécurité pour SenePay
import { supabase } from '@/integrations/supabase/client';

export interface SecurityEvent {
  action: string;
  resourceType?: string;
  resourceId?: string;
  metadata?: Record<string, any>;
}

// Fonction pour logger les événements de sécurité
export const logSecurityEvent = async (event: SecurityEvent) => {
  try {
    const { data, error } = await supabase.rpc('log_security_event', {
      p_action: event.action,
      p_resource_type: event.resourceType || null,
      p_resource_id: event.resourceId || null,
      p_ip_address: null, // Sera ajouté côté serveur si nécessaire
      p_user_agent: navigator.userAgent,
      p_metadata: event.metadata || {}
    });

    if (error) {
      console.error('Failed to log security event:', error);
    }
  } catch (error) {
    console.error('Error logging security event:', error);
  }
};

// Validation des entrées utilisateur
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove basic HTML tags
    .slice(0, 1000); // Limit length
};

// Validation des montants
export const validateAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 10000000 && Number.isFinite(amount);
};

// Validation des emails
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Validation des numéros de téléphone sénégalais
export const validateSenegalPhone = (phone: string): boolean => {
  const phoneRegex = /^\+221[0-9]{9}$/;
  return phoneRegex.test(phone);
};

// Détection d'anomalies dans les patterns d'utilisation
export const detectAnomalousActivity = (transactions: any[]): boolean => {
  if (!transactions || transactions.length === 0) return false;

  const now = new Date();
  const lastHour = new Date(now.getTime() - 60 * 60 * 1000);
  
  // Compter les transactions de la dernière heure
  const recentTransactions = transactions.filter(
    tx => new Date(tx.created_at) > lastHour
  );

  // Anomalie si plus de 50 transactions en 1 heure
  if (recentTransactions.length > 50) {
    logSecurityEvent({
      action: 'ANOMALY_DETECTED',
      resourceType: 'transaction_volume',
      metadata: {
        transactionCount: recentTransactions.length,
        timeframe: '1_hour'
      }
    });
    return true;
  }

  // Vérifier les montants suspects
  const suspiciousAmounts = recentTransactions.filter(
    tx => tx.amount > 5000000 // Plus de 5M FCFA
  );

  if (suspiciousAmounts.length > 0) {
    logSecurityEvent({
      action: 'SUSPICIOUS_AMOUNT_DETECTED',
      resourceType: 'transaction',
      metadata: {
        suspiciousTransactions: suspiciousAmounts.length,
        maxAmount: Math.max(...suspiciousAmounts.map(tx => tx.amount))
      }
    });
    return true;
  }

  return false;
};

// Rate limiting basique côté client
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Nettoyer les anciennes requêtes
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

// Génération de nonce pour CSP
export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

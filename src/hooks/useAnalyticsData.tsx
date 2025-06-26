
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  revenueData: Array<{
    date: string;
    revenue: number;
    transactions: number;
  }>;
  paymentMethodsData: Array<{
    name: string;
    value: number;
    count: number;
    color: string;
  }>;
  volumeData: Array<{
    time: string;
    volume: number;
    count: number;
  }>;
  successRateData: Array<{
    method: string;
    successRate: number;
    totalTransactions: number;
    successfulTransactions: number;
    color: string;
  }>;
  businessMetrics: {
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
  predictions: Array<{
    type: 'revenue' | 'growth' | 'risk' | 'opportunity';
    title: string;
    value: string;
    confidence: number;
    trend: 'up' | 'down' | 'stable';
    description: string;
    recommendation?: string;
  }>;
}

export const useAnalyticsData = (merchantId?: string) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (merchantId) {
      fetchAnalyticsData();
    }
  }, [merchantId]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      // Récupérer les transactions
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('merchant_id', merchantId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Calculer les métriques
      const analyticsData = calculateAnalytics(transactions || []);
      setData(analyticsData);

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAnalytics = (transactions: any[]): AnalyticsData => {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Données de revenus (7 derniers jours)
    const revenueData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayTransactions = transactions.filter(t => {
        const tDate = new Date(t.created_at);
        return tDate.toDateString() === date.toDateString() && t.status === 'completed';
      });
      
      revenueData.push({
        date: date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }),
        revenue: dayTransactions.reduce((sum, t) => sum + Number(t.amount), 0),
        transactions: dayTransactions.length
      });
    }

    // Méthodes de paiement
    const methodColors = {
      'orange_money': '#ff6b35',
      'wave': '#00d4ff',
      'free_money': '#8b5cf6',
      'wizall': '#10b981',
      'visa_card': '#1d4ed8',
      'mastercard': '#dc2626'
    };

    const paymentMethods = transactions.reduce((acc: any, t) => {
      if (t.status === 'completed' && t.payment_method) {
        if (!acc[t.payment_method]) {
          acc[t.payment_method] = { value: 0, count: 0 };
        }
        acc[t.payment_method].value += Number(t.amount);
        acc[t.payment_method].count += 1;
      }
      return acc;
    }, {});

    const paymentMethodsData = Object.entries(paymentMethods).map(([method, data]: any) => ({
      name: method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: data.value,
      count: data.count,
      color: methodColors[method as keyof typeof methodColors] || '#6b7280'
    }));

    // Volume par heure (aujourd'hui)
    const volumeData = [];
    for (let hour = 0; hour < 24; hour += 3) {
      const hourTransactions = transactions.filter(t => {
        const tDate = new Date(t.created_at);
        return tDate.toDateString() === now.toDateString() && 
               tDate.getHours() >= hour && 
               tDate.getHours() < hour + 3 &&
               t.status === 'completed';
      });

      volumeData.push({
        time: `${hour}h-${hour + 3}h`,
        volume: hourTransactions.reduce((sum, t) => sum + Number(t.amount), 0),
        count: hourTransactions.length
      });
    }

    // Taux de succès par méthode avec couleurs calculées
    const successRateData = Object.entries(
      transactions.reduce((acc: any, t) => {
        if (t.payment_method) {
          if (!acc[t.payment_method]) {
            acc[t.payment_method] = { total: 0, successful: 0 };
          }
          acc[t.payment_method].total += 1;
          if (t.status === 'completed') {
            acc[t.payment_method].successful += 1;
          }
        }
        return acc;
      }, {})
    ).map(([method, data]: any) => {
      const successRate = data.total > 0 ? (data.successful / data.total) * 100 : 0;
      return {
        method: method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        successRate,
        totalTransactions: data.total,
        successfulTransactions: data.successful,
        color: successRate >= 90 ? '#10b981' : successRate >= 75 ? '#f59e0b' : '#ef4444'
      };
    });

    // Métriques business
    const completedTransactions = transactions.filter(t => t.status === 'completed');
    const totalRevenue = completedTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
    const monthlyRevenue = completedTransactions
      .filter(t => new Date(t.created_at) >= last30Days)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const businessMetrics = {
      mrr: monthlyRevenue,
      arr: monthlyRevenue * 12,
      churnRate: Math.random() * 5 + 2, // Mock
      customerLtv: totalRevenue / Math.max(1, completedTransactions.length) * 24, // Mock
      averageOrderValue: totalRevenue / Math.max(1, completedTransactions.length),
      conversionRate: transactions.length > 0 ? (completedTransactions.length / transactions.length) * 100 : 0,
      responseTime: 145 + Math.random() * 50, // Mock
      uptime: 99.8 + Math.random() * 0.2, // Mock
      mrrGrowth: 15 + Math.random() * 10, // Mock
      customerGrowth: 8 + Math.random() * 7 // Mock
    };

    // Prédictions IA mockées intelligentes
    const predictions = [
      {
        type: 'revenue' as const,
        title: 'Revenus Projetés (30j)',
        value: `${(monthlyRevenue * 1.15).toLocaleString()} FCFA`,
        confidence: 87,
        trend: 'up' as const,
        description: 'Basé sur la croissance actuelle et les tendances saisonnières',
        recommendation: 'Optimisez vos campagnes marketing en fin de mois pour maximiser la croissance'
      },
      {
        type: 'opportunity' as const,
        title: 'Opportunité Orange Money',
        value: '+23% revenus potentiels',
        confidence: 92,
        trend: 'up' as const,
        description: 'Orange Money montre le meilleur taux de conversion mais représente seulement 35% du volume',
        recommendation: 'Augmentez la visibilité d\'Orange Money sur votre checkout pour optimiser les conversions'
      },
      {
        type: 'risk' as const,
        title: 'Risque de Fraude',
        value: 'Niveau Faible',
        confidence: 94,
        trend: 'stable' as const,
        description: 'Vos transactions montrent des patterns normaux avec 0.2% de tentatives suspectes',
        recommendation: 'Maintenez la surveillance automatique, aucune action requise'
      },
      {
        type: 'growth' as const,
        title: 'Croissance Prévue',
        value: '+45% ce trimestre',
        confidence: 78,
        trend: 'up' as const,
        description: 'La progression actuelle suggère une forte croissance si les tendances se maintiennent',
        recommendation: 'Préparez-vous à une augmentation de volume, vérifiez votre capacité serveur'
      }
    ];

    return {
      revenueData,
      paymentMethodsData,
      volumeData,
      successRateData,
      businessMetrics,
      predictions
    };
  };

  return { data, loading, refetch: fetchAnalyticsData };
};

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Calendar, 
  MessageCircle,
  Phone,
  Mail,
  BarChart3,
  Zap,
  Clock,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  session_id: string;
  email: string | null;
  phone: string | null;
  company_name: string | null;
  lead_score: number;
  qualification_status: string;
  profile_type: string;
  intent: string;
  conversion_probability: number;
  estimated_revenue: number;
  interaction_count: number;
  last_interaction_at: string;
  created_at: string;
}

interface ConversionEvent {
  id: string;
  funnel_stage: string;
  conversion_event: string;
  conversion_value: number | null;
  conversion_date: string;
}

interface AutomatedAction {
  id: string;
  action_type: string;
  status: string;
  scheduled_at: string;
  executed_at: string | null;
}

export default function LeadGenerationDashboard() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [conversionEvents, setConversionEvents] = useState<ConversionEvent[]>([]);
  const [automatedActions, setAutomatedActions] = useState<AutomatedAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Stats calculées
  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.qualification_status === 'hot').length;
  const qualifiedLeads = leads.filter(l => l.qualification_status === 'qualified').length;
  const totalRevenuePotential = leads.reduce((sum, lead) => sum + lead.estimated_revenue, 0);
  const averageLeadScore = leads.length > 0 ? Math.round(leads.reduce((sum, lead) => sum + lead.lead_score, 0) / leads.length) : 0;
  const conversionsToday = conversionEvents.filter(e => {
    const today = new Date().toDateString();
    return new Date(e.conversion_date).toDateString() === today;
  }).length;

  useEffect(() => {
    fetchDashboardData();
  }, [selectedTimeframe]);

  const fetchDashboardData = async () => {
    if (!user || user.email !== 'dominiqkmendy77@gmail.com') {
      toast({
        title: "Accès restreint",
        description: "Seul le super admin peut voir ce dashboard.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Calculer la date de début selon la période sélectionnée
      const daysMap = { '7d': 7, '30d': 30, '90d': 90 };
      const days = daysMap[selectedTimeframe as keyof typeof daysMap] || 7;
      const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

      // Récupérer les leads
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .gte('created_at', startDate)
        .order('created_at', { ascending: false });

      if (leadsError) throw leadsError;

      // Récupérer les événements de conversion
      const { data: eventsData, error: eventsError } = await supabase
        .from('conversion_tracking')
        .select('*')
        .gte('conversion_date', startDate)
        .order('conversion_date', { ascending: false });

      if (eventsError) throw eventsError;

      // Récupérer les actions automatisées
      const { data: actionsData, error: actionsError } = await supabase
        .from('automated_actions')
        .select('*')
        .gte('created_at', startDate)
        .order('scheduled_at', { ascending: false });

      if (actionsError) throw actionsError;

      setLeads(leadsData || []);
      setConversionEvents(eventsData || []);
      setAutomatedActions(actionsData || []);
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données du dashboard.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getQualificationColor = (status: string) => {
    switch (status) {
      case 'hot': return 'destructive';
      case 'qualified': return 'default';
      case 'cold': return 'secondary';
      default: return 'outline';
    }
  };

  const getQualificationIcon = (status: string) => {
    switch (status) {
      case 'hot': return '🔥';
      case 'qualified': return '✅';
      case 'cold': return '❄️';
      default: return '🌱';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🚀 Machine de Génération de Leads</h1>
          <p className="text-muted-foreground">
            Système automatisé de conversion et génération de revenus
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={selectedTimeframe} 
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
          </select>
          <Button onClick={fetchDashboardData} size="sm">
            Actualiser
          </Button>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{totalLeads}</p>
                <p className="text-xs text-green-600">+{conversionsToday} aujourd'hui</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Leads Chauds</p>
                <p className="text-2xl font-bold text-red-600">{hotLeads}</p>
                <p className="text-xs text-muted-foreground">{qualifiedLeads} qualifiés</p>
              </div>
              <Target className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenu Potentiel</p>
                <p className="text-2xl font-bold">{(totalRevenuePotential / 1000).toFixed(0)}K XOF</p>
                <p className="text-xs text-green-600">Pipeline actif</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Score Moyen</p>
                <p className="text-2xl font-bold">{averageLeadScore}/100</p>
                <Progress value={averageLeadScore} className="mt-2" />
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs principales */}
      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">Leads Actifs</TabsTrigger>
          <TabsTrigger value="actions">Actions Automatisées</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🎯 Leads en Temps Réel</CardTitle>
              <CardDescription>
                Leads qualifiés automatiquement par l'IA selon leur comportement et profil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.slice(0, 10).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">
                        {getQualificationIcon(lead.qualification_status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {lead.company_name || lead.email || lead.session_id.slice(0, 8)}
                          </p>
                          <Badge variant={getQualificationColor(lead.qualification_status)}>
                            {lead.qualification_status}
                          </Badge>
                          <Badge variant="outline">{lead.profile_type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Score: {lead.lead_score}/100 • Intent: {lead.intent} • 
                          {lead.interaction_count} interactions
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Dernière activité: {new Date(lead.last_interaction_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">
                        {(lead.estimated_revenue / 1000).toFixed(0)}K XOF
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.round(lead.conversion_probability * 100)}% conversion
                      </p>
                      <div className="flex gap-1 mt-2">
                        {lead.email && (
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3" />
                          </Button>
                        )}
                        {lead.phone && (
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>⚡ Actions Automatisées</CardTitle>
              <CardDescription>
                Système automatique de suivi et de nurturing des leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {automatedActions.slice(0, 10).map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        action.status === 'executed' ? 'bg-green-100 text-green-600' :
                        action.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {action.status === 'executed' ? <CheckCircle className="h-4 w-4" /> :
                         action.status === 'pending' ? <Clock className="h-4 w-4" /> :
                         <Zap className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium">
                          {action.action_type.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {action.status === 'executed' ? 'Exécutée' : 
                           action.status === 'pending' ? 'En attente' : 'Échouée'} • 
                          Programmée: {new Date(action.scheduled_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <Badge variant={
                      action.status === 'executed' ? 'default' :
                      action.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {action.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>📊 Funnel de Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Visiteurs</span>
                    <span className="font-medium">{conversionEvents.filter(e => e.funnel_stage === 'visitor').length}</span>
                  </div>
                  <Progress value={100} />
                  
                  <div className="flex items-center justify-between">
                    <span>Leads</span>
                    <span className="font-medium">{conversionEvents.filter(e => e.funnel_stage === 'lead').length}</span>
                  </div>
                  <Progress value={70} />
                  
                  <div className="flex items-center justify-between">
                    <span>Qualifiés</span>
                    <span className="font-medium">{qualifiedLeads}</span>
                  </div>
                  <Progress value={45} />
                  
                  <div className="flex items-center justify-between">
                    <span>Clients</span>
                    <span className="font-medium">{conversionEvents.filter(e => e.funnel_stage === 'customer').length}</span>
                  </div>
                  <Progress value={15} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Performance par Intention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['integration', 'pricing', 'payment_methods', 'general'].map(intent => {
                    const intentLeads = leads.filter(l => l.intent === intent);
                    const count = intentLeads.length;
                    const avgScore = count > 0 ? Math.round(intentLeads.reduce((sum, l) => sum + l.lead_score, 0) / count) : 0;
                    
                    return (
                      <div key={intent} className="flex items-center justify-between p-3 border rounded">
                        <span className="capitalize">{intent.replace('_', ' ')}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{count} leads</span>
                          <Badge variant="outline">{avgScore}/100</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
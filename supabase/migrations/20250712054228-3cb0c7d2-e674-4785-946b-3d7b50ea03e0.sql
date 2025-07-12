-- Tables pour le système de génération automatique de leads et revenus (correction des précisions numériques)

-- Table des leads qualifiés avec scoring automatique
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR NOT NULL,
  user_id UUID NULL,
  email VARCHAR NULL,
  phone VARCHAR NULL,
  company_name VARCHAR NULL,
  lead_score INTEGER NOT NULL DEFAULT 0,
  qualification_status VARCHAR NOT NULL DEFAULT 'new' CHECK (qualification_status IN ('new', 'qualified', 'hot', 'cold', 'converted')),
  profile_type VARCHAR NOT NULL DEFAULT 'unknown' CHECK (profile_type IN ('startup', 'sme', 'enterprise', 'developer', 'unknown')),
  intent VARCHAR NOT NULL DEFAULT 'general',
  budget_range VARCHAR NULL,
  timeline VARCHAR NULL,
  pain_points TEXT[],
  interaction_count INTEGER NOT NULL DEFAULT 1,
  last_interaction_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  conversion_probability DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  estimated_revenue DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  lead_source VARCHAR NOT NULL DEFAULT 'chatbot',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des actions automatisées
CREATE TABLE public.automated_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id),
  action_type VARCHAR NOT NULL CHECK (action_type IN ('email_sequence', 'demo_invite', 'quote_generation', 'follow_up_call', 'trial_setup', 'discount_offer')),
  trigger_condition VARCHAR NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'executed', 'failed', 'cancelled')),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  executed_at TIMESTAMP WITH TIME ZONE NULL,
  action_data JSONB NOT NULL DEFAULT '{}',
  result_data JSONB NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table de tracking des conversions
CREATE TABLE public.conversion_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id),
  session_id VARCHAR NOT NULL,
  funnel_stage VARCHAR NOT NULL CHECK (funnel_stage IN ('visitor', 'lead', 'qualified', 'trial', 'customer')),
  conversion_event VARCHAR NOT NULL,
  conversion_value DECIMAL(10,2) NULL,
  conversion_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  attribution_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des séquences de nurturing
CREATE TABLE public.nurturing_sequences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id),
  sequence_type VARCHAR NOT NULL CHECK (sequence_type IN ('onboarding', 'education', 'conversion', 'retention')),
  current_step INTEGER NOT NULL DEFAULT 1,
  total_steps INTEGER NOT NULL,
  status VARCHAR NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'abandoned')),
  next_action_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completion_rate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  engagement_score INTEGER NOT NULL DEFAULT 0,
  sequence_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des offres contextuelles
CREATE TABLE public.contextual_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  offer_name VARCHAR NOT NULL,
  offer_type VARCHAR NOT NULL CHECK (offer_type IN ('discount', 'trial_extension', 'feature_unlock', 'consultation', 'demo')),
  target_profile VARCHAR NOT NULL,
  target_intent VARCHAR NOT NULL,
  discount_percentage DECIMAL(5,2) NULL,
  discount_amount DECIMAL(10,2) NULL,
  validity_hours INTEGER NOT NULL DEFAULT 24,
  max_uses INTEGER NULL,
  current_uses INTEGER NOT NULL DEFAULT 0,
  conversion_rate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  offer_text TEXT NOT NULL,
  call_to_action TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index pour les performances
CREATE INDEX idx_leads_score ON public.leads(lead_score DESC);
CREATE INDEX idx_leads_qualification ON public.leads(qualification_status);
CREATE INDEX idx_leads_interaction ON public.leads(last_interaction_at DESC);
CREATE INDEX idx_automated_actions_scheduled ON public.automated_actions(scheduled_at);
CREATE INDEX idx_conversion_tracking_lead ON public.conversion_tracking(lead_id);
CREATE INDEX idx_nurturing_sequences_lead ON public.nurturing_sequences(lead_id);

-- RLS Policies
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automated_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nurturing_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contextual_offers ENABLE ROW LEVEL SECURITY;

-- Policies pour les leads
CREATE POLICY "Super admin can manage all leads" ON public.leads
FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Users can view their own leads" ON public.leads
FOR SELECT USING (
  user_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- Policies pour les actions automatisées
CREATE POLICY "Super admin can manage automated actions" ON public.automated_actions
FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- Policies pour le tracking des conversions
CREATE POLICY "Super admin can view conversion tracking" ON public.conversion_tracking
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- Policies pour les séquences de nurturing
CREATE POLICY "Super admin can manage nurturing sequences" ON public.nurturing_sequences
FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- Policies pour les offres contextuelles
CREATE POLICY "Everyone can view active offers" ON public.contextual_offers
FOR SELECT USING (is_active = true);

CREATE POLICY "Super admin can manage offers" ON public.contextual_offers
FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- Triggers pour updated_at
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_nurturing_sequences_updated_at
  BEFORE UPDATE ON public.nurturing_sequences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contextual_offers_updated_at
  BEFORE UPDATE ON public.contextual_offers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Table transactions (cœur du système de paiement)
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES public.merchant_accounts(id) NOT NULL,
  reference_id VARCHAR(100) UNIQUE NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'XOF',
  status VARCHAR(20) DEFAULT 'pending',
  payment_method VARCHAR(50),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  customer_name VARCHAR(255),
  description TEXT,
  metadata JSONB DEFAULT '{}',
  callback_url TEXT,
  success_url TEXT,
  cancel_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours'),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table webhook_events (système de notifications)
CREATE TABLE public.webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES public.merchant_accounts(id) NOT NULL,
  transaction_id UUID REFERENCES public.transactions(id),
  event_type VARCHAR(50) NOT NULL,
  payload JSONB NOT NULL,
  webhook_url TEXT NOT NULL,
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  delivered BOOLEAN DEFAULT FALSE,
  last_attempt_at TIMESTAMP WITH TIME ZONE,
  next_retry_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table payment_methods (configuration des méthodes)
CREATE TABLE public.payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table audit_logs (sécurité et monitoring)
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES public.merchant_accounts(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  user_agent TEXT,
  ip_address INET,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS sur toutes les nouvelles tables
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies pour transactions
CREATE POLICY "Merchants can view their own transactions" 
  ON public.transactions FOR SELECT 
  USING (merchant_id IN (
    SELECT id FROM public.merchant_accounts WHERE user_id = auth.uid()
  ));

CREATE POLICY "Merchants can create their own transactions" 
  ON public.transactions FOR INSERT 
  WITH CHECK (merchant_id IN (
    SELECT id FROM public.merchant_accounts WHERE user_id = auth.uid()
  ));

CREATE POLICY "Merchants can update their own transactions" 
  ON public.transactions FOR UPDATE 
  USING (merchant_id IN (
    SELECT id FROM public.merchant_accounts WHERE user_id = auth.uid()
  ));

-- RLS Policies pour webhook_events
CREATE POLICY "Merchants can view their own webhook events" 
  ON public.webhook_events FOR SELECT 
  USING (merchant_id IN (
    SELECT id FROM public.merchant_accounts WHERE user_id = auth.uid()
  ));

CREATE POLICY "System can manage webhook events" 
  ON public.webhook_events FOR ALL 
  USING (true);

-- RLS Policies pour payment_methods (lecture publique)
CREATE POLICY "Anyone can view payment methods" 
  ON public.payment_methods FOR SELECT 
  USING (is_active = true);

-- RLS Policies pour audit_logs
CREATE POLICY "Merchants can view their own audit logs" 
  ON public.audit_logs FOR SELECT 
  USING (merchant_id IN (
    SELECT id FROM public.merchant_accounts WHERE user_id = auth.uid()
  ));

-- Auto-update merchant stats function
CREATE OR REPLACE FUNCTION public.update_merchant_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE public.merchant_accounts 
    SET 
      total_transactions = total_transactions + 1,
      monthly_volume = monthly_volume + NEW.amount,
      updated_at = NOW()
    WHERE id = NEW.merchant_id;
  END IF;
  RETURN NEW;
END;
$$;

-- Auto-generate unique reference function
CREATE OR REPLACE FUNCTION public.generate_transaction_reference()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.reference_id := 'TXN_' || UPPER(SUBSTRING(encode(gen_random_bytes(8), 'hex'), 1, 12));
  RETURN NEW;
END;
$$;

-- Update timestamps function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers
CREATE TRIGGER update_merchant_stats_trigger
  AFTER UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_merchant_stats();

CREATE TRIGGER generate_transaction_reference_trigger
  BEFORE INSERT ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.generate_transaction_reference();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes pour performance
CREATE INDEX idx_transactions_merchant_status ON public.transactions(merchant_id, status);
CREATE INDEX idx_transactions_reference ON public.transactions(reference_id);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);
CREATE INDEX idx_transactions_merchant_created ON public.transactions(merchant_id, created_at DESC);
CREATE INDEX idx_webhook_events_delivery ON public.webhook_events(delivered, next_retry_at);
CREATE INDEX idx_webhook_events_merchant ON public.webhook_events(merchant_id, created_at DESC);

-- Insert des méthodes de paiement par défaut
INSERT INTO public.payment_methods (code, name, description, config) VALUES
('orange_money', 'Orange Money', 'Paiement via Orange Money Sénégal', 
 '{"success_rate": 0.85, "min_delay": 10, "max_delay": 30, "currency": "XOF"}'::jsonb),
('wave', 'Wave', 'Paiement instantané via Wave', 
 '{"success_rate": 0.92, "min_delay": 5, "max_delay": 15, "currency": "XOF"}'::jsonb),
('free_money', 'Free Money', 'Paiement via Free Money (Tigo)', 
 '{"success_rate": 0.88, "min_delay": 8, "max_delay": 25, "currency": "XOF"}'::jsonb),
('wizall', 'Wizall', 'Portefeuille électronique Wizall', 
 '{"success_rate": 0.90, "min_delay": 6, "max_delay": 20, "currency": "XOF"}'::jsonb),
('visa_card', 'Visa', 'Carte Visa internationale', 
 '{"success_rate": 0.78, "min_delay": 3, "max_delay": 10, "currency": ["XOF", "EUR", "USD"]}'::jsonb),
('mastercard', 'Mastercard', 'Carte Mastercard internationale', 
 '{"success_rate": 0.80, "min_delay": 3, "max_delay": 10, "currency": ["XOF", "EUR", "USD"]}'::jsonb),
('gim_uemoa', 'GIM-UEMOA', 'Carte bancaire locale GIM-UEMOA', 
 '{"success_rate": 0.85, "min_delay": 5, "max_delay": 12, "currency": "XOF"}'::jsonb);

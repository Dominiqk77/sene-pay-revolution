
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'merchant',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create merchant accounts table for business information
CREATE TABLE public.merchant_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_type TEXT,
  business_address TEXT,
  business_phone TEXT,
  business_email TEXT,
  website_url TEXT,
  api_key TEXT UNIQUE,
  api_secret TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  monthly_volume DECIMAL(15,2) DEFAULT 0,
  total_transactions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_accounts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Merchant accounts policies  
CREATE POLICY "Users can view their own merchant account" 
  ON public.merchant_accounts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own merchant account" 
  ON public.merchant_accounts FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own merchant account" 
  ON public.merchant_accounts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to generate API keys
CREATE OR REPLACE FUNCTION public.generate_api_credentials()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  NEW.api_key := 'sk_live_' || encode(gen_random_bytes(32), 'hex');
  NEW.api_secret := 'sk_secret_' || encode(gen_random_bytes(32), 'hex');
  RETURN NEW;
END;
$$;

-- Trigger to generate API credentials for merchant accounts
CREATE TRIGGER generate_merchant_api_credentials
  BEFORE INSERT ON public.merchant_accounts
  FOR EACH ROW EXECUTE FUNCTION public.generate_api_credentials();

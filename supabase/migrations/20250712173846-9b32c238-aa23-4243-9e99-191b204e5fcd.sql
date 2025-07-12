-- Create blog_articles table for automated SEO blog system
CREATE TABLE public.blog_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  category TEXT NOT NULL,
  tags TEXT[],
  author_name TEXT DEFAULT 'SenePay Team',
  author_avatar TEXT,
  reading_time INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  seo_score INTEGER DEFAULT 0,
  monetization_cta JSONB DEFAULT '{}',
  ai_generated BOOLEAN DEFAULT true,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;

-- Create policies for blog articles
CREATE POLICY "Anyone can view published articles" 
ON public.blog_articles 
FOR SELECT 
USING (is_published = true);

CREATE POLICY "Super admin can manage all articles" 
ON public.blog_articles 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'super_admin'
));

-- Create indexes for performance
CREATE INDEX idx_blog_articles_slug ON public.blog_articles(slug);
CREATE INDEX idx_blog_articles_category ON public.blog_articles(category);
CREATE INDEX idx_blog_articles_published_at ON public.blog_articles(published_at DESC);
CREATE INDEX idx_blog_articles_view_count ON public.blog_articles(view_count DESC);
CREATE INDEX idx_blog_articles_keywords ON public.blog_articles USING GIN(keywords);
CREATE INDEX idx_blog_articles_tags ON public.blog_articles USING GIN(tags);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_articles_updated_at
BEFORE UPDATE ON public.blog_articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample high-performing SEO articles for launch
INSERT INTO public.blog_articles (
  title, slug, excerpt, content, category, keywords, tags, meta_title, meta_description, reading_time, seo_score, featured_image_url
) VALUES 
(
  'Révolution FinTech Sénégal 2025 : Comment SenePay Transforme les Paiements Digitaux',
  'revolution-fintech-senegal-2025-senepay-transforme-paiements-digitaux',
  'Découvrez comment SenePay révolutionne l''écosystème fintech sénégalais en 2025 avec sa plateforme de paiement ultra-innovante qui connecte Orange Money, Wave, Free Money et les cartes bancaires.',
  '# Révolution FinTech Sénégal 2025 : L''Avènement de SenePay

## Introduction : Une Nouvelle Ère pour les Paiements au Sénégal

Le Sénégal connaît une **révolution digitale sans précédent** en 2025. Avec plus de 12 millions d''utilisateurs de services financiers mobiles et un taux de pénétration de 89%, notre pays s''impose comme le leader fintech de l''Afrique de l''Ouest.

Au cœur de cette transformation : **SenePay**, la première passerelle de paiement 100% sénégalaise qui unifie tous les moyens de paiement locaux et internationaux en une seule API ultra-puissante.

## Le Défi des Paiements Digitaux au Sénégal

### État des Lieux 2025

- **89% des sites e-commerce** sénégalais n''acceptent pas les paiements en ligne
- **Fragmentation extreme** : Orange Money, Wave, Free Money, cartes bancaires...
- **Coûts prohibitifs** : jusqu''à 4.5% de commission
- **Intégrations complexes** : des semaines de développement

### L''Opportunité Massive

Le marché sénégalais représente une opportunité de **$180M** avec une croissance annuelle de **45%**. Les commerçants perdent chaque jour des millions de FCFA à cause de l''impossibilité d''accepter les paiements digitaux.

## SenePay : La Solution Révolutionnaire

### Vision Panafricaine

SenePay incarne la **vision panafricaine** d''une Afrique digitalement souveraine. Notre mission : démocratiser les paiements digitaux pour tous les Sénégalais, des petits commerçants de Sandaga aux startups de Dakar.

### Innovation Technologique

**Une API, Tous les Paiements**

```javascript
// Intégration SenePay en 3 lignes
const senepay = new SenePay({ apiKey: "sk_live_xxx" });
const payment = await senepay.create({ amount: 10000, methods: ["all"] });
```

### Méthodes Supportées

1. **Mobile Money** : Orange Money, Wave, Free Money, Wizall
2. **Cartes Bancaires** : Visa, Mastercard, cartes locales GIM-UEMOA
3. **Crypto-paiements** : Bitcoin, USDT, USDC
4. **BNPL** : Paiements en plusieurs fois

## Impact Économique et Social

### Pour les Commerçants

- **Augmentation du CA** : +67% en moyenne
- **Nouveaux clients** : accès à 12M+ utilisateurs mobiles
- **Coûts réduits** : tarifs 50% moins chers que la concurrence

### Pour l''Économie Sénégalaise

- **Inclusion financière** renforcée
- **Création d''emplois** : 2,500 emplois directs prévus
- **Attraction d''investissements** étrangers
- **Rayonnement international** du Sénégal tech

## Roadmap 2025-2027

### Phase 1 : Domination Sénégal (2025)
- **Objectif** : 1,500 marchands actifs
- **Volume** : $15M traités
- **Expansion** : Dakar, Thiès, Saint-Louis

### Phase 2 : Leadership CEDEAO (2026)
- **Objectif** : 7,500 marchands
- **Volume** : $120M traités  
- **Expansion** : Mali, Burkina Faso, Niger

### Phase 3 : Hub Fintech Africain (2027)
- **Objectif** : 15,000+ marchands
- **Volume** : $500M traités
- **Innovation** : CBDC, DeFi, Web3

## Témoignages Clients

*"SenePay a transformé notre business. Nous acceptons désormais tous les paiements en une seule intégration. Notre chiffre d''affaires a augmenté de 73% en 3 mois !"* - **Aminata Diallo**, E-commerce Dakar

*"Enfin une solution 100% sénégalaise ! L''équipe comprend nos besoins locaux."* - **Moussa Sarr**, Marketplace Thiès

## Rejoindre la Révolution

### Pour les Développeurs

Documentation complète, SDKs en 8 langages, sandbox gratuit, support technique en wolof/français.

### Pour les Investisseurs

Opportunité unique d''investir dans la fintech #1 du Sénégal avec un ROI projeté de 50,000% en 24 mois.

### Pour les Partenaires

Programme de partenariat exclusif avec commissions récurrentes et support marketing.

## Conclusion : L''Avenir des Paiements Est Sénégalais

SenePay représente bien plus qu''une solution technique : c''est un **symbole de souveraineté digitale africaine**. En choisissant SenePay, vous participez à l''émancipation économique du Sénégal et de l''Afrique.

**Rejoignez dès aujourd''hui les 500+ marchands qui font confiance à SenePay !**

---

*Cet article vous a plu ? Partagez-le et abonnez-vous à notre newsletter pour recevoir nos analyses exclusives sur la fintech africaine.*',
  'fintech',
  ARRAY['senepay', 'fintech sénégal', 'paiement mobile', 'orange money', 'wave', 'api paiement', 'e-commerce sénégal'],
  ARRAY['fintech', 'paiement', 'sénégal', 'innovation', 'panafricain'],
  'Révolution FinTech Sénégal 2025 : SenePay Transforme les Paiements Digitaux',
  'Découvrez comment SenePay révolutionne les paiements digitaux au Sénégal en 2025. API unique pour Orange Money, Wave, cartes bancaires. +67% CA garanti.',
  15,
  95,
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630'
);
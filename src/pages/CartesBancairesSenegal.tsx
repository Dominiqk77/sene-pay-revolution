import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Code, Zap, Shield, Clock, ArrowRight, CreditCard, Building, Globe, Target, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const codeExample = `// API Cartes Bancaires Sénégal - Ultra Sécurisée
import { SenePay } from 'senepay-sdk';

const senepay = new SenePay({
  apiKey: 'sk_live_votre_cle_api',
  environment: 'production'
});

// Créer un paiement par carte sécurisé 3D Secure
const payment = await senepay.payments.create({
  amount: 75000, // 75,000 FCFA
  currency: 'XOF',
  method: 'card',
  card_options: {
    secure_3d: true,
    save_card: false,
    accepted_brands: ['visa', 'mastercard', 'amex']
  },
  customer: {
    name: 'Fatou Sall',
    email: 'fatou@entreprise.sn',
    phone: '+221776543210'
  },
  description: 'Paiement e-commerce sécurisé',
  callback_url: 'https://monsite.sn/webhook',
  success_url: 'https://monsite.sn/success'
});

console.log('Paiement carte créé:', payment.secure_payment_url);`;

const CartesBancairesSenegal = () => {
  return (
    <>
      <Helmet>
        <title>Paiement Cartes Bancaires Sénégal | API Visa Mastercard | SenePay</title>
        <meta name="description" content="🏆 API Cartes Bancaires Sénégal #1 ⚡ Acceptez Visa, Mastercard, Amex avec sécurité 3D Secure. Intégration 5 min, commissions imbattables. +1000 e-commerces font confiance." />
        <meta name="keywords" content="cartes bancaires sénégal, api visa mastercard, paiement carte dakar, 3d secure sénégal, e-commerce cartes bancaires, api paiement carte" />
        <link rel="canonical" href="https://senepay.sn/cartes-bancaires-senegal" />
        
        {/* Geo targeting pour Sénégal */}
        <meta name="geo.region" content="SN-DK" />
        <meta name="geo.placename" content="Dakar, Sénégal" />
        
        {/* Open Graph optimisé */}
        <meta property="og:title" content="💳 API Cartes Bancaires Sénégal | Visa Mastercard 3D Secure | SenePay" />
        <meta property="og:description" content="Acceptez toutes les cartes bancaires au Sénégal avec l'API la plus sécurisée. 3D Secure, tokenisation, anti-fraude IA. Intégration 5 minutes ⚡" />
        <meta property="og:url" content="https://senepay.sn/cartes-bancaires-senegal" />
        
        {/* Structured Data pour cartes bancaires */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "API Cartes Bancaires Sénégal SenePay",
            "description": "Solution de paiement par cartes bancaires la plus sécurisée du Sénégal. Acceptez Visa, Mastercard, American Express avec 3D Secure.",
            "provider": {
              "@type": "FinancialService",
              "name": "SenePay",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SN",
                "addressLocality": "Dakar"
              }
            },
            "areaServed": {
              "@type": "Country",
              "name": "Sénégal"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Solutions Cartes Bancaires",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "API Visa Mastercard"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Sécurité 3D Secure"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        {/* Hero Section Ultra-optimisé SEO */}
        <section className="pt-24 pb-16 px-4" data-integration-step="hero-view">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
                <CreditCard className="h-4 w-4 mr-2" />
                💳 Cartes Bancaires Sénégal - Solution Premium
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                API Cartes Bancaires Sénégal
                <br />
                <span className="text-3xl md:text-5xl">Visa • Mastercard • Amex</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                💳 <strong>Acceptez toutes les cartes bancaires au Sénégal</strong> avec l'API la plus sécurisée d'Afrique. 
                <strong>3D Secure, tokenisation, anti-fraude IA</strong>. Intégration 5 minutes, 
                commissions 50% moins chères. +1000 e-commerces sénégalais font confiance ⚡
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" data-payment-method="cards">
                  <Link to="/sandbox">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Tester Cartes Bancaires API
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Link to="/documentation">
                    Documentation 3D Secure
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              {/* Logos cartes acceptées */}
              <div className="flex justify-center items-center gap-8 mb-12">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <span className="text-blue-600 font-bold text-lg">VISA</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <span className="text-red-600 font-bold text-lg">MasterCard</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <span className="text-blue-800 font-bold text-lg">AMEX</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <span className="text-green-600 font-bold text-sm">3D Secure</span>
                </div>
              </div>
              
              {/* Stats performance */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">99.8%</div>
                  <p className="text-sm text-gray-600">Taux d'autorisation</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">&lt;2s</div>
                  <p className="text-sm text-gray-600">Transaction 3D</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">0.01%</div>
                  <p className="text-sm text-gray-600">Taux de fraude</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <p className="text-sm text-gray-600">Support PCI</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="py-16 px-4 bg-white" data-integration-step="code-example">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Intégration Cartes Bancaires Ultra-Sécurisée
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Notre API cartes bancaires respecte les normes PCI DSS Level 1 les plus strictes. 
                  3D Secure natif, tokenisation avancée, détection de fraude par IA.
                </p>
                
                <div className="space-y-4">
                  {[
                    '3D Secure 2.0 dernière génération',
                    'Tokenisation sécurisée des cartes',
                    'Anti-fraude IA temps réel', 
                    'PCI DSS Level 1 compliant',
                    'Support toutes cartes internationales',
                    'Checkout optimisé mobile'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card className="bg-gray-900 text-blue-400 border-0">
                <CardHeader>
                  <CardTitle className="text-white text-lg">API Cartes Bancaires 3D Secure</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm overflow-x-auto">
                    <code>{codeExample}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Avantages cartes bancaires */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50" data-integration-step="features">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Pourquoi Choisir SenePay pour les Cartes Bancaires ?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Sécurité Maximale</h3>
                  <p className="text-gray-600">
                    3D Secure 2.0, chiffrement bout-en-bout, tokenisation PCI compliant. 
                    Vos clients paient en toute sécurité.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Taux d'Autorisation Élevé</h3>
                  <p className="text-gray-600">
                    99.8% de taux d'autorisation grâce à notre routing intelligent 
                    et partenariats bancaires privilégiés au Sénégal.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Acceptation Mondiale</h3>
                  <p className="text-gray-600">
                    Acceptez toutes les cartes internationales : Visa, Mastercard, 
                    American Express, cartes locales GIM-UEMOA.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white" data-integration-step="final-cta">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Commencez à Accepter les Cartes Bancaires Maintenant
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez les +1000 e-commerces sénégalais qui font confiance à SenePay 
              pour leurs paiements par cartes bancaires. Intégration 5 minutes, support 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/auth">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Créer Compte Marchand
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">
                  Démonstration Cartes Bancaires
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CartesBancairesSenegal;
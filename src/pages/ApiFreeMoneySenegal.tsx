import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Code, Zap, Shield, Clock, ArrowRight, Smartphone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const codeExample = `// Intégration Free Money avec SenePay - Ultra Simple
import { SenePay } from 'senepay-sdk';

const senepay = new SenePay({
  apiKey: 'sk_live_votre_cle_api',
  environment: 'production'
});

// Créer un paiement Free Money
const payment = await senepay.payments.create({
  amount: 50000, // 50,000 FCFA
  currency: 'XOF',
  method: 'free_money',
  customer: {
    name: 'Amadou Diop',
    phone: '+221771234567',
    email: 'amadou@example.com'
  },
  description: 'Achat produit e-commerce',
  callback_url: 'https://monsite.sn/webhook',
  success_url: 'https://monsite.sn/success',
  cancel_url: 'https://monsite.sn/cancel'
});

console.log('Paiement Free Money créé:', payment.payment_url);
// Rediriger le client vers payment.payment_url`;

const ApiFreeMoneySenegal = () => {
  return (
    <>
      <Helmet>
        <title>API Free Money Sénégal | Intégration Paiement Mobile | SenePay</title>
        <meta name="description" content="🚀 Intégrez l'API Free Money Sénégal en 5 minutes avec SenePay. La solution de paiement mobile la plus simple pour développeurs. Documentation complète, SDK gratuits, support 24/7." />
        <meta name="keywords" content="api free money sénégal, intégration free money, paiement mobile sénégal, free money développeur, api paiement sénégal, sdk free money" />
        <link rel="canonical" href="https://senepay.sn/api-free-money-senegal" />
        
        {/* Open Graph */}
        <meta property="og:title" content="🔥 API Free Money Sénégal | Intégration 5 Minutes | SenePay" />
        <meta property="og:description" content="Intégrez Free Money Sénégal facilement avec l'API SenePay. Documentation complète, exemples de code, SDK JavaScript/PHP/Python. Essai gratuit !" />
        <meta property="og:url" content="https://senepay.sn/api-free-money-senegal" />
        <meta property="og:type" content="article" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "API Free Money Sénégal - Guide d'Intégration Complet",
            "description": "Guide complet pour intégrer l'API Free Money avec SenePay au Sénégal. Exemples de code, documentation technique, et support développeur.",
            "author": {
              "@type": "Organization",
              "name": "SenePay"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SenePay",
              "logo": {
                "@type": "ImageObject",
                "url": "https://senepay.sn/lovable-uploads/569b505b-54ae-41ef-b693-b571bf20d5e7.png"
              }
            },
            "datePublished": "2025-01-07",
            "dateModified": "2025-01-07"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
                <Smartphone className="h-4 w-4 mr-2" />
                Free Money Sénégal API - Solution Premium
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                API Free Money Sénégal
                <br />
                <span className="text-3xl md:text-5xl">Intégration Ultra-Rapide</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                🔥 <strong>Intégrez Free Money en 5 minutes</strong> avec l'API SenePay la plus avancée du Sénégal. 
                Solution complète pour développeurs : <strong>SDK multi-langages, webhooks temps réel, dashboard analytics</strong>. 
                +500 développeurs sénégalais nous font confiance ⚡
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <Link to="/sandbox">
                    <Code className="mr-2 h-5 w-5" />
                    Tester l'API Gratuitement
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  <Link to="/documentation">
                    Documentation Free Money
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              {/* Stats rapides */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">5min</div>
                  <p className="text-sm text-gray-600">Intégration</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">99.9%</div>
                  <p className="text-sm text-gray-600">Uptime</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">&lt;200ms</div>
                  <p className="text-sm text-gray-600">Response</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">24/7</div>
                  <p className="text-sm text-gray-600">Support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Intégration Free Money en 5 Minutes
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  L'API Free Money SenePay est conçue pour les développeurs sénégalais. 
                  Code simple, documentation claire, exemples pratiques.
                </p>
                
                <div className="space-y-4">
                  {[
                    'SDK JavaScript, PHP, Python inclus',
                    'Webhooks temps réel automatiques',
                    'Interface de test sandbox gratuite',
                    'Support technique en français',
                    'Documentation vidéo complète'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card className="bg-gray-900 text-green-400 border-0">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Exemple Free Money API</CardTitle>
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

        {/* Avantages Free Money */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Pourquoi Choisir Free Money avec SenePay ?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Transactions Instantanées</h3>
                  <p className="text-gray-600">
                    Paiements Free Money traités en temps réel avec confirmation immédiate. 
                    Parfait pour e-commerce et applications mobiles.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Sécurité Bancaire</h3>
                  <p className="text-gray-600">
                    Chiffrement SSL 256-bits, conformité PCI DSS Level 1. 
                    Vos transactions Free Money sont protégées au niveau bancaire.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Couverture Nationale</h3>
                  <p className="text-gray-600">
                    Tous les utilisateurs Free Money au Sénégal. 
                    API compatible avec toutes les versions Free Money.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Tarifs Free Money Transparents
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Les tarifs les plus compétitifs du marché sénégalais pour les transactions Free Money
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Free Money Standard</CardTitle>
                  <div className="text-3xl font-bold text-green-600">1.2%</div>
                  <p className="text-gray-600">par transaction Free Money</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      API Free Money complète
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Webhooks temps réel
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Dashboard analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Support email
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-green-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white">Recommandé</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Free Money Premium</CardTitle>
                  <div className="text-3xl font-bold text-green-600">0.9%</div>
                  <p className="text-gray-600">par transaction Free Money</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Tout Standard inclus
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Support prioritaire 24/7
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Analytics avancés
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Account manager dédié
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link to="/auth">
                  Commencer avec Free Money API
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à Intégrer Free Money dans Votre Application ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez les +500 développeurs sénégalais qui font confiance à SenePay 
              pour leurs intégrations Free Money. Support technique 24/7, documentation complète.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                <Link to="/sandbox">
                  <Code className="mr-2 h-5 w-5" />
                  Tester Free Money API
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">
                  Parler à un Expert Free Money
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

export default ApiFreeMoneySenegal;
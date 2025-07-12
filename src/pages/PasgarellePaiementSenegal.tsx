import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Zap, Globe, Code, ArrowRight, Smartphone, CreditCard, Users } from "lucide-react";
import { Link } from "react-router-dom";

const PasgarellePaiementSenegal = () => {
  return (
    <>
      <Helmet>
        <title>Passerelle de Paiement Sénégal 2025 | Gateway API #1 | SenePay</title>
        <meta name="description" content="Passerelle de paiement #1 au Sénégal. Connectez tous les moyens de paiement sénégalais : Orange Money, Wave, cartes bancaires. API unifiée, commissions imbattables." />
        <meta name="keywords" content="passerelle paiement sénégal, payment gateway senegal, api paiement unifié, fintech sénégal, orange money wave integration" />
        <link rel="canonical" href="https://senepay.sn/passerelle-paiement-senegal" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-senepay-orange/10 via-white to-senepay-gold/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-senepay-orange/20 text-senepay-orange border-senepay-orange/30">
                Passerelle de Paiement #1 Sénégal
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
                La <span className="text-senepay-orange">Passerelle de Paiement</span>
                <br />qui <span className="text-senepay-gold">Connecte Tout</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Une seule API pour accepter <strong>tous les moyens de paiement</strong> au Sénégal et en Afrique de l'Ouest. 
                Orange Money, Wave, cartes bancaires, et plus encore.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/auth">
                  <Button size="lg" className="btn-senepay px-8 py-4 text-lg">
                    <Zap className="mr-2 h-5 w-5" />
                    Intégrer Maintenant
                  </Button>
                </Link>
                <Link to="/sandbox">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white">
                    <Code className="mr-2 h-5 w-5" />
                    Tester l'API
                  </Button>
                </Link>
              </div>

              {/* Stats globales */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-senepay-orange">8+</div>
                  <div className="text-gray-600">Moyens de Paiement</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-senepay-gold">99.9%</div>
                  <div className="text-gray-600">Uptime SLA</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-senepay-orange">1.5s</div>
                  <div className="text-gray-600">Temps de Réponse</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-senepay-gold">24/7</div>
                  <div className="text-gray-600">Support Local</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Écosystème de paiement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Écosystème de Paiement Complet
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                SenePay connecte tous les moyens de paiement populaires au Sénégal et en Afrique
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-2 hover:border-orange-200 transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="font-bold mb-2">Mobile Money</h3>
                  <p className="text-sm text-gray-600 mb-3">Orange Money, Wave, Free Money, Wizall</p>
                  <Badge className="bg-green-100 text-green-600 text-xs">Intégré</Badge>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="font-bold mb-2">Cartes Bancaires</h3>
                  <p className="text-sm text-gray-600 mb-3">Visa, Mastercard, Cartes locales</p>
                  <Badge className="bg-green-100 text-green-600 text-xs">Intégré</Badge>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-purple-200 transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="font-bold mb-2">Paiements Intl</h3>
                  <p className="text-sm text-gray-600 mb-3">PayPal, Stripe, Wise</p>
                  <Badge className="bg-yellow-100 text-yellow-600 text-xs">Bientôt</Badge>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-green-200 transition-colors">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-bold mb-2">Crypto</h3>
                  <p className="text-sm text-gray-600 mb-3">Bitcoin, USDT, USDC</p>
                  <Badge className="bg-yellow-100 text-yellow-600 text-xs">Q2 2025</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Avantages passerelle */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Pourquoi Choisir Notre Passerelle ?
              </h2>
              <p className="text-xl text-gray-600">
                Les avantages d'une solution unifiée pensée pour l'Afrique
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-senepay-orange rounded-lg flex items-center justify-center">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    API Unifiée
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Une seule intégration pour tous les moyens de paiement. Fini les multiples APIs à maintenir.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      SDK unique
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Documentation centralisée
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-senepay-gold rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    Smart Routing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Routage intelligent vers le meilleur moyen de paiement selon le contexte client.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Taux de succès optimisé
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Fallback automatique
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    Sécurité Avancée
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Protection contre la fraude avec IA et conformité aux standards internationaux.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      PCI DSS Level 1
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Détection fraude IA
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tarification passerelle */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Tarification Transparente et Compétitive
              </h2>
              <p className="text-xl text-gray-600">
                Payez seulement pour les transactions réussies, sans frais cachés
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl border-2 border-senepay-orange/20 overflow-hidden">
                <div className="bg-gradient-to-r from-senepay-orange to-senepay-gold p-6 text-white text-center">
                  <h3 className="text-2xl font-bold mb-2">Commissions par Méthode</h3>
                  <p className="opacity-90">Les tarifs les plus compétitifs du marché</p>
                </div>
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-lg mb-4">Mobile Money</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Orange Money</span>
                          <span className="font-semibold text-green-600">1.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Wave</span>
                          <span className="font-semibold text-green-600">1.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Free Money</span>
                          <span className="font-semibold text-green-600">1.8%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-4">Cartes Bancaires</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Cartes locales</span>
                          <span className="font-semibold text-blue-600">2.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Visa/Mastercard</span>
                          <span className="font-semibold text-blue-600">2.9%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cartes internationales</span>
                          <span className="font-semibold text-blue-600">3.4%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Badge className="bg-green-100 text-green-600 mb-4 text-base px-4 py-2">
                      🎉 Pas de frais d'installation • Pas d'abonnement mensuel • Pas de frais cachés
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cas d'usage */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Cas d'Usage Passerelle de Paiement
              </h2>
              <p className="text-xl text-gray-600">
                Des solutions adaptées à tous les types d'entreprises
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-senepay-orange/30 transition-colors">
                <CardHeader>
                  <CardTitle>E-commerce</CardTitle>
                  <CardDescription>
                    Boutiques en ligne et marketplaces
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Checkout pages optimisées
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Plugins WooCommerce, Shopify
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Gestion des remboursements
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-senepay-orange/30 transition-colors">
                <CardHeader>
                  <CardTitle>Services & SaaS</CardTitle>
                  <CardDescription>
                    Abonnements et paiements récurrents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Billing automatique
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Gestion des échecs
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Facturation PDF
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-senepay-orange/30 transition-colors">
                <CardHeader>
                  <CardTitle>Applications Mobiles</CardTitle>
                  <CardDescription>
                    Paiements in-app et services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      SDK mobile natif
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Deep linking optimisé
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      UX mobile parfaite
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 bg-gradient-to-r from-senepay-orange to-senepay-gold">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Prêt à Révolutionner vos Paiements ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez plus de 1,500 entreprises qui ont choisi SenePay comme passerelle de paiement unifiée
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-white text-senepay-orange hover:bg-gray-100 px-8 py-4 text-lg">
                  <Zap className="mr-2 h-5 w-5" />
                  Commencer Gratuitement
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-senepay-orange px-8 py-4 text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  Parler à un Expert
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PasgarellePaiementSenegal;
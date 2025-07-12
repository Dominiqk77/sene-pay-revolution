import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Users, Zap, Shield, Globe, ArrowRight, Phone, CreditCard, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const PaiementMobileSenegal = () => {
  return (
    <>
      <Helmet>
        <title>Paiement Mobile Sénégal 2025 | Orange Money, Wave, Free Money API | SenePay</title>
        <meta name="description" content="Solution de paiement mobile #1 au Sénégal. Intégrez Orange Money, Wave, Free Money en 5 minutes. API simple, commissions 50% moins chères. Démo gratuite." />
        <meta name="keywords" content="paiement mobile sénégal, orange money api, wave paiement, free money, mobile money dakar, api paiement fcfa, fintech sénégal" />
        <link rel="canonical" href="https://senepay.sn/paiement-mobile-senegal" />
        
        {/* Schema markup for local business */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "SenePay - Paiement Mobile Sénégal",
          "description": "Solution de paiement mobile leader au Sénégal intégrant Orange Money, Wave, Free Money",
          "operatingSystem": "Web",
          "applicationCategory": "FinanceApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "XOF"
          },
          "featureList": [
            "Intégration Orange Money API",
            "Intégration Wave API", 
            "Intégration Free Money",
            "Commissions réduites",
            "Support technique local"
          ]
        })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section SEO optimisé */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-senepay-orange/5 via-white to-senepay-gold/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-senepay-orange/10 text-senepay-orange border-senepay-orange/20">
                #1 Paiement Mobile Sénégal 2025
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
                Solution de <span className="text-senepay-orange">Paiement Mobile</span> 
                <br />Leader au <span className="text-senepay-gold">Sénégal</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Intégrez <strong>Orange Money, Wave, Free Money</strong> et toutes les méthodes de paiement sénégalaises 
                en une seule API ultra-simple. <strong>Commissions 50% moins chères</strong> que la concurrence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/auth">
                  <Button size="lg" className="btn-senepay px-8 py-4 text-lg">
                    <Zap className="mr-2 h-5 w-5" />
                    Démarrer Gratuitement
                  </Button>
                </Link>
                <Link to="/sandbox">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white">
                    <Phone className="mr-2 h-5 w-5" />
                    Tester l'API
                  </Button>
                </Link>
              </div>
              
              {/* Stats spécifiques Sénégal */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-senepay-orange">15M+</div>
                  <div className="text-gray-600">Utilisateurs Mobile Money</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-senepay-gold">2.1%</div>
                  <div className="text-gray-600">Commission Moyenne</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-senepay-orange">99.8%</div>
                  <div className="text-gray-600">Taux de Succès</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-senepay-gold">5min</div>
                  <div className="text-gray-600">Intégration API</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Méthodes de paiement spécifiques Sénégal */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Tous les Moyens de Paiement Sénégalais
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une seule intégration pour accéder à 100% du marché des paiements au Sénégal
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Orange Money */}
              <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    Orange Money
                  </CardTitle>
                  <CardDescription>
                    Leader du mobile money au Sénégal avec 8M+ d'utilisateurs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      API officielle certifiée
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Paiements instantanés
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Commission 1.2% seulement
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Wave */}
              <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    Wave
                  </CardTitle>
                  <CardDescription>
                    Solution moderne de paiement en forte croissance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Interface utilisateur moderne
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      QR Code natif
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Commission 1.5%
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Free Money */}
              <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    Free Money & Autres
                  </CardTitle>
                  <CardDescription>
                    Free Money, Wizall, cartes bancaires locales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Couverture complète
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Cartes Visa/Mastercard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Commission variable
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Comparatif concurrence */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Pourquoi Choisir SenePay au Sénégal ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comparaison avec les autres solutions de paiement disponibles au Sénégal
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-senepay-orange/10">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Critères</th>
                        <th className="px-6 py-4 text-center font-semibold text-senepay-orange">SenePay</th>
                        <th className="px-6 py-4 text-center font-semibold">CinetPay</th>
                        <th className="px-6 py-4 text-center font-semibold">PayDunya</th>
                        <th className="px-6 py-4 text-center font-semibold">Autres</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 font-medium">Commission Orange Money</td>
                        <td className="px-6 py-4 text-center text-green-600 font-semibold">1.2%</td>
                        <td className="px-6 py-4 text-center">2.8%</td>
                        <td className="px-6 py-4 text-center">2.5%</td>
                        <td className="px-6 py-4 text-center">3.0%+</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium">Support Local Sénégal</td>
                        <td className="px-6 py-4 text-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">❌</td>
                        <td className="px-6 py-4 text-center">❌</td>
                        <td className="px-6 py-4 text-center">❌</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Intégration API</td>
                        <td className="px-6 py-4 text-center text-green-600 font-semibold">5 minutes</td>
                        <td className="px-6 py-4 text-center">2-3 jours</td>
                        <td className="px-6 py-4 text-center">1-2 jours</td>
                        <td className="px-6 py-4 text-center">1 semaine+</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium">Documentation FR</td>
                        <td className="px-6 py-4 text-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">Partielle</td>
                        <td className="px-6 py-4 text-center">❌</td>
                        <td className="px-6 py-4 text-center">❌</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages clients sénégalais */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Ils Nous Font Confiance au Sénégal
              </h2>
              <p className="text-xl text-gray-600">
                Des entreprises sénégalaises qui ont transformé leurs paiements avec SenePay
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-senepay-orange/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "SenePay a révolutionné notre e-commerce. Nos clients paient maintenant en 2 clics avec Orange Money. Le support en français est exceptionnel."
                  </p>
                  <div className="font-semibold">Amadou Diallo</div>
                  <div className="text-sm text-gray-500">CEO, BoutiqueOnline Dakar</div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-senepay-orange/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "L'intégration Wave + Orange Money nous a fait économiser 60% en commissions. Plus jamais on retourne aux anciennes solutions !"
                  </p>
                  <div className="font-semibold">Fatou Seck</div>
                  <div className="text-sm text-gray-500">Directrice, TechServices Thiès</div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-senepay-orange/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Enfin une solution pensée pour le Sénégal ! API simple, documentation claire, équipe réactive. Parfait pour notre marketplace."
                  </p>
                  <div className="font-semibold">Ousmane Ba</div>
                  <div className="text-sm text-gray-500">CTO, MarketPlace221</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 bg-gradient-to-r from-senepay-orange to-senepay-gold">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Rejoignez l'Écosystème de Paiement #1 du Sénégal
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Plus de 1,500 développeurs et entreprises sénégalaises nous font déjà confiance. 
              Et vous, quand est-ce que vous révolutionnez vos paiements ?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-white text-senepay-orange hover:bg-gray-100 px-8 py-4 text-lg">
                  <Zap className="mr-2 h-5 w-5" />
                  Commencer Maintenant
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

export default PaiementMobileSenegal;
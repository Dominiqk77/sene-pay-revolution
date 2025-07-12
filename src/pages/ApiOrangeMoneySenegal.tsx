import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Code, Smartphone, Shield, Zap, ArrowRight, Copy, Play } from "lucide-react";
import { Link } from "react-router-dom";

const ApiOrangeMoneySenegal = () => {
  const codeExample = `// Intégration Orange Money en 5 minutes
import { SenePay } from 'senepay-sdk';

const payment = await senePay.createPayment({
  amount: 5000, // 5,000 FCFA
  currency: 'XOF',
  method: 'orange_money',
  customer: {
    phone: '+221771234567',
    email: 'client@example.com'
  },
  callback_url: 'https://monsite.sn/webhook'
});

console.log('Paiement Orange Money:', payment.checkout_url);`;

  return (
    <>
      <Helmet>
        <title>API Orange Money Sénégal 2025 | Intégration Développeur | Documentation SenePay</title>
        <meta name="description" content="API Orange Money officielle pour développeurs sénégalais. Intégration 5 minutes, documentation complète, SDK prêt. Commission 1.2% seulement. Sandbox gratuit." />
        <meta name="keywords" content="api orange money, orange money développeur, intégration orange money, sdk orange money sénégal, paiement mobile api, orange money webhook" />
        <link rel="canonical" href="https://senepay.sn/api-orange-money-senegal" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-orange-50 via-white to-senepay-orange/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-orange-100 text-orange-600 border-orange-200">
                API Officielle Certifiée Orange
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
                <span className="text-orange-500">API Orange Money</span>
                <br />pour Développeurs Sénégalais
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Intégrez les paiements <strong>Orange Money</strong> en 5 minutes avec notre API simple et sécurisée. 
                <strong>Commission 1.2%</strong> seulement, la plus compétitive du marché.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/sandbox">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                    <Play className="mr-2 h-5 w-5" />
                    Tester l'API Maintenant
                  </Button>
                </Link>
                <Link to="/documentation">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                    <Code className="mr-2 h-5 w-5" />
                    Documentation Complète
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                  Intégration Orange Money Ultra-Simple
                </h2>
                <p className="text-xl text-gray-600">
                  Copiez-collez ce code et acceptez vos premiers paiements Orange Money en 5 minutes
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-2xl p-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <Copy className="h-4 w-4 mr-2" />
                    Copier
                  </Button>
                </div>
                <pre className="text-green-400 text-sm lg:text-base overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Fonctionnalités API */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Fonctionnalités API Orange Money
              </h2>
              <p className="text-xl text-gray-600">
                Tout ce dont vous avez besoin pour intégrer Orange Money sur votre plateforme
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    Paiements Instantanés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Initiez des paiements Orange Money en temps réel avec confirmation immédiate
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Confirmation en 3-5 secondes
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Support tous montants
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    Webhooks Sécurisés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Recevez les notifications de paiement en temps réel avec signature HMAC
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Retry automatique
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Signature vérifiée
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-200 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    SDK Multi-Langages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Bibliothèques prêtes à l'emploi pour tous les langages populaires
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      JavaScript, PHP, Python
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Documentation FR
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Guide d'intégration étape par étape */}
        <section className="py-16 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                  Guide d'Intégration Orange Money
                </h2>
                <p className="text-xl text-gray-600">
                  Suivez ces 4 étapes simples pour commencer à accepter Orange Money
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Créez votre compte SenePay</h3>
                    <p className="text-gray-600 mb-4">
                      Inscription gratuite en 2 minutes. Vérification instantanée pour les développeurs.
                    </p>
                    <Link to="/auth">
                      <Button variant="outline" size="sm" className="border-orange-500 text-orange-500">
                        S'inscrire gratuitement
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Obtenez vos clés API</h3>
                    <p className="text-gray-600 mb-4">
                      Générez instantanément vos clés API de test et de production depuis votre dashboard.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                      API Key: sk_test_xxxxxxxxxxxxxxxxxx<br/>
                      Secret: sk_secret_xxxxxxxxxxxxxxxxxx
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Testez dans le Sandbox</h3>
                    <p className="text-gray-600 mb-4">
                      Utilisez nos numéros de test Orange Money pour valider votre intégration.
                    </p>
                    <div className="bg-orange-100 p-4 rounded-lg">
                      <strong>Numéro test:</strong> +221 77 123 45 67<br/>
                      <strong>Code PIN:</strong> 1234
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Déployez en Production</h3>
                    <p className="text-gray-600 mb-4">
                      Basculez sur vos clés de production et commencez à encaisser vos premiers paiements !
                    </p>
                    <Badge className="bg-green-100 text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Go Live en 5 minutes
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tarification spécifique Orange Money */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Tarification Orange Money Transparente
              </h2>
              <p className="text-xl text-gray-600">
                Pas de frais cachés, pas de setup fee. Payez seulement pour vos transactions réussies
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-orange-200">
                <CardHeader className="text-center bg-orange-50">
                  <CardTitle className="text-2xl text-orange-600">Commission Orange Money</CardTitle>
                  <CardDescription>La plus compétitive du marché sénégalais</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-orange-500 mb-2">1.2%</div>
                    <div className="text-gray-600">par transaction réussie</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Transaction 10,000 FCFA</span>
                      <span className="font-semibold">120 FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transaction 50,000 FCFA</span>
                      <span className="font-semibold">600 FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transaction 100,000 FCFA</span>
                      <span className="font-semibold">1,200 FCFA</span>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Badge className="bg-green-100 text-green-600 mb-4">
                      50% moins cher que la concurrence
                    </Badge>
                    <br/>
                    <Link to="/auth">
                      <Button className="bg-orange-500 hover:bg-orange-600 px-8">
                        Commencer Maintenant
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ApiOrangeMoneySenegal;
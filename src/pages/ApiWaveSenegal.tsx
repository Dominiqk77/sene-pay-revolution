import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Code, Zap, Shield, QrCode, ArrowRight, Copy, Play } from "lucide-react";
import { Link } from "react-router-dom";

const ApiWaveSenegal = () => {
  const codeExample = `// Intégration API Wave en 5 minutes
import { SenePay } from 'senepay-sdk';

const payment = await senePay.createPayment({
  amount: 25000, // 25,000 FCFA
  currency: 'XOF',
  method: 'wave',
  customer: {
    phone: '+221781234567',
    email: 'client@example.com'
  },
  success_url: 'https://monsite.sn/success',
  cancel_url: 'https://monsite.sn/cancel'
});

// Redirection automatique vers Wave
window.location.href = payment.checkout_url;`;

  return (
    <>
      <Helmet>
        <title>API Wave Sénégal 2025 | Intégration Développeur | SDK Wave Payment</title>
        <meta name="description" content="API Wave officielle pour développeurs sénégalais. Intégration Wave en 5 minutes, QR Code natif, commission 1.5%. Documentation complète et SDK prêt." />
        <meta name="keywords" content="api wave, wave payment api, intégration wave sénégal, sdk wave, wave développeur, qr code wave, paiement mobile wave" />
        <link rel="canonical" href="https://senepay.sn/api-wave-senegal" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-100 text-blue-600 border-blue-200">
                API Wave Nouvelle Génération
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
                <span className="text-blue-500">API Wave</span>
                <br />Moderne et Rapide
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Intégrez les paiements <strong>Wave</strong> avec QR Code natif et interface moderne. 
                <strong>Commission 1.5%</strong> pour une expérience utilisateur exceptionnelle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/sandbox">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg">
                    <Play className="mr-2 h-5 w-5" />
                    Tester l'API Wave
                  </Button>
                </Link>
                <Link to="/documentation">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                    <Code className="mr-2 h-5 w-5" />
                    Documentation Wave
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
                  Intégration Wave Ultra-Simple
                </h2>
                <p className="text-xl text-gray-600">
                  API moderne avec redirect automatique et gestion QR Code intégrée
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
                <pre className="text-blue-400 text-sm lg:text-base overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages Wave */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Pourquoi Choisir Wave au Sénégal ?
              </h2>
              <p className="text-xl text-gray-600">
                Wave révolutionne l'expérience de paiement mobile avec une technologie de pointe
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <QrCode className="h-6 w-6 text-white" />
                    </div>
                    QR Code Natif
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Paiements par QR Code intégrés nativement dans l'app Wave
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Scan instantané
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      UX optimisée
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    Interface Moderne
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Interface utilisateur moderne et intuitive qui plait aux jeunes
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Design épuré
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Navigation fluide
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    Sécurité Renforcée
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Protocoles de sécurité avancés et authentification biométrique
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Empreinte digitale
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Chiffrement bout-en-bout
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparaison Wave vs Orange Money */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Wave vs Orange Money au Sénégal
              </h2>
              <p className="text-xl text-gray-600">
                Comparaison objective des deux solutions de paiement mobile
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Critères</th>
                        <th className="px-6 py-4 text-center font-semibold text-blue-600">Wave</th>
                        <th className="px-6 py-4 text-center font-semibold text-orange-600">Orange Money</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 font-medium">Commission SenePay</td>
                        <td className="px-6 py-4 text-center text-blue-600 font-semibold">1.5%</td>
                        <td className="px-6 py-4 text-center text-orange-600 font-semibold">1.2%</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium">Interface Utilisateur</td>
                        <td className="px-6 py-4 text-center">⭐⭐⭐⭐⭐</td>
                        <td className="px-6 py-4 text-center">⭐⭐⭐⭐</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">QR Code Natif</td>
                        <td className="px-6 py-4 text-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        </td>
                        <td className="px-6 py-4 text-center">❌</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium">Adoption Jeunes (18-35)</td>
                        <td className="px-6 py-4 text-center text-green-600 font-semibold">85%</td>
                        <td className="px-6 py-4 text-center">65%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Base Utilisateurs Totale</td>
                        <td className="px-6 py-4 text-center">3M+</td>
                        <td className="px-6 py-4 text-center text-orange-600 font-semibold">8M+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guide d'intégration Wave */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                  Intégrer Wave en 4 Étapes
                </h2>
                <p className="text-xl text-gray-600">
                  Configuration rapide pour commencer à accepter Wave
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Configuration Compte</h3>
                    <p className="text-gray-600 mb-4">
                      Activez Wave dans votre dashboard SenePay en un clic
                    </p>
                    <Link to="/dashboard">
                      <Button variant="outline" size="sm" className="border-blue-500 text-blue-500">
                        Activer Wave
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">URLs de Callback</h3>
                    <p className="text-gray-600 mb-4">
                      Configurez vos URLs de succès et d'annulation pour le redirect
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                      success_url: "https://monsite.sn/success"<br/>
                      cancel_url: "https://monsite.sn/cancel"
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Test avec Sandbox</h3>
                    <p className="text-gray-600 mb-4">
                      Utilisez notre environnement de test Wave pour valider
                    </p>
                    <div className="bg-blue-100 p-4 rounded-lg">
                      <strong>Compte test:</strong> +221 78 123 45 67<br/>
                      <strong>Montant test:</strong> 1000-100000 FCFA
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Production Ready</h3>
                    <p className="text-gray-600 mb-4">
                      Basculez en mode production et encaissez vos premiers paiements Wave
                    </p>
                    <Badge className="bg-green-100 text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      API Wave opérationnelle
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Prêt à Intégrer Wave ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez les entreprises qui offrent l'expérience de paiement mobile la plus moderne du Sénégal
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sandbox">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Tester l'API Wave
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Créer un Compte
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

export default ApiWaveSenegal;
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Code, Zap, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Sandbox = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Environnement de Test",
      description: "Simulez des paiements et des transferts dans un environnement isolé"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Données de Test",
      description: "Accédez à des cartes bancaires et numéros de téléphone de test"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Webhooks de Simulation",
      description: "Recevez des webhooks simulés pour tester votre intégration"
    },
    {
      icon: <Play className="h-8 w-8" />,
      title: "Scénarios Préconfigurés",
      description: "Testez des cas d'usage courants avec des scénarios prêts à l'emploi"
    }
  ];

  const useCases = [
    {
      title: "Intégration API",
      description: "Validez votre intégration de l'API de paiement",
      icon: <Code className="h-12 w-12" />
    },
    {
      title: "Tests de Webhooks",
      description: "Simulez et validez la réception de webhooks",
      icon: <Zap className="h-12 w-12" />
    },
    {
      title: "Flux de Remboursement",
      description: "Testez les flux de remboursement et d'annulation",
      icon: <Shield className="h-12 w-12" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-senepay-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Play className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Bac à Sable Développeur
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Testez notre API de paiement dans un environnement sécurisé
              </p>
              <div className="flex justify-center gap-4">
                <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                  API REST
                </Badge>
                <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                  Webhooks
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-senepay-gold/10 rounded-lg inline-block mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              ))}
            </div>

            {/* Quick Start */}
            <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-senepay-dark">
                  Démarrage Rapide
                </h2>
                <p className="text-lg text-gray-700">
                  Suivez ces étapes pour commencer à tester notre API
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Créer un Compte</h4>
                  <p className="text-gray-600">Inscrivez-vous gratuitement sur notre plateforme</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Obtenir les Clés</h4>
                  <p className="text-gray-600">Récupérez vos clés API dans votre tableau de bord</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Tester l'API</h4>
                  <p className="text-gray-600">Utilisez nos données de test pour simuler des paiements</p>
                </div>
              </div>
            </Card>

            {/* Use Cases */}
            <Card className="p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
                Cas d'Usage
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className="text-center">
                    <div className="p-4 bg-senepay-gold/10 rounded-lg mb-4">
                      {useCase.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{useCase.title}</h4>
                    <p className="text-sm text-gray-600">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Test Data */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-senepay-dark">
                  Données de Test
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Utilisez ces données pour simuler des paiements réussis ou échoués.
                  </p>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Cartes Bancaires</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Visa: 4111111111111111, Exp: 12/24, CVV: 123
                      </p>
                      <p className="text-sm text-gray-600">
                        Mastercard: 5222222222222222, Exp: 12/24, CVV: 123
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Numéros de Téléphone</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Numéro Succès: +221770000000
                      </p>
                      <p className="text-sm text-gray-600">
                        Numéro Échec: +221779999999
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Webhooks de Test</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Configurez votre URL de webhook pour recevoir des notifications en temps réel.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                      <code>{`// Exemple de Webhook
{
  "type": "payment.succeeded",
  "data": {
    "id": "PAY_123",
    "amount": 25000,
    "currency": "XOF",
    "status": "succeeded"
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </Card>
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Prêt à Intégrer ?
                </h3>
                <p className="text-lg mb-6 opacity-90 text-white">
                  Accédez à notre documentation complète et nos exemples de code
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate('/api-documentation')}
                    className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                  >
                    Documentation API
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/sdks')}
                    className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                  >
                    Télécharger SDKs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sandbox;

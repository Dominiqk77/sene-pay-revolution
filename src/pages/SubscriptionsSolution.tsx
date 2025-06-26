
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Repeat, Calendar, CreditCard, TrendingUp, Users, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubscriptionsSolution = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Repeat className="h-8 w-8" />,
      title: "Paiements Récurrents",
      description: "Automatisation complète des prélèvements selon vos cycles"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Cycles Flexibles",
      description: "Hebdomadaire, mensuel, trimestriel, annuel ou personnalisé"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Retry Intelligent",
      description: "Gestion automatique des échecs avec retry progressif"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Analytics MRR",
      description: "Suivi en temps réel de vos revenus récurrents"
    }
  ];

  const subscriptionTypes = [
    {
      title: "Abonnements Simples",
      description: "Paiement récurrent fixe à intervalles réguliers",
      examples: ["Services SaaS", "Abonnements média", "Coaching en ligne"]
    },
    {
      title: "Usage Metered",
      description: "Facturation basée sur la consommation réelle",
      examples: ["API calls", "Stockage cloud", "SMS/Email marketing"]
    },
    {
      title: "Abonnements Hybrides",
      description: "Combinaison de frais fixes et variables",
      examples: ["Télécom", "Plateformes e-learning", "Services B2B"]
    }
  ];

  const benefits = [
    "Configuration d'abonnements en 5 minutes",
    "Essais gratuits et périodes de grâce",
    "Upgrades/Downgrades automatiques",
    "Facturation proratisée intelligente",
    "Codes promo et remises récurrentes",
    "Notifications clients automatiques",
    "Rapports comptables détaillés",
    "Intégration webhook temps réel"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Repeat className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Solutions Abonnements
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Automatisez vos revenus récurrents avec notre système d'abonnements
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                Paiements Récurrents
              </Badge>
              <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                MRR Tracking
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

          {/* How Subscriptions Work */}
          <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-senepay-dark">
                Gestion Automatisée des Abonnements
              </h2>
              <p className="text-lg text-gray-700">
                De l'inscription au renouvellement, notre système gère tout
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Inscription</h4>
                <p className="text-gray-600">Client choisit son plan et mode de paiement</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Essai Gratuit</h4>
                <p className="text-gray-600">Période d'essai configurable avant facturation</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Repeat className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Renouvellement</h4>
                <p className="text-gray-600">Prélèvements automatiques selon le cycle</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Analytics</h4>
                <p className="text-gray-600">Suivi MRR et métriques d'abonnements</p>
              </div>
            </div>
          </Card>

          {/* Subscription Types */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-senepay-dark">
              Types d'Abonnements Supportés
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {subscriptionTypes.map((type, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-senepay-dark">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Exemples :</p>
                    {type.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-center">
                        <span className="w-2 h-2 bg-senepay-gold rounded-full mr-2"></span>
                        <span className="text-sm text-gray-600">{example}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-senepay-dark">
                Fonctionnalités Avancées
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-senepay-green mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Exemple de Configuration</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  <code>{`{
  "plan": {
    "name": "Pro Monthly",
    "amount": 15000,
    "currency": "XOF",
    "interval": "month",
    "trial_days": 14
  },
  "customer": {
    "email": "client@startup.sn",
    "phone": "+221771234567"
  },
  "features": {
    "proration": true,
    "retry_failed": true,
    "send_invoices": true
  }
}`}</code>
                </pre>
              </div>
            </Card>
          </div>

          {/* Pricing */}
          <Card className="p-8 mb-12 bg-senepay-green/5 border-senepay-green/20">
            <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
              Tarification Abonnements
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Frais de Transaction</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Paiements récurrents</span>
                    <Badge variant="outline" className="text-senepay-green border-senepay-green">1.8%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Paiements one-time</span>
                    <Badge variant="outline">2.5%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Gestion des échecs</span>
                    <Badge variant="outline" className="text-senepay-green border-senepay-green">Gratuit</Badge>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Fonctionnalités Incluses</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-senepay-green mr-2" />
                    <span className="text-sm">Dashboard analytics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-senepay-green mr-2" />
                    <span className="text-sm">Webhooks illimités</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-senepay-green mr-2" />
                    <span className="text-sm">Support prioritaire</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-senepay-green mr-2" />
                    <span className="text-sm">Rapports comptables</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Lancez Vos Abonnements Dès Aujourd'hui
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Configuration rapide et intégration en moins d'une heure
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/sandbox')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Tester Gratuitement
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/contact')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
                  Demander une Démo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsSolution;

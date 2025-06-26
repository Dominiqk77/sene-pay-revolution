import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cloud, CreditCard, Users, BarChart, Repeat, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SaaSSolution = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Repeat className="h-8 w-8" />,
      title: "Abonnements Récurrents",
      description: "Gestion automatique des paiements mensuels, trimestriels ou annuels"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Facturation Flexible",
      description: "Cycles de facturation personnalisés et gestion des upgrades/downgrades"
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Métriques SaaS",
      description: "MRR, ARR, Churn rate et autres KPIs essentiels en temps réel"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Gestion Clients",
      description: "Portail client intégré pour gérer abonnements et paiements"
    }
  ];

  const benefits = [
    "Prélèvements automatiques récurrents",
    "Gestion des échecs de paiement",
    "Facturation proratisée",
    "Essais gratuits et périodes de grâce",
    "Coupons et codes promo",
    "Webhooks pour chaque événement",
    "Exportation comptable automatique",
    "Support multi-devises"
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Gratuit",
      description: "Jusqu'à 100 clients récurrents",
      features: ["Paiements récurrents", "Dashboard basique", "Support email"]
    },
    {
      name: "Business",
      price: "25,000 FCFA/mois",
      description: "Jusqu'à 1,000 clients récurrents", 
      features: ["Toutes les fonctionnalités Starter", "Métriques avancées", "Webhooks", "Support prioritaire"]
    },
    {
      name: "Enterprise",
      price: "Sur mesure",
      description: "Clients illimités",
      features: ["Toutes les fonctionnalités", "SLA personnalisé", "Intégration dédiée", "Account manager"]
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
              <Cloud className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Solutions SaaS
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Monétisez votre SaaS avec des paiements récurrents automatisés
              </p>
              <div className="flex justify-center gap-4">
                <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                  Paiements Récurrents
                </Badge>
                <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                  Métriques MRR/ARR
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

            {/* Workflow */}
            <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-senepay-dark">
                  Automatisation Complète
                </h2>
                <p className="text-lg text-gray-700">
                  De l'inscription au renouvellement, tout est automatisé
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Inscription</h4>
                  <p className="text-gray-600 text-sm">Client s'inscrit et choisit son plan</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Premier Paiement</h4>
                  <p className="text-gray-600 text-sm">Paiement initial avec période d'essai optionnelle</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Renouvellement</h4>
                  <p className="text-gray-600 text-sm">Prélèvements automatiques selon le cycle choisi</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Gestion</h4>
                  <p className="text-gray-600 text-sm">Upgrades, downgrades et annulations automatiques</p>
                </div>
              </div>
            </Card>

            {/* Benefits */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-senepay-dark">
                  Avantages SaaS
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
                <h3 className="text-xl font-bold mb-4">Métriques en Temps Réel</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>MRR (Monthly Recurring Revenue)</span>
                    <Badge className="bg-senepay-green">+15%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ARR (Annual Recurring Revenue)</span>
                    <Badge className="bg-senepay-green">+22%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Churn Rate</span>
                    <Badge variant="outline">2.3%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Lifetime Value</span>
                    <Badge className="bg-senepay-gold text-black">150,000 FCFA</Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Pricing */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-senepay-dark">
                Tarification SaaS
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {pricingPlans.map((plan, index) => (
                  <Card key={index} className={`p-6 ${index === 1 ? 'border-senepay-gold border-2 relative' : ''}`}>
                    {index === 1 && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-senepay-gold text-black">
                        Populaire
                      </Badge>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-senepay-dark mb-2">{plan.price}</div>
                      <p className="text-gray-600 text-sm">{plan.description}</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-senepay-green mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${index === 1 ? 'bg-senepay-gold hover:bg-senepay-orange' : 'bg-gray-800 hover:bg-gray-700'}`}
                      onClick={() => navigate('/contact')}
                    >
                      {plan.name === 'Enterprise' ? 'Nous Contacter' : 'Commencer'}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Boostez Votre MRR Dès Aujourd'hui
                </h3>
                <p className="text-lg mb-6 opacity-90 text-white">
                  Intégration rapide avec votre SaaS existant
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
                    onClick={() => navigate('/api-documentation')}
                    className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                  >
                    Documentation
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

export default SaaSSolution;


import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Zap, Shield, TrendingUp, Users, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EcommerceSolution = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Tous les Moyens de Paiement",
      description: "Orange Money, Wave, Free Money, Wizall, cartes bancaires et crypto-monnaies en une seule intégration",
      benefits: ["Conversion +40%", "Abandon panier -60%", "Satisfaction client +80%"]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Intégration Ultra-Rapide",
      description: "Intégrez SenePay à votre boutique en ligne en moins de 5 minutes avec nos plugins prêts à l'emploi",
      benefits: ["Setup 5 minutes", "Plugins WooCommerce/Shopify", "API REST simple"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Sécurité Maximale",
      description: "Protection anti-fraude IA, chiffrement bout-en-bout et conformité PCI DSS Level 1",
      benefits: ["Fraude <0.1%", "Chargeback protection", "PCI DSS Level 1"]
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Analytics Avancées",
      description: "Tableaux de bord en temps réel, insights conversion et optimisation automatique des paiements",
      benefits: ["Dashboard temps réel", "Insights IA", "Optimisation auto"]
    }
  ];

  const useCases = [
    {
      title: "Mode & Lifestyle",
      description: "Boutiques de vêtements, accessoires et produits de beauté",
      icon: "👗",
      stats: "+65% conversion mobile"
    },
    {
      title: "Électronique & Tech",
      description: "Vente d'appareils électroniques et accessoires tech",
      icon: "📱",
      stats: "+45% panier moyen"
    },
    {
      title: "Alimentation & Livraison",
      description: "Restaurants, épiceries et services de livraison",
      icon: "🍕",
      stats: "+80% commandes récurrentes"
    },
    {
      title: "Services & Consultations",
      description: "Professionnels, formations et services en ligne",
      icon: "💼",
      stats: "+90% paiements réussis"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Solutions E-commerce
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Boostez vos ventes en ligne avec la passerelle de paiement la plus avancée d'Afrique de l'Ouest
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                +40% Conversion
              </Badge>
              <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                Setup 5 min
              </Badge>
              <Badge variant="outline" className="bg-senepay-orange text-white border-senepay-orange">
                Tous paiements
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Success Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-senepay-gold mb-2">850+</div>
              <div className="text-gray-600 text-sm">Boutiques Actives</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-senepay-gold mb-2">12M FCFA</div>
              <div className="text-gray-600 text-sm">Volume Quotidien</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-senepay-gold mb-2">97.8%</div>
              <div className="text-gray-600 text-sm">Taux de Réussite</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-senepay-gold mb-2">&lt;2s</div>
              <div className="text-gray-600 text-sm">Temps de Réponse</div>
            </Card>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-senepay-dark">
              Fonctionnalités Révolutionnaires
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-senepay-gold/10 rounded-lg mr-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-senepay-dark">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, bIndex) => (
                      <div key={bIndex} className="flex items-center">
                        <span className="w-2 h-2 bg-senepay-green rounded-full mr-3"></span>
                        <span className="text-sm font-medium text-senepay-green">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-senepay-dark">
              Cas d'Usage Populaires
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-lg font-bold mb-2 text-senepay-dark">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {useCase.description}
                  </p>
                  <Badge className="bg-senepay-green text-white">
                    {useCase.stats}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>

          {/* Integration */}
          <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8 text-senepay-dark">
                Intégration Sans Effort
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold">1</span>
                  </div>
                  <h3 className="font-bold mb-2">Inscription</h3>
                  <p className="text-sm text-gray-600">Créez votre compte marchand en 2 minutes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold">2</span>
                  </div>
                  <h3 className="font-bold mb-2">Configuration</h3>
                  <p className="text-sm text-gray-600">Installez notre plugin ou intégrez l'API</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold">3</span>
                  </div>
                  <h3 className="font-bold mb-2">Activation</h3>
                  <p className="text-sm text-gray-600">Commencez à accepter des paiements</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Testimonial */}
          <Card className="p-8 mb-12 bg-senepay-green/5 border-senepay-green/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-senepay-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <blockquote className="text-xl italic text-gray-700 mb-6">
                "Depuis que nous utilisons SenePay, nos ventes ont augmenté de 65% et nous n'avons plus de problèmes d'abandons de panier. L'intégration était très simple !"
              </blockquote>
              <div className="font-bold text-senepay-dark">
                Fatou Diop, Fondatrice de DakarStyle
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Prêt à Booster vos Ventes ?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Rejoignez 850+ marchands qui font confiance à SenePay
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Commencer Gratuitement
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/contact')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
                  Parler à un Expert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceSolution;

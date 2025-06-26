
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, Users, DollarSign, TrendingUp, Shield, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MarketplaceSolution = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Multi-Vendeurs",
      description: "Gestion automatique des paiements entre acheteurs et multiples vendeurs"
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Répartition Automatique",
      description: "Distribution automatique des fonds selon vos règles de commission"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Escrow Sécurisé",
      description: "Système de séquestre pour protéger acheteurs et vendeurs"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Analytics Avancés",
      description: "Tableaux de bord détaillés pour chaque vendeur et la marketplace"
    }
  ];

  const benefits = [
    "Onboarding vendeurs automatisé",
    "KYC/Vérification intégrée",
    "Paiements instantanés ou programmés",
    "Gestion des litiges simplifiée",
    "API REST complète",
    "Webhooks temps réel"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Store className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Solutions Marketplace
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              La plateforme de paiement parfaite pour votre marketplace multi-vendeurs
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                Multi-Vendeurs
              </Badge>
              <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                Escrow Intégré
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

          {/* How it Works */}
          <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-senepay-dark">
                Comment ça Marche ?
              </h2>
              <p className="text-lg text-gray-700">
                Un système complet pour gérer tous les aspects financiers de votre marketplace
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Client Paie</h4>
                <p className="text-gray-600">Le client effectue son paiement pour un ou plusieurs vendeurs</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Escrow Sécurisé</h4>
                <p className="text-gray-600">Les fonds sont sécurisés jusqu'à validation de la livraison</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">Distribution</h4>
                <p className="text-gray-600">Répartition automatique selon vos règles de commission</p>
              </div>
            </div>
          </Card>

          {/* Benefits */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-senepay-dark">
                Pourquoi Choisir SenePay ?
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
              <h3 className="text-xl font-bold mb-4">Tarification Transparente</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Commission Marketplace</span>
                  <Badge variant="outline">2.5% + 0.5%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Frais Escrow</span>
                  <Badge variant="outline">0.3%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Payout Vendeurs</span>
                  <Badge variant="outline">Gratuit</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Setup & Intégration</span>
                  <Badge variant="outline">Gratuit</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Use Cases */}
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
              Cas d'Usage Parfaits
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-4 bg-senepay-gold/10 rounded-lg mb-4">
                  <Store className="h-12 w-12 mx-auto text-senepay-gold" />
                </div>
                <h4 className="font-semibold mb-2">E-commerce Multi-Vendeurs</h4>
                <p className="text-sm text-gray-600">Marketplaces généralistes avec de nombreux marchands</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-senepay-gold/10 rounded-lg mb-4">
                  <Users className="h-12 w-12 mx-auto text-senepay-gold" />
                </div>
                <h4 className="font-semibold mb-2">Services Freelance</h4>
                <p className="text-sm text-gray-600">Plateformes de services avec paiements à la livraison</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-senepay-gold/10 rounded-lg mb-4">
                  <Zap className="h-12 w-12 mx-auto text-senepay-gold" />
                </div>
                <h4 className="font-semibold mb-2">Économie Collaborative</h4>
                <p className="text-sm text-gray-600">Plateformes de partage avec transactions peer-to-peer</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Lancez Votre Marketplace Aujourd'hui
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Intégration complète en moins de 48h avec notre équipe dédiée
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Demander une Démo
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
  );
};

export default MarketplaceSolution;

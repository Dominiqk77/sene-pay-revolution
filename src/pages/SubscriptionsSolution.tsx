import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Repeat, Calendar, CreditCard, BarChart, Users, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SubscriptionsSolution = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Repeat className="h-8 w-8" />,
      title: "Paiements Récurrents",
      description: "Encaissez automatiquement les abonnements de vos clients"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Plans Flexibles",
      description: "Créez des plans d'abonnement personnalisés (mensuel, annuel, etc.)"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Gestion des Cartes",
      description: "Vos clients peuvent enregistrer et gérer leurs cartes bancaires"
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Analytics Abonnements",
      description: "Suivez la croissance de vos revenus récurrents"
    }
  ];

  const benefits = [
    "Facturation automatique",
    "Relances en cas d'échec",
    "Portail client en marque blanche",
    "Intégration API simple",
    "Support multi-devises",
    "Notifications webhook"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-senepay-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Repeat className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Solutions Abonnements
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                La plateforme idéale pour gérer vos abonnements et paiements récurrents
              </p>
              <div className="flex justify-center gap-4">
                <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                  Plans Flexibles
                </Badge>
                <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                  Relances Automatiques
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
                  Un système complet pour gérer tous vos abonnements
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Client S'abonne</h4>
                  <p className="text-gray-600">Le client choisit son plan et enregistre sa carte</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Paiement Automatique</h4>
                  <p className="text-gray-600">Le paiement est débité automatiquement à chaque échéance</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Suivi & Analytics</h4>
                  <p className="text-gray-600">Suivez la performance de vos abonnements en temps réel</p>
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
                <h3 className="text-xl font-bold mb-4">Tarification Simple</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Commission par Transaction</span>
                    <Badge variant="outline">1.5%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Frais d'Abonnement</span>
                    <Badge variant="outline">Gratuit</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Support & Intégration</span>
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
                    <Repeat className="h-12 w-12 mx-auto text-senepay-gold" />
                  </div>
                  <h4 className="font-semibold mb-2">Abonnements SaaS</h4>
                  <p className="text-sm text-gray-600">Logiciels et plateformes avec paiements mensuels</p>
                </div>
                
                <div className="text-center">
                  <div className="p-4 bg-senepay-gold/10 rounded-lg mb-4">
                    <Calendar className="h-12 w-12 mx-auto text-senepay-gold" />
                  </div>
                  <h4 className="font-semibold mb-2">Contenu Premium</h4>
                  <p className="text-sm text-gray-600">Sites de contenu avec accès payant récurrent</p>
                </div>
                
                <div className="text-center">
                  <div className="p-4 bg-senepay-gold/10 rounded-lg mb-4">
                    <Users className="h-12 w-12 mx-auto text-senepay-gold" />
                  </div>
                  <h4 className="font-semibold mb-2">Adhésions & Cotisations</h4>
                  <p className="text-sm text-gray-600">Associations et clubs avec cotisations régulières</p>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Boostez Vos Revenus Récurrents
                </h3>
                <p className="text-lg mb-6 opacity-90 text-white">
                  La solution simple et efficace pour gérer vos abonnements
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
      <Footer />
    </div>
  );
};

export default SubscriptionsSolution;

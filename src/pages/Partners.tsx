
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, Building, Globe, Users, Star, ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Partners = () => {
  const navigate = useNavigate();

  const partnerTypes = [
    {
      title: "Partenaires Technologiques",
      icon: <Building className="h-8 w-8" />,
      description: "Intégrations et solutions techniques avancées",
      partners: ["Stripe", "AWS", "MongoDB", "Twilio"],
      benefits: ["Intégration privilégiée", "Support technique dédié", "Co-marketing"]
    },
    {
      title: "Partenaires de Distribution",
      icon: <Globe className="h-8 w-8" />,
      description: "Expansion commerciale et développement de marché",
      partners: ["Orange Business", "Sonatel", "Wari", "Expresso"],
      benefits: ["Commissions attractives", "Matériel marketing", "Formation équipes"]
    },
    {
      title: "Partenaires Intégrateurs",
      icon: <Users className="h-8 w-8" />,
      description: "Agences et développeurs spécialisés",
      partners: ["Agence Digital", "SenTech", "WebForce3", "ATOS Sénégal"],
      benefits: ["Certification officielle", "Leads qualifiés", "Support prioritaire"]
    }
  ];

  const majorPartners = [
    {
      name: "Orange Money",
      logo: "🟠",
      type: "Opérateur Mobile",
      description: "Partenariat stratégique pour l'intégration Mobile Money",
      since: "2023",
      status: "Gold Partner"
    },
    {
      name: "Wave",
      logo: "🌊", 
      type: "Fintech",
      description: "Intégration native des paiements Wave",
      since: "2024",
      status: "Strategic Partner"
    },
    {
      name: "Jumia",
      logo: "🛍️",
      type: "E-commerce",
      description: "Solution de paiement pour la plus grande marketplace africaine",
      since: "2024",
      status: "Enterprise Partner"
    },
    {
      name: "Sonatel",
      logo: "📱",
      type: "Télécommunications", 
      description: "Partenariat technologique et commercial",
      since: "2023",
      status: "Gold Partner"
    },
    {
      name: "BCEAO",
      logo: "🏛️",
      type: "Institution Financière",
      description: "Conformité réglementaire et supervision",
      since: "2023",
      status: "Regulatory Partner"
    },
    {
      name: "AWS",
      logo: "☁️",
      type: "Cloud Provider",
      description: "Infrastructure cloud et services techniques",
      since: "2023",
      status: "Technology Partner"
    }
  ];

  const partnershipBenefits = [
    {
      icon: <Star className="h-6 w-6" />,
      title: "Accès Privilégié",
      description: "API priority access et nouvelles fonctionnalités en avant-première"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Support Dédié",
      description: "Équipe support technique et commercial dédiée"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Co-Marketing",
      description: "Campagnes marketing communes et visibilité partagée"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Certification",
      description: "Certification officielle SenePay et badges de partenaire"
    }
  ];

  const getPartnerStatusColor = (status: string) => {
    switch (status) {
      case "Strategic Partner": return "bg-purple-100 text-purple-800";
      case "Gold Partner": return "bg-yellow-100 text-yellow-800";
      case "Enterprise Partner": return "bg-blue-100 text-blue-800";
      case "Technology Partner": return "bg-green-100 text-green-800";
      case "Regulatory Partner": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Handshake className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Partenaires
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Ensemble, nous révolutionnons l'écosystème des paiements digitaux
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                50+ Partenaires
              </Badge>
              <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                8 Pays Couverts
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Partnership Value */}
          <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-senepay-dark">
                Pourquoi Devenir Partenaire ?
              </h2>
              <p className="text-lg text-gray-700">
                Rejoignez l'écosystème SenePay et participez à la transformation digitale de l'Afrique
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipBenefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="p-3 bg-senepay-gold/10 rounded-lg inline-block mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Major Partners */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-senepay-dark">
              Partenaires Stratégiques
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {majorPartners.map((partner, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{partner.logo}</span>
                      <div>
                        <h3 className="font-bold text-lg">{partner.name}</h3>
                        <p className="text-sm text-gray-600">{partner.type}</p>
                      </div>
                    </div>
                    <Badge className={getPartnerStatusColor(partner.status)}>
                      {partner.status}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4">{partner.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Partenaire depuis {partner.since}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Partner Types */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-senepay-dark">
              Types de Partenariats
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {partnerTypes.map((type, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-senepay-gold/10 rounded-lg mr-4">
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-bold text-senepay-dark">{type.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Exemples de Partenaires:</h4>
                    <div className="flex flex-wrap gap-1">
                      {type.partners.map((partner, partnerIndex) => (
                        <Badge key={partnerIndex} variant="outline" className="text-xs">
                          {partner}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Avantages:</h4>
                    <ul className="space-y-1">
                      {type.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm">
                          <span className="w-1.5 h-1.5 bg-senepay-gold rounded-full mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
              Success Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🛍️</span>
                  <div>
                    <h4 className="font-bold">Jumia x SenePay</h4>
                    <p className="text-sm text-gray-600">E-commerce Partnership</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  "Grâce à SenePay, nous avons augmenté notre taux de conversion de 35% 
                  au Sénégal en intégrant tous les moyens de paiement locaux."
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  <span>+35% Conversion Rate</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">💻</span>
                  <div>
                    <h4 className="font-bold">SenTech x SenePay</h4>
                    <p className="text-sm text-gray-600">Integration Partner</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  "En tant qu'intégrateur certifié SenePay, nous avons développé 
                  plus de 50 solutions e-commerce pour nos clients."
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <Users className="h-3 w-3 text-green-500 mr-1" />
                  <span>50+ Projets Livrés</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Partnership Process */}
          <Card className="p-8 mb-12 bg-senepay-green/5 border-senepay-green/20">
            <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
              Processus de Partenariat
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h4 className="font-semibold mb-2">Candidature</h4>
                <p className="text-sm text-gray-600">Soumettez votre dossier de partenariat</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h4 className="font-semibold mb-2">Évaluation</h4>
                <p className="text-sm text-gray-600">Analyse de compatibilité et synergies</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h4 className="font-semibold mb-2">Négociation</h4>
                <p className="text-sm text-gray-600">Définition des termes du partenariat</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">4</span>
                </div>
                <h4 className="font-semibold mb-2">Activation</h4>
                <p className="text-sm text-gray-600">Lancement officiel du partenariat</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Intéressé par un Partenariat ?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Explorons ensemble les opportunités de collaboration
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Devenir Partenaire
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/about')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
                  En Savoir Plus
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

export default Partners;

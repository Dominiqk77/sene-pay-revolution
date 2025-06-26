
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileText, AlertTriangle, CheckCircle, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  const terms = [
    {
      title: "Utilisation du Service",
      icon: <FileText className="h-6 w-6" />,
      content: [
        "Vous devez être âgé d'au moins 18 ans pour utiliser SenePay",
        "Vous êtes responsable de maintenir la confidentialité de votre compte",
        "Utilisation strictement conforme aux lois en vigueur",
        "Interdiction d'utiliser le service à des fins illégales"
      ]
    },
    {
      title: "Frais et Paiements",
      icon: <Scale className="h-6 w-6" />,
      content: [
        "Les frais de transaction sont clairement affichés avant validation",
        "Facturation automatique selon votre plan d'abonnement",
        "Remboursements possibles selon nos conditions",
        "Modification des tarifs avec préavis de 30 jours"
      ]
    },
    {
      title: "Responsabilités",
      icon: <CheckCircle className="h-6 w-6" />,
      content: [
        "SenePay s'engage à fournir un service fiable et sécurisé",
        "Garantie de disponibilité de 99.9%",
        "Support technique disponible 24h/7j",
        "Respect des standards de sécurité internationaux"
      ]
    },
    {
      title: "Limitations",
      icon: <AlertTriangle className="h-6 w-6" />,
      content: [
        "Responsabilité limitée aux frais de transaction",
        "Aucune garantie sur les performances des sites tiers",
        "Exclusion de responsabilité pour les pertes indirectes",
        "Limitation de responsabilité selon la loi sénégalaise"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Conditions d'Utilisation
            </h1>
            <p className="text-xl text-gray-300">
              Cadre légal pour l'utilisation de SenePay
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Dernière mise à jour : 26 juin 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <h2 className="text-2xl font-bold mb-4 text-senepay-dark">
              Accord d'Utilisation
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              En utilisant les services SenePay, vous acceptez d'être lié par ces conditions d'utilisation. 
              Ces conditions régissent votre utilisation de notre plateforme de paiement et de tous les 
              services associés.
            </p>
          </Card>

          {/* Terms Sections */}
          <div className="grid gap-8 mb-12">
            {terms.map((term, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-senepay-gold/10 rounded-lg mr-4">
                    {term.icon}
                  </div>
                  <h3 className="text-xl font-bold text-senepay-dark">
                    {term.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {term.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-senepay-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Conformité Réglementaire */}
          <Card className="p-8 mb-8 bg-senepay-green/5 border-senepay-green/20">
            <h2 className="text-2xl font-bold mb-6 text-senepay-dark">
              Conformité Réglementaire
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">BCEAO</h4>
                <p className="text-gray-700 text-sm">
                  Conformité aux réglementations de la Banque Centrale des États de l'Afrique de l'Ouest.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">PCI DSS</h4>
                <p className="text-gray-700 text-sm">
                  Certification PCI DSS Level 1 pour la sécurité des données de paiement.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">AML/KYC</h4>
                <p className="text-gray-700 text-sm">
                  Respect des procédures de lutte contre le blanchiment et connaissance client.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">GDPR</h4>
                <p className="text-gray-700 text-sm">
                  Conformité au Règlement Général sur la Protection des Données.
                </p>
              </div>
            </div>
          </Card>

          <Separator className="my-8" />

          {/* Résolution des Conflits */}
          <Card className="p-8 mb-8 border-senepay-orange/20">
            <h2 className="text-2xl font-bold mb-4 text-senepay-dark">
              Résolution des Conflits
            </h2>
            <p className="text-gray-700 mb-4">
              En cas de litige, nous privilégions la résolution amiable. Si nécessaire, 
              les tribunaux de Dakar, Sénégal, seront compétents selon le droit sénégalais.
            </p>
            <p className="text-sm text-gray-600">
              Pour toute question juridique, contactez notre service juridique à 
              <span className="font-semibold"> legal@senepay.com</span>
            </p>
          </Card>

          {/* Contact */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-senepay-dark mb-4">
              Questions sur les Conditions ?
            </h3>
            <p className="text-gray-700 mb-6">
              Notre équipe juridique est disponible pour clarifier tout point
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-senepay-gold hover:bg-senepay-orange"
              >
                Nous Contacter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="border-senepay-gold text-senepay-dark hover:bg-senepay-gold/10"
              >
                Retour à l'Accueil
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

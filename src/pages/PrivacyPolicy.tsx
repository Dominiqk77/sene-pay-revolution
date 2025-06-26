
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Lock, Database, Globe, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Collecte des Données",
      icon: <Database className="h-6 w-6" />,
      content: [
        "Informations d'identification personnelle (nom, email, téléphone)",
        "Données de transaction et de paiement",
        "Informations techniques (adresse IP, navigateur, device)",
        "Données d'utilisation et de performance"
      ]
    },
    {
      title: "Utilisation des Données",
      icon: <Eye className="h-6 w-6" />,
      content: [
        "Traitement des paiements et transactions",
        "Prévention de la fraude et sécurité",
        "Amélioration de nos services",
        "Communication et support client"
      ]
    },
    {
      title: "Protection des Données",
      icon: <Lock className="h-6 w-6" />,
      content: [
        "Chiffrement AES-256 bout-en-bout",
        "Conformité PCI DSS Level 1",
        "Audits de sécurité réguliers",
        "Accès restreint aux données sensibles"
      ]
    },
    {
      title: "Partage des Données",
      icon: <Globe className="h-6 w-6" />,
      content: [
        "Jamais de vente de données personnelles",
        "Partage limité aux partenaires de paiement",
        "Conformité aux réglementations locales",
        "Transparence totale sur les transferts"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-gray-300">
              Votre confidentialité est notre priorité absolue
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
              Notre Engagement
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Chez SenePay, nous nous engageons à protéger votre vie privée et vos données personnelles. 
              Cette politique explique comment nous collectons, utilisons et protégeons vos informations 
              dans le cadre de nos services de paiement en ligne.
            </p>
          </Card>

          {/* Sections */}
          <div className="grid gap-8 mb-12">
            {sections.map((section, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-senepay-gold/10 rounded-lg mr-4">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-senepay-dark">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-senepay-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Droits des utilisateurs */}
          <Card className="p-8 mb-8 bg-senepay-green/5 border-senepay-green/20">
            <h2 className="text-2xl font-bold mb-6 text-senepay-dark">
              Vos Droits
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Accès et Rectification</h4>
                <p className="text-gray-700 text-sm">
                  Vous pouvez accéder à vos données et demander leur correction à tout moment.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Suppression</h4>
                <p className="text-gray-700 text-sm">
                  Vous pouvez demander la suppression de vos données personnelles.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Portabilité</h4>
                <p className="text-gray-700 text-sm">
                  Vous pouvez récupérer vos données dans un format structuré.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Opposition</h4>
                <p className="text-gray-700 text-sm">
                  Vous pouvez vous opposer au traitement de vos données.
                </p>
              </div>
            </div>
          </Card>

          <Separator className="my-8" />

          {/* Contact */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-senepay-gold mr-2" />
              <h3 className="text-xl font-bold text-senepay-dark">
                Questions sur la Confidentialité ?
              </h3>
            </div>
            <p className="text-gray-700 mb-6">
              Notre équipe de protection des données est là pour vous aider
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

export default PrivacyPolicy;

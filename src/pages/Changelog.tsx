import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitCommit, Plus, Bug, Zap, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Changelog = () => {
  const navigate = useNavigate();

  const releases = [
    {
      version: "v2.4.0",
      date: "26 Juin 2025",
      type: "major",
      changes: [
        {
          type: "feature",
          title: "Nouvelle intégration Wizall",
          description: "Support complet pour les paiements Wizall avec webhook temps réel"
        },
        {
          type: "feature", 
          title: "Dashboard Analytics amélioré",
          description: "Nouvelles métriques de conversion et graphiques interactifs"
        },
        {
          type: "improvement",
          title: "Performance API optimisée",
          description: "Temps de réponse réduit de 40% sur tous les endpoints"
        },
        {
          type: "fix",
          title: "Correction webhooks Wave",
          description: "Résolution des problèmes de livraison des webhooks Wave"
        }
      ]
    },
    {
      version: "v2.3.2",
      date: "20 Juin 2025", 
      type: "patch",
      changes: [
        {
          type: "fix",
          title: "Correction timeout Orange Money",
          description: "Résolution des timeouts lors des pics de trafic"
        },
        {
          type: "security",
          title: "Mise à jour sécurité",
          description: "Renforcement du chiffrement des données sensibles"
        }
      ]
    },
    {
      version: "v2.3.1",
      date: "15 Juin 2025",
      type: "patch", 
      changes: [
        {
          type: "fix",
          title: "Correction affichage mobile",
          description: "Résolution des problèmes d'affichage sur mobile Safari"
        },
        {
          type: "improvement",
          title: "Validation des numéros améliorée",
          description: "Meilleure validation des numéros de téléphone sénégalais"
        }
      ]
    },
    {
      version: "v2.3.0",
      date: "10 Juin 2025",
      type: "minor",
      changes: [
        {
          type: "feature",
          title: "SDK React Native",
          description: "Nouveau SDK pour intégration native React Native"
        },
        {
          type: "feature",
          title: "Paiements QR Code",
          description: "Génération et scan de QR codes pour paiements instantanés"
        },
        {
          type: "improvement",
          title: "Interface utilisateur redesignée",
          description: "Nouveau design plus moderne et responsive"
        },
        {
          type: "fix",
          title: "Correction calculs de commission",
          description: "Résolution des erreurs de calcul sur les commissions marketplace"
        }
      ]
    },
    {
      version: "v2.2.5",
      date: "5 Juin 2025",
      type: "patch",
      changes: [
        {
          type: "security",
          title: "Mise à jour certificats SSL",
          description: "Renouvellement des certificats SSL pour une sécurité renforcée"
        },
        {
          type: "fix",
          title: "Correction exports comptables",
          description: "Résolution des problèmes d'export Excel pour les gros volumes"
        }
      ]
    },
    {
      version: "v2.2.4",
      date: "1 Juin 2025",
      type: "patch",
      changes: [
        {
          type: "improvement",
          title: "Optimisation base de données",
          description: "Amélioration des performances des requêtes analytics"
        },
        {
          type: "fix",
          title: "Correction notifications email",
          description: "Résolution des problèmes de livraison d'emails de confirmation"
        }
      ]
    }
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "feature": return <Plus className="h-4 w-4 text-green-600" />;
      case "improvement": return <Zap className="h-4 w-4 text-blue-600" />;
      case "fix": return <Bug className="h-4 w-4 text-red-600" />;
      case "security": return <Shield className="h-4 w-4 text-purple-600" />;
      default: return <GitCommit className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case "feature": return "bg-green-100 text-green-800";
      case "improvement": return "bg-blue-100 text-blue-800";
      case "fix": return "bg-red-100 text-red-800";
      case "security": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVersionColor = (type: string) => {
    switch (type) {
      case "major": return "bg-senepay-gold text-black";
      case "minor": return "bg-senepay-green text-white";
      case "patch": return "bg-gray-600 text-white";
      default: return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-senepay-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <GitCommit className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Journal des Modifications
              </h1>
              <p className="text-xl text-gray-300">
                Suivez l'évolution de la plateforme SenePay
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Latest Release Highlight */}
            <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
              <div className="flex items-center mb-4">
                <Badge className="bg-senepay-gold text-black mr-4">Dernière Version</Badge>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  {releases[0].date}
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-senepay-dark">
                Version {releases[0].version}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Cette version apporte de nouvelles intégrations et améliore significativement les performances.
              </p>
              <Button className="bg-senepay-gold hover:bg-senepay-orange">
                Voir les Détails
              </Button>
            </Card>

            {/* Releases Timeline */}
            <div className="space-y-8">
              {releases.map((release, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Badge className={getVersionColor(release.type)}>
                        {release.version}
                      </Badge>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {release.date}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {release.type === 'major' ? 'Version Majeure' : 
                       release.type === 'minor' ? 'Version Mineure' : 'Correctifs'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {release.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="mt-1">
                          {getChangeIcon(change.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className={`text-xs ${getChangeColor(change.type)}`}>
                              {change.type === 'feature' ? 'Nouveauté' :
                               change.type === 'improvement' ? 'Amélioration' :
                               change.type === 'fix' ? 'Correction' :
                               change.type === 'security' ? 'Sécurité' : change.type}
                            </Badge>
                            <h4 className="font-semibold text-sm">{change.title}</h4>
                          </div>
                          <p className="text-gray-600 text-sm">{change.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Subscription */}
            <Card className="p-8 mt-12 bg-senepay-green/5 border-senepay-green/20">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-senepay-dark">
                  Restez Informé des Nouveautés
                </h2>
                <p className="text-gray-700 mb-6">
                  Recevez les notifications de mise à jour directement par email
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="votre@email.com"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-senepay-gold"
                  />
                  <Button className="bg-senepay-gold hover:bg-senepay-orange px-8">
                    S'Abonner
                  </Button>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center mt-12">
              <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Suggestion d'Amélioration ?
                </h3>
                <p className="text-lg mb-6 opacity-90 text-white">
                  Votre feedback nous aide à améliorer continuellement SenePay
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                  >
                    Faire une Suggestion
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/api-documentation')}
                    className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                  >
                    Documentation API
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

export default Changelog;


import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, CheckCircle, AlertCircle, XCircle, Clock, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StatusPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      name: "API SenePay",
      status: "operational",
      description: "API REST pour les paiements",
      uptime: "99.98%"
    },
    {
      name: "Orange Money",
      status: "operational", 
      description: "Intégration Orange Money",
      uptime: "99.95%"
    },
    {
      name: "Wave",
      status: "operational",
      description: "Intégration Wave",
      uptime: "99.97%"
    },
    {
      name: "Free Money",
      status: "operational",
      description: "Intégration Free Money",
      uptime: "99.94%"
    },
    {
      name: "Cartes Bancaires",
      status: "operational",
      description: "Paiements par carte",
      uptime: "99.99%"
    },
    {
      name: "Webhooks",
      status: "operational",
      description: "Notifications temps réel",
      uptime: "99.96%"
    },
    {
      name: "Dashboard",
      status: "operational",
      description: "Interface marchands",
      uptime: "99.97%"
    },
    {
      name: "Support",
      status: "operational",
      description: "Service client",
      uptime: "99.95%"
    }
  ];

  const incidents = [
    {
      title: "Maintenance programmée Orange Money",
      description: "Maintenance programmée de l'API Orange Money pour améliorer les performances",
      status: "scheduled",
      date: "28 Juin 2025, 02:00 - 04:00 GMT",
      impact: "Faible"
    },
    {
      title: "Incident résolu - Latence élevée API",
      description: "Problème de latence résolu sur l'API principale. Service retour à la normale.",
      status: "resolved",
      date: "24 Juin 2025, 14:30 GMT",
      impact: "Moyen"
    },
    {
      title: "Problème de connexion Wave - Résolu",
      description: "Problème temporaire avec l'intégration Wave. Service restauré.",
      status: "resolved", 
      date: "22 Juin 2025, 09:15 GMT",
      impact: "Faible"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return { bg: "bg-green-100", text: "text-green-800", icon: <CheckCircle className="h-4 w-4" /> };
      case "degraded": return { bg: "bg-yellow-100", text: "text-yellow-800", icon: <AlertCircle className="h-4 w-4" /> };
      case "down": return { bg: "bg-red-100", text: "text-red-800", icon: <XCircle className="h-4 w-4" /> };
      case "maintenance": return { bg: "bg-blue-100", text: "text-blue-800", icon: <Clock className="h-4 w-4" /> };
      default: return { bg: "bg-gray-100", text: "text-gray-800", icon: <AlertCircle className="h-4 w-4" /> };
    }
  };

  const getIncidentStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return { bg: "bg-blue-100", text: "text-blue-800" };
      case "resolved": return { bg: "bg-green-100", text: "text-green-800" };
      case "investigating": return { bg: "bg-yellow-100", text: "text-yellow-800" };
      case "monitoring": return { bg: "bg-orange-100", text: "text-orange-800" };
      default: return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  const allOperational = services.every(service => service.status === "operational");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Activity className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Statut des Services
            </h1>
            <p className="text-xl text-gray-300">
              Surveillance en temps réel de tous nos services
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Overall Status */}
          <Card className={`p-8 mb-8 ${allOperational ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex items-center justify-center mb-4">
              {allOperational ? (
                <CheckCircle className="h-12 w-12 text-green-600 mr-4" />
              ) : (
                <AlertCircle className="h-12 w-12 text-yellow-600 mr-4" />
              )}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {allOperational ? "Tous les Systèmes Opérationnels" : "Problèmes Détectés"}
                </h2>
                <p className="text-gray-600">
                  Dernière vérification : {new Date().toLocaleString('fr-FR')}
                </p>
              </div>
            </div>
          </Card>

          {/* Services Status */}
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-bold mb-6 text-senepay-dark">État des Services</h3>
            <div className="space-y-4">
              {services.map((service, index) => {
                const statusStyle = getStatusColor(service.status);
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {statusStyle.icon}
                        <h4 className="font-semibold">{service.name}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Uptime: {service.uptime}</span>
                      <Badge className={`${statusStyle.bg} ${statusStyle.text}`}>
                        {service.status === 'operational' ? 'Opérationnel' : service.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Incidents */}
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-bold mb-6 text-senepay-dark">Incidents et Maintenances</h3>
            <div className="space-y-4">
              {incidents.map((incident, index) => {
                const statusStyle = getIncidentStatusColor(incident.status);
                return (
                  <div key={index} className="border-l-4 border-senepay-gold pl-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{incident.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          Impact {incident.impact}
                        </Badge>
                        <Badge className={`${statusStyle.bg} ${statusStyle.text} text-xs`}>
                          {incident.status === 'resolved' ? 'Résolu' : 
                           incident.status === 'scheduled' ? 'Programmé' : incident.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{incident.description}</p>
                    <p className="text-gray-500 text-xs">{incident.date}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-bold mb-6 text-senepay-dark">Performances (30 derniers jours)</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-senepay-gold mb-1">99.97%</div>
                <p className="text-sm text-gray-600">Uptime Global</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-senepay-gold mb-1">124ms</div>
                <p className="text-sm text-gray-600">Temps de Réponse API</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-senepay-gold mb-1">99.8%</div>
                <p className="text-sm text-gray-600">Taux de Succès</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-senepay-gold mb-1">2.1s</div>
                <p className="text-sm text-gray-600">Temps de Processing</p>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6 mb-8 bg-senepay-gold/10 border-senepay-gold/20">
            <div className="flex items-center mb-4">
              <Bell className="h-6 w-6 text-senepay-gold mr-2" />
              <h3 className="text-xl font-bold text-senepay-dark">Notifications de Statut</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Abonnez-vous pour recevoir des notifications en cas d'incident ou de maintenance programmée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="votre@email.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-senepay-gold"
              />
              <Button className="bg-senepay-gold hover:bg-senepay-orange">
                S'Abonner aux Alertes
              </Button>
            </div>
          </Card>

          {/* Support */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Problème Non Listé ?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Notre équipe support est disponible 24h/24 pour vous aider
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Contacter le Support
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/api-documentation')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
                  Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;

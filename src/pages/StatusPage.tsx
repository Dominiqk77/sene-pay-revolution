
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle, AlertTriangle, Clock, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const StatusPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      name: "API",
      status: "operational",
      icon: <Activity className="h-5 w-5" />
    },
    {
      name: "Paiements",
      status: "operational",
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      name: "Notifications",
      status: "degraded",
      icon: <AlertTriangle className="h-5 w-5" />
    },
    {
      name: "Tableau de Bord",
      status: "maintenance",
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const incidents = [
    {
      title: "Délai de Paiement",
      status: "resolved",
      date: "2025-01-25",
      description: "Les paiements ont subi un délai de 5 minutes."
    },
    {
      title: "Erreur API",
      status: "investigating",
      date: "2025-01-24",
      description: "Nous enquêtons sur une erreur API intermittente."
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
              <Zap className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Page d'État du Système
              </h1>
              <p className="text-xl text-gray-300">
                Vérifiez l'état de nos services en temps réel
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Services Status */}
          <Card className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-senepay-dark">
              État des Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="p-3 bg-senepay-gold/10 rounded-lg">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <Badge
                      variant={
                        service.status === "operational"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        service.status === "operational"
                          ? "bg-senepay-green"
                          : service.status === "degraded"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }
                    >
                      {service.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Incidents */}
          <Card className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-senepay-dark">
              Incidents Récents
            </h2>
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{incident.title}</h3>
                    <Badge
                      variant={
                        incident.status === "resolved"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        incident.status === "resolved"
                          ? "bg-senepay-green"
                          : "bg-yellow-500"
                      }
                    >
                      {incident.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Date: {incident.date}
                  </p>
                  <p className="text-sm text-gray-700">{incident.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Tout est Clair ?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Consultez notre documentation ou contactez le support
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/documentation')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Documentation
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
                  Contacter le Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatusPage;

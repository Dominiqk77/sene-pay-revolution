import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Webhook, Zap, Shield, Code, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WebhookPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Notifications Instantanées",
      description: "Recevez des notifications en temps réel pour chaque transaction"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Sécurité Renforcée",
      description: "Validez chaque paiement avec une signature cryptographique unique"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Intégration Facile",
      description: "Implémentez les webhooks en quelques lignes de code"
    }
  ];

  const events = [
    "payment.created",
    "payment.succeeded",
    "payment.failed",
    "payment.refunded",
    "transfer.created",
    "transfer.succeeded",
    "transfer.failed"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16">
        {/* Header */}
        <div className="bg-senepay-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Webhook className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Webhooks
              </h1>
              <p className="text-xl text-gray-300">
                Recevez des notifications en temps réel pour chaque événement
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
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

            {/* Events */}
            <Card className="p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-senepay-dark">
                Événements Disponibles
              </h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {events.map((event, index) => (
                  <Badge key={index} variant="secondary">
                    {event}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Setup Guide */}
            <Card className="p-8 mb-12 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
              <div className="flex items-center mb-6">
                <Zap className="h-8 w-8 text-senepay-gold mr-4" />
                <h2 className="text-2xl font-bold text-senepay-dark">
                  Configuration Facile
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-senepay-green mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Définissez votre URL de webhook dans les paramètres de votre compte
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-senepay-green mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Recevez les notifications en temps réel au format JSON
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-senepay-green mr-3 flex-shrink-0" />
                  <span className="text-gray-700">
                    Validez la signature pour garantir l'authenticité
                  </span>
                </div>
              </div>
            </Card>

            {/* Code Example */}
            <Card className="p-6 mb-12">
              <h3 className="text-xl font-bold mb-4">Exemple de Code (Node.js)</h3>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  <code>{`const crypto = require('crypto');
const secret = 'YOUR_WEBHOOK_SECRET';

app.post('/webhook', (req, res) => {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (req.headers['x-senepay-signature'] === hash) {
    // Handle event
    console.log('Webhook received:', req.body);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});`}</code>
                </pre>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Intégrez les Webhooks Dès Aujourd'hui
                </h3>
                <p className="text-lg mb-6 opacity-90 text-white">
                  Documentation complète et exemples de code disponibles
                </p>
                <Button
                  onClick={() => navigate('/api-documentation')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Voir la Documentation
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

export default WebhookPage;

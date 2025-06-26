
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Webhook as WebhookIcon, Zap, Shield, Code, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Webhook = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const events = [
    {
      event: "payment.succeeded",
      description: "Paiement réussi et confirmé",
      status: "stable"
    },
    {
      event: "payment.failed",
      description: "Échec du paiement",
      status: "stable"
    },
    {
      event: "payment.pending",
      description: "Paiement en attente de confirmation",
      status: "stable"
    },
    {
      event: "refund.succeeded",
      description: "Remboursement traité avec succès",
      status: "stable"
    }
  ];

  const webhookExample = `{
  "id": "evt_1234567890",
  "type": "payment.succeeded",
  "created": 1640995200,
  "data": {
    "payment": {
      "id": "pay_abcdef123456",
      "amount": 25000,
      "currency": "XOF",
      "status": "succeeded",
      "method": "orange_money",
      "customer": {
        "email": "client@boutique.sn",
        "phone": "+221771234567"
      },
      "metadata": {
        "order_id": "CMD-2024-001"
      }
    }
  }
}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <WebhookIcon className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Webhooks
            </h1>
            <p className="text-xl text-gray-300">
              Notifications en temps réel pour tous vos événements de paiement
            </p>
            <div className="flex justify-center mt-6">
              <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                Temps Réel
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <div className="flex items-center mb-6">
              <Zap className="h-8 w-8 text-senepay-gold mr-4" />
              <h2 className="text-2xl font-bold text-senepay-dark">
                Comment Fonctionnent les Webhooks ?
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Les webhooks SenePay vous permettent de recevoir des notifications HTTP en temps réel 
              lorsque des événements se produisent sur votre compte. Automatisez votre logique métier 
              et offrez une expérience utilisateur fluide.
            </p>
          </Card>

          {/* Webhook Events */}
          <Tabs defaultValue="events" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
              <TabsTrigger value="events" className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black">
                Événements
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black">
                Sécurité
              </TabsTrigger>
              <TabsTrigger value="examples" className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black">
                Exemples
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="mt-6">
              <div className="grid gap-4">
                {events.map((event, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <code className="text-sm font-mono bg-gray-100 px-3 py-1 rounded text-senepay-dark">
                          {event.event}
                        </code>
                      </div>
                      <Badge variant="outline" className="text-senepay-green border-senepay-green">
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-senepay-gold mr-2" />
                  <h3 className="text-xl font-bold">Sécurité des Webhooks</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Signature HMAC</h4>
                    <p className="text-gray-700 text-sm">
                      Chaque webhook est signé avec HMAC-SHA256 pour garantir son authenticité.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Retry Automatique</h4>
                    <p className="text-gray-700 text-sm">
                      En cas d'échec, nous retentons l'envoi avec un backoff exponentiel jusqu'à 3 fois.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Timeout</h4>
                    <p className="text-gray-700 text-sm">
                      Votre endpoint doit répondre dans les 30 secondes avec un code HTTP 2xx.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="mt-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Exemple de Payload</h3>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => copyToClipboard(webhookExample, 'webhook')}
                  >
                    {copiedCode === 'webhook' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono leading-relaxed">
                    <code>{webhookExample}</code>
                  </pre>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Configuration Steps */}
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-senepay-dark">
              Configuration en 3 Étapes
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h4 className="font-semibold mb-2">Endpoint URL</h4>
                <p className="text-sm text-gray-600">Configurez l'URL de votre endpoint dans votre dashboard</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h4 className="font-semibold mb-2">Événements</h4>
                <p className="text-sm text-gray-600">Sélectionnez les événements qui vous intéressent</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-senepay-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h4 className="font-semibold mb-2">Test</h4>
                <p className="text-sm text-gray-600">Testez votre endpoint avec notre outil de simulation</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Prêt à Configurer vos Webhooks ?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Accédez à votre dashboard pour configurer vos endpoints
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Configurer Maintenant
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/api-documentation')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
                  <Code className="mr-2 h-4 w-4" />
                  Documentation API
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webhook;

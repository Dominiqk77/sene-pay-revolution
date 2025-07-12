
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Code, BookOpen, Zap, Shield, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApiDocumentation = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/payments",
      description: "Créer un nouveau paiement",
      status: "stable"
    },
    {
      method: "GET",
      path: "/api/v1/payments/{id}",
      description: "Récupérer les détails d'un paiement",
      status: "stable"
    },
    {
      method: "POST",
      path: "/api/v1/refunds",
      description: "Créer un remboursement",
      status: "stable"
    },
    {
      method: "GET",
      path: "/api/v1/transactions",
      description: "Lister les transactions",
      status: "stable"
    }
  ];

  const codeExample = `curl -X POST https://api.senepay.com/v1/payments \\
  -H "Authorization: Bearer sk_live_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 25000,
    "currency": "XOF",
    "methods": ["orange_money", "wave", "card"],
    "customer": {
      "email": "client@boutique.sn",
      "phone": "+221771234567"
  },
  "metadata": {
    "order_id": "CMD-2025-001"
  }
  }'`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Code className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Documentation API
            </h1>
            <p className="text-xl text-gray-300">
              Intégrez SenePay en quelques lignes de code
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                API v1.0
              </Badge>
              <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                REST
              </Badge>
              <Badge variant="outline" className="bg-senepay-orange text-white border-senepay-orange">
                JSON
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Quick Start */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <div className="flex items-center mb-6">
              <Zap className="h-8 w-8 text-senepay-gold mr-4" />
              <h2 className="text-2xl font-bold text-senepay-dark">
                Démarrage Rapide
              </h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Commencez à accepter des paiements en moins de 5 minutes avec notre API REST simple et puissante.
            </p>
            <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm font-mono">
                  example-payment.curl
                </span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => copyToClipboard(codeExample, 'example')} 
                  className="text-gray-400 hover:text-white"
                >
                  {copiedCode === 'example' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <pre className="text-sm text-gray-300 font-mono leading-relaxed overflow-x-auto">
                <code>{codeExample}</code>
              </pre>
            </div>
          </Card>

          {/* API Reference */}
          <Tabs defaultValue="endpoints" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
              <TabsTrigger value="endpoints" className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black">
                Endpoints
              </TabsTrigger>
              <TabsTrigger value="authentication" className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black">
                Authentification
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black">
                Webhooks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="endpoints" className="mt-6">
              <div className="grid gap-4">
                {endpoints.map((endpoint, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={endpoint.method === 'GET' ? 'secondary' : 'default'}
                          className={endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono text-gray-700">
                          {endpoint.path}
                        </code>
                      </div>
                      <Badge variant="outline" className="text-senepay-green border-senepay-green">
                        {endpoint.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{endpoint.description}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="authentication" className="mt-6">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-senepay-gold mr-2" />
                  <h3 className="text-xl font-bold">Authentification API</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Utilisez vos clés API pour authentifier vos requêtes. Gardez vos clés secrètes en sécurité !
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <code className="text-sm">
                    Authorization: Bearer sk_live_your_secret_key_here
                  </code>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="webhooks" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Webhooks en Temps Réel</h3>
                <p className="text-gray-700 mb-4">
                  Recevez des notifications instantanées pour tous les événements de paiement.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-senepay-green rounded-full"></span>
                    <span className="text-sm">payment.succeeded</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="text-sm">payment.failed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span className="text-sm">payment.pending</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-senepay-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Documentation Interactive</h3>
              <p className="text-gray-600 text-sm">
                Testez notre API directement depuis la documentation avec Swagger UI
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Code className="h-12 w-12 text-senepay-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Exemples de Code</h3>
              <p className="text-gray-600 text-sm">
                Exemples complets dans tous les langages populaires
              </p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="h-12 w-12 text-senepay-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Sécurité Maximale</h3>
              <p className="text-gray-600 text-sm">
                Chiffrement bout-en-bout et conformité PCI DSS Level 1
              </p>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Prêt à Commencer ?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Créez votre compte développeur et obtenez vos clés API gratuitement
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Créer un Compte
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/sandbox')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
                  Tester l'API
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;

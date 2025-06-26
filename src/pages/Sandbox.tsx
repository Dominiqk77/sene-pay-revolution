
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Play, TestTube, Code, Settings, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sandbox = () => {
  const navigate = useNavigate();
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTestResult("success");
      setIsLoading(false);
    }, 2000);
  };

  const testCases = [
    {
      name: "Paiement Orange Money",
      amount: "10000",
      method: "orange_money",
      status: "success"
    },
    {
      name: "Paiement Wave",
      amount: "25000", 
      method: "wave",
      status: "success"
    },
    {
      name: "Paiement Carte",
      amount: "50000",
      method: "card",
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <TestTube className="h-16 w-16 mx-auto mb-6 text-senepay-gold" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Environnement de Test
            </h1>
            <p className="text-xl text-gray-300">
              Testez votre intégration SenePay en toute sécurité
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                Gratuit
              </Badge>
              <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                Sans Limite
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Test Environment */}
          <Tabs defaultValue="api-tester" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
              <TabsTrigger value="api-tester" className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black">
                Testeur API
              </TabsTrigger>
              <TabsTrigger value="scenarios" className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black">
                Scénarios
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black">
                Test Webhooks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api-tester" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Request Form */}
                <Card className="p-6">
                  <div className="flex items-center mb-6">
                    <Settings className="h-6 w-6 text-senepay-gold mr-2" />
                    <h3 className="text-xl font-bold">Paramètres de Test</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Montant (XOF)</Label>
                      <Input id="amount" placeholder="10000" />
                    </div>
                    
                    <div>
                      <Label htmlFor="method">Méthode de Paiement</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir une méthode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="orange_money">Orange Money</SelectItem>
                          <SelectItem value="wave">Wave</SelectItem>
                          <SelectItem value="free_money">Free Money</SelectItem>
                          <SelectItem value="card">Carte Bancaire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Client</Label>
                      <Input id="email" placeholder="test@example.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" placeholder="+221771234567" />
                    </div>
                    
                    <div>
                      <Label htmlFor="metadata">Métadonnées (JSON)</Label>
                      <Textarea 
                        id="metadata" 
                        placeholder='{"order_id": "TEST-001"}'
                        rows={3}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleTest}
                      disabled={isLoading}
                      className="w-full bg-senepay-gold hover:bg-senepay-orange"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Test en cours...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Lancer le Test
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                {/* Response */}
                <Card className="p-6">
                  <div className="flex items-center mb-6">
                    <Code className="h-6 w-6 text-senepay-gold mr-2" />
                    <h3 className="text-xl font-bold">Réponse API</h3>
                  </div>
                  
                  {testResult ? (
                    <div className="bg-gray-900 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        {testResult === 'success' ? (
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400 mr-2" />
                        )}
                        <span className="text-sm text-gray-400">
                          {testResult === 'success' ? '200 OK' : '400 Bad Request'}
                        </span>
                      </div>
                      <pre className="text-sm text-gray-300 font-mono leading-relaxed overflow-x-auto">
                        {testResult === 'success' ? 
                          `{
  "id": "pay_test_123456",
  "status": "succeeded",
  "amount": 10000,
  "currency": "XOF",
  "method": "orange_money",
  "created": ${Date.now()},
  "customer": {
    "email": "test@example.com",
    "phone": "+221771234567"
  },
  "metadata": {
    "order_id": "TEST-001"
  }
}` : 
                          `{
  "error": "invalid_request",
  "message": "Le montant doit être supérieur à 0"
}`
                        }
                      </pre>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-xl p-6 text-center">
                      <p className="text-gray-500">Lancez un test pour voir la réponse API</p>
                    </div>
                  )}
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scenarios" className="mt-6">
              <div className="grid gap-4">
                <h3 className="text-xl font-bold mb-4">Scénarios de Test Prédéfinis</h3>
                {testCases.map((test, index) => (
                  <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{test.name}</h4>
                        <p className="text-sm text-gray-600">
                          {test.amount} XOF via {test.method}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={test.status === 'success' ? 'default' : 'secondary'}
                          className={test.status === 'success' ? 'bg-senepay-green' : 'bg-yellow-500'}
                        >
                          {test.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          Tester
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="webhooks" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Testeur de Webhooks</h3>
                <p className="text-gray-600 mb-6">
                  Testez vos endpoints de webhook avec des événements simulés.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="webhook-url">URL du Webhook</Label>
                    <Input id="webhook-url" placeholder="https://votre-site.com/webhook" />
                  </div>
                  
                  <div>
                    <Label htmlFor="event-type">Type d'Événement</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un événement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="payment.succeeded">payment.succeeded</SelectItem>
                        <SelectItem value="payment.failed">payment.failed</SelectItem>
                        <SelectItem value="payment.pending">payment.pending</SelectItem>
                        <SelectItem value="refund.succeeded">refund.succeeded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="bg-senepay-gold hover:bg-senepay-orange">
                    <Play className="h-4 w-4 mr-2" />
                    Envoyer Test Webhook
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Start */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <h2 className="text-2xl font-bold mb-4 text-senepay-dark">
              Clés API de Test
            </h2>
            <p className="text-gray-700 mb-6">
              Utilisez ces clés pour vos tests. Elles ne traiteront jamais de vrais paiements.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold">Clé Publique</Label>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  pk_test_senepay_sandbox_123456789
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold">Clé Secrète</Label>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  sk_test_senepay_sandbox_987654321
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Prêt pour la Production ?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Créez votre compte et obtenez vos clés de production
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

export default Sandbox;

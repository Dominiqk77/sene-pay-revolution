
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Play, Book, Code, Zap, Shield } from "lucide-react";

const Documentation = () => {
  const quickStartSteps = [
    {
      step: 1,
      title: "Installation",
      code: "npm install senepay-sdk",
      description: "Installez le SDK SenePay via npm, yarn ou cdn"
    },
    {
      step: 2,
      title: "Initialisation", 
      code: `const senepay = new SenePay({
  apiKey: 'sk_live_xxx',
  environment: 'production'
});`,
      description: "Initialisez avec votre clé API"
    },
    {
      step: 3,
      title: "Premier paiement",
      code: `const payment = await senepay.payments.create({
  amount: 10000, // 10,000 FCFA
  currency: 'XOF',
  methods: ['orange_money', 'wave', 'card']
});`,
      description: "Créez votre premier paiement"
    }
  ];

  const endpoints = [
    {
      method: "POST",
      path: "/v1/payments",
      description: "Créer un nouveau paiement",
      status: "Live"
    },
    {
      method: "GET", 
      path: "/v1/payments/:id",
      description: "Récupérer un paiement",
      status: "Live"
    },
    {
      method: "POST",
      path: "/v1/webhooks",
      description: "Configurer les webhooks",
      status: "Live"
    },
    {
      method: "GET",
      path: "/v1/analytics",
      description: "Analytics et métriques",
      status: "Live"
    }
  ];

  const sdks = [
    { name: "JavaScript/TypeScript", status: "Stable", version: "v1.2.0" },
    { name: "PHP", status: "Stable", version: "v1.1.5" },
    { name: "Python", status: "Stable", version: "v1.0.8" },
    { name: "Ruby", status: "Beta", version: "v0.9.2" },
    { name: "Java", status: "Coming Soon", version: "TBA" },
    { name: "C#/.NET", status: "Coming Soon", version: "TBA" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Documentation</span>
                <br />
                <span className="text-white">API SenePay</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Intégrez tous les moyens de paiement sénégalais en 5 minutes chrono. 
                Documentation complète, exemples pratiques, support en temps réel.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-senepay-gold hover:bg-senepay-orange text-senepay-dark px-8 py-4 text-lg font-bold">
                  <Play className="mr-2 h-5 w-5" />
                  Démarrage rapide
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-4 text-lg">
                  <Book className="mr-2 h-5 w-5" />
                  Guide complet
                </Button>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Quick Start</span>
                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-gray-400"># Installation</div>
                <div className="text-green-400">$ npm install senepay-sdk</div>
                <div className="text-gray-400"># Premier paiement</div>
                <div className="text-blue-400">const payment = await senepay.create({`{`}</div>
                <div className="text-white ml-4">amount: 10000,</div>
                <div className="text-white ml-4">methods: ['all']</div>
                <div className="text-blue-400">{`}`});</div>
                <div className="text-yellow-400">✨ Done in 30 seconds!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-gray-800">Démarrage</span>
              <span className="gradient-text"> Ultra-rapide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De zéro à votre premier paiement en moins de 5 minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {quickStartSteps.map((step, index) => (
              <Card key={step.step} className="p-8 mb-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-senepay rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="bg-gray-900 rounded-lg p-4 relative">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-gray-800">Référence</span>
              <span className="gradient-text"> API</span>
            </h2>
          </div>

          <Tabs defaultValue="endpoints" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="sdks">SDKs</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="endpoints" className="mt-8">
              <div className="grid gap-4">
                {endpoints.map((endpoint, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge 
                          className={`${
                            endpoint.method === 'POST' ? 'bg-green-500' : 
                            endpoint.method === 'GET' ? 'bg-blue-500' : 'bg-yellow-500'
                          } text-white`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="font-mono text-lg">{endpoint.path}</code>
                      </div>
                      <Badge variant="outline" className="text-senepay-green">
                        {endpoint.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mt-3">{endpoint.description}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sdks" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sdks.map((sdk, index) => (
                  <Card key={index} className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-senepay rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      <Code className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{sdk.name}</h3>
                    <Badge 
                      className={`mb-3 ${
                        sdk.status === 'Stable' ? 'bg-green-500' :
                        sdk.status === 'Beta' ? 'bg-yellow-500' : 'bg-gray-500'
                      } text-white`}
                    >
                      {sdk.status}
                    </Badge>
                    <p className="text-gray-600 mb-4">{sdk.version}</p>
                    {sdk.status !== 'Coming Soon' && (
                      <Button variant="outline" size="sm">
                        Télécharger
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="webhooks" className="mt-8">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-6">Configuration des Webhooks</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">URL d'endpoint</h4>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="text-green-400">https://votre-site.com/webhooks/senepay</code>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Événements disponibles</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>payment.succeeded</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>payment.failed</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>payment.pending</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>refund.created</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="testing" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-senepay-gold" />
                    Environnement Sandbox
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Testez vos intégrations dans un environnement sécurisé
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <code className="text-blue-400">
                      apiKey: 'sk_test_your_sandbox_key'
                    </code>
                  </div>
                  <Button className="btn-senepay">
                    Obtenir les clés de test
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-senepay-green" />
                    Numéros de test
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Utilisez ces numéros pour simuler différents scénarios
                  </p>
                  <div className="space-y-2 text-sm">
                    <div><code>+221 77 000 0001</code> - Succès</div>
                    <div><code>+221 77 000 0002</code> - Échec</div>
                    <div><code>+221 77 000 0003</code> - Timeout</div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            <span className="text-gray-800">Besoin</span>
            <span className="gradient-text"> d'aide ?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">💬 Chat Support</h3>
              <p className="text-gray-600 mb-4">Support en temps réel pour vos questions techniques</p>
              <Button variant="outline">Démarrer le chat</Button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">📚 Guides</h3>
              <p className="text-gray-600 mb-4">Tutoriels détaillés et cas d'usage</p>
              <Button variant="outline">Voir les guides</Button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">👥 Communauté</h3>
              <p className="text-gray-600 mb-4">Rejoignez la communauté des développeurs</p>
              <Button variant="outline">Rejoindre</Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documentation;

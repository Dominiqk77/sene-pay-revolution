import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const DeveloperSection = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const integrations = [{
    name: "React/Next.js",
    logo: "⚛️",
    count: "2.1k+ téléchargements"
  }, {
    name: "PHP/Laravel",
    logo: "🐘",
    count: "1.8k+ téléchargements"
  }, {
    name: "Python/Django",
    logo: "🐍",
    count: "1.2k+ téléchargements"
  }, {
    name: "Node.js/Express",
    logo: "🟢",
    count: "3.4k+ téléchargements"
  }, {
    name: "WooCommerce",
    logo: "🛒",
    count: "850+ installations"
  }, {
    name: "Shopify",
    logo: "🛍️",
    count: "420+ installations"
  }];
  const codeExamples = {
    javascript: `// Installation
npm install senepay-sdk

// Configuration simple
import SenePay from 'senepay-sdk';

const senepay = new SenePay({
  apiKey: 'sk_live_your_key_here',
  environment: 'production'
});

// Créer un paiement
const payment = await senepay.payments.create({
  amount: 25000, // 25,000 FCFA
  currency: 'XOF',
  methods: ['orange_money', 'wave', 'card'],
  customer: {
    email: 'client@boutique.sn',
    phone: '+221771234567'
  },
  metadata: {
    order_id: 'CMD-2024-001',
    customer_name: 'Amadou Diallo'
  }
});

console.log('Payment URL:', payment.payment_url);`,
    php: `<?php
// Installation via Composer
// composer require senepay/senepay-php

require_once 'vendor/autoload.php';

use SenePay\\SenePay;

$senepay = new SenePay([
    'api_key' => 'sk_live_your_key_here',
    'environment' => 'production'
]);

// Créer un paiement
$payment = $senepay->payments->create([
    'amount' => 25000, // 25,000 FCFA
    'currency' => 'XOF',
    'methods' => ['orange_money', 'wave', 'card'],
    'customer' => [
        'email' => 'client@boutique.sn',
        'phone' => '+221771234567'
    ],
    'metadata' => [
        'order_id' => 'CMD-2024-001'
    ]
]);

echo $payment->payment_url;`,
    python: `# Installation
# pip install senepay-python

from senepay import SenePay

senepay = SenePay(
    api_key='sk_live_your_key_here',
    environment='production'
)

# Créer un paiement
payment = senepay.payments.create({
    'amount': 25000,  # 25,000 FCFA
    'currency': 'XOF',
    'methods': ['orange_money', 'wave', 'card'],
    'customer': {
        'email': 'client@boutique.sn',
        'phone': '+221771234567'
    },
    'metadata': {
        'order_id': 'CMD-2024-001'
    }
})

print(f"Payment URL: {payment.payment_url}")`
  };
  const webhookExample = `// Webhook handler sécurisé
app.post('/webhooks/senepay', (req, res) => {
  const signature = req.headers['senepay-signature'];
  
  // Vérifier la signature
  if (!senepay.webhooks.verify(req.body, signature)) {
    return res.status(401).send('Unauthorized');
  }
  
  const event = req.body;
  
  switch (event.type) {
    case 'payment.succeeded':
      // Paiement réussi - débloquer la commande
      fulfillOrder(event.data.metadata.order_id);
      sendConfirmationEmail(event.data.customer.email);
      break;
      
    case 'payment.failed':
      // Paiement échoué - notifier le client
      notifyPaymentFailure(event.data);
      break;
  }
  
  res.status(200).send('OK');
});`;

  return (
    <section id="developers" className="py-20 bg-gradient-to-br from-senepay-dark to-gray-900 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Developer Experience</span>
            <br />
            <span className="text-white">Extraordinaire</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conçu par des développeurs africains, pour des développeurs africains. 
            Documentation parfaite, SDKs ultra-simples, support technique exceptionnel.
          </p>
        </div>

        {/* SDKs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {integrations.map((integration, index) => (
            <Card 
              key={integration.name} 
              className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{integration.logo}</div>
                <div>
                  <h3 className="text-lg font-bold text-white">{integration.name}</h3>
                  <p className="text-sm text-gray-400">{integration.count}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Code Examples - Mobile Optimized */}
        <div className="bg-black/30 rounded-3xl p-4 sm:p-8 mb-12 backdrop-blur-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 gradient-text">
            Intégration en 3 lignes de code
          </h3>
          
          <Tabs defaultValue="javascript" className="max-w-5xl mx-auto">
            {/* Mobile-Optimized Tabs List */}
            <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20 h-auto p-1 gap-1 sm:gap-0 sm:h-10">
              <TabsTrigger 
                value="javascript" 
                className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black text-xs sm:text-sm py-2 px-2 sm:px-4 rounded-md sm:rounded-sm min-h-[44px] sm:min-h-[auto] font-medium touch-manipulation"
              >
                JavaScript
              </TabsTrigger>
              <TabsTrigger 
                value="php" 
                className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black text-xs sm:text-sm py-2 px-2 sm:px-4 rounded-md sm:rounded-sm min-h-[44px] sm:min-h-[auto] font-medium touch-manipulation"
              >
                PHP
              </TabsTrigger>
              <TabsTrigger 
                value="python" 
                className="data-[state=active]:bg-senepay-gold data-[state=active]:text-black text-xs sm:text-sm py-2 px-2 sm:px-4 rounded-md sm:rounded-sm min-h-[44px] sm:min-h-[auto] font-medium touch-manipulation"
              >
                Python
              </TabsTrigger>
            </TabsList>

            {Object.entries(codeExamples).map(([lang, code]) => (
              <TabsContent key={lang} value={lang} className="mt-4 sm:mt-6">
                <div className="relative">
                  <div className="bg-gray-900 rounded-xl p-3 sm:p-6 overflow-x-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-400 text-xs sm:text-sm font-mono">
                        {lang}.{lang === 'javascript' ? 'js' : lang === 'php' ? 'php' : 'py'}
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard(code, lang)} 
                        className="text-gray-400 hover:text-white min-h-[44px] min-w-[44px] sm:min-h-[auto] sm:min-w-[auto] p-2 sm:p-3 touch-manipulation"
                      >
                        {copiedCode === lang ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <pre className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed overflow-x-auto">
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Webhook Example */}
        <div className="bg-white/5 rounded-2xl p-4 sm:p-8 mb-12 border border-white/10">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center">
            <span className="gradient-text">Webhooks Intelligents</span>
            <span className="mt-2 sm:mt-0 sm:ml-3 text-xs bg-senepay-green px-2 py-1 rounded-full self-start">TEMPS RÉEL</span>
          </h3>
          
          <div className="bg-gray-900 rounded-xl p-3 sm:p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-xs sm:text-sm font-mono">webhook-handler.js</span>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(webhookExample, 'webhook')} 
                className="text-gray-400 hover:text-white min-h-[44px] min-w-[44px] sm:min-h-[auto] sm:min-w-[auto] p-2 sm:p-3 touch-manipulation"
              >
                {copiedCode === 'webhook' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <pre className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed overflow-x-auto">
              <code>{webhookExample}</code>
            </pre>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold gradient-text">Documentation Interactive</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-senepay-green flex-shrink-0" />
                <span className="text-sm sm:text-base">API Reference complète avec Swagger UI</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-senepay-green flex-shrink-0" />
                <span className="text-sm sm:text-base">Exemples de code pour chaque endpoint</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-senepay-green flex-shrink-0" />
                <span className="text-sm sm:text-base">Playground interactif pour tester l'API</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-senepay-green flex-shrink-0" />
                <span className="text-sm sm:text-base">Guides d'intégration step-by-step</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold gradient-text">Outils de Développement</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-senepay-green flex-shrink-0" />
                <span className="text-sm sm:text-base">Sandbox réaliste avec tous les moyens de paiement</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-senepay-green flex-shrink-0" />
                <span className="text-sm sm:text-base">Webhook debugger et logs détaillés</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-senepay-green flex-shrink-0" />
                <span className="text-sm sm:text-base">CLI pour tester les intégrations</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-senepay-green flex-shrink-0" />
                <span className="text-sm sm:text-base">Postman collections pré-configurées</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-senepay rounded-2xl p-6 sm:p-8 inline-block">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Prêt à révolutionner vos paiements ?</h3>
            <p className="text-base sm:text-lg mb-6 opacity-90">
              Rejoignez 1,500+ développeurs qui font confiance à SenePay
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-senepay-dark hover:bg-gray-100 px-6 sm:px-8 py-3 font-bold min-h-[44px] touch-manipulation">
                Accéder à la documentation →
              </Button>
              <Button variant="outline" className="border-white hover:bg-white px-6 sm:px-8 py-3 text-gray-950 min-h-[44px] touch-manipulation">
                Sandbox gratuit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;

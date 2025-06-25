
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const PaymentMethodsSection = () => {
  const localPayments = [
    {
      name: "Orange Money",
      logo: "OM",
      color: "bg-orange-500",
      description: "Leader mobile money Sénégal",
      features: ["API officielle", "Temps réel", "99.9% uptime"]
    },
    {
      name: "Wave",
      logo: "W",
      color: "bg-blue-600",
      description: "Paiements instantanés sans frais",
      features: ["Intégration directe", "Sans commission utilisateur", "Ultra-rapide"]
    },
    {
      name: "Free Money",
      logo: "FM",
      color: "bg-green-600",
      description: "Solution Tigo par Free",
      features: ["Couverture nationale", "API stable", "Support 24/7"]
    },
    {
      name: "Wizall",
      logo: "Wz",
      color: "bg-purple-600",
      description: "Portefeuille électronique innovant",
      features: ["Partenariat exclusif", "Frais réduits", "Multi-services"]
    }
  ];

  const internationalPayments = [
    {
      name: "Visa/Mastercard",
      logo: "💳",
      description: "Cartes bancaires internationales",
      features: ["3D Secure", "Tokenization", "Global acceptance"]
    },
    {
      name: "Cartes Locales",
      logo: "🏦",
      description: "GIM-UEMOA et cartes régionales",
      features: ["Conformité BCEAO", "Taux préférentiels", "Support local"]
    },
    {
      name: "Crypto Payments",
      logo: "₿",
      description: "Bitcoin, USDT, USDC",
      features: ["Instant settlement", "Low fees", "Global reach"]
    },
    {
      name: "Virements",
      logo: "🏧",
      description: "Transferts bancaires directs",
      features: ["Tous les banques", "Automatisé", "Réconciliation auto"]
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Tous les moyens de paiement</span>
            <br />
            <span className="text-gray-800">en une seule API</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connectez votre business à l'écosystème financier complet du Sénégal et de l'Afrique de l'Ouest. 
            Une intégration, tous les paiements.
          </p>
        </div>

        {/* Local Payment Methods */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
            💰 Mobile Money Sénégalais
          </h3>
          <p className="text-center text-gray-600 mb-8">
            Leaders du marché avec 15M+ d'utilisateurs actifs
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localPayments.map((method, index) => (
              <Card 
                key={method.name} 
                className="payment-card p-6 hover:shadow-xl group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    {method.logo}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{method.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                  
                  <div className="space-y-2">
                    {method.features.map((feature) => (
                      <div key={feature} className="flex items-center justify-center space-x-2">
                        <Check className="h-4 w-4 text-senepay-green" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* International Payment Methods */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
            🌍 Paiements Internationaux
          </h3>
          <p className="text-center text-gray-600 mb-8">
            Acceptez les paiements du monde entier
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {internationalPayments.map((method, index) => (
              <Card 
                key={method.name} 
                className="payment-card p-6 hover:shadow-xl group"
                style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-senepay rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {method.logo}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{method.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                  
                  <div className="space-y-2">
                    {method.features.map((feature) => (
                      <div key={feature} className="flex items-center justify-center space-x-2">
                        <Check className="h-4 w-4 text-senepay-green" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Integration CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-senepay rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Intégration en 5 minutes chrono ⚡</h3>
            <p className="text-xl mb-6 opacity-90">
              Une ligne de code, tous les moyens de paiement activés
            </p>
            <div className="bg-black/20 rounded-lg p-4 text-left max-w-2xl mx-auto mb-6">
              <code className="text-senepay-light">
                <span className="text-gray-300">// Installation</span><br/>
                npm install senepay-sdk<br/><br/>
                <span className="text-gray-300">// Intégration</span><br/>
                <span className="text-yellow-300">const</span> senepay = <span className="text-yellow-300">new</span> <span className="text-blue-300">SenePay</span>({`{`}<br/>
                &nbsp;&nbsp;<span className="text-green-300">apiKey</span>: <span className="text-orange-300">'sk_live_xxx'</span><br/>
                {`}`});
              </code>
            </div>
            <button className="bg-white text-senepay-dark px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Commencer l'intégration →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsSection;

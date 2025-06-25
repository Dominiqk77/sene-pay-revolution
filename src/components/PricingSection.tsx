
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "Gratuit",
      period: "0-100 transactions/mois",
      description: "Parfait pour tester et débuter",
      features: [
        "API complète",
        "Tous moyens de paiement",
        "Dashboard basique",
        "Support communauté",
        "Sandbox illimité",
        "Documentation complète"
      ],
      buttonText: "Commencer gratuitement",
      highlight: false,
      commission: "2.1% par transaction"
    },
    {
      name: "Business",
      price: "15,000 FCFA",
      period: "/mois",
      description: "Pour les businesses en croissance",
      features: [
        "Tout du plan Starter",
        "Analytics avancé",
        "Webhooks premium",
        "Support prioritaire",
        "Custom branding",
        "Rapports comptables",
        "A/B testing",
        "Multi-utilisateurs"
      ],
      buttonText: "Démarrer Business",
      highlight: true,
      commission: "1.9% par transaction",
      badge: "Populaire"
    },
    {
      name: "Enterprise",
      price: "50,000 FCFA",
      period: "/mois",
      description: "Pour les gros volumes",
      features: [
        "Tout du plan Business",
        "SLA 99.99% garanti",
        "Account manager dédié",
        "API priority lane",
        "Custom integrations",
        "Fraud protection IA+",
        "White-label option",
        "Onboarding personnalisé"
      ],
      buttonText: "Contacter l'équipe",
      highlight: false,
      commission: "1.7% par transaction"
    }
  ];

  const comparisonData = [
    { competitor: "CinetPay", commission: "3.5%", setup: "2 semaines", support: "Email seulement" },
    { competitor: "PayPal", commission: "4.2%", setup: "Complex KYC", support: "International" },
    { competitor: "SenePay", commission: "1.9%", setup: "5 minutes", support: "Local 24/7", highlight: true }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-800">Tarifs</span>
            <span className="gradient-text"> Disruptifs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            50% moins cher que la concurrence, avec plus de fonctionnalités. 
            Commencez gratuitement, scalez selon vos besoins.
          </p>
          
          <div className="inline-flex items-center bg-gradient-senepay text-white px-6 py-3 rounded-full text-lg font-semibold">
            🔥 Offre de lancement : 6 mois gratuits pour les 100 premiers
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.highlight 
                  ? 'border-2 border-senepay-gold ring-4 ring-senepay-gold/20 scale-105' 
                  : 'border border-gray-200'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-senepay text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>{plan.badge}</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
                <div className="mt-4 bg-gray-100 rounded-lg p-3">
                  <span className="text-sm font-semibold text-senepay-orange">
                    Commission: {plan.commission}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-senepay-green flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${
                  plan.highlight 
                    ? 'btn-senepay' 
                    : 'border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white'
                }`}
                variant={plan.highlight ? 'default' : 'outline'}
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="gradient-text">Pourquoi choisir SenePay ?</span>
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-800">Solution</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-800">Commission</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-800">Setup</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-800">Support</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr 
                    key={row.competitor} 
                    className={`border-b border-gray-100 ${
                      row.highlight ? 'bg-gradient-to-r from-senepay-gold/10 to-senepay-orange/10' : ''
                    }`}
                  >
                    <td className={`py-4 px-4 font-semibold ${
                      row.highlight ? 'text-senepay-orange' : 'text-gray-700'
                    }`}>
                      {row.competitor}
                      {row.highlight && <span className="text-xs bg-senepay-gold text-white px-2 py-1 rounded-full ml-2">NOUS</span>}
                    </td>
                    <td className={`text-center py-4 px-4 font-bold ${
                      row.highlight ? 'text-senepay-green' : 'text-red-500'
                    }`}>
                      {row.commission}
                    </td>
                    <td className="text-center py-4 px-4 text-gray-700">{row.setup}</td>
                    <td className="text-center py-4 px-4 text-gray-700">{row.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-senepay rounded-3xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">
            Calculez vos économies avec SenePay 💰
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Avec 1M FCFA de transactions mensuelles, économisez 
            <span className="font-bold text-yellow-300"> 180,000 FCFA/an</span> vs CinetPay
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">3.5%</div>
              <div className="text-sm opacity-80">Commission CinetPay</div>
              <div className="text-lg font-semibold mt-2">35,000 FCFA/mois</div>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm border-2 border-white/30">
              <div className="text-3xl font-bold mb-2 text-yellow-300">1.9%</div>
              <div className="text-sm opacity-80">Commission SenePay</div>
              <div className="text-lg font-semibold mt-2">19,000 FCFA/mois</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2 text-green-300">-46%</div>
              <div className="text-sm opacity-80">Économies</div>
              <div className="text-lg font-semibold mt-2">16,000 FCFA/mois</div>
            </div>
          </div>

          <Button className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-4 text-lg font-bold mt-8">
            Calculer mes économies personnalisées →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

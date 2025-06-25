
import { Card } from "@/components/ui/card";
import { Shield, Zap, Settings, BarChart3, Bell, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "API Ultra-rapide",
      description: "Réponse garantie < 200ms, uptime 99.9%, infrastructure AWS premium",
      color: "text-yellow-500",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Sécurité Militaire",
      description: "PCI DSS Level 1, chiffrement bout-en-bout, détection fraude IA",
      color: "text-green-500",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Avancé",
      description: "Dashboard temps réel, insights IA, prévisions de revenus",
      color: "text-blue-500",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Intégration 5min",
      description: "SDK pour tous les langages, plugins e-commerce, API REST simple",
      color: "text-purple-500",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Webhooks Intelligents",
      description: "Notifications temps réel, retry automatique, signatures sécurisées",
      color: "text-red-500",
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Support Premium",
      description: "Équipe locale Dakar, support Wolof/Français, SLA garanti",
      color: "text-indigo-500",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime garanti", sublabel: "Infrastructure premium" },
    { number: "<200ms", label: "Temps de réponse", sublabel: "API ultra-rapide" },
    { number: "50%", label: "Économies vs concurrence", sublabel: "Tarifs disruptifs" },
    { number: "5min", label: "Intégration complète", sublabel: "Documentation parfaite" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-800">Fonctionnalités</span>
            <br />
            <span className="gradient-text">révolutionnaires</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SenePay n'est pas juste une passerelle de paiement, c'est l'infrastructure complète 
            pour transformer votre business en machine à cash 💰
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border hover:shadow-lg transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-number mb-2">{stat.number}</div>
              <div className="font-semibold text-gray-800 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="feature-card group animate-fade-in"
              style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-senepay-orange transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Developer Experience */}
        <div className="mt-16 bg-gradient-to-r from-senepay-dark to-gray-900 rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Developer Experience 
                <span className="gradient-text"> Extraordinaire</span>
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Conçu par des développeurs, pour des développeurs. 
                Documentation interactive, SDKs ultra-simples, sandbox réaliste.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-senepay-gold rounded-full"></div>
                  <span>Documentation interactive Swagger</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-senepay-orange rounded-full"></div>
                  <span>SDKs pour 8+ langages de programmation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-senepay-green rounded-full"></div>
                  <span>Webhook debugger et testing tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Plugins WooCommerce, Shopify, Magento</span>
                </div>
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Terminal</span>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              
              <div className="font-mono text-sm space-y-2">
                <div className="text-gray-400"># Installation ultra-simple</div>
                <div className="text-green-400">$ npm install senepay-sdk</div>
                <div className="text-gray-400"># Premier paiement en 3 lignes</div>
                <div className="text-blue-400">const payment = await senepay.create({`{`}</div>
                <div className="text-white ml-4">amount: 10000, // 10k FCFA</div>
                <div className="text-white ml-4">methods: ['all']</div>
                <div className="text-blue-400">{`}`});</div>
                <div className="text-yellow-400">✨ Payment link ready!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;


import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Star, GitBranch, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SDKs = () => {
  const navigate = useNavigate();

  const sdks = [
    {
      name: "JavaScript/TypeScript",
      logo: "⚛️",
      description: "SDK officiel pour React, Next.js, Node.js et applications web modernes",
      downloads: "3.4k",
      stars: "156",
      version: "2.1.0",
      status: "stable",
      frameworks: ["React", "Next.js", "Node.js", "Express"],
      install: "npm install senepay-js"
    },
    {
      name: "PHP",
      logo: "🐘",
      description: "Intégration parfaite avec Laravel, Symfony et tous les frameworks PHP",
      downloads: "1.8k",
      stars: "89",
      version: "1.5.2",
      status: "stable",
      frameworks: ["Laravel", "Symfony", "CodeIgniter", "Yii"],
      install: "composer require senepay/senepay-php"
    },
    {
      name: "Python",
      logo: "🐍",
      description: "Compatible Django, Flask et FastAPI pour vos applications Python",
      downloads: "1.2k",
      stars: "67",
      version: "1.3.1",
      status: "stable",
      frameworks: ["Django", "Flask", "FastAPI", "Tornado"],
      install: "pip install senepay-python"
    },
    {
      name: "Java",
      logo: "☕",
      description: "SDK robuste pour Spring Boot et applications Java enterprise",
      downloads: "890",
      stars: "45",
      version: "1.2.0",
      status: "stable",
      frameworks: ["Spring Boot", "Maven", "Gradle", "Quarkus"],
      install: "implementation 'com.senepay:senepay-java:1.2.0'"
    },
    {
      name: "C# .NET",
      logo: "🔷",
      description: "Intégration native pour .NET Core, ASP.NET et applications Windows",
      downloads: "654",
      stars: "32",
      version: "1.1.0",
      status: "stable",
      frameworks: [".NET Core", "ASP.NET", "Blazor", "Xamarin"],
      install: "dotnet add package SenePay.Net"
    },
    {
      name: "Ruby",
      logo: "💎",
      description: "Gem optimisée pour Ruby on Rails et applications Ruby modernes",
      downloads: "432",
      stars: "28",
      version: "1.0.5",
      status: "stable",
      frameworks: ["Ruby on Rails", "Sinatra", "Hanami", "Grape"],
      install: "gem install senepay-ruby"
    },
    {
      name: "Go",
      logo: "🔵",
      description: "Module léger et performant pour applications Go haute performance",
      downloads: "298",
      stars: "19",
      version: "0.9.2",
      status: "beta",
      frameworks: ["Gin", "Echo", "Fiber", "Gorilla"],
      install: "go get github.com/senepay/senepay-go"
    },
    {
      name: "Flutter/Dart",
      logo: "📱",
      description: "Package Flutter pour intégrer SenePay dans vos apps mobiles",
      downloads: "567",
      stars: "41",
      version: "1.1.3",
      status: "stable",
      frameworks: ["Flutter", "Dart", "Mobile", "Web"],
      install: "flutter pub add senepay_flutter"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-senepay-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">🛠️</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              SDKs Officiels SenePay
            </h1>
            <p className="text-xl text-gray-300">
              Intégrez SenePay dans votre langage préféré en quelques minutes
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge variant="outline" className="bg-senepay-green text-white border-senepay-green">
                8 Langages
              </Badge>
              <Badge variant="outline" className="bg-senepay-gold text-black border-senepay-gold">
                Open Source
              </Badge>
              <Badge variant="outline" className="bg-senepay-orange text-white border-senepay-orange">
                Bien Documentés
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-senepay-gold mb-2">8</div>
              <div className="text-gray-600 text-sm">Langages Supportés</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-senepay-gold mb-2">9.2k+</div>
              <div className="text-gray-600 text-sm">Téléchargements</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-senepay-gold mb-2">477</div>
              <div className="text-gray-600 text-sm">GitHub Stars</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-senepay-gold mb-2">1.2k+</div>
              <div className="text-gray-600 text-sm">Développeurs Actifs</div>
            </Card>
          </div>

          {/* SDKs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sdks.map((sdk, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{sdk.logo}</div>
                    <div>
                      <h3 className="text-lg font-bold text-senepay-dark">{sdk.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>v{sdk.version}</span>
                        <Badge 
                          variant="outline" 
                          className={sdk.status === 'stable' ? 'border-senepay-green text-senepay-green' : 'border-yellow-500 text-yellow-600'}
                        >
                          {sdk.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {sdk.description}
                </p>

                {/* Frameworks */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {sdk.frameworks.map((framework, fIndex) => (
                    <Badge key={fIndex} variant="secondary" className="text-xs">
                      {framework}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>{sdk.downloads}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>{sdk.stars}</span>
                  </div>
                </div>

                {/* Install Command */}
                <div className="bg-gray-900 rounded-lg p-3 mb-4">
                  <code className="text-sm text-gray-300 font-mono">
                    {sdk.install}
                  </code>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-senepay-gold hover:bg-senepay-orange text-black"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Installer
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <GitBranch className="h-4 w-4 mr-1" />
                    GitHub
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Community */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 border-senepay-gold/20">
            <div className="text-center">
              <Users className="h-16 w-16 text-senepay-gold mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4 text-senepay-dark">
                Communauté Open Source
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Nos SDKs sont open source et maintenus par une communauté active de développeurs. 
                Contribuez, signalez des bugs ou proposez de nouvelles fonctionnalités !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-senepay-gold hover:bg-senepay-orange text-black px-8 py-3">
                  <GitBranch className="h-5 w-5 mr-2" />
                  Voir sur GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="border-senepay-gold text-senepay-dark hover:bg-senepay-gold/10 px-8 py-3"
                >
                  Rejoindre Discord
                </Button>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-senepay rounded-2xl p-8 inline-block">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Votre Langage n'est pas Listé ?
              </h3>
              <p className="text-lg mb-6 opacity-90 text-white">
                Contactez-nous pour prioriser le développement de votre SDK préféré
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-white text-senepay-dark hover:bg-gray-100 px-8 py-3 font-bold"
                >
                  Demander un SDK
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/documentation')}
                  className="border-white text-white hover:bg-white hover:text-senepay-dark px-8 py-3"
                >
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

export default SDKs;

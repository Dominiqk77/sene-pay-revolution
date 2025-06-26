
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/Logo";

const Footer = () => {
  const footerSections = [{
    title: "Produit",
    links: [{
      name: "API Documentation",
      href: "#"
    }, {
      name: "SDKs",
      href: "#"
    }, {
      name: "Plugins",
      href: "#"
    }, {
      name: "Webhook",
      href: "#"
    }, {
      name: "Sandbox",
      href: "#"
    }]
  }, {
    title: "Solutions",
    links: [{
      name: "E-commerce",
      href: "#"
    }, {
      name: "Marketplaces",
      href: "#"
    }, {
      name: "SaaS",
      href: "#"
    }, {
      name: "Mobile Apps",
      href: "#"
    }, {
      name: "Subscriptions",
      href: "#"
    }]
  }, {
    title: "Ressources",
    links: [{
      name: "Documentation",
      href: "#"
    }, {
      name: "Guides",
      href: "#"
    }, {
      name: "Blog Tech",
      href: "#"
    }, {
      name: "Status Page",
      href: "#"
    }, {
      name: "Changelog",
      href: "#"
    }]
  }, {
    title: "Entreprise",
    links: [{
      name: "À propos",
      href: "#"
    }, {
      name: "Carrières",
      href: "#"
    }, {
      name: "Partenaires",
      href: "#"
    }, {
      name: "Presse",
      href: "#"
    }, {
      name: "Contact",
      href: "#"
    }]
  }];

  const paymentMethods = [{
    name: "Orange Money",
    color: "bg-orange-500"
  }, {
    name: "Wave",
    color: "bg-blue-600"
  }, {
    name: "Free Money",
    color: "bg-green-600"
  }, {
    name: "Wizall",
    color: "bg-purple-600"
  }, {
    name: "Visa",
    color: "bg-blue-800"
  }, {
    name: "Mastercard",
    color: "bg-red-600"
  }];

  return (
    <footer className="bg-senepay-dark text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand avec nouveau logo premium */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo size="md" variant="white" interactive={true} />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              La passerelle de paiement révolutionnaire qui connecte l'Afrique de l'Ouest 
              à l'économie numérique mondiale.
            </p>
            
            {/* Payment Methods */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-300">Moyens de paiement intégrés</p>
              <div className="grid grid-cols-3 gap-2">
                {paymentMethods.map(method => (
                  <div key={method.name} className={`${method.color} rounded p-2 text-center`}>
                    <span className="text-xs font-bold text-white">
                      {method.name.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-senepay-gold transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-gray-700 mb-8" />

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">1,500+</div>
            <div className="text-gray-400 text-sm">Marchands actifs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">15M+</div>
            <div className="text-gray-400 text-sm">Transactions traitées</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-gray-400 text-sm">Uptime garanti</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">8</div>
            <div className="text-gray-400 text-sm">Pays CEDEAO</div>
          </div>
        </div>

        <Separator className="bg-gray-700 mb-8" />

        {/* Bottom Footer - Optimisé mobile */}
        <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
          {/* Copyright et liens légaux - Version mobile optimisée */}
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-6">
            <span className="text-sm text-gray-400 text-center lg:text-left">
              © 2025 SenePay. Tous droits réservés.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> Powered by </span>
              <span className="block sm:inline text-xs sm:text-sm">Millennium Capital Invest</span>
            </span>
            
            {/* Liens légaux - Mobile friendly */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-center lg:text-left">
              <a href="#" className="text-sm text-gray-400 hover:text-senepay-gold transition-colors touch-manipulation py-2 sm:py-0">
                Politique de confidentialité
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-senepay-gold transition-colors touch-manipulation py-2 sm:py-0">
                Conditions d'utilisation
              </a>
            </div>
          </div>

          {/* Status et réseaux sociaux */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-senepay-green rounded-full animate-pulse"></div>
              <span>Tous les systèmes opérationnels</span>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-senepay-gold transition-colors touch-manipulation">
                <span className="sr-only">Twitter</span>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-senepay-gold transition-colors">
                  <span className="text-xs font-bold">T</span>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-senepay-gold transition-colors touch-manipulation">
                <span className="sr-only">LinkedIn</span>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-senepay-gold transition-colors">
                  <span className="text-xs font-bold">L</span>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-senepay-gold transition-colors touch-manipulation">
                <span className="sr-only">GitHub</span>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-senepay-gold transition-colors">
                  <span className="text-xs font-bold">G</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-senepay rounded-2xl p-6 inline-block">
            <p className="text-lg font-semibold mb-2">
              🚀 Prêt à révolutionner vos paiements ?
            </p>
            <p className="text-sm opacity-90">
              Rejoignez la révolution fintech ouest-africaine dès aujourd'hui
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

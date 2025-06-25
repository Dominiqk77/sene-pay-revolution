
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Solutions", href: "/#solutions" },
    { name: "Tarifs", href: "/#pricing" },
    { name: "Développeurs", href: "/documentation" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.substring(1);
    return location.pathname === href;
  };

  return (
    <>
      {/* Preload du logo pour chargement instantané */}
      <link 
        rel="preload" 
        href="/lovable-uploads/569b505b-54ae-41ef-b693-b571bf20d5e7.png" 
        as="image"
        type="image/png"
      />
      
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo avec chargement optimisé instantané */}
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center space-x-2 transition-all duration-500 hover:scale-110 cursor-pointer group">
                <div className="w-10 h-10 relative overflow-hidden rounded-xl transform transition-all duration-500 group-hover:rotate-12 group-hover:shadow-2xl">
                  <img 
                    src="/lovable-uploads/569b505b-54ae-41ef-b693-b571bf20d5e7.png"
                    alt="SenePay Logo"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    style={{ 
                      imageRendering: 'crisp-edges',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <span className="text-2xl gradient-text font-bold tracking-tight transition-all duration-500 group-hover:tracking-wide">
                  SenePay
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors duration-200 font-medium ${
                    isActive(item.href) 
                      ? 'text-senepay-orange border-b-2 border-senepay-orange pb-1' 
                      : 'text-gray-700 hover:text-senepay-orange'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline" className="border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    onClick={signOut}
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="outline" className="border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white">
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="btn-senepay">
                      Commencer
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 animate-fade-in">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`transition-colors duration-200 font-medium px-4 py-2 ${
                      isActive(item.href) 
                        ? 'text-senepay-orange bg-senepay-orange/10 rounded-lg' 
                        : 'text-gray-700 hover:text-senepay-orange'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 px-4 pt-4">
                  {user ? (
                    <>
                      <Link to="/dashboard">
                        <Button variant="outline" className="w-full border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white">
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        onClick={signOut}
                        variant="ghost"
                        className="w-full text-gray-600 hover:text-gray-800"
                      >
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth">
                        <Button variant="outline" className="w-full border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white">
                          Connexion
                        </Button>
                      </Link>
                      <Link to="/auth">
                        <Button className="w-full btn-senepay">
                          Commencer
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

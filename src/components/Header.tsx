
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
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo avec chargement optimisé instantané */}
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center space-x-2 transition-all duration-700 hover:scale-105 cursor-pointer group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 relative overflow-hidden rounded-xl transform transition-all duration-700 group-hover:rotate-6 group-hover:shadow-xl">
                  <img 
                    src="/lovable-uploads/569b505b-54ae-41ef-b693-b571bf20d5e7.png"
                    alt="SenePay Logo"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    style={{ 
                      imageRendering: 'crisp-edges',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight transition-all duration-700 group-hover:tracking-wide navbar-gradient-text">
                  SenePay
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors duration-200 font-medium text-sm xl:text-base ${
                    isActive(item.href) 
                      ? 'text-senepay-orange border-b-2 border-senepay-orange pb-1' 
                      : 'text-gray-700 hover:text-senepay-orange'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white text-sm"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    onClick={signOut}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white text-sm"
                    >
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button 
                      size="sm"
                      className="btn-senepay text-sm px-4 py-2"
                    >
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
                className="h-10 w-10 p-0"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 animate-fade-in bg-white/95 backdrop-blur-sm border-t border-gray-100">
              <nav className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`transition-colors duration-200 font-medium px-4 py-3 rounded-lg touch-manipulation ${
                      isActive(item.href) 
                        ? 'text-senepay-orange bg-senepay-orange/10' 
                        : 'text-gray-700 hover:text-senepay-orange hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-200 mt-4">
                  {user ? (
                    <>
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button 
                          variant="outline" 
                          className="w-full h-12 border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white touch-manipulation"
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        variant="ghost"
                        className="w-full h-12 text-gray-600 hover:text-gray-800 touch-manipulation"
                      >
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <Button 
                          variant="outline" 
                          className="w-full h-12 border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white touch-manipulation"
                        >
                          Connexion
                        </Button>
                      </Link>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full h-12 btn-senepay touch-manipulation">
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

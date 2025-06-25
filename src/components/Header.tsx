
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

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
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-senepay rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold gradient-text">SenePay</span>
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
  );
};

export default Header;

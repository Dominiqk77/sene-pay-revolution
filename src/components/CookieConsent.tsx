import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Shield, Cookie, Settings, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('senepay_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const saveCookiePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('senepay_cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('senepay_cookie_consent_date', new Date().toISOString());
    setIsVisible(false);
    
    // Initialize analytics based on preferences
    if (prefs.analytics) {
      // Initialize analytics tools here
      console.log('Analytics cookies enabled');
    }
    if (prefs.marketing) {
      // Initialize marketing tools here
      console.log('Marketing cookies enabled');
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveCookiePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    saveCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  const saveCustomPreferences = () => {
    saveCookiePreferences(preferences);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center p-4">
      <Card className={cn(
        "w-full max-w-2xl mx-auto transition-all duration-500",
        showDetails ? "h-auto" : "h-auto"
      )}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-senepay rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Protection de vos données 🇸🇳</CardTitle>
                <CardDescription>
                  SenePay respecte votre vie privée conformément au RGPD
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="border-senepay-orange text-senepay-orange">
              RGPD
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {!showDetails ? (
            <>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience sur SenePay, 
                analyser notre trafic et personnaliser le contenu. Vous pouvez choisir 
                quels cookies accepter.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={acceptAll}
                  className="btn-senepay flex-1"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Tout accepter
                </Button>
                <Button 
                  onClick={acceptNecessary}
                  variant="outline"
                  className="flex-1 border-senepay-gold text-senepay-gold hover:bg-senepay-gold hover:text-white"
                >
                  Nécessaires uniquement
                </Button>
                <Button 
                  onClick={() => setShowDetails(true)}
                  variant="ghost"
                  className="flex-1"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Personnaliser
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="grid gap-4">
                  {/* Cookies nécessaires */}
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Cookie className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">Cookies nécessaires</span>
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          Obligatoires
                        </Badge>
                      </div>
                      <p className="text-xs text-green-700">
                        Essentiels au fonctionnement du site (authentification, sécurité, panier)
                      </p>
                    </div>
                    <Switch checked={true} disabled />
                  </div>

                  {/* Cookies analytiques */}
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Cookie className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Cookies analytiques</span>
                        <Badge variant="outline" className="text-xs">
                          Optionnels
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nous aident à comprendre comment vous utilisez notre site (Google Analytics)
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, analytics: checked }))
                      }
                    />
                  </div>

                  {/* Cookies marketing */}
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Cookie className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Cookies marketing</span>
                        <Badge variant="outline" className="text-xs">
                          Optionnels
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Personnalisent les publicités et mesurent leur efficacité
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, marketing: checked }))
                      }
                    />
                  </div>

                  {/* Cookies de préférences */}
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Cookie className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">Cookies de préférences</span>
                        <Badge variant="outline" className="text-xs">
                          Optionnels
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Mémorisent vos préférences (langue, thème, devises)
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.preferences}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, preferences: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button 
                    onClick={saveCustomPreferences}
                    className="btn-senepay flex-1"
                  >
                    Sauvegarder mes préférences
                  </Button>
                  <Button 
                    onClick={() => setShowDetails(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Retour
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
            <span>
              En savoir plus : 
              <a href="/privacy-policy" className="text-senepay-orange hover:underline ml-1">
                Politique de confidentialité
              </a>
            </span>
            <span>SenePay - RGPD Compliant</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
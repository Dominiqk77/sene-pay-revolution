
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
      setIsInstalled(isStandalone || isFullscreen);
    };

    checkIfInstalled();

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show install banner after 3 seconds if not installed
      setTimeout(() => {
        if (!isInstalled) {
          setShowInstallBanner(true);
        }
      }, 3000);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
    }
    
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-banner-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || sessionStorage.getItem('pwa-banner-dismissed')) {
    return null;
  }

  return (
    <>
      {/* Install Banner */}
      {showInstallBanner && deferredPrompt && (
        <div className="fixed top-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
          <div className="bg-gradient-senepay text-white p-4 rounded-lg shadow-2xl animate-slide-in">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Installer SenePay</h3>
                  <p className="text-xs opacity-90">Accès rapide depuis votre écran d'accueil</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="text-white hover:bg-white/20 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleInstallClick}
                size="sm"
                className="bg-white text-senepay-orange hover:bg-gray-100 flex-1"
              >
                <Download className="h-3 w-3 mr-1" />
                Installer
              </Button>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                Plus tard
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Install Button */}
      {deferredPrompt && !showInstallBanner && (
        <Button
          onClick={handleInstallClick}
          className="fixed bottom-6 right-6 z-40 bg-gradient-senepay hover:shadow-lg transition-all duration-300 animate-pulse-gold"
          size="lg"
        >
          <Download className="h-5 w-5 mr-2" />
          Installer App
        </Button>
      )}
    </>
  );
};

export default PWAInstallButton;

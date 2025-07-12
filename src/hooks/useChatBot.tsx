import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface ChatTrigger {
  message: string;
  context?: any;
}

export function useChatBot() {
  const [trigger, setTrigger] = useState<ChatTrigger | null>(null);
  const location = useLocation();

  const triggerChat = useCallback((message: string, context?: any) => {
    setTrigger({
      message,
      context: {
        ...context,
        currentPath: location.pathname,
        timestamp: new Date().toISOString()
      }
    });
  }, [location.pathname]);

  const triggerWelcome = useCallback(() => {
    const welcomeMessages = {
      '/': "Bienvenue sur SenePay ! Besoin d'aide pour commencer ?",
      '/dashboard': "Comment puis-je vous aider avec votre dashboard ?",
      '/api-documentation': "Des questions sur notre API ?",
      '/pricing': "Voulez-vous calculer vos économies avec SenePay ?",
      '/contact': "Besoin d'assistance ? Je suis là pour vous aider !",
      '/checkout': "Problème avec le processus de paiement ?",
      '/sandbox': "Besoin d'aide pour tester l'intégration ?"
    };

    const message = welcomeMessages[location.pathname as keyof typeof welcomeMessages] || 
                   "Comment puis-je vous aider aujourd'hui ?";
    
    triggerChat(message, { type: 'welcome', page: location.pathname });
  }, [location.pathname, triggerChat]);

  const triggerError = useCallback((error: string, details?: any) => {
    triggerChat(
      `Je vois que vous avez rencontré une erreur: "${error}". Puis-je vous aider à la résoudre ?`,
      { type: 'error', error, details }
    );
  }, [triggerChat]);

  const triggerIntegration = useCallback((step: string) => {
    triggerChat(
      `Besoin d'aide avec l'étape "${step}" de l'intégration ?`,
      { type: 'integration', step }
    );
  }, [triggerChat]);

  const triggerPaymentMethod = useCallback((method: string) => {
    const messages = {
      'orange_money': "Questions sur l'intégration Orange Money ?",
      'wave': "Besoin d'aide avec Wave ?",
      'free_money': "Comment intégrer Free Money ?",
      'wizall': "Assistance pour Wizall ?",
      'card': "Questions sur les paiements par carte ?"
    };

    const message = messages[method as keyof typeof messages] || 
                   `Questions sur le paiement ${method} ?`;
    
    triggerChat(message, { type: 'payment_method', method });
  }, [triggerChat]);

  const clearTrigger = useCallback(() => {
    setTrigger(null);
  }, []);

  return {
    trigger,
    triggerChat,
    triggerWelcome,
    triggerError,
    triggerIntegration,
    triggerPaymentMethod,
    clearTrigger
  };
}
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, ThumbsUp, ThumbsDown, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { useChatBot } from '@/hooks/useChatBot';
import ContextualOffers from '@/components/chat/ContextualOffers';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

interface ChatBotProps {
  trigger?: string;
  context?: any;
}

export default function ChatBot({ trigger, context = {} }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [leadData, setLeadData] = useState<any>(null);
  const [contextualOffers, setContextualOffers] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { trigger: chatTrigger } = useChatBot();

  // Initialize with contextual welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const currentPath = window.location.pathname;
      let welcomeContent = `Bonjour ! 👋 Je suis l'assistant IA de SenePay.`;
      let suggestions = [
        "Comment intégrer SenePay ?",
        "Voir les tarifs",
        "Documentation développeur",
        "Support technique"
      ];

      // Contextual welcome based on current page
      switch (currentPath) {
        case '/dashboard':
          welcomeContent += ` Comment puis-je vous aider avec votre dashboard marchand ?`;
          suggestions = [
            "Analyser mes transactions",
            "Optimiser mon intégration",
            "Configurer les webhooks",
            "Support technique"
          ];
          break;
        case '/api-documentation':
          welcomeContent += ` Des questions sur notre API ?`;
          suggestions = [
            "Créer un premier paiement",
            "Configuration webhooks",
            "Gestion des erreurs",
            "Exemples de code"
          ];
          break;
        case '/pricing':
          welcomeContent += ` Voulez-vous calculer vos économies avec SenePay ?`;
          suggestions = [
            "Comparer avec mes coûts actuels",
            "Calculer mon ROI",
            "Tarifs enterprise",
            "Réduction de volume"
          ];
          break;
        case '/checkout':
          welcomeContent += ` Problème avec le processus de paiement ?`;
          suggestions = [
            "Résoudre une erreur",
            "Optimiser la conversion",
            "Tester les paiements",
            "Support technique"
          ];
          break;
        default:
          welcomeContent += ` Comment puis-je vous aider aujourd'hui ?`;
      }

      const welcomeMessage: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: welcomeContent,
        timestamp: new Date().toISOString(),
        suggestions
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Handle external triggers
  useEffect(() => {
    if (chatTrigger) {
      if (!isOpen) setIsOpen(true);
      handleSendMessage(chatTrigger.message);
    }
  }, [chatTrigger]);

  // Handle trigger context
  useEffect(() => {
    if (trigger && isOpen) {
      handleSendMessage(trigger);
    }
  }, [trigger, isOpen]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (messageText?: string) => {
    const message = messageText || inputValue.trim();
    if (!message) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('senepay-ai-chat', {
        body: {
          message,
          sessionId,
          userId: user?.id || null,
          context: {
            ...context,
            currentPath: window.location.pathname,
            userAgent: navigator.userAgent
          }
        }
      });

      if (error) throw error;

      // Mettre à jour les données de lead et offres
      if (data.leadData) {
        setLeadData(data.leadData);
      }
      if (data.leadData?.offers) {
        setContextualOffers(data.leadData.offers);
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
        suggestions: data.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: 'Désolé, une erreur est survenue. Veuillez contacter le support au +221 77 656 40 42.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast({
        title: "Erreur",
        description: "Impossible de contacter l'assistant IA",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleFeedback = async (messageId: string, rating: number) => {
    try {
      await supabase.from('chat_feedback').insert({
        message_id: messageId,
        rating,
        user_id: user?.id || null
      });
      toast({
        title: "Merci !",
        description: "Votre feedback nous aide à améliorer l'assistant."
      });
    } catch (error) {
      console.error('Feedback error:', error);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 bg-primary hover:bg-primary/90"
        title="Ouvrir le chat IA (Ctrl+Shift+C)"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-12' : 'w-96 h-[600px]'
    }`}>
      {/* Chat Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-semibold">Assistant SenePay</h3>
          <Badge variant="secondary" className="text-xs">IA</Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <div className="bg-background border-l border-r h-[480px] flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-12' 
                        : 'bg-muted mr-12'
                    }`}>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      
                      {message.type === 'assistant' && message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs h-7"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      {message.type === 'assistant' && (
                        <div className="flex items-center gap-2 mt-2 opacity-60">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleFeedback(message.id, 5)}
                            className="h-6 w-6 p-0 hover:opacity-100"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleFeedback(message.id, 1)}
                            className="h-6 w-6 p-0 hover:opacity-100"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg mr-12">
                      <div className="flex items-center gap-1">
                        <div className="animate-bounce w-2 h-2 bg-primary rounded-full"></div>
                        <div className="animate-bounce w-2 h-2 bg-primary rounded-full" style={{ animationDelay: '0.1s' }}></div>
                        <div className="animate-bounce w-2 h-2 bg-primary rounded-full" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Offres contextuelles intelligentes */}
                {contextualOffers.length > 0 && (
                  <ContextualOffers 
                    offers={contextualOffers}
                    leadData={leadData}
                    onOfferAccepted={(offerId, offerType) => {
                      toast({
                        title: "🎯 Lead qualifié !",
                        description: `Action ${offerType} déclenchée pour optimiser la conversion.`
                      });
                    }}
                  />
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tapez votre message..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                Ctrl+Shift+C pour ouvrir • ESC pour fermer
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom border for minimized state */}
      {isMinimized && (
        <div className="bg-background border rounded-b-lg h-0"></div>
      )}
    </div>
  );
}
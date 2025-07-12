import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Gift, Zap, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContextualOffer {
  id: string;
  offer_name: string;
  offer_type: 'discount' | 'trial_extension' | 'feature_unlock' | 'consultation' | 'demo';
  discount_percentage?: number;
  discount_amount?: number;
  validity_hours: number;
  offer_text: string;
  call_to_action: string;
  current_uses: number;
  max_uses?: number;
  conversion_rate: number;
}

interface ContextualOffersProps {
  offers: ContextualOffer[];
  leadData?: {
    score: number;
    qualification: string;
    profile_type: string;
  };
  onOfferAccepted: (offerId: string, offerType: string) => void;
}

export default function ContextualOffers({ offers, leadData, onOfferAccepted }: ContextualOffersProps) {
  const [acceptedOffers, setAcceptedOffers] = useState<Set<string>>(new Set());

  if (!offers || offers.length === 0) {
    return null;
  }

  const getOfferIcon = (offerType: string) => {
    switch (offerType) {
      case 'discount': return <Gift className="h-5 w-5 text-green-600" />;
      case 'demo': return <Zap className="h-5 w-5 text-blue-600" />;
      case 'consultation': return <CheckCircle className="h-5 w-5 text-purple-600" />;
      case 'trial_extension': return <Clock className="h-5 w-5 text-orange-600" />;
      default: return <TrendingUp className="h-5 w-5 text-primary" />;
    }
  };

  const getOfferGradient = (offerType: string) => {
    switch (offerType) {
      case 'discount': return 'from-green-500 to-emerald-600';
      case 'demo': return 'from-blue-500 to-cyan-600';
      case 'consultation': return 'from-purple-500 to-violet-600';
      case 'trial_extension': return 'from-orange-500 to-red-600';
      default: return 'from-primary to-primary-600';
    }
  };

  const calculateTimeRemaining = (validityHours: number) => {
    const hours = validityHours;
    if (hours < 1) return 'Expire bientôt !';
    if (hours < 24) return `${hours}h restantes`;
    const days = Math.floor(hours / 24);
    return `${days}j restantes`;
  };

  const handleOfferAccept = async (offer: ContextualOffer) => {
    if (acceptedOffers.has(offer.id)) return;

    try {
      // Marquer l'offre comme acceptée
      setAcceptedOffers(prev => new Set(prev).add(offer.id));
      
      // Callback parent
      onOfferAccepted(offer.id, offer.offer_type);
      
      // Simulation d'actions selon le type d'offre
      switch (offer.offer_type) {
        case 'discount':
          toast({
            title: "🎉 Offre activée !",
            description: `Votre réduction de ${offer.discount_percentage}% est maintenant active. Utilisez le code lors de votre inscription.`,
          });
          // Rediriger vers l'inscription avec le code promo
          window.open('https://senepay.com/register?promo=' + offer.id, '_blank');
          break;
          
        case 'demo':
          toast({
            title: "📅 Démo réservée !",
            description: "Un expert SenePay vous contactera dans les 30 minutes pour votre démonstration personnalisée.",
          });
          // Ouvrir calendly ou formulaire de contact
          window.open('https://calendly.com/senepay-demo', '_blank');
          break;
          
        case 'consultation':
          toast({
            title: "💡 Consultation programmée !",
            description: "Votre consultation gratuite de 30 minutes est confirmée. Vous recevrez un lien de rendez-vous par email.",
          });
          break;
          
        case 'trial_extension':
          toast({
            title: "⏰ Essai prolongé !",
            description: "Votre période d'essai a été automatiquement prolongée de 30 jours supplémentaires.",
          });
          break;
          
        default:
          toast({
            title: "✅ Offre acceptée !",
            description: "Notre équipe va vous contacter rapidement pour finaliser votre demande.",
          });
      }
    } catch (error) {
      console.error('Erreur acceptation offre:', error);
      toast({
        title: "Erreur",
        description: "Impossible de traiter votre demande. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-3 mt-4">
      {/* Header des offres */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Offres exclusives personnalisées</span>
        </div>
        {leadData && (
          <Badge variant="outline" className="text-xs">
            Score: {leadData.score}/100
          </Badge>
        )}
      </div>
      
      {offers.slice(0, 2).map((offer) => {
        const isAccepted = acceptedOffers.has(offer.id);
        const timeRemaining = calculateTimeRemaining(offer.validity_hours);
        const isUrgent = offer.validity_hours <= 6;
        
        return (
          <Card key={offer.id} className={`relative overflow-hidden border transition-all duration-300 ${
            isAccepted ? 'border-green-500 bg-green-50' : 
            isUrgent ? 'border-red-500 shadow-lg animate-pulse' : 'hover:shadow-md'
          }`}>
            {/* Gradient header */}
            <div className={`h-2 bg-gradient-to-r ${getOfferGradient(offer.offer_type)}`} />
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getOfferIcon(offer.offer_type)}
                    <h4 className="font-semibold text-sm">{offer.offer_name}</h4>
                    {isUrgent && (
                      <Badge variant="destructive" className="text-xs animate-bounce">
                        URGENT
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {offer.offer_text}
                  </p>
                  
                  {/* Détails de l'offre */}
                  <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                    {offer.discount_percentage && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{offer.discount_percentage}% de réduction</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className={isUrgent ? 'text-red-600 font-medium' : ''}>
                        {timeRemaining}
                      </span>
                    </div>
                    {offer.conversion_rate > 0 && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>{Math.round(offer.conversion_rate * 100)}% de succès</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Barre de progression pour les offres limitées */}
                  {offer.max_uses && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Places disponibles</span>
                        <span>{offer.max_uses - offer.current_uses}/{offer.max_uses}</span>
                      </div>
                      <Progress 
                        value={((offer.max_uses - offer.current_uses) / offer.max_uses) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                </div>
                
                {/* Action button */}
                <div className="flex flex-col items-end gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleOfferAccept(offer)}
                    disabled={isAccepted}
                    className={`whitespace-nowrap ${
                      isAccepted ? 'bg-green-600 hover:bg-green-600' :
                      isUrgent ? 'bg-red-600 hover:bg-red-700 animate-pulse' : ''
                    }`}
                  >
                    {isAccepted ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Acceptée
                      </>
                    ) : (
                      <>
                        {offer.call_to_action}
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </>
                    )}
                  </Button>
                  
                  {offer.discount_percentage && !isAccepted && (
                    <Badge variant="secondary" className="text-xs">
                      -{offer.discount_percentage}%
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Message de qualification pour leads chauds */}
              {leadData?.qualification === 'hot' && !isAccepted && (
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                  🔥 <strong>Lead prioritaire !</strong> Cette offre exclusive vous est réservée pendant {timeRemaining}.
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
      
      {/* Footer informatif */}
      <div className="text-xs text-center text-muted-foreground pt-2 border-t">
        💡 Offres personnalisées basées sur votre profil et vos besoins détectés par l'IA
      </div>
    </div>
  );
}
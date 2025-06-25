
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Smartphone, 
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowLeft
} from "lucide-react";
import Header from "@/components/Header";

interface Transaction {
  id: string;
  reference_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_method: string;
  customer_email: string;
  customer_phone: string;
  customer_name: string;
  description: string;
  expires_at: string;
  merchant_accounts: {
    business_name: string;
  };
}

interface PaymentMethod {
  code: string;
  name: string;
  description: string;
  config: {
    success_rate: number;
    min_delay: number;
    max_delay: number;
  };
}

const Checkout = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (paymentId) {
      fetchTransaction();
      fetchPaymentMethods();
    }
  }, [paymentId]);

  useEffect(() => {
    if (transaction) {
      const expiresAt = new Date(transaction.expires_at).getTime();
      const now = new Date().getTime();
      const timeLeft = Math.max(0, Math.floor((expiresAt - now) / 1000));
      setCountdown(timeLeft);

      if (timeLeft > 0) {
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              toast({
                title: "Paiement expiré",
                description: "Cette demande de paiement a expiré",
                variant: "destructive"
              });
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      }
    }
  }, [transaction, toast]);

  const fetchTransaction = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          merchant_accounts!inner(business_name)
        `)
        .eq('id', paymentId)
        .single();

      if (error) throw error;
      
      setTransaction(data);
      setCustomerPhone(data.customer_phone || "");
    } catch (error) {
      console.error('Error fetching transaction:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails du paiement",
        variant: "destructive"
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setPaymentMethods(data || []);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  const simulatePayment = async () => {
    if (!selectedMethod || !paymentId) return;

    setProcessing(true);
    setProcessingStep("Initialisation du paiement...");

    try {
      // Appel à l'edge function simulate-payment
      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/simulate-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.supabaseKey}`
        },
        body: JSON.stringify({
          payment_id: paymentId,
          payment_method: selectedMethod,
          customer_phone: customerPhone
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors du traitement du paiement');
      }

      const result = await response.json();

      // Simulation des étapes de paiement
      const steps = getPaymentSteps(selectedMethod);
      for (let i = 0; i < steps.length; i++) {
        setProcessingStep(steps[i]);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      }

      if (result.status === 'completed') {
        setProcessingStep("Paiement confirmé !");
        toast({
          title: "Paiement réussi ! 🎉",
          description: `Transaction ${result.reference} confirmée`,
        });
        
        setTimeout(() => {
          if (result.redirect_url) {
            window.location.href = result.redirect_url;
          } else {
            navigate("/");
          }
        }, 2000);
      } else {
        setProcessingStep("Échec du paiement");
        toast({
          title: "Paiement échoué",
          description: result.error_message || "Une erreur est survenue",
          variant: "destructive"
        });
        
        setTimeout(() => {
          if (result.redirect_url) {
            window.location.href = result.redirect_url;
          } else {
            setProcessing(false);
            setProcessingStep("");
          }
        }, 3000);
      }

    } catch (error) {
      console.error('Payment simulation error:', error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur technique est survenue",
        variant: "destructive"
      });
      setProcessing(false);
      setProcessingStep("");
    }
  };

  const getPaymentSteps = (method: string): string[] => {
    const steps: Record<string, string[]> = {
      orange_money: [
        "Connexion à Orange Money...",
        "Vérification du solde...",
        "Demande de confirmation...",
        "Traitement du paiement..."
      ],
      wave: [
        "Connexion à Wave...",
        "Envoi du code de vérification...",
        "Vérification OTP...",
        "Finalisation du paiement..."
      ],
      visa_card: [
        "Validation de la carte...",
        "Vérification 3D Secure...",
        "Autorisation bancaire...",
        "Confirmation du paiement..."
      ],
      mastercard: [
        "Validation de la carte...",
        "Vérification 3D Secure...",
        "Autorisation bancaire...",
        "Confirmation du paiement..."
      ]
    };

    return steps[method] || [
      "Initialisation...",
      "Traitement...",
      "Vérification...",
      "Finalisation..."
    ];
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getMethodIcon = (code: string) => {
    if (code.includes('card') || code === 'visa_card' || code === 'mastercard') {
      return <CreditCard className="h-6 w-6" />;
    }
    return <Smartphone className="h-6 w-6" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-senepay-orange" />
            <p className="text-gray-600">Chargement du paiement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Paiement introuvable</h2>
              <p className="text-gray-600 mb-4">Ce lien de paiement n'existe pas ou a expiré.</p>
              <Button onClick={() => navigate("/")} className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (transaction.status !== 'pending') {
    const statusConfig = {
      completed: { 
        icon: <CheckCircle className="h-12 w-12 text-green-500" />, 
        title: "Paiement confirmé", 
        description: "Cette transaction a déjà été traitée avec succès." 
      },
      failed: { 
        icon: <AlertCircle className="h-12 w-12 text-red-500" />, 
        title: "Paiement échoué", 
        description: "Cette transaction a échoué." 
      },
      expired: { 
        icon: <Clock className="h-12 w-12 text-orange-500" />, 
        title: "Paiement expiré", 
        description: "Cette demande de paiement a expiré." 
      }
    };

    const config = statusConfig[transaction.status as keyof typeof statusConfig] || statusConfig.failed;

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              {config.icon}
              <h2 className="text-xl font-semibold mb-2">{config.title}</h2>
              <p className="text-gray-600 mb-4">{config.description}</p>
              <div className="text-sm text-gray-500 mb-4">
                <p>Référence: {transaction.reference_id}</p>
                <p>Montant: {transaction.amount.toLocaleString()} {transaction.currency}</p>
              </div>
              <Button onClick={() => navigate("/")} className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 container mx-auto px-4 py-8 max-w-2xl">
        {/* Informations de paiement */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Finaliser votre paiement</CardTitle>
                <CardDescription>
                  Commande chez {transaction.merchant_accounts.business_name}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-senepay-orange">
                  {transaction.amount.toLocaleString()} {transaction.currency}
                </div>
                <div className="text-sm text-gray-500">
                  Réf: {transaction.reference_id}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {transaction.description && (
              <p className="text-gray-600 mb-4">{transaction.description}</p>
            )}
            
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-gray-600">Expire dans :</span>
              <Badge variant={countdown < 300 ? "destructive" : "secondary"}>
                {formatTime(countdown)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Écran de traitement */}
        {processing && (
          <Card className="mb-6">
            <CardContent className="p-8 text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-senepay-orange" />
              <h3 className="text-lg font-semibold mb-2">Traitement en cours...</h3>
              <p className="text-gray-600">{processingStep}</p>
              <div className="mt-4 text-sm text-gray-500">
                Ne fermez pas cette page pendant le traitement
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sélection de méthode de paiement */}
        {!processing && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Choisir votre méthode de paiement</CardTitle>
                <CardDescription>
                  Sélectionnez comment vous souhaitez payer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {paymentMethods.map((method) => (
                    <div 
                      key={method.code}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedMethod === method.code 
                          ? 'border-senepay-orange bg-senepay-orange/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedMethod(method.code)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          selectedMethod === method.code 
                            ? 'bg-senepay-orange text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {getMethodIcon(method.code)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{method.name}</h4>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {Math.round(method.config.success_rate * 100)}% réussite
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Informations client */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Informations de paiement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customer_phone">Numéro de téléphone</Label>
                  <Input
                    id="customer_phone"
                    type="tel"
                    placeholder="+221 77 123 45 67"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Nécessaire pour les paiements mobile money
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Annuler
              </Button>
              <Button 
                onClick={simulatePayment}
                disabled={!selectedMethod || countdown === 0}
                className="flex-1 btn-senepay"
              >
                Payer {transaction.amount.toLocaleString()} {transaction.currency}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Checkout;

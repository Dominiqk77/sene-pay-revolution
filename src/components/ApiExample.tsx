
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Copy, Play, Code } from "lucide-react";

const ApiExample = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("sk_live_your_api_key_here");
  const [amount, setAmount] = useState("10000");
  const [customerEmail, setCustomerEmail] = useState("client@example.com");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const createPaymentExample = async () => {
    setLoading(true);
    try {
      const response = await fetch('/functions/v1/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: 'XOF',
          customer_email: customerEmail,
          description: 'Test payment from API playground',
          success_url: 'https://yoursite.com/success',
          cancel_url: 'https://yoursite.com/cancel',
          callback_url: 'https://yoursite.com/webhook'
        })
      });

      const data = await response.json();
      setResponse(data);

      if (response.ok) {
        toast({
          title: "Paiement créé avec succès !",
          description: `ID: ${data.payment_id}`
        });
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Erreur lors de la création",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur réseau",
        description: "Impossible de contacter l'API",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copié !",
      description: "Code copié dans le presse-papier"
    });
  };

  const curlExample = `curl -X POST "${window.location.origin}/functions/v1/create-payment" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${apiKey}" \\
  -d '{
    "amount": ${amount},
    "currency": "XOF",
    "customer_email": "${customerEmail}",
    "description": "Test payment",
    "success_url": "https://yoursite.com/success",
    "cancel_url": "https://yoursite.com/cancel",
    "callback_url": "https://yoursite.com/webhook"
  }'`;

  const jsExample = `// JavaScript/Node.js Example
const response = await fetch('${window.location.origin}/functions/v1/create-payment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '${apiKey}'
  },
  body: JSON.stringify({
    amount: ${amount},
    currency: 'XOF',
    customer_email: '${customerEmail}',
    description: 'Test payment',
    success_url: 'https://yoursite.com/success',
    cancel_url: 'https://yoursite.com/cancel',
    callback_url: 'https://yoursite.com/webhook'
  })
});

const payment = await response.json();
console.log('Payment created:', payment);`;

  const phpExample = `<?php
// PHP Example
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, '${window.location.origin}/functions/v1/create-payment');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-api-key: ${apiKey}'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'amount' => ${amount},
    'currency' => 'XOF',
    'customer_email' => '${customerEmail}',
    'description' => 'Test payment',
    'success_url' => 'https://yoursite.com/success',
    'cancel_url' => 'https://yoursite.com/cancel',
    'callback_url' => 'https://yoursite.com/webhook'
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$payment = json_decode($response, true);
curl_close($ch);

echo "Payment created: " . $payment['payment_id'];
?>`;

  return (
    <div className="space-y-6">
      {/* API Playground */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            API Playground
          </CardTitle>
          <CardDescription>
            Testez l'API SenePay directement depuis cette interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="apiKey">Clé API</Label>
              <Input
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk_live_..."
              />
            </div>
            <div>
              <Label htmlFor="amount">Montant (FCFA)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="customerEmail">Email client</Label>
              <Input
                id="customerEmail"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="client@example.com"
              />
            </div>
          </div>

          <Button 
            onClick={createPaymentExample} 
            disabled={loading}
            className="w-full btn-senepay"
          >
            {loading ? "Création en cours..." : "Créer un paiement test"}
          </Button>

          {response && (
            <div className="mt-4">
              <Label>Réponse API</Label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Exemples de code
          </CardTitle>
          <CardDescription>
            Intégrez SenePay dans votre langage préféré
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* cURL Example */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">cURL</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyCode(curlExample)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">{curlExample}</pre>
            </div>
          </div>

          {/* JavaScript Example */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">JavaScript</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyCode(jsExample)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">{jsExample}</pre>
            </div>
          </div>

          {/* PHP Example */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline">PHP</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyCode(phpExample)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">{phpExample}</pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiExample;

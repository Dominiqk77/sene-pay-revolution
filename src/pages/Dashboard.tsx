
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Users, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  RefreshCw
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Revenus aujourd'hui",
      value: "2,847,500 FCFA",
      change: "+12.5%",
      changeType: "positive",
      icon: <DollarSign className="h-6 w-6" />
    },
    {
      title: "Transactions",
      value: "1,247",
      change: "+8.2%", 
      changeType: "positive",
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      title: "Taux de succès",
      value: "98.4%",
      change: "-0.3%",
      changeType: "negative", 
      icon: <Activity className="h-6 w-6" />
    },
    {
      title: "Clients uniques",
      value: "892",
      change: "+15.7%",
      changeType: "positive",
      icon: <Users className="h-6 w-6" />
    }
  ];

  const recentTransactions = [
    {
      id: "TXN-2024-001247",
      amount: "25,000 FCFA",
      method: "Orange Money",
      customer: "+221 77 123 45 67",
      status: "success",
      time: "Il y a 2 min"
    },
    {
      id: "TXN-2024-001246", 
      amount: "15,500 FCFA",
      method: "Wave",
      customer: "wave-user-123",
      status: "success",
      time: "Il y a 5 min"
    },
    {
      id: "TXN-2024-001245",
      amount: "45,750 FCFA", 
      method: "Visa",
      customer: "****1234",
      status: "pending",
      time: "Il y a 8 min"
    },
    {
      id: "TXN-2024-001244",
      amount: "12,000 FCFA",
      method: "Free Money",
      customer: "+221 70 987 65 43",
      status: "failed",
      time: "Il y a 12 min"
    }
  ];

  const paymentMethods = [
    { name: "Orange Money", percentage: 45, amount: "1,280,375 FCFA", color: "bg-orange-500" },
    { name: "Wave", percentage: 28, amount: "797,300 FCFA", color: "bg-blue-600" },
    { name: "Cartes", percentage: 18, amount: "512,550 FCFA", color: "bg-green-600" },
    { name: "Free Money", percentage: 9, amount: "256,275 FCFA", color: "bg-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Dashboard Header */}
      <div className="pt-24 pb-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Dashboard <span className="gradient-text">Merchant</span>
              </h1>
              <p className="text-gray-600">Aperçu de vos performances en temps réel</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
              <Button size="sm" className="btn-senepay">
                <RefreshCw className="mr-2 h-4 w-4" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gradient-senepay rounded-lg text-white">
                  {stat.icon}
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'positive' ? 
                    <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  }
                  {stat.change}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Transactions & Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Transactions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Transactions récentes</h2>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
                        transaction.method === 'Orange Money' ? 'bg-orange-500' :
                        transaction.method === 'Wave' ? 'bg-blue-600' :
                        transaction.method === 'Visa' ? 'bg-blue-800' : 'bg-green-600'
                      }`}>
                        {transaction.method === 'Orange Money' ? 'OM' :
                         transaction.method === 'Wave' ? 'W' :
                         transaction.method === 'Visa' ? 'V' : 'FM'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{transaction.customer}</p>
                        <p className="text-sm text-gray-600">{transaction.id}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{transaction.amount}</p>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${
                          transaction.status === 'success' ? 'bg-green-500' :
                          transaction.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                        } text-white`}>
                          {transaction.status === 'success' ? 'Succès' :
                           transaction.status === 'pending' ? 'En cours' : 'Échec'}
                        </Badge>
                        <span className="text-xs text-gray-500">{transaction.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">Voir toutes les transactions</Button>
              </div>
            </Card>

            {/* Analytics Chart Placeholder */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Évolution des revenus</h2>
              <div className="h-64 bg-gradient-to-br from-senepay-gold/10 to-senepay-orange/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-senepay-gold mx-auto mb-4" />
                  <p className="text-gray-600">Graphique des revenus</p>
                  <p className="text-sm text-gray-500">Intégration Recharts en cours</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Payment Methods Breakdown */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Répartition des paiements</h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">{method.name}</span>
                      <span className="text-sm font-bold text-gray-800">{method.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${method.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${method.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">{method.amount}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Actions rapides</h2>
              <div className="space-y-3">
                <Button className="w-full btn-senepay">
                  Créer un lien de paiement
                </Button>
                <Button variant="outline" className="w-full">
                  Exporter les données
                </Button>
                <Button variant="outline" className="w-full">
                  Configurer les webhooks
                </Button>
                <Button variant="outline" className="w-full">
                  Gérer les remboursements
                </Button>
              </div>
            </Card>

            {/* Account Status */}
            <Card className="p-6 bg-gradient-to-br from-senepay-green/10 to-emerald-500/10 border-senepay-green/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-senepay-green rounded-full animate-pulse"></div>
                <h3 className="font-bold text-gray-800">Compte vérifié</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Votre compte est entièrement vérifié et opérationnel
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>KYC</span>
                  <Badge className="bg-green-500 text-white">Validé</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Limites</span>
                  <Badge className="bg-blue-500 text-white">Premium</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>API Access</span>
                  <Badge className="bg-senepay-gold text-white">Live</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

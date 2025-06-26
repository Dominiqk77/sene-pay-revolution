import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { 
  Crown, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Settings, 
  Database,
  Shield
} from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { isSuperAdmin, loading } = useUserRole();
  const navigate = useNavigate();

  // Redirection automatique pour le super admin
  useEffect(() => {
    if (!loading && user && isSuperAdmin) {
      console.log('🚨 Super Admin detected in Dashboard - redirecting to /super-admin');
      navigate('/super-admin', { replace: true });
    }
  }, [user, isSuperAdmin, loading, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de Bord
          </h1>
          <p className="text-gray-600">
            Bienvenue sur votre espace personnel SenePay
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Utilisateurs</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">45,632</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Volume</p>
                  <p className="text-2xl font-bold text-gray-900">2.4M€</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Database className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Revenus</p>
                  <p className="text-2xl font-bold text-gray-900">48K€</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Actions</span>
            </CardTitle>
            <CardDescription>
              Effectuer des actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <p className="font-medium">Effectuer un paiement</p>
                  <p className="text-sm text-gray-500">Payer un marchand</p>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <p className="font-medium">Voir mes transactions</p>
                  <p className="text-sm text-gray-500">Historique des transactions</p>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <p className="font-medium">Voir mon profil</p>
                  <p className="text-sm text-gray-500">Informations personnelles</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

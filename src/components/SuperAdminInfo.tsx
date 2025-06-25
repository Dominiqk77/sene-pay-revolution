
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Shield, Building, Key, RefreshCw } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';
import { useToast } from '@/hooks/use-toast';

const SuperAdminInfo = () => {
  const { profile, merchantAccount, loading, error, isSuperAdmin, refreshUserData } = useUserRole();
  const { toast } = useToast();

  const handleRefresh = async () => {
    await refreshUserData();
    toast({
      title: 'Données actualisées',
      description: 'Les informations ont été rechargées avec succès.',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Chargement des informations...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="p-6">
          <div className="text-red-600">
            <p className="font-medium">Erreur de chargement</p>
            <p className="text-sm">{error}</p>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isSuperAdmin) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Statut Super Admin */}
      <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-yellow-600" />
            <span className="text-yellow-800">Super Administrateur SenePay</span>
          </CardTitle>
          <CardDescription>
            Vous avez un accès complet à toutes les fonctionnalités de la plateforme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Shield className="h-3 w-3 mr-1" />
              Accès Total
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ✓ Vérifié
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Building className="h-3 w-3 mr-1" />
              {profile?.company_name || 'Millennium Capital Invest'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Informations du Profil */}
      <Card>
        <CardHeader>
          <CardTitle>Profil Utilisateur</CardTitle>
          <CardDescription>Informations personnelles et professionnelles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Nom complet</p>
              <p className="font-medium">{profile?.full_name || 'Non défini'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="font-medium">{profile?.email || 'Non défini'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Entreprise</p>
              <p className="font-medium">{profile?.company_name || 'Non définie'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Rôle</p>
              <Badge variant="outline" className="font-medium">
                {profile?.role || 'Non défini'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compte Marchand */}
      {merchantAccount && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Compte Marchand Principal</span>
            </CardTitle>
            <CardDescription>Configuration de votre compte SenePay Corporation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nom de l'entreprise</p>
                <p className="font-medium">{merchantAccount.business_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Type d'activité</p>
                <p className="font-medium">{merchantAccount.business_type || 'Non défini'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Volume mensuel</p>
                <p className="font-medium">{merchantAccount.monthly_volume?.toLocaleString() || '0'} FCFA</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Transactions totales</p>
                <p className="font-medium">{merchantAccount.total_transactions || 0}</p>
              </div>
            </div>
            
            {merchantAccount.api_key && (
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-2">
                  <Key className="h-4 w-4 text-gray-500" />
                  <p className="text-sm font-medium text-gray-500">Clés API</p>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-400">Clé publique</p>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {merchantAccount.api_key.substring(0, 20)}...
                    </code>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Clé secrète</p>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {merchantAccount.api_secret?.substring(0, 20)}...
                    </code>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser les données
        </Button>
      </div>
    </div>
  );
};

export default SuperAdminInfo;


import { useState, useEffect } from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Camera, Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ProfileFormData {
  full_name: string;
  company_name: string;
  phone: string;
}

const ProfileSettings = () => {
  const { profile, refreshUserData } = useUserRole();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<ProfileFormData>({
    defaultValues: {
      full_name: '',
      company_name: '',
      phone: ''
    }
  });

  // Mettre à jour les valeurs du formulaire quand le profil change
  useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name || '',
        company_name: profile.company_name || '',
        phone: profile.phone || ''
      });
    }
  }, [profile, reset]);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    setIsUploadingPhoto(true);

    try {
      // Convertir l'image en base64 pour la sauvegarder
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target?.result as string;
        
        // Sauvegarder la photo en base de données
        const { error } = await supabase
          .from('profiles')
          .update({
            avatar_url: base64String,
            updated_at: new Date().toISOString()
          })
          .eq('id', profile.id);

        if (error) throw error;

        // Rafraîchir les données utilisateur
        await refreshUserData();
        
        toast({
          title: 'Photo mise à jour',
          description: 'Votre photo de profil a été mise à jour avec succès.',
        });
      };
      reader.readAsDataURL(file);

    } catch (error) {
      console.error('Erreur upload photo:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour la photo de profil.',
        variant: 'destructive'
      });
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!profile) return;

    setIsUploadingPhoto(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          avatar_url: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      if (error) throw error;

      await refreshUserData();
      
      toast({
        title: 'Photo supprimée',
        description: 'Votre photo de profil a été supprimée.',
      });

    } catch (error) {
      console.error('Erreur suppression photo:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer la photo de profil.',
        variant: 'destructive'
      });
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!profile) return;

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          company_name: data.company_name,
          phone: data.phone,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      if (error) throw error;

      await refreshUserData();
      
      toast({
        title: 'Profil mis à jour',
        description: 'Vos informations ont été sauvegardées avec succès.',
      });

    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le profil.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm sm:text-base">Chargement du profil...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Photo de profil - Mobile optimisé */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
            Photo de profil
          </CardTitle>
          <CardDescription className="text-sm">
            Personnalisez votre avatar en uploadant une photo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="text-base sm:text-lg font-medium bg-gradient-to-br from-senepay-orange to-senepay-gold text-white">
                  {profile.full_name ? getInitials(profile.full_name) : <User className="h-6 w-6 sm:h-8 sm:w-8" />}
                </AvatarFallback>
              </Avatar>
              {isUploadingPhoto && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-spin" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="outline"
                  className="relative overflow-hidden w-full sm:w-auto"
                  disabled={isUploadingPhoto}
                  size="sm"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Changer la photo
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={isUploadingPhoto}
                  />
                </Button>
                {profile.avatar_url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemovePhoto}
                    disabled={isUploadingPhoto}
                    className="w-full sm:w-auto"
                  >
                    Supprimer
                  </Button>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                JPG, PNG ou GIF. Max 2MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations personnelles - Mobile optimisé */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
            Informations personnelles
          </CardTitle>
          <CardDescription className="text-sm">
            Modifiez vos informations de profil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-sm font-medium">Nom complet *</Label>
                <Input
                  id="full_name"
                  {...register('full_name', { 
                    required: 'Le nom complet est requis' 
                  })}
                  placeholder="Votre nom complet"
                  className={`${errors.full_name ? 'border-red-500' : ''} h-10 sm:h-11`}
                />
                {errors.full_name && (
                  <p className="text-xs sm:text-sm text-red-500">{errors.full_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_name" className="text-sm font-medium">Nom de l'entreprise</Label>
                <Input
                  id="company_name"
                  {...register('company_name')}
                  placeholder="Nom de votre entreprise"
                  className="h-10 sm:h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="+221 77 123 45 67"
                  className="h-10 sm:h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  value={profile.email || ''}
                  disabled
                  className="bg-gray-50 text-gray-500 h-10 sm:h-11"
                />
                <p className="text-xs text-gray-500">
                  L'email ne peut pas être modifié
                </p>
              </div>
            </div>

            {/* Statut du compte - Mobile friendly */}
            <div className="pt-4 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Statut du compte</h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Informations sur votre compte SenePay
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <Badge variant={profile.is_verified ? "default" : "secondary"} className="text-xs">
                    {profile.is_verified ? "✓ Vérifié" : "En attente"}
                  </Badge>
                  <Badge variant="outline" className="capitalize text-xs">
                    {profile.role}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={!isDirty || isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-senepay-orange to-senepay-gold hover:from-senepay-orange/90 hover:to-senepay-gold/90"
                size="sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span className="text-sm">Sauvegarde...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    <span className="text-sm">Sauvegarder</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;

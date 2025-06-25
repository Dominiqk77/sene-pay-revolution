
export const cleanupAuthState = () => {
  try {
    console.log('Starting auth state cleanup...');
    
    // Nettoyer localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        console.log('Removing localStorage key:', key);
        localStorage.removeItem(key);
      }
    });

    // Nettoyer sessionStorage si disponible
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          console.log('Removing sessionStorage key:', key);
          sessionStorage.removeItem(key);
        }
      });
    }

    console.log('Auth state cleanup completed');
  } catch (error) {
    console.error('Error during auth cleanup:', error);
  }
};

export const forceSignOut = async (supabase: any) => {
  try {
    console.log('Starting force sign out...');
    
    // Nettoyer d'abord l'état local
    cleanupAuthState();
    
    // Tenter une déconnexion globale
    try {
      await supabase.auth.signOut({ scope: 'global' });
      console.log('Global sign out successful');
    } catch (signOutError) {
      console.warn('Global sign out failed, but continuing:', signOutError);
    }
    
    // Forcer un rechargement de page pour un état propre
    setTimeout(() => {
      window.location.href = '/auth';
    }, 100);
    
  } catch (error) {
    console.error('Error during force sign out:', error);
    // Forcer quand même la redirection
    window.location.href = '/auth';
  }
};

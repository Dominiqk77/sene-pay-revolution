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

import { logSecurityEvent } from './securityUtils';

export const forceSignOut = async (supabaseClient: any) => {
  try {
    console.log('🔐 Starting secure force sign out...');
    
    // Logger l'événement de déconnexion
    await logSecurityEvent({
      action: 'USER_LOGOUT_INITIATED',
      resourceType: 'authentication',
      metadata: {
        timestamp: new Date().toISOString(),
        method: 'force_signout'
      }
    });

    // Nettoyer d'abord l'état local
    cleanupAuthState();
    
    // Tenter une déconnexion globale
    try {
      await supabaseClient.auth.signOut({ scope: 'global' });
      console.log('Global sign out successful');
    } catch (signOutError) {
      console.warn('Global sign out failed, but continuing:', signOutError);
    }
    
    // Forcer un rechargement de page pour un état propre
    setTimeout(() => {
      window.location.href = '/auth';
    }, 100);
    
    // Logger l'événement de fin de déconnexion
    await logSecurityEvent({
      action: 'USER_LOGOUT_COMPLETED',
      resourceType: 'authentication',
      metadata: {
        timestamp: new Date().toISOString()
      }
    });

    console.log('✅ Secure sign out completed');
  } catch (error) {
    console.error('❌ Secure sign out failed:', error);
    
    await logSecurityEvent({
      action: 'USER_LOGOUT_FAILED',
      resourceType: 'authentication',
      metadata: {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
    });

    // Forcer quand même la redirection
    window.location.href = '/auth';
  }
};


import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState, forceSignOut } from '@/utils/authCleanup';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour vérifier le rôle et rediriger
  const checkRoleAndRedirect = async (user: User) => {
    try {
      console.log('🔍 Checking user role for redirect...', user.email);
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profileError && profileData) {
        console.log('👑 User role detected:', profileData.role);
        
        if (profileData.role === 'super_admin') {
          console.log('🚨 Super Admin detected - redirecting to /super-admin');
          // Vérifier si on n'est pas déjà sur la bonne page
          if (window.location.pathname !== '/super-admin') {
            setTimeout(() => {
              window.location.href = '/super-admin';
            }, 100);
          }
          return;
        }
      }
      
      // Redirection vers dashboard seulement si on est sur auth ou root
      if (window.location.pathname === '/auth' || window.location.pathname === '/') {
        console.log('📊 Regular user - redirecting to /dashboard');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 100);
      }
    } catch (roleError) {
      console.warn('Could not check user role:', roleError);
      // Redirection par défaut vers dashboard
      if (window.location.pathname === '/auth' || window.location.pathname === '/') {
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 100);
      }
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Vérifier le rôle et rediriger pour les sessions existantes et nouvelles connexions
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(() => {
            checkRoleAndRedirect(session.user);
          }, 0);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          cleanupAuthState();
        } else {
          console.log('Initial session:', session?.user?.email);
          setSession(session);
          setUser(session?.user ?? null);
          
          // Vérifier le rôle et rediriger pour la session initiale
          if (session?.user) {
            setTimeout(() => {
              checkRoleAndRedirect(session.user);
            }, 0);
          }
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        cleanupAuthState();
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log('Attempting signUp for:', email);
      
      cleanupAuthState();
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });
      
      console.log('SignUp result:', { data: data?.user?.email, error });
      return { error };
    } catch (error) {
      console.error('SignUp error:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting signIn for:', email);
      
      cleanupAuthState();
      
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (signOutError) {
        console.warn('Pre-signin signout failed, continuing:', signOutError);
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('SignIn result:', { data: data?.user?.email, error });
      
      // La redirection sera gérée par onAuthStateChange et checkRoleAndRedirect
      return { error };
    } catch (error) {
      console.error('SignIn error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('Attempting signOut');
      await forceSignOut(supabase);
    } catch (error) {
      console.error('SignOut error:', error);
      window.location.href = '/auth';
    }
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

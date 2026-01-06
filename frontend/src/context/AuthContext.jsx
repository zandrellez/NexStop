import { createContext, useState, useContext, useEffect } from 'react';
import supabase from '../supabase-client';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
//Auth functions (signin, signup, logout)

//Session state (user info, sign-in status)
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    async function getInitialSession() {
      try {
        const {data, error} = await supabase.auth.getSession(session);
        
        if (error) {
          throw error;
        }

        console.log(data.session);
        setSession(data.session);
      } catch (error) {
        console.error('Error authenticating:', error);
      }
    }

    getInitialSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log('Session changed:', session);
    })
  }, []);

  const signUpUser = async (email, password) => {
    try {
      const {data, error} = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error('Supabase sign-up error:', error.message);
        return {success: false, error: error.message};
      }
      console.log("Supabase sign-up success", data);
      return {success: true, data};
    }
    catch (error) {
      console.error('Unexpected error during sign-up:', error.message);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  const signInUser = async (email, password) => {
    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      })
      if (error) {
        console.error('Supabase sign-in error:', error.message)
        return {success: false, error: error.message}
      }

      const adminAccounts = await fetchAdminAccounts();
      console.log('Fetched admin accounts:', adminAccounts);
      const isAdmin = adminAccounts.some((account) => account.email === email.toLowerCase());

      if (isAdmin) {
        return {success: true, data, isAdmin: true};
      } else {
        return {success: true, data, isAdmin: false};
      }
    } catch (error) {
      console.error('Unexpected error during sign-in:', error.message);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  }

  const fetchAdminAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('email')
      if (error) {
        console.error('Error fetching admin accounts:', error.message);
        return [];
      }
      return data;
    } catch (error) {
      console.error('Unexpected error fetching admin accounts:', error.message);
      return [];
    }
  };
  
  const signOut = async () => {
    try {
      const {error} = await supabase.auth.signOut();

      if (error) {
        console.error('Supabase sign-out error:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true };

    } catch (error) {
      console.error('Error signing out:', error.message);
      return { success: false, error: error.message };
    }
  }

  return (
    <AuthContext.Provider value={{ session, signInUser, signOut, signUpUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => { 
  return useContext(AuthContext); 
};
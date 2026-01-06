import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabase-client";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Session state (user info, sign-in status)
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Get initial session (FIXED)
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        setSession(session);
      } catch (error) {
        console.error("Error authenticating:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // ✅ Properly handle auth state changes + cleanup
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Session changed:", session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // ================= AUTH FUNCTIONS =================

  const signUpUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error during sign-up:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  const fetchAdminAccounts = async () => {
    try {
      const { data, error } = await supabase
        .from("admins")
        .select("email");

      if (error) {
        console.error("Error fetching admin accounts:", error.message);
        return [];
      }

      return data ?? [];
    } catch (error) {
      console.error("Unexpected error fetching admin accounts:", error.message);
      return [];
    }
  };

  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      const adminAccounts = await fetchAdminAccounts();
      const isAdmin = adminAccounts.some(
        (account) => account.email === email.toLowerCase()
      );

      return { success: true, data, isAdmin };
    } catch (error) {
      console.error("Unexpected error during sign-in:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Error signing out:", error.message);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signInUser,
        signOut,
        signUpUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => { 
  return useContext(AuthContext); 
};

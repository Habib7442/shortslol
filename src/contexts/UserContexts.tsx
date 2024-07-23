import React, { createContext, useContext, useEffect, useState } from "react";

import { jsonStringToUser } from "@/lib";
import { supabase } from "@/lib/supabaseClient";
import { PopulatedUser } from "@/types/types";
import { getUser } from "@/lib/supabase/getUser";
import { useRouter } from "next/navigation";

interface UserContext {
  user: PopulatedUser | null;
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<PopulatedUser | null>>;
  logout: () => Promise<void>;
  loadingUser: boolean;
}

const UserContext = createContext<UserContext | null>(null);

const LOCAL_STORAGE_USER_KEY = "authUser";
const LOCAL_STORAGE_EMAIL_KEY = "authEmail";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<PopulatedUser | null>(null);

  const router = useRouter();

  useEffect(() => {
    const loadUserFromStorage = () => {
      const localStorageUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      const localStorageEmail = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);

      console.log("Local storage user:", localStorageUser);

      if (localStorageUser) {
        const savedUser = jsonStringToUser(localStorageUser);
        if (savedUser) {
          setUser(savedUser);
        }
      }

      if (localStorageEmail) {
        setEmail(localStorageEmail);
      }

      setLoading(false);
    };

    loadUserFromStorage();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const userData = await getUser(session.user.id, session.user.email);
          setUser(userData);
          localStorage.setItem(
            LOCAL_STORAGE_USER_KEY,
            JSON.stringify(userData)
          );
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else if (!user && !loading) {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }

    if (email) {
      localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
    } else if (!email && !loading) {
      localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY);
    }
  }, [loading, user, email]);

  const logout = async () => {
    try {
      setLoading(true); 
  
      await supabase.auth.signOut();  // Await the sign out process
  
      // Clear user state and local storage
      setUser(null);
      setEmail(null);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY);
  
      // Redirect to login page
      router.push("/login");
  
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);  // Ensure loading is set to false after the logout process
    }
  };
  

  return (
    <UserContext.Provider
      value={{
        user,
        email,
        setUser,
        setEmail,
        logout,
        loadingUser: loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;

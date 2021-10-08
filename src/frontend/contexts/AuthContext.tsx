import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthData } from "../models/AuthData";
import { Keys } from "../constants/keys";

export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem(
        Keys.USER_STORE_KEY
      );
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const signIn = async () => {
    //ToDo: call the service passing credential (email and password).

    const _authData = { name: "Java", email: "jasd@asd.com" } as AuthData;

    setAuthData(_authData);

    AsyncStorage.setItem(Keys.USER_STORE_KEY, JSON.stringify(_authData));
  };

  const signOut = async () => {
    setAuthData(undefined);

    await AsyncStorage.removeItem(Keys.USER_STORE_KEY);
  };

  return (
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

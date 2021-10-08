import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthData } from "../models/AuthData";
import { Keys } from "../constants/keys";
import { Api } from "../constants/Api";

export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
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

  const callLoginAsync = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${Api.URL}/Users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const loginResult = await callLoginAsync(email, password);
    console.log(loginResult, "loginResult");
    if (loginResult) {
      const _authData = {
        name: "LoggedUser",
        email: email,
      } as AuthData;

      setAuthData(_authData);

      AsyncStorage.setItem(Keys.USER_STORE_KEY, JSON.stringify(_authData));
    }
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

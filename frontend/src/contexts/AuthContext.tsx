import { createContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "@/api/auth";
import Cookies from "js-cookie";
import {
  userResponse,
  AuthContextType,
  AuthProviderProps,
  initialState,
} from "@/types/authTypes";
import { AxiosError, AxiosResponse } from "axios";

export const AuthContext = createContext<AuthContextType>(initialState);

export function AuthProvider({ children, ...props }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errosResponse, setErrorsResponse] = useState(null);
  const [user, setUser] = useState<userResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function register(values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    try {
      const response = await registerRequest(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
      console.log(response);
      setUser(response as userResponse);
      setIsAuthenticated(true);
    } catch (error) {
      console.log((error as AxiosError).response);
      setErrorsResponse(((error as AxiosError).response as AxiosResponse).data);
    }
  }

  async function login(values: { email: string; password: string }) {
    try {
      const response = await loginRequest(values.email, values.password);
      console.log(response);
      setUser(response as userResponse | null);
      setIsAuthenticated(true);
    } catch (error) {
      console.log((error as AxiosError).response);
      setErrorsResponse(((error as AxiosError).response as AxiosResponse).data);
    }
  }

  useEffect(() => {
    if (errosResponse !== null) {
      setTimeout(() => {
        setErrorsResponse(null);
      }, 5000);
    }
  }, [errosResponse]);

  useEffect(() => {
    async function checkLogin() {
      setIsLoading(true);
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          
          //const response = await verifyTokenRequest(cookies.token);
          //console.log(response)

          //setUser(response as userResponse | null);
          setIsAuthenticated(true);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    }
    setIsLoading(false);
    checkLogin();
  }, []);

  function logout() {
    setIsAuthenticated(false);
  }

  const value = {
    errosResponse,
    isAuthenticated,
    user,
    register,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider {...props} value={value}>
      {children}
    </AuthContext.Provider>
  );
}

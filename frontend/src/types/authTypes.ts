import { AxiosError } from "axios";

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading?: boolean;
  user: userResponse | null;
  errosResponse?: AxiosError | null;
  register: (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
  login: (values: { email: string; password: string }) => void;
  logout: () => void;
};

export const initialState: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  errosResponse: null,
  register: () => {},
  login: () => {},
  logout: () => {},
};

export type AuthProviderProps = {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  isLoading?: boolean;
  user?: userResponse | null;
  errosResponse?: AxiosError | null;
  values?: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  register?: (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
  login?: (values: { email: string; password: string }) => void;
  logout?: () => void;
};

export interface userResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

import type { User } from "@luishutterli/auth-kit-types";

export interface AuthKitProviderProps {
  children: React.ReactNode;
  baseUrl: string;
  loadingComponent?: React.ComponentType;
  loginComponent: React.ComponentType;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    surname: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export interface SignupResponse {
  success: boolean;
  userId?: number;
  error?: string;
}

export interface MeResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export interface LogoutResponse {
  success: boolean;
}

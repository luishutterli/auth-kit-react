import { useCallback } from "react";
import { useAuthStore } from "./store";
import type { AuthActions, AuthState } from "./types";

/**
 * Hook to access authentication state and actions
 * @returns Object containing authentication state and methods
 */
export const useAuth = (): AuthState & AuthActions => {
  const { user, isAuthenticated, isLoading, error, login, signup, logout, clearError } =
    useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,

    login: useCallback(login, []),
    signup: useCallback(signup, []),
    logout: useCallback(logout, []),
    clearError: useCallback(clearError, []),
  };
};

/**
 * Hook to access just the authentication state (without actions)
 */
export const useAuthState = (): AuthState => {
  const { user, isAuthenticated, isLoading, error } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
};

/**
 * Hook to access just the authentication actions (without state)
 */
export const useAuthActions = (): AuthActions => {
  const { login, signup, logout, clearError } = useAuthStore();

  return {
    login: useCallback(login, []),
    signup: useCallback(signup, []),
    logout: useCallback(logout, []),
    clearError: useCallback(clearError, []),
  };
};

/**
 * Hook that returns the current user or null
 */
export const useUser = () => {
  return useAuthStore((state) => state.user);
};

/**
 * Hook that returns whether the user is authenticated
 */
export const useIsAuthenticated = () => {
  return useAuthStore((state) => state.isAuthenticated);
};

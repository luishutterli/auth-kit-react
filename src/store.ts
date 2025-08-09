import { create } from "zustand";
import type { AuthKitAPI } from "./api";
import type { AuthActions, AuthState } from "./types";

interface AuthStore extends AuthState, AuthActions {
  _api: AuthKitAPI | null;
  _setAPI: (api: AuthKitAPI) => void;
  _checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  _api: null,

  _setAPI: (api: AuthKitAPI) => {
    set({ _api: api });
  },

  login: async (email: string, password: string) => {
    const { _api } = get();
    if (!_api) {
      set({ error: "AuthKit API not initialized" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const result = await _api.login(email, password);

      if (result.success && result.user) {
        set({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: result.error || "Login failed",
        });
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      });
    }
  },

  signup: async (email: string, password: string, name: string, surname: string) => {
    const { _api } = get();
    if (!_api) {
      set({ error: "AuthKit API not initialized" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const result = await _api.signup(email, password, name, surname);

      if (result.success) {
        await get()._checkAuthStatus();
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: result.error || "Signup failed",
        });
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : "Signup failed",
      });
    }
  },

  logout: async () => {
    const { _api } = get();
    if (!_api) {
      set({ error: "AuthKit API not initialized" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      await _api.logout();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : "Logout failed",
      });
    }
  },

  refresh: async () => {
    const { _api } = get();
    if (!_api) {
      set({ error: "AuthKit API not initialized" });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const result = await _api.refresh();

      if (result.success && result.user) {
        set({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: result.error || "Token refresh failed",
        });
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : "Token refresh failed",
      });
    }
  },

  _checkAuthStatus: async () => {
    const { _api } = get();
    if (!_api) {
      set({ error: "AuthKit API not initialized" });
      return;
    }

    set({ isLoading: true });

    try {
      const meResult = await _api.me();

      if (meResult.success && meResult.user) {
        set({
          user: meResult.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

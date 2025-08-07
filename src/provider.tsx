import type React from "react";
import { useEffect } from "react";
import { AuthKitAPI } from "./api";
import { useAuthStore } from "./store";
import type { AuthKitProviderProps } from "./types";

const DefaultLoadingSpinner = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}>
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #3498db",
        borderRadius: "50%",
        animation: "authkit-spinner 1s linear infinite",
      }}
    />
    <style>
      {`
        @keyframes authkit-spinner {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export const AuthKitProvider: React.FC<AuthKitProviderProps> = ({
  children,
  baseUrl,
  loadingComponent: LoadingComponent = DefaultLoadingSpinner,
  loginComponent: LoginComponent,
}) => {
  const { _setAPI, _checkAuthStatus, isLoading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const api = new AuthKitAPI(baseUrl);
    _setAPI(api);

    _checkAuthStatus();
  }, [baseUrl, _setAPI, _checkAuthStatus]);

  if (isLoading && !isAuthenticated) {
    return <LoadingComponent />;
  }

  if (!isAuthenticated) {
    return <LoginComponent />;
  }

  return <>{children}</>;
};

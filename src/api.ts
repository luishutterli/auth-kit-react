import axios, { type AxiosInstance } from "axios";
import type { LoginResponse, LogoutResponse, MeResponse, RefreshResponse, SignupResponse } from "./types";

export class AuthKitAPI {
  private readonly api: AxiosInstance;

  constructor(baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}/v1`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.api.post<LoginResponse>("/login", {
        email,
        password,
      });
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data?: LoginResponse } };
        if (axiosError.response?.data) {
          return axiosError.response.data;
        }
      }
      throw new Error("Network error during login");
    }
  }

  async signup(
    email: string,
    password: string,
    name: string,
    surname: string,
  ): Promise<SignupResponse> {
    try {
      const response = await this.api.post<SignupResponse>("/signup", {
        email,
        password,
        name,
        surname,
      });
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data?: SignupResponse } };
        if (axiosError.response?.data) {
          return axiosError.response.data;
        }
      }
      throw new Error("Network error during signup");
    }
  }

  async logout(): Promise<LogoutResponse> {
    try {
      const response = await this.api.post<LogoutResponse>("/logout");
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data?: LogoutResponse } };
        if (axiosError.response?.data) {
          return axiosError.response.data;
        }
      }
      throw new Error("Network error during logout");
    }
  }

  async me(): Promise<MeResponse> {
    try {
      const response = await this.api.get<MeResponse>("/me");
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data?: MeResponse } };
        if (axiosError.response?.data) {
          return axiosError.response.data;
        }
      }
      throw new Error("Network error during user info fetch");
    }
  }

  async refresh(): Promise<RefreshResponse> {
    try {
      const response = await this.api.post<RefreshResponse>("/refresh");
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data?: RefreshResponse } };
        if (axiosError.response?.data) {
          return axiosError.response.data;
        }
      }
      throw new Error("Network error during token refresh");
    }
  }
}

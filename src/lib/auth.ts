"use client";

const AUTH_KEY = "resto_eat_auth_user";

export interface AuthState {
  isLoggedIn: boolean;
  name?: string;
}

export const mockAuth = {
  login: (name: string) => {
    if (typeof window === "undefined") return;
    const authData = { isLoggedIn: true, name };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    // Dispatch a custom event to notify other components/tabs
    window.dispatchEvent(new Event("auth-change"));
  },

  logout: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event("auth-change"));
  },

  getAuthState: (): AuthState => {
    if (typeof window === "undefined") return { isLoggedIn: false };
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) return { isLoggedIn: false };
    try {
      return JSON.parse(data);
    } catch (e) {
      return { isLoggedIn: false };
    }
  }
};

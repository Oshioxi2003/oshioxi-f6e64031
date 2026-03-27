// Auth client — replaces Supabase auth
// Stores JWT in localStorage, talks to Express backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const TOKEN_KEY = 'finshark_token';
const USER_KEY = 'finshark_user';

export interface AuthUser {
  id: number;
  email: string;
  full_name: string | null;
}

interface AuthSession {
  user: AuthUser;
  token: string;
}

type AuthCallback = (event: string, session: AuthSession | null) => void;

function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  // Dispatch storage event for cross-tab sync
  window.dispatchEvent(new Event('auth-change'));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event('auth-change'));
}

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Lỗi không xác định');
  }
  return data;
}

export const authApi = {
  /** Login with email and password */
  async login(email: string, password: string): Promise<{ error?: string }> {
    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setSession(data.token, data.user);
      return {};
    } catch (err: any) {
      return { error: err.message };
    }
  },

  /** Register a new user */
  async register(
    email: string,
    password: string,
    fullName?: string
  ): Promise<{ error?: string }> {
    try {
      await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, full_name: fullName }),
      });
      // Don't auto-login after register, redirect to login
      return {};
    } catch (err: any) {
      return { error: err.message };
    }
  },

  /** Get current session (user + token) from localStorage, verify with server */
  async getSession(): Promise<{ session: AuthSession | null }> {
    const token = getStoredToken();
    const user = getStoredUser();
    if (!token || !user) {
      return { session: null };
    }
    try {
      // Verify token is still valid by calling /api/auth/me
      const data = await apiFetch('/api/auth/me');
      const freshUser = data.user;
      // Update stored user with fresh data
      localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
      return { session: { user: freshUser, token } };
    } catch {
      // Token expired or invalid
      clearSession();
      return { session: null };
    }
  },

  /** Sign out */
  signOut() {
    clearSession();
  },

  /** Listen for auth changes (login/logout events) */
  onAuthStateChange(callback: AuthCallback): { unsubscribe: () => void } {
    const handler = () => {
      const token = getStoredToken();
      const user = getStoredUser();
      if (token && user) {
        callback('SIGNED_IN', { user, token });
      } else {
        callback('SIGNED_OUT', null);
      }
    };

    window.addEventListener('auth-change', handler);
    // Also listen for storage events (cross-tab)
    window.addEventListener('storage', (e) => {
      if (e.key === TOKEN_KEY || e.key === USER_KEY) {
        handler();
      }
    });

    return {
      unsubscribe: () => {
        window.removeEventListener('auth-change', handler);
      },
    };
  },
};

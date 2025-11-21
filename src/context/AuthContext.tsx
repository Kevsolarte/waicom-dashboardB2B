/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User } from "../types/user";
import { MOCK_USERS } from "../mocks/auth/users.mock";

export type AuthContextType = {
  currentUser: User | null;
  isLoading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Pick<User, "name" | "avatarUrl" | "role">) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const STORAGE_KEY = "currentUser";

function getInitialUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    getInitialUser()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);

    await new Promise((resolve) => setTimeout(resolve, 400));

    const normalizedEmail = email.trim().toLowerCase();

    const userWithPassword = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (!userWithPassword) {
      setIsLoading(false);
      setAuthError("Credenciales inválidas");
      throw new Error("Invalid credentials");
    }

    const { password: rawPassword, ...safeUser } = userWithPassword;
    void rawPassword;

    setCurrentUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    setIsLoading(false);
  }, []);


  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateProfile = useCallback(
    (data: Pick<User, "name" | "avatarUrl" | "role">) => {
      if (!currentUser) return;

      const updated: User = {
        ...currentUser,
        ...data,
      };

      setCurrentUser(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    [currentUser]
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        authError,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

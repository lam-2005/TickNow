import { useContext, createContext, useState, useEffect } from "react";

type User = {
  name: string;
  token: string;
};
type AuthContextType = {
  admin: User | null;
  user: User | null;
  setUser: (user: User | null) => void;
  setAdmin: (admin: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
};

export const AuthProvider = ({
  children,
  initToken = "",
  initAdminToken = "",
}: {
  children: React.ReactNode;
  initToken?: string;
  initAdminToken?: string;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || "";

    if (storedUser && initToken) {
      setUser({
        name: JSON.parse(storedUser),
        token: initToken,
      });
    }
  }, [initToken]);
  useEffect(() => {
    const storedUser = localStorage.getItem("admin") || "";

    if (storedUser && initAdminToken) {
      setAdmin({
        name: JSON.parse(storedUser),
        token: initAdminToken,
      });
    }
  }, [initAdminToken]);
  return (
    <AuthContext.Provider value={{ user, setUser, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

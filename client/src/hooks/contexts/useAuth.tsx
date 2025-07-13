import { useContext, createContext, useState, useEffect } from "react";
type User = {
  name: string;
  token: string;
};
type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
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
}: {
  children: React.ReactNode;
  initToken?: string;
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || "";

    if (storedUser && initToken) {
      setUser({
        name: JSON.parse(storedUser),
        token: initToken,
      });
    } else if (!initToken) {
      localStorage.removeItem("user");
    }
  }, [initToken]);

  //   const [mess, setMess] = useState<string>("");

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

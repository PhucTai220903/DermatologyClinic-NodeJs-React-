import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Tạo context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider quản lý JWT
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get("jwt_token") || null
  );
  const [user, setUser] = useState<any>(token ? jwtDecode(token) : null);

  useEffect(() => {
    if (token) {
      Cookies.set("jwt_token", token, { expires: 7, secure: true });
      setUser(jwtDecode(token));
    } else {
      Cookies.remove("jwt_token");
      setUser(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    Cookies.remove("jwt_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

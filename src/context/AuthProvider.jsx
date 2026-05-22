import { useState, useMemo } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  // 🔐 تحميل أولي من localStorage
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("auth_token") || null;
  });

  const [loading, setLoading] = useState(false);

  // 🔑 تسجيل الدخول
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);

    localStorage.setItem("auth_token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🚪 تسجيل الخروج
  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  };

  // ⚡ القيم اللي بتنرسل لكل المشروع
  const value = useMemo(() => {
    return {
      user,
      token,
      loading,
      setLoading,
      login,
      logout,
      isAuthenticated: !!token && !!user,
    };
  }, [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

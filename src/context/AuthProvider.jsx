import { useState, useMemo } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  // المستخدم المسجل (الأدمن حالياً)
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });

  // التوكن
  const [token, setToken] = useState(() => {
    return localStorage.getItem("auth_token") || null;
  });

  // حالة الضيف
  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem("isGuest") === "true";
  });

  const [loading, setLoading] = useState(false);

  // تسجيل دخول الأدمن
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);

    // إزالة وضع الضيف إذا دخل أدمن
    setIsGuest(false);

    localStorage.setItem("auth_token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.removeItem("isGuest");
  };

  // دخول كضيف
  const guestLogin = () => {
    setUser(null);
    setToken(null);
    setIsGuest(true);

    localStorage.setItem("isGuest", "true");
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
  };

  // تسجيل الخروج
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsGuest(false);

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("isGuest");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      setLoading,

      login,
      guestLogin,
      logout,

      isGuest,

      isAuthenticated: !!token && !!user,
    }),
    [user, token, loading, isGuest],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

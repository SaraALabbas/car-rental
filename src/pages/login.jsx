import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/authStyles.css";
import { useAuth } from "../context/useAuth";
import { IoEye, IoEyeOff, IoArrowForward } from "react-icons/io5";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");

  const validate = () => {
    let err = {};

    if (!phone) err.phone = "رقم الهاتف مطلوب";
    if (!password) err.password = "كلمة المرور مطلوبة";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const res = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "رقم الهاتف أو كلمة المرور غير صحيحة");
      return;
    }

    login(data.token, data.user);
    setMessage("");
    navigate("/home");
  };

  return (
    <div className="page rtl">
      {/* رجوع */}
      <IoArrowForward className="back" onClick={() => navigate("/index")} />

      <h1 className="title">تسجيل الدخول</h1>

      <div className="field">
        <span className="icon">📱</span>
        <input
          placeholder="رقم الهاتف (مثال: 09xxxxxxxx)"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      {errors.phone && <div className="error">{errors.phone}</div>}

      <div className="field">
        <span className="icon">🔒</span>

        <input
          type={showPass ? "text" : "password"}
          placeholder="كلمة المرور"
          onChange={(e) => setPassword(e.target.value)}
        />

        <span className="eye" onClick={() => setShowPass(!showPass)}>
          {showPass ? <IoEyeOff /> : <IoEye />}
        </span>
      </div>
      {errors.password && <div className="error">{errors.password}</div>}
      {message && (
        <div className="text-red-500 px-4 py-3 rounded-xl text-right mb-4">
          {message}
        </div>
      )}

      <button className="btn" onClick={handleLogin}>
        تسجيل الدخول
      </button>

      <p className="link" onClick={() => navigate("/register")}>
        ليس لديك حساب؟ إنشاء حساب
      </p>
    </div>
  );
}

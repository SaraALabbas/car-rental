import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/authStyles.css";
import { useAuth } from "../context/useAuth";
import { IoEye, IoEyeOff, IoArrowForward } from "react-icons/io5";
const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    let err = {};

    if (!name) err.name = "الاسم مطلوب";
    else if (name.length < 4 || name.length > 25)
      err.name = "الاسم يجب أن يكون بين 4 و 25 حرف";

    if (!phone) err.phone = "رقم الهاتف مطلوب";
    else if (!/^09\d{8}$/.test(phone))
      err.phone = "رقم غير صالح (مثال: 09xxxxxxxx)";

    if (!password) err.password = "كلمة المرور مطلوبة";
    else if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password))
      err.password = "كلمة المرور يجب أن تحتوي أحرف وأرقام (6 أحرف على الأقل)";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    const res = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    login(data.token, data.user);
    navigate("/home");
  };

  return (
    <div className="page rtl">
      {/* رجوع */}
      <IoArrowForward className="back" onClick={() => navigate("/index")} />

      <h1 className="title">إنشاء حساب</h1>

      <div className="field">
        <span className="icon">👤</span>
        <input
          placeholder="الاسم الكامل"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {errors.name && <div className="error">{errors.name}</div>}

      <div className="field">
        <span className="icon">📱</span>
        <input
          placeholder="رقم الهاتف (09xxxxxxxx)"
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

      <button className="btn" onClick={handleRegister}>
        إنشاء حساب
      </button>

      <p className="link" onClick={() => navigate("/login")}>
        لديك حساب؟ تسجيل الدخول
      </p>
    </div>
  );
}

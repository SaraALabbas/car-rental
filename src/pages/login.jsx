import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/authStyles.css";
import { useAuth } from "../context/useAuth";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaPhoneAlt, FaLock } from "react-icons/fa";

import BASE_URL from "../config/api";

// const BASE_URL = "https://car-rental-api-xwof.onrender.com";

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

    const res = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "رقم الهاتف أو كلمة المرور غير صحيحة");
      return;
    }

    if (data.user.role !== "admin") {
      setMessage("هذه الصفحة مخصصة للإدارة فقط");
      return;
    }

    login(data.token, data.user);
    setMessage("");
    navigate("/admin/orders");
  };

  return (
    <div
      className="min-h-screen bg-[#F8F5F1] flex items-center justify-center p-5"
      dir="rtl"
    >
      <div
        className="
        w-full
        max-w-md
        bg-white
        rounded-2xl
        shadow-lg
        border
        border-[#B67A2E]/20
        p-8
      "
      >
        {/* العنوان */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <h1 className="text-3xl font-bold text-[#B67A2E] text-center-align">
            تسجيل الدخول
          </h1>
        </div>

        {/* رقم الهاتف */}
        <div className="relative mb-4">
          <FaPhoneAlt
            className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-[#B67A2E]
      text-lg
    "
          />

          <input
            placeholder="رقم الهاتف (09xxxxxxxx)"
            onChange={(e) => setPhone(e.target.value)}
            className="
      w-full
      rounded-xl
      border
      border-gray-300
      pr-12
      pl-4
      py-3
      outline-none
      focus:border-[#B67A2E]
      transition
    "
          />
        </div>

        {errors.phone && (
          <p className="text-red-500 text-sm mb-4">{errors.phone}</p>
        )}

        {/* كلمة المرور */}
        <div className="relative mb-4">
          <FaLock
            className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-[#B67A2E]
      text-lg
    "
          />

          <input
            type={showPass ? "text" : "password"}
            placeholder="كلمة المرور"
            onChange={(e) => setPassword(e.target.value)}
            className="
      w-full
      rounded-xl
      border
      border-gray-300
      pr-12
      pl-12
      py-3
      outline-none
      focus:border-[#B67A2E]
      transition
    "
          />

          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      text-gray-500
      hover:text-[#B67A2E]
      transition
    "
          >
            {showPass ? <IoEyeOff /> : <IoEye />}
          </button>
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm mb-4">{errors.password}</p>
        )}

        {message && (
          <div
            className="
            bg-red-50
            border
            border-red-300
            text-red-600
            rounded-xl
            p-3
            mb-5
          "
          >
            {message}
          </div>
        )}

        <button
          onClick={handleLogin}
          className="
          w-full
          bg-[#B67A2E]
          hover:bg-[#9A6525]
          text-white
          font-bold
          py-3
          rounded-xl
          transition
        "
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

import {
  FaArrowRight,
  FaCarSide,
  FaShieldAlt,
  FaClipboardList,
} from "react-icons/fa";

const BASE_URL = "http://127.0.0.1:8000";

export default function Instructions() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch(`${BASE_URL}/api/instructions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setInstructions(data))
      .catch((err) => console.log(err));
  }, [token]);

  const icons = {
    car: <FaCarSide className="text-yellow-400 text-3xl" />,
    shield: <FaShieldAlt className="text-yellow-400 text-3xl" />,
    clipboard: <FaClipboardList className="text-yellow-400 text-3xl" />,
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10" dir="rtl">
      {/* زر الرجوع */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 px-5 py-3 rounded-xl transition"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* العنوان */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          التعليمات والإرشادات
        </h1>

        <p className="text-gray-400 text-lg">
          كل ما تحتاج معرفته حول آلية عمل التطبيق واستئجار السيارات
        </p>
      </div>

      {/* الأقسام */}
      <div className="max-w-5xl mx-auto space-y-8">
        {instructions.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              {icons[item.icon]}

              <h2 className="text-2xl font-bold">{item.title}</h2>
            </div>

            <p className="text-gray-300 leading-9 text-lg whitespace-pre-line">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

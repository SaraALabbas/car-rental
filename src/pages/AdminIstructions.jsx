import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FaArrowRight } from "react-icons/fa";

const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function AdminInstructions() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [instructions, setInstructions] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [icon, setIcon] = useState("car");

  const [editingId, setEditingId] = useState(null);

  // جلب البيانات
  useEffect(() => {
    if (!token) return;

    const fetchInstructions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/instructions`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();

        setInstructions(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInstructions();
  }, [token]);

  // إضافة أو تعديل
  const handleSubmit = async () => {
    const body = {
      title,
      content,
      icon,
    };

    let url = `${BASE_URL}/api/instructions`;

    let method = "POST";

    if (editingId) {
      url = `${BASE_URL}/api/instructions/${editingId}`;

      method = "PUT";
    }

    await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setTitle("");
    setContent("");
    setIcon("car");
    setEditingId(null);

    const res = await fetch(`${BASE_URL}/api/instructions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();

    setInstructions(data);
  };

  // حذف
  const deleteInstruction = async (id) => {
    await fetch(`${BASE_URL}/api/instructions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await fetch(`${BASE_URL}/api/instructions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await res.json();

    setInstructions(data);
  };

  // تعديل
  const editInstruction = (item) => {
    setTitle(item.title);

    setContent(item.content);

    setIcon(item.icon);

    setEditingId(item.id);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6" dir="rtl">
      {/* زر الرجوع + العنوان */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-3 rounded-xl transition"
        >
          <FaArrowRight className="text-white text-2xl" />
        </button>

        <h1 className="text-3xl font-bold text-yellow-400">إدارة التعليمات</h1>
      </div>

      {/* الفورم */}
      <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700 mb-10">
        <input
          type="text"
          placeholder="عنوان القسم"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl bg-black border border-gray-700"
        />

        <textarea
          placeholder="المحتوى"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full mb-4 p-3 rounded-xl bg-black border border-gray-700"
        />

        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl bg-black border border-gray-700"
        >
          <option value="car">سيارة</option>

          <option value="shield">تأمين</option>

          <option value="clipboard">تعليمات</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl font-bold"
        >
          {editingId ? "تعديل القسم" : "إضافة قسم"}
        </button>
      </div>

      {/* عرض الأقسام */}
      <div className="space-y-6">
        {instructions.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              {item.title}
            </h2>

            <p className="text-gray-300 leading-8 whitespace-pre-line">
              {item.content}
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => editInstruction(item)}
                className="bg-blue-600 px-4 py-2 rounded-lg"
              >
                تعديل
              </button>

              <button
                onClick={() => deleteInstruction(item.id)}
                className="bg-red-600 px-4 py-2 rounded-lg"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

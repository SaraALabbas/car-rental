import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

import InstructionsTable from "../components/Instructions/InstructionsTable";
import InstructionsCard from "../components/Instructions/InstructionsCard";
import InstructionDetailsModal from "../components/Instructions/InstructionsDetailsModal";

import BASE_URL from "../config/api";

// const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function AdminInstructions() {
  const { token } = useAuth();
  const [instructions, setInstructions] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [icon, setIcon] = useState("car");

  const [editingId, setEditingId] = useState(null);

  const [selectedInstruction, setSelectedInstruction] = useState(null);

  const [message, setMessage] = useState("");
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

    setMessage(
      editingId ? "✅ تم تعديل القسم بنجاح" : "✅ تم إضافة القسم بنجاح",
    );

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
    setMessage("🗑 تم حذف القسم بنجاح");
  };

  // تعديل
  const editInstruction = (item) => {
    setTitle(item.title);

    setContent(item.content);

    setIcon(item.icon);

    setEditingId(item.id);
  };

  return (
    <div className="min-h-full bg-[#F8F5F1] p-6" dir="rtl">
      {/* العنوان */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#B67A2E]">إدارة التعليمات</h1>

        <p className="text-gray-500 mt-2">
          إضافة وتعديل وحذف أقسام التعليمات التي تظهر للمستخدم.
        </p>
        {message && (
          <div
            className="
    bg-[#F5EEE4]
    border
    border-[#B67A2E]/30
    text-[#6B4A1E]
    p-3
    rounded-xl
    mt-4
    font-semibold
    "
          >
            {message}
          </div>
        )}
      </div>

      {/* الفورم */}
      <div className="bg-white rounded-2xl shadow-md border border-[#B67A2E]/20 p-6 mb-8">
        <input
          type="text"
          placeholder="عنوان القسم"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
          w-full
          mb-4
          p-3
          rounded-xl
          border
          border-[#D7B98E]
          bg-white
          focus:ring-2
          focus:ring-[#B67A2E]
          focus:border-[#B67A2E]
          outline-none
        "
        />

        <textarea
          placeholder="المحتوى"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="
          w-full
          mb-4
          p-3
          rounded-xl
          border
          border-[#D7B98E]
          bg-white
          focus:ring-2
          focus:ring-[#B67A2E]
          focus:border-[#B67A2E]
          outline-none
          resize-none
        "
        />

        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="
          w-full
          mb-5
          p-3
          rounded-xl
          border
          border-[#D7B98E]
          bg-white
          focus:ring-2
          focus:ring-[#B67A2E]
          focus:border-[#B67A2E]
          outline-none
        "
        >
          <option value="car">سيارة</option>
          <option value="shield">تأمين</option>
          <option value="clipboard">تعليمات</option>
        </select>

        <button
          onClick={handleSubmit}
          className="
          bg-[#B67A2E]
          hover:bg-[#9A6525]
          text-white
          px-6
          py-3
          rounded-xl
          font-bold
          transition
        "
        >
          {editingId ? "حفظ التعديلات" : "إضافة قسم"}
        </button>
      </div>

      {/* جدول اللابتوب والتابلت */}
      <InstructionsTable
        instructions={instructions}
        editInstruction={editInstruction}
        deleteInstruction={deleteInstruction}
        openDetails={setSelectedInstruction}
      />

      {/* بطاقات الموبايل */}
      <InstructionsCard
        instructions={instructions}
        editInstruction={editInstruction}
        deleteInstruction={deleteInstruction}
        openDetails={setSelectedInstruction}
      />

      {/* Modal التفاصيل */}
      {selectedInstruction && (
        <InstructionDetailsModal
          item={selectedInstruction}
          close={() => setSelectedInstruction(null)}
        />
      )}
    </div>
  );
}

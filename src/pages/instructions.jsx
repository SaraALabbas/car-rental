import { useEffect, useState } from "react";
import BottomTabBar from "../components/BottomTabBar";
import { FaCarSide, FaShieldAlt, FaClipboardList } from "react-icons/fa";
import BASE_URL from "../config/api";

export default function Instructions() {
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/instructions`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setInstructions(data))
      .catch((err) => console.log(err));
  }, []);

  const icons = {
    car: <FaCarSide className="text-[#B67A2E] text-3xl" />,
    shield: <FaShieldAlt className="text-[#B67A2E] text-3xl" />,
    clipboard: <FaClipboardList className="text-[#B67A2E] text-3xl" />,
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7] p-4 pb-24">
      {/* العنوان */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#B67A2E]">
          التعليمات والإرشادات
        </h1>

        <p className="text-gray-600 mt-3">
          يرجى قراءة التعليمات التالية قبل إتمام عملية الحجز.
        </p>
      </div>

      {instructions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-[#B67A2E]/20 p-8 text-center text-gray-500">
          لا توجد تعليمات حالياً.
        </div>
      ) : (
        <div className="space-y-5">
          {instructions.map((item) => (
            <div
              key={item.id}
              className="
                bg-white
                rounded-2xl
                shadow-md
                border
                border-[#B67A2E]/20
                p-6
              "
            >
              <div className="flex items-center gap-3 mb-4">
                {icons[item.icon] || (
                  <FaClipboardList className="text-[#B67A2E] text-3xl" />
                )}

                <h2 className="text-xl font-bold text-[#6B4A1E]">
                  {item.title}
                </h2>
              </div>

              <p className="text-gray-700 leading-8 whitespace-pre-line">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      )}

      <BottomTabBar />
    </div>
  );
}

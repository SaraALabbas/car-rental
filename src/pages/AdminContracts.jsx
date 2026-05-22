import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FaCarSide, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const BASE_URL = "http://127.0.0.1:8000";

export default function AdminContracts() {
  const [contracts, setContracts] = useState([]);
  const [search, setSearch] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!token) return;

    const loadContracts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/contracts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setContracts(data);
        } else {
          setContracts(data.data || []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    loadContracts();
  }, [token]);

  // 🔍 البحث حسب رقم العقد أو اسم المستأجر
  const filteredContracts = contracts.filter((c) => {
    const contractNumber = String(c.contract_number || "");
    const userName = c.user?.name?.toLowerCase() || "";
    const searchValue = search.toLowerCase();

    return (
      contractNumber.includes(searchValue) || userName.includes(searchValue)
    );
  });
  const sortedContracts = [...filteredContracts].sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen bg-black text-white p-6" dir="rtl">
      {/* BACK */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-yellow-400 transition"
        >
          <FaArrowRight className="text-2xl" />
        </button>
      </div>

      <h1 className="text-3xl text-rigth mb-6">📄 جميع العقود</h1>

      {/* 🔍 البحث */}
      <input
        type="text"
        placeholder="ابحث برقم العقد أو اسم المستأجر..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
      />

      {/* العقود */}
      {filteredContracts.length === 0 ? (
        <p className="text-gray-400 text-center">لا يوجد عقود</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 direction-rtl">
          {" "}
          {sortedContracts.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/contracts/${c.id}`)}
              className="bg-gray-900 border border-gray-700 p-8 rounded-2xl w-full w-[300px] cursor-pointer hover:bg-gray-800 transition transform hover:scale-[1.02]"
            >
              <div className="flex flex-col gap-5">
                {/* معلومات العقد */}
                <div className="flex-1 text-right w-full">
                  <div className="text-blue-400 font-bold text-lg sm:text-xl mb-3 break-words">
                    عقد رقم: {c.contract_number}
                  </div>

                  <div className="text-gray-300 mb-2 break-words text-lg">
                    👤 {c.user?.name || "غير معروف"}
                  </div>

                  {/* السيارة */}
                  <div className="flex items-center gap-3 mb-3 whitespace-nowrap">
                    <FaCarSide className="text-yellow-400 text-xl flex-shrink-0" />

                    <span className="text-gray-300 font-semibold">
                      نوع السيارة:
                    </span>

                    <span className="text-white font-bold">
                      {c.booking?.car?.name || "غير متوفر"}
                    </span>
                  </div>

                  {/* التاريخ */}
                  <div className="flex items-center gap-3 mb-5 whitespace-nowrap">
                    <FaCalendarAlt className="text-yellow-400 text-lg flex-shrink-0" />

                    <span className="text-gray-400 font-semibold">
                      التاريخ:
                    </span>

                    <span className="text-white">
                      {c.booking?.pickup_date
                        ? new Date(c.booking.pickup_date).toLocaleDateString(
                            "ar-EG",
                          )
                        : "—"}
                    </span>
                  </div>
                </div>

                {/* صور الهوية */}
                <div className="flex justify-center gap-4 md:gap-6 flex-nowrap items-start">
                  {/* الوجه الأمامي */}
                  <div className="text-center flex-1 flex flex-col">
                    <div className="h-40 bg-white rounded-xl border-2 border-yellow-400 overflow-hidden flex items-center justify-center">
                      <img
                        src={`${BASE_URL}/storage/${c.booking?.id_front}`}
                        alt="front"
                        onClick={() =>
                          setPreviewImage(
                            `${BASE_URL}/storage/${c.booking?.id_front}`,
                          )
                        }
                        className="w-full h-full object-contain cursor-pointer hover:scale-105 transition"
                      />
                    </div>

                    <p className="text-xs text-gray-400 mt-2">الوجه الأمامي</p>
                  </div>

                  {/* الوجه الخلفي */}
                  <div className="text-center flex-1 flex flex-col">
                    <div className="h-40 bg-white rounded-xl border-2 border-yellow-400 overflow-hidden flex items-center justify-center">
                      <img
                        src={`${BASE_URL}/storage/${c.booking?.id_back}`}
                        alt="back"
                        onClick={() =>
                          setPreviewImage(
                            `${BASE_URL}/storage/${c.booking?.id_back}`,
                          )
                        }
                        className="w-full h-full object-contain cursor-pointer hover:scale-105 transition"
                      />
                    </div>

                    <p className="text-xs text-gray-400 mt-2">الوجه الخلفي</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* ✅ معاينة الصورة */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* زر الإغلاق */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg z-50"
            >
              ✕
            </button>

            {/* الصورة */}
            <img
              src={previewImage}
              alt="preview"
              className="max-h-[90vh] rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

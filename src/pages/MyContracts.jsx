import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FaCarSide, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import BASE_URL from "../config/api";

// const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function MyContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const { token } = useAuth();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchContracts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/my-contracts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("API Error");

        const data = await res.json();

        if (!isMounted) return;
        setContracts(Array.isArray(data) ? data : data.data || []);
      } catch {
        if (!isMounted) return;
        setError("حدث خطأ في تحميل العقود");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (token) fetchContracts();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // 🔍 Search مضبوط
  const filtered = contracts.filter((c, index) => {
    const number = String(index + 1);
    const car = c.booking?.car?.name?.toLowerCase() || "";
    const value = search.toLowerCase();

    return number.includes(value) || car.includes(value);
  });

  return (
    <div className="min-h-screen bg-black text-white p-6 w-full" dir="rtl">
      {/* BACK */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-yellow-400 transition"
        >
          <FaArrowRight className="text-2xl" />
        </button>
      </div>
      <h1 className="text-3xl text-rigth mb-6">📄 عقودي</h1>
      {/* Search */}
      <input
        className="w-full p-3 mb-6 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        placeholder="ابحث برقم العقد أو اسم السيارة..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Loading */}
      {loading && <p className="text-gray-400">جاري التحميل...</p>}
      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}
      {/* Grid */}
      <div className=" w-full max-w-[1800px] mx-auto">
        <div className="flex flex-wrap gap-8 justify-start">
          {filtered.map((c, index) => (
            <div
              key={c.id}
              onClick={() => navigate(`/contracts/${c.id}`)}
              className="bg-gray-900 border border-gray-700 p-8 rounded-2xl w-full w-[300px] cursor-pointer hover:bg-gray-800 transition transform hover:scale-[1.02]"
            >
              {/* رقم العقد */}
              <h2 className="text-blue-400 font-bold text-2xl mb-3">
                عقد رقم: {index + 1}
              </h2>

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

                <span className="text-gray-400 font-semibold">التاريخ:</span>

                <span className="text-white">
                  {c.booking?.pickup_date
                    ? new Date(c.booking.pickup_date).toLocaleDateString(
                        "ar-EG",
                      )
                    : "—"}
                </span>
              </div>
              {/* الصور */}
              <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                {/* الوجه الأمامي */}
                <div className="flex-1 text-center">
                  <img
                    src={`${BASE_URL}/storage/${c.booking?.id_front}`}
                    alt="front"
                    onClick={() =>
                      setPreviewImage(
                        `${BASE_URL}/storage/${c.booking?.id_front}`,
                      )
                    }
                    className="w-full h-[80px] object-cover bg-white rounded-xl border-2 border-yellow-400 cursor-pointer hover:scale-105 transition"
                  />

                  <p className="text-xs text-gray-400 mt-2">الوجه الأمامي</p>
                </div>

                {/* الوجه الخلفي */}
                <div className="flex-1 text-center">
                  <img
                    src={`${BASE_URL}/storage/${c.booking?.id_back}`}
                    alt="back"
                    onClick={() =>
                      setPreviewImage(
                        `${BASE_URL}/storage/${c.booking?.id_back}`,
                      )
                    }
                    className="w-full h-[80px] object-cover bg-white rounded-xl border-2 border-yellow-400 cursor-pointer hover:scale-105 transition"
                  />

                  <p className="text-xs text-gray-400 mt-2">الوجه الخلفي</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
      {/* معاينة الصورة */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-5xl w-full flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg z-50"
            >
              ✕
            </button>

            <img
              src={previewImage}
              alt="preview"
              className="max-h-[90vh] max-w-full rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

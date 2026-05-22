import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { FaArrowRight } from "react-icons/fa";

const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function MyOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch(`${BASE_URL}/api/my-bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching my bookings:", err);
        setLoading(false);
      });
  }, [token]);

  const calculateTotal = (start, end, price) => {
    if (!start || !end || !price) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const days = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * price : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white p-4 text-center">
        جاري التحميل...
      </div>
    );
  }
  const formatTime = (time) => {
    if (!time) return "";

    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);

    const period = hours >= 12 ? "مساءً" : "صباحاً";

    const formattedHour = hours % 12 || 12;

    return `${formattedHour}:${minutes} ${period}`;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-4 pb-20">
      {/* الهيدر مع زر الرجوع */}
      <div className="flex items-center mb-6 px-1">
        {/* العنوان في المنتصف تماماً */}
        <h1 className="flex-1 text-2xl font-bold text-center">طلباتي</h1>

        {/* زر الرجوع - على أقصى اليمين */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xl font-medium pr-4"
        >
          <FaArrowRight className="text-3xl" />
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">
          لا توجد طلبات حجز حالياً
        </p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#1a1a1a] p-5 rounded-2xl mb-6 border border-gray-700"
          >
            {/* معلومات المستأجر */}
            <div className="text-right space-y-2 mb-4">
              <p className="text-lg font-semibold">{order.full_name}</p>
              <p className="text-gray-400">{order.phone}</p>
            </div>

            {/* معلومات السيارة */}
            <div className="mt-4 text-right space-y-1 text-base border-t border-gray-700 pt-3">
              <p>
                {order.car?.name}{" "}
                <span className="text-gray-400"> :اسم السيارة</span>
              </p>
              <p>
                <span className="text-gray-400">اللون:</span> {order.car?.color}
              </p>
              <p>
                <span className="text-gray-400">موديل السيارة:</span>{" "}
                {order.car?.model_year}
              </p>

              <p>
                <span className="text-gray-400">الإيجار اليومي:</span> $
                {order.car?.price}
              </p>
              <p className="text-yellow-400 font-bold">
                $ التكلفة النهائية:{" "}
                {calculateTotal(
                  order.pickup_date,
                  order.return_date,
                  order.car?.price,
                )}
              </p>
            </div>

            {/* 📅 التاريخ */}
            <div className="mt-4 border-t border-gray-700 pt-3 space-y-2 text-base text-right">
              <p>
                <span className="text-gray-400">من:</span>{" "}
                <span className="text-white">{order.pickup_date}</span>
              </p>

              <p>
                <span className="text-gray-400">إلى:</span>{" "}
                <span className="text-white">{order.return_date}</span>
              </p>
            </div>

            {/* ⏰ الوقت */}
            <div className="mt-3 border-t border-gray-700 pt-3 space-y-2 text-base text-right">
              <p>
                <span className="text-gray-400">ساعة الاستلام:</span>{" "}
                <span className="text-white">
                  {formatTime(order.pickup_time)}
                </span>
              </p>

              <p>
                <span className="text-gray-400">ساعة التسليم:</span>{" "}
                <span className="text-white">
                  {formatTime(order.return_time)}
                </span>
              </p>
            </div>
            <div className="mt-3 border-t border-gray-700 pt-3 space-y-2 text-base text-right">
              {order.delivery && (
                <div className=" rounded-lg p-3 mt-3">
                  <p className="text-yellow-400 font-bold mb-1">
                    خدمة توصيل للمطار ✈️
                  </p>

                  <p className="text-white">{order.delivery_location}</p>
                </div>
              )}
            </div>

            {/* 🖼 الصور */}
            <div className="border-t border-gray-700 pt-3  flex gap-3 mt-4 justify-end flex-wrap">
              {[order.id_front, order.id_back, order.payment_image].map(
                (img, i) => (
                  <img
                    key={i}
                    src={`${BASE_URL}/storage/${img}`}
                    onClick={() => setPreview(`${BASE_URL}/storage/${img}`)}
                    className="w-24 h-24 object-cover rounded cursor-pointer hover:scale-105 transition"
                  />
                ),
              )}
            </div>
            {/* الحالة */}
            <div className="mt-5 text-right">
              {order.status === "accepted" && (
                <span className="text-green-400 font-bold text-lg">
                  ✓ مقبول
                </span>
              )}
              {order.status === "rejected" && (
                <div className="text-red-400">
                  <p className="font-bold">✕ مرفوض</p>
                  {order.rejection_reason && (
                    <p className="text-sm mt-1">
                      السبب: {order.rejection_reason}
                    </p>
                  )}
                </div>
              )}
              {(!order.status || order.status === "pending") && (
                <span className="text-yellow-400 font-bold text-lg">
                  ⏳ قيد الانتظار
                </span>
              )}
            </div>
          </div>
        ))
      )}

      {/* عرض الصورة المكبرة */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            className="max-w-full max-h-full rounded-2xl"
            alt="preview"
          />
        </div>
      )}
    </div>
  );
}

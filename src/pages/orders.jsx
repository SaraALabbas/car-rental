import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { FaArrowRight } from "react-icons/fa";

const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function Orders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/bookings`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const updateStatus = async (id, status, rejection_reason = "") => {
    let url;

    if (status === "accepted") {
      url = `${BASE_URL}/api/bookings/${id}/approve`;
    } else {
      url = `${BASE_URL}/api/bookings/${id}/reject`;
    }

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reason: rejection_reason,
      }),
    });

    const data = await res.json();
    console.log(data);

    // تحديث الواجهة
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status, rejection_reason } : o)),
    );

    setRejectId(null);
    setReason("");
  };

  const calculateTotal = (start, end, price) => {
    const s = new Date(start);
    const e = new Date(end);
    const days = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * price : 0;
  };
  const formatTime = (time) => {
    if (!time) return "";

    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);

    const period = hours >= 12 ? "مساءً" : "صباحاً";

    const formattedHour = hours % 12 || 12;

    return `${formattedHour}:${minutes} ${period}`;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-4">
      {/* الهيدر مع زر الرجوع */}
      <div className="flex items-center mb-6 px-1">
        {/* العنوان في المنتصف تماماً */}
        <h1 className="flex-1 text-2xl font-bold text-center">طلبات الحجز</h1>

        {/* زر الرجوع - على أقصى اليمين */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xl font-medium pr-4"
        >
          <FaArrowRight className="text-3xl" />
        </button>
      </div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-[#1a1a1a] p-5 rounded-xl mb-5 border border-gray-700"
        >
          {/* 👤 معلومات */}
          <div className="text-right space-y-2 text-base">
            <p>
              <span className="text-gray-400">الاسم:</span> {order.full_name}
            </p>
            <p>
              <span className="text-gray-400">الهاتف:</span> {order.phone}
            </p>
          </div>

          {/* 🚗 السيارة */}
          <div className="mt-4 text-right space-y-1 text-base border-t border-gray-700 pt-3">
            <p>
              <span className="text-gray-400"> اسم السيارة :</span>{" "}
              {order.car?.name}
            </p>
            <p>
              <span className="text-gray-400">اللون:</span> {order.car?.color}
            </p>

            <p>
              <span className="text-gray-400">موديل السيارة:</span>{" "}
              {order.car?.model_year}
            </p>

            <p>
              <span className="text-gray-400"> الإيجار اليومي:</span> $
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
            {" "}
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

          {/* 📌 الحالة */}
          <div className="mt-4 text-right text-base">
            {order.status === "accepted" && (
              <span className="text-green-400 font-bold">مقبول</span>
            )}

            {order.status === "rejected" && (
              <div className="text-red-400">
                <p className="font-bold">مرفوض</p>
                <p className="text-sm text-gray-300">
                  السبب: {order.rejection_reason}
                </p>
              </div>
            )}

            {(!order.status || order.status === "pending") && (
              <span className="text-yellow-400 font-bold">قيد الانتظار</span>
            )}
          </div>
          {/* 🎯 الأزرار */}
          {!order.status || order.status === "pending" ? (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => updateStatus(order.id, "accepted")}
                className="flex-1 bg-green-600 py-3 rounded-lg text-lg"
              >
                قبول
              </button>

              <button
                onClick={() => setRejectId(order.id)}
                className="flex-1 bg-red-600 py-3 rounded-lg text-lg"
              >
                رفض
              </button>
            </div>
          ) : null}

          {/* ❌ سبب الرفض */}
          {rejectId === order.id && (
            <div className="mt-4">
              <textarea
                placeholder="اكتب سبب الرفض..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 bg-black border border-gray-600 rounded text-right"
              />

              <button
                onClick={() => updateStatus(order.id, "rejected", reason)}
                className="w-full bg-red-500 mt-2 py-3 rounded-lg"
              >
                تأكيد الرفض
              </button>
            </div>
          )}
        </div>
      ))}

      {/* 🔍 عرض الصورة */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreview(null)}
        >
          <img src={preview} className="max-w-[90%] max-h-[90%] rounded" />
        </div>
      )}
    </div>
  );
}

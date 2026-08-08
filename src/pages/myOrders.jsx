import { useState } from "react";
import BottomTabBar from "../components/BottomTabBar";
import BASE_URL from "../config/api";

export default function MyOrders() {
  const [bookingNumber, setBookingNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const formatTime = (time) => {
    if (!time) return "";

    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);

    const period = hours >= 12 ? "مساءً" : "صباحاً";
    const formattedHour = hours % 12 || 12;

    return `${formattedHour}:${minutes} ${period}`;
  };

  const handleSearch = async () => {
    if (!bookingNumber || !phone) {
      setError("يرجى إدخال رقم الحجز ورقم الهاتف");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/api/track-booking`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_number: bookingNumber,
          phone: phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setOrder(null);
        setError(data.message || "لم يتم العثور على الحجز");
      } else {
        setOrder(data);
      }
    } catch (err) {
      setError("حدث خطأ أثناء الاتصال بالخادم", err);
    }

    setLoading(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7] p-4 pb-20">
      <h1 className="flex-1 text-3xl font-bold text-center text-[#B67A2E]">
        تتبع الحجز
      </h1>

      <p className="text-center text-gray-600 mt-3 mb-6">
        يرجى إدخال رقم الحجز ورقم هاتفك لتتمكن من رؤية حجوزاتك
      </p>

      <div className="bg-white rounded-2xl shadow-md border border-[#B67A2E]/20 p-5 mb-6">
        <label className="block text-right text-[#6B4A1E] font-semibold mb-2">
          رقم الحجز
        </label>

        <input
          type="text"
          value={bookingNumber}
          onChange={(e) => setBookingNumber(e.target.value)}
          placeholder="مثال: BK-5A72D91F"
          className="w-full border border-[#D7B98E] rounded-xl p-3 mb-5
    focus:ring-2 focus:ring-[#B67A2E]
    focus:border-[#B67A2E]
    outline-none text-right"
        />

        <label className="block text-right text-[#6B4A1E] font-semibold mb-2">
          رقم الهاتف
        </label>

        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="09xxxxxxxx"
          className="w-full border border-[#D7B98E] rounded-xl p-3 mb-6
    focus:ring-2 focus:ring-[#B67A2E]
    focus:border-[#B67A2E]
    outline-none text-right"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-[#B67A2E]
    hover:bg-[#9A6525]
    text-white
    rounded-xl
    py-3
    font-bold
    transition"
        >
          {loading ? "جاري البحث..." : "بحث"}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
      {order && (
        <div className="bg-white shadow-md rounded-2xl border border-[#B67A2E]/30 p-5 mb-6">
          {/* رقم الحجز */}
          <div className="text-right mb-5">
            <h2 className="text-[#B67A2E] text-xl font-bold">تفاصيل الحجز</h2>

            <p className="mt-3 text-lg font-bold text-[#B67A2E]">
              رقم الحجز:
              <span className="text-gray-800 mr-2">{order.booking_number}</span>
            </p>
            <p className="text-gray-800 font-semibold">
              <span className="text-gray-500">اسم المستأجر:</span>{" "}
              {order.full_name}
            </p>
          </div>

          <hr className="border-[#E6D3B2] mb-4" />

          {/* معلومات السيارة */}
          <div className="space-y-3 text-right text-gray-800">
            <p>
              <span className="text-gray-500">اسم السيارة:</span>{" "}
              {order.car?.name}
            </p>

            <p>
              <span className="text-gray-500">اللون:</span> {order.car?.color}
            </p>

            <p>
              <span className="text-gray-500">موديل السيارة:</span>{" "}
              {order.car?.model}
            </p>

            <p className="font-bold text-[#B67A2E] text-lg">
              التكلفة النهائية: {order.final_price} $
            </p>
          </div>

          <hr className="border-[#E6D3B2] my-4" />

          {/* التاريخ والوقت */}
          <div className="space-y-3 text-right text-gray-800">
            <p>
              <span className="text-gray-500">تاريخ الاستلام:</span>{" "}
              {order.pickup_date}
            </p>

            <p>
              <span className="text-gray-500">وقت الاستلام:</span>{" "}
              {formatTime(order.pickup_time)}
            </p>

            <p>
              <span className="text-gray-500">تاريخ التسليم:</span>{" "}
              {order.return_date}
            </p>

            <p>
              <span className="text-gray-500">وقت التسليم:</span>{" "}
              {formatTime(order.return_time)}
            </p>
          </div>

          <hr className="border-[#E6D3B2] my-4" />

          {/* التوصيل */}
          <p className="text-right text-gray-800">
            <span className="text-gray-500">خدمة التوصيل:</span>{" "}
            {order.delivery ? order.delivery_location : "استلام من المكتب"}
          </p>

          <hr className="border-[#E6D3B2] my-4" />

          {/* الصور */}
          <div className="flex justify-between gap-2">
            <div className="text-center flex-1">
              <p className="text-sm text-gray-600 mb-2">الهوية أمام</p>

              <img
                src={order.id_front}
                onClick={() => setPreview(order.id_front)}
                className="w-full h-24 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
              />
            </div>

            <div className="text-center flex-1">
              <p className="text-sm text-gray-600 mb-2">الهوية خلف</p>

              <img
                src={order.id_back}
                onClick={() => setPreview(order.id_back)}
                className="w-full h-24 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
              />
            </div>

            <div className="text-center flex-1">
              <p className="text-sm text-gray-600 mb-2">إشعار الدفع</p>

              <img
                src={order.payment_image}
                onClick={() => setPreview(order.payment_image)}
                className="w-full h-24 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
              />
            </div>
          </div>

          <hr className="border-[#E6D3B2] my-4" />

          {/* الحالة */}
          <div className="text-right">
            {order.status === "accepted" && (
              <p className="text-green-600 font-bold text-lg">
                ✓ تم قبول الحجز
              </p>
            )}

            {order.status === "pending" && (
              <p className="text-[#B67A2E] font-bold text-lg">
                ⏳ الطلب قيد المراجعة
              </p>
            )}

            {order.status === "rejected" && (
              <div className="text-red-600">
                <p className="font-bold text-lg">✕ تم رفض الطلب</p>

                {order.rejection_reason && (
                  <p className="mt-2">السبب: {order.rejection_reason}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {preview && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            className="max-w-full max-h-full rounded-2xl"
            alt=""
          />
        </div>
      )}

      <BottomTabBar />
    </div>
  );
}

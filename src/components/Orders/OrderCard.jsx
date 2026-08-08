export default function OrderCard({
  orders,
  formatTime,
  openDetails,
  updateStatus,
  setRejectId,
}) {
  return (
    <div className="lg:hidden">
      {orders.map((order) => (
        <div
          key={order.id}
          className="
          bg-white
          rounded-2xl
          shadow-md
          border
          border-[#B67A2E]/20
          p-5
          mb-5
          "
        >
          {/* رقم الحجز */}
          <div className="text-right mb-4">
            <p className="text-[#B67A2E] font-bold text-lg">
              رقم الحجز:
              <span className="mr-2">{order.booking_number}</span>
            </p>
          </div>

          {/* المستأجر */}
          <div className="border-t pt-3 text-right space-y-2">
            <p>
              <span className="text-gray-500">الاسم:</span> {order.full_name}
            </p>

            <p>
              <span className="text-gray-500">الهاتف:</span> {order.phone}
            </p>
          </div>

          {/* السيارة */}
          <div className="border-t mt-4 pt-3 text-right space-y-2">
            <p>
              <span className="text-gray-500">السيارة:</span> {order.car?.name}
            </p>

            <p>
              <span className="text-gray-500">اللون:</span> {order.car?.color}
            </p>

            <p>
              <span className="text-gray-500">الموديل:</span>{" "}
              {order.car?.model_year}
            </p>
          </div>

          {/* السعر */}
          <div
            className="
            mt-4
            bg-[#F8F5F1]
            rounded-xl
            p-3
            text-right
            "
          >
            <p className="text-[#B67A2E] font-bold text-lg">
              التكلفة النهائية:
              <span className="mr-2">{order.final_price} $</span>
            </p>
          </div>

          {/* التاريخ والوقت */}
          <div className="border-t mt-4 pt-3 text-right space-y-2">
            <p>
              <span className="text-gray-500">الاستلام:</span>{" "}
              {order.pickup_date}
            </p>

            <p>
              الساعة:
              <span className="mr-2">{formatTime(order.pickup_time)}</span>
            </p>

            <p className="mt-2">
              <span className="text-gray-500">التسليم:</span>{" "}
              {order.return_date}
            </p>

            <p>
              الساعة:
              <span className="mr-2">{formatTime(order.return_time)}</span>
            </p>
          </div>

          {/* الحالة */}

          <div className="border-t mt-4 pt-3 text-right">
            {order.status === "accepted" && (
              <p className="text-green-600 font-bold">✓ تم قبول الطلب</p>
            )}

            {order.status === "pending" && (
              <p className="text-yellow-600 font-bold">⏳ قيد المراجعة</p>
            )}

            {order.status === "rejected" && (
              <p className="text-red-600 font-bold">✕ مرفوض</p>
            )}
          </div>

          {/* الأزرار */}

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => openDetails(order)}
              className="
              flex-1
              bg-[#B67A2E]
              text-white
              py-3
              rounded-xl
              font-bold
              "
            >
              التفاصيل
            </button>

            {order.status === "pending" && (
              <>
                <button
                  onClick={() => updateStatus(order.id, "accepted")}
                  className="
                  bg-green-600
                  text-white
                  px-4
                  rounded-xl
                  "
                >
                  ✓
                </button>

                <button
                  onClick={() => setRejectId(order.id)}
                  className="
                  bg-red-600
                  text-white
                  px-4
                  rounded-xl
                  "
                >
                  ✕
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OrdersTable({
  orders,
  openDetails,
  updateStatus,
  setRejectId,
  setDeleteId,
}) {
  return (
    <div className="hidden lg:block bg-white rounded-2xl shadow-md border border-[#B67A2E]/20 overflow-hidden">
      <table className="w-full text-right">
        <thead className="bg-[#B67A2E] text-white">
          <tr>
            <th className="p-4">رقم الحجز</th>
            <th className="p-4">المستأجر</th>
            <th className="p-4">السيارة</th>
            <th className="p-4">التاريخ</th>
            <th className="p-4">السعر</th>
            <th className="p-4">الحالة</th>
            <th className="p-4">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b hover:bg-[#F8F5F1] transition"
            >
              {/* رقم الحجز */}
              <td className="p-4 font-bold text-[#B67A2E]">
                {order.booking_number}
              </td>

              {/* المستأجر */}
              <td className="p-4">
                <p className="font-semibold">{order.full_name}</p>
                <p className="text-gray-500 text-sm">{order.phone}</p>
              </td>

              {/* السيارة */}
              <td className="p-4">
                <p className="font-semibold">{order.car?.name}</p>

                <p className="text-gray-500 text-sm">
                  اللون: {order.car?.color}
                </p>

                <p className="text-gray-500 text-sm">
                  الموديل: {order.car?.model_year}
                </p>

                <p className="text-gray-500 text-sm">
                  رقم اللوحة: {order.car?.plate_number}
                </p>

                <p className="text-[#B67A2E] font-bold text-sm">
                  السعر اليومي: {order.car?.price} $
                </p>
              </td>

              {/* التاريخ */}
              <td className="p-4 text-sm">
                <p>
                  الاستلام:
                  <br />
                  {order.pickup_date}
                </p>

                <p className="mt-2">
                  التسليم:
                  <br />
                  {order.return_date}
                </p>
              </td>

              {/* السعر */}
              <td className="p-4">
                <span className="font-bold text-[#B67A2E]">
                  {order.final_price} $
                </span>
              </td>

              {/* الحالة */}
              <td className="p-4">
                {order.status === "accepted" && (
                  <span className="text-green-600 font-bold">مقبول</span>
                )}

                {order.status === "pending" && (
                  <span className="text-yellow-600 font-bold">
                    قيد الانتظار
                  </span>
                )}

                {order.status === "rejected" && (
                  <span className="text-red-600 font-bold">مرفوض</span>
                )}
              </td>

              {/* الإجراءات */}
              <td className="p-4 min-w-[180px]">
                {/* التفاصيل */}
                <button
                  onClick={() => openDetails(order)}
                  className="
            w-full
            bg-[#B67A2E]
            text-white
            px-4
            py-2
            rounded-xl
            mb-2
            hover:bg-[#9A6525]
            transition
            font-bold
          "
                >
                  التفاصيل
                </button>

                {/* قبول ورفض */}
                {order.status === "pending" && (
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      onClick={() => updateStatus(order.id, "accepted")}
                      className="
                bg-green-600
                hover:bg-green-700
                text-white
                py-2
                rounded-xl
                font-bold
                transition
              "
                    >
                      ✓ قبول
                    </button>

                    <button
                      onClick={() => setRejectId(order.id)}
                      className="
                bg-red-500
                hover:bg-red-600
                text-white
                py-2
                rounded-xl
                font-bold
                transition
              "
                    >
                      ✕ رفض
                    </button>
                  </div>
                )}

                {/* حذف */}
                <button
                  onClick={() => setDeleteId(order.id)}
                  className="
            w-full
            bg-gray-700
            hover:bg-gray-800
            text-white
            py-2
            rounded-xl
            font-bold
            transition
          "
                >
                  🗑️ حذف الطلب
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

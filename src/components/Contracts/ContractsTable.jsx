import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ContractsTable({ contracts }) {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <div className="hidden lg:block bg-white rounded-2xl shadow-md border border-[#B67A2E]/20 overflow-hidden">
      <table className="w-full text-right">
        <thead className="bg-[#B67A2E] text-white">
          <tr>
            <th className="p-4">رقم العقد</th>
            <th className="p-4">المستأجر</th>
            <th className="p-4">السيارة</th>
            <th className="p-4">التاريخ</th>
            <th className="p-4">الصور</th>
            <th className="p-4">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {contracts.map((contract) => (
            <tr
              key={contract.id}
              className="border-b hover:bg-[#F8F5F1] transition"
            >
              {/* رقم العقد */}
              <td className="p-4 font-bold text-[#B67A2E]">
                {contract.contract_number}
              </td>

              {/* المستأجر */}
              <td className="p-4">
                <p className="font-semibold">
                  {contract.booking?.full_name || "غير معروف"}
                </p>
              </td>

              {/* السيارة */}
              <td className="p-4">
                <p>{contract.booking?.car?.name}</p>

                <p className="text-gray-500 text-sm">
                  {contract.booking?.car?.plate_number}
                </p>
              </td>

              {/* التاريخ */}
              <td className="p-4">
                {contract.booking?.pickup_date
                  ? new Date(contract.booking.pickup_date).toLocaleDateString(
                      "ar-EG",
                    )
                  : "—"}
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <img
                    src={contract.booking?.id_front}
                    alt="front"
                    onClick={() => setPreviewImage(contract.booking?.id_front)}
                    className="w-14 h-14 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                  />

                  <img
                    src={contract.booking?.id_back}
                    alt="back"
                    onClick={() => setPreviewImage(contract.booking?.id_back)}
                    className="w-14 h-14 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                  />

                  <img
                    src={contract.booking?.payment_image}
                    alt="payment"
                    onClick={() =>
                      setPreviewImage(contract.booking?.payment_image)
                    }
                    className="w-14 h-14 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                  />
                </div>
              </td>
              {/* الإجراءات */}
              <td className="p-4">
                <button
                  onClick={() => navigate(`/admin/contracts/${contract.id}`)}
                  className="
    bg-[#B67A2E]
    hover:bg-[#9A6525]
    text-white
    px-4
    py-2
    rounded-xl
    transition
  "
                >
                  عرض
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              ✕
            </button>

            <img
              src={previewImage}
              alt="preview"
              className="max-h-[90vh] rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

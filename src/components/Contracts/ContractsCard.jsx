import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function ContractsCard({ contracts }) {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  return (
    <div className="lg:hidden space-y-4">
      {contracts.map((contract) => (
        <div
          key={contract.id}
          className="
            bg-white
            rounded-2xl
            shadow-md
            border
            border-[#B67A2E]/20
            p-5
          "
        >
          <div className="space-y-2 text-right">
            <p>
              <span className="text-gray-500">رقم العقد:</span>{" "}
              <span className="font-bold text-[#B67A2E]">
                {contract.contract_number}
              </span>
            </p>

            <p>
              <span className="text-gray-500">المستأجر:</span>{" "}
              {contract.booking?.full_name || "غير معروف"}
            </p>

            <p>
              <span className="text-gray-500">السيارة:</span>{" "}
              {contract.booking?.car?.name || "غير متوفر"}
            </p>

            <p>
              <span className="text-gray-500">التاريخ:</span>{" "}
              {contract.booking?.pickup_date
                ? new Date(contract.booking.pickup_date).toLocaleDateString(
                    "ar-EG",
                  )
                : "-"}
            </p>
          </div>
          <div className="flex justify-center gap-3 my-4">
            {[
              contract.booking?.id_front,
              contract.booking?.id_back,
              contract.booking?.payment_image,
            ].map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setPreviewImage(img)}
                className="
        w-16
        h-16
        rounded-xl
        object-cover
        border
        border-[#B67A2E]/30
        cursor-pointer
        hover:scale-105
        transition
      "
              />
            ))}
          </div>
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
        </div>
      ))}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              ✕
            </button>

            <img
              src={previewImage}
              className="max-h-[90vh] rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

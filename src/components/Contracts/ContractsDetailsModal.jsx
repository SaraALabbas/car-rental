import { useState } from "react";

export default function ContractDetailsModal({ contract, close }) {
  const [preview, setPreview] = useState(null);

  if (!contract) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={close}
      >
        <div
          dir="rtl"
          onClick={(e) => e.stopPropagation()}
          className="
            bg-white
            rounded-2xl
            w-full
            max-w-4xl
            max-h-[90vh]
            overflow-y-auto
            p-6
          "
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#B67A2E]">تفاصيل العقد</h2>

            <button onClick={close} className="text-red-500 text-2xl font-bold">
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <p>
              <span className="text-gray-500">رقم العقد:</span>{" "}
              <b className="text-[#B67A2E]">{contract.contract_number}</b>
            </p>

            <p>
              <span className="text-gray-500">اسم المستأجر:</span>{" "}
              {contract.user?.name}
            </p>

            <hr />

            <h3 className="font-bold text-lg">معلومات السيارة</h3>

            <p>
              <span className="text-gray-500">السيارة:</span>{" "}
              {contract.booking?.car?.name}
            </p>

            <p>
              <span className="text-gray-500">اللوحة:</span>{" "}
              {contract.booking?.car?.plate_number}
            </p>

            <p>
              <span className="text-gray-500">اللون:</span>{" "}
              {contract.booking?.car?.color}
            </p>

            <p>
              <span className="text-gray-500">الموديل:</span>{" "}
              {contract.booking?.car?.model_year}
            </p>

            <p>
              <span className="text-gray-500">السعر اليومي:</span>{" "}
              <span className="font-bold text-[#B67A2E]">
                {contract.booking?.car?.price} $
              </span>
            </p>

            <hr />

            <h3 className="font-bold text-lg">معلومات الحجز</h3>

            <p>
              <span className="text-gray-500">تاريخ الاستلام:</span>{" "}
              {contract.booking?.pickup_date}
            </p>

            <p>
              <span className="text-gray-500">تاريخ التسليم:</span>{" "}
              {contract.booking?.return_date}
            </p>

            <p>
              <span className="text-gray-500">السعر النهائي:</span>{" "}
              <span className="font-bold text-[#B67A2E]">
                {contract.booking?.final_price} $
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="text-center">
              <p className="mb-2">الهوية الأمامية</p>

              <img
                src={contract.booking?.id_front}
                onClick={() => setPreview(contract.booking?.id_front)}
                className="
                  w-full
                  h-48
                  object-contain
                  rounded-xl
                  border
                  cursor-pointer
                "
              />
            </div>

            <div className="text-center">
              <p className="mb-2">الهوية الخلفية</p>

              <img
                src={contract.booking?.id_back}
                onClick={() => setPreview(contract.booking?.id_back)}
                className="
                  w-full
                  h-48
                  object-contain
                  rounded-xl
                  border
                  cursor-pointer
                "
              />
            </div>
          </div>
        </div>
      </div>
      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="
            fixed
            inset-0
            bg-black/80
            z-[60]
            flex
            items-center
            justify-center
            p-5
          "
        >
          <img
            src={preview}
            className="
              max-w-full
              max-h-full
              rounded-2xl
            "
          />
        </div>
      )}
    </>
  );
}

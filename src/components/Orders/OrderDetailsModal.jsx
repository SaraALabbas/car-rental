import { useState } from "react";

export default function OrderDetailsModal({ order, close, formatTime }) {
  const [preview, setPreview] = useState(null);

  if (!order) return null;

  return (
    <>
      {/* Modal */}
      <div
        className="
        fixed
        inset-0
        bg-black/50
        z-50
        flex
        items-center
        justify-center
        p-4
        "
        onClick={close}
      >
        <div
          className="
          bg-white
          w-full
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          shadow-xl
          p-6
          "
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
        >
          {/* العنوان */}
          <div className="flex justify-between items-center mb-5">
            <h2
              className="
              text-2xl
              font-bold
              text-[#B67A2E]
              "
            >
              تفاصيل الحجز
            </h2>

            <button
              onClick={close}
              className="
              text-red-500
              text-xl
              font-bold
              "
            >
              ✕
            </button>
          </div>

          {/* المعلومات */}

          <div className="space-y-3 text-right">
            <p>
              <span className="text-gray-500">رقم الحجز:</span>{" "}
              <b className="text-[#B67A2E]">{order.booking_number}</b>
            </p>

            <p>
              <span className="text-gray-500">اسم المستأجر:</span>{" "}
              {order.full_name}
            </p>

            <p>
              <span className="text-gray-500">الهاتف:</span> {order.phone}
            </p>

            <hr />

            <p className="font-bold">معلومات السيارة</p>

            <p>
              الاسم:
              <span className="mr-2">{order.car?.name}</span>
            </p>

            <p>
              اللون:
              <span className="mr-2">{order.car?.color}</span>
            </p>

            <p>
              الموديل:
              <span className="mr-2">{order.car?.model_year}</span>
            </p>
            <p>
              رقم اللوحة:
              <span className="mr-2">{order.car?.plate_number}</span>
            </p>

            <p>
              السعر اليومي:
              <span className="mr-2 text-[#B67A2E] font-bold">
                {order.car?.price} $
              </span>
            </p>

            <hr />

            <p>
              التكلفة النهائية:
              <span
                className="
                mr-2
                text-[#B67A2E]
                font-bold
                "
              >
                {order.final_price} $
              </span>
            </p>

            <p>
              تاريخ الاستلام:
              <span className="mr-2">{order.pickup_date}</span>
            </p>

            <p>
              وقت الاستلام:
              <span className="mr-2">{formatTime(order.pickup_time)}</span>
            </p>

            <p>
              تاريخ التسليم:
              <span className="mr-2">{order.return_date}</span>
            </p>

            <p>
              وقت التسليم:
              <span className="mr-2">{formatTime(order.return_time)}</span>
            </p>

            <hr />

            <p>
              التوصيل:
              <span className="mr-2">
                {order.delivery ? order.delivery_location : "استلام من المكتب"}
              </span>
            </p>
          </div>

          {/* الصور */}

          <div
            className="
            mt-6
            flex
            gap-4
            justify-center
            flex-wrap
            "
          >
            {[
              {
                title: "الهوية الأمامية",
                image: order.id_front,
              },
              {
                title: "الهوية الخلفية",
                image: order.id_back,
              },

              {
                title: "إشعار الدفع",
                image: order.payment_image,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <p className="mb-2 text-sm">{item.title}</p>

                <img
                  src={item.image}
                  onClick={() => setPreview(item.image)}
                  className="
                  w-28
                  h-28
                  object-cover
                  rounded-xl
                  cursor-pointer
                  border
                  border-[#B67A2E]/30
                  hover:scale-105
                  transition
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* تكبير الصورة */}

      {preview && (
        <div
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
          onClick={() => setPreview(null)}
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

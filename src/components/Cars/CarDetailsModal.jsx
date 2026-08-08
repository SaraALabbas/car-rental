export default function CarDetailsModal({ car, close }) {
  if (!car) return null;

  return (
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
            تفاصيل السيارة
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
            <span className="text-gray-500">اسم السيارة:</span>{" "}
            <b>{car.name}</b>
          </p>

          <p>
            <span className="text-gray-500">رقم اللوحة:</span>{" "}
            {car.plate_number}
          </p>

          <p>
            <span className="text-gray-500">اللون:</span> {car.color}
          </p>

          <p>
            <span className="text-gray-500">الموديل:</span> {car.model_year}
          </p>

          <hr />

          <p>
            <span className="text-gray-500">السعر اليومي:</span>{" "}
            <b className="text-[#B67A2E]">{car.price} $</b>
          </p>

          <p>
            <span className="text-gray-500">الكيلومترات اليومية:</span>{" "}
            {car.daily_km}
          </p>

          <p>
            <span className="text-gray-500">عدد المقاعد:</span>{" "}
            {car.seats || "غير محدد"}
          </p>

          <p>
            <span className="text-gray-500">ناقل الحركة:</span>{" "}
            {car.transmission || "غير محدد"}
          </p>

          <p>
            <span className="text-gray-500">نوع الوقود:</span>{" "}
            {car.fuel_type || "غير محدد"}
          </p>

          <p>
            <span className="text-gray-500">التأمين:</span>{" "}
            {car.insurance ? `${car.insurance} $ ` : "غير محدد"}
          </p>

          <hr />

          <p>
            <span className="text-gray-500">حالة الصيانة:</span>{" "}
            {car.is_maintenance ? "تحت الصيانة" : "متاحة"}
          </p>

          <p>
            <span className="text-gray-500">حالة الحجز:</span>{" "}
            {car.available ? "متاحة" : "محجوزة"}
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
          {[car.image1, car.image2, car.image3]
            .filter(Boolean)
            .map((img, index) => (
              <img
                key={index}
                src={img}
                className="
              w-32
              h-24
              object-cover
              rounded-xl
              border
              border-[#B67A2E]/30
              "
              />
            ))}
        </div>
      </div>
    </div>
  );
}

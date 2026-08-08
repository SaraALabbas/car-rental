export default function CarsCard({ cars, handleEdit, deleteCar, openDetails }) {
  return (
    <div className="lg:hidden space-y-4">
      {cars.map((car) => (
        <div
          key={car.id}
          className="
          bg-white
          rounded-2xl
          shadow-md
          border
          border-[#B67A2E]/20
          p-5
          "
          dir="rtl"
        >
          {/* معلومات مختصرة */}
          <div className="space-y-2 text-right">
            <p>
              <span className="text-gray-500">السيارة:</span> <b>{car.name}</b>
            </p>

            <p>
              <span className="text-gray-500">اللوحة:</span> {car.plate_number}
            </p>

            <p>
              <span className="text-gray-500">السعر اليومي:</span>{" "}
              <b className="text-[#B67A2E]">{car.price} $</b>
            </p>

            <p>
              <span className="text-gray-500">حالة الصيانة:</span>{" "}
              {car.is_maintenance ? (
                <span className="text-red-600 font-bold">تحت الصيانة</span>
              ) : (
                <span className="text-green-600 font-bold">متاحة</span>
              )}
            </p>
            <p>
              <span className="text-gray-500">حالة الحجز:</span>{" "}
              {car.available ? (
                <span className="text-green-600 font-bold">متاحة</span>
              ) : (
                <span className="text-red-600 font-bold">محجوزة</span>
              )}
            </p>
          </div>

          {/* صورة */}
          {car.image1 && (
            <img
              src={car.image1}
              className="
              w-full
              h-48
              object-cover
              rounded-xl
              mt-4
              "
            />
          )}

          {/* الأزرار */}

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => openDetails(car)}
              className="
              flex-1
              bg-[#B67A2E]
              text-white
              py-2
              rounded-xl
              "
            >
              عرض
            </button>

            <button
              onClick={() => handleEdit(car)}
              className="
              flex-1
              bg-blue-500
              text-white
              py-2
              rounded-xl
              "
            >
              تعديل
            </button>

            <button
              onClick={() => deleteCar(car.id)}
              className="
              flex-1
              bg-red-500
              text-white
              py-2
              rounded-xl
              "
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CarsTable({
  cars,
  handleEdit,
  deleteCar,
  openDetails,
}) {
  return (
    <div
      className="
      hidden
      lg:block
      bg-white
      rounded-2xl
      shadow-md
      border
      border-[#B67A2E]/20
      overflow-hidden
    "
    >
      <table className="w-full text-right">
        <thead className="bg-[#B67A2E] text-white">
          <tr>
            <th className="p-4">السيارة</th>
            <th className="p-4">اللوحة</th>
            <th className="p-4">السعر اليومي</th>
            <th className="p-4">حالة الصيانة</th>
            <th className="p-4">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {cars.map((car) => (
            <tr
              key={car.id}
              className="
            border-b
            hover:bg-[#F8F5F1]
            transition
            "
            >
              <td className="p-4">
                <p className="font-bold">{car.name}</p>

                <p className="text-gray-500 text-sm">
                  {car.color} - {car.model_year}
                </p>
              </td>

              <td className="p-4">{car.plate_number}</td>

              <td
                className="
            p-4
            text-[#B67A2E]
            font-bold
            "
              >
                {car.price} $
              </td>

              <td className="p-4">
                {car.is_maintenance ? (
                  <span className="text-red-600 font-bold">تحت الصيانة</span>
                ) : (
                  <span className="text-green-600 font-bold">متاحة</span>
                )}
              </td>

              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => openDetails(car)}
                    className="
      bg-[#B67A2E]
      text-white
      px-3
      py-2
      rounded-lg
      "
                  >
                    عرض
                  </button>

                  <button
                    onClick={() => handleEdit(car)}
                    className="
      bg-blue-500
      text-white
      px-3
      py-2
      rounded-lg
      "
                  >
                    تعديل
                  </button>

                  <button
                    onClick={() => deleteCar(car.id)}
                    className="
      bg-red-500
      text-white
      px-3
      py-2
      rounded-lg
      "
                  >
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

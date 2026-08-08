export default function InstructionsTable({
  instructions,
  editInstruction,
  deleteInstruction,
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
            <th className="p-4">العنوان</th>

            <th className="p-4">المحتوى</th>

            <th className="p-4">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {instructions.map((item) => (
            <tr
              key={item.id}
              className="
border-b
hover:bg-[#F8F5F1]
"
            >
              <td className="p-4 font-bold">{item.title}</td>

              <td className="p-4 text-gray-600 max-w-md truncate">
                {item.content}
              </td>

              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => openDetails(item)}
                    className="
bg-[#B67A2E]
text-white
px-4
py-2
rounded-lg
"
                  >
                    عرض
                  </button>

                  <button
                    onClick={() => editInstruction(item)}
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
                    onClick={() => deleteInstruction(item.id)}
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

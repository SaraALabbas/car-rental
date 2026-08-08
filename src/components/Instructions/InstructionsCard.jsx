export default function InstructionsCard({
  instructions,
  editInstruction,
  deleteInstruction,
  openDetails,
}) {
  return (
    <div className="lg:hidden space-y-4">
      {instructions.map((item) => (
        <div
          key={item.id}
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
          <h2
            className="
font-bold
text-xl
text-[#B67A2E]
mb-3
"
          >
            {item.title}
          </h2>

          <p
            className="
text-gray-600
line-clamp-3
"
          >
            {item.content}
          </p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => openDetails(item)}
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
              onClick={() => editInstruction(item)}
              className="
bg-blue-500
text-white
px-4
rounded-xl
"
            >
              تعديل
            </button>

            <button
              onClick={() => deleteInstruction(item.id)}
              className="
bg-red-500
text-white
px-4
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

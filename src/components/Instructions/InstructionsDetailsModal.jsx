export default function InstructionDetailsModal({ item, close }) {
  if (!item) return null;

  return (
    <div
      className="
      fixed inset-0
      bg-black/50
      z-50
      flex items-center justify-center
      p-4
      "
      onClick={close}
    >
      <div
        className="
        bg-white
        rounded-2xl
        shadow-xl
        w-full
        max-w-2xl
        p-6
        "
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-[#B67A2E]">
            تفاصيل التعليمات
          </h2>

          <button onClick={close} className="text-red-500 text-xl">
            ✕
          </button>
        </div>

        <h3 className="font-bold text-xl mb-3">{item.title}</h3>

        <p
          className="
        text-gray-700
        leading-8
        whitespace-pre-line
        "
        >
          {item.content}
        </p>
      </div>
    </div>
  );
}

import { FiMenu } from "react-icons/fi";
import { FaClock } from "react-icons/fa";

export default function Header({ onMenuPress }) {
  return (
    <header className="bg-white border-b border-[#E8D8C2] px-4 py-3 shadow-sm">
      <div className="flex flex-row items-center justify-between">
        {/* زر القائمة - يمين */}
        <button
          onClick={onMenuPress}
          className="text-[#2B2B2B] hover:text-[#B67A2E] transition"
        >
          <FiMenu size={28} />
        </button>

        {/* الوسط */}
        <div className="flex flex-col items-center">
          <h1 className="text-[#2B2B2B] text-xl sm:text-2xl font-bold">
            تأجير السيارات
          </h1>

          <div className="flex items-center gap-2 mt-2 bg-[#B67A2E]/10 border border-[#B67A2E]/25 px-3 py-1 rounded-full">
            <FaClock className="text-[#B67A2E] text-sm" />

            <p className="text-[#B67A2E] text-sm sm:text-base font-medium whitespace-nowrap">
              يومياً 10 صباحاً - 10 مساءً
            </p>
          </div>
        </div>

        {/* فراغ للموازنة */}
        <div className="w-7"></div>
      </div>
    </header>
  );
}

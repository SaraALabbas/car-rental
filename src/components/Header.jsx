import { FiMenu } from "react-icons/fi";
import { FaClock } from "react-icons/fa";

export default function Header({ onMenuPress }) {
  return (
    <header className="bg-[#111] border-b border-[#222] px-4 py-3">
      <div className="flex flex-row items-center justify-between">
        {/* زر القائمة - يمين */}
        <button
          onClick={onMenuPress}
          className="text-white hover:text-yellow-400 transition"
        >
          <FiMenu size={28} />
        </button>

        {/* الوسط */}
        <div className="flex flex-col items-center">
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            تأجير السيارات
          </h1>

          <div className="flex items-center gap-2 mt-2 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full">
            <FaClock className="text-yellow-400 text-sm" />

            <p className="text-yellow-400 text-sm sm:text-base font-medium whitespace-nowrap">
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

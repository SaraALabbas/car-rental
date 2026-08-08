import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import BASE_URL from "../config/api";

export default function BottomTabBar() {
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);

  const { user, isGuest } = useAuth();

  // جلب عدد الطلبات المعلقة للأدمن فقط
  useEffect(() => {
    if (user?.role !== "admin") return;

    const fetchPendingCount = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/pending-bookings-count`);

        const data = await res.json();
        setPendingCount(data.count || 0);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPendingCount();

    const interval = setInterval(fetchPendingCount, 5000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        bg-white
        border-t border-[#E8D8C2]
        shadow-[0_-2px_10px_rgba(0,0,0,0.08)]
        flex flex-row-reverse
        justify-around
        items-center
        py-4
        z-50
      "
    >
      {/* الرئيسية - للجميع */}
      <button
        onClick={() => navigate("/home")}
        className="
          text-[#2B2B2B]
          hover:text-[#B67A2E]
          transition
          text-[17px]
          font-medium
        "
      >
        الرئيسية
      </button>

      {/* ======================
          صفحات المستخدم / الضيف
      ======================= */}

      {isGuest && (
        <>
          <button
            onClick={() => navigate("/myOrders")}
            className="
              text-[#2B2B2B]
              hover:text-[#B67A2E]
              transition
              text-[17px]
              font-medium
            "
          >
            طلباتي
          </button>
          <button
            onClick={() => navigate("/instructions")}
            className="
              text-[#2B2B2B}
              hover:text-[#B67A2E]
              transition
              text-[17px]
              font-medium
            "
          >
            التعليمات
          </button>
        </>
      )}

      {/* ======================
          صفحات الأدمن فقط
      ======================= */}

      {user?.role === "admin" && (
        <>
          <button
            onClick={() => navigate("/manageCars")}
            className="
              text-[#2B2B2B]
              hover:text-[#B67A2E]
              transition
              text-[17px]
              font-medium
            "
          >
            السيارات
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="
              relative
              text-[#2B2B2B]
              hover:text-[#B67A2E]
              transition
              text-[17px]
              font-medium
            "
          >
            الطلبات
            {pendingCount > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -left-2
                  bg-red-500
                  text-white
                  text-[10px]
                  min-w-[18px]
                  h-[18px]
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => navigate("/contracts")}
            className="
              text-[#2B2B2B]
              hover:text-[#B67A2E]
              transition
              text-[17px]
              font-medium
            "
          >
            العقود
          </button>

          <button
            onClick={() => navigate("/adminInstructions")}
            className="
              text-[#2B2B2B]
              hover:text-[#B67A2E]
              transition
              text-[17px]
              font-medium
            "
          >
            التعليمات
          </button>
        </>
      )}
    </div>
  );
}

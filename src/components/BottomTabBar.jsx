import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function BottomTabBar() {
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
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

    // كل 5 ثواني
    const interval = setInterval(fetchPendingCount, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        bg-[#111]
        border-t border-[#222]
        flex flex-row-reverse
        justify-around
        items-center
        py-4
        z-50
      "
    >
      {/* الرئيسية */}
      <button
        onClick={() => navigate("/home")}
        className="
  relative
  text-white
  text-[17px]
  tracking-wide
  antialiased
  font-medium
  px-4
  py-1
"
      >
        الرئيسية
      </button>

      {/* ADMIN */}
      {user?.role === "admin" && (
        <>
          <button
            onClick={() => navigate("/orders")}
            className="
  relative
  text-white
  text-[17px]
  tracking-wide
  antialiased
  font-medium
  px-4
  py-1
"
          >
            الطلبات
            {pendingCount > 0 && (
              <span
                className="
    absolute
    -top-1
    -left-0.5
    bg-red-500
    text-white
    text-[10px]
    min-w-[18px]
    h-[18px]
    px-1
    rounded-full
    flex
    items-center
    justify-center
    font-semibold
    shadow
  "
              >
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/contracts")}
            className="
  relative
  text-white
  text-[17px]
  tracking-wide
  antialiased
  font-medium
  px-4
  py-1
"
          >
            العقود
          </button>
        </>
      )}

      {/* USER */}
      {user?.role === "user" && (
        <>
          <button
            onClick={() => navigate("/myOrders")}
            className="
  relative
  text-white
  text-[17px]
  tracking-wide
  antialiased
  font-medium
  px-4
  py-1
"
          >
            طلباتي
          </button>

          <button
            onClick={() => navigate("/instructions")}
            className="
  relative
  text-white
  text-[17px]
  tracking-wide
  antialiased
  font-medium
  px-4
  py-1
"
          >
            التعليمات
          </button>
        </>
      )}
    </div>
  );
}

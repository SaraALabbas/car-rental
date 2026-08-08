import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import OrdersTable from "../components/Orders/OrdersTable";
import OrderCard from "../components/Orders/OrderCard";
import OrderDetailsModal from "../components/Orders/OrderDetailsModal";

import BASE_URL from "../config/api";

// const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function Orders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState("");
  // const [preview, setPreview] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/bookings?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (page === 1) {
        setOrders(data.data);
      } else {
        setOrders((prev) => [...prev, ...data.data]);
      }

      if (data.current_page >= data.last_page) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateStatus = async (id, status, rejection_reason = "") => {
    let url;

    if (status === "accepted") {
      url = `${BASE_URL}/api/bookings/${id}/approve`;
    } else {
      url = `${BASE_URL}/api/bookings/${id}/reject`;
    }

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        reason: rejection_reason,
      }),
    });

    const data = await res.json();

    // تحديث الواجهة
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status, rejection_reason } : o)),
    );

    setRejectId(null);
    setReason("");
  };

  const formatTime = (time) => {
    if (!time) return "";

    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);

    const period = hours >= 12 ? "مساءً" : "صباحاً";

    const formattedHour = hours % 12 || 12;

    return `${formattedHour}:${minutes} ${period}`;
  };

  return (
    <div
      dir="rtl"
      className="
    min-h-screen
    bg-[#F8F5F1]
    p-4
    "
    >
      {/* العنوان */}
      <div className="mb-6">
        <h1
          className="
        text-3xl
        font-bold
        text-center
        text-[#B67A2E]
        "
        >
          طلبات الحجز
        </h1>
      </div>

      {orders.length === 0 && !loading ? (
        <p className="text-center text-gray-500 mt-10">لا يوجد طلبات حجز</p>
      ) : (
        <>
          {/* جدول للتابلت واللابتوب */}
          <OrdersTable
            orders={orders}
            formatTime={formatTime}
            openDetails={setSelectedOrder}
            updateStatus={updateStatus}
            setRejectId={setRejectId}
          />

          {/* بطاقات للموبايل */}
          <OrderCard
            orders={orders}
            formatTime={formatTime}
            openDetails={setSelectedOrder}
            updateStatus={updateStatus}
            setRejectId={setRejectId}
          />
        </>
      )}

      {/* سبب الرفض */}

      {rejectId && (
        <div
          className="
        fixed
        inset-0
        bg-black/40
        z-40
        flex
        items-center
        justify-center
        p-4
        "
        >
          <div
            className="
          bg-white
          rounded-2xl
          p-5
          w-full
          max-w-md
          "
            dir="rtl"
          >
            <h3
              className="
            text-xl
            font-bold
            text-[#B67A2E]
            mb-4
            "
            >
              سبب الرفض
            </h3>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="اكتب سبب الرفض..."
              className="
            w-full
            border
            border-[#D7B98E]
            rounded-xl
            p-3
            text-right
            h-32
            outline-none
            focus:ring-2
            focus:ring-[#B67A2E]
            "
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  updateStatus(rejectId, "rejected", reason);
                }}
                className="
              flex-1
              bg-red-600
              text-white
              py-3
              rounded-xl
              font-bold
              "
              >
                تأكيد الرفض
              </button>

              <button
                onClick={() => {
                  setRejectId(null);
                  setReason("");
                }}
                className="
              flex-1
              bg-gray-200
              py-3
              rounded-xl
              font-bold
              "
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* تفاصيل الطلب */}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          close={() => setSelectedOrder(null)}
          formatTime={formatTime}
        />
      )}
    </div>
  );
}

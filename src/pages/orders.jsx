// import { useEffect, useState } from "react";
// import { useAuth } from "../context/useAuth";
// import OrdersTable from "../components/Orders/OrdersTable";
// import OrderCard from "../components/Orders/OrderCard";
// import OrderDetailsModal from "../components/Orders/OrderDetailsModal";

// import BASE_URL from "../config/api";

// // const BASE_URL = "https://car-rental-api-xwof.onrender.com";

// export default function Orders() {
//   const { token } = useAuth();

//   const [orders, setOrders] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [rejectId, setRejectId] = useState(null);
//   const [reason, setReason] = useState("");
//   // const [preview, setPreview] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const [deleteId, setDeleteId] = useState(null);
// const [deleteLoading, setDeleteLoading] = useState(false);
// const [message, setMessage] = useState("");

//   const fetchOrders = async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);

//     try {
//       const res = await fetch(`${BASE_URL}/api/bookings?page=${page}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       });

//       const data = await res.json();

//       if (page === 1) {
//         setOrders(data.data);
//       } else {
//         setOrders((prev) => [...prev, ...data.data]);
//       }

//       if (data.current_page >= data.last_page) {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [page]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop + 100 >=
//         document.documentElement.scrollHeight
//       ) {
//         setPage((prev) => prev + 1);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const updateStatus = async (id, status, rejection_reason = "") => {
//     let url;

//     if (status === "accepted") {
//       url = `${BASE_URL}/api/bookings/${id}/approve`;
//     } else {
//       url = `${BASE_URL}/api/bookings/${id}/reject`;
//     }

//     const res = await fetch(url, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         reason: rejection_reason,
//       }),
//     });

//     const data = await res.json();

//     // تحديث الواجهة
//     setOrders((prev) =>
//       prev.map((o) => (o.id === id ? { ...o, status, rejection_reason } : o)),
//     );

//     setRejectId(null);
//     setReason("");
//   };
//   const deleteOrder = async () => {
//   if (!deleteId) return;

//   setDeleteLoading(true);

//   try {
//     const res = await fetch(`${BASE_URL}/api/bookings/${deleteId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       },
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setMessage(data.message || "فشل حذف طلب الحجز");
//       setDeleteLoading(false);
//       return;
//     }

//     // حذف الطلب من الواجهة مباشرة
//     setOrders((prev) =>
//       prev.filter((order) => order.id !== deleteId)
//     );

//     // إغلاق تفاصيل الطلب إذا كان مفتوح
//     if (selectedOrder?.id === deleteId) {
//       setSelectedOrder(null);
//     }

//     setDeleteId(null);
//     setMessage("تم حذف طلب الحجز بنجاح");

//   } catch (error) {
//     console.error(error);
//     setMessage("حدث خطأ أثناء حذف طلب الحجز");
//   }

//   setDeleteLoading(false);
// };

//   const formatTime = (time) => {
//     if (!time) return "";

//     let [hours, minutes] = time.split(":");

//     hours = parseInt(hours);

//     const period = hours >= 12 ? "مساءً" : "صباحاً";

//     const formattedHour = hours % 12 || 12;

//     return `${formattedHour}:${minutes} ${period}`;
//   };

//   return (
//     <div
//       dir="rtl"
//       className="
//     min-h-screen
//     bg-[#F8F5F1]
//     p-4
//     "
//     >
//       {/* العنوان */}
//       <div className="mb-6">
//         <h1
//           className="
//         text-3xl
//         font-bold
//         text-center
//         text-[#B67A2E]
//         "
//         >
//           طلبات الحجز
//         </h1>
//       </div>

//       {orders.length === 0 && !loading ? (
//         <p className="text-center text-gray-500 mt-10">لا يوجد طلبات حجز</p>
//       ) : (
//         <>
//           {/* جدول للتابلت واللابتوب */}
//           <OrdersTable
//             orders={orders}
//             formatTime={formatTime}
//             openDetails={setSelectedOrder}
//             updateStatus={updateStatus}
//             setRejectId={setRejectId}
//             deleteOrder={deleteOrder}
//           />

//           {/* بطاقات للموبايل */}
//           <OrderCard
//             orders={orders}
//             formatTime={formatTime}
//             openDetails={setSelectedOrder}
//             updateStatus={updateStatus}
//             setRejectId={setRejectId}
//             deleteOrder={deleteOrder}
//           />
//         </>
//       )}

//       {/* سبب الرفض */}

//       {rejectId && (
//         <div
//           className="
//         fixed
//         inset-0
//         bg-black/40
//         z-40
//         flex
//         items-center
//         justify-center
//         p-4
//         "
//         >
//           <div
//             className="
//           bg-white
//           rounded-2xl
//           p-5
//           w-full
//           max-w-md
//           "
//             dir="rtl"
//           >
//             <h3
//               className="
//             text-xl
//             font-bold
//             text-[#B67A2E]
//             mb-4
//             "
//             >
//               سبب الرفض
//             </h3>

//             <textarea
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               placeholder="اكتب سبب الرفض..."
//               className="
//             w-full
//             border
//             border-[#D7B98E]
//             rounded-xl
//             p-3
//             text-right
//             h-32
//             outline-none
//             focus:ring-2
//             focus:ring-[#B67A2E]
//             "
//             />

//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={() => {
//                   updateStatus(rejectId, "rejected", reason);
//                 }}
//                 className="
//               flex-1
//               bg-red-600
//               text-white
//               py-3
//               rounded-xl
//               font-bold
//               "
//               >
//                 تأكيد الرفض
//               </button>

//               <button
//                 onClick={() => {
//                   setRejectId(null);
//                   setReason("");
//                 }}
//                 className="
//               flex-1
//               bg-gray-200
//               py-3
//               rounded-xl
//               font-bold
//               "
//               >
//                 إلغاء
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* تفاصيل الطلب */}

//       {selectedOrder && (
//         <OrderDetailsModal
//           order={selectedOrder}
//           close={() => setSelectedOrder(null)}
//           formatTime={formatTime}
//         />
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import OrdersTable from "../components/Orders/OrdersTable";
import OrderCard from "../components/Orders/OrderCard";
import OrderDetailsModal from "../components/Orders/OrderDetailsModal";
import BASE_URL from "../config/api";

export default function Orders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // رفض الطلب
  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState("");

  // تفاصيل الطلب
  const [selectedOrder, setSelectedOrder] = useState(null);

  // حذف الطلب
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // رسائل النجاح والخطأ
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // =========================================================
  // جلب الطلبات
  // =========================================================

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

      if (!res.ok) {
        console.error(data);
        return;
      }

      if (page === 1) {
        setOrders(data.data || []);
      } else {
        setOrders((prev) => [...prev, ...(data.data || [])]);
      }

      if (data.current_page >= data.last_page) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [page, token]);

  // =========================================================
  // تحميل المزيد عند الوصول لنهاية الصفحة
  // =========================================================

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight
      ) {
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  // =========================================================
  // قبول / رفض الطلب
  // =========================================================

  const updateStatus = async (id, status, rejection_reason = "") => {
    let url;

    if (status === "accepted") {
      url = `${BASE_URL}/api/bookings/${id}/approve`;
    } else {
      url = `${BASE_URL}/api/bookings/${id}/reject`;
    }

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason: rejection_reason,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "حدث خطأ أثناء تحديث الطلب");
        setMessageType("error");

        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 3000);

        return;
      }

      // تحديث الطلب في الواجهة
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? {
                ...order,
                status,
                rejection_reason,
              }
            : order,
        ),
      );

      // إغلاق نافذة الرفض
      setRejectId(null);
      setReason("");
      // رسالة نجاح
      if (status === "accepted") {
        setMessage("تم قبول طلب الحجز بنجاح");
      } else {
        setMessage("تم رفض طلب الحجز بنجاح");
      }

      setMessageType("success");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      console.error("Update status error:", error);

      setMessage("حدث خطأ أثناء الاتصال بالخادم");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  // =========================================================
  // حذف الطلب
  // =========================================================

  const deleteOrder = async () => {
    if (!deleteId) return;

    setDeleteLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/bookings/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "فشل حذف طلب الحجز");

        setMessageType("error");

        setDeleteId(null);
        setDeleteLoading(false);

        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 3000);

        return;
      }

      // حذف الطلب من الواجهة
      setOrders((prev) => prev.filter((order) => order.id !== deleteId));

      // إذا كانت تفاصيل الطلب مفتوحة
      if (selectedOrder?.id === deleteId) {
        setSelectedOrder(null);
      }

      // إغلاق Popup التأكيد
      setDeleteId(null);

      // رسالة نجاح
      setMessage(data.message || "تم حذف طلب الحجز وجميع ملفاته بنجاح");

      setMessageType("success");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch (error) {
      console.error("Delete order error:", error);

      setMessage("حدث خطأ أثناء حذف طلب الحجز");
      setMessageType("error");

      setDeleteId(null);

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } finally {
      setDeleteLoading(false);
    }
  };

  // =========================================================
  // تنسيق الوقت
  // =========================================================

  const formatTime = (time) => {
    if (!time) return "";

    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);

    const period = hours >= 12 ? "مساءً" : "صباحاً";

    const formattedHour = hours % 12 || 12;

    return `${formattedHour}:${minutes} ${period}`;
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F5F1] p-4">
      {/* =====================================================
          رسالة النجاح / الخطأ
      ====================================================== */}

      {message && (
        <div
          className={`
            fixed
            top-5
            left-1/2
            -translate-x-1/2
            z-[200]
            w-[90%]
            max-w-md
            px-5
            py-4
            rounded-2xl
            shadow-2xl
            text-white
            text-center
            font-bold
            transition-all
            ${messageType === "success" ? "bg-green-600" : "bg-red-600"}
          `}
        >
          {message}
        </div>
      )}

      {/* =====================================================
          العنوان
      ====================================================== */}

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
      {/* =====================================================
          الطلبات
      ====================================================== */}

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
            setDeleteId={setDeleteId}
          />

          {/* بطاقات للموبايل */}

          <OrderCard
            orders={orders}
            formatTime={formatTime}
            openDetails={setSelectedOrder}
            updateStatus={updateStatus}
            setRejectId={setRejectId}
            setDeleteId={setDeleteId}
          />
        </>
      )}

      {/* =====================================================
          Loading
      ====================================================== */}

      {loading && (
        <p className="text-center text-gray-500 mt-5">جاري تحميل الطلبات...</p>
      )}

      {/* =====================================================
          Popup تأكيد حذف الطلب
      ====================================================== */}

      {deleteId && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-[150]
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            dir="rtl"
            className="
              bg-white
              w-full
              max-w-md
              rounded-2xl
              p-6
              shadow-2xl
            "
          >
            <h3
              className="
                text-xl
                font-bold
                text-red-600
                mb-4
              "
            >
              تأكيد حذف الطلب
            </h3>

            <p className="text-gray-600 leading-8 mb-6">
              هل أنت متأكد من حذف طلب الحجز؟
              <br />
              سيتم حذف الطلب وجميع الصور والملفات المرتبطة به بشكل نهائي.
              <br />
              <span className="font-bold text-red-600">
                لا يمكن التراجع عن هذه العملية.
              </span>
            </p>

            <div className="flex gap-3">
              {/* حذف */}

              <button
                onClick={deleteOrder}
                disabled={deleteLoading}
                className="
                  flex-1
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  py-3
                  rounded-xl
                  font-bold
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {deleteLoading ? "جاري الحذف..." : "نعم، حذف الطلب"}
              </button>

              {/* إلغاء */}

              <button
                onClick={() => setDeleteId(null)}
                disabled={deleteLoading}
                className="
                  flex-1
                  bg-gray-200
                  hover:bg-gray-300
                  text-gray-800
                  py-3
                  rounded-xl
                  font-bold
                  transition
                  disabled:opacity-50
                "
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          Popup سبب الرفض
      ====================================================== */}
      {rejectId && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            z-[100]
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
              {/* تأكيد الرفض */}

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
                  hover:bg-red-700
                  transition
                "
              >
                تأكيد الرفض
              </button>

              {/* إلغاء */}

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
                  hover:bg-gray-300
                  transition
                "
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          تفاصيل الطلب
      ====================================================== */}

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

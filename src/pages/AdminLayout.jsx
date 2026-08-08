import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import BASE_URL from "../config/api";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaClipboardList,
  FaCar,
  FaFileContract,
  FaBook,
} from "react-icons/fa";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useAuth();

  const [lastId, setLastId] = useState(null);

  const [, setNewOrdersCount] = useState(0);

  const [toast, setToast] = useState(false);

  const [open, setOpen] = useState(false);

  const fetchLatestOrder = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/bookings?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (data.data.length && !lastId) {
        setLastId(data.data[0].id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (token) {
      fetchLatestOrder();
    }
  }, [token]);

  const checkNewOrders = async () => {
    if (!lastId) return;

    try {
      const res = await fetch(`${BASE_URL}/api/bookings?last_id=${lastId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (data.length > 0) {
        setLastId(data[0].id);

        setNewOrdersCount((prev) => prev + data.length);

        setToast(true);

        setTimeout(() => {
          setToast(false);
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!lastId) return;

    const interval = setInterval(() => {
      checkNewOrders();
    }, 30000);

    return () => clearInterval(interval);
  }, [lastId]);

  const menu = [
    {
      title: "الطلبات",
      icon: <FaClipboardList />,
      path: "/admin/orders",
    },
    {
      title: "السيارات",
      icon: <FaCar />,
      path: "/admin/cars",
    },
    {
      title: "العقود",
      icon: <FaFileContract />,
      path: "/admin/contracts",
    },
    {
      title: "التعليمات",
      icon: <FaBook />,
      path: "/admin/instructions",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5F1] flex">
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#B67A2E] text-white px-6 py-4 rounded-xl shadow-xl">
          🔔 تم استلام طلب حجز جديد
        </div>
      )}
      {/* الخلفية السوداء للموبايل */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static
        right-0 top-0
        h-screen
        w-72
        bg-white
        shadow-xl
        z-50
        transform
        transition-transform
        duration-300

        ${open ? "translate-x-0" : "translate-x-full"}
        lg:translate-x-0
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <button className="lg:hidden" onClick={() => setOpen(false)}>
                <FaTimes size={22} />
              </button>

              <h2 className="text-2xl font-bold text-[#B67A2E]">لوحة التحكم</h2>
            </div>
          </div>

          {/* القائمة */}

          <div className="flex-1 p-4">
            {menu.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                className={`

                w-full
                flex
                items-center
                justify-end
                gap-3

                p-4
                rounded-xl
                mb-3

                transition

                ${
                  location.pathname === item.path
                    ? "bg-[#B67A2E] text-white"
                    : "hover:bg-[#F5EEE4] text-gray-700"
                }

                `}
              >
                <span>{item.title}</span>

                {item.icon}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* المحتوى */}

      <div className="flex-1">
        {/* Header */}

        <header className="bg-white shadow-sm h-16 flex items-center justify-end px-5">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <FaBars size={22} />
          </button>
        </header>

        {/* المحتوى */}

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

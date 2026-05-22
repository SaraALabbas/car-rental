/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomTabBar from "../components/BottomTabBar";
import { FaHome, FaCar, FaClipboardList, FaInfoCircle } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { useAuth } from "../context/useAuth";

const BASE_URL = "http://127.0.0.1:8000";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(null);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/api/cars`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div dir="rtl" className="bg-[#0f0f0f] min-h-screen text-white pb-[80px]">
      {/* HEADER */}
      <Header onMenuPress={() => setMenuOpen(true)} />

      {/* MENU + OVERLAY */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 z-[99]"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu */}
          <div className="fixed top-0 right-0 w-[260px] h-full bg-[#1a1a1a] p-5 z-[100] flex flex-col items-end">
            {/* أيقونة فوق */}
            <div className="w-full flex justify-center  mb-8">
              <IoCarSportOutline size={60} color="#FFD700" />
            </div>

            {/* الرئيسية */}
            <button
              className="flex items-center justify-end gap-3 w-full py-3 text-white hover:text-yellow-400 transition"
              onClick={() => navigate("/home")}
            >
              <FaHome className="text-yellow-400 text-lg" />
              <span className="flex-1 text-right">الرئيسية</span>
            </button>

            {/* ADMIN */}
            {role === "admin" && (
              <>
                <button
                  className="flex items-center justify-end gap-3 w-full py-3 text-white hover:text-yellow-400 transition"
                  onClick={() => navigate("/orders")}
                >
                  <FaClipboardList className="text-yellow-400 text-lg" />
                  <span className="flex-1 text-right">الطلبات</span>
                </button>

                <button
                  className="flex items-center justify-end gap-3 w-full py-3 text-white hover:text-yellow-400 transition"
                  onClick={() => navigate("/contracts")}
                >
                  <FaClipboardList className="text-yellow-400 text-lg" />
                  <span className="flex-1 text-right">العقود</span>
                </button>

                <button
                  className="flex items-center justify-end gap-3 w-full py-3 text-white hover:text-yellow-400 transition"
                  onClick={() => navigate("/manageCars")}
                >
                  <FaCar className="text-yellow-400 text-lg" />
                  <span className="flex-1 text-right">إدارة السيارات</span>
                </button>

                <button
                  className="flex items-center justify-end gap-3 w-full py-3 text-white hover:text-yellow-400 transition"
                  onClick={() => navigate("/adminInstructions")}
                >
                  <FaInfoCircle className="text-yellow-400 text-lg" />
                  <span className="flex-1 text-right">إدارة التعليمات</span>
                </button>
              </>
            )}

            {/* USER */}
            {role === "user" && (
              <>
                <button
                  className="flex items-center justify-end gap-3 w-full py-3 text-white hover:text-yellow-400 transition"
                  onClick={() => navigate("/myOrders")}
                >
                  <FaClipboardList className="text-yellow-400 text-lg" />
                  <span className="flex-1 text-right">طلباتي</span>
                </button>
                <button
                  className="flex items-center justify-end gap-3 w-full py-3 text-white hover:text-yellow-400 transition"
                  onClick={() => navigate("/my-contracts")}
                >
                  <FaClipboardList className="text-yellow-400 text-lg" />
                  <span className="flex-1 text-right">عقودي</span>
                </button>

                <button
                  className="flex items-center justify-end gap-3 w-full py-3 text-white hover:text-yellow-400 transition"
                  onClick={() => navigate("/instructions")}
                >
                  <FaInfoCircle className="text-yellow-400 text-lg" />
                  <span className="flex-1 text-right">التعليمات</span>
                </button>
              </>
            )}
          </div>
        </>
      )}

      {/* SEARCH */}
      <div className="p-4">
        <input
          className="w-full p-3 rounded-xl bg-[#1a1a1a] text-white text-right outline-none"
          placeholder="ابحث عن سيارة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CARS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 direction-rtl">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="bg-[#1a1a1a] p-4 rounded-2xl w-full text-right place-self-start lg:place-self-end"
          >
            <img
              src={car.image1}
              alt={car.name}
              className="w-full h-[220px] object-cover rounded-xl"
            />

            <h3 className="text-xl font-bold mt-4">{car.name}</h3>

            <p className="text-gray-300 mt-2">{car.price}$ / يوم</p>

            <button
              onClick={() => navigate(`/car/${car.id}`)}
              className="w-full mt-4 bg-yellow-400 text-black py-2 rounded-xl font-bold hover:bg-yellow-300 transition"
            >
              عرض التفاصيل
            </button>
          </div>
        ))}
      </div>

      {/* TAB BAR */}
      <BottomTabBar />
    </div>
  );
}

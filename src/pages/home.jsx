/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomTabBar from "../components/BottomTabBar";
import { FaHome, FaCar, FaClipboardList, FaInfoCircle } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { useAuth } from "../context/useAuth";
import BASE_URL from "../config/api";

// const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function Home() {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const { user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [cars, setCars] = useState([]);
  const [, setPage] = useState(1);
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [message, setMessage] = useState("");

  const [pickupDateError, setPickupDateError] = useState("");
  const [returnDateError, setReturnDateError] = useState("");
  const [pickupTimeError, setPickupTimeError] = useState("");
  const [returnTimeError, setReturnTimeError] = useState("");
  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, []);

  const searchCars = async () => {
    if (!location || !pickupDate || !pickupTime || !returnDate || !returnTime) {
      setMessage("يرجى إدخال جميع معلومات الحجز");
      return;
    }
    const todayDate = new Date(today);
    const selectedPickupDate = new Date(pickupDate);

    if (selectedPickupDate < todayDate) {
      setMessage("لا يمكن اختيار تاريخ سابق لليوم");
      return;
    }
    const pickup = new Date(`${pickupDate}T${pickupTime}`);
    const returned = new Date(`${returnDate}T${returnTime}`);

    const diff = returned - pickup;

    const hours = diff / (1000 * 60 * 60);

    if (hours < 24) {
      setMessage("أقل مدة للحجز هي 24 ساعة");
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/api/available-cars?location=${location}&pickup_date=${pickupDate}&pickup_time=${pickupTime}&return_date=${returnDate}&return_time=${returnTime}`,
      );

      const data = await res.json();

      if (data.length === 0) {
        setCars([]);
        setMessage(
          "لا يوجد سيارات متاحة الآن، يرجى الانتظار حتى انتهاء الحجوزات",
        );
        return;
      }

      setMessage("");
      setCars(data);
    } catch (error) {
      console.log(error);
    }
  };
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      dir="rtl"
      className="bg-[#FAF7F2] min-h-screen text-[#2B2B2B] pb-[80px]"
    >
      {/* HEADER */}
      <Header onMenuPress={() => setMenuOpen(true)} />

      {/* MENU + OVERLAY */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-[99]"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu */}
          <div className="fixed top-0 right-0 w-[260px] h-full bg-white p-5 z-[100] flex flex-col items-end shadow-2xl">
            {/* أيقونة فوق */}
            <div className="w-full flex justify-center  mb-8">
              <IoCarSportOutline size={60} color="#B67A2E" />
            </div>

            {/* الرئيسية */}
            <button
              className="flex items-center justify-end gap-3 w-full py-3 text-[#2B2B2B] hover:text-[#B67A2E] transition"
              onClick={() => navigate("/home")}
            >
              <FaHome className="text-[#B67A2E] text-lg" />
              <span className="flex-1 text-right">الرئيسية</span>
            </button>

            {/* ADMIN */}
            {role === "admin" && (
              <>
                <button
                  className="flex items-center justify-end gap-3 w-full py-3 text-[#2B2B2B] hover:text-[#B67A2E] transition"
                  onClick={() => navigate("/orders")}
                >
                  <FaClipboardList className="text-[#B67A2E] text-lg" />
                  <span className="flex-1 text-right">الطلبات</span>
                </button>

                <button
                  className="flex items-center justify-end gap-3 w-full py-3 text-[#2B2B2B] hover:text-[#B67A2E] transition"
                  onClick={() => navigate("/contracts")}
                >
                  <FaClipboardList className="text-[#B67A2E] text-lg" />
                  <span className="flex-1 text-right">العقود</span>
                </button>

                <button
                  className="flex items-center justify-end gap-3 w-full py-3 text-[#2B2B2B] hover:text-[#B67A2E] transition"
                  onClick={() => navigate("/manageCars")}
                >
                  <FaCar className="text-[#B67A2E] text-lg" />
                  <span className="flex-1 text-right">إدارة السيارات</span>
                </button>

                <button
                  className="flex items-center justify-end gap-3 w-full py-3 text-[#2B2B2B] hover:text-[#B67A2E] transition"
                  onClick={() => navigate("/adminInstructions")}
                >
                  <FaInfoCircle className="text-[#B67A2E] text-lg" />
                  <span className="flex-1 text-right">إدارة التعليمات</span>
                </button>
              </>
            )}

            {/* USER */}

            <>
              <button
                className="flex items-center justify-end gap-3 w-full py-3 text-[#2B2B2B] hover:text-[#B67A2E] transition"
                onClick={() => navigate("/myOrders")}
              >
                <FaClipboardList className="text-[#B67A2E] text-lg" />
                <span className="flex-1 text-right">طلباتي</span>
              </button>

              <button
                className="flex items-center justify-end gap-3 w-full py-3 text-[#2B2B2B] hover:text-[#B67A2E] transition"
                onClick={() => navigate("/contract")}
              >
                <FaClipboardList className="text-[#B67A2E] text-lg" />
                <span className="flex-1 text-right">العقد</span>
              </button>

              <button
                className="flex items-center justify-end gap-3 w-full py-3 text-[#2B2B2B] hover:text-[#B67A2E] transition"
                onClick={() => navigate("/instructions")}
              >
                <FaInfoCircle className="text-[#B67A2E] text-lg" />
                <span className="flex-1 text-right">التعليمات</span>
              </button>

              {/* معلومات عنا */}
              <button
                className="flex items-center justify-end gap-3 w-full py-3 text-[#2BB2B] hover:text-[#B67A2E] transition"
                onClick={() => navigate("/about-us")}
              >
                <FaInfoCircle className="text-[#B67A2E] text-lg" />
                <span className="flex-1 text-right">معلومات عنا</span>
              </button>
            </>
          </div>
        </>
      )}

      {/* SEARCH */}
      <div className="p-4 space-y-3">
        <select
          className="w-full p-4 rounded-2xl bg-white border border-[#D9C2A3] text-[#2B2B2B] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B67A2E]"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="" disabled>
            اختر مكان الاستلام
          </option>

          <option value="المكتب">المكتب</option>
          <option value="مطار دمشق الدولي">مطار دمشق الدولي</option>
          <option value="معبر باب الهوا">معبر باب الهوا</option>
          <option value="مطار حلب الدولي">مطار حلب الدولي</option>
        </select>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* تاريخ الاستلام */}
          <div>
            <label className="block mb-2 text-sm text-[#555] font-medium">
              تاريخ الاستلام
            </label>

            <input
              type="date"
              className="w-full p-4 rounded-2xl bg-white border border-[#D9C2A3] text-[#2B2B2B] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B67A2E]"
              value={pickupDate}
              min={today}
              onChange={(e) => {
                const value = e.target.value;
                setPickupDate(value);

                if (value < today) {
                  setPickupDateError("لا يمكن اختيار تاريخ سابق لليوم");
                  return;
                }

                setPickupDateError("");

                if (value === today && pickupTime) {
                  const now = new Date();
                  const currentTime =
                    now.getHours().toString().padStart(2, "0") +
                    ":" +
                    now.getMinutes().toString().padStart(2, "0");

                  if (pickupTime < currentTime) {
                    setPickupTimeError("وقت الاستلام المختار قد مضى");
                  } else {
                    setPickupTimeError("");
                  }
                }
              }}
            />

            {pickupDateError && (
              <p className="text-red-500 text-sm mt-2">{pickupDateError}</p>
            )}
          </div>

          {/* ساعة الاستلام */}
          <div>
            <label className="block mb-2 text-sm text-[#555] font-medium">
              ساعة الاستلام
            </label>

            <input
              type="time"
              className="w-full p-4 rounded-2xl bg-white border border-[#D9C2A3] text-[#2B2B2B] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B67A2E]"
              value={pickupTime}
              onChange={(e) => {
                const value = e.target.value;
                setPickupTime(value);

                if (value < "10:00" || value > "22:00") {
                  setPickupTimeError(
                    "وقت الاستلام يجب أن يكون بين الساعة 10 صباحاً و10 مساءً",
                  );
                  return;
                }

                if (pickupDate === today) {
                  const now = new Date();

                  const currentTime =
                    now.getHours().toString().padStart(2, "0") +
                    ":" +
                    now.getMinutes().toString().padStart(2, "0");

                  if (value < currentTime) {
                    setPickupTimeError("لا يمكن اختيار وقت سابق للوقت الحالي");
                    return;
                  }
                }

                setPickupTimeError("");
              }}
            />

            {pickupTimeError && (
              <p className="text-red-500 text-sm mt-2">{pickupTimeError}</p>
            )}
          </div>

          {/* تاريخ التسليم */}
          <div>
            <label className="block mb-2 text-sm text-[#555] font-medium">
              تاريخ التسليم
            </label>

            <input
              type="date"
              className="w-full p-4 rounded-2xl bg-white border border-[#D9C2A3] text-[#2B2B2B] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B67A2E]"
              value={returnDate}
              min={pickupDate || today}
              onChange={(e) => {
                const value = e.target.value;
                setReturnDate(value);

                if (value < today) {
                  setReturnDateError("لا يمكن اختيار تاريخ سابق لليوم");
                } else if (pickupDate && value < pickupDate) {
                  setReturnDateError(
                    "تاريخ التسليم يجب أن يكون بعد تاريخ الاستلام",
                  );
                } else {
                  setReturnDateError("");
                }
              }}
            />

            {returnDateError && (
              <p className="text-red-500 text-sm mt-2">{returnDateError}</p>
            )}
          </div>

          {/* ساعة التسليم */}
          <div>
            <label className="block mb-2 text-sm text-[#555] font-medium">
              ساعة التسليم
            </label>

            <input
              type="time"
              className="w-full p-4 rounded-2xl bg-white border border-[#D9C2A3] text-[#2B2B2B] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B67A2E]"
              value={returnTime}
              onChange={(e) => {
                const value = e.target.value;
                setReturnTime(value);

                if (value < "10:00" || value > "22:00") {
                  setReturnTimeError(
                    "وقت التسليم يجب أن يكون بين الساعة 10 صباحاً و10 مساءً",
                  );
                  return;
                }

                if (
                  returnDate === pickupDate &&
                  pickupTime &&
                  value <= pickupTime
                ) {
                  setReturnTimeError(
                    "وقت التسليم يجب أن يكون بعد وقت الاستلام",
                  );
                  return;
                }

                setReturnTimeError("");
              }}
            />

            {returnTimeError && (
              <p className="text-red-500 text-sm mt-2">{returnTimeError}</p>
            )}
          </div>
        </div>
        <button
          onClick={searchCars}
          className="w-full bg-[#B67A2E] text-white text-lg shadow-lg hover:bg-[#9d6826] transition p-3 rounded-xl font-bold"
        >
          بحث
        </button>
        {message && (
          <div className="text-[#B67A2E] text-center font-medium">
            {message}
          </div>
        )}
      </div>

      {/* CARS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 direction-rtl">
        {cars.map((car) => (
          <div
            key={car.id}
            className="w-full p-4 rounded-2xl bg-white border border-[#D9C2A3] text-[#2B2B2B] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B67A2E]"
          >
            <img
              loading="lazy"
              src={car.image1}
              alt={car.name}
              className="w-full h-[220px] object-cover rounded-xl"
            />

            <h3 className="text-xl font-bold mt-4">{car.name}</h3>

            <p className="text-[#777] mt-2">{car.price}$ / يوم</p>

            <button
              className="w-full mt-4 py-3 rounded-2xl bg-[#B67A2E] text-white font-bold text-lg shadow-lg hover:bg-[#9d6826] transition"
              onClick={() =>
                navigate(`/cars/${car.id}`, {
                  state: {
                    bookingInfo: {
                      location,
                      pickup_date: pickupDate,
                      pickup_time: pickupTime,
                      return_date: returnDate,
                      return_time: returnTime,
                    },
                  },
                })
              }
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

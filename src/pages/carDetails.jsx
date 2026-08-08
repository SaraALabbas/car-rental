import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

import {
  FaArrowRight,
  FaCar,
  FaMoneyBillWave,
  FaPalette,
  FaIdCard,
  FaRoad,
  FaCalendarAlt,
  FaUsers,
  FaCogs,
  FaGasPump,
  FaShieldAlt,
} from "react-icons/fa";

import BASE_URL from "../config/api";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const location = useLocation();

  const bookingInfo = location.state?.bookingInfo;

  useEffect(() => {
    fetch(`${BASE_URL}/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        جاري التحميل...
      </div>
    );
  }

  const images = [car.image1, car.image2, car.image3];

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* HEADER */}

      <div className="flex items-center gap-3 p-4">
        <button onClick={() => navigate(-1)}>
          <FaArrowRight className="text-[#B67A2E] text-2xl" />
        </button>

        <h2 className="text-[#2B2B2B] text-lg font-bold">تفاصيل السيارة</h2>
      </div>

      {/* IMAGES */}

      <div className="relative w-full">
        <img
          src={images[currentImageIndex]}
          className="w-full h-[250px] sm:h-[320px] object-cover"
        />

        <div className="absolute bottom-3 w-full flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full
              ${index === currentImageIndex ? "bg-[#B67A2E]" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* TITLE */}

      <h2 className="text-2xl font-bold text-[#2B2B2B] px-4 mt-5">
        {car.name}
      </h2>

      {/* INFO CARDS */}

      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="bg-white p-4 rounded-xl border border-[#E8D8C2] shadow-sm">
          <FaCar className="text-[#B67A2E] text-xl mb-2" />

          <p className="text-gray-500 text-sm">السيارة</p>

          <p className="font-bold text-[#2B2B2B]">{car.name}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8D8C2] shadow-sm">
          <FaMoneyBillWave className="text-[#B67A2E] text-xl mb-2" />

          <p className="text-gray-500 text-sm">السعر اليومي</p>

          <p className="font-bold text-[#2B2B2B]">{car.price}$</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8D8C2] shadow-sm">
          <FaPalette className="text-[#B67A2E] text-xl mb-2" />

          <p className="text-gray-500 text-sm">اللون</p>

          <p className="font-bold text-[#2B2B2B]">{car.color}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8D8C2] shadow-sm">
          <FaIdCard className="text-[#B67A2E] text-xl mb-2" />

          <p className="text-gray-500 text-sm">اللوحة</p>

          <p className="font-bold text-[#2B2B2B]">{car.plate_number}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8D8C2] shadow-sm">
          <FaRoad className="text-[#B67A2E] text-xl mb-2" />

          <p className="text-gray-500 text-sm">المسافة اليومية المسموحة</p>

          <p className="font-bold text-[#2B2B2B]">{car.daily_km} كم</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E8D8C2] shadow-sm">
          <FaCalendarAlt className="text-[#B67A2E] text-xl mb-2" />

          <p className="text-gray-500 text-sm">موديل السيارة</p>

          <p className="font-bold text-[#2B2B2B]">{car.model_year}</p>
        </div>

        {/* NEW DETAILS */}

        <div className="bg-white p-4 rounded-xl border border-[#E8D8C2] shadow-sm">
          <FaUsers className="text-[#B67A2E] text-xl mb-2" />

          <p className="text-gray-500 text-sm">عدد المقاعد</p>

          <p className="font-bold text-[#2B2B2B]">{car.seats || "غير محدد"}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8D8C2] shadow-sm">
          <FaCogs className="text-[#B67A2E] text-xl mb-2" />

          <p className="text-gray-500 text-sm">ناقل الحركة</p>

          <p className="font-bold text-[#2B2B2B]">
            {car.transmission || "غير محدد"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8D8C2] shadow-sm">
          <FaGasPump className="text-[#B67A2E] text-xl mb-2" />

          <p className="text-gray-500 text-sm">نوع الوقود</p>

          <p className="font-bold text-[#2B2B2B]">
            {car.fuel_type || "غير محدد"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8D8C2] shadow-sm">
          <FaShieldAlt className="text-[#B67A2E] text-xl mb-2" />

          <p className="text-gray-500 text-sm">قيمة التأمين</p>

          <p className="font-bold text-[#2B2B2B]">
            {car.insurance || "غير محدد"}$
          </p>
        </div>
      </div>

      {/* AIRPORT */}

      <div className="mx-4 mt-4 bg-white border border-[#B67A2E] p-4 rounded-xl">
        <h3 className="text-[#B67A2E] font-bold mb-2">🚗 خدمة توصيل </h3>

        <p className="text-gray-600">نوفر خدمة توصيل السيارة إلى:</p>

        <p className="text-gray-500 mt-2">
          • معبر باب الهوى <br /> • مطار دمشق الدولي
          <br />• مطار حلب الدولي
        </p>

        <p className="text-gray-400 text-sm mt-2">⚠️ يجب التنسيق بعد الحجز</p>
      </div>

      {/* BUTTON */}

      <div className="p-4">
        <button
          onClick={() =>
            navigate(`/booking/${car.id}`, {
              state: {
                price: car.price,
                car_id: car.id,
                bookingInfo,
              },
            })
          }
          className="
          w-full
          bg-[#B67A2E]
          text-white
          font-bold
          py-3
          rounded-xl
          hover:bg-[#9d6826]
          transition
          "
        >
          استأجر الآن
        </button>
      </div>

      <BottomTabBar />
    </div>
  );
}

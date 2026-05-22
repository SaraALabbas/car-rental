import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

import {
  FaArrowRight,
  FaCar,
  FaMoneyBillWave,
  FaPalette,
  FaIdCard,
  FaRoad,
  FaCalendarAlt,
} from "react-icons/fa";

const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        جاري التحميل...
      </div>
    );
  }

  const images = [car.image1, car.image2, car.image3];

  return (
    <div dir="rtl" className="min-h-screen bg-black text-white pb-24">
      {/* BACK */}
      <div className="flex flex-row items-center gap-3 p-4">
        <button onClick={() => navigate(-1)}>
          <FaArrowRight className="text-white text-2xl" />
        </button>

        <h2 className="text-white text-lg font-semibold">تفاصيل السيارة</h2>
      </div>

      {/* IMAGES */}
      <div className="relative w-full">
        <img
          src={images[currentImageIndex]}
          className="w-full h-[250px] sm:h-[320px] md:h-[400px] object-cover"
        />

        {/* DOTS */}
        <div className="absolute bottom-3 w-full flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentImageIndex
                  ? "bg-yellow-400 scale-125"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-right px-4 mt-4">{car.name}</h2>

      {/* INFO CARDS */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-right">
          <FaCar className="text-yellow-400 mb-2" />
          <p className="text-gray-400 text-sm">السيارة</p>
          <p className="font-bold">{car.name}</p>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-right">
          <FaMoneyBillWave className="text-yellow-400 mb-2" />
          <p className="text-gray-400 text-sm">السعر اليومي</p>
          <p className="font-bold">{car.price}$</p>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-right">
          <FaPalette className="text-yellow-400 mb-2" />
          <p className="text-gray-400 text-sm">اللون</p>
          <p className="font-bold">{car.color}</p>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-right">
          <FaIdCard className="text-yellow-400 mb-2" />
          <p className="text-gray-400 text-sm">اللوحة</p>
          <p className="font-bold">{car.plate_number}</p>
        </div>

        {/* KM */}
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-right">
          <FaRoad className="text-yellow-400 mb-2" />
          <p className="text-gray-400 text-sm">المسافة اليومية المسموحة</p>
          <p className="font-bold">{car.daily_km} كم</p>
        </div>

        {/* MOdel */}
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-right">
          <FaCalendarAlt className="text-yellow-400 mb-2" />
          <p className="text-gray-400 text-sm">موديل السيارة</p>
          <p className="font-bold">{car.model_year}</p>
        </div>
      </div>

      {/* AIRPORT */}
      <div className="mx-4 mt-4 bg-gray-900 border border-yellow-400 p-4 rounded-xl text-right">
        <h3 className="text-yellow-400 font-bold mb-2">🚗 خدمة توصيل للمطار</h3>

        <p className="text-gray-300">نوفر خدمة توصيل السيارة إلى:</p>

        <p className="text-gray-400 mt-2">
          • مطار دمشق الدولي • مطار حلب الدولي
        </p>
        <p className="text-gray-500 text-sm mt-2">⚠️ يجب التنسيق بعد الحجز</p>
      </div>

      {/* BUTTON */}
      <div className="p-4">
        <button
          onClick={() =>
            navigate(`/booking/${car.id}`, {
              state: { price: car.price, car_id: car.id },
            })
          }
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl"
        >
          استأجر الآن
        </button>
      </div>
      <BottomTabBar />
    </div>
  );
}

/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import CarsTable from "../components/Cars/CarsTable";
import CarsCard from "../components/Cars/CarsCard";
import CarDetailsModal from "../components/Cars/CarDetailsModal";
import BASE_URL from "../config/api";

// const BASE_URL = "https://car-rental-api-xwof.onrender.com";

export default function ManageCars() {
  const { token } = useAuth();

  const [cars, setCars] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("");
  const [model_year, setModelYear] = useState("");

  const [km, setKm] = useState("");
  const [images, setImages] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [message, setMessage] = useState("");
  const [isMaintenance, setIsMaintenance] = useState(false);

  const [seats, setSeats] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [insurance, setInsurance] = useState("");

  // 📌 جلب السيارات
  const fetchCars = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/cars`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      setCars(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // 📸 اختيار صور
  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...mapped]);
  };

  // ➕ إضافة سيارة
  const addCar = async () => {
    if (
      !name ||
      !price ||
      !plate ||
      !color ||
      !km ||
      images.length < 3 ||
      !model_year ||
      !seats ||
      !transmission ||
      !fuelType ||
      !insurance
    ) {
      setMessage("⚠️ يجب إدخال جميع البيانات + 3 صور");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("plate_number", plate);
    formData.append("color", color);
    formData.append("daily_km", km);
    formData.append("model_year", model_year);
    formData.append("is_maintenance", isMaintenance ? 1 : 0);

    formData.append("seats", seats);
    formData.append("transmission", transmission);
    formData.append("fuel_type", fuelType);
    formData.append("insurance", insurance);

    images.forEach((img, index) => {
      formData.append(`image${index + 1}`, img.file);
    });

    const res = await fetch(`${BASE_URL}/api/cars`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    if (!res.ok) {
      setMessage("❌ حدث خطأ أثناء إضافة السيارة");
      return;
    }

    setMessage("✅ تمت إضافة السيارة بنجاح");

    setName("");
    setPrice("");
    setPlate("");
    setColor("");
    setKm("");
    setModelYear("");
    setImages([]);
    setSeats("");
    setTransmission("");
    setFuelType("");
    setInsurance("");

    fetchCars();
  };

  // ✏️ فتح التعديل
  const handleEdit = (car) => {
    setEditingCar(car);

    setName(car.name);
    setPrice(car.price);
    setPlate(car.plate_number);
    setColor(car.color);
    setKm(car.daily_km);
    setModelYear(car.model_year);
    setIsMaintenance(car.is_maintenance);
    setSeats(car.seats || "");
    setTransmission(car.transmission || "");
    setFuelType(car.fuel_type || "");
    setInsurance(car.insurance || "");
    setImages([]);
  };

  // 💾 تحديث السيارة
  const updateCar = async () => {
    if (!editingCar) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("plate_number", plate);
    formData.append("color", color);
    formData.append("daily_km", km);
    formData.append("model_year", model_year);
    formData.append("is_maintenance", isMaintenance ? 1 : 0);
    formData.append("seats", seats);
    formData.append("transmission", transmission);
    formData.append("fuel_type", fuelType);
    formData.append("insurance", insurance);

    // الصور اختيارية بالتعديل
    if (images.length > 0) {
      images.forEach((img, index) => {
        formData.append(`image${index + 1}`, img.file);
      });
    }

    const res = await fetch(`${BASE_URL}/api/cars/${editingCar.id}`, {
      method: "POST", // override PUT
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "X-HTTP-Method-Override": "PUT",
      },
      body: formData,
    });

    if (!res.ok) {
      setMessage("❌ فشل تعديل السيارة");
      return;
    }

    setMessage("✅ تم تعديل السيارة بنجاح");

    setEditingCar(null);
    setName("");
    setPrice("");
    setPlate("");
    setColor("");
    setKm("");
    setModelYear("");
    setImages([]);
    setSeats("");
    setTransmission("");
    setFuelType("");
    setInsurance("");

    fetchCars();
  };

  // ❌ حذف
  const deleteCar = async (id) => {
    await fetch(`${BASE_URL}/api/cars/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessage("🗑️ تم حذف السيارة");

    fetchCars();
  };

  return (
    <div dir="rtl" className="p-2 md:p-6">
      <div className="mb-6">
        <h1
          className="
    text-3xl
    font-bold
    text-[#B67A2E]
    text-center
  "
        >
          إدارة السيارات
        </h1>
      </div>

      {/* MESSAGE */}
      {message && (
        <div
          className="
bg-white
border
border-[#B67A2E]/30
text-gray-700
p-3
rounded-xl
mb-4
shadow-sm
"
        >
          {message}
        </div>
      )}

      {/* INPUTS */}
      <input
        className="
w-full
p-3
mb-3
bg-white
border
border-[#D7B98E]
rounded-xl
outline-none
focus:ring-2
focus:ring-[#B67A2E]
"
        placeholder="اسم السيارة"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="
w-full
p-3
mb-3
bg-white
border
border-[#D7B98E]
rounded-xl
outline-none
focus:ring-2
focus:ring-[#B67A2E]
"
        placeholder="السعر اليومي"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="
w-full
p-3
mb-3
bg-white
border
border-[#D7B98E]
rounded-xl
outline-none
focus:ring-2
focus:ring-[#B67A2E]
"
        placeholder="رقم اللوحة"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />

      <input
        className="
w-full
p-3
mb-3
bg-white
border
border-[#D7B98E]
rounded-xl
outline-none
focus:ring-2
focus:ring-[#B67A2E]
"
        placeholder="اللون"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <input
        className="
w-full
p-3
mb-3
bg-white
border
border-[#D7B98E]
rounded-xl
outline-none
focus:ring-2
focus:ring-[#B67A2E]
"
        placeholder="الكيلومترات السموحة يوميا "
        value={km}
        onChange={(e) => setKm(e.target.value)}
      />

      <input
        className="
w-full
p-3
mb-3
bg-white
border
border-[#D7B98E]
rounded-xl
outline-none
focus:ring-2
focus:ring-[#B67A2E]
"
        placeholder=" موديل السيارة"
        value={model_year}
        onChange={(e) => setModelYear(e.target.value)}
      />
      <input
        className="
w-full
p-3
mb-3
bg-white
border
border-[#D7B98E]
rounded-xl
outline-none
focus:ring-2
focus:ring-[#B67A2E]
"
        placeholder="عدد المقاعد"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
      />

      <input
        className="
w-full
p-3
mb-3
bg-white
border
border-[#D7B98E]
rounded-xl
outline-none
focus:ring-2
focus:ring-[#B67A2E]
"
        placeholder="نوع ناقل الحركة (يدوي / أوتوماتيك)"
        value={transmission}
        onChange={(e) => setTransmission(e.target.value)}
      />

      <input
        className="
w-full
p-3
mb-3
bg-white
border
border-[#D7B98E]
rounded-xl
outline-none
focus:ring-2
focus:ring-[#B67A2E]
"
        placeholder="نوع الوقود (بنزين / مازوت)"
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value)}
      />

      <input
        className="
w-full
p-3
mb-3
bg-white
border
border-[#D7B98E]
rounded-xl
outline-none
focus:ring-2
focus:ring-[#B67A2E]
"
        placeholder="قيمة التأمين"
        value={insurance}
        onChange={(e) => setInsurance(e.target.value)}
      />
      <select
        className="w-full p-3 mb-3 bg-white border border-[#D7B98E] rounded-lg"
        value={isMaintenance}
        onChange={(e) => setIsMaintenance(e.target.value === "true")}
      >
        <option value="false">متاحة</option>

        <option value="true">تحت الصيانة</option>
      </select>

      {/* UPLOAD */}
      <label className="cursor-pointer inline-block bg-[#B67A2E] text-white font-bold py-2 px-4 rounded-lg mb-4">
        📷 إضافة صور
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
          className="hidden"
        />
      </label>

      {/* IMAGES */}
      <div className="flex gap-3 overflow-x-auto mt-3">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative min-w-[100px] h-24 rounded-lg overflow-hidden border border-gray-700"
          >
            <img src={img.preview} className="w-full h-full object-cover" />

            <button
              onClick={() =>
                setImages(images.filter((_, index) => index !== i))
              }
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ADD / UPDATE BUTTON */}
      <button
        onClick={editingCar ? updateCar : addCar}
        className={`w-full font-bold py-3 px-4 rounded-lg mt-6 mb-10 ${
          editingCar ? "bg-green-600 text-white" : "bg-[#B67A2E] text-white"
        }`}
      >
        {editingCar ? "💾 حفظ التعديل" : "➕ إضافة السيارة"}
      </button>

      {/* CARS */}
      {/* عرض السيارات */}

      <CarsTable
        cars={cars}
        handleEdit={handleEdit}
        deleteCar={deleteCar}
        openDetails={setSelectedCar}
      />
      <CarsCard
        cars={cars}
        handleEdit={handleEdit}
        deleteCar={deleteCar}
        openDetails={setSelectedCar}
      />
      <CarDetailsModal car={selectedCar} close={() => setSelectedCar(null)} />
    </div>
  );
}

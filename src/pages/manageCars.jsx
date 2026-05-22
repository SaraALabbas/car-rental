/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import {
  FaArrowRight,
  FaEdit,
  FaCar,
  FaMoneyBillWave,
  FaIdCard,
  FaPalette,
} from "react-icons/fa";

const BASE_URL = "http://127.0.0.1:8000";

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
  const [message, setMessage] = useState("");

  // 📌 جلب السيارات
  const fetchCars = async () => {
    const res = await fetch(`${BASE_URL}/api/cars`);
    const data = await res.json();
    setCars(data);
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
    if (!name || !price || !plate || !color || !km || images.length < 3) {
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

    // const data = await res.json();

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
    <div dir="rtl" className="min-h-screen bg-black text-white p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => window.history.back()}>
          <FaArrowRight className="text-white text-xl" />
        </button>
        <h1 className="text-2xl font-bold">إدارة السيارات</h1>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg mb-4">
          {message}
        </div>
      )}

      {/* INPUTS */}
      <input
        className="w-full p-3 mb-3 bg-gray-900 border border-gray-700 rounded-lg"
        placeholder="اسم السيارة"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full p-3 mb-3 bg-gray-900 border border-gray-700 rounded-lg"
        placeholder="السعر اليومي"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="w-full p-3 mb-3 bg-gray-900 border border-gray-700 rounded-lg"
        placeholder="رقم اللوحة"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />

      <input
        className="w-full p-3 mb-3 bg-gray-900 border border-gray-700 rounded-lg"
        placeholder="اللون"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <input
        className="w-full p-3 mb-3 bg-gray-900 border border-gray-700 rounded-lg"
        placeholder="الكيلومترات السموحة يوميا "
        value={km}
        onChange={(e) => setKm(e.target.value)}
      />

      <input
        className="w-full p-3 mb-3 bg-gray-900 border border-gray-700 rounded-lg"
        placeholder=" موديل السيارة"
        value={model_year}
        onChange={(e) => setModelYear(e.target.value)}
      />

      {/* UPLOAD */}
      <label className="cursor-pointer inline-block bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg mb-4">
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
          editingCar ? "bg-green-500 text-black" : "bg-yellow-400 text-black"
        }`}
      >
        {editingCar ? "💾 حفظ التعديل" : "➕ إضافة السيارة"}
      </button>

      {/* CARS */}
      <div className="space-y-4">
        {cars.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 border border-gray-800 p-4 rounded-xl"
          >
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaCar className="text-yellow-400" />
                <b>السيارة:</b> {item.name}
              </p>

              <p className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-400" />
                <b>السعر:</b> {item.price} / يوم
              </p>

              <p className="flex items-center gap-2">
                <FaIdCard className="text-blue-400" />
                <b>اللوحة:</b> {item.plate_number}
              </p>

              <p className="flex items-center gap-2">
                <FaPalette className="text-pink-400" />
                <b>اللون:</b> {item.color}
              </p>

              <p className="flex items-center gap-2">
                <b>موديل السيارة:</b> {item.model_year}
              </p>
            </div>

            <div className="flex gap-2 my-3">
              <img
                src={item.image1}
                className="w-24 h-20 rounded-lg object-cover"
              />
              <img
                src={item.image2}
                className="w-24 h-20 rounded-lg object-cover"
              />
              <img
                src={item.image3}
                className="w-24 h-20 rounded-lg object-cover"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-500 px-3 py-1 rounded-lg flex items-center gap-1"
              >
                <FaEdit /> تعديل
              </button>

              <button
                onClick={() => deleteCar(item.id)}
                className="bg-red-500 px-3 py-1 rounded-lg"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowRight,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaUpload,
  FaCopy,
  FaPlane,
  FaExclamationCircle,
} from "react-icons/fa";
import { useAuth } from "../context/useAuth";

const BASE_URL = "https://car-rental-api-xwof.onrender.com";

/* ================= INPUT ================= */
const Input = ({ icon: Icon, placeholder, error, ...props }) => (
  <div className="mb-3">
    <div className="relative">
      <Icon className="absolute right-3 top-3 text-gray-400" />
      <input
        {...props}
        placeholder={placeholder}
        className="w-full p-3 pr-10 bg-[#1a1a1a] rounded text-right border border-gray-700 text-white"
      />
    </div>

    {error && (
      <p className="text-red-500 text-sm mt-1 flex justify-end gap-1 items-center">
        <FaExclamationCircle />
        {error}
      </p>
    )}
  </div>
);

/* ================= IMAGE ================= */
function ImageBox({ field, label, formData, setFormData, errors }) {
  return (
    <div className="mb-4">
      <label className="flex justify-end items-center gap-2 text-gray-300 mb-2">
        {label} <FaUpload />
      </label>

      <label className="block bg-[#1a1a1a] h-32 rounded border border-gray-700 cursor-pointer overflow-hidden flex items-center justify-center">
        {formData[field] ? (
          <img
            src={URL.createObjectURL(formData[field])}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">اضغط لرفع صورة</span>
        )}

        <input
          type="file"
          hidden
          onChange={(e) =>
            setFormData({ ...formData, [field]: e.target.files[0] })
          }
        />
      </label>

      {errors[field] && (
        <p className="text-red-500 text-sm text-right">{errors[field]}</p>
      )}
    </div>
  );
}

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const car_id = id || location.state?.car_id;
  const carPrice = location.state?.price || 50;
  const [airportDelivery, setAirportDelivery] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState("");

  const { token } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pickupDate: "",
    pickupTime: "",

    returnDate: "",
    returnTime: "",
    idFront: null,
    idBack: null,
    paymentProof: null,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const paymentLink = "2fcf9b7e1d77db640c5b11a26bd1e780";

  /* ================= CALC ================= */
  const calculateDays = () => {
    if (!formData.pickupDate || !formData.returnDate)
      return { days: 0, total: 0 };

    const start = new Date(formData.pickupDate);
    const end = new Date(formData.returnDate);

    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    return {
      days: diff > 0 ? diff : 0,
      total: diff > 0 ? diff * carPrice : 0,
    };
  };

  const { days, total } = calculateDays();
  const today = new Date().toISOString().split("T")[0];

  /* ================= VALIDATION ================= */
  const validate = () => {
    let err = {};

    if (!formData.fullName) err.fullName = "الاسم مطلوب";

    if (!formData.phone) err.phone = "رقم الهاتف مطلوب";

    if (!formData.pickupDate) err.pickupDate = "حدد تاريخ الاستلام";

    if (!formData.pickupTime) err.pickupTime = "حدد ساعة الاستلام";

    if (!formData.returnDate) err.returnDate = "حدد تاريخ التسليم";

    if (!formData.returnTime) err.returnTime = "حدد ساعة التسليم";

    // منع اختيار تاريخ قديم
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (formData.pickupDate) {
      const pickup = new Date(formData.pickupDate);

      if (pickup < currentDate) {
        err.pickupDate = "لا يمكن اختيار تاريخ قديم";
      }
    }

    if (formData.returnDate) {
      const returnDate = new Date(formData.returnDate);

      if (returnDate < currentDate) {
        err.returnDate = "لا يمكن اختيار تاريخ قديم";
      }
    }

    // التحقق من الوقت
    if (
      formData.pickupTime &&
      (formData.pickupTime < "10:00" || formData.pickupTime > "22:00")
    ) {
      err.pickupTime = "ساعة الاستلام يجب أن تكون بين 10 صباحاً و10 مساءً";
    }

    if (
      formData.returnTime &&
      (formData.returnTime < "10:00" || formData.returnTime > "22:00")
    ) {
      err.returnTime = "ساعة التسليم يجب أن تكون بين 10 صباحاً و10 مساءً";
    }

    // مدة الحجز
    if (formData.pickupDate && formData.returnDate) {
      const start = new Date(formData.pickupDate);
      const end = new Date(formData.returnDate);

      const diff = (end - start) / (1000 * 60 * 60 * 24);

      if (diff < 1) {
        err.returnDate = "لا يمكن الحجز أقل من 24 ساعة";
      }
    }

    // الصور
    if (!formData.idFront) err.idFront = "صورة الهوية مطلوبة";

    if (!formData.idBack) err.idBack = "صورة الهوية مطلوبة";

    if (!formData.paymentProof) err.paymentProof = "إثبات الدفع مطلوب";

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!validate()) return;

    const data = new FormData();
    data.append("car_id", car_id);
    data.append("full_name", formData.fullName);
    data.append("phone", formData.phone);
    data.append("pickup_date", formData.pickupDate);
    data.append("pickup_time", formData.pickupTime);
    data.append("return_date", formData.returnDate);
    data.append("return_time", formData.returnTime);
    data.append("delivery", airportDelivery ? "1" : "0");
    if (selectedAirport) {
      data.append("delivery_location", selectedAirport);
    }
    data.append("id_front", formData.idFront);
    data.append("id_back", formData.idBack);
    data.append("payment_image", formData.paymentProof);

    try {
      const res = await fetch(`${BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: data,
      });

      const result = await res.json();
      if (!res.ok) {
        if (result.errors) {
          console.log("Validation Errors:", result.errors);
          // عرض الأخطاء للمستخدم
          setErrors(result.errors); // يمكنك تعديل validate ليعرضها
        }
        setSuccess("❌ " + (result.message || "فشل إرسال الطلب"));
        return;
      }

      setSuccess("✅ تم إرسال طلبك بنجاح - الطلب قيد المراجعة");
      // يمكنك إعادة تعيين النموذج هنا
    } catch (err) {
      console.error("Error:", err);
      setSuccess("❌ خطأ في الاتصال بالسيرفر");
    }
  };
  return (
    <div className="bg-black min-h-screen text-white p-5 max-w-xl mx-auto">
      {/* BACK */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-yellow-400 transition"
        >
          <FaArrowRight className="text-2xl" />
        </button>
      </div>
      <h1 className="text-yellow-400 text-2xl text-center mb-6">نموذج الحجز</h1>

      {/* الاسم */}
      <Input
        icon={FaUser}
        placeholder="الاسم الكامل"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        error={errors.fullName}
      />

      {/* الهاتف */}
      <Input
        icon={FaPhone}
        placeholder="رقم الموبايل"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        error={errors.phone}
      />

      {/* تاريخ الاستلام */}
      <div className="mb-4">
        <label className="block text-right mb-2 text-gray-300">
          تاريخ الاستلام
        </label>

        <Input
          icon={FaCalendarAlt}
          type="date"
          min={today}
          value={formData.pickupDate}
          onChange={(e) =>
            setFormData({ ...formData, pickupDate: e.target.value })
          }
          error={errors.pickupDate}
        />
      </div>

      {/* ساعة الاستلام */}
      <div className="mb-4">
        <label className="block text-right mb-2 text-gray-300">
          ساعة الاستلام
        </label>

        <input
          type="time"
          lang="ar"
          dir="rtl"
          value={formData.pickupTime}
          onChange={(e) => {
            const time = e.target.value;

            if (time >= "10:00" && time <= "22:00") {
              setFormData({ ...formData, pickupTime: time });
              setErrors({ ...errors, pickupTime: "" });
            } else {
              setErrors({
                ...errors,
                pickupTime: "يجب أن تكون الساعة بين 10 صباحاً و10 مساءً",
              });
            }
          }}
          className="w-full p-3 bg-[#1a1a1a] rounded text-right border border-gray-700 text-white"
        />

        {errors.pickupTime && (
          <p className="text-red-500 text-sm mt-1 text-right">
            {errors.pickupTime}
          </p>
        )}
      </div>
      {/* تاريخ التسليم */}
      <div className="mb-4">
        <label className="block text-right mb-2 text-gray-300">
          تاريخ التسليم
        </label>

        <Input
          icon={FaCalendarAlt}
          type="date"
          min={formData.pickupDate || today}
          value={formData.returnDate}
          onChange={(e) =>
            setFormData({ ...formData, returnDate: e.target.value })
          }
          error={errors.returnDate}
        />
      </div>

      {/* ساعة التسليم */}
      <div className="mb-4">
        <label className="block text-right mb-2 text-gray-300">
          ساعة التسليم
        </label>

        <input
          type="time"
          lang="ar"
          dir="rtl"
          value={formData.returnTime}
          onChange={(e) => {
            const time = e.target.value;

            if (time >= "10:00" && time <= "22:00") {
              setFormData({ ...formData, returnTime: time });
              setErrors({ ...errors, returnTime: "" });
            } else {
              setErrors({
                ...errors,
                returnTime: "يجب أن تكون الساعة بين 10 صباحاً و10 مساءً",
              });
            }
          }}
          className="w-full p-3 bg-[#1a1a1a] rounded text-right border border-gray-700 text-white"
        />

        {errors.returnTime && (
          <p className="text-red-500 text-sm mt-1 text-right">
            {errors.returnTime}
          </p>
        )}
      </div>

      {/* 💰 BOX الحساب */}
      {days > 0 && (
        <div className="bg-[#1a1a1a] p-4 rounded mb-4 border border-yellow-400">
          <p>عدد الأيام: {days}</p>
          <p className="text-yellow-400 font-bold text-lg">
            الإجمالي: {total}$
          </p>
        </div>
      )}

      {/* الصور */}
      <ImageBox
        field="idFront"
        label="صورة الهوية الأمامية"
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      <ImageBox
        field="idBack"
        label="صورة الهوية الخلفية"
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      <ImageBox
        field="paymentProof"
        label="إثبات الدفع"
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      {/* ✈️ خدمة المطار */}
      <div className="bg-[#1a1a1a] p-5 rounded-xl border border-yellow-400">
        <label className="flex justify-end items-center gap-3 text-yellow-400 font-bold text-lg cursor-pointer group">
          خدمة توصيل للمطار
          <FaPlane className="text-2xl group-hover:rotate-12 transition-transform" />
          <div className="relative">
            <input
              type="checkbox"
              className="peer sr-only"
              onChange={() => setAirportDelivery(!airportDelivery)}
              checked={airportDelivery}
            />
            <div className="w-6 h-6 bg-gray-700 border-2 border-gray-600 rounded-md peer-checked:bg-yellow-400 peer-checked:border-yellow-400 transition-all duration-200 flex items-center justify-center">
              {airportDelivery && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
        </label>

        {airportDelivery && (
          <div className="mt-5 pt-4 border-t border-gray-700">
            <label className="block text-right text-gray-300 mb-2 text-sm">
              اختر المطار:
            </label>

            <select
              className="w-full p-3 bg-black border border-gray-700 rounded-lg text-right text-white focus:outline-none focus:border-yellow-400 transition-colors"
              onChange={(e) => setSelectedAirport(e.target.value)}
              value={selectedAirport}
            >
              <option value="">اختر المطار</option>
              <option value="مطار دمشق">مطار دمشق</option>
              <option value="مطار حلب">مطار حلب</option>
            </select>

            <p className="text-sm text-gray-400 mt-4 text-right">
              يرجى التواصل مع المكتب لتأكيد الحجز :
              <span className="text-yellow-400 font-medium">
                {" "}
                0965121290 ⚠️
              </span>
            </p>
          </div>
        )}
      </div>
      {/* رابط الدفع */}
      <div className="bg-[#1a1a1a] p-3 rounded mt-4 flex justify-between items-center">
        <span className="text-gray-300 text-sm">{paymentLink}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(paymentLink);
            setSuccess("✅ تم نسخ الرابط بنجاح");
            setTimeout(() => setSuccess(""), 3000);
          }}
          className="bg-gray-700 hover:bg-gray-600 text-yellow-400 p-3 rounded-lg transition-colors flex-shrink-0"
          title="نسخ الرابط"
        >
          <FaCopy className="text-yellow-400" />
        </button>
      </div>

      {/* زر */}
      <button
        onClick={handleSubmit}
        className="bg-yellow-400 text-black w-full p-4 mt-5 rounded font-bold"
      >
        إرسال الطلب
      </button>

      {success && <p className="text-center mt-3 text-green-400">{success}</p>}
    </div>
  );
}

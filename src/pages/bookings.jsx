import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowRight,
  FaUser,
  FaPhone,
  FaUpload,
  FaCopy,
  FaExclamationCircle,
} from "react-icons/fa";
import { useAuth } from "../context/useAuth";
import BASE_URL from "../config/api";

// const BASE_URL = "https://car-rental-api-xwof.onrender.com";

/* ================= INPUT ================= */
const Input = ({ icon: Icon, placeholder, error, ...props }) => (
  <div className="mb-3">
    <div className="relative">
      <Icon className="absolute right-3 top-3 text-gray-400" />
      <input
        {...props}
        placeholder={placeholder}
        className="w-full p-3 pr-10 bg-white rounded-xl text-right border border-[#B67A2E] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B67A2E]"
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
      <label className="flex justify-end items-center gap-2 text-sm text-[#555] font-medium mb-2">
        {label} <FaUpload />
      </label>

      <label className="block bg-white h-32 rounded-xl border border-[#B67A2E] cursor-pointer overflow-hidden flex items-center justify-center">
        {" "}
        {formData[field] ? (
          <img
            src={URL.createObjectURL(formData[field])}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-600">اضغط لرفع صورة</span>
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
  const [bookingNumber, setBookingNumber] = useState("");
  const bookingInfo = location.state?.bookingInfo;
  const [dailyPrice, setDailyPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/cars/${car_id}`)
      .then((res) => res.json())
      .then((car) => {
        setDailyPrice(car.price);
      });
  }, [car_id]);

  useEffect(() => {
    if (!bookingInfo || !dailyPrice) return;

    const pickup = new Date(bookingInfo.pickup_date);
    const ret = new Date(bookingInfo.return_date);

    let days = Math.ceil((ret - pickup) / (1000 * 60 * 60 * 24));

    if (days < 1) days = 1;

    let discountPercent = 0;

    if (days >= 3) {
      discountPercent = 12 + (days - 3);
    }

    const total = dailyPrice * days;
    const final = total - (total * discountPercent) / 100;

    setDiscount(discountPercent);
    setFinalPrice(final);
  }, [dailyPrice, bookingInfo]);

  const { token } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    idFront: null,
    idBack: null,
    paymentProof: null,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const paymentLink = "69288aca345721a0f0006aa5a639ce43";

  /* ================= VALIDATION ================= */
  const validate = () => {
    let err = {};

    if (!formData.fullName) err.fullName = "الاسم مطلوب";

    if (!formData.phone) err.phone = "رقم الهاتف مطلوب";

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
    data.append("pickup_date", bookingInfo.pickup_date);
    data.append("pickup_time", bookingInfo.pickup_time);
    data.append("return_date", bookingInfo.return_date);
    data.append("return_time", bookingInfo.return_time);

    // تحديد إذا كانت خدمة توصيل أم لا
    const officeLocations = ["المكتب", "Office"];

    if (officeLocations.includes(bookingInfo.location)) {
      data.append("delivery", "0");
      data.append("delivery_location", "المكتب");
    } else {
      data.append("delivery", "1");
      data.append("delivery_location", bookingInfo.location);
    }

    data.append("id_front", formData.idFront);
    data.append("id_back", formData.idBack);
    data.append("payment_image", formData.paymentProof);

    try {
      const res = await fetch(`${BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
        body: data,
      });

      const result = await res.json();
      if (!res.ok) {
        if (result.errors) {
          // عرض الأخطاء للمستخدم
          setErrors(result.errors); // يمكنك تعديل validate ليعرضها
        }
        setSuccess("❌ " + (result.message || "فشل إرسال الطلب"));
        return;
      }
      setBookingNumber(result.booking_number);
      setSuccess("✅ تم إرسال طلبك بنجاح - الطلب قيد المراجعة");
      // يمكنك إعادة تعيين النموذج هنا
    } catch (err) {
      console.error("Error:", err);
      setSuccess("❌ خطأ في الاتصال بالسيرفر");
    }
  };

  const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");

    let h = parseInt(hour, 10);
    const period = h >= 12 ? "مساءً" : "صباحاً";

    h = h % 12;
    if (h === 0) h = 12;

    return `${h}:${minute} ${period}`;
  };

  return (
    <div className="bg-white min-h-screen text-[#2B2B2B] p-5 max-w-xl mx-auto pb-10">
      {/* BACK */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-[#B67A2E] hover:text-[#9d6826] transition"
        >
          <FaArrowRight className="text-2xl" />
        </button>
      </div>

      <h1 className="text-[#B67A2E] text-2xl font-bold text-center mb-6">
        نموذج الحجز
      </h1>

      {/* BOOKING SUMMARY */}
      <div className="bg-white shadow-md border border-[#B67A2E]/30 p-5 rounded-2xl mb-5">
        <h2 className="text-[#B67A2E] text-xl font-bold mb-4 text-right">
          ملخص الحجز
        </h2>

        <div className="space-y-3 text-right">
          <p>
            مكان الاستلام:
            <span className="font-bold mr-2">{bookingInfo?.location}</span>
          </p>

          <p>
            تاريخ الاستلام:
            <span className="font-bold mr-2">{bookingInfo?.pickup_date}</span>
          </p>

          <p>
            وقت الاستلام:
            <span className="font-bold mr-2">
              {formatTime(bookingInfo?.pickup_time)}
            </span>
          </p>

          <p>
            تاريخ التسليم:
            <span className="font-bold mr-2">{bookingInfo?.return_date}</span>
          </p>

          <p>
            وقت التسليم:
            <span className="font-bold mr-2">
              {formatTime(bookingInfo?.return_time)}
            </span>
          </p>

          <p>
            السعر اليومي:
            <span className="font-bold mr-2">${dailyPrice}</span>
          </p>

          <p>
            نسبة الخصم:
            <span className="font-bold mr-2">%{discount}</span>
          </p>

          <p className="text-[#B67A2E] text-lg font-bold">
            السعر النهائي:
            <span className="mr-2">${finalPrice.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* USER INFO */}

      <Input
        icon={FaUser}
        placeholder="الاسم الكامل"
        value={formData.fullName}
        onChange={(e) =>
          setFormData({
            ...formData,
            fullName: e.target.value,
          })
        }
        error={errors.fullName}
      />

      <Input
        icon={FaPhone}
        placeholder="رقم الموبايل"
        value={formData.phone}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone: e.target.value,
          })
        }
        error={errors.phone}
      />

      {/* ID IMAGES */}

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
      <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 text-right">
        <strong>ملاحظة:</strong> يمكن الدفع نقدًا عند مراجعة مكتب الشركة، وسيتم
        استكمال إجراءات الدفع وتأكيد الحجز قبل استلام السيارة. للاستفسار أو
        التنسيق، يمكن التواصل معنا على الرقم{" "}
        <a
          href="tel:+963965121290"
          className="text-[#B67A2E] font-bold hover:underline"
        >
          +963 965 121 290
        </a>
      </div>
      {/* PAYMENT LINK */}
      <div className="mt-5">
        <label className="block text-gray-700 text-sm font-semibold mb-2 text-right">
          كود الشام كاش
        </label>

        <div className="bg-white border border-gray-300 shadow-sm p-3 rounded-xl flex justify-between items-center">
          <span className="text-gray-600 text-sm">{paymentLink}</span>

          <button
            onClick={() => {
              navigator.clipboard.writeText(paymentLink);
              setSuccess("✅ تم نسخ الرابط");
              setTimeout(() => setSuccess(""), 3000);
            }}
            className="bg-[#B67A2E] text-white p-3 rounded-xl"
          >
            <FaCopy />
          </button>
        </div>
      </div>
      {/* SUBMIT */}

      <button
        onClick={handleSubmit}
        className="w-full bg-[#B67A2E] text-white p-4 mt-5 rounded-xl font-bold text-lg hover:bg-[#9d6826] transition"
      >
        إرسال الطلب
      </button>

      {success && (
        <div className="mt-6 bg-green-50 border border-green-300 rounded-xl p-5 text-center">
          <h3 className="text-green-700 font-bold text-lg">{success}</h3>

          <p className="mt-4 text-gray-700">رقم الحجز الخاص بك</p>

          <div className="flex justify-center gap-3 mt-3">
            <div className="px-5 py-3 bg-white border rounded-lg font-bold text-xl tracking-widest">
              {bookingNumber}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(bookingNumber);
              }}
              className="bg-[#B67A2E] text-white px-4 rounded-lg"
            >
              نسخ
            </button>
          </div>

          <p className="mt-5 text-sm text-red-600 font-semibold">
            يرجى نسخ وحفظ رقم الحجز لأنه سيستخدم لتتبع حالة طلبك.
          </p>

          <p className="mt-2 text-sm text-gray-600">
            ولتسريع إجراءات الحجز يرجى التواصل مع المكتب.
          </p>
        </div>
      )}
    </div>
  );
}

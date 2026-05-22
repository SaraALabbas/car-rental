import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAuth } from "../context/useAuth";
import { FaPhoneAlt } from "react-icons/fa";
import ContractLogo from "../assets/ContractLogo.jpg";

const BASE_URL = "http://127.0.0.1:8000";

export default function ContractDocument() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const ref = useRef();

  useEffect(() => {
    fetch(`${BASE_URL}/api/contracts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(setContract);
  }, [id, token]);

  const downloadPDF = async () => {
    const element = ref.current;

    // تحويل العقد لصورة كاملة
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    // إنشاء PDF بحجم A4
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 210;
    const pdfHeight = 297;

    // نخلي الصورة تغطي كامل الصفحة
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`contract_${contract.contract_number}.pdf`);
  };

  if (!contract) return <p>جاري التحميل...</p>;

  return (
    <div className="bg-black min-h-screen p-4 text-white" dir="rtl">
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 px-4 py-2 rounded"
        >
          رجوع
        </button>
        <button
          onClick={downloadPDF}
          className="bg-green-600 px-4 py-2 rounded"
        >
          تحميل PDF
        </button>
      </div>

      <div className="overflow-auto">
        <div
          ref={ref}
          className="bg-white text-black border-2 border-black mx-auto p-8"
          style={{
            width: "210mm",
            minHeight: "297mm",
          }}
        >
          {/* ================= HEADER ================= */}

          <div className="border border-black p-4 mb-6">
            {/* بسم الله */}
            <div className="text-center mb-6">
              <h1 className="text-[22px] font-bold">بسم الله الرحمن الرحيم</h1>
            </div>

            {/* المحتوى */}
            <div className="grid grid-cols-3 items-start">
              {/* اليمين */}
              <div className="text-right text-[15px] leading-8 font-semibold">
                <p>شركة عبد العزيز بطل وشركاه</p>
                <p>عقد إيجار واستثمار سيارة</p>
              </div>

              {/* اللوجو */}
              <div className="flex justify-center items-center">
                <div className="w-36 h-36 rounded-full overflow-hidden border border-gray-400">
                  <img
                    src={ContractLogo}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* اليسار */}
              <div className=" text-[15px] leading-8 font-semibold">
                <p>إدلب - جنوب دوار الزراعة ب 150 م على اليمين</p>
                <div className="ml-16">
                  <div className="flex items-center gap-2">
                    <span>0988453802</span>
                    <FaPhoneAlt />
                  </div>

                  <div className="flex items-center gap-2">
                    <span>0988231734</span>
                    <FaPhoneAlt />
                  </div>

                  <div className="flex items-center gap-2">
                    <span>0965121290</span>
                    <FaPhoneAlt />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= الفريقين ================= */}

          {/* ================= الفريقين - تصميم متساوي ================= */}
          <div className="border-2 border-black mb-8 overflow-hidden">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="border-b-2 border-black bg-gray-50">
                  <th className="p-4 text-center font-bold text-lg border-l-2 border-black w-1/2">
                    الفريق الأول (المؤجر)
                  </th>
                  <th className="p-4 text-center font-bold text-lg w-1/2">
                    الفريق الثاني (المستأجر)
                  </th>
                </tr>
              </thead>
              <tbody className="text-[15px] align-top">
                {/* الاسم والنسبة */}
                <tr>
                  <td className="p-3 border-l-2 border-black">
                    <span className="font-semibold">الاسم والنسبة :</span>
                    <div className="border-b border-black mt-1 min-h-[28px]">
                      محمد بطل
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold">الاسم والنسبة :</span>
                    <input
                      dir="rtl"
                      type="text"
                      defaultValue={contract.user?.name || ""}
                      className="border-b border-black w-full mt-1 outline-none bg-transparent min-h-[28px] text-right"
                    />
                  </td>
                </tr>

                {/* اسم الأب */}
                <tr>
                  <td className="p-3 border-l-2 border-black">
                    <span className="font-semibold">اسم الأب :</span>
                    <div className="border-b border-black mt-1 min-h-[28px]">
                      محمد كمال
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold">اسم الأب :</span>
                    <input
                      dir="rtl"
                      type="text"
                      className="border-b border-black w-full mt-1 outline-none bg-transparent min-h-[28px] text-right"
                    />
                  </td>
                </tr>

                {/* اسم الأم */}
                <tr>
                  <td className="p-3 border-l-2 border-black">
                    <span className="font-semibold">اسم الأم :</span>
                    <div className="border-b border-black mt-1 min-h-[28px]">
                      مريم الجسري
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold">اسم الأم :</span>
                    <input
                      type="text"
                      className="border-b border-black w-full mt-1 outline-none bg-transparent min-h-[28px] text-right"
                    />
                  </td>
                </tr>

                {/* مكان وتاريخ الولادة */}
                <tr>
                  <td className="p-3 border-l-2 border-black">
                    <span className="font-semibold">مكان وتاريخ الولادة :</span>
                    <div className="border-b border-black mt-1 min-h-[28px]">
                      إدلب 1999-3-21
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold">مكان وتاريخ الولادة :</span>
                    <input
                      dir="rtl"
                      type="text"
                      className="border-b border-black w-full mt-1 outline-none bg-transparent min-h-[28px] text-right"
                    />
                  </td>
                </tr>

                {/* رقم البطاقة الشخصية */}
                <tr>
                  <td className="p-3 border-l-2 border-black">
                    <span className="font-semibold">رقم البطاقة الشخصية :</span>
                    <div className="border-b border-black mt-1 min-h-[28px]">
                      07010038000
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold">رقم البطاقة الشخصية :</span>
                    <input
                      dir="rtl"
                      type="text"
                      className="border-b border-black w-full mt-1 outline-none bg-transparent min-h-[28px] text-right"
                    />
                  </td>
                </tr>

                {/* محل ورقم القيد */}
                <tr>
                  <td className="p-3 border-l-2 border-black">
                    <span className="font-semibold">محل ورقم القيد :</span>
                    <div className="border-b border-black mt-1 min-h-[28px]">
                      فنري 24
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold">محل ورقم القيد :</span>
                    <input
                      dir="rtl"
                      type="text"
                      className="border-b border-black w-full mt-1 outline-none bg-transparent min-h-[28px] text-right"
                    />
                  </td>
                </tr>

                {/* رقم الهاتف */}
                <tr>
                  <td className="p-3 border-l-2 border-black">
                    <span className="font-semibold"> رقم الهاتف :</span>
                    <div className="border-b border-black mt-1 min-h-[28px]">
                      0988433802
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold">رقم الهاتف :</span>
                    <input
                      dir="rtl"
                      type="text"
                      defaultValue={contract.user?.phone || ""}
                      className="border-b border-black w-full mt-1 outline-none bg-transparent min-h-[28px] text-right"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* ================= الجزء السفلي - الاتفاق والشروط ================= */}
          <div className="border-2 border-black p-6 text-[15px] leading-loose mb-8">
            {/* العنوان */}
            <p className="mb-8 text-right pr-6 font-semibold text-[17px]">
              اتفق الفريقان وهما بكامل الأهلية المعتبرة شرعاً وقانوناً على ما
              يلي:
            </p>

            {/* السطر الأول */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="font-semibold">
                اتفق الفريق الأول مع الفريق الثاني على إيجار سيارة نوع:
              </span>

              <span className="border-b border-black min-w-[90px] px-2 text-center">
                {contract.booking?.car?.name || ""}
              </span>

              <span className="font-semibold">موديل:</span>

              <span className="border-b border-black min-w-[90px] px-2 text-center">
                {contract.booking?.car?.model_year || ""}
              </span>
              <span className="font-semibold">اللون:</span>

              <span className="border-b border-black min-w-[90px] px-2 text-center">
                {contract.booking?.car?.color || ""}
              </span>
            </div>

            {/* السطر الثاني */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-semibold">رقم اللوحة</span>

              <span className="border-b border-black min-w-[140px] px-2 text-center">
                {contract.booking?.car?.plate_number || ""}
              </span>

              <span className="font-semibold">ولمدة</span>

              <span className="border-b border-black min-w-[100px] px-2 text-center">
                {Math.ceil(
                  (new Date(contract.booking?.return_date) -
                    new Date(contract.booking?.pickup_date)) /
                    (1000 * 60 * 60 * 24),
                ).toLocaleString("ar-EG")}{" "}
                يوم
              </span>

              <span className="font-semibold">
                لقاء بدل نقدي لليوم الواحد وقدره
              </span>

              <span className="border-b border-black min-w-[100px] px-2 text-center">
                {contract.booking?.car?.price || ""}
              </span>

              <span>$</span>
            </div>

            {/* السطر الثالث */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-semibold">ساعة المغادرة</span>

              <span className="border-b border-black min-w-[100px] px-2 text-center">
                {new Date(
                  `1970-01-01T${contract.booking?.return_time}`,
                ).toLocaleTimeString("ar-EG", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>

              <span className="font-semibold">اعتباراً من تاريخ</span>

              <span className="border-b border-black min-w-[140px] px-2 text-center">
                {new Date(contract.booking?.pickup_date).toLocaleDateString(
                  "ar-EG",
                )}
              </span>

              <span className="font-semibold">ولغاية تاريخ</span>

              <span className="border-b border-black min-w-[140px] px-2 text-center">
                {new Date(contract.booking?.return_date).toLocaleDateString(
                  "ar-EG",
                )}
              </span>
            </div>

            {/* السطر الرابع */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-semibold">وتأمين قدره</span>

              <input
                type="text"
                style={{
                  width: "80px",
                  minWidth: "80px",
                  maxWidth: "80px",
                }}
                className="appearance-none border-0 border-b border-black outline-none bg-transparent text-center p-0 m-0 shrink-0"
              />
              <span className="font-semibold">
                الكيلو متر المسموح لليوم الواحد
              </span>

              <span className="border-b border-black min-w-[100px] px-2 text-center">
                {contract.booking?.car?.daily_km || ""}
              </span>

              <span className="font-semibold">قيمة الساعة الزائدة</span>

              <input
                type="text"
                style={{
                  width: "80px",
                  minWidth: "80px",
                  maxWidth: "80px",
                }}
                className="appearance-none border-0 border-b border-black outline-none bg-transparent text-center p-0 m-0 shrink-0 min-w-[80px]"
              />

              <span className="font-semibold">عداد الخروج</span>

              <input
                type="text"
                style={{
                  width: "80px",
                  minWidth: "80px",
                  maxWidth: "80px",
                }}
                className="border-b border-black outline-none bg-transparent text-center "
              />
            </div>

            {/* الملاحظات */}
            <div className="pt-5 text-[14px] leading-loose text-justify">
              <p className="mb-4">
                ملاحظة: يتعهد الفريق الثاني بتسليم السيارة خالية من أي عطل داخلي
                أو خارجي أو حادث، ويكون مسؤولاً أمام الجهات المختصة عن أي ضرر
                للغير، وتسليم السيارة خالية من أي عطل فني.
              </p>
            </div>
          </div>

          {/* ================= التواقيع ================= */}

          <div className="mt-10">
            {/* العناوين */}
            <div className="grid grid-cols-4 text-center text-[15px] font-semibold mb-10">
              <div>الفريق الأول</div>

              <div>الفريق الثاني</div>

              <div>الشاهد الأول</div>

              <div>الشاهد الثاني</div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <input
                type="text"
                className="
        w-full
        min-w-0
        border-0 border-b border-black outline-none
        px-2 py-2
        text-center
        text-sm
        bg-white
      "
              />

              <input
                type="text"
                className="
        w-full
        min-w-0
        border-0 border-b border-black outline-none
        px-2 py-2
        text-center
        text-sm
        bg-white
      "
              />

              <input
                type="text"
                className="
        w-full
        min-w-0
        border-0 border-b border-black outline-none
        px-2 py-2
        text-center
        text-sm
        bg-white
      "
              />

              <input
                type="text"
                className="
        w-full
        min-w-0
        border-0 border-b border-black outline-none
        px-2 py-2
        text-center
        text-sm
        bg-white
      "
              />
            </div>
          </div>

          {/* ================= خاتمة العقد ================= */}

          <div className="mt-10 text-right pr-6 text-[15px] leading-loose">
            <p className="mb-4">
              حرر هذا العقد على نسختين في تاريخ{" "}
              <span className="px-6">
                {new Date(contract.booking?.pickup_date).toLocaleDateString(
                  "ar-EG",
                )}
              </span>
              وعلى مسؤولية طرفي العقد
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

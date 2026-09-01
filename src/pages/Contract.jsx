import { FaPhoneAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ContractLogo from "../assets/Logo.jpg";

export default function Contract() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F5F1] p-3 sm:p-6" dir="rtl">
      {/* ================= زر الإغلاق ================= */}
      <div className="flex justify-start mb-4 sm:mb-6">
        <button
          onClick={() => navigate("/home")}
          className="
      w-10 h-10
      sm:w-11 sm:h-11
      flex items-center justify-center
      rounded-full
      bg-white
      border border-[#D7B98E]
      text-[#B67A2E]
      hover:bg-[#F8F5F1]
      hover:text-[#9A6525]
      transition
      shadow-sm
      shrink-0
    "
          aria-label="إغلاق العقد"
        >
          <IoClose size={25} />
        </button>
      </div>

      {/* ================= صفحة العقد ================= */}
      <div
        className="
          w-full
          overflow-x-auto
          overflow-y-hidden
          rounded-2xl
          shadow-lg
          pb-3
        "
      >
        {/* 
          حاوية تحافظ على حجم A4.
          على الموبايل يبقى العقد بنفس النسبة
          ويمكن للمستخدم التحريك يمين ويسار.
        */}
        <div
          className="
            bg-white
            text-black
            border
            border-gray-300
            mx-auto
            p-4
            sm:p-6
            md:p-8
          "
          style={{
            width: "210mm",
            minWidth: "210mm",
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
              <div className="text-[15px] leading-8 font-semibold">
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

                    <div className="border-b border-black mt-1 min-h-[28px]">
                      &nbsp;
                    </div>
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

                    <div className="border-b border-black mt-1 min-h-[28px]">
                      &nbsp;
                    </div>
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

                    <div className="border-b border-black mt-1 min-h-[28px]">
                      &nbsp;
                    </div>
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

                    <div className="border-b border-black mt-1 min-h-[28px]">
                      &nbsp;
                    </div>
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

                    <div className="border-b border-black mt-1 min-h-[28px]">
                      &nbsp;
                    </div>
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

                    <div className="border-b border-black mt-1 min-h-[28px]">
                      &nbsp;
                    </div>
                  </td>
                </tr>

                {/* رقم الهاتف */}
                <tr>
                  <td className="p-3 border-l-2 border-black">
                    <span className="font-semibold">رقم الهاتف :</span>

                    <div className="border-b border-black mt-1 min-h-[28px]">
                      0988433802
                    </div>
                  </td>

                  <td className="p-3">
                    <span className="font-semibold">رقم الهاتف :</span>

                    <div className="border-b border-black mt-1 min-h-[28px]">
                      &nbsp;
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ================= الجزء السفلي ================= */}
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
                &nbsp;
              </span>

              <span className="font-semibold">موديل:</span>

              <span className="border-b border-black min-w-[90px] px-2 text-center">
                &nbsp;
              </span>

              <span className="font-semibold">اللون:</span>

              <span className="border-b border-black min-w-[90px] px-2 text-center">
                &nbsp;
              </span>
            </div>

            {/* السطر الثاني */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-semibold">رقم اللوحة</span>

              <span className="border-b border-black min-w-[140px] px-2 text-center">
                &nbsp;
              </span>

              <span className="font-semibold">ولمدة</span>

              <span className="border-b border-black min-w-[100px] px-2 text-center">
                &nbsp;
              </span>

              <span className="font-semibold">
                لقاء بدل نقدي لليوم الواحد وقدره
              </span>

              <span className="border-b border-black min-w-[100px] px-2 text-center">
                &nbsp;
              </span>

              <span>$</span>
            </div>

            {/* السطر الثالث */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-semibold">ساعة المغادرة</span>

              <span className="border-b border-black min-w-[100px] px-2 text-center">
                &nbsp;
              </span>

              <span className="font-semibold">اعتباراً من تاريخ</span>
              <span className="border-b border-black min-w-[140px] px-2 text-center">
                &nbsp;
              </span>

              <span className="font-semibold">ولغاية تاريخ</span>

              <span className="border-b border-black min-w-[140px] px-2 text-center">
                &nbsp;
              </span>
            </div>

            {/* السطر الرابع */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-semibold">وتأمين قدره</span>

              <span
                className="border-b border-black text-center shrink-0"
                style={{
                  width: "80px",
                  minWidth: "80px",
                  maxWidth: "80px",
                }}
              >
                &nbsp;
              </span>

              <span className="font-semibold">
                الكيلو متر المسموح لليوم الواحد
              </span>

              <span className="border-b border-black min-w-[100px] px-2 text-center">
                &nbsp;
              </span>

              <span className="font-semibold">قيمة الساعة الزائدة</span>

              <span
                className="border-b border-black text-center shrink-0"
                style={{
                  width: "80px",
                  minWidth: "80px",
                  maxWidth: "80px",
                }}
              >
                &nbsp;
              </span>

              <span className="font-semibold">عداد الخروج</span>

              <span
                className="border-b border-black text-center shrink-0"
                style={{
                  width: "80px",
                  minWidth: "80px",
                  maxWidth: "80px",
                }}
              >
                &nbsp;
              </span>
            </div>

            {/* الملاحظات */}
            <div className="pt-5 text-[16px] font-bold leading-loose text-justify">
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

            {/* خطوط التواقيع */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="-mt-10">
                <div className="w-full border-b border-black h-[28px] text-center">
                  محمد بطل
                </div>
              </div>

              <div className="-mt-10">
                <div className="w-full border-b border-black h-[28px]">
                  &nbsp;
                </div>
              </div>

              <div className="-mt-10">
                <div className="w-full border-b border-black h-[28px]">
                  &nbsp;
                </div>
              </div>

              <div className="-mt-10">
                <div className="w-full border-b border-black h-[28px]">
                  &nbsp;
                </div>
              </div>
            </div>
          </div>

          {/* ================= خاتمة العقد ================= */}
          <div className="mt-20 text-right pr-6 text-[15px] leading-loose">
            <p className="mb-4">
              حرر هذا العقد على نسختين في تاريخ
              <span className="px-6">&nbsp;</span>
              وعلى مسؤولية طرفي العقد
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

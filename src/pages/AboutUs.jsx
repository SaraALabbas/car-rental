import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import BottomBar from "../components/BottomTabBar";

export default function AboutUs() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFBF7] p-4 pb-24">
      {/* العنوان */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#B67A2E]">من نحن</h1>

        <p className="text-gray-600 mt-3">تعرف أكثر على شركتنا وخدماتنا.</p>
      </div>

      {/* البطاقة */}
      <div className="bg-white rounded-2xl shadow-md border border-[#B67A2E]/20 p-6 leading-9 text-gray-700">
        <p className="mb-5">
          نحن شركة متخصصة في{" "}
          <span className="font-bold text-[#B67A2E]">تأجير السيارات</span>، نسعى
          إلى تقديم تجربة حجز واستئجار سهلة، سريعة، وآمنة تلبي احتياجات الأفراد
          والشركات. نوفر مجموعة متنوعة من السيارات التي تناسب مختلف الاستخدامات،
          مع الحرص على صيانتها بشكل دوري لضمان أعلى مستويات الجودة والأمان.
        </p>

        <p className="mb-5">
          من خلال موقعنا الإلكتروني، يمكنك استعراض السيارات المتاحة، مقارنة
          الخيارات، وإتمام الحجز المسبق بكل سهولة، مما يوفر عليك الوقت ويمنحك
          تجربة أكثر راحة ومرونة.
        </p>

        <p className="mb-5">
          نعتمد في عملنا على الشفافية في الأسعار، والالتزام بالمواعيد، وخدمة
          عملاء تهدف إلى تقديم الدعم والإجابة عن جميع الاستفسارات قبل وأثناء
          وبعد عملية التأجير.
        </p>

        <p>
          هدفنا هو بناء علاقة طويلة الأمد مع عملائنا من خلال تقديم خدمة موثوقة،
          وإجراءات واضحة، وتجربة تأجير تلبي توقعاتهم في كل مرة.
        </p>

        {/* التواصل */}
        <div className="mt-10 border-t border-[#E8D6BA] pt-6 text-center">
          <h2 className="text-xl font-bold text-[#B67A2E] mb-5">
            تابعنا على وسائل التواصل
          </h2>

          <div className="flex justify-center gap-6 text-3xl">
            <a
              href="https://www.instagram.com/alkamal023?igsh=MnU0OTRuNGMxYnc="
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:scale-110 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/share/1amrTHBbNF/"
              className="text-blue-600 hover:scale-110 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="https://wa.me/963965121290"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:scale-110 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

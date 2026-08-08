import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { useAuth } from "../context/useAuth";
export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { guestLogin } = useAuth();
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* الخلفية */}
      <img
        src={Logo}
        alt="Logo"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* طبقة شفافة فوق الخلفية */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* المحتوى */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            تأجير سيارات
          </h1>

          <p className="mt-4 text-gray-200 text-lg leading-8">
            استمتع بتجربة تأجير السيارات بسهولة وسرعة
          </p>

          <div className="mt-12 space-y-4">
            {/* الدخول كضيف */}
            <button
              onClick={() => {
                guestLogin();
                navigate("/home");
              }}
              className="w-full py-4 rounded-2xl bg-[#B67A2E] text-white font-bold text-lg shadow-lg hover:bg-[#9d6826] transition"
            >
              الدخول كضيف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

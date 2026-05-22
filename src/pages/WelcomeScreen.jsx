import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpg";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="h-[100dvh] w-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-black flex items-center justify-center">
        <img src={Logo} className="w-full h-full object-cover" />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center text-white">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
            تأجير سيارات
          </h1>

          <p className="text-gray-300 mt-3 text-sm sm:text-base md:text-lg">
            استمتع بتجربة تأجير السيارات بسهولة وسرعة
          </p>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => navigate("/register")}
              className="w-full bg-gray-900 py-3 rounded-xl"
            >
              إنشاء حساب
            </button>

            <button
              onClick={() => navigate("/login")}
              className="w-full bg-yellow-400 py-3 rounded-xl text-black"
            >
              تسجيل الدخول
            </button>
          </div>
          <div className="mt-10 w-full max-w-md mx-auto text-center px-2">
            {/* ALKAMAL */}
            <p
              className="
      text-gray-400 
      font-light
      text-xl sm:text-2xl md:text-3xl
      whitespace-nowrap
    "
              style={{ letterSpacing: "1.5em" }}
            >
              ALKAMAL
            </p>

            {/* CAR RENTAL */}
            <div className="flex items-center justify-center gap-2 mt-3 whitespace-nowrap">
              <div className="h-[2px] bg-yellow-400 flex-1"></div>

              <p
                className="
        text-yellow-400 
        font-semibold
        text-lg sm:text-xl md:text-2xl
      "
                style={{ letterSpacing: "0.4em" }}
              >
                CAR RENTAL
              </p>

              <div className="h-[2px] bg-yellow-400 flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

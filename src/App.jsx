import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";

// Pages
import Login from "./pages/login";
import Register from "./pages/register";

import WelcomeScreen from "./pages/WelcomeScreen";
import Home from "./pages/home";
import CarDetails from "./pages/carDetails";
import BookingForm from "./pages/bookings";

import Instructions from "./pages/instructions";
import AboutUs from "./pages/AboutUs";

import MyOrders from "./pages/myOrders";
import Contract from "./pages/Contract";

// Admin Pages
import ManageCars from "./pages/manageCars";
import Orders from "./pages/orders";
import AdminContracts from "./pages/AdminContracts";
import AdminInstructions from "./pages/AdminIstructions";
import ContractDocument from "./pages/ContractDocument";
import AdminLayout from "./pages/AdminLayout";

// ===============================
// حماية صفحات الأدمن
// ===============================

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // غير مسجل دخول
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }

  // ليس أدمن
  if (user?.role !== "admin") {
    return <Navigate to="/home" />;
  }

  return children;
};

// ===============================

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* =====================
              Welcome
          ====================== */}

          <Route path="/" element={<WelcomeScreen />} />

          {/* =====================
              صفحات المستخدم / الضيف
          ====================== */}

          <Route path="/home" element={<Home />} />

          <Route path="/cars/:id" element={<CarDetails />} />

          <Route path="/booking/:id" element={<BookingForm />} />

          <Route path="/myOrders" element={<MyOrders />} />

          <Route path="/contract" element={<Contract />} />

          <Route path="/about-us" element={<AboutUs />} />

          {/* عرض التعليمات للمستخدم */}
          <Route path="/instructions" element={<Instructions />} />

          {/* =====================
              تسجيل الدخول وإنشاء الحساب
          ====================== */}

          {/* دخول الأدمن فقط */}
          <Route path="/admin-login" element={<Login />} />

          {/* إنشاء حساب مستخدم */}
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="orders" replace />} />

            <Route path="orders" element={<Orders />} />

            <Route path="cars" element={<ManageCars />} />

            <Route path="contracts" element={<AdminContracts />} />

            <Route path="contracts/:id" element={<ContractDocument />} />

            <Route path="instructions" element={<AdminInstructions />} />
          </Route>
          {/* أي رابط غير موجود */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

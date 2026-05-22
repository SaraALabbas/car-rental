import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";

// الصفحات
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import WelcomeScreen from "./pages/WelcomeScreen";
import BookingForm from "./pages/bookings";

// صفحات إضافية
import Orders from "./pages/orders";
import MyOrders from "./pages/myOrders";
import Instructions from "./pages/instructions";
import ManageCars from "./pages/manageCars";
import CarDetails from "./pages/carDetails";
import AdminContracts from "./pages/AdminContracts";
import ContractDocument from "./pages/ContractDocument";
import MyContracts from "./pages/MyContracts";
import AdminInstructions from "./pages/AdminIstructions";

/* 🔐 حماية الصفحات */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* الصفحة الرئيسية (ترحيبية) */}
          <Route path="/" element={<WelcomeScreen />} />

          {/* صفحات عامة */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="/contracts" element={<AdminContracts />} />
          <Route path="/contracts/:id" element={<ContractDocument />} />
          <Route path="/my-contracts" element={<MyContracts />} />
          <Route path="/adminInstructions" element={<AdminInstructions />} />

          {/* صفحات محمية */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />

          <Route
            path="/myOrders"
            element={
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            }
          />

          <Route
            path="/instructions"
            element={
              <PrivateRoute>
                <Instructions />
              </PrivateRoute>
            }
          />

          <Route
            path="/manageCars"
            element={
              <PrivateRoute>
                <ManageCars />
              </PrivateRoute>
            }
          />

          <Route
            path="/car/:id"
            element={
              <PrivateRoute>
                <CarDetails />
              </PrivateRoute>
            }
          />

          {/* أي رابط غلط */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

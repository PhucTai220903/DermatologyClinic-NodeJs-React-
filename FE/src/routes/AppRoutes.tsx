// src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../pages/admin/Admin";
import Home from "../pages/customer/Home";
import MainLayout from "../layouts/MainLayout";
import SignInForm from "../components/mutual/SignInForm";
import OTPForm from "../components/mutual/OTPForm";
import Comestic from "../pages/customer/Comestic";
import AppointmentForm from "../components/customer/Appointment";
import PrivateRoute from "../components/mutual/PrivateRoute";
import UnauthorizationForm from "../components/mutual/UnauthorizationForm";
import Information from "../pages/customer/Information";
import DetailComestic from "../pages/customer/DetailComestic";
import Cart from "../pages/customer/Cart";
import Payment from "../pages/customer/Payment";
import Order from "../pages/customer/Order";
import Diagnosis from "../pages/customer/Diagnosis";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes chung có layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/verifyOtp" element={<OTPForm />} />
        <Route path="/comestic" element={<Comestic />} />
        <Route path="/comestic/:id" element={<DetailComestic />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/unauthorized" element={<UnauthorizationForm />} />
        <Route path="/information" element={<Information />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order" element={<Order />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
      </Route>

      {/* Routes cần quyền truy cập */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["doctor"]} />}>
        <Route path="/doctor" element={<Admin />} />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["pharmacist"]} />}>
        <Route path="/pharmacist" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

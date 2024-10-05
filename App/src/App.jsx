import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Trainers from "./Pages/Trainers";

import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import ProductList from "./Pages/ProductList";
import Plans from "./Pages/Plans";
import Cart from "./Pages/Cart";
import PaymentPortal from "./Pages/PaymentPortal";
import PlanPayment from "./Pages/PlanPayment";

const App = () => (
  <div className="mx-4 sm:mx-[5.5%]">
    <ToastContainer />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/trainers" element={<Trainers />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<PaymentPortal />} />
      <Route path="/plan-pay" element={<PlanPayment />} />
    </Routes>
    <Footer />
  </div>
);

export default App;

import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { TrainerContext } from "./context/TrainerContext";
import { AdminContext } from "./context/AdminContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TrainerProfile from "./pages/trainer/TrainerProfile";
import TrainersClient from "./pages/trainer/TrainersClient";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import Dashboard from "./pages/admin/Dashboard";
import AllWorkers from "./pages/admin/AllWorkers";
import AllCustomers from "./pages/admin/AllCustomers";
import AddWorkers from "./pages/admin/AddWorkers";
import AddProduct from "./pages/admin/AddProduct";
import AllProduct from "./pages/admin/AllProduct";
import Login from "./pages/Login";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AllRequests from "./pages/admin/AllRequests";
import Allorders from "./pages/admin/Allorders";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { TrainerToken } = useContext(TrainerContext);
  return aToken || TrainerToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavBar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-worker" element={<AllWorkers />} />
          <Route path="/all-customers" element={<AllCustomers />} />
          <Route path="/all-Products" element={<AllProduct />} />
          <Route path="/add-worker" element={<AddWorkers />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/all-orders" element={<Allorders />} />
          <Route path="/all-requests" element={<AllRequests />} />

          {/* Trainer Routes */}
          <Route path="/trainer-profile" element={<TrainerProfile />} />
          <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
          <Route path="/trainer-client" element={<TrainersClient />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;

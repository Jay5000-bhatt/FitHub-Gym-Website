import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { TrainerContext } from "./context/TrainerContext.jsx";
import { AdminContext } from "./context/AdminContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TrainerProfile from "./pages/trainer/trainerProfile.jsx";
import TrainersClient from "./pages/trainer/trainersClient.jsx";
import TrainerDashboard from "./pages/trainer/trainerDashboard.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import AllWorkers from "./pages/admin/allWorkers.jsx";
import AllCustomers from "./pages/admin/allCustomers.jsx";
import AddWorkers from "./pages/admin/addWorkers.jsx";
import AddProduct from "./pages/admin/addProduct.jsx";
import AllProduct from "./pages/admin/allProduct.jsx";
import Login from "./pages/Login.jsx";
import NavBar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import AllRequests from "./pages/admin/allRequests.jsx";
import Allorders from "./pages/admin/allOrders.jsx";

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

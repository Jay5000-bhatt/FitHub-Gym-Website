import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { TrainerContext } from "./Context/TrainerContext";
import { AdminContext } from "./context/AdminContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TrainerProfile from "./Pages/Trainer/TrainerProfile";
import TrainersClient from "./Pages/Trainer/TrainersClient";
import TrainerDashboard from "./Pages/Trainer/TrainerDashboard";
import Dashboard from "./Pages/Admin/Dashboard";
import AllWorkers from "./Pages/Admin/AllWorkers";
import AllCustomers from "./Pages/Admin/AllCustomers";
import AddWorkers from "./Pages/Admin/AddWorkers";
import AddProduct from "./Pages/Admin/AddProduct";
import AllProduct from "./Pages/Admin/AllProduct";
import Login from "./Pages/Login";
import NavBar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import AllRequests from "./Pages/Admin/AllRequests";
import Allorders from "./Pages/Admin/Allorders";

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

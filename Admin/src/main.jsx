import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AdminContextProvider from "./context/AdminContext.jsx";
import TrainerContextProvider from "./Context/TrainerContext.jsx";
import AppContextProvider from "./Context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <TrainerContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </TrainerContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar"; // Dodajemo bočnu traku
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ContextProvider from "./Context";
import { Context } from "./Context";
import { useContext, useEffect } from "react";
import Profile from "./Pages/Home/Profile";
import HomePage from "./Pages/HomePage/HomePage";
import axios from "axios";
import HiveForm from "./Hive/HiveForm";
import Hives from "./Hives/Hives";
function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <AppWithContext />
      </ContextProvider>
    </BrowserRouter>
  );
}

function AppWithContext() {
  const { islogged, setIsLogged } = useContext(Context);

  useEffect(() => {
    axios
      .get("http://localhost:4005/api/homeGetData", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Sucess") {
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      })
      .catch(() => setIsLogged(false));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {islogged ? <Sidebar /> : null}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hiveAdmin" element={<HiveForm />} />
        <Route path="/hivesEditDelete" element={<Hives />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

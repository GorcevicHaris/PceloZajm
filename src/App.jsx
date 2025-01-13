import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar"; // Dodajemo bočnu traku
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ContextProvider from "./Context";
import { Context } from "./Context";
import { useContext, useEffect } from "react";
import Profile from "./Pages/Home/Profile";
import axios from "axios";
import HiveForm from "./Hive/HiveForm";
import Hives from "./Hives/Hives";
import UserForm from "./Users/UserForm";
import Users from "./UsersED/Users";
import OrderHives from "./OrderHive/Order";
import ManageOrder from "./Admin/ManageOrder";
import Landing from "./components/Landing/Landing";
function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Sidebar />
        <Routes>
          <Route path="/manageOrder" element={<ManageOrder />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Landing />} />
          <Route path="/hiveAdmin" element={<HiveForm />} />
          <Route path="/hivesEditDelete" element={<Hives />} />
          <Route path="/userForm" element={<UserForm />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orderHive" element={<OrderHives />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}
export default App;

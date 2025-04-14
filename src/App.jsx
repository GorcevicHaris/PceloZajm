import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ContextProvider from "./Context";
import { Context } from "./Context";
import { useContext } from "react";
import Profile from "./Pages/Home/Profile";
import HiveForm from "./Hive/HiveForm";
import Hives from "./Hives/Hives";
import UserForm from "./Users/UserForm";
import Users from "./UsersED/Users";
import OrderHives from "./OrderHive/Order";
import ManageOrder from "./Admin/ManageOrder";
import Landing from "./components/Landing/Landing";
import Header from "./Navigation/Header";
import DashBoard from "./Dashboard/Dashboard";
import PcelarsPosts from "./PcelarPosts/PcelarsPosts";
import Contact from "./Pages/Home/Contact";
import About from "./Pages/About";
const LandingGuard = () => {
  const { userId } = useContext(Context);
  return userId ? <Navigate to="/dashboard" replace /> : <Landing />;
};

const PcelarPostsGuard = () => {
  const { userId } = useContext(Context);
  return userId ? <Navigate to="/dashboard" replace /> : <PcelarsPosts />;
};

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Sidebar />
        <Header />
        <Routes>
          <Route path="/pcelarPosts/:id" element={<PcelarPostsGuard />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/manageOrder" element={<ManageOrder />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<LandingGuard />} />
          <Route path="/hiveAdmin" element={<HiveForm />} />
          <Route path="/hivesEditDelete" element={<Hives />} />
          <Route path="/userForm" element={<UserForm />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orderHive" element={<OrderHives />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;

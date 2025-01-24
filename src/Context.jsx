import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
const Context = createContext();
function ContextProvider({ children }) {
  const [userId, setUserId] = useState(
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token")).userId
      : ""
  );
  const [role, setRole] = useState(
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token")).role
      : ""
  );
  const [hiveID, setHiveId] = useState();
  const [pricePerHive, setPricePerHive] = useState(1);
  const [name, setName] = useState("");
  function login(token) {
    localStorage.setItem("token", token);
    console.log(token, "token");
    const user = jwtDecode(token);
    console.log(user, "toksen");
    setRole(user.role);
    setName(user.userName);
    setUserId(user.userId);
  }
  function logout() {
    localStorage.removeItem("token");
    setRole("");
    setUserId("");
  }
  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        role,
        setRole,
        hiveID,
        setHiveId,
        login,
        logout,
        pricePerHive,
        setPricePerHive,
        name,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { Context };
export default ContextProvider;

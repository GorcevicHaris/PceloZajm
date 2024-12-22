import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
const Context = createContext();
function ContextProvider({ children }) {
  let initialRole = localStorage.getItem("role");
  let initialId = localStorage.getItem("id");
  const [userId, setUserId] = useState(initialId);
  const [role, setRole] = useState(initialRole);
  const [hiveID, setHiveId] = useState();
  const [pricePerHive, setPricePerHive] = useState(1);
  const [name, setName] = useState("");
  function login(token) {
    console.log(token, "token");
    const user = jwtDecode(token);
    console.log(user, "toksen");
    localStorage.setItem("role", user.role);
    localStorage.setItem("id", user.userId);
    setRole(user.role);
    setName(user.userName);
    setUserId(user.userId);
  }
  function logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    setRole("");
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

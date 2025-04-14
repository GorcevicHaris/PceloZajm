import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
//izmenili smo umesto local storage da bude cookie istu stvar radi ali bezbedni je
// umesto localstorage get i set imamo sad cookies.get i uzimamo token
const Context = createContext();

function ContextProvider({ children }) {
  const [userId, setUserId] = useState(() => {
    try {
      const token = Cookies.get("token");
      return token ? jwtDecode(token).userId : "";
    } catch {
      return "";
    }
  });
  const [role, setRole] = useState(() => {
    try {
      const token = Cookies.get("token");
      return token ? jwtDecode(token).role : "";
    } catch {
      return "";
    }
  });
  const [name, setName] = useState(() => {
    try {
      const token = Cookies.get("token");
      return token ? jwtDecode(token).userName : "";
    } catch {
      return "";
    }
  });
  const [hiveID, setHiveId] = useState();
  const [pricePerHive, setPricePerHive] = useState(1);

  function login(token) {
    // No need to set cookie here; backend handles it
    const user = jwtDecode(token);
    setRole(user.role);
    setName(user.userName);
    setUserId(user.userId);
  }

  function logout() {
    Cookies.remove("token");
    setRole("");
    setUserId("");
    setName("");
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

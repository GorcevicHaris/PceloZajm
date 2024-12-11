import { createContext, useState } from "react";

const Context = createContext();
function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState();
  const [islogged, setIsLogged] = useState(false);
  const [role, setRole] = useState(null);
  const [hiveID, setHiveId] = useState();
  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        islogged,
        setIsLogged,
        role,
        setRole,
        hiveID,
        setHiveId,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { Context };
export default ContextProvider;

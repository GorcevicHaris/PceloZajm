import { createContext, useState } from "react";

const Context = createContext();
function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState();
  const [islogged, setIsLogged] = useState(false);

  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        islogged,
        setIsLogged,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export { Context };
export default ContextProvider;

import { useState, createContext } from "react";
export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setTokenInterval] = useState(() => {
    const token = localStorage.getItem("token");
    return token;
  });

  const setToken = (newToken) => {
    if (!newToken) {
      localStorage.removeItem("token");
    }
    localStorage.setItem("token", newToken);
    setTokenInterval(newToken);
  };
  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};

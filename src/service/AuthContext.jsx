import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenciated, setIsAuthenciated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenciated(true);
    } else {
      setIsAuthenciated(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsAuthenciated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenciated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

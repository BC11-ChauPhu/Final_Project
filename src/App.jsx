import { useState } from "react";
import "./App.css";
import useCustomRoutes from "./routes/useCustomRoutes";
import { AuthProvider } from "./service/AuthContext";

function App() {
  const [showPopUpSearch, setShowPopUpSearch] = useState(false);

  const togglePopUp = () => {
    setShowPopUpSearch((prev) => !prev);
  };

  const myRoutes = useCustomRoutes(showPopUpSearch, togglePopUp);

  return <AuthProvider>{myRoutes}</AuthProvider>;
}

export default App;

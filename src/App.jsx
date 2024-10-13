import "./App.css";
import useCustomRoutes from "./routes/useCustomRoutes";
import { AuthProvider } from "./service/AuthContext";

function App() {
  const myRoutes = useCustomRoutes();

  return <AuthProvider>{myRoutes}</AuthProvider>;
}

export default App;

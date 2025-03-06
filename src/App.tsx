import { useContext } from "react";

import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";

import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { isLogged } = useContext(AuthContext);

  return isLogged ? <AppLayout /> : <AuthLayout />;
}

export default App;

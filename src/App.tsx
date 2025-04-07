import { useContext } from "react";

import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";

import { AuthContext } from "./contexts/AuthContext";
import ContactsProvider from "./contexts/ContactsContext";

function App() {
  const { isLogged } = useContext(AuthContext);

  return isLogged ? (
    <ContactsProvider>
      <AppLayout />
    </ContactsProvider>
  ) : (
    <AuthLayout />
  );
}

export default App;

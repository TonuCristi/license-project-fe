import { useContext, useEffect } from "react";

import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";

import { AuthContext } from "./contexts/AuthContext";
import ContactsProvider from "./contexts/ContactsContext";
import RoomProvider from "./contexts/RoomContext";
import NotificationsProvider from "./contexts/NotificationsContext";
import UserProvider from "./contexts/UserContext";
import AppointmentsProvider from "./contexts/AppointmentsContext";
import { useLogout } from "./hooks/useLogout";
import { jwtDecode } from "jwt-decode";

function App() {
  const { isLogged, token } = useContext(AuthContext);
  const { logout } = useLogout();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
        logout();
      }
    }
  }, [token, logout]);

  return isLogged ? (
    <UserProvider>
      <RoomProvider>
        <AppointmentsProvider>
          <ContactsProvider>
            <NotificationsProvider>
              <AppLayout />
            </NotificationsProvider>
          </ContactsProvider>
        </AppointmentsProvider>
      </RoomProvider>
    </UserProvider>
  ) : (
    <AuthLayout />
  );
}

export default App;

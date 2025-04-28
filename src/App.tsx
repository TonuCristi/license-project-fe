import { useContext } from "react";

import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";

import { AuthContext } from "./contexts/AuthContext";
import ContactsProvider from "./contexts/ContactsContext";
import RoomProvider from "./contexts/RoomContext";
import NotificationsProvider from "./contexts/NotificationsContext";
import UserProvider from "./contexts/UserContext";

function App() {
  const { isLogged } = useContext(AuthContext);

  return isLogged ? (
    <UserProvider>
      <RoomProvider>
        <ContactsProvider>
          <NotificationsProvider>
            <AppLayout />
          </NotificationsProvider>
        </ContactsProvider>
      </RoomProvider>
    </UserProvider>
  ) : (
    <AuthLayout />
  );
}

export default App;

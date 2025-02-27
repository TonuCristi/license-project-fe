import Header from "./components/header/Header";
import Contacts from "./components/contacts/Contacts";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Outlet />
      {/* <Header />
      <main className="grid h-full grid-cols-[25fr_50fr_25fr] overflow-hidden">
        <div className="">Chat</div>
        <div className="border-primary border-x-2">Calendar</div>
        <Contacts />
      </main> */}
    </div>
  );
}

export default App;

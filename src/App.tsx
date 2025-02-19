import Header from "./components/header/Header";
import Contacts from "./components/contacts/Contacts";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="grid h-screen w-full grid-cols-[25fr_50fr_25fr]">
        <div className="">Chat</div>
        <div className="border-primary border-x-2">Calendar</div>
        <Contacts />
      </main>
    </div>
  );
}

export default App;

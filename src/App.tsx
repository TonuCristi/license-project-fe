import Header from "./components/header/Header";

function App() {
  return (
    <div>
      <Header />
      <main className="grid h-screen w-full grid-cols-[25fr_50fr_25fr]">
        <div className="">Chat</div>
        <div className="border-primary border-x-2">Calendar</div>
        <div className="">Contact list</div>
      </main>
    </div>
  );
}

export default App;

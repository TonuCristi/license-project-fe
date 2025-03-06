import Contacts from "../components/contacts/Contacts";

export default function HomePage() {
  return (
    <main className="grid h-full grid-cols-[25fr_50fr_25fr] overflow-hidden">
      <div className="">Chat</div>
      <div className="border-primary border-x-2">Calendar</div>
      <Contacts />
    </main>
  );
}

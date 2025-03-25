import Appointments from "../components/appointments/components/Appointments";
import Contacts from "../components/contacts/components/Contacts";

export default function HomePage() {
  return (
    <main className="grid h-full grid-cols-[25fr_50fr_25fr] overflow-hidden bg-blue-50">
      <div className="">Chat</div>
      <div className="border-primary overflow-hidden border-x-2">
        <Appointments />
      </div>
      <Contacts />
    </main>
  );
}

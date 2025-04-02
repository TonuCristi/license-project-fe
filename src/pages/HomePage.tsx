import Appointments from "../components/appointments/components/Appointments";
import Contacts from "../components/contacts/components/Contacts";

import ContactsProvider from "../contexts/ContactsContext";

export default function HomePage() {
  return (
    <main className="grid h-full grid-cols-[25fr_50fr_25fr] overflow-hidden">
      <div className="">Chat</div>
      <div className="border-primary overflow-hidden border-x-2">
        <Appointments />
      </div>
      <ContactsProvider>
        <Contacts />
      </ContactsProvider>
    </main>
  );
}

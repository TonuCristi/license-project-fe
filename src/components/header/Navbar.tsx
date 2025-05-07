import EmployeesLink from "../employees/components/EmployeesLink";
import ContactsButton from "./ContactsButton";
import NotificationsButton from "./NotificationsButton";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center justify-center gap-3">
        <ContactsButton />
        <EmployeesLink />
        <NotificationsButton />
      </ul>
    </nav>
  );
}

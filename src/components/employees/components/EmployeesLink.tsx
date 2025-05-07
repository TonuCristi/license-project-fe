import { HiMiniUser } from "react-icons/hi2";
import { Link } from "react-router";
import NavbarItem from "../../header/NavbarItem";

export default function EmployeesLink() {
  return (
    <NavbarItem>
      <Link
        to="/employees"
        className="text-xl text-blue-200 transition-colors ease-initial hover:text-white"
      >
        <HiMiniUser />
      </Link>
    </NavbarItem>
  );
}

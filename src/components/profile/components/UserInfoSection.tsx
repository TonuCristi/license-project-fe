import { useContext } from "react";

import DeleteAccountButton from "./DeleteAccountButton";

import { UserContext } from "../../../contexts/UserContext";

export default function UserInfoSection() {
  const { user } = useContext(UserContext);

  const { username, email, role } = user;

  return (
    <section className="border-primary flex items-end rounded-lg border-2 p-2">
      <div className="flex w-full flex-col gap-2">
        <p>
          <span className="font-medium">Username:</span> {username}
        </p>
        <p>
          <span className="font-medium">Email:</span> {email}
        </p>
        <p>
          <span className="font-medium">Role:</span> {role}
        </p>
      </div>

      <DeleteAccountButton />
    </section>
  );
}

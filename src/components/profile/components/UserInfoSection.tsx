import { useContext } from "react";

import DeleteAccountButton from "./DeleteAccountButton";

import { UserContext } from "../../../contexts/UserContext";

export default function UserInfoSection() {
  const { user } = useContext(UserContext);

  return (
    <section className="flex flex-col gap-1">
      <h2 className="text-lg font-medium">User information</h2>
      <div className="border-primary flex items-end rounded-lg border-2 p-2">
        <div className="flex w-full flex-col gap-2">
          <p>
            <span className="font-medium">Username:</span> {user?.username}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-medium">Role:</span> {user?.role}
          </p>
        </div>

        <DeleteAccountButton />
      </div>
    </section>
  );
}

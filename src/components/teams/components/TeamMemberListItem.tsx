import DeleteMemberButton from "./DeleteMemberButton";

import { Employee } from "../../../types/employee.type";

type Props = {
  member: Employee;
};

export default function TeamMemberListItem({ member }: Props) {
  return (
    <li className="border-primary xs:flex-row flex flex-col justify-between gap-2 rounded-xl border-2 p-2">
      <div className="flex flex-col gap-1 break-all">
        <p>
          <span className="font-medium">Full name:</span> {member.fullName}
        </p>
        <p>
          <span className="font-medium">Email:</span> {member.email}
        </p>
        <p>
          <span className="font-medium">Phone number:</span>{" "}
          {member.phoneNumber}
        </p>
        {member.teams.length > 0 && (
          <p>
            <span className="font-medium">Teams:</span>{" "}
            {member.teams.join(", ")}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 self-start">
        <DeleteMemberButton
          memberId={member.membershipId}
          employeeId={member.id}
        />
      </div>
    </li>
  );
}

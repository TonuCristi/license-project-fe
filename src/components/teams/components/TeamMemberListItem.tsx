import DeleteMemberButton from "./DeleteMemberButton";

import { Employee } from "../../../types/employee.type";

type Props = {
  deleteMember: (membershipId: string, employeeId: string) => void;
  member: Employee;
  isDeleteLoading: boolean;
};

export default function TeamMemberListItem({
  deleteMember,
  member,
  isDeleteLoading,
}: Props) {
  const hireDate = new Date(member.hireDate).toLocaleDateString();

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
          <span className="font-medium">Hire date:</span> {hireDate}
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
          deleteMember={deleteMember}
          membershipId={member.membershipId}
          memberId={member.id}
          isDeleteLoading={isDeleteLoading}
        />
      </div>
    </li>
  );
}

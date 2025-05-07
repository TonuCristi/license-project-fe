import TeamsDropdown from "./TeamsDropdown";

type Props = {
  employeeList: string[];
};

export default function AddToTeam({ employeeList }: Props) {
  return (
    <div className="xxs:grid-cols-[80fr_20fr] grid grid-cols-1 items-center gap-2">
      <span className="font-medium">
        Selected employees: {employeeList.length}
      </span>
      <TeamsDropdown />
    </div>
  );
}

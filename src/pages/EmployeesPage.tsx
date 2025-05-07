import AddEmployeeButton from "../components/employees/components/AddEmployeeButton";
import Employees from "../components/employees/components/Employees";
import EmployeesSearchBar from "../components/employees/components/EmployeesSearchBar";
import PageTitle from "../components/PageTitle";

export default function EmployeesPage() {
  return (
    <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-5 overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
      <PageTitle>Employees</PageTitle>
      <div className="flex flex-col gap-3">
        <div className="xxs:grid-cols-[80fr_20fr] grid grid-cols-1 items-center gap-2">
          <EmployeesSearchBar />
          <AddEmployeeButton />
        </div>
        <Employees />
      </div>
    </main>
  );
}

import Button from "../components/Button";
import EmployeesSearchBar from "../components/employees/components/EmployeesSearchBar";
import PageTitle from "../components/PageTitle";

export default function EmployeesPage() {
  return (
    <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-5 overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
      <PageTitle>Employees</PageTitle>
      <div className="xxs:flex-row mb-4 flex flex-col items-center gap-2">
        <EmployeesSearchBar />
        <Button className="xxs:w-auto w-full text-nowrap">Add employee</Button>
      </div>
    </main>
  );
}

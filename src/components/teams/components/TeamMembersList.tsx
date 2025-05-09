export default function TeamMembersList() {
  // useEffect(() => {
  //   if (employees.length === 0 && offset > 0) {
  //     setPages((prev) => prev - 1);
  //     setOffset((prev) => prev - 1);
  //   }
  // }, [employees, offset, setPages, setOffset]);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* <ul className="flex w-full flex-col gap-2">
        {employees.map((employee) => (
          <TeamEmployeeListItem
            key={employee.id}
            employee={employee}
            employeeList={employeesList}
            setEmployeesList={setEmployeesList}
          />
        ))}
      </ul>
      <Pagination
        isLoading={isLoading}
        pages={pages}
        offset={offset}
        setOffset={setOffset}
      /> */}
    </div>
  );
}

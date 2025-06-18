import { SyntheticEvent, useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Select from "../../Select";
import Button from "../../Button";

import { useFetchAppointments } from "../hooks/useFetchAppointments";
import { useFetchAppointmentsYears } from "../hooks/useFetchAppointmentsYears";
import { AppointmentsContext } from "../../../contexts/AppointmentsContext";

const monthOptions = [
  { value: "0", text: "January" },
  { value: "1", text: "February" },
  { value: "2", text: "March" },
  { value: "3", text: "April" },
  { value: "4", text: "May" },
  { value: "5", text: "June" },
  { value: "6", text: "July" },
  { value: "7", text: "August" },
  { value: "8", text: "September" },
  { value: "9", text: "October" },
  { value: "10", text: "November" },
  { value: "11", text: "December" },
];

const dayOptions = [
  { value: "0", text: "Monday" },
  { value: "1", text: "Tuesday" },
  { value: "2", text: "Wednesday" },
  { value: "3", text: "Thrusday" },
  { value: "4", text: "Friday" },
  { value: "5", text: "Saturday" },
  { value: "6", text: "Sunday" },
];

const selects = [
  {
    label: "Month",
    name: "month",
    placeholder: "Select a month",
    options: monthOptions,
  },
  {
    label: "Day",
    name: "day",
    placeholder: "Select a day",
    options: dayOptions,
  },
];

export default function AppointmentsDateFilters() {
  const { watch, reset } = useFormContext();
  const { getAppointments } = useFetchAppointments();
  const { isLoading: isAppointmentsYearsLoading } = useFetchAppointmentsYears(
    watch("state"),
  );
  const {
    isLoading: isAppointmentsLoading,
    appointmentsYears,
    setAppointments,
  } = useContext(AppointmentsContext);

  const yearOptions = appointmentsYears.map((year) => ({
    value: String(year),
    text: String(year),
  }));

  function handleReset(e: SyntheticEvent) {
    setAppointments([]);

    e.preventDefault();
    reset({
      state: watch("state"),
      year: "",
      month: "",
      day: "",
    });
  }

  useEffect(() => {
    const { unsubscribe } = watch(({ state, year, month, day }) => {
      if (!(year === "" && month === "" && day === "")) {
        getAppointments(state, year, month, day);
      }
    });

    return () => unsubscribe();
  }, [watch, reset, getAppointments]);

  return (
    <form className="grid grid-cols-1 items-end gap-x-3 gap-y-2 sm:grid-cols-2 md:flex md:items-end md:justify-between md:gap-3">
      <InputContainer>
        <Label>Year</Label>
        <Select
          name="year"
          placeholder="Select a year"
          options={yearOptions}
          disabled={isAppointmentsYearsLoading || isAppointmentsLoading}
        />
      </InputContainer>
      {selects.map(({ label, name, placeholder, options }) => (
        <InputContainer key={name}>
          <Label>{label}</Label>
          <Select
            name={name}
            placeholder={placeholder}
            options={options}
            disabled={isAppointmentsYearsLoading || isAppointmentsLoading}
          />
        </InputContainer>
      ))}
      <Button onClick={handleReset}>Reset</Button>
    </form>
  );
}
